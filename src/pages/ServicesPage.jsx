import { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(null);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Animation sequence for staggered children
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const toggleService = (id) => {
    setActiveService(activeService === id ? null : id);
  };
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-accent-900/90"></div> */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0606c6]/90 to-[#c50a0a]/80"></div>
          <img 
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Digital Services" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container relative py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 rounded-full backdrop-blur-sm mb-6">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Our Services
            </h1>
            <p className="text-lg text-gray-100 mb-4 max-w-2xl">
              We provide comprehensive digital solutions tailored to your specific needs and goals.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-primary-600 mb-2 block">OUR EXPERTISE</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Digital Solutions</h2>
            <p className="text-gray-600 text-lg">
              We offer a wide range of services to help your business grow and succeed in the digital landscape.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeIn}
                className={`rounded-xl overflow-hidden ${index % 2 === 0 ? 'lg:mt-20' : ''}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-white/80">{service.description}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 border border-gray-100">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleService(service.id)}
                  >
                    <h4 className="font-semibold">What's included</h4>
                    <ChevronDown className={`transition-transform ${activeService === service.id ? 'rotate-180' : ''}`} />
                  </div>
                  
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeService === service.id ? 'auto' : 0,
                      opacity: activeService === service.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 text-primary-600">•</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-primary-600 mb-2 block">OUR APPROACH</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 text-lg">
              We follow a structured process to ensure every project delivers exceptional results.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeIn} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm z-10 relative">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Discovery</h3>
                <p className="text-gray-600">
                  We start by understanding your business, goals, target audience, and competitive landscape.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-1 bg-gray-200 z-0 -translate-y-1/2"></div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm z-10 relative">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Strategy</h3>
                <p className="text-gray-600">
                  We develop a tailored strategy that aligns with your objectives and addresses your specific challenges.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-1 bg-gray-200 z-0 -translate-y-1/2"></div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm z-10 relative">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Execution</h3>
                <p className="text-gray-600">
                  Our expert team implements the strategy with precision and creativity, keeping you involved throughout.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 left-full w-full h-1 bg-gray-200 z-0 -translate-y-1/2"></div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm z-10 relative">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Optimization</h3>
                <p className="text-gray-600">
                  We continuously measure, analyze, and refine our approach to maximize results and drive ongoing improvement.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-lg text-white/80 mb-8">
              Let's discuss how our services can help you achieve your business goals.
            </p>
            <Link to="/contact" className="btn bg-white text-primary-900 hover:bg-white/90">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;