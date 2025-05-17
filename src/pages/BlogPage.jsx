import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Mail, CalendarDays, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { format } from 'date-fns';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Animation sequence for staggered children
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Get all unique categories
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  // Filter blog posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get trending posts
  const trendingPosts = blogPosts.filter(post => post.isTrending);
  
  // Handle newsletter subscription
  const handleSubscription = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!subscriberEmail) {
      setSubscriptionStatus({
        success: false,
        message: 'Please enter your email address.'
      });
      return;
    }
    
    // In a real app, we would send this to an API
    // For demo purposes, we'll simulate a successful subscription
    setTimeout(() => {
      setSubscriptionStatus({
        success: true,
        message: 'Thank you for subscribing to our newsletter!'
      });
      setSubscriberEmail('');
    }, 1000);
  };
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-accent-900/90"></div> */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0606c6]/90 to-[#c50a0a]/80"></div>
          <img 
            src="https://images.pexels.com/photos/34088/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Blog Hero" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container relative py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 rounded-full backdrop-blur-sm mb-6">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Insights & News
            </h1>
            <p className="text-lg text-gray-100 mb-8 max-w-2xl">
              Discover the latest trends, insights, and news in digital marketing, design, and technology.
            </p>
            
            <div className="relative max-w-lg">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="input pl-10 w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Blog Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Category Filter */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="mb-8 flex flex-wrap gap-2"
              >
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === ''
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
              
              {/* Blog Posts */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="space-y-10"
              >
                {filteredPosts.map(post => (
                  <motion.article 
                    key={post.id}
                    variants={fadeIn}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-4 text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                          <CalendarDays size={16} className="mr-1" />
                          {format(new Date(post.date), 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          5 min read
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-3">
                        <Link to="#" className="hover:text-primary-600 transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt.replace(/\n/g, '<br>') }} />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <span className="font-medium">{post.author}</span>
                        </div>
                        {/* <Link
                          to="#"
                          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                        >
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link> */}
                      </div>
                    </div>
                  </motion.article>
                ))}
                
                {filteredPosts.length === 0 && (
                  <motion.div
                    variants={fadeIn}
                    className="text-center py-20"
                  >
                    <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
                    <p className="text-gray-600">
                      No posts match your current filters. Try adjusting your search or category selection.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="sticky top-24"
              >
                {/* Newsletter */}
                <div className="bg-primary-900 text-white rounded-xl p-6 mb-8">
                  <div className="mb-4">
                    <Mail className="h-10 w-10 text-primary-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-primary-100 mb-4">
                    Get the latest insights and trends delivered straight to your inbox.
                  </p>
                  <form onSubmit={handleSubscription}>
                    <input
                      type="email"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      placeholder="Your email address"
                      className="input w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 mb-3"
                    />
                    <button type="submit" className="btn bg-white text-primary-900 hover:bg-white/90 w-full">
                      Subscribe
                    </button>
                  </form>
                  
                  {subscriptionStatus && (
                    <div className={`mt-3 text-sm ${subscriptionStatus.success ? 'text-green-300' : 'text-red-300'}`}>
                      {subscriptionStatus.message}
                    </div>
                  )}
                </div>
                
                {/* Trending Posts */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h3 className="text-lg font-bold mb-4">Trending Articles</h3>
                  <div className="space-y-4">
                    {trendingPosts.map(post => (
                      <div key={post.id} className="flex items-start">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 rounded-md object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-medium mb-1">
                            <Link to="#" className="hover:text-primary-600 transition-colors line-clamp-2">
                              {post.title}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-500">
                            {format(new Date(post.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map(tag => (
                      <span 
                        key={tag} 
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm flex items-center cursor-pointer"
                      >
                        <Tag size={14} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;