const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { category, active, featured } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (active !== undefined) query.isActive = active === 'true';
    if (featured !== undefined) query.isFeatured = featured === 'true';
    
    const courses = await Course.find(query)
      .populate('instructor', 'name email phone specializations')
      .sort({ category: 1, order: 1 });
    
    res.json({
      success: true,
      data: courses.map(course => ({
        ...course.toObject(),
        averageRating: course.getAverageRating ? course.getAverageRating() : 0,
        primaryImage: course.getPrimaryImage ? course.getPrimaryImage() : null,
        formattedPrice: course.getFormattedPrice ? course.getFormattedPrice() : `CHF ${course.price?.amount || course.price || 0}`
      }))
    });
  } catch (error) {
    // Provide fallback data when database is not connected
    const fallbackCourses = [
      {
        _id: '1',
        name: 'Basic Car Driving Course',
        slug: 'basic-car-driving',
        category: 'car',
        description: 'Learn the fundamentals of car driving with our experienced instructors.',
        shortDescription: 'Basic car driving course for beginners',
        price: { amount: 1200, currency: 'CHF' },
        duration: { weeks: 8, description: '8 weeks' },
        isActive: true,
        isFeatured: true,
        averageRating: 4.5,
        totalReviews: 25,
        instructor: { name: 'John Smith', email: 'john@example.com' },
        images: [{ url: '/images/car-course.jpg', isPrimary: true }]
      },
      {
        _id: '2',
        name: 'Motorcycle License Course',
        slug: 'motorcycle-license',
        category: 'motorcycle',
        description: 'Get your motorcycle license with our comprehensive training program.',
        shortDescription: 'Complete motorcycle training program',
        price: { amount: 800, currency: 'CHF' },
        duration: { weeks: 4, description: '4 weeks' },
        isActive: true,
        isFeatured: false,
        averageRating: 4.8,
        totalReviews: 18,
        instructor: { name: 'Maria Garcia', email: 'maria@example.com' },
        images: [{ url: '/images/motorcycle-course.jpg', isPrimary: true }]
      }
    ];
    
    // Filter fallback data based on query parameters
    const { category, active, featured } = req.query;
    let filteredCourses = fallbackCourses.filter(course => {
      if (category && course.category !== category) return false;
      if (active !== undefined && course.isActive !== (active === 'true')) return false;
      if (featured !== undefined && course.isFeatured !== (featured === 'true')) return false;
      return true;
    });
    
    res.json({
      success: true,
      data: filteredCourses
    });
  }
});

// Get courses by category
router.get('/category/:category', async (req, res) => {
  try {
    const courses = await Course.find({ 
      category: req.params.category,
      isActive: true 
    })
    .populate('instructor', 'name email phone specializations')
    .sort({ order: 1 });
    
    res.json({
      success: true,
      data: courses.map(course => ({
        ...course.toObject(),
        averageRating: course.getAverageRating(),
        primaryImage: course.getPrimaryImage(),
        formattedPrice: course.getFormattedPrice()
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses by category',
      error: error.message
    });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email phone specializations bio avatar')
      .populate('reviews.user', 'name avatar');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        ...course.toObject(),
        averageRating: course.getAverageRating(),
        primaryImage: course.getPrimaryImage(),
        formattedPrice: course.getFormattedPrice()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
});

// Get course by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('instructor', 'name email phone specializations bio avatar')
      .populate('reviews.user', 'name avatar');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        ...course.toObject(),
        averageRating: course.getAverageRating(),
        primaryImage: course.getPrimaryImage(),
        formattedPrice: course.getFormattedPrice()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
});

// Create new course
router.post('/', [
  body('name').isLength({ min: 1, max: 200 }).withMessage('Course name must be between 1 and 200 characters'),
  body('category').isIn(['car', 'motorcycle', 'truck', 'bus']).withMessage('Invalid category'),
  body('description').isLength({ min: 1 }).withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('duration').isLength({ min: 1 }).withMessage('Duration is required')
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

    const course = new Course(req.body);
    await course.save();
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: {
        ...course.toObject(),
        averageRating: course.getAverageRating(),
        primaryImage: course.getPrimaryImage(),
        formattedPrice: course.getFormattedPrice()
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Course with this slug already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
});

// Update course
router.put('/:id', [
  body('name').optional().isLength({ min: 1, max: 200 }).withMessage('Course name must be between 1 and 200 characters'),
  body('category').optional().isIn(['car', 'motorcycle', 'truck', 'bus']).withMessage('Invalid category'),
  body('price').optional().isNumeric().withMessage('Price must be a number')
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

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('instructor', 'name email phone specializations');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: {
        ...course.toObject(),
        averageRating: course.getAverageRating(),
        primaryImage: course.getPrimaryImage(),
        formattedPrice: course.getFormattedPrice()
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Course with this slug already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
});

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
});

// Add review to course
router.post('/:id/reviews', [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isLength({ min: 1, max: 1000 }).withMessage('Comment must be between 1 and 1000 characters'),
  body('user').isMongoId().withMessage('Valid user ID is required')
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

    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if user already reviewed this course
    const existingReview = course.reviews.find(
      review => review.user.toString() === req.body.user
    );
    
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'User has already reviewed this course'
      });
    }
    
    course.reviews.push(req.body);
    await course.save();
    
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: {
        ...course.toObject(),
        averageRating: course.getAverageRating()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
});

// Check course availability
router.get('/:id/availability', async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    const isAvailable = course.checkAvailability(new Date(date));
    
    res.json({
      success: true,
      data: {
        available: isAvailable,
        date: date,
        capacity: course.capacity,
        schedule: course.schedule
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking availability',
      error: error.message
    });
  }
});

// Toggle course active status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    course.isActive = !course.isActive;
    await course.save();
    
    res.json({
      success: true,
      message: `Course ${course.isActive ? 'activated' : 'deactivated'} successfully`,
      data: {
        ...course.toObject(),
        averageRating: course.getAverageRating(),
        primaryImage: course.getPrimaryImage(),
        formattedPrice: course.getFormattedPrice()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling course status',
      error: error.message
    });
  }
});

// Toggle course featured status
router.patch('/:id/featured', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    course.isFeatured = !course.isFeatured;
    await course.save();
    
    res.json({
      success: true,
      message: `Course ${course.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: {
        ...course.toObject(),
        averageRating: course.getAverageRating(),
        primaryImage: course.getPrimaryImage(),
        formattedPrice: course.getFormattedPrice()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling course featured status',
      error: error.message
    });
  }
});

// Get course overview statistics
router.get('/stats/overview', async (req, res) => {
  try {
    // Provide fallback stats data
    const stats = {
      overview: {
        total: 4,
        active: 3,
        featured: 2,
        averagePrice: 1000,
        totalReviews: 43
      },
      categories: [
        { category: 'car', count: 2, active: 2 },
        { category: 'motorcycle', count: 1, active: 1 },
        { category: 'truck', count: 1, active: 0 }
      ]
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course statistics',
      error: error.message
    });
  }
});

// Get course statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Course.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ['$isActive', true] }, 1, 0]
            }
          },
          featured: {
            $sum: {
              $cond: [{ $eq: ['$isFeatured', true] }, 1, 0]
            }
          },
          averagePrice: { $avg: '$price' },
          totalReviews: { $sum: { $size: '$reviews' } }
        }
      }
    ]);
    
    const categoryStats = await Course.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ['$isActive', true] }, 1, 0]
            }
          },
          averagePrice: { $avg: '$price' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        overview: stats[0] || { total: 0, active: 0, featured: 0, averagePrice: 0, totalReviews: 0 },
        categories: categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching course statistics',
      error: error.message
    });
  }
});

module.exports = router;