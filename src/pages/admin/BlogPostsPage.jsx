import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Filter, Search, Loader } from "lucide-react";
import PostForm from "../../components/admin/PostForm";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
const apiURL = import.meta.env.VITE_API_URL;

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authFetch } = useAuth();
  const navigate = useNavigate();
  const cloudName = "df2q6gyuq";
  const uploadPreset = "upload_preset";

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [searchTerm, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiURL}/category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      console.log(data);
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async (page = 1) => {
    setLoading(true);

    try {
      const queryParams = new URLSearchParams();

      let url = `${apiURL}/posts/search-filter`;
      queryParams.append("q", searchTerm);
      queryParams.append("category", selectedCategory);
      queryParams.append("page", page);

      const response = await fetch(`${url}?${queryParams.toString()}`);
      const data = await response.json();

      setPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for new or edited post
  const handlePostSubmit = async (formData) => {
    try {
      let primaryImageUrl = formData.primaryImage;

      // If primaryImage is a File (new upload), upload to Cloudinary
      if (formData.primaryImage instanceof File) {
        const imageData = new FormData();
        imageData.append("file", formData.primaryImage);
        imageData.append("upload_preset", uploadPreset);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(
            uploadResult.error?.message || "Cloudinary upload failed"
          );
        }

        primaryImageUrl = uploadResult.secure_url;
      }

      // Now send the data to backend with primaryImageUrl
      const payload = {
        ...formData,
        primaryImage: primaryImageUrl, // replace file with URL
      };

      if (editingPost) {
        // Update existing post
        const res = await authFetch(`${apiURL}/post/${editingPost._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        // if (!res.ok) throw new Error("Failed to update post");
        const updatedPost = await res.json();
        toast.success(updatedPost.message);

        setPosts(
          posts.map((post) =>
            post.id === editingPost._id
              ? { ...post, ...formData, ...updatedPost.formData }
              : post
          )
        );
        fetchPosts();
        setEditingPost(null);
      } else {
        // Add new post
        const res = await authFetch(`${apiURL}/post`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
          // After creation, re-fetch posts or append new post:
          fetchPosts();
        }
      }
      setIsAddingPost(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const res = await authFetch(`${apiURL}/post/${postId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete post");
        const data = await res.json();
        setPosts(posts.filter((post) => post.id !== postId));
        toast.success(data.message);
        fetchPosts();
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="py-6">
      <ToastContainer />

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
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          <div className="relative w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-full appearance-none pl-10"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
        Post Form
        {(isAddingPost || editingPost) && (
          <PostForm
            post={editingPost}
            onSubmit={handlePostSubmit}
            onCancel={() => {
              setIsAddingPost(false);
              setEditingPost(null);
            }}
            categories={categories}
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-gray-500">
                    <div className="flex justify-center items-center min-h-[200px]">
                      <Loader
                        className="animate-spin text-gray-500 px-2"
                        size={40}
                      />{" "}
                      Fetching posts
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  {posts.map((post) => (
                    <tr
                      key={post._id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/admin/post/${post._id}`)}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <img
                            src={post.primaryImage}
                            alt={post.title}
                            className="w-10 h-10 rounded object-cover mr-3"
                          />
                          <span className="font-medium">{post.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                          {post.category.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.isTrending
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post.isTrending ? "Trending" : "Published"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div
                          className="flex items-center justify-center space-x-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPost(post);
                              setIsAddingPost(true);
                            }}
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePost(post._id);
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {posts.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-gray-500"
                      >
                        No posts found. Try adjusting your search or create a
                        new post.
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
