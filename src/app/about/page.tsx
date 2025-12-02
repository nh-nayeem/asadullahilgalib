"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaEnvelope, FaGraduationCap, FaAward, FaCertificate, FaFilm, FaCamera, FaVideo, FaEdit, FaLightbulb, FaPalette, FaMusic, FaClock, FaUsers, FaStar } from 'react-icons/fa';
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
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Bachelor of Fine Arts in Film Production</h3>
                <p className="text-gray-400 mb-2">University of Creative Arts</p>
                <p className="text-gray-500 text-sm">2018 - 2022</p>
                <p className="text-gray-300 mt-4">Specialized in Cinematography, Directing, and Film Editing with comprehensive training in modern filmmaking techniques and digital post-production.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Advanced Diploma in Digital Filmmaking</h3>
                <p className="text-gray-400 mb-2">Film Academy International</p>
                <p className="text-gray-500 text-sm">2022 - 2023</p>
                <p className="text-gray-300 mt-4">Advanced training in 4K cinematography, color grading, sound design, and narrative storytelling for contemporary digital platforms.</p>
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
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <FaFilm className="text-3xl text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Filmmaking</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Directing</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Screenwriting</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Story Development</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Production Management</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <FaCamera className="text-3xl text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Technical</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Cinematography</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Camera Operation</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Lighting Design</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Sound Recording</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <FaEdit className="text-3xl text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Post-Production</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Video Editing</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Color Grading</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Motion Graphics</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Visual Effects</li>
                </ul>
              </motion.div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <FaPalette className="text-3xl text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Creative</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Visual Storytelling</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Composition</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Color Theory</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Art Direction</li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
              >
                <FaUsers className="text-3xl text-white mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Professional</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Team Leadership</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Project Management</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Client Communication</li>
                  <li className="flex items-center"><FaStar className="text-white mr-2 text-sm" />Budget Planning</li>
                </ul>
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
                <h3 className="text-lg font-semibold text-white mb-2">Professional Cinematography</h3>
                <p className="text-gray-400 text-sm mb-2">International Film School</p>
                <p className="text-gray-500 text-xs">2023</p>
                <p className="text-gray-300 text-sm mt-3">Advanced techniques in digital cinematography and camera operation</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Adobe Premiere Pro Expert</h3>
                <p className="text-gray-400 text-sm mb-2">Adobe Certified Professional</p>
                <p className="text-gray-500 text-xs">2023</p>
                <p className="text-gray-300 text-sm mt-3">Professional video editing and post-production workflows</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Drone cinematography</h3>
                <p className="text-gray-400 text-sm mb-2">FAA Certified</p>
                <p className="text-gray-500 text-xs">2022</p>
                <p className="text-gray-300 text-sm mt-3">Licensed aerial cinematography and drone operations</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Color Grading Masterclass</h3>
                <p className="text-gray-400 text-sm mb-2">DaVinci Resolve</p>
                <p className="text-gray-500 text-xs">2023</p>
                <p className="text-gray-300 text-sm mt-3">Professional color correction and grading techniques</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Documentary Filmmaking</h3>
                <p className="text-gray-400 text-sm mb-2">National Geographic Workshops</p>
                <p className="text-gray-500 text-xs">2022</p>
                <p className="text-gray-300 text-sm mt-3">Storytelling techniques for documentary production</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="bg-gray-900 p-6 rounded-lg border border-gray-700 hover:border-white transition-colors"
              >
                <h3 className="text-lg font-semibold text-white mb-2">Motion Graphics Design</h3>
                <p className="text-gray-400 text-sm mb-2">After Effects Professional</p>
                <p className="text-gray-500 text-xs">2023</p>
                <p className="text-gray-300 text-sm mt-3">Advanced motion graphics and visual effects</p>
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
                <div className="text-4xl text-white">🏆</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Best Short Film - Independent Film Festival</h3>
                  <p className="text-gray-400 mb-2">"Echoes of Time" (2023)</p>
                  <p className="text-gray-300 text-sm">Awarded for outstanding cinematography and narrative excellence in independent filmmaking</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">🎬</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Excellence in Documentary Filmmaking</h3>
                  <p className="text-gray-400 mb-2">International Documentary Awards (2022)</p>
                  <p className="text-gray-300 text-sm">Recognized for compelling storytelling and social impact through documentary cinema</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">📽️</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Rising Filmmaker Award</h3>
                  <p className="text-gray-400 mb-2">Asian Film Academy (2022)</p>
                  <p className="text-gray-300 text-sm">Honored as one of the most promising emerging filmmakers in Asia</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">🎥</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Best Cinematography - Regional Film Festival</h3>
                  <p className="text-gray-400 mb-2">"Urban Landscapes" (2021)</p>
                  <p className="text-gray-300 text-sm">Awarded for exceptional visual composition and lighting techniques</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 flex items-center space-x-6"
              >
                <div className="text-4xl text-white">⭐</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">Audience Choice Award</h3>
                  <p className="text-gray-400 mb-2">National Student Film Competition (2020)</p>
                  <p className="text-gray-300 text-sm">Selected by audience vote as the most impactful student film of the year</p>
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
