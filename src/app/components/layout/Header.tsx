"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navItems = ['Home', 'About', 'Works', 'Photographs', 'Artworks', 'Contact'];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when a navigation link is clicked
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // Wait for the menu to start closing before scrolling
    setTimeout(() => {
      const targetId = item.toLowerCase();
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20, // Add a small offset from the top
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to allow menu to start closing
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-screen" ref={menuRef}>
      <div className="backdrop-blur-sm bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.a 
              href="#" 
              className="text-xl font-light tracking-tight text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={(e) => handleNavClick(e, 'Home')}
            >
              ASADULLAHIL GALIB
            </motion.a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm uppercase tracking-wider text-gray-300 hover:text-amber-400 transition-colors"
                  whileHover={{ y: -2 }}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-black/90 backdrop-blur-sm -mx-6 px-6"
              >
                <div className="pt-4 pb-6 flex flex-col space-y-4">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block py-2 text-base uppercase tracking-wider text-gray-300 hover:text-amber-400 transition-colors"
                      onClick={(e) => handleNavClick(e, item)}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.2,
                        delay: 0.1 * index
                      }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Header;
