import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Sparkles, Shield, Users } from 'lucide-react';
import { services } from '../data/services';
import ServiceCard from '../components/home/ServiceCard';
import TestimonialCard from '../components/home/TestimonialCard';

const HomePage = () => {
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
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-accent-900/90"></div> */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0606c6]/90 to-[#c50a0a]/80"></div>
          <img 
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Digital Marketing Team" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container relative min-h-[90vh] flex flex-col justify-center py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/10 rounded-full backdrop-blur-sm mb-6">
              Digital Solutions for Modern Brands
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transform Your Digital <span className="text-primary-400">Presence</span> With Our Expertise
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl">
              We empower small & emerging brands to thrive in a global marketplace through compelling storytelling, strategic advertising and transformative branding solutions–so your brand stick in hearts and mind.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="btn btn-primary">
                Explore Our Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-primary-600 mb-2 block">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We Deliver Exceptional Results</h2>
            <p className="text-gray-600 text-lg">
              Our team combines creativity, technical expertise, and strategic thinking to deliver solutions that drive growth and success.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovative Approach</h3>
              <p className="text-gray-600">
                We stay ahead of trends and technologies to deliver forward-thinking solutions.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Results Driven</h3>
              <p className="text-gray-600">
                Our strategies are designed to deliver measurable results and meaningful ROI.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Our specialists bring years of experience and passion to every project.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">End-to-End Support</h3>
              <p className="text-gray-600">
                We're with you every step of the way, from strategy development to execution.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-primary-600 mb-2 block">OUR SERVICES</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Digital Solutions</h2>
            <p className="text-gray-600 text-lg">
              We offer a wide range of services to help your business thrive in the digital world.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} variants={fadeIn} />
            ))}
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn btn-primary">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{ "background-color": "#0404a6" }} className="py-20 text-white">
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
              Let's collaborate to create digital experiences that elevate your brand and drive results.
            </p>
            <Link to="/contact" className="btn bg-white text-primary-900 hover:bg-white/90">
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-primary-600 mb-2 block">TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 text-lg">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-200px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <TestimonialCard
              name="Pius Saamba"
              company="CEO Samba Clothing"
              image="https://res.cloudinary.com/df2q6gyuq/image/upload/v1747526780/pius_wj8ge9.jpg"
              quote="As a long-term client, I’ve been consistently impressed by LOTOPITAL’s professionalism & companionship. Whether it’s digital marketing, content creation, or branding, they are with you every step of the way. A trusted partner for any digital media needs."
              variants={fadeIn}
            />
            
            <TestimonialCard
              name="Victor Malvin"
              company="CEO VIMAC GROUP ENGLAND"
              image="https://res.cloudinary.com/df2q6gyuq/image/upload/v1747526787/victor_q4qkg2.jpg"
              quote="LOTOPITAL drove real results for our business. 125 customers in 24 Hours. That was a good ROI. Their ability to adapt to trends while staying true to our brand identity is remarkable. 10/10!"
              variants={fadeIn}
            />
            
            <TestimonialCard
              name="Will Angel"
              company="CEO MORESTYLE AFRICA"
              image="https://res.cloudinary.com/df2q6gyuq/image/upload/v1747526783/will_dtoaml.jpg"
              quote="The video content produced by LOTOPITAL exceeded our expectations. Their storytelling, and production quality were top-notch. They understood our brand voice and delivered a final product that resonated with our audience. A truly professional team!"
              variants={fadeIn}
            />

            <TestimonialCard
              name="Eze Christian"
              company="EXCELLENT TOUCH FINISHING"
              image="https://res.cloudinary.com/df2q6gyuq/image/upload/v1747526783/eze_atezzx.jpg"
              quote="I know there are great brands out there and LOTOPITAL is one of them. Their services 10X our social engagement and conversions. They have a responsive team. Great stuff."
              variants={fadeIn}
            />

            <TestimonialCard
              name="Isaac Irebun"
              company="Aquila Errand Services"
              image="https://res.cloudinary.com/df2q6gyuq/image/upload/v1747528329/isaac_crmu4a.jpg"
              quote="The major thing that stood out for me, was their calm approach and attention to details.
I got my business registered under 7 days, and my corporate account set up, which was actually faster than I expected.
I highly recommend them."
              variants={fadeIn}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;