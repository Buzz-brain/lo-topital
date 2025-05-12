import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart4, 
  Users, 
  Calendar, 
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import PostForm from '../../components/admin/PostForm';
import { format } from 'date-fns';

const DashboardPage = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  
  // Get all unique categories
  const categories = ['', ...Array.from(new Set(posts.map(post => post.category)))];
  
  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle form submission for new or edited post
  const handlePostSubmit = (postData) => {
    if (editingPost) {
      // Update existing post
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...postData, date: new Date().toISOString().slice(0, 10) } 
          : post
      ));
      setEditingPost(null);
    } else {
      // Add new post
      const newPost = {
        id: posts.length + 1,
        ...postData,
        date: new Date().toISOString().slice(0, 10),
        author: 'Admin User',
        authorImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        isTrending: false
      };
      setPosts([newPost, ...posts]);
    }
    
    setIsAddingPost(false);
  };
  
  // Handle post deletion
  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };
  
  // Stats data
  const stats = [
    { title: 'Total Posts', value: posts.length, icon: BarChart4, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Views', value: '24.5K', icon: Eye, color: 'bg-green-100 text-green-600' },
    { title: 'Total Users', value: '1.2K', icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'Trending Posts', value: posts.filter(post => post.isTrending).length, icon: TrendingUp, color: 'bg-orange-100 text-orange-600' }
  ];
  
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </span>
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            <Calendar size={16} />
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mr-4`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Blog Posts Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Blog Posts</h2>
          <button
            onClick={() => {
              setIsAddingPost(true);
              setEditingPost(null);
            }}
            className="btn btn-primary"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="relative w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-full appearance-none pl-10"
            >
              <option value="">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Post Form */}
        {(isAddingPost || editingPost) && (
          <PostForm 
            post={editingPost}
            onSubmit={handlePostSubmit}
            onCancel={() => {
              setIsAddingPost(false);
              setEditingPost(null);
            }}
            categories={categories.filter(cat => cat !== '')}
          />
        )}
        
        {/* Posts Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                      <span className="font-medium">{post.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </td>
                  <td className="py-3 px-4">
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.isTrending 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {post.isTrending ? 'Trending' : 'Published'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        onClick={() => {
                          setEditingPost(post);
                          setIsAddingPost(true);
                        }}
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No posts found. Try adjusting your search or create a new post.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;