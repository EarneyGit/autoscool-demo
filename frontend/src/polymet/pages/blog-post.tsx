import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ClockIcon,
  EyeIcon,
  ArrowLeftIcon,
  ShareIcon,
  BookmarkIcon,
  ThumbsUpIcon,
  TagIcon,
  ChevronRightIcon,
} from "lucide-react";

// SEO Component for individual blog posts
const BlogPostSEO = ({ 
  post,
  canonicalUrl 
}: {
  post: Record<string, unknown>;
  canonicalUrl: string;
}) => {
  useEffect(() => {
    if (!post) return;
    
    // Update document title
    document.title = post.seo?.metaTitle || `${post.title} | Swiss Driving School Blog`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    const description = post.seo?.metaDescription || post.excerpt;
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }
    
    // Update keywords
    const keywords = post.seo?.keywords?.join(', ') || post.tags.join(', ');
    let keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', keywords);
    } else {
      keywordsMeta = document.createElement('meta');
      keywordsMeta.setAttribute('name', 'keywords');
      keywordsMeta.setAttribute('content', keywords);
      document.head.appendChild(keywordsMeta);
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', canonicalUrl);
      document.head.appendChild(canonical);
    }
    
    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'article' },
      { property: 'og:site_name', content: 'Swiss Driving School' },
      { property: 'og:image', content: post.featuredImage?.url || `${window.location.origin}/images/blog/default.jpg` },
      { property: 'og:image:alt', content: post.featuredImage?.alt || post.title },
      { property: 'article:published_time', content: post.publishedAt },
      { property: 'article:modified_time', content: post.updatedAt || post.publishedAt },
      { property: 'article:author', content: post.author.name },
      { property: 'article:section', content: post.category },
    ];
    
    // Add article tags
    post.tags.forEach((tag: string) => {
      ogTags.push({ property: 'article:tag', content: tag });
    });
    
    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', tag.content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        ogTag.setAttribute('content', tag.content);
        document.head.appendChild(ogTag);
      }
    });
    
    // Add Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: post.featuredImage?.url || `${window.location.origin}/images/blog/default.jpg` },
      { name: 'twitter:image:alt', content: post.featuredImage?.alt || post.title },
    ];
    
    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute('content', tag.content);
      } else {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', tag.name);
        twitterTag.setAttribute('content', tag.content);
        document.head.appendChild(twitterTag);
      }
    });
    
    // Add structured data for BlogPosting
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: description,
      image: {
        '@type': 'ImageObject',
        url: post.featuredImage?.url || `${window.location.origin}/images/blog/default.jpg`,
        alt: post.featuredImage?.alt || post.title
      },
      author: {
        '@type': 'Person',
        name: post.author.name,
        description: post.author.bio
      },
      publisher: {
        '@type': 'Organization',
        name: 'Swiss Driving School',
        logo: {
          '@type': 'ImageObject',
          url: `${window.location.origin}/images/logo.png`
        }
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      url: canonicalUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      keywords: post.tags.join(', '),
      articleSection: post.category,
      wordCount: post.content?.split(' ').length || 0,
      timeRequired: `PT${post.readingTime}M`,
      inLanguage: 'en-US',
      isAccessibleForFree: true
    };
    
    let structuredDataScript = document.querySelector('#blog-post-structured-data');
    if (structuredDataScript) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'blog-post-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }
    
    // Add breadcrumb structured data
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: window.location.origin
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${window.location.origin}/blog`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: canonicalUrl
        }
      ]
    };
    
    let breadcrumbScript = document.querySelector('#breadcrumb-structured-data');
    if (breadcrumbScript) {
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
    } else {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'breadcrumb-structured-data';
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(breadcrumbScript);
    }
  }, [post, canonicalUrl]);
  
  return null;
};

// Mock data - replace with API call
const mockBlogPost = {
  id: '1',
  title: 'Essential Driving Tips for Swiss Mountain Roads',
  slug: 'essential-driving-tips-swiss-mountain-roads',
  excerpt: 'Learn how to navigate Switzerland\'s challenging mountain roads safely with expert tips from our certified instructors.',
  content: `
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
      <h2 class="text-2xl font-bold text-blue-900 mb-3">🏔️ Introduction</h2>
      <p class="text-blue-800 leading-relaxed">Switzerland's mountain roads are among the most beautiful and challenging in the world. From the winding passes of the Alps to the scenic routes through the Jura Mountains, these roads offer breathtaking views but require special driving skills and preparation.</p>
    </div>
    
    <h2>🔧 Essential Preparation</h2>
    <p>Before embarking on a mountain driving adventure, proper preparation is crucial:</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 class="font-semibold text-green-800 mb-2">🚗 Vehicle Check</h4>
        <p class="text-green-700 text-sm">Ensure your brakes, tires, and engine are in excellent condition</p>
      </div>
      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 class="font-semibold text-blue-800 mb-2">🌤️ Weather Conditions</h4>
        <p class="text-blue-700 text-sm">Check weather forecasts and road conditions</p>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h4 class="font-semibold text-purple-800 mb-2">🗺️ Route Planning</h4>
        <p class="text-purple-700 text-sm">Study your route and identify rest stops and fuel stations</p>
      </div>
      <div class="bg-red-50 p-4 rounded-lg border border-red-200">
        <h4 class="font-semibold text-red-800 mb-2">🎒 Emergency Kit</h4>
        <p class="text-red-700 text-sm">Pack emergency supplies including warm clothing and food</p>
      </div>
    </div>
    
    <h2>🚙 Driving Techniques</h2>
    
    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6">
      <h3 class="text-yellow-800 font-bold mb-3">⬆️ Uphill Driving</h3>
      <p class="text-yellow-700 mb-3">When driving uphill on mountain roads:</p>
      <ul class="space-y-2">
        <li class="flex items-start"><span class="text-yellow-600 mr-2">•</span>Maintain steady speed and avoid sudden acceleration</li>
        <li class="flex items-start"><span class="text-yellow-600 mr-2">•</span>Use lower gears to maintain engine power</li>
        <li class="flex items-start"><span class="text-yellow-600 mr-2">•</span>Keep a safe following distance</li>
        <li class="flex items-start"><span class="text-yellow-600 mr-2">•</span>Be prepared for slower vehicles and plan overtaking carefully</li>
      </ul>
    </div>
    
    <div class="bg-orange-50 border-l-4 border-orange-400 p-6 my-6">
      <h3 class="text-orange-800 font-bold mb-3">⬇️ Downhill Driving</h3>
      <p class="text-orange-700 mb-3">Descending mountain roads requires special attention:</p>
      <ul class="space-y-2">
        <li class="flex items-start"><span class="text-orange-600 mr-2">•</span>Use engine braking by shifting to lower gears</li>
        <li class="flex items-start"><span class="text-orange-600 mr-2">•</span>Avoid riding the brakes to prevent overheating</li>
        <li class="flex items-start"><span class="text-orange-600 mr-2">•</span>Maintain control and reduce speed before curves</li>
        <li class="flex items-start"><span class="text-orange-600 mr-2">•</span>Be aware of your vehicle's weight and braking distance</li>
      </ul>
    </div>
    
    <h2>🌦️ Weather Considerations</h2>
    <p>Mountain weather can change rapidly. Be prepared for:</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-gray-100 p-4 rounded-lg">
        <h4 class="font-semibold text-gray-800 mb-2">🌫️ Fog</h4>
        <p class="text-gray-700 text-sm">Reduce speed and use fog lights</p>
      </div>
      <div class="bg-blue-100 p-4 rounded-lg">
        <h4 class="font-semibold text-blue-800 mb-2">🌧️ Rain</h4>
        <p class="text-blue-700 text-sm">Increase following distance and reduce speed</p>
      </div>
      <div class="bg-indigo-100 p-4 rounded-lg">
        <h4 class="font-semibold text-indigo-800 mb-2">❄️ Snow and Ice</h4>
        <p class="text-indigo-700 text-sm">Use winter tires or chains when required</p>
      </div>
      <div class="bg-green-100 p-4 rounded-lg">
        <h4 class="font-semibold text-green-800 mb-2">💨 Wind</h4>
        <p class="text-green-700 text-sm">Maintain firm grip on steering wheel</p>
      </div>
    </div>
    
    <div class="bg-red-50 border border-red-200 rounded-lg p-6 my-8">
      <h2 class="text-red-800 font-bold mb-4">⚠️ Safety Tips</h2>
      <p class="text-red-700 mb-4">Additional safety considerations for mountain driving:</p>
      <div class="space-y-3">
        <div class="flex items-start">
          <span class="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
          <p class="text-red-700">Always yield to uphill traffic when roads are narrow</p>
        </div>
        <div class="flex items-start">
          <span class="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
          <p class="text-red-700">Use designated pullouts to let faster traffic pass</p>
        </div>
        <div class="flex items-start">
          <span class="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
          <p class="text-red-700">Keep headlights on for better visibility</p>
        </div>
        <div class="flex items-start">
          <span class="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
          <p class="text-red-700">Respect wildlife crossing areas</p>
        </div>
        <div class="flex items-start">
          <span class="bg-red-200 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
          <p class="text-red-700">Never stop in tunnels except for emergencies</p>
        </div>
      </div>
    </div>
    
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border-l-4 border-green-500 my-8">
      <h2 class="text-green-900 font-bold mb-3">✅ Conclusion</h2>
      <p class="text-green-800 leading-relaxed mb-4">Mountain driving in Switzerland can be an incredible experience when done safely and responsibly. By following these essential tips and maintaining proper vehicle preparation, you can enjoy the stunning Alpine scenery while ensuring the safety of yourself and other road users.</p>
      
      <div class="bg-white p-4 rounded border border-green-200">
        <p class="text-green-700 font-medium">💡 <strong>Pro Tip:</strong> If you're not confident about mountain driving, consider taking additional lessons with our certified instructors who specialize in challenging road conditions.</p>
      </div>
    </div>
  `,
  category: 'driving-tips',
  tags: ['mountain-driving', 'safety', 'swiss-roads', 'alpine-driving'],
  author: {
    name: 'Hans Mueller',
    avatar: 'https://picsum.photos/150/150?random=10',
    bio: 'Senior driving instructor with 15+ years experience in Swiss mountain road training',
    social: {
      linkedin: 'https://linkedin.com/in/hansmueller',
      twitter: 'https://twitter.com/hansmueller'
    }
  },
  featuredImage: {
    url: 'https://picsum.photos/1200/600?random=1',
    alt: 'Swiss mountain road with scenic Alpine view and safety barriers'
  },
  publishedAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-16T14:30:00Z',
  readingTime: 5,
  views: 1250,
  likes: 89,
  isFeatured: true,
  seo: {
    metaTitle: 'Essential Driving Tips for Swiss Mountain Roads | Swiss Driving School',
    metaDescription: 'Master Swiss mountain road driving with expert tips. Learn safety techniques, gear usage, and navigation strategies from certified instructors.',
    keywords: ['swiss mountain roads', 'driving tips', 'mountain driving safety', 'alpine driving', 'swiss driving school']
  }
};

const relatedPosts = [
  {
    id: '2',
    title: 'Winter Driving Safety in Switzerland',
    slug: 'winter-driving-safety-switzerland',
    excerpt: 'Essential winter driving techniques and safety measures for Swiss roads.',
    category: 'road-safety',
    readingTime: 6,
    featuredImage: { url: 'https://picsum.photos/400/250?random=3', alt: 'Winter driving' }
  },
  {
    id: '3',
    title: 'Understanding Swiss Traffic Regulations 2024',
    slug: 'understanding-swiss-traffic-regulations-2024',
    excerpt: 'Stay updated with the latest Swiss traffic laws and regulations.',
    category: 'regulations',
    readingTime: 8,
    featuredImage: { url: 'https://picsum.photos/400/250?random=2', alt: 'Traffic regulations' }
  }
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post] = useState(mockBlogPost);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const canonicalUrl = `${window.location.origin}/blog/${slug}`;

  useEffect(() => {
    // In a real app, fetch post by slug from API
    // For now, using mock data
    if (slug !== post.slug) {
      // Post not found, redirect to blog
      navigate('/blog');
    }
  }, [slug, post.slug, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: canonicalUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(canonicalUrl);
      // You could show a toast notification here
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // In a real app, send API request to update likes
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // In a real app, send API request to update bookmarks
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      <BlogPostSEO post={post} canonicalUrl={canonicalUrl} />
      
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRightIcon className="h-4 w-4" />
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRightIcon className="h-4 w-4" />
            <span className="text-gray-900 font-medium">{post.title}</span>
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <article className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/blog">
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Article Meta */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="capitalize">
                  {post.category.replace('-', ' ')}
                </Badge>
                {post.isFeatured && (
                  <Badge className="bg-yellow-500 text-black">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <img
                    src={post.author.avatar || '/images/default-avatar.jpg'}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{post.author.name}</p>
                    <p className="text-sm">{post.author.bio}</p>
                  </div>
                </div>
                
                <Separator orientation="vertical" className="h-8" />
                
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <EyeIcon className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={post.featuredImage?.url || '/images/blog/default.jpg'}
                alt={post.featuredImage?.alt || post.title}
                className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Article Actions */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <Button
                  variant={liked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center gap-2"
                >
                  <ThumbsUpIcon className="h-4 w-4" />
                  {post.likes + (liked ? 1 : 0)}
                </Button>
                
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={handleBookmark}
                >
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <ShareIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    <TagIcon className="h-3 w-3 mr-1" />
                    {tag.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg prose-slate max-w-none mb-12 
                prose-headings:font-bold prose-headings:text-gray-900 
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-primary
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:my-6 prose-li:my-2 prose-li:text-gray-700
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:p-4 prose-blockquote:italic
                prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-img:rounded-lg prose-img:shadow-md prose-img:my-8
                prose-hr:border-gray-300 prose-hr:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Bio */}
            <Card className="mb-12">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <img
                    src={post.author.avatar || '/images/default-avatar.jpg'}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <CardTitle>About {post.author.name}</CardTitle>
                    <CardDescription>{post.author.bio}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              {post.author.social && (
                <CardContent>
                  <div className="flex gap-2">
                    {post.author.social.linkedin && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={post.author.social.linkedin} target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                    )}
                    {post.author.social.twitter && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={post.author.social.twitter} target="_blank" rel="noopener noreferrer">
                          Twitter
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={relatedPost.featuredImage?.url || '/images/blog/default.jpg'}
                          alt={relatedPost.featuredImage?.alt || relatedPost.title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Badge variant="outline" className="capitalize">
                            {relatedPost.category.replace('-', ' ')}
                          </Badge>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{relatedPost.readingTime} min read</span>
                          </div>
                        </div>
                        
                        <CardTitle className="group-hover:text-primary transition-colors">
                          <Link to={`/blog/${relatedPost.slug}`}>
                            {relatedPost.title}
                          </Link>
                        </CardTitle>
                        
                        <CardDescription>
                          {relatedPost.excerpt}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}