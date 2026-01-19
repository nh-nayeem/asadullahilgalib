"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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

const works: WorkItem[] = [
  {
    title: "Joar - The Tide",
    year: "2025",
    role: "Director & Story",
    image: "/works/Joar_festival_laurel.jpg",
    category: "filmography",
    description: ""
  },
  {
    title: "ONTOSSHOR",
    year: "2025",
    role: "Director and Interview",
    image: "https://img.youtube.com/vi/mQQ6VeX8e2c/maxresdefault.jpg",
    videoLink: "https://www.youtube.com/watch?v=mQQ6VeX8e2c",
    category: "filmography",
    description: ""
  },
  {
    title: "Khosh Amded Ramadan",
    year: "2024",
    role: "Director",
    image: "/works/2 Qaseeda.jpeg",
    videoLink: "https://www.youtube.com/watch?v=RfcxyMMCwFk",
    category: "direction",
    description: ""
  },
  {
    title: "Ramadan",
    year: "2023",
    role: "Director",
    image: "/works/4 Ramadan by Junayed.jpeg",
    videoLink: "https://www.youtube.com/watch?v=yB8Argb2WRo",
    category: "direction",
    description: ""
  },
  {
    title: "মেঘ ও মেঘনা",
    year: "2025",
    role: "Cinematographer",
    image: "/works/3 Megh o Meghna.png",
    videoLink: "https://www.youtube.com/watch?v=9LfYttJpT-I",
    category: "shorts",
    description: ""
  },
  {
    title: "পাহাড়, বৃষ্টি আর আমরা",
    year: "2025",
    role: "Cinematographer",
    image: "https://img.youtube.com/vi/IiE0RAQWcIs/maxresdefault.jpg",
    videoLink: "https://www.youtube.com/watch?v=IiE0RAQWcIs",
    category: "shorts",
    description: ""
  },
  {
    title: "দিনান্তে!",
    year: "2025",
    role: "Cinematographer",
    image: "https://img.youtube.com/vi/q6ccNYIl9WU/maxresdefault.jpg",
    videoLink: "https://www.youtube.com/watch?v=q6ccNYIl9WU",
    category: "shorts",
    description: ""
  },
  {
    title: "নৈসর্গিক",
    year: "2024",
    role: "Cinematographer",
    image: "https://img.youtube.com/vi/BeHtfa7ZKeU/maxresdefault.jpg",
    videoLink: "https://www.youtube.com/watch?v=BeHtfa7ZKeU",
    category: "shorts",
    description: ""
  },
  {
    title: "পৌষ ১৪৩০ | Poush 1430",
    year: "2023", 
    role: "Maker",
    image: "https://img.youtube.com/vi/qSaIH8HF-fk/maxresdefault.jpg",
    videoLink: "https://www.youtube.com/shorts/qSaIH8HF-fk",
    category: "shorts",
    description: ""
  },
  {
    title:"TEA",
    year:"2023",
    role:"Maker",
    image:"https://img.youtube.com/vi/r76es8bXYM8/maxresdefault.jpg",
    videoLink:"https://www.youtube.com/shorts/r76es8bXYM8",
    category:"shorts",
    description:""
  },
  {
    title:"Tumi Aar Nei Se Tumi",
    year:"2023",
    role:"Maker",
    image:"https://img.youtube.com/vi/h1bMKeFXbh0/maxresdefault.jpg",
    videoLink:"https://www.youtube.com/shorts/h1bMKeFXbh0",
    category:"shorts",
    description:""
  },
  {
    title:"পাখির কাছে ফুলের কাছে",
    year:"2021",
    role:"Maker",
    image:"https://img.youtube.com/vi/5LZv01LhKiY/maxresdefault.jpg",
    videoLink:"https://www.youtube.com/watch?v=5LZv01LhKiY",
    category:"filmography",
    description:""
  },
  {
    title:"রক্ষা কবচ | Rokkha Koboch | Qaseeda",
    year:"2025",
    role:"Maker",
    image:"https://img.youtube.com/vi/FhIzN8UHH3E/maxresdefault.jpg",
    videoLink:"https://www.youtube.com/watch?v=FhIzN8UHH3E",
    category:"direction",
    description:""
  },
  {
    title:"হাট",
    year:"2026",
    role:"Maker",
    image:"https://img.youtube.com/vi/4IjWfYvtGkg/maxresdefault.jpg",
    videoLink:"https://www.youtube.com/shorts/4IjWfYvtGkg",
    category:"shorts",
    description:""
  },
  {
    title: "Insaaf for Hadi",
    image:"https://img.youtube.com/vi/dJJEYwF9El0/maxresdefault.jpg",
    videoLink:"https://www.youtube.com/watch?v=dJJEYwF9El0",
    category:"shorts",
    year:"2025",
    role:"Maker",
    description:""
  }
];

const categories = [
  { id: 'filmography', name: 'Filmography', icon: '🎬' },
  { id: 'direction', name: 'Direction', icon: '🎥' },
  { id: 'shorts', name: 'Shorts', icon: '✈️' }
];

const Works = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'filmography' | 'direction' | 'shorts' | 'shorts'>('filmography');

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
