import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostDetailsPage from './admin/PostDetailPage';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Mail, CalendarDays, Clock, Loader } from 'lucide-react';
import { format } from 'date-fns';
const apiURL = import.meta.env.VITE_API_URL;

const BlogPage = () => {
  const { id } = useParams(); // If route is /post/:id
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  // Fetch posts from backend API with search and category filter
  useEffect(() => {
    const fetchPosts = async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        // Build query params
        const queryParams = new URLSearchParams();

        let url = `${apiURL}/posts/search-filter`;
        queryParams.append("q", searchTerm);
        queryParams.append("category", selectedCategory);
        queryParams.append("page", page);

        const response = await fetch(`${url}?${queryParams.toString()}`);
        const data = await response.json();
        setPosts(data.posts || []);

        // Filter trending posts from the fetched posts
        const trending = data.posts.filter(post => post.isTrending);
        setTrendingPosts(trending);

      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiURL}/category`);
        const data = await response.json();
        console.log(data)
        setCategories(data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // useEffect to fetch categories
    fetchCategories();
  }, []);

  // Handle newsletter subscription (unchanged)
  const handleSubscription = (e) => {
    e.preventDefault();
    if (!subscriberEmail) {
      setSubscriptionStatus({ success: false, message: 'Please enter your email address.' });
      return;
    }
    setTimeout(() => {
      setSubscriptionStatus({ success: true, message: 'Thank you for subscribing to our newsletter!' });
      setSubscriberEmail('');
    }, 1000);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
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
              Discover the latest trends, insights, and news in digital
              marketing, design, and technology.
            </p>
            <div className="relative max-w-lg">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="input pl-10 w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                size={18}
              />
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
              {!id ? 
              <div> 
              {/* Category Filter */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="mb-8 flex flex-wrap gap-2"
              >
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === ""
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category._id
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </motion.div>

              {loading && (
                <motion.div
                  variants={fadeIn}
                  className="flex justify-center items-center min-h-[200px]"
                >
                  <Loader
                    className="animate-spin text-gray-500 px-2"
                    size={40}
                  />
                  Fetching posts
                </motion.div>
              )}

              {error && (
                <motion.div
                  variants={fadeIn}
                  className="text-center py-20 text-red-500"
                >
                  {error}
                </motion.div>
              )}

              {!loading && !error && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}
                  className="space-y-10"
                >
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <motion.article
                        key={post._id}
                        variants={fadeIn}
                        className="bg-white rounded-xl shadow-sm overflow-hidden"
                      >
                        <div className="relative h-64 md:h-80 overflow-hidden">
                          <img
                            src={post.primaryImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                              {post.category?.name}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center mb-4 text-sm text-gray-500">
                            <div className="flex items-center mr-4">
                              <CalendarDays size={16} className="mr-1" />
                              {format(new Date(post.createdAt), "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1" />5 min read
                            </div>
                          </div>
                          <h2 className="text-2xl font-bold mb-3">
                            <Link
                              to="#"
                              className="hover:text-primary-600 transition-colors"
                            >
                              Title {post.title}
                            </Link>
                          </h2>
                          Excerpt
                          <p
                            className="text-gray-600 mb-4"
                            dangerouslySetInnerHTML={{
                              __html:
                                post.excerpt?.replace(/\n/g, "<br>") || "",
                            }}
                          />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                // src={post.authorImage || post.author?.image}
                                src={
                                  "https://res.cloudinary.com/df2q6gyuq/image/upload/v1747312331/IMG-20250513-WA0043_nrh3pb.jpg"
                                }
                                // alt={post.author?.name || post.author}
                                alt={"Favour Onyekachi"}
                                className="w-10 h-10 rounded-full object-cover mr-3"
                              />
                              <span className="font-medium">
                                {"Favour Onyekachi"}
                              </span>
                            </div>
                            <Link
                              to={`/post/${post._id}`}
                              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                            >
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    ))
                  ) : (
                    <motion.div variants={fadeIn} className="text-center py-20">
                      <h3 className="text-xl font-semibold mb-2">
                        No Posts Found
                      </h3>
                      <p className="text-gray-600">
                        No posts match your current filters. Try adjusting your
                        search or category selection.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>

              : 
              <PostDetailsPage postId={id} />
              }
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="mb-12"
              >
                <h3 className="text-xl font-semibold mb-6">Trending Posts</h3>
                <div className="space-y-6">
                  {trendingPosts.length > 0 ? (
                    trendingPosts.map((post) => (
                      <Link
                        to="#"
                        key={post._id || post.id}
                        className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-md transition-colors"
                      >
                        <img
                          src={post.primaryImage}
                          alt={post.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h4 className="text-sm font-semibold">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {post.category?.name || post.category}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No trending posts available.
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4">
                  Subscribe to Newsletter
                </h3>
                <form
                  onSubmit={handleSubscription}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      placeholder="Your email address"
                      className="input pl-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-600"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Subscribe
                  </button>
                </form>
                {subscriptionStatus && (
                  <p
                    className={`mt-4 text-sm ${
                      subscriptionStatus.success
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {subscriptionStatus.message}
                  </p>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};


export default BlogPage;
