import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from 'framer-motion';

const AdminHeader = () => {
  const { currentUser, logout } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout()
      .then((data) => {
        // Handle successful registration
        console.log(data);
        toast.success("Logging out...");
        setTimeout(() => {
          navigate('/admin/login');
        }, 5000);
      })
      .catch((error) => {
        // Handle logout error
        console.error(error);
        toast.error(error.message);
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/admin/dashboard" className="flex items-center">
            <span className="font-bold text-xl bg-gradient-to-r from-primary-600 to-accent-600 text-transparent bg-clip-text">
              LOTOPITAL
            </span>
            <span className="ml-2 text-sm font-medium text-gray-500">Admin</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <Bell size={20} />
          </button>
          
          <div className="relative">
            <button
              className="flex items-center space-x-2"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <span className="hidden md:block text-sm font-medium">
                {currentUser?.name || 'Admin User'}
              </span>
            </button>
            
            <ToastContainer />
            
            <AnimatePresence>
              {isProfileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium">{currentUser?.name}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email}</p>
                  </div>
                  <Link
                    to="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;