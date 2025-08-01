const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Stripe = require('stripe');
const Payment = require('../models/Payment');
const Course = require('../models/Course');

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', [
  body('courseId').isMongoId().withMessage('Valid course ID is required'),
  body('customer.email').isEmail().withMessage('Valid email is required'),
  body('customer.name').isLength({ min: 2 }).withMessage('Customer name is required'),
  body('customer.phone').optional().isMobilePhone(),
  body('enrollment.startDate').optional().isISO8601(),
  body('enrollment.preferredSchedule').optional().isString(),
  body('enrollment.specialRequests').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { courseId, customer, enrollment = {} } = req.body;

    // Get course details
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (!course.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Course is not available for enrollment'
      });
    }

    // Check course capacity
    if (course.capacity.max && course.capacity.current >= course.capacity.max) {
      return res.status(400).json({
        success: false,
        message: 'Course is fully booked'
      });
    }

    // Calculate amount (in cents for Stripe)
    const amount = Math.round((course.price.discountPrice || course.price.amount) * 100);

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: course.price.currency.toLowerCase(),
      metadata: {
        courseId: course._id.toString(),
        courseName: course.name,
        customerEmail: customer.email,
        customerName: customer.name
      },
      description: `Enrollment for ${course.name}`,
      receipt_email: customer.email
    });

    // Create payment record
    const payment = new Payment({
      stripePaymentIntentId: paymentIntent.id,
      customer,
      course: courseId,
      amount,
      currency: course.price.currency,
      enrollment: {
        ...enrollment,
        startDate: enrollment.startDate ? new Date(enrollment.startDate) : undefined
      },
      metadata: {
        source: 'website',
        userAgent: req.get('User-Agent'),
        ipAddress: req.ip
      }
    });

    await payment.save();

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: amount / 100,
        currency: course.price.currency,
        course: {
          id: course._id,
          name: course.name,
          price: course.price
        }
      }
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating payment intent',
      error: error.message
    });
  }
});

// Confirm payment
router.post('/confirm-payment', [
  body('paymentIntentId').isString().withMessage('Payment intent ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const { paymentIntentId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Find payment record
    const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntentId })
      .populate('course', 'name category price capacity');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment record not found'
      });
    }

    // Update payment status based on Stripe status
    if (paymentIntent.status === 'succeeded') {
      await payment.updateStatus('succeeded');
      
      // Update course enrollment count
      await Course.findByIdAndUpdate(payment.course._id, {
        $inc: { 'capacity.current': 1 }
      });
    } else if (paymentIntent.status === 'canceled') {
      await payment.updateStatus('canceled');
    } else if (paymentIntent.status === 'payment_failed') {
      await payment.updateStatus('failed');
    }

    res.json({
      success: true,
      data: {
        payment: {
          id: payment._id,
          status: payment.status,
          amount: payment.formattedAmount,
          course: payment.course.name,
          enrollment: payment.enrollment
        },
        stripeStatus: paymentIntent.status
      }
    });

  } catch (error) {
    console.error('Payment confirmation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error confirming payment',
      error: error.message
    });
  }
});

// Stripe webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const succeededPayment = event.data.object;
        await handlePaymentSucceeded(succeededPayment);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        await handlePaymentFailed(failedPayment);
        break;

      case 'payment_intent.canceled':
        const canceledPayment = event.data.object;
        await handlePaymentCanceled(canceledPayment);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

// Helper functions for webhook handlers
async function handlePaymentSucceeded(paymentIntent) {
  const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntent.id });
  if (payment && payment.status !== 'succeeded') {
    await payment.updateStatus('succeeded');
    
    // Update course enrollment
    await Course.findByIdAndUpdate(payment.course, {
      $inc: { 'capacity.current': 1 }
    });
    
    // TODO: Send confirmation email to customer
    console.log(`Payment succeeded for ${payment.customer.email}`);
  }
}

async function handlePaymentFailed(paymentIntent) {
  const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntent.id });
  if (payment && payment.status !== 'failed') {
    await payment.updateStatus('failed');
    console.log(`Payment failed for ${payment.customer.email}`);
  }
}

async function handlePaymentCanceled(paymentIntent) {
  const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntent.id });
  if (payment && payment.status !== 'canceled') {
    await payment.updateStatus('canceled');
    console.log(`Payment canceled for ${payment.customer.email}`);
  }
}

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('course', 'name category price');
    
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment',
      error: error.message
    });
  }
});

// Get all payments (admin)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, status, courseId, email } = req.query;
    const query = {};
    
    if (status) query.status = status;
    if (courseId) query.course = courseId;
    if (email) query['customer.email'] = new RegExp(email, 'i');

    const payments = await Payment.find(query)
      .populate('course', 'name category price')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Payment.countDocuments(query);

    res.json({
      success: true,
      data: {
        payments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: error.message
    });
  }
});

// Get payment statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const stats = await Payment.getStats({ startDate, endDate });
    
    // Get course-wise payment stats
    const courseStats = await Payment.aggregate([
      { $match: { status: 'succeeded' } },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseInfo'
        }
      },
      { $unwind: '$courseInfo' },
      {
        $group: {
          _id: '$course',
          courseName: { $first: '$courseInfo.name' },
          totalEnrollments: { $sum: 1 },
          totalRevenue: { $sum: '$amount' }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        overview: stats,
        courseStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment statistics',
      error: error.message
    });
  }
});

module.exports = router;