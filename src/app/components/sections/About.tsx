"use client";

import { motion } from 'framer-motion';
import { FaEnvelope, FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

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
                  src="/galib.jpg"
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
            <h3 className="text-2xl mb-4">Crafting Visual Stories That Resonate</h3>
            <p className="text-gray-300 mb-8 text-justify">
              I'm Asadullahil Galib, a passionate filmmaker dedicated to creating compelling visual narratives. 
              With a keen eye for detail and a deep understanding of cinematic language, I bring stories to life 
              through the lens of my camera.
            </p>
            <p className="text-gray-300 mb-8 text-justify">
              My work focuses on exploring the human condition, capturing raw emotions, and presenting 
              unique perspectives that challenge and inspire audiences.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/asadullahil.galib.01/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@FilmsByGalib" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
              <a 
                href="https://www.instagram.com/asadullahil_galib_01/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/asadullahilgalib01/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-amber-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
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
