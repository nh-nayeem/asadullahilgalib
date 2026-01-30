"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface WorkItem {
  title: string;
  year: string;
  role: string;
  image: string;
  videoLink?: string; 
  category: 'filmography' | 'direction' | 'shorts';
  description?: string;
}

const categories = [
  { id: 'filmography', name: 'Filmography', icon: '🎬' },
  { id: 'direction', name: 'Direction', icon: '🎥' },
  { id: 'shorts', name: 'Shorts', icon: '✈️' }
];

const Works = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'filmography' | 'direction' | 'shorts' | 'shorts'>('filmography');
  const [works, setWorks] = useState<WorkItem[]>([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch('/works.json');
        const data = await response.json();
        setWorks(data);
      } catch (error) {
        console.error('Error loading works:', error);
      }
    };

    fetchWorks();
  }, []);

  const handleWorkClick = (work: WorkItem, e: React.MouseEvent) => {
    if (!work.videoLink) {
      e.preventDefault();
      setSelectedWork(work);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedWork(null);
  };

  const filteredWorks = works.filter(work => work.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        <section id="works" className="py-20 px-4 md:px-8 bg-black">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Works</h1>
              <p className="text-center text-gray-400 max-w-2xl mx-auto">
                Explore a collection of my works including filmography, direction projects, mobile cinematography, and travel documentaries that showcase diverse storytelling approaches and visual styles.
              </p>
            </motion.div>

            {/* Category Tabs */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as any)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeCategory === category.id
                      ? 'bg-amber-400 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </motion.div>

            {/* Works Grid */}
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {filteredWorks.map((work, index) => (
                  <motion.div
                    key={`${work.title}-${activeCategory}`}
                    className="group relative overflow-hidden rounded-lg cursor-pointer bg-gray-900 border border-gray-800 hover:border-amber-400 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div 
                      className="relative aspect-video overflow-hidden"
                      onClick={(e) => handleWorkClick(work, e)}
                    >
                      {work.videoLink ? (
                        <a 
                          href={work.videoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src={work.image}
                            alt={work.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start">
                            <div className="p-6">
                              <div className="px-4 py-2 bg-amber-400 text-black rounded-full font-medium text-sm mb-3">
                                Watch Film
                              </div>
                              <p className="text-white text-sm">{work.description}</p>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <>
                          <img
                            src={work.image}
                            alt={work.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start">
                            <div className="p-6">
                              <div className="px-4 py-2 bg-gray-600 text-white rounded-full font-medium text-sm mb-3">
                                Coming Soon
                              </div>
                              <p className="text-white text-sm">{work.description}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                      <p className="text-gray-400 text-sm mb-3">{work.year} • {work.role}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                          {categories.find(c => c.id === work.category)?.name}
                        </span>
                        {work.videoLink && (
                          <span className="text-amber-400 text-xs">▶ Available</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredWorks.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-gray-400">No works available in this category yet.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Popup */}
        <AnimatePresence>
          {showPopup && selectedWork && (
            <motion.div 
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
            >
              <motion.div 
                className="bg-gray-900 border border-gray-800 rounded-xl max-w-md w-full p-6 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-4">{selectedWork.title}</h3>
                <p className="text-gray-300 mb-6">This film will be published soon. Please check back later!</p>
                <button 
                  onClick={closePopup}
                  className="px-6 py-2 bg-amber-400 text-black rounded-full font-medium hover:bg-white transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default Works;