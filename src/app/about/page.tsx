"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaGraduationCap, FaAward, FaCertificate, FaFilm, FaCamera, FaVideo, FaEdit, FaLightbulb, FaPalette, FaMusic, FaClock, FaUsers, FaStar, FaProjectDiagram, FaComments, FaImage } from 'react-icons/fa';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import SocialLinks from '@/app/components/common/SocialLinks';

const About = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section id="about" className="relative py-20 px-4 md:px-8 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative max-w-sm mx-auto">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-700">
                    <img
                      src="/galib.jpg"
                      alt="Asadullahil Galib"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-amber-400 rounded-sm"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-amber-400 rounded-sm"></div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">About Asadullahil Galib</h3>
                <div className="space-y-4 mb-8">
                  <p className="text-gray-300 leading-relaxed">
                    I'm a passionate filmmaker dedicated to creating compelling visual narratives that captivate audiences and evoke deep emotional responses. With years of experience in cinematography and storytelling, I transform ordinary moments into extraordinary cinematic experiences.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    My journey in filmmaking is driven by a relentless pursuit of visual excellence and a commitment to authentic storytelling that resonates with diverse audiences worldwide.
                  </p>
                </div>
                <SocialLinks hoverColor="text-amber-400" />
              </motion.div>
            </div>
          </div>
          {/* Floating Scroll Indicator */}
          {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-2 left-[45%] transform -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-white/70 hover:text-white transition-colors cursor-pointer hidden md:flex"
              onClick={() => {
                const nextSection = document.getElementById('education');
                nextSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Scroll to education section"
            >
              <span className="text-sm mb-2">Scroll for more</span>
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-3 bg-white rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
          )}
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-4 md:px-8 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <FaGraduationCap className="text-4xl text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </motion.div>
            <div className="grid md:grid-cols-1 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Bachelor of Arts in Islamic History & Culture</h3>
                <p className="text-gray-400 mb-2">University of Dhaka</p>
                <p className="text-gray-500 text-sm">2022 - present</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4 md:px-8 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <FaLightbulb className="text-4xl text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Skills</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaFilm className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Direction</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaCamera className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Cinematography</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaEdit className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Screenwriting</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaLightbulb className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Story Development</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaVideo className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Video Editing</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaPalette className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Graphic Design</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaImage className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Photography</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaUsers className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Leadership</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaProjectDiagram className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Project Management</h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
                className="text-center group"
              >
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105 h-32 flex flex-col items-center justify-center">
                  <FaComments className="text-4xl text-amber-400 mx-auto mb-3" />
                  <h3 className="text-white font-medium text-sm">Communication</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Certification Section */}
        <section className="py-20 px-4 md:px-8 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <FaCertificate className="text-4xl text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Certifications</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-colors"
              >
                <h3 className="text-base font-semibold text-white mb-2">Digital Film and Drama Direction</h3>
                <p className="text-gray-400 text-sm mb-2">CT Media</p>
                <p className="text-gray-500 text-xs">2016</p>
                <p className="text-gray-300 text-sm mt-3">A two-day-long workshop on film and drama direction.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-colors"
              >
                <h3 className="text-base font-semibold text-white mb-2">Masterclass with Dr. Shi Chuan, Majid Majidi, Anjan Dutt</h3>
                <p className="text-gray-400 text-sm mb-2">Rainbow Film Society</p>
                <p className="text-gray-500 text-xs">2024</p>
                <p className="text-gray-300 text-sm mt-3">Masterclass session at 22nd Dhaka International Film Festival 2024</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-colors"
              >
                <h3 className="text-base font-semibold text-white mb-2">Aspire Leaders Program</h3>
                <p className="text-gray-400 text-sm mb-2">Aspire Institute</p>
                <p className="text-gray-500 text-xs">2025</p>
                <p className="text-gray-300 text-sm mt-3">A global leadership development program run by Aspire Institute, founded at Harvard University.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-20 px-4 md:px-8 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <FaAward className="text-4xl text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white">Awards & Recognition</h2>
            </motion.div>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">⭐</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Nominee for Best Film</h3>
                  <p className="text-gray-400 mb-2">Northwest International Film Festival (NIFF) 2025, USA</p>
                  <p className="text-gray-300 text-sm">Recognized for the film "Joar"</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">⭐</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Official Selection</h3>
                  <p className="text-gray-400 mb-2">Cinemaking International Film Festival 2025, Bangladesh</p>
                  <p className="text-gray-300 text-sm">Selected for the film "Joar"</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">⭐</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Official Selection</h3>
                  <p className="text-gray-400 mb-2">Bogura International Film Festival - BIFF2026, Bangladesh</p>
                  <p className="text-gray-300 text-sm">Selected for the film "Joar"</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">🥈</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">2nd Runner Up (Silver Medal)</h3>
                  <p className="text-gray-400 mb-2">National Acting Competition Sherader Shera 2017</p>
                  <p className="text-gray-300 text-sm">Achieved silver medal in national-level acting competition</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">🥈</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Runner Up</h3>
                  <p className="text-gray-400 mb-2">Cinematography Segment - TALENT FIESTA 2021</p>
                  <p className="text-gray-300 text-sm">Organized by Sylhet Youth Alliance</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
