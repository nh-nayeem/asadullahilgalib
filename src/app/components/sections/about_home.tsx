"use client";

import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import SocialLinks from '@/app/components/common/SocialLinks';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="/images/galib.jpg"
                  alt="Asadullahil Galib"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-amber-400 rounded-lg"></div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-gray-300 mb-8 text-justify">
              I am an award-winning filmmaker and cultural activist, driven by a deep love for art and visual storytelling. My work explores human emotion, memory, place, and culture, inspired by everyday life and timeless artistic traditions.

Through cinema, I strive to create intimate, poetic, and visually resonant stories, where image, sound, and rhythm come together to evoke feeling and meaning. For me, filmmaking is an artistic journey of observation and sensitivity, translating lived moments into honest works that connect with people beyond language and borders.
            </p>
            <SocialLinks hoverColor="text-amber-400" />
          </motion.div>
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            href="/about"
            className="inline-flex items-center px-8 py-3 bg-amber-400 text-black rounded-full font-medium hover:bg-white transition-colors"
          >
            See More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
