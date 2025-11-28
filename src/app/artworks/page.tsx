"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface ArtworkItem {
  title: string;
  year: string;
  image: string;
  description?: string;
}

const artworks: ArtworkItem[] = [
  {
    title: "Free Falasteen",
    year: "2024",
    image: "/artworks/free Falasteen 3.jpg",
    description: "A powerful piece representing the struggle for freedom in Palestine. Created with mixed media, this artwork captures the resilience and hope of the Palestinian people."
  },
  {
    title: "Graffiti",
    year: "2024",
    image: "/artworks/Graffiti.jpg",
    description: "An urban art piece that blends street culture with contemporary design. This graffiti work showcases bold colors and dynamic composition."
  }
];

export default function ArtworksPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (artwork: ArtworkItem) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <Header />
      <main>
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
          A collection of my artistic works that blend creativity and visual storytelling. Click on any artwork to view details.
        </motion.p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.title}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => openModal(artwork)}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-medium transition-opacity duration-300">
                    View Details
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{artwork.title}</h3>
                <p className="text-gray-400">{artwork.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isModalOpen && selectedArtwork && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div 
                className="bg-gray-800 dark:bg-gray-900 rounded-xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col md:flex-row"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="md:w-1/2 h-96 md:h-[80vh] bg-gray-700 dark:bg-gray-800 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      fill
                      className="object-contain"
                      quality={100}
                      priority
                    />
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6 overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedArtwork.title}</h2>
                      <p className="text-gray-300">{selectedArtwork.year}</p>
                    </div>
                    <button 
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      aria-label="Close"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-lg font-semibold mb-2">About This Artwork</h3>
                    <p className="text-gray-300 dark:text-gray-300">
                      {selectedArtwork.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
