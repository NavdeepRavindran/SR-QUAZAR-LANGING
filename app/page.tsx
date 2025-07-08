'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';


// Modal component for Coming Soon
const ComingSoonModal = ({ isOpen, onClose, product }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div 
        className="bg-white dark:bg-gray-800 max-w-2xl w-full rounded-xl p-8 relative"
        onClick={e => e.stopPropagation()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-3xl">{product.icon}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {product.name} - Coming Soon
          </h3>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
          We&apos;re working hard to bring you {product.name}. This innovative solution will be available soon.
          Subscribe to our newsletter to be the first to know when we launch!
        </p>
        
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Key Features:</h4>
          <ul className="space-y-2">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      
      </motion.div>
    </div>
  );
};

const TechCard = ({ tech }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-xl transition-all border border-transparent hover:border-blue-200 dark:hover:border-blue-900"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center text-center space-y-2">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${tech.bgColor}`}>
          <span className="text-2xl" role="img" aria-label={tech.name}>{tech.icon}</span>
        </div>
        <h4 className="font-bold text-gray-800 dark:text-white">{tech.name}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{tech.description}</p>
        
      </div>
    </motion.div>
  );
};

// Animation variants for scroll animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: '',
    message: ''
  });

  // Products data with additional information for modals
  const products = [
    {
      id: "evh",
      name: "EVH (Engine Vital Health)",
      icon: "🔧",
      features: [
        "Real-time engine diagnostics",
        "AI-powered ECU tuning recommendations",
        "Error code explanations in simple language",
        "Maintenance scheduling and reminders",
        "Integration with service centers"
      ]
    },
    {
      id: "isafe",
      name: "I SAFE",
      icon: "🛡️",
      features: [
        "Real-time safety monitoring",
        "3D simulation for performance analysis",
        "Crash detection with automatic alerts",
        "Driver skill enhancement recommendations",
        "Integration with emergency services"
      ]
    },
    {
      id: "curatech",
      name: "Cura Tech",
      icon: "🏥",
      features: [
        "Medication interaction warnings",
        "Telemedicine integration",
        "AI-driven health recommendations",
        "Prescription management",
        "Regulatory-compliant medical database"
      ]
    },
    {
      id: "bluefix",
      name: "Blue Fix",
      icon: "🔨",
      features: [
        "On-demand home services booking",
        "Verified professional network",
        "Real-time service tracking",
        "Secure payment processing",
        "Service quality ratings and reviews"
      ]
    }
  ];
  
  // Handle scroll events for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Open modal for a specific product
  const openProductModal = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setActiveProductModal(product);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Construct the message for WhatsApp
    const message = `
      *New Inquiry from SR Quazar Website*
      
      *Name:* ${formData.name}
      *Email:* ${formData.email}
      *Organization:* ${formData.organization}
      *Interest:* ${formData.interest}
      *Message:* ${formData.message}
    `.trim();
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    const phoneNumber = '919443026665'; // Format: country code + number without +
    
    // Construct WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Redirect to WhatsApp
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-black font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
<motion.nav 
  className="sticky top-0 z-50 bg-white dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ type: 'spring', stiffness: 120 }}
>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-20 h-20 rounded-full  to-indigo-600 flex items-center justify-center overflow-hidden"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Image
                src="/team/Logo.png"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </motion.div>


            <motion.h1 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 ml-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p style={{ fontFamily: "var(--font-geist-mono)" }, {color: "#ffffff"}}>SR QUAZAR SOLUTIONS</p>
            </motion.h1>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex space-x-8">
{['about', 'products', 'technologies', 'team'].map((item, i) => (
  <motion.a 
    key={i}
    href={`#${item}`} 
    className="text-white hover:text-gray-300 transition-colors"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * i }}
    whileHover={{ scale: 1.05 }}
  >
    {item.charAt(0).toUpperCase() + item.slice(1)}
  </motion.a>
))}
            </div>

            <motion.a 
              href="#investor" 
              className="ml-8 text-white px-6 py-2.5 hidden md:block rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Investors
            </motion.a>
          </div>
          <div className="md:hidden">
            <button 
              className="text-gray-800 dark:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
      </motion.nav>

      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <motion.div 
            className="animate-fadeIn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold text-center mb-6 text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Intelligent Solutions for <br className="hidden md:block" />
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                Automotive & Healthcare
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-center max-w-3xl mb-10 text-white/90 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              &quot;From wheels to hearts, we move, heal and elevate life.&quot;
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <motion.a
                className="group bg-white text-blue-700 hover:bg-blue-50 px-8 py-3.5 rounded-lg font-medium transition-all shadow-lg flex items-center space-x-2 hover:scale-105"
                href="#investor"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Investor Relations</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </motion.a>
              <motion.a
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3.5 rounded-lg font-medium transition-all text-white hover:scale-105"
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Our Solutions
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 lg:px-8">
        {/* Mission & Vision */}
        <motion.section 
          id="about" 
          className="mb-24 max-w-6xl mx-auto scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div className="mb-12 text-center" variants={fadeInUp}>
            <span className="text-blue-600 font-medium">OUR PURPOSE</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Mission & Vision</h2>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Mission Statement</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                At SR Quazar Solutions, we transform the Automotive and Healthcare industries with intelligent
                technologies. Through our pioneering Artificial Automotive Intelligence (A2I) platform, we enhance
                vehicle manufacturing, maintenance, and diagnostics. In Healthcare and Lifestyle, we bridge the digital
                gap with integrated solutions that simplify medical, pharmaceutical, and daily living needs — making life
                smarter, faster, and better.
              </p>
            </motion.div>
            <motion.div 
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">Vision Statement</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To be a global leader in intelligent solutions that redefine the future of mobility, health, and lifestyle—
                driven by innovation, simplicity, and purpose.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Products */}
        <motion.section 
          id="products" 
          className="mb-24 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div className="mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
            <span className="text-blue-600 font-medium">WHAT WE OFFER</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Our Products</h2>
            <p className="text-gray-600 dark:text-gray-400">
              At SR Quazar Solutions, we&apos;re building the next generation of intelligent systems that solve real-world problems
              in automotive diagnostics, safety, healthcare, and lifestyle management.
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-2 gap-10"
            variants={staggerContainer}
          >
            {/* EVH Product Card */}
            <motion.div 
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              onClick={() => openProductModal("evh")}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">EVH (Engine Vital Health)</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                A smart web and mobile app that transforms vehicle diagnostics with Artificial Automotive
                Intelligence (A2I). EVH simplifies ECU/ECM tuning, explains error codes, and provides real-time
                health scores to keep vehicles running at optimal performance.
              </p>
              <div className="flex justify-between items-center">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Market Potential: $15B by 2028</p>
                </div>
                <button 
                  className="text-blue-600 dark:text-blue-400 font-medium flex items-center space-x-1 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal("evh");
                  }}
                >
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* I SAFE Product Card */}
            <motion.div 
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-indigo-200 dark:hover:border-indigo-900"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              onClick={() => openProductModal("isafe")}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">I SAFE</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                An AI-powered safety and performance solution built for motorsports. I SAFE uses real-time sensor data,
                3D simulation, and predictive analytics to monitor vehicle health, enhance driver skills, and ensure safety 
                through features like crash detection and emergency alerts.
              </p>
              <div className="flex justify-between items-center">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Market Potential: $8B by 2027</p>
                </div>
                <button 
                  className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center space-x-1 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal("isafe");
                  }}
                >
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Cura Tech Product Card */}
            <motion.div 
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-900"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              onClick={() => openProductModal("curatech")}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Cura Tech</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                A next-gen AI medical assistant offering real-time guidance on medications, dosages, and drug interactions.
                Integrated with telemedicine and regulatory-safe databases, it connects patients with doctors and ensures 
                safer, smarter healthcare decisions — anytime, anywhere.
              </p>
              <div className="flex justify-between items-center">
                <div className="bg-teal-50 dark:bg-teal-900/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-teal-700 dark:text-teal-300">Market Potential: $22B by 2029</p>
                </div>
                <button 
                  className="text-teal-600 dark:text-teal-400 font-medium flex items-center space-x-1 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal("curatech");
                  }}
                >
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Blue Fix Product Card */}
            <motion.div 
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              onClick={() => openProductModal("bluefix")}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                whileHover={{ rotate: 5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Blue Fix</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                A one-stop lifestyle service platform bringing together essential at-home services in one easy-to-use app.
                With on-demand booking, verified professionals, and live updates, managing your home life has never been
                easier or more efficient.
              </p>
              <div className="flex justify-between items-center">
                <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg">
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Market Potential: $12B by 2026</p>
                </div>
                <button 
                  className="text-purple-600 dark:text-purple-400 font-medium flex items-center space-x-1 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProductModal("bluefix");
                  }}
                >
                  <span>Learn more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Technology */}
        <motion.section 
          id="technologies" 
          className="mb-24 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div className="mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
            <span className="text-blue-600 font-medium">OUR INNOVATIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Our Technologies</h2>
            <p className="text-center text-xl italic mb-8 text-gray-600 dark:text-gray-400">
            &quot;Powering the future with intelligence, precision, and human-centric design.&quot;
            </p>
          </motion.div>
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            variants={staggerContainer}
          >
            <motion.div 
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Automotive</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our breakthrough Artificial Automotive Intelligence (A2I) framework fuses AI and Digital Twin Technology
                to support manufacturing, maintenance, and diagnostics across various vehicle platforms, delivering 
                smarter, faster, and predictive automotive solutions.
              </p>
            </motion.div>
            <motion.div 
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Healthcare</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We bridge the technological gap by creating a single platform that brings together medical guidance, 
                pharmaceutical support, and doctor aid — ensuring accessible and efficient healthcare for all through
                advanced AI and data-driven insights.
              </p>
            </motion.div>
            <motion.div 
              className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Lifestyle</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We simplify everyday living by combining essential services — from technical home repairs to wellness 
                support — into one seamless platform, making life easier, safer, and smarter through intuitive
                interfaces and intelligent matching algorithms.
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 dark:bg-opacity-50 p-10 rounded-2xl shadow-inner"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold mb-2 text-center">Technologies We Use</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Our solutions are powered by cutting-edge technologies across multiple domains, enabling us to deliver 
              intelligent, scalable, and secure products.
            </p>
            
            {/* AI & Data Science */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center mb-6"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-grow"></div>
                <h4 className="text-lg font-bold mx-4 px-5 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">AI & Data Science</h4>
                <div className="h-px bg-gradient-to-r from-blue-500 via-transparent to-transparent flex-grow"></div>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Machine Learning",
                    icon: "🧠",
                    description: "Predictive models and pattern recognition across automotive and healthcare applications",
                    bgColor: "bg-blue-100 dark:bg-blue-900/30",
                    barColor: "bg-blue-600"
                  },
                  {
                    name: "Computer Vision",
                    icon: "👁️",
                    description: "Real-time image processing for vehicle diagnostics and medical imaging analysis",
                    bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
                    barColor: "bg-indigo-600"
                  },
                  {
                    name: "Natural Language Processing",
                    icon: "💬",
                    description: "Understanding user queries and generating conversational responses for our AI assistants",
                    bgColor: "bg-purple-100 dark:bg-purple-900/30",
                    barColor: "bg-purple-600"
                  },
                  {
                    name: "Predictive Analytics",
                    icon: "📊",
                    description: "Forecasting models for maintenance schedules and health monitoring",
                    bgColor: "bg-green-100 dark:bg-green-900/30",
                    barColor: "bg-green-600"
                  }
                ].map((tech, i) => (
                  <TechCard key={i} tech={tech} />
                ))}
              </div>
            </div>
            
            {/* Infrastructure & Cloud */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center mb-6"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent flex-grow"></div>
                <h4 className="text-lg font-bold mx-4 px-5 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full">Infrastructure & Cloud</h4>
                <div className="h-px bg-gradient-to-r from-teal-500 via-transparent to-transparent flex-grow"></div>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Cloud Computing",
                    icon: "☁️",
                    description: "Scalable infrastructure leveraging AWS, Azure, and Google Cloud for global availability",
                    bgColor: "bg-teal-100 dark:bg-teal-900/30",
                    barColor: "bg-teal-600"
                  },
                  {
                    name: "Edge Computing",
                    icon: "🖥️",
                    description: "On-device processing for latency-critical applications in vehicles and medical devices",
                    bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
                    barColor: "bg-cyan-600"
                  },
                  {
                    name: "Containerization",
                    icon: "🐳",
                    description: "Docker and Kubernetes for deployment and orchestration of microservices",
                    bgColor: "bg-blue-100 dark:bg-blue-900/30",
                    barColor: "bg-blue-600"
                  },
                  {
                    name: "Serverless Architecture",
                    icon: "⚡",
                    description: "Event-driven computing for cost-effective scalability and reduced operational overhead",
                    bgColor: "bg-amber-100 dark:bg-amber-900/30",
                    barColor: "bg-amber-600"
                  }
                ].map((tech, i) => (
                  <TechCard key={i} tech={tech} />
                ))}
              </div>
            </div>
            
            {/* IoT & Hardware */}
            <div className="mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center mb-6"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-transparent flex-grow"></div>
                <h4 className="text-lg font-bold mx-4 px-5 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">IoT & Hardware</h4>
                <div className="h-px bg-gradient-to-r from-red-500 via-transparent to-transparent flex-grow"></div>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "IoT Sensor Networks",
                    icon: "📡",
                    description: "Connected sensor arrays for real-time data collection in vehicles and healthcare environments",
                    bgColor: "bg-red-100 dark:bg-red-900/30",
                    barColor: "bg-red-600"
                  },
                  {
                    name: "Digital Twin Technology",
                    icon: "🔄",
                    description: "Virtual replicas of physical systems for simulation and predictive maintenance",
                    bgColor: "bg-violet-100 dark:bg-violet-900/30",
                    barColor: "bg-violet-600"
                  },
                  {
                    name: "Embedded Systems",
                    icon: "🔌",
                    description: "Low-power computing platforms for in-vehicle and wearable medical applications",
                    bgColor: "bg-orange-100 dark:bg-orange-900/30",
                    barColor: "bg-orange-600"
                  },
                  {
                    name: "3D Simulation",
                    icon: "🎮",
                    description: "Advanced modeling and visualization for training and analytical purposes",
                    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
                    barColor: "bg-emerald-600"
                  }
                ].map((tech, i) => (
                  <TechCard key={i} tech={tech} />
                ))}
              </div>
            </div>
            
            {/* Security & Compliance */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center mb-6"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent flex-grow"></div>
                <h4 className="text-lg font-bold mx-4 px-5 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">Security & Compliance</h4>
                <div className="h-px bg-gradient-to-r from-gray-500 via-transparent to-transparent flex-grow"></div>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Data Encryption",
                    icon: "🔒",
                    description: "End-to-end encryption for sensitive automotive and healthcare data",
                    bgColor: "bg-gray-100 dark:bg-gray-800",
                    barColor: "bg-gray-600 dark:bg-gray-400"
                  },
                  {
                    name: "Regulatory Compliance",
                    icon: "📜",
                    description: "HIPAA, GDPR, and industry-specific standards for data protection",
                    bgColor: "bg-slate-100 dark:bg-slate-800",
                    barColor: "bg-slate-600 dark:bg-slate-400"
                  },
                  {
                    name: "Blockchain",
                    icon: "🔗",
                    description: "Immutable records for supply chain, service history, and medical data",
                    bgColor: "bg-blue-100 dark:bg-blue-900/30",
                    barColor: "bg-blue-600"
                  },
                  {
                    name: "Biometric Authentication",
                    icon: "👆",
                    description: "Secure access control for vehicles and healthcare applications",
                    bgColor: "bg-purple-100 dark:bg-purple-900/30",
                    barColor: "bg-purple-600"
                  }
                ].map((tech, i) => (
                  <TechCard key={i} tech={tech} />
                ))}
              </div>
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <a href="#contact" className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-medium">
                <span>Talk to our tech experts</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Team */}
        <motion.section 
          id="team" 
          className="mb-24 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div className="mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
            <span className="text-blue-600 font-medium">THE INNOVATORS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Meet the innovators powering SR Quazar Solutions — where bold ideas meet deep expertise to shape
              the future of Automotive, Healthcare, and Lifestyle technology.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-30"
            variants={staggerContainer}
          >
            <motion.div 
              className="group"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-center relative z-10">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mx-auto mb-6 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/team/co-founder.jpg"
                      alt="Founder"
                      width={128}
                      height={128}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">Sachin Kumar R S</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-4 font-medium">Founder & CEO</p>
                <p className="text-gray-600 dark:text-gray-400">
                  A trailblazer in automotive AI, Sachin leads with a vision to transform mobility through intelligent
                  systems like A2I. With expertise in diagnostics.
                </p>
              </div>
              <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-b-lg transform -translate-y-1"></div>
            </motion.div>
            
            <motion.div 
              className="group"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 text-center relative z-10">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 mx-auto mb-6 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/team/co-founder.jpg"
                        alt="Founder"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full rounded-full"
                      />
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">Thariga R</h3>
                <p className="text-teal-600 dark:text-teal-400 mb-4 font-medium">Co-Founder & CTO</p>
                <p className="text-gray-600 dark:text-gray-400">
                  A creative technologist and product designer, Thariga blends engineering precision with user-focused
                  design across automotive and healthcare platforms.
                </p>
              </div>
              <div className="h-3 bg-gradient-to-r from-teal-500 to-teal-700 rounded-b-lg transform -translate-y-1"></div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Investor Section */}
        <motion.section 
          id="investor" 
          className="mb-24 scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="rounded-3xl overflow-hidden relative bg-gradient-to-r from-blue-600 to-indigo-800">
            <div className="absolute inset-0 bg-[url('/circuit.svg')] opacity-10"></div>
            <div className="px-8 py-16 md:p-16 relative">
              <div className="text-center mb-12">
                <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium">OPPORTUNITY</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 text-white">Investor Relations</h2>
                <p className="max-w-2xl mx-auto text-white/90 text-lg">
                  Join us in revolutionizing the Automotive and Healthcare industries. SR Quazar Solutions offers a unique 
                  investment opportunity at the intersection of AI, IoT, and human-centric design.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Growth Potential</h3>
                  <p className="text-white/80">
                    Targeting multi-billion dollar markets across automotive diagnostics, healthcare AI, and digital services 
                    with scalable platforms and recurring revenue models.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Innovation Pipeline</h3>
                  <p className="text-white/80">
                    Continuous R&D with 5 patents pending and proprietary A2I technology with significant barriers to entry 
                    and first-mover advantages in key market segments.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white">Market Traction</h3>
                  <p className="text-white/80">
                    Existing partnerships with automotive manufacturers and healthcare providers across Asia and Europe, 
                    with projected $8M in annual recurring revenue by Q4 2023.
                  </p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="inline-flex flex-col items-center">
                  <span className="text-white/90 mb-2">Ready to be part of our journey?</span>
                  <a
                    className="group bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-full font-medium text-lg inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    href="#contact"
                  >
                    <span>Request Investor Deck</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section 
          id="contact" 
          className="max-w-3xl mx-auto scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.div className="mb-12 text-center" variants={fadeInUp}>
            <span className="text-blue-600 font-medium">CONNECT WITH US</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Interested in learning more about our investment opportunities or products?
              Fill out the form below and our team will get back to you soon.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
            variants={fadeInUp}
          >
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors"
                    placeholder="Your name" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors"
                    placeholder="you@example.com" 
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="organization">Organization</label>
                <input 
                  type="text" 
                  id="organization" 
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors"
                  placeholder="Your company" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="interest">Interest</label>
                <select 
                  id="interest"
                  value={formData.interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors"
                  required
                >
                  <option value="">Select your interest</option>
                  <option value="Investment Opportunity">Investment Opportunity</option>
                  <option value="Business Partnership">Business Partnership</option>
                  <option value="Product Information">Product Information</option>
                  <option value="Career Opportunities">Career Opportunities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 transition-colors"
                  placeholder="I'm interested in learning more about SR Quazar Solutions..."
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg text-lg"
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </motion.section>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SQ</span>
                </div>
                <h3 className="text-2xl font-bold">SR Quazar Solutions</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
              &quot;From wheels to hearts, we move, heal and elevate life.&quot; Building intelligent solutions at the intersection 
                of automotive technology, healthcare innovation, and lifestyle management.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
                <li><a href="#technologies" className="text-gray-400 hover:text-white transition-colors">Technologies</a></li>
                <li><a href="#team" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#investor" className="text-gray-400 hover:text-white transition-colors">Investor Relations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">Coimbatore, India</span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@srquazarsolutions.com" style={{textDecoration: "none"}}>
                  <span className="text-gray-400">contact@srquazarsolutions.com</span></a>
                </li>
                <li className="flex items-start space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+91 94430 26665</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} SR Quazar Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      <motion.a 
        href="#" 
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50"
        aria-label="Scroll to top"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 300 ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.a>
      
      {/* Product Coming Soon Modal */}
      <ComingSoonModal 
        isOpen={activeProductModal !== null}
        onClose={() => setActiveProductModal(null)}
        product={activeProductModal || {}}
      />
      
      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
