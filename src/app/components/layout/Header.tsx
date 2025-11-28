"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Photographs', path: '/photographs' },
    { name: 'Artworks', path: '/artworks' },
    { name: 'Contact', path: '/contact' },
  ];

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

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-screen" ref={menuRef}>
      <div className="backdrop-blur-sm bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" passHref>
              <motion.span 
                className="text-xl font-light tracking-tight text-white cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleNavClick}
              >
                ASADULLAHIL GALIB
              </motion.span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.path} passHref>
                  <motion.span
                    className={`text-sm uppercase tracking-wider ${
                      pathname === item.path
                        ? 'text-amber-400'
                        : 'text-gray-300 hover:text-amber-400'
                    } transition-colors cursor-pointer`}
                    whileHover={{ y: -2 }}
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </motion.span>
                </Link>
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
                    <Link key={item.name} href={item.path} passHref>
                      <motion.span
                        className={`block py-2 text-base uppercase tracking-wider ${
                          pathname === item.path
                            ? 'text-amber-400'
                            : 'text-gray-300 hover:text-amber-400'
                        } transition-colors cursor-pointer`}
                        onClick={handleNavClick}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ 
                          duration: 0.2,
                          delay: 0.1 * index
                        }}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
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
