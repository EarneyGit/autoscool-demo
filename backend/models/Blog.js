const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  content: {
    type: String,
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    bio: String
  },
  category: {
    type: String,
    required: true,
    enum: ['driving-tips', 'road-safety', 'news', 'guides', 'regulations', 'vehicle-maintenance']
  },
  tags: [{
    type: String,
    maxlength: 50
  }],
  featuredImage: {
    url: String,
    alt: String,
    caption: String
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishedAt: {
    type: Date
  },
  readingTime: {
    type: Number, // in minutes
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  // SEO Fields
  seo: {
    metaTitle: {
      type: String,
      maxlength: 60
    },
    metaDescription: {
      type: String,
      maxlength: 160
    },
    keywords: [{
      type: String,
      maxlength: 50
    }],
    canonicalUrl: String,
    ogTitle: {
      type: String,
      maxlength: 60
    },
    ogDescription: {
      type: String,
      maxlength: 160
    },
    ogImage: String,
    twitterTitle: {
      type: String,
      maxlength: 60
    },
    twitterDescription: {
      type: String,
      maxlength: 160
    },
    twitterImage: String,
    structuredData: {
      headline: String,
      datePublished: Date,
      dateModified: Date,
      author: {
        name: String,
        url: String
      },
      publisher: {
        name: String,
        logo: String
      },
      mainEntityOfPage: String,
      articleSection: String,
      wordCount: Number
    },
    robotsDirectives: {
      index: {
        type: Boolean,
        default: true
      },
      follow: {
        type: Boolean,
        default: true
      }
    }
  },
  // Related posts
  relatedPosts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
  // Comments (if needed)
  comments: [{
    name: String,
    email: String,
    content: String,
    isApproved: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Indexes for better performance
blogSchema.index({ slug: 1 });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ isFeatured: 1, status: 1 });
blogSchema.index({ 'author.name': 1 });

// Pre-save middleware
blogSchema.pre('save', function(next) {
  // Generate slug if not provided
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  // Calculate reading time (average 200 words per minute)
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);
    
    // Update structured data word count
    if (this.seo && this.seo.structuredData) {
      this.seo.structuredData.wordCount = wordCount;
    }
  }
  
  // Auto-generate SEO fields if not provided
  if (!this.seo.metaTitle && this.title) {
    this.seo.metaTitle = this.title.length > 60 ? this.title.substring(0, 57) + '...' : this.title;
  }
  
  if (!this.seo.metaDescription && this.excerpt) {
    this.seo.metaDescription = this.excerpt.length > 160 ? this.excerpt.substring(0, 157) + '...' : this.excerpt;
  }
  
  // Set published date when status changes to published
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Instance methods
blogSchema.methods.getFormattedDate = function() {
  return this.publishedAt ? this.publishedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;
};

blogSchema.methods.getReadingTime = function() {
  return `${this.readingTime} min read`;
};

blogSchema.methods.getStructuredData = function() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: this.seo?.structuredData?.headline || this.title,
    image: this.featuredImage?.url,
    author: {
      '@type': 'Person',
      name: this.author.name,
      url: this.seo?.structuredData?.author?.url
    },
    publisher: {
      '@type': 'Organization',
      name: this.seo?.structuredData?.publisher?.name || 'Swiss Driving School',
      logo: {
        '@type': 'ImageObject',
        url: this.seo?.structuredData?.publisher?.logo
      }
    },
    datePublished: this.publishedAt,
    dateModified: this.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': this.seo?.structuredData?.mainEntityOfPage
    },
    description: this.excerpt,
    articleSection: this.category,
    wordCount: this.seo?.structuredData?.wordCount
  };
};

blogSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model('Blog', blogSchema);