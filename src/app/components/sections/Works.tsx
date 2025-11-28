"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface WorkItem {
  title: string;
  year: string;
  role: string;
  image: string;
  videoLink?: string; 
}

const works: WorkItem[] = [
  {
    title: "Joar",
    year: "2024",
    role: "Director & Story",
    image: "/works/1 Joar.jpg",
    // videoLink: "https://www.youtube.com/watch?v=LVWayznWIlg"
  },
  {
    title: "ONTOSSHOR",
    year: "2023",
    role: "Director and Interview",
    image: "/works/5 ONTOSSHOR.jpg",
    videoLink: "https://www.youtube.com/watch?v=mQQ6VeX8e2c"
  },
  {
    title: "Khosh Amded Ramadan",
    year: "2024",
    role: "Director",
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
          A selection of my recent film projects that showcase my storytelling and technical expertise.
        </motion.p>
        
        <div className="grid md:grid-cols-1 lg:grid-cols-1">
          {works.map((work, index) => (
            <motion.div
              key={work.title}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="relative h-100 overflow-hidden"
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
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-6 py-2 bg-amber-400 text-black rounded-full font-medium hover:bg-white transition-colors">
                        Watch Film
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
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-6 py-2 bg-gray-600 text-white rounded-full font-medium">
                        Coming Soon
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{work.title}</h3>
                <p className="text-gray-400">{work.year} • {work.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

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
