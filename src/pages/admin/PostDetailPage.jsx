import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader, ArrowLeft, Tag, Folder } from "lucide-react";
import { motion } from "framer-motion";

const apiURL = import.meta.env.VITE_API_URL;

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${apiURL}/post/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader className="animate-spin text-gray-500 mr-2" size={40} />
        Fetching post detail
      </div>
    );

  if (!post)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Post not found.
      </div>
    );

  return (
    <section className="py-5">
      <div className="container mx-auto max-w-5xl px-4">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center mb-8 text-primary-600 hover:text-primary-800 font-semibold transition-colors"
          aria-label="Go back"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to posts
        </motion.button>

        <motion.article
          className="bg-white rounded-xl shadow-lg p-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-6">
            <h1 className="text-4xl font-extrabold mb-3 text-gray-900">
              {post.title}
            </h1>

            <div className="flex items-center space-x-4 text-gray-500 text-sm select-none">
              <span className="inline-flex items-center bg-primary-600 text-white px-3 py-1 rounded-full font-medium">
                <Folder  size={14} className="mr-1" />
                {post.category?.name || "Uncategorized"}
              </span>

              <time dateTime={new Date(post.createdAt).toISOString()}>
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          {post.primaryImage && (
            <img
              src={post.primaryImage}
              alt={post.title}
              className="w-full max-h-96 object-cover rounded-lg mb-8 shadow-md"
              loading="lazy"
            />
          )}

          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line">
            {post.content}
          </div>

          {post.tag && (
            <footer className="mt-12">
              <h4 className="font-semibold mb-3 text-gray-800">Tags: <span className="inline-flex items-center bg-primary-100 text-primary-700 rounded-full px-4 py-1 text-sm font-medium"><Tag size={16} className="mr-1" /> {post.tag}</span></h4> 
            </footer>
          )}
        </motion.article>
      </div>
    </section>
  );
};

export default PostDetailPage;
