import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Building2,
  User,
  MessageSquareText,
  Calendar,
} from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const MessagePage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${apiURL}/messages`);
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Contact Messages
      </motion.h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {messages.map((msg, index) => (
          <motion.div
            key={msg._id}
            className="rounded-2xl shadow-md p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <User size={18} /> <span className="font-medium">{msg.name}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Mail size={18} /> {msg.email}
              </p>
              {msg.phone && (
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Phone size={18} /> {msg.phone}
                </p>
              )}
              {msg.company && (
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Building2 size={18} /> {msg.company}
                </p>
              )}
              {msg.service && (
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MessageSquareText size={18} /> {msg.service}
                </p>
              )}
                
              <div className="text-gray-700 dark:text-gray-100 border-t pt-2 mt-2 text-sm">
                <b>Message</b>
                <p>{msg.message}</p>
              </div>
              <p className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                <Calendar size={16} />
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MessagePage;
