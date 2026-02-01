"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface WorkItem {
  title: string;
  year: string;
  role: string;
  description: string;
  image: string;
  videoLink?: string; 
}

const works: WorkItem[] = [
  {
    title: "Joar - The Tide",
    year: "2025",
    role: "Director & Story",
    description: "Joar (The Tide)— My first fiction film. Made with minimal resources and beginner’s experience, yet carried by passion and sincerity. Despite its imperfections, the film found its own path and received remarkable appreciation, earning multiple selections in international film festivals. It has been honored with the BIFF Best Film Award in the National Short category at the 6th Bogura International Film Festival 2026.",
    image: "/works/Joar_festival_laurel.jpg",
    // videoLink: "https://www.youtube.com/watch?v=LVWayznWIlg"
  },
  {
    title: "ONTOSSHOR",
    year: "2025",
    role: "Director and Interview",
    description: "A documentary that uncovers the harsh reality of guestroom culture in Bangladeshi universities. Through Rakib’s harrowing story of survival, the film sheds light on a silenced chapter of student life before the 2024 uprising. Its raw honesty sparked powerful conversations and received an overwhelming audience response online",
    image: "/works/5 ONTOSSHOR.jpg",
    videoLink: "https://www.youtube.com/watch?v=mQQ6VeX8e2c"
  },
  {
    title: "Khosh Amded Ramadan",
    year: "2025",
    role: "Director",
    description: "Khosh Amded Ramadan is a music video that celebrates the spirit of Ramadan with a fresh, cinematic approach. Blending festive visuals, warm cultural aesthetics, and heartfelt performances, the video redefined the style of Ramadan-themed productions in Bangladesh. The project reached a wide audience and received an enthusiastic response across social media platforms",
    image: "/works/2 Qaseeda.jpeg",
    videoLink: "https://www.youtube.com/watch?v=RfcxyMMCwFk"
  }
];

const Works = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

  const handleWorkClick = (work: WorkItem, e: React.MouseEvent) => {
    // If there's no video link, show the popup
    if (!work.videoLink) {
      e.preventDefault();
      setSelectedWork(work);
      setShowPopup(true);
    }
    // If there is a video link, let the default anchor behavior happen
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedWork(null);
  };

  return (
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
          A selection of my recent film projects.
        </motion.p>
        
        <div className="space-y-16">
          {works.map((work, index) => (
            <div
              key={work.title}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Video/Thumbnail Section - 2/3 width */}
              <motion.div 
                className="w-full md:w-2/3"
                initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                  {work.videoLink ? (
                    <a 
                      href={work.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-6 py-3 bg-amber-400 text-black rounded-full font-medium hover:bg-white transition-colors">
                          Watch Film
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div 
                      className="relative w-full h-full group cursor-pointer"
                      onClick={(e) => handleWorkClick(work, e)}
                    >
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-6 py-3 bg-gray-600 text-white rounded-full font-medium">
                          Coming Soon
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Description Section - 1/3 width */}
              <motion.div 
                className="w-full md:w-1/3"
                initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="h-full flex flex-col justify-center px-4 md:px-6 lg:px-8">
                  <h3 className="text-2xl font-bold mb-2">{work.title}</h3>
                  <p className="text-gray-400 mb-4">{work.year} • {work.role}</p>
                  <p className="text-gray-300 leading-relaxed text-justify">{work.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            href="/works"
            className="inline-flex items-center px-8 py-3 bg-amber-400 text-black rounded-full font-medium hover:bg-white transition-colors"
          >
            See More
          </Link>
        </motion.div>

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
                className="bg-gray-800 rounded-xl max-w-md w-full p-6 text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold mb-4">{selectedWork.title}</h3>
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
      </div>
    </section>
  );
};

export default Works;
