"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

interface ShortItem {
  title: string;
  year: string;
  videoId: string;
  videoLink: string;
}

const shorts: ShortItem[] = [
  {
    title: "মেঘ ও মেঘনা",
    year: "2025", 
    videoId: "9LfYttJpT-I",
    videoLink: "https://www.youtube.com/watch?v=9LfYttJpT-I"
  },
  {
    title: "পাহাড়, বৃষ্টি আর আমরা",
    year: "2025",
    videoId: "IiE0RAQWcIs",
    videoLink: "https://www.youtube.com/watch?v=IiE0RAQWcIs"
  },
  {
    title: "দিনান্তে!",
    year: "2025",
    videoId: "q6ccNYIl9WU",
    videoLink: "https://www.youtube.com/watch?v=q6ccNYIl9WU"
  },
  {
    title: "নৈসর্গিক",
    year: "2024",
    videoId: "BeHtfa7ZKeU",
    videoLink: "https://www.youtube.com/watch?v=BeHtfa7ZKeU"
  },
  {
    title: "পৌষ ১৪৩০ | Poush 1430",
    year: "2023", 
    videoId: "qSaIH8HF-fk",
    videoLink: "https://www.youtube.com/shorts/qSaIH8HF-fk"
  },
  {
    title:"হাট",
    year:"2026",
    videoId:"4IjWfYvtGkg",
    videoLink:"https://www.youtube.com/shorts/4IjWfYvtGkg",
  },
  {
    title: "Insaaf for Hadi",
    videoId:"dJJEYwF9El0",
    videoLink:"https://www.youtube.com/watch?v=dJJEYwF9El0",
    year:"2025",
  }
];

const Shorts = () => {
  const [pivot, setPivot] = useState(0); // Pivot element (always middle)
  const [animationOffset, setAnimationOffset] = useState(0); // Continuous offset for animation
  const [modalVideo, setModalVideo] = useState<ShortItem | null>(null);
  const [thumbnailErrors, setThumbnailErrors] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [slidePercentage, setSlidePercentage] = useState(33.3334); // Dynamic slide distance
  const elementRef = useRef<HTMLDivElement>(null);
  const elementRef1 = useRef<HTMLDivElement>(null);
  const flexContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate actual slide distance based on element measurements
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const calculateSlideDistance = () => {
      if (!isMobile && elementRef.current && elementRef1.current && flexContainerRef.current) {
        const element0Left = elementRef.current.offsetLeft;
        const element1Left = elementRef1.current.offsetLeft;
        const flexContainerWidth = flexContainerRef.current.offsetWidth;
        // Calculate actual distance between two elements including gap
        const calculatedPercentage = ((element1Left - element0Left) / flexContainerWidth) * 100;
        setSlidePercentage(calculatedPercentage);
      } else if (isMobile) {
        setSlidePercentage(100);
      }
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateSlideDistance, 150);
    };

    calculateSlideDistance();
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [isMobile]);

  const handlePrevious = () => {
    setPivot((prev) => (prev - 1 + shorts.length) % shorts.length);
    setAnimationOffset((prev) => prev - 1);
  };

  const handleNext = () => {
    setPivot((prev) => (prev + 1) % shorts.length);
    setAnimationOffset((prev) => prev + 1);
  };

  const getThumbnailUrl = (videoId: string, quality: string = 'hqdefault') => {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const handleImageError = (videoId: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const currentSrc = target.src;
    
    // Fallback chain: maxresdefault -> sddefault -> hqdefault -> mqdefault -> default
    if (currentSrc.includes('maxresdefault')) {
      target.src = getThumbnailUrl(videoId, 'sddefault');
    } else if (currentSrc.includes('sddefault')) {
      target.src = getThumbnailUrl(videoId, 'hqdefault');
    } else if (currentSrc.includes('hqdefault')) {
      target.src = getThumbnailUrl(videoId, 'mqdefault');
    } else if (currentSrc.includes('mqdefault')) {
      target.src = getThumbnailUrl(videoId, 'default');
    } else {
      // All fallbacks failed, mark as error to prevent infinite loops
      const errorKey = `${videoId}-thumbnail`;
      setThumbnailErrors(prev => new Set([...prev, errorKey]));
    }
  };

  const handleVideoPlay = (short: ShortItem) => {
    setModalVideo(short);
  };

  const handleModalClose = () => {
    setModalVideo(null);
  };

  return (
    <section id="shorts" className="py-20 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold mb-4 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Shorts
        </motion.h2>
        <motion.p 
          className="text-center text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Some shorts through my lens while traveling to unknown. 
        </motion.p>

        <div className="relative">
          {/* Top Film Strip */}
          <div className="relative h-8 mb-4 overflow-hidden">
            <div className="absolute inset-0 bg-black">
              <div className="flex h-full gap-5">
                {[...Array(60)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-8 h-4 bg-white rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Left Navigation Button */}
          <motion.button
            onClick={handlePrevious}
            className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-4 z-20 bg-amber-400 text-black p-4 rounded-full hover:bg-white transition-colors"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft size={24} />
          </motion.button>

          {/* Right Navigation Button */}
          <motion.button
            onClick={handleNext}
            className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-4 z-20 bg-amber-400 text-black p-4 rounded-full hover:bg-white transition-colors"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight size={24} />
          </motion.button>

          {/* Film Reel Carousel */}
          <div className={`overflow-hidden py-4 ${isMobile ? 'px-4' : 'px-20'}`}>
            <motion.div
              ref={flexContainerRef}
              className="flex gap-8 items-center"
              animate={{
                x: isMobile ? `-${animationOffset * 100}%` : `-${animationOffset * slidePercentage}%`
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.5
              }}
            >
              {/* Render all shorts for continuous sliding */}
              {[...shorts, ...shorts, ...shorts].map((short, index) => (
                <motion.div
                  key={`${short.title}-${index}`}
                  ref={index === 0 ? elementRef : index === 1 ? elementRef1 : undefined}
                  className={`relative transition-all duration-300 flex-shrink-0 ${
                    isMobile ? 'w-full' : 'w-[calc(33.333%-21.333px)]'
                  }`}
                  initial={{ opacity: 0, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Film Frame */}
                  <div className="relative bg-black p-4 rounded-lg shadow-2xl border-2 border-white">
                    {/* Video Container */}
                    <div className="relative aspect-video overflow-hidden bg-black rounded">
                      <div 
                        onClick={() => handleVideoPlay(short)}
                        className="block cursor-pointer w-full h-full relative group"
                      >
                        <img
                          src={getThumbnailUrl(short.videoId)}
                          alt={short.title}
                          className="w-full h-full object-cover"
                          onError={(e) => handleImageError(short.videoId, e)}
                        />
                        {/* Film Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute inset-0 opacity-20">
                          <div className="h-full w-full" style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                          }}></div>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="px-6 py-3 bg-amber-400 text-black rounded-full font-medium hover:bg-white transition-colors flex items-center gap-2">
                            <FaPlay size={16} />
                            Play
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Film Info */}
                    <div className="mt-4 text-center">
                      <h3 className={`text-lg font-bold ${
                        index === 1 ? 'text-white' : 'text-gray-300'
                      }`}>{short.title}</h3>
                      <p className="text-gray-400">{short.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Film Strip */}
          <div className="relative h-8 mt-4 overflow-hidden">
            <div className="absolute inset-0 bg-black">
              <div className="flex h-full gap-5">
                {[...Array(60)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-8 h-4 bg-white rounded-sm"></div>
                ))}
              </div>
            </div>
          </div>
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
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-4xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={handleModalClose}
                className="absolute -top-12 right-0 z-10 text-white hover:text-amber-400 transition-colors"
                aria-label="Close modal"
              >
                <FaTimes size={24} />
              </button>

              {/* Video Container */}
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${modalVideo.videoId}?autoplay=1&rel=0`}
                  title={modalVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-white">{modalVideo.title}</h3>
                <p className="text-gray-400">{modalVideo.year}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Shorts;