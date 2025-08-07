"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaVimeoV, FaEnvelope } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Home() {
  // Smooth scroll for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click',  (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const works = [
    {
      title: "Joar",
      year: "2024",
      role: "Director & Story",
      image: "/works/1 Joar.jpg",
      videoLink: ""
    },
    {
      title: "Khosh Amded Ramadan",
      year: "2024",
      role: "Director",
      image: "/works/2 Qaseeda.jpeg",
      videoLink: "https://www.youtube.com/watch?v=RfcxyMMCwFk"
    },
    {
      title: "Megh o Meghna",
      year: "2023",
      role: "Director and Story",
      image: "/works/3 Megh o Meghna.png",
      videoLink: "https://www.youtube.com/watch?v=9LfYttJpT-I"
    },
    {
      title: "Ramadan",
      year: "2023",
      role: "Director",
      image: "/works/4 Ramadan by Junayed.jpeg",
      videoLink: "https://www.youtube.com/watch?v=yB8Argb2WRo"
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-10 w-screen">
        <div className="backdrop-blur-md bg-black/30 border-b border-white/10">
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
                {['Home', 'About', 'Works', 'Contact'].map((item) => (
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

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-40"
            src="/hero-bg2.mp4"
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
              href="#works"
              className="inline-block px-8 py-3 bg-amber-400 text-black font-semibold rounded-full hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
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
              <h3 className="text-2xl font-typewriter mb-4">Crafting Visual Stories That Resonate</h3>
              <p className="text-gray-300 font-typewriter mb-6">
                I'm Asadullahil Galib, a passionate filmmaker dedicated to creating compelling visual narratives. 
                With a keen eye for detail and a deep understanding of cinematic language, I bring stories to life 
                through the lens of my camera.
              </p>
              <p className="text-gray-300 mb-8">
                My work focuses on exploring the human condition, capturing raw emotions, and presenting 
                unique perspectives that challenge and inspire audiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaYoutube size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaVimeoV size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-typewriter mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
           Works
          </motion.h2>
          <motion.p 
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A selection of my recent film projects that showcase my storytelling and technical expertise.
          </motion.p>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-1">
            {works.map((work, index) => (
              <motion.div
                key={work.title}
                className="group relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-100 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={work.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-amber-400 text-black px-6 py-2 rounded-full font-medium hover:bg-white transition-colors"
                    >
                      Watch Film
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{work.title}</h3>
                  <p className="text-gray-400">{work.year} • {work.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photographs Section */}
      <section id="photographs" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Photographs
          </motion.h2>
          <motion.p 
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A selection of my recent photography projects that showcase my storytelling and technical expertise.
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <motion.div
                key={work.title}
                className="group relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={work.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-amber-400 text-black px-6 py-2 rounded-full font-medium hover:bg-white transition-colors"
                    >
                      Watch Film
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{work.title}</h3>
                  <p className="text-gray-400">{work.year} • {work.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artworks */}
      <section id="artworks" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Artworks
          </motion.h2>
          <motion.p 
            className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A selection of my recent photography projects that showcase my storytelling and technical expertise.
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <motion.div
                key={work.title}
                className="group relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <a 
                      href={work.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-amber-400 text-black px-6 py-2 rounded-full font-medium hover:bg-white transition-colors"
                    >
                      Watch Film
                    </a>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{work.title}</h3>
                  <p className="text-gray-400">{work.year} • {work.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's Collaborate
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Interested in working together or have a project in mind? I'd love to hear from you.
          </motion.p>
          
          <motion.div 
            className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus && (
                <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                  {submitStatus.message}
                </div>
              )}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting ? 'bg-amber-600' : 'bg-amber-400 hover:bg-white'} text-black font-semibold py-2 px-6 rounded-md transition-colors`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            
            <div className="mt-12 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-medium mb-4">Or reach out directly</h3>
              <div className="flex flex-col space-y-2 text-gray-300">
                <a href="mailto:contact@galibfilms.com" className="flex items-center justify-center space-x-2 hover:text-amber-400 transition-colors">
                  <FaEnvelope />
                  <span>asadullahilgalib22@gmail.com</span>
                </a>
              </div>
              <div className="flex justify-center space-x-6 mt-6">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaYoutube size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <FaVimeoV size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto">
          <p> {new Date().getFullYear()} Asadullahil Galib. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
