import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClockIcon,
  EyeIcon,
  SearchIcon,
  ArrowRightIcon,
  TagIcon,
  TrendingUpIcon,
  BookOpenIcon,
  XIcon,
} from "lucide-react";

// SEO Component for structured data
const BlogSEO = ({ 
  title, 
  description, 
  canonicalUrl, 
  structuredData 
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  structuredData?: Record<string, unknown>;
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
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
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Swiss Driving School' },
    ];
    
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
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
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
    
    // Add structured data
    if (structuredData) {
      let structuredDataScript = document.querySelector('#blog-structured-data');
      if (structuredDataScript) {
        structuredDataScript.textContent = JSON.stringify(structuredData);
      } else {
        structuredDataScript = document.createElement('script');
        structuredDataScript.id = 'blog-structured-data';
        structuredDataScript.type = 'application/ld+json';
        structuredDataScript.textContent = JSON.stringify(structuredData);
        document.head.appendChild(structuredDataScript);
      }
    }
  }, [title, description, canonicalUrl, structuredData]);
  
  return null;
};

// Mock data - replace with API calls
const mockBlogPosts = [
  {
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
      <p>Before embarking on a mountain driving adventure, proper preparation is crucial...</p>
    `,
    category: 'driving-tips',
    tags: ['mountain-driving', 'safety', 'swiss-roads'],
    author: {
      name: 'Hans Mueller',
      avatar: 'https://picsum.photos/150/150?random=10',
      bio: 'Senior driving instructor with 15+ years experience'
    },
    featuredImage: {
      url: 'https://picsum.photos/800/400?random=1',
      alt: 'Swiss mountain road with scenic view'
    },
    publishedAt: '2024-01-15T10:00:00Z',
    readingTime: 5,
    views: 1250,
    isFeatured: true,
    seo: {
      metaTitle: 'Essential Driving Tips for Swiss Mountain Roads | Swiss Driving School',
      metaDescription: 'Master Swiss mountain road driving with expert tips. Learn safety techniques, gear usage, and navigation strategies from certified instructors.',
      keywords: ['swiss mountain roads', 'driving tips', 'mountain driving safety']
    }
  },
  {
    id: '2',
    title: 'Understanding Swiss Traffic Regulations 2024',
    slug: 'understanding-swiss-traffic-regulations-2024',
    excerpt: 'Stay updated with the latest Swiss traffic laws and regulations. A comprehensive guide for new and experienced drivers.',
    category: 'regulations',
    tags: ['traffic-laws', 'regulations', 'swiss-driving'],
    author: {
      name: 'Maria Schmidt',
      avatar: 'https://picsum.photos/150/150?random=11'
    },
    featuredImage: {
      url: 'https://picsum.photos/800/400?random=2',
      alt: 'Swiss traffic signs and regulations'
    },
    publishedAt: '2024-01-10T14:30:00Z',
    readingTime: 8,
    views: 980,
    isFeatured: false
  },
  {
    id: '3',
    title: 'Winter Driving Safety in Switzerland',
    slug: 'winter-driving-safety-switzerland',
    excerpt: 'Essential winter driving techniques and safety measures for Swiss roads during snow and ice conditions.',
    category: 'road-safety',
    tags: ['winter-driving', 'safety', 'snow', 'ice'],
    author: {
      name: 'Peter Zimmermann',
      avatar: 'https://picsum.photos/150/150?random=12'
    },
    featuredImage: {
      url: 'https://picsum.photos/800/400?random=3',
      alt: 'Car driving on snowy Swiss road'
    },
    publishedAt: '2024-01-05T09:15:00Z',
    readingTime: 6,
    views: 1450,
    isFeatured: true
  }
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'driving-tips', label: 'Driving Tips' },
  { value: 'road-safety', label: 'Road Safety' },
  { value: 'regulations', label: 'Regulations' },
  { value: 'news', label: 'News' },
  { value: 'guides', label: 'Guides' },
  { value: 'vehicle-maintenance', label: 'Vehicle Maintenance' }
];

const featuredTags = ['mountain-driving', 'winter-driving', 'traffic-laws', 'safety', 'beginner-tips'];

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts] = useState(mockBlogPosts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // SEO data for blog listing page
  const blogSEO = {
    title: 'Driving Blog - Tips, Safety & Regulations | Swiss Driving School',
    description: 'Expert driving tips, road safety advice, and Swiss traffic regulations. Stay informed with our comprehensive driving blog by certified instructors.',
    canonicalUrl: `${window.location.origin}/blog`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Swiss Driving School Blog',
      description: 'Expert driving tips, road safety advice, and Swiss traffic regulations',
      url: `${window.location.origin}/blog`,
      publisher: {
        '@type': 'Organization',
        name: 'Swiss Driving School',
        logo: {
          '@type': 'ImageObject',
          url: `${window.location.origin}/images/logo.png`
        }
      },
      blogPost: posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${window.location.origin}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        author: {
          '@type': 'Person',
          name: post.author.name
        }
      }))
    }
  };

  // Enhanced filter posts based on search and category
  const filteredPosts = mockBlogPosts.filter(post => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower) ||
      post.author.name.toLowerCase().includes(searchLower) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchLower)));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
  const featuredPosts = posts.filter(post => post.isFeatured).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Optional: Real-time search (uncomment if desired)
    // if (e.target.value.length > 2 || e.target.value.length === 0) {
    //   const params = new URLSearchParams(searchParams);
    //   if (e.target.value.trim()) {
    //     params.set('search', e.target.value.trim());
    //   } else {
    //     params.delete('search');
    //   }
    //   setSearchParams(params);
    //   setCurrentPage(1);
    // }
  };

  const clearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-0">
      <BlogSEO {...blogSEO} />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-16 lg:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Driving <span className="text-yellow-400">Blog</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/80">
              Expert tips, safety advice, and the latest in Swiss driving regulations
            </p>
            
            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="relative group">
                <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6 transition-colors group-focus-within:text-primary" />
                <Input
                  type="text"
                  placeholder="Search articles, tips, and guides..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      clearSearch();
                    }
                  }}
                  className="pl-14 pr-32 py-5 text-lg bg-white/95 backdrop-blur border-2 border-white/20 rounded-2xl shadow-2xl focus:border-white focus:ring-4 focus:ring-white/20 transition-all duration-300 placeholder:text-gray-400"
                  autoComplete="off"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-24 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    title="Clear search (Esc)"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                )}
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl px-8 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Search
                </Button>
              </div>
              
              {/* Search suggestions/hints */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-white/70 text-sm">Popular searches:</span>
                {['mountain driving', 'winter safety', 'traffic laws', 'beginner tips'].map((suggestion) => (
                   <button
                     key={suggestion}
                     type="button"
                     onClick={() => {
                       setSearchQuery(suggestion);
                       const params = new URLSearchParams(searchParams);
                       params.set('search', suggestion);
                       setSearchParams(params);
                       setCurrentPage(1);
                     }}
                     className="text-sm bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
                   >
                     {suggestion}
                   </button>
                 ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUpIcon className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Featured Articles</h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.featuredImage?.url || '/images/blog/default.jpg'}
                      alt={post.featuredImage?.alt || post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-black font-semibold">
                      Featured
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Badge variant="outline" className="capitalize">
                        {post.category.replace('-', ' ')}
                      </Badge>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                    
                    <CardTitle className="group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    
                    <CardDescription className="text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar || '/images/default-avatar.jpg'}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <EyeIcon className="h-4 w-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Category Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpenIcon className="h-5 w-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TagIcon className="h-5 w-5" />
                    Popular Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {featuredTags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/5 hover:border-primary/30"
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">
                  {selectedCategory === 'all' ? 'All Articles' : `${categories.find(c => c.value === selectedCategory)?.label} Articles`}
                  <span className="text-gray-500 font-normal ml-2">({filteredPosts.length})</span>
                </h2>
              </div>

              {/* Search Results Info */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="text-center mb-8">
                  <p className="text-gray-600 text-sm">
                    {filteredPosts.length === 0 ? (
                      <span className="text-red-600 font-medium">
                        No articles found
                        {searchQuery && ` for "${searchQuery}"`}
                        {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                      </span>
                    ) : (
                      <span>
                        Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                        {searchQuery && ` for "${searchQuery}"`}
                        {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
                      </span>
                    )}
                  </p>
                  {(searchQuery || selectedCategory !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        const params = new URLSearchParams();
                        setSearchParams(params);
                      }}
                      className="mt-2 text-primary hover:text-primary/80 text-sm underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}

              {loading ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                      <CardHeader>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : paginatedPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {paginatedPosts.map((post) => (
                      <Card key={post.id} className="group hover:shadow-xl transition-all duration-300">
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={post.featuredImage?.url || '/images/blog/default.jpg'}
                            alt={post.featuredImage?.alt || post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <CardHeader>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Badge variant="outline" className="capitalize">
                              {post.category.replace('-', ' ')}
                            </Badge>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>{post.readingTime} min read</span>
                            </div>
                          </div>
                          
                          <CardTitle className="group-hover:text-primary transition-colors">
                            <Link to={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </CardTitle>
                          
                          <CardDescription className="text-base">
                            {post.excerpt}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <img
                                src={post.author.avatar || '/images/default-avatar.jpg'}
                                alt={post.author.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <div>
                                <p className="text-sm font-medium">{post.author.name}</p>
                                <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <EyeIcon className="h-4 w-4" />
                              <span>{post.views}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag.replace('-', ' ')}
                              </Badge>
                            ))}
                          </div>
                          
                          <Button asChild className="w-full">
                            <Link to={`/blog/${post.slug}`}>
                              Read More
                              <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <BookOpenIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or category filter.</p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSearchParams({});
                  }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}