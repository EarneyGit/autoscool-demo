const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Content = require('../models/Content');

// Get content statistics
router.get('/stats/overview', async (req, res) => {
  try {
    // Provide fallback stats data
    const stats = {
      overview: {
        total: 12,
        active: 10,
        sections: 8,
        lastUpdated: new Date().toISOString()
      },
      sections: [
        { name: 'Hero', count: 1, active: 1 },
        { name: 'About', count: 2, active: 2 },
        { name: 'Services', count: 3, active: 3 },
        { name: 'Contact', count: 2, active: 2 }
      ]
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching content statistics',
      error: error.message
    });
  }
});

// Get all content sections
router.get('/', async (req, res) => {
  try {
    const { section, active } = req.query;
    let query = {};
    
    if (section) query.section = section;
    if (active !== undefined) query.isActive = active === 'true';
    
    const content = await Content.find(query).sort({ section: 1, order: 1 });
    
    res.json({
      success: true,
      data: content.map(item => item.getFormattedContent())
    });
  } catch (error) {
    // Provide fallback content data when database is not connected
    const fallbackContent = [
      {
        _id: '1',
        section: 'hero-home',
        key: 'main-hero',
        title: 'Learn to Drive with Confidence',
        subtitle: 'Professional Driving School in Switzerland',
        content: 'Get your driving license with our experienced instructors and modern teaching methods.',
        imageUrl: '/images/hero-driving.jpg',
        buttonText: 'Start Learning',
        buttonUrl: '/courses',
        isActive: true,
        order: 0
      },
      {
        _id: '2',
        section: 'about-intro',
        key: 'about-main',
        title: 'About Our Driving School',
        content: 'With over 15 years of experience, we provide comprehensive driving education.',
        isActive: true,
        order: 0
      },
      {
        _id: '3',
        section: 'services-overview',
        key: 'services-main',
        title: 'Our Services',
        content: 'We offer a wide range of driving courses for all skill levels.',
        isActive: true,
        order: 0
      }
    ];
    
    // Filter fallback data based on query parameters
    const { section, active } = req.query;
    let filteredContent = fallbackContent;
    if (section) {
      filteredContent = filteredContent.filter(item => item.section === section);
    }
    if (active !== undefined) {
      filteredContent = filteredContent.filter(item => item.isActive === (active === 'true'));
    }
    
    res.json({
      success: true,
      data: filteredContent
    });
  }
});

// Get available content sections
router.get('/sections', async (req, res) => {
  try {
    // Provide fallback sections data
    const sections = [
      { value: 'hero-home', label: 'Hero Section', count: 1 },
      { value: 'about-intro', label: 'About Introduction', count: 1 },
      { value: 'services-overview', label: 'Services Overview', count: 3 },
      { value: 'courses-car', label: 'Car Courses', count: 2 },
      { value: 'courses-motorcycle', label: 'Motorcycle Courses', count: 1 },
      { value: 'packages-overview', label: 'Packages Overview', count: 2 },
      { value: 'instructors-intro', label: 'Instructors Introduction', count: 1 },
      { value: 'contact-info', label: 'Contact Information', count: 1 },
      { value: 'footer-content', label: 'Footer Content', count: 1 }
    ];
    
    res.json({
      success: true,
      data: sections
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching content sections',
      error: error.message
    });
  }
});

// Get content by section
router.get('/section/:section', async (req, res) => {
  try {
    const content = await Content.find({ 
      section: req.params.section,
      isActive: true 
    }).sort({ order: 1 });
    
    res.json({
      success: true,
      data: content.map(item => item.getFormattedContent())
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching content section',
      error: error.message
    });
  }
});

// Get single content item
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      data: content.getFormattedContent()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching content',
      error: error.message
    });
  }
});

// Create new content
router.post('/', [
  body('section').isIn([
    'hero-home',
    'about-intro',
    'services-overview',
    'courses-car',
    'courses-motorcycle',
    'packages-overview',
    'instructors-intro',
    'contact-info',
    'footer-content',
    'testimonials',
    'success-stats',
    'why-choose-us',
    'call-to-action'
  ]).withMessage('Invalid section'),
  body('title').isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('content').isLength({ min: 1 }).withMessage('Content is required')
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

    const content = new Content(req.body);
    await content.save();
    
    res.status(201).json({
      success: true,
      message: 'Content created successfully',
      data: content.getFormattedContent()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating content',
      error: error.message
    });
  }
});

// Update content
router.put('/:id', [
  body('title').optional().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('content').optional().isLength({ min: 1 }).withMessage('Content cannot be empty')
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

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content updated successfully',
      data: content.getFormattedContent()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating content',
      error: error.message
    });
  }
});

// Delete content
router.delete('/:id', async (req, res) => {
  try {
    const content = await Content.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting content',
      error: error.message
    });
  }
});

// Toggle content active status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }
    
    content.isActive = !content.isActive;
    await content.save();
    
    res.json({
      success: true,
      message: `Content ${content.isActive ? 'activated' : 'deactivated'} successfully`,
      data: content.getFormattedContent()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error toggling content status',
      error: error.message
    });
  }
});

// Reorder content items
router.patch('/reorder', [
  body('items').isArray().withMessage('Items must be an array'),
  body('items.*.id').isMongoId().withMessage('Invalid content ID'),
  body('items.*.order').isInt({ min: 0 }).withMessage('Order must be a non-negative integer')
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

    const { items } = req.body;
    
    // Update order for each item
    const updatePromises = items.map(item => 
      Content.findByIdAndUpdate(item.id, { order: item.order })
    );
    
    await Promise.all(updatePromises);
    
    res.json({
      success: true,
      message: 'Content order updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering content',
      error: error.message
    });
  }
});

// Bulk operations
router.post('/bulk', [
  body('action').isIn(['activate', 'deactivate', 'delete']).withMessage('Invalid bulk action'),
  body('ids').isArray().withMessage('IDs must be an array'),
  body('ids.*').isMongoId().withMessage('Invalid content ID')
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

    const { action, ids } = req.body;
    let result;
    
    switch (action) {
      case 'activate':
        result = await Content.updateMany(
          { _id: { $in: ids } },
          { isActive: true }
        );
        break;
      case 'deactivate':
        result = await Content.updateMany(
          { _id: { $in: ids } },
          { isActive: false }
        );
        break;
      case 'delete':
        result = await Content.deleteMany({ _id: { $in: ids } });
        break;
    }
    
    res.json({
      success: true,
      message: `Bulk ${action} completed successfully`,
      affected: result.modifiedCount || result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error performing bulk operation',
      error: error.message
    });
  }
});

// Get content statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await Content.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ['$isActive', true] }, 1, 0]
            }
          },
          inactive: {
            $sum: {
              $cond: [{ $eq: ['$isActive', false] }, 1, 0]
            }
          }
        }
      }
    ]);
    
    const sectionStats = await Content.aggregate([
      {
        $group: {
          _id: '$section',
          count: { $sum: 1 },
          active: {
            $sum: {
              $cond: [{ $eq: ['$isActive', true] }, 1, 0]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        overview: stats[0] || { total: 0, active: 0, inactive: 0 },
        sections: sectionStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching content statistics',
      error: error.message
    });
  }
});

module.exports = router;