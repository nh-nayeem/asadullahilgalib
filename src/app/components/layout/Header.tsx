"use client";

import { motion } from 'framer-motion';

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 w-screen">
      <div className="backdrop-blur-sm bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.a 
              href="#" 
              className="text-xl font-light tracking-tight text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ASADULLAHIL GALIB
            </motion.a>
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Works', 'Photographs', 'Artworks', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm uppercase tracking-wider text-gray-300 hover:text-amber-400 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
