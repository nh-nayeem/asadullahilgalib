"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaTimes, FaEye } from 'react-icons/fa';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface PhotoItem {
  title: string;
  image: string;
  imagethumb?: string;
}

const photos: PhotoItem[] = [
  {
    title: "July",
    image: "/photographs/July.jpg",
    imagethumb: "/photographs/July-min.jpg"
  },
  {
    title: "Afra",
    image: "/photographs/Afra.jpg",
    imagethumb: "/photographs/Afra-min.jpg"
  },
  {
    title: "Dinghy",
    image: "/photographs/Dinghy.jpg",
    imagethumb: "/photographs/Dinghy-min.jpg"
  },
  {
    title: "Flow",
    image: "/photographs/Flow.jpg",
    imagethumb: "/photographs/Flow-min.jpg"
  },
  {
    title: "Gaaner Sawgat",
    image: "/photographs/Gaaner Sawgat.jpg",
    imagethumb: "/photographs/Gaaner Sawgat-min.jpg"
  },
  {
    title: "Hope",
    image: "/photographs/Hope.jpg",
    imagethumb: "/photographs/Hope-min.jpg"
  },
  {
    title: "I Wish",
    image: "/photographs/I Wish.jpg",
    imagethumb: "/photographs/I Wish-min.jpg"
  },
  {
    title: "Jahajer Janala",
    image: "/photographs/Jahajer Janala.jpg",
    imagethumb: "/photographs/Jahajer Janala-min.jpg"
  },
  {
    title: "Lalbagh",
    image: "/photographs/Lalbagh.jpg",
    imagethumb: "/photographs/Lalbagh-min.jpg"
  },
  {
    title: "A Morning",
    image: "/photographs/A Morning.jpg",
    imagethumb: "/photographs/A Morning.jpg"
  },
  {
    title: "Gaze",
    image: "/photographs/Gaze.jpg",
    imagethumb: "/photographs/Gaze.jpg"
  },
  {
    title: "Minar",
    image: "/photographs/Minar.jpg",
    imagethumb: "/photographs/Minar.jpg"
  },
  {
    title: "Mist",
    image: "/photographs/Mist.jpg",
    imagethumb: "/photographs/Mist.jpg"
  },
  {
    title: "Naya Char",
    image: "/photographs/Naya Char.jpg",
    imagethumb: "/photographs/Naya Char.jpg"
  },
  {
    title: "Phul",
    image: "/photographs/Phul.jpg",
    imagethumb: "/photographs/Phul.jpg"
  },
  {
    title: "Reflection",
    image: "/photographs/Reflection.jpg",
    imagethumb: "/photographs/Reflection.jpg"
  },
  {
    title: "Rest",
    image: "/photographs/Rest.jpg",
    imagethumb: "/photographs/Rest.jpg"
  },
  {
    title: "Stairs",
    image: "/photographs/Stairs.jpg",
    imagethumb: "/photographs/Stairs.jpg"
  },
  {
    title: "The Door of Peace",
    image: "/photographs/The Door of Peace.jpg",
    imagethumb: "/photographs/The Door of Peace.jpg"
  }
];

export default function Photographs() {
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
    <>
      <Header />
      <main>
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
          A selection of my clicks capturing moments.
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
              <div className="relative h-96 overflow-hidden">
                <img
                  src={photo.imagethumb}
                  alt={photo.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Eye icon overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaEye className="text-white/50 text-5xl drop-shadow-lg" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl text-gray-400">{photo.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      </section>
      </main>
      <Footer />
    
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
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
