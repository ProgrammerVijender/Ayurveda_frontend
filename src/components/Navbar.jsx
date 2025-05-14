import React, { useState } from 'react';
import { Leaf, Menu } from 'lucide-react';
import LoginModal from './Auth/LoginModal';
import SignupModal from './Auth/SignupModal';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const handleOpenSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  return (
    <>
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold text-gray-800">AyurLife</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-600 hover:text-green-600 transition">Home</a>
              <a href="#treatments" className="text-gray-600 hover:text-green-600 transition">Treatments</a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition">About</a>
              <a href="#products" className="text-gray-600 hover:text-green-600 transition">Products</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition">Contact</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleOpenLogin}
                className="text-gray-600 hover:text-green-600 transition"
              >
                Log In
              </button>
              <button
                onClick={handleOpenSignup}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Sign Up
              </button>
            </div>

            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitch={handleOpenSignup}
      />
      
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        onSwitch={handleOpenLogin}
      />
    </>
  );
};

export default Navbar;