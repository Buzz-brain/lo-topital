import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart4, Users, Calendar, TrendingUp, Folder } from "lucide-react";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";
import BlogPostsPage from "./BlogPostsPage";
const apiURL = import.meta.env.VITE_API_URL;

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, [searchTerm, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiURL}/category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
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

  // Stats data
  const stats = [
    {
      title: "Total Posts",
      value: posts.length,
      icon: BarChart4,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Categories",
      value: categories.length,
      icon: Folder,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Users",
      value: "1",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Trending Posts",
      value: posts.filter((post) => post.isTrending).length,
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">
            {format(new Date(), "EEEE, MMMM d, yyyy")}
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
              <div
                className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mr-4`}
              >
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
      <BlogPostsPage />
    </div>
  );
};

export default DashboardPage;
