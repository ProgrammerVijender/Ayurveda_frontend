import React from 'react';
import { Leaf, Search, Heart, Shield, LogIn } from 'lucide-react';
// import {Route , Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate(); 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-green-100"
    >
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">AyurVeda</span>
            </div>
            <div className="flex items-center space-x-4">
            

            <span>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full flex items-center space-x-2 transition duration-300"
            onClick={() => navigate('/login')} 
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </button>
            </span>
            

            <span>
            <button className="bg-white-600 border border-green-700 hover:bg-green-700 text-gray-800 px-6 py-2 rounded-full flex items-center space-x-2 transition duration-300"
            onClick={() => navigate('/signup')} 
            >
              <LogIn className="h-5 w-5" />
              <span>Create Free Account</span>
            </button>
            </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-8"
            >
              Discover the Ancient Wisdom of
              <span className="text-green-600 block">Ayurvedic Plants</span>
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
            >
              Upload a photo of any plant and instantly learn its name and traditional Ayurvedic benefits for a healthier, more balanced life.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-full inline-flex items-center space-x-3 transition duration-300"
            >
              <Search className="h-6 w-6" />
              <span>Start Identifying Plants</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose AyurVeda?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Identification</h3>
              <p className="text-gray-600">Advanced AI technology to accurately identify plants from your photos</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Ayurvedic Benefits</h3>
              <p className="text-gray-600">Detailed information about traditional medicinal properties and uses</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Verified</h3>
              <p className="text-gray-600">Information verified by Ayurvedic practitioners and botanists</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8"
          >
            Ready to Explore Natural Healing?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-12 max-w-2xl mx-auto"
          >
            Join thousands of users discovering the power of Ayurvedic plants. Sign up now to start your journey towards natural wellness.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white text-green-800 text-lg px-8 py-4 rounded-full inline-flex items-center space-x-3 transition duration-300 hover:bg-green-100"
            onClick={() => navigate('/signup')} 
          >
            <LogIn className="h-6 w-6" />
            <span>Create Free Account</span>
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">AyurVeda</span>
          </div>
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} AyurVeda. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}

export default Home;