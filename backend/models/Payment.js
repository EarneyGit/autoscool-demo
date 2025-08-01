const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  // Stripe payment intent ID
  stripePaymentIntentId: {
    type: String,
    required: true,
    unique: true
  },
  
  // Customer information
  customer: {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    phone: String,
    address: {
      line1: String,
      line2: String,
      city: String,
      postal_code: String,
      country: String
    }
  },
  
  // Course information
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  
  // Payment details
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'CHF'
  },
  
  // Payment status
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'canceled', 'refunded'],
    default: 'pending'
  },
  
  // Enrollment details
  enrollment: {
    startDate: Date,
    preferredSchedule: String,
    specialRequests: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'canceled'],
      default: 'pending'
    }
  },
  
  // Metadata
  metadata: {
    source: {
      type: String,
      default: 'website'
    },
    userAgent: String,
    ipAddress: String
  },
  
  // Timestamps
  paidAt: Date,
  refundedAt: Date,
  
  // Admin notes
  adminNotes: String
}, {
  timestamps: true
});

// Index for efficient queries
paymentSchema.index({ 'customer.email': 1 });
paymentSchema.index({ course: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

// Virtual for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
  return `${this.currency} ${(this.amount / 100).toFixed(2)}`;
});

// Method to update payment status
paymentSchema.methods.updateStatus = function(status, metadata = {}) {
  this.status = status;
  
  if (status === 'succeeded') {
    this.paidAt = new Date();
    this.enrollment.status = 'confirmed';
  } else if (status === 'failed' || status === 'canceled') {
    this.enrollment.status = 'canceled';
  } else if (status === 'refunded') {
    this.refundedAt = new Date();
    this.enrollment.status = 'canceled';
  }
  
  // Update metadata
  Object.assign(this.metadata, metadata);
  
  return this.save();
};

// Static method to get payment statistics
paymentSchema.statics.getStats = async function(dateRange = {}) {
  const { startDate, endDate } = dateRange;
  let matchStage = {};
  
  if (startDate || endDate) {
    matchStage.createdAt = {};
    if (startDate) matchStage.createdAt.$gte = new Date(startDate);
    if (endDate) matchStage.createdAt.$lte = new Date(endDate);
  }
  
  const stats = await this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalPayments: { $sum: 1 },
        totalAmount: { $sum: '$amount' },
        successfulPayments: {
          $sum: { $cond: [{ $eq: ['$status', 'succeeded'] }, 1, 0] }
        },
        successfulAmount: {
          $sum: { $cond: [{ $eq: ['$status', 'succeeded'] }, '$amount', 0] }
        },
        pendingPayments: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        failedPayments: {
          $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] }
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalPayments: 0,
    totalAmount: 0,
    successfulPayments: 0,
    successfulAmount: 0,
    pendingPayments: 0,
    failedPayments: 0
  };
};

module.exports = mongoose.model('Payment', paymentSchema);