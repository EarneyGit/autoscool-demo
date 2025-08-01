const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    enum: [
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
    ]
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  buttons: [{
    text: String,
    url: String,
    type: {
      type: String,
      enum: ['primary', 'secondary', 'outline'],
      default: 'primary'
    },
    external: {
      type: Boolean,
      default: false
    }
  }],
  features: [{
    icon: String,
    title: String,
    description: String
  }],
  statistics: [{
    number: String,
    label: String,
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  metadata: {
    backgroundColor: String,
    textColor: String,
    layout: {
      type: String,
      enum: ['default', 'centered', 'split', 'grid'],
      default: 'default'
    },
    animation: {
      type: String,
      enum: ['none', 'fade', 'slide', 'zoom'],
      default: 'none'
    }
  }
}, {
  timestamps: true
});

// Index for efficient querying
contentSchema.index({ section: 1, isActive: 1, order: 1 });

// Method to get formatted content for frontend
contentSchema.methods.getFormattedContent = function() {
  return {
    id: this._id,
    section: this.section,
    title: this.title,
    subtitle: this.subtitle,
    content: this.content,
    images: this.images,
    buttons: this.buttons,
    features: this.features,
    statistics: this.statistics,
    metadata: this.metadata,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model('Content', contentSchema);