"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTimes, FaEye } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

interface ArtworkItem {
  title: string;
  year: string;
  image: string;
  thumbnail: string;
  description?: string;
}

export default function ArtworksPage() {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkItem | null>(null);
  const [artworks, setArtworks] = useState<ArtworkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('/content/artworks.json');
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error('Error loading artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const openModal = (artwork: ArtworkItem) => {
    setSelectedArtwork(artwork);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setSelectedArtwork(null);
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
              A collection of my creative designs.
            </motion.p>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                      <img
                        src={artwork.thumbnail}
                        alt={artwork.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Eye icon overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <FaEye className="text-white/50 text-5xl drop-shadow-lg" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold">{artwork.title}</h3>
                      <p className="text-gray-400">{artwork.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <AnimatePresence>
              {selectedArtwork && (
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
                          src={selectedArtwork.image}
                          alt={selectedArtwork.title}
                          className="max-w-full max-h-[80vh] object-contain"
                        />
                      </div>
                      <div className="mt-3 text-center text-white">
                        <h3 className="text-lg font-bold">{selectedArtwork.title}</h3>
                        <p className="text-sm text-gray-300">{selectedArtwork.year}</p>
                      </div>
                    </div>
                  </div>
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
