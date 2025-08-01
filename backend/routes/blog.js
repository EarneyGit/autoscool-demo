const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/Blog');

// Get all blog posts (public)
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      tag, 
      author, 
      featured, 
      page = 1, 
      limit = 10, 
      sort = '-publishedAt' 
    } = req.query;
    
    let query = { status: 'published' };
    
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (author) query['author.name'] = new RegExp(author, 'i');
    if (featured !== undefined) query.isFeatured = featured === 'true';
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [posts, total] = await Promise.all([
      Blog.find(query)
        .select('-content') // Exclude full content for list view
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('relatedPosts', 'title slug excerpt featuredImage publishedAt'),
      Blog.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + posts.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    // Fallback data when database is not connected
    const fallbackPosts = [
      {
        _id: '1',
        title: 'Essential Driving Tips for Swiss Roads',
        slug: 'essential-driving-tips-swiss-roads',
        excerpt: 'Learn the most important driving tips for navigating Swiss roads safely and confidently.',
        category: 'driving-tips',
        author: { name: 'Swiss Driving Expert' },
        featuredImage: { url: '/images/swiss-roads.jpg', alt: 'Swiss mountain road' },
        publishedAt: new Date('2024-01-15'),
        readingTime: 5,
        views: 1250,
        isFeatured: true
      },
      {
        _id: '2',
        title: 'Understanding Swiss Traffic Regulations',
        slug: 'understanding-swiss-traffic-regulations',
        excerpt: 'A comprehensive guide to Swiss traffic laws and regulations every driver should know.',
        category: 'regulations',
        author: { name: 'Traffic Law Specialist' },
        featuredImage: { url: '/images/traffic-signs.jpg', alt: 'Swiss traffic signs' },
        publishedAt: new Date('2024-01-10'),
        readingTime: 8,
        views: 980,
        isFeatured: false
      }
    ];
    
    res.json({
      success: true,
      data: fallbackPosts,
      pagination: { current: 1, pages: 1, total: 2, hasNext: false, hasPrev: false }
    });
  }
});

// Get blog post by slug (public)
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await Blog.findOne({ 
      slug: req.params.slug, 
      status: 'published' 
    }).populate('relatedPosts', 'title slug excerpt featuredImage publishedAt author');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Increment views
    await post.incrementViews();
    
    res.json({
      success: true,
      data: {
        ...post.toObject(),
        structuredData: post.getStructuredData(),
        formattedDate: post.getFormattedDate(),
        readingTimeText: post.getReadingTime()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
});

// Get featured posts (public)
router.get('/featured', async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    
    const posts = await Blog.find({ 
      status: 'published', 
      isFeatured: true 
    })
      .select('-content')
      .sort('-publishedAt')
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured posts',
      error: error.message
    });
  }
});

// Get posts by category (public)
router.get('/category/:category', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [posts, total] = await Promise.all([
      Blog.find({ 
        category: req.params.category, 
        status: 'published' 
      })
        .select('-content')
        .sort('-publishedAt')
        .skip(skip)
        .limit(parseInt(limit)),
      Blog.countDocuments({ 
        category: req.params.category, 
        status: 'published' 
      })
    ]);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching posts by category',
      error: error.message
    });
  }
});

// Admin routes - Get all posts (including drafts)
router.get('/admin/all', async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10, sort = '-updatedAt' } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [posts, total] = await Promise.all([
      Blog.find(query)
        .select('-content')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Blog.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
});

// Get single post by ID (admin)
router.get('/admin/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
      .populate('relatedPosts', 'title slug');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
});

// Create new blog post (admin)
router.post('/admin', [
  body('title').isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('excerpt').isLength({ min: 1, max: 300 }).withMessage('Excerpt must be between 1 and 300 characters'),
  body('content').isLength({ min: 1 }).withMessage('Content is required'),
  body('category').isIn(['driving-tips', 'road-safety', 'news', 'guides', 'regulations', 'vehicle-maintenance']).withMessage('Invalid category'),
  body('author.name').isLength({ min: 1 }).withMessage('Author name is required')
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
    
    const post = new Blog(req.body);
    await post.save();
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A post with this slug already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
});

// Update blog post (admin)
router.put('/admin/:id', [
  body('title').optional().isLength({ min: 1, max: 200 }).withMessage('Title must be between 1 and 200 characters'),
  body('excerpt').optional().isLength({ min: 1, max: 300 }).withMessage('Excerpt must be between 1 and 300 characters'),
  body('content').optional().isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('category').optional().isIn(['driving-tips', 'road-safety', 'news', 'guides', 'regulations', 'vehicle-maintenance']).withMessage('Invalid category')
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
    
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
});

// Delete blog post (admin)
router.delete('/admin/:id', async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
});

// Toggle post status (admin)
router.patch('/admin/:id/status', [
  body('status').isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
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
    
    const post = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    res.json({
      success: true,
      message: `Post ${req.body.status} successfully`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating post status',
      error: error.message
    });
  }
});

// Toggle featured status (admin)
router.patch('/admin/:id/featured', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    post.isFeatured = !post.isFeatured;
    await post.save();
    
    res.json({
      success: true,
      message: `Post ${post.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating featured status',
      error: error.message
    });
  }
});

// Get blog statistics (admin)
router.get('/admin/stats/overview', async (req, res) => {
  try {
    const [totalPosts, publishedPosts, draftPosts, totalViews, featuredPosts] = await Promise.all([
      Blog.countDocuments(),
      Blog.countDocuments({ status: 'published' }),
      Blog.countDocuments({ status: 'draft' }),
      Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
      Blog.countDocuments({ isFeatured: true })
    ]);
    
    const categoryStats = await Blog.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews: totalViews[0]?.total || 0,
        featuredPosts,
        categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog statistics',
      error: error.message
    });
  }
});

// Search posts
router.get('/search', async (req, res) => {
  try {
    const { q, category, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    let query = {
      status: 'published',
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { excerpt: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } }
      ]
    };
    
    if (category) {
      query.category = category;
    }
    
    const posts = await Blog.find(query)
      .select('-content')
      .sort('-publishedAt')
      .limit(parseInt(limit));
    
    res.json({
      success: true,
      data: posts,
      total: posts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching posts',
      error: error.message
    });
  }
});

module.exports = router;