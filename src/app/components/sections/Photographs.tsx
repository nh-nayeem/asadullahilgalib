"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface PhotoItem {
  title: string;
  date: string;
  image: string;
  imagethumb?: string;
}

const photos: PhotoItem[] = [
  {
    title: "July",
    date: "2024",
    image: "/photographs/1. July.jpg"
  },
  {
    title: "The Tomb of Paribibi",
    date: "2024",
    image: "/photographs/2. The Tomb of Paribibi.jpg"
  },
  {
    title: "Window",
    date: "2023",
    image: "/photographs/3. Window.jpg",
  },
  {
    title: "I wish",
    date: "2023",
    image: "/photographs/4. I wish.jpg"
  },
  {
    title: "Hope",
    date: "2023",
    image: "/photographs/5. Hope"
  },
  {
    title: "Afra",
    date: "2023",
    image: "/photographs/6. Afra.jpg"
  },
  {
    title: "Flow",
    date: "2023",
    image: "/photographs/7. Flow.jpg"
  },
  {
    title: "Ganer Sawgat",
    date: "2023",
    image: "/photographs/8. Ganer Sawgat.jpg"
  },
  {
    title: "Lalbagh",
    date: "2023",
    image: "/photographs/9. Lalbagh.jpg"
  },
  {
    title: "Crow",
    date: "2023",
    image: "/photographs/10. Crow"
  },
  {
    title: "Dinghy",
    date: "2023",
    image: "/photographs/11. Dinghy.jpg"
  },
  {
    title: "Silence",
    date: "2023",
    image: "/photographs/12. Silence.jpg"
  }
];

const Photographs = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const openModal = (photo: PhotoItem) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };

  // Close modal when clicking outside the image
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
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
          {photos.map((photo, index) => (
            <motion.div
              key={photo.title}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openModal(photo)}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{photo.title}</h3>
                <p className="text-gray-400">{photo.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={handleBackdropClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center">
              <div className="relative bg-black/80 p-4 rounded-lg flex flex-col items-center">
                <button
                  onClick={closeModal}
                  className="absolute -top-3 -right-3 bg-black/80 rounded-full p-1.5 text-white hover:text-amber-400 transition-colors"
                  aria-label="Close"
                >
                  <FaTimes size={20} />
                </button>
                <div className="max-w-[85vw] max-h-[80vh] flex items-center justify-center">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                </div>
                <div className="mt-3 text-center text-white">
                  <h3 className="text-lg font-bold">{selectedPhoto.title}</h3>
                  <p className="text-sm text-gray-300">{selectedPhoto.date}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Photographs;
