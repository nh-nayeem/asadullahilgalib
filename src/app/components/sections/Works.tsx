"use client";

import { motion } from 'framer-motion';

interface WorkItem {
  title: string;
  year: string;
  role: string;
  image: string;
  videoLink: string;
}

const works: WorkItem[] = [
  {
    title: "Joar",
    year: "2024",
    role: "Director & Story",
    image: "/works/1 Joar.jpg",
    videoLink: "https://www.youtube.com/watch?v=LVWayznWIlg"
  },
  {
    title: "Khosh Amded Ramadan",
    year: "2024",
    role: "Director",
    image: "/works/2 Qaseeda.jpeg",
    videoLink: "https://www.youtube.com/watch?v=RfcxyMMCwFk"
  },
  {
    title: "Megh o Meghna",
    year: "2023",
    role: "Director and Story",
    image: "/works/3 Megh o Meghna.png",
    videoLink: "https://www.youtube.com/watch?v=9LfYttJpT-I"
  },
  {
    title: "Ramadan",
    year: "2023",
    role: "Director",
    image: "/works/4 Ramadan by Junayed.jpeg",
    videoLink: "https://www.youtube.com/watch?v=yB8Argb2WRo"
  },
];

const Works = () => {
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
              className="group relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-100 overflow-hidden">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {work.videoLink && (
                    <a 
                      href={work.videoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-amber-400 text-black px-6 py-2 rounded-full font-medium hover:bg-white transition-colors"
                    >
                      Watch Film
                    </a>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">{work.title}</h3>
                <p className="text-gray-400">{work.year} • {work.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
