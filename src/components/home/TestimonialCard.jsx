import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ name, company, image, quote, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="bg-white p-6 rounded-xl shadow-sm relative"
    >
      <div className="absolute top-6 right-6 text-gray-200">
        <Quote size={48} />
      </div>
      <div className="relative z-10">
        <p className="text-gray-700 mb-6 italic">"{quote}"</p>
        <div className="flex items-center">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-500">{company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;