"use client";

import { useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/hero_home';
import About from './components/sections/about_home';
import Works from './components/sections/works_home';
import Shorts from './components/sections/shorts_home';
import Photographs from './components/sections/photographs_home';
import Artworks from './components/sections/artworks_home';
import Contact from './components/sections/contact_home';
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
        <Shorts />
        <Photographs />
        <Artworks />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
