import { motion } from 'framer-motion';
import { Users, Award, Clock, Lightbulb } from 'lucide-react';

const AboutPage = () => {
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
  
  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      position: "Founder & CEO",
      bio: "With over 15 years of experience in digital marketing and brand strategy, Sarah leads our agency with vision and expertise.",
      image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "David Chen",
      position: "Creative Director",
      bio: "David brings 12 years of design experience, crafting award-winning visual identities for brands across various industries.",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Emma Garcia",
      position: "Head of Digital Marketing",
      bio: "Emma specializes in data-driven marketing strategies that deliver measurable results and exceptional ROI for our clients.",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      name: "Michael Lee",
      position: "Technical Director",
      bio: "Michael leads our development team, creating innovative technical solutions and seamless digital experiences.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-accent-900/90"></div>
          <img 
            src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Team collaboration" 
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
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              We Are LO-TOPITAL
            </h1>
            <p className="text-lg text-gray-100 mb-4 max-w-2xl">
              A passionate team of digital experts dedicated to transforming brands and driving success in the digital landscape.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              <span className="text-sm font-medium text-primary-600 mb-2 block">WHO WE ARE</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey to Excellence</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015, LO-TOPITAL began with a simple mission: to help brands navigate the complex digital landscape with clarity and purpose. What started as a small team of passionate digital enthusiasts has grown into a comprehensive agency serving clients worldwide.
              </p>
              <p className="text-gray-600 mb-4">
                We believe that exceptional digital experiences are built on a foundation of strategic thinking, creative innovation, and technical excellence. Our integrated approach ensures that every touchpoint of your brand's digital presence works harmoniously to achieve your business goals.
              </p>
              <p className="text-gray-600">
                Today, we're proud to be a trusted partner to businesses of all sizes, from ambitious startups to established enterprises. Our commitment to excellence and results-driven approach has earned us recognition as a leader in the digital agency space.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="relative"
            >
              <img 
                src="https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="LO-TOPITAL team collaboration" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="bg-primary-100 p-3 rounded-full text-primary-600 mr-4">
                    <Award size={28} />
                  </div>
                  <div>
                    <p className="text-4xl font-bold">120+</p>
                    <p className="text-gray-600">Projects Completed</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-primary-600 mb-2 block">OUR VALUES</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Stand For</h2>
            <p className="text-gray-600 text-lg">
              Our core values drive everything we do and shape how we work with our clients and each other.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We embrace creative thinking and cutting-edge solutions to solve complex challenges.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 mb-4">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We hold ourselves to the highest standards in everything we do, from strategy to execution.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center text-accent-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of partnership and work closely with our clients as true extensions of their team.
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty, transparency, and ethical standards in all our interactions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-primary-600 mb-2 block">OUR TEAM</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Experts</h2>
            <p className="text-gray-600 text-lg">
              Our talented team brings together diverse skills and experiences to deliver exceptional results.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl shadow-sm overflow-hidden group"
              >
                <div className="h-72 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center"
          >
            <motion.div variants={fadeIn}>
              <p className="text-4xl md:text-5xl font-bold mb-2">8+</p>
              <p className="text-xl text-white/80">Years of Experience</p>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <p className="text-4xl md:text-5xl font-bold mb-2">120+</p>
              <p className="text-xl text-white/80">Projects Completed</p>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <p className="text-4xl md:text-5xl font-bold mb-2">50+</p>
              <p className="text-xl text-white/80">Happy Clients</p>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <p className="text-4xl md:text-5xl font-bold mb-2">25+</p>
              <p className="text-xl text-white/80">Team Members</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;