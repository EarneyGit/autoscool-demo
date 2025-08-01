const mongoose = require('mongoose');

const seoSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true,
    enum: ['home', 'about', 'courses', 'courses-car', 'courses-motorcycle', 'packages', 'contact', 'instructors', 'blog', 'blog-post']
  },
  title: {
    type: String,
    required: true,
    maxlength: 60
  },
  description: {
    type: String,
    required: true,
    maxlength: 160
  },
  keywords: [{
    type: String,
    maxlength: 50
  }],
  canonicalUrl: {
    type: String,
    required: true
  },
  ogTitle: {
    type: String,
    maxlength: 60
  },
  ogDescription: {
    type: String,
    maxlength: 160
  },
  ogImage: {
    type: String
  },
  ogType: {
    type: String,
    default: 'website'
  },
  twitterCard: {
    type: String,
    default: 'summary_large_image'
  },
  twitterTitle: {
    type: String,
    maxlength: 60
  },
  twitterDescription: {
    type: String,
    maxlength: 160
  },
  twitterImage: {
    type: String
  },
  structuredData: {
    organization: {
      name: String,
      url: String,
      logo: String,
      contactPoint: {
        telephone: String,
        contactType: String,
        email: String,
        address: {
          streetAddress: String,
          addressLocality: String,
          postalCode: String,
          addressCountry: String
        }
      },
      sameAs: [String]
    },
    localBusiness: {
      name: String,
      image: String,
      telephone: String,
      email: String,
      address: {
        streetAddress: String,
        addressLocality: String,
        postalCode: String,
        addressCountry: String
      },
      geo: {
        latitude: Number,
        longitude: Number
      },
      openingHours: [String],
      priceRange: String,
      aggregateRating: {
        ratingValue: Number,
        reviewCount: Number
      }
    },
    course: {
      name: String,
      description: String,
      provider: String,
      courseMode: String,
      duration: String,
      price: String,
      currency: String
    },
    faq: [{
      question: String,
      answer: String
    }],
    breadcrumb: [{
      name: String,
      url: String
    }]
  },
  robotsDirectives: {
    index: {
      type: Boolean,
      default: true
    },
    follow: {
      type: Boolean,
      default: true
    },
    noarchive: {
      type: Boolean,
      default: false
    },
    nosnippet: {
      type: Boolean,
      default: false
    }
  },
  hreflang: [{
    lang: String,
    url: String
  }],
  priority: {
    type: Number,
    min: 0.0,
    max: 1.0,
    default: 0.5
  },
  changeFreq: {
    type: String,
    enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
    default: 'weekly'
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to update lastModified
seoSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

// Method to generate robots meta tag
seoSchema.methods.getRobotsDirective = function() {
  const directives = [];
  
  if (this.robotsDirectives.index) {
    directives.push('index');
  } else {
    directives.push('noindex');
  }
  
  if (this.robotsDirectives.follow) {
    directives.push('follow');
  } else {
    directives.push('nofollow');
  }
  
  if (this.robotsDirectives.noarchive) {
    directives.push('noarchive');
  }
  
  if (this.robotsDirectives.nosnippet) {
    directives.push('nosnippet');
  }
  
  return directives.join(', ');
};

// Method to generate JSON-LD structured data
seoSchema.methods.getStructuredData = function() {
  const structuredData = [];
  
  // Organization schema
  if (this.structuredData.organization) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      ...this.structuredData.organization
    });
  }
  
  // Local Business schema
  if (this.structuredData.localBusiness) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      ...this.structuredData.localBusiness
    });
  }
  
  // Course schema
  if (this.structuredData.course) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      ...this.structuredData.course
    });
  }
  
  // FAQ schema
  if (this.structuredData.faq && this.structuredData.faq.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.structuredData.faq.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }
  
  // Breadcrumb schema
  if (this.structuredData.breadcrumb && this.structuredData.breadcrumb.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.structuredData.breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    });
  }
  
  return structuredData;
};

module.exports = mongoose.model('SEO', seoSchema);