import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  Mail, 
  ChevronLeft,
  Folder
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentUser } = useAuth();
  
  // Sidebar navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Category', icon: Folder, path: '/admin/category' },
    { name: 'Blog Posts', icon: FileText, path: '/admin/blogposts' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Messages', icon: Mail, path: '/admin/messages' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];
  
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 text-white h-screen flex flex-col"
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="font-bold text-lg"
            >
              LOTOPITAL
            </motion.span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <ChevronLeft
              className={`h-5 w-5 transition-transform duration-200 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-2 py-2.5 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-3 font-medium"
              >
                {item.name}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-2 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full p-3 bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
            {currentUser?.name?.charAt(0) || 'A'}
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-2"
            >
              <p className="text-sm font-medium">{currentUser?.name}</p>
              <p className="text-xs text-gray-400">{ currentUser?.email }</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;