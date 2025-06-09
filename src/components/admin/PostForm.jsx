import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Save, Image, Loader2 } from "lucide-react";

const PostForm = ({ post, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    primaryImage: post?.primaryImage || null,
    category: post?.category._id || "",
    tag: Array.isArray(post?.tag)
      ? post.tag
      : post?.tag?.split(",").map((t) => t.trim()) || [],
    isTrending: post?.isTrending || false,
  });
  const [tagInput, setTagInput] = useState(formData.tag.join(", "));
  const [filePreview, setFilePreview] = useState(
    typeof post?.primaryImage === "string" ? post.primaryImage : ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // For validation errors

  useEffect(() => {
    setFormData({
      title: post?.title || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      primaryImage: post?.primaryImage || "",
      category: post?.category?._id || "",
      tag: Array.isArray(post?.tag)
        ? post.tag
        : post?.tag?.split(",").map((t) => t.trim()) || [],
      isTrending: post?.isTrending || false,
    });
    setTagInput(
      Array.isArray(post?.tag) ? post.tag.join(", ") : post?.tag || ""
    );
  }, [post]);

  // Handle select change
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  // Handle other inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "tag") {
      setTagInput(value); // just update the raw input string
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Add validation function
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    }
    if (!formData.category) {
      errors.category = "Category is required.";
    }
    if (!formData.excerpt.trim()) {
      errors.excerpt = "Excerpt is required.";
    }
    if (!formData.content.trim()) {
      errors.content = "Content is required.";
    }
    if (!tagInput) {
      errors.tagInput = "Tag is required.";
    }

    if (!formData.primaryImage) {
      errors.primaryImage = "Featured image is required.";
    } else if (formData.primaryImage.size && formData.primaryImage.size > 10 * 1024 * 1024) {
      errors.primaryImage = "Image size must not exceed 10 MB.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setSubmitting(true);

    try {
      const tags = tagInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      await onSubmit({ ...formData, tag: tags });
    } catch (err) {
      console.error("Error submitting form", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Modify file change handler to clear errors if fixed
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFormErrors((prev) => ({
          ...prev,
          primaryImage: "Image size must not exceed 10 MB.",
        }));
        setFormData((prev) => ({ ...prev, primaryImage: null }));
        setFilePreview("");
      } else {
        setFormErrors((prev) => {
          const { primaryImage, ...rest } = prev;
          return rest;
        });
        setFormData((prev) => ({ ...prev, primaryImage: file }));
        setFilePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, primaryImage: null }));
      setFilePreview("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 rounded-lg p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {post ? "Edit Post" : "Create New Post"}
        </h3>
        <button
          onClick={onCancel}
          className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Post Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="Enter post title"
              required
            />
            {formErrors.title && (
            <p className="text-red-600 text-sm mt-1">{formErrors.title}</p>
          )}
          </div>
          
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              className="input w-full appearance-none"
              required
              disabled={!categories.length}
            >
              <option value="" disabled>
                {categories.length
                  ? "Select a category"
                  : "Loading categories..."}
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {formErrors.category && (
            <p className="text-red-600 text-sm mt-1">{formErrors.category}</p>
          )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Excerpt *
            </label>
            <input
              type="text"
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="Brief description of the post"
              required
            />
            {formErrors.excerpt && (
            <p className="text-red-600 text-sm mt-1">{formErrors.excerpt}</p>
          )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="primaryImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Featured Image * <i>(Image size should not exceed 10 MB)</i>
            </label>
            <div className="flex">
              <input
                type="file"
                id="primaryImage"
                name="primaryImage"
                onChange={handleFileChange}
                className={`input w-full rounded-r-none ${
                  formErrors.primaryImage ? "border-red-500" : ""
                }`}
                required
                accept="image/*"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500">
                <Image size={18} />
              </span>
            </div>
            {formErrors.primaryImage && (
              <p className="text-red-600 text-sm mt-1">
                {formErrors.primaryImage}
              </p>
            )}
            {filePreview && (
              <img
                src={filePreview}
                alt="Featured preview"
                className="mt-2 w-full max-h-60 object-cover rounded"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              className="input w-full"
              placeholder="Write your post content here..."
              required
            />
            {formErrors.content && (
            <p className="text-red-600 text-sm mt-1">{formErrors.content}</p>
          )}
          </div>

          <div>
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tags
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={tagInput}
              onChange={handleInputChange}
              className="input w-full"
              placeholder="tag1, tag2, tag3"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate tags with commas
            </p>
            {formErrors.tagInput && (
            <p className="text-red-600 text-sm mt-1">{formErrors.tagInput}</p>
          )}
          </div>

          <div className="flex items-center">
            <label
              htmlFor="isTrending"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="isTrending"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleInputChange}
                className="sr-only"
              />
              <span
                className={`w-10 h-5 ${
                  formData.isTrending ? "bg-primary-600" : "bg-gray-300"
                } rounded-full transition-colors relative inline-block mr-3`}
              >
                <span
                  className={`absolute w-4 h-4 bg-white rounded-full left-0.5 top-0.5 transition-transform ${
                    formData.isTrending ? "translate-x-5" : ""
                  }`}
                ></span>
              </span>
              <span className="text-sm font-medium text-gray-700">
                Mark as Trending
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
            style={{ cursor: submitting ? "not-allowed" : "pointer" }}
          >
            {submitting ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />

                {post ? "Update Post" : "Publish Post"}
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PostForm;
