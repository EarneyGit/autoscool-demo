const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/swiss-driving-school');

    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize default SEO data if none exists
    await initializeDefaultSEOData();
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('⚠️  Running without database - some features may be limited');
    // Don't exit process, allow server to run without database
  }
};

// Initialize default SEO data
const initializeDefaultSEOData = async () => {
  try {
    const SEO = require('../models/SEO');
    const count = await SEO.countDocuments();
    
    if (count === 0) {
      const defaultSEOData = [
        {
          page: 'home',
          title: 'Swiss Driving School - Learn to Drive Safely',
          description: 'Professional driving lessons in Switzerland. Learn to drive cars and motorcycles with certified instructors.',
          canonicalUrl: 'http://localhost:5173/',
          keywords: ['driving school', 'switzerland', 'driving lessons', 'car license', 'motorcycle license']
        },
        {
          page: 'about',
          title: 'About Us - Swiss Driving School',
          description: 'Learn about our experienced instructors and proven teaching methods at Swiss Driving School.',
          canonicalUrl: 'http://localhost:5173/about',
          keywords: ['about', 'driving instructors', 'switzerland', 'experience']
        },
        {
          page: 'courses',
          title: 'Driving Courses - Swiss Driving School',
          description: 'Comprehensive driving courses for cars and motorcycles. Choose the perfect course for your needs.',
          canonicalUrl: 'http://localhost:5173/courses',
          keywords: ['driving courses', 'car lessons', 'motorcycle lessons', 'switzerland']
        }
      ];
      
      await SEO.insertMany(defaultSEOData);
      console.log('✅ Default SEO data initialized');
    }
  } catch (error) {
    console.log('⚠️  Could not initialize SEO data:', error.message);
  }
};

module.exports = connectDB;