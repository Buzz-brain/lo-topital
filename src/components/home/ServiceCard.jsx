import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Megaphone, Pencil, Brush, Bookmark, Code2, Search } from 'lucide-react';

const ServiceCard = ({ service, variants }) => {
  // Map service icon to Lucide React component
  const getIcon = (iconName) => {
    const icons = {
      Megaphone: Megaphone,
      Pencil: Pencil,
      Brush: Brush,
      Bookmark: Bookmark,
      Code2: Code2,
      Search: Search,
    };
    
    const Icon = icons[iconName] || Megaphone;
    return <Icon size={24} />;
  };
  
  return (
    <motion.div
      variants={variants}
      className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
          {getIcon(service.icon)}
        </div>
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <Link
          to="/services"
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
        >
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;