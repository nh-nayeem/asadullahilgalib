"use client";

import { useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Works from './components/sections/Works';
import Photographs from './components/sections/Photographs';
import Artworks from './components/sections/Artworks';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

export default function Home() {
  // Smooth scroll for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const target = document.querySelector(targetId);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Works />
        <Photographs />
        <Artworks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
