"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
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

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
        <motion.p 
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Have a project in mind or want to collaborate? Feel free to reach out.
        </motion.p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-typewriter mb-6">Let's Work Together</h3>
            <p className="text-gray-300 mb-8">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-amber-400 text-xl" />
                <span className="text-gray-300">asadullahilgalib22@gmail.com</span>
              </div>
              
              <div className="pt-2">
                <h4 className="text-gray-400 text-sm font-medium mb-3">CONNECT WITH ME</h4>
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
              </div>
            </div>
          </motion.div>
          
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitStatus && (
              <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                {submitStatus.message}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 text-black font-semibold py-3 px-6 rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
