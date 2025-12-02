"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/galib3black.png"
          alt="Background"
          fill
          className="object-cover opacity-40 scale-x-[-1]"
          priority
        />
      </div>
      <div className="relative z-0 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl mb-6">
            <span className="block font-typewriter">ASADULLAHIL GALIB</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Visual Storyteller & Filmmaker</p>
          <motion.a
            href="works"
            className="inline-block px-8 py-3 bg-amber-400 text-black font-semibold rounded-full hover:bg-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
