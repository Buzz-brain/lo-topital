import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Image } from 'lucide-react';

const PostForm = ({ post, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    category: '',
    tags: '',
    isTrending: false
  });
  
  // If editing a post, populate form with post data
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        category: post.category,
        tags: post.tags.join(', '),
        isTrending: post.isTrending
      });
    }
  }, [post]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format tags as array
    const formattedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim())
    };
    
    onSubmit(formattedData);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 rounded-lg p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {post ? 'Edit Post' : 'Create New Post'}
        </h3>
        <button
          onClick={onCancel}
          className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input w-full"
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input w-full"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt *
            </label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              className="input w-full"
              placeholder="Brief description of the post"
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Featured Image URL *
            </label>
            <div className="flex">
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input w-full rounded-r-none"
                placeholder="https://example.com/image.jpg"
                required
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                <Image size={18} />
              </span>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="input w-full"
              placeholder="Write your post content here..."
              required
            />
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="input w-full"
              placeholder="tag1, tag2, tag3"
            />
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="isTrending" className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="isTrending"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="sr-only"
              />
              <span className={`w-10 h-5 ${formData.isTrending ? 'bg-primary-600' : 'bg-gray-300'} rounded-full transition-colors relative inline-block mr-3`}>
                <span className={`absolute w-4 h-4 bg-white rounded-full left-0.5 top-0.5 transition-transform ${formData.isTrending ? 'translate-x-5' : ''}`}></span>
              </span>
              <span className="text-sm font-medium text-gray-700">Mark as Trending</span>
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            <Save className="mr-2 h-4 w-4" />
            {post ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PostForm;