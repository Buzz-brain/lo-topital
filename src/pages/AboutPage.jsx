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
      name: "Cyprian Vera Somtochi",
      position: "Frontend Web developer",
      bio: "Staying up-to-date with industry trends and technologies in order to deliver high-quality user experiences.",
      image: "https://res.cloudinary.com/df2q6gyuq/image/upload/v1747312331/IMG_0225_ldb8qt.jpg"
    },
    {
      name: "Favour Onyekachi Emetu",
      position: "Creative Storyteller & Digital Content Creator",
      bio: "Turning ideas into engaging visuals and viral moments! Passionate about crafting content that captivates, educates, and inspires.",
      image: "https://res.cloudinary.com/df2q6gyuq/image/upload/v1747312331/IMG-20250513-WA0043_nrh3pb.jpg"
    },
    {
      name: "Obidiegwu kosi Collins ",
      position: "Creative director ",
      bio: "My goal is to grab attention, communicate faster, and make a strong impression.",
      image: "https://res.cloudinary.com/df2q6gyuq/image/upload/v1747312334/IMG-20250515-WA0012_sqppwe.jpg"
    },
    {
      name: "Mere Kelechi",
      position: "Creative Designer",
      bio: "Transforming ideas into engaging visual experiences through design and technology.",
      image: "https://res.cloudinary.com/df2q6gyuq/image/upload/v1747312331/IMG-20250213-WA0035_lorizf.jpg"
    },
    {
      name: "Chibuike Daniel",
      position: "Creative Graphics Designer",
      bio: "A visual storyteller with a keen eye for design, Chibuike transforms ideas into stunning graphics. Skilled in teamwork, communication, and delivering on time—turning concepts into captivating visuals, one project at a time.",
      image: "https://res.cloudinary.com/df2q6gyuq/image/upload/v1747312330/1747087268985_gxtfqz.jpg"
    },
    {
      name: "Chinomso Nduoma",
      position: "Full-Stack Developer",
      bio: "Where Design Meets Functionality. Transforming concepts into visually stunning and user-friendly digital experiences.",
      image: "https://res.cloudinary.com/df2q6gyuq/image/upload/v1747315700/6_jxkoqz.jpg"
    }
  ];
  
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-accent-900/90"></div> */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0606c6]/90 to-[#c50a0a]/80"></div>

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
                Founded in 2020, we are on a mission to share access to tools, resources, and platforms that have traditionally been reserved for larger, well-established companies. Our journey began with a simple yet
powerful idea: to level the playing
field for small and emerging brands.

              </p>
              <p className="text-gray-600 mb-4">
                We understand the challenges these businesses face—limited budget, lack of access to
advanced media tools, and the
struggle to stand out in a crowded global market. That’s why we’ve built a platform that provides equal
access to cutting-edge media solutions, enabling these brands to tell their stories,
connect with their audiences, and compete on a global scale.

              </p>
              <p className="text-gray-600">
                We are more than just a service provider; we are your
companion in growth. Our team of passionate
innovators, strategists, and
creatives is dedicated to
empowering brands with the
tools they need to thrive. From AI-driven marketing platforms, and expertise to data analytics and content
creation resources, we equip
businesses with the technology and expertise to
navigate the dynamic media landscape with confidence.

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
              <p className="text-4xl md:text-5xl font-bold mb-2">5+</p>
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
              <p className="text-4xl md:text-5xl font-bold mb-2">15+</p>
              <p className="text-xl text-white/80">Team Members</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;