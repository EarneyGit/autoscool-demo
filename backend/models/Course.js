const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    enum: ['car', 'motorcycle', 'professional', 'specialized']
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  price: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'CHF'
    },
    discountPrice: Number,
    priceNote: String
  },
  duration: {
    hours: Number,
    weeks: Number,
    description: String
  },
  requirements: [{
    type: String
  }],
  includes: [{
    type: String
  }],
  features: [{
    icon: String,
    title: String,
    description: String
  }],
  curriculum: [{
    module: String,
    topics: [String],
    duration: String
  }],
  images: [{
    url: String,
    alt: String,
    caption: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  },
  schedule: [{
    dayOfWeek: {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    startTime: String,
    endTime: String,
    location: String
  }],
  capacity: {
    max: Number,
    current: {
      type: Number,
      default: 0
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  reviews: [{
    student: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient querying
courseSchema.index({ category: 1, isActive: 1, order: 1 });
courseSchema.index({ slug: 1 });
courseSchema.index({ isFeatured: 1, isActive: 1 });

// Pre-save middleware to generate slug
courseSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Method to calculate average rating
courseSchema.methods.calculateAverageRating = function() {
  const approvedReviews = this.reviews.filter(review => review.isApproved);
  if (approvedReviews.length === 0) {
    this.averageRating = 0;
    this.totalReviews = 0;
    return;
  }
  
  const sum = approvedReviews.reduce((acc, review) => acc + review.rating, 0);
  this.averageRating = Math.round((sum / approvedReviews.length) * 10) / 10;
  this.totalReviews = approvedReviews.length;
};

// Method to get primary image
courseSchema.methods.getPrimaryImage = function() {
  const primaryImage = this.images.find(img => img.isPrimary);
  return primaryImage || this.images[0] || null;
};

// Method to check availability
courseSchema.methods.isAvailable = function() {
  return this.isActive && (!this.capacity.max || this.capacity.current < this.capacity.max);
};

// Method to get formatted price
courseSchema.methods.getFormattedPrice = function() {
  if (this.price.discountPrice) {
    return {
      original: `${this.price.currency} ${this.price.amount}`,
      discount: `${this.price.currency} ${this.price.discountPrice}`,
      savings: this.price.amount - this.price.discountPrice
    };
  }
  return {
    current: `${this.price.currency} ${this.price.amount}`
  };
};

module.exports = mongoose.model('Course', courseSchema);