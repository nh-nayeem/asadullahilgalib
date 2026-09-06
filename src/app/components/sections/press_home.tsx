"use client";

import { motion } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaNewspaper } from 'react-icons/fa6';
import { useEffect, useState } from 'react';

interface PressItem {
  title: string;
  url: string;
  thumbnail?: string;
  publisher?: string;
  date?: string;
}

const getPublisherMark = (url: string) => {
  try {
    const domain = new URL(url).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
  } catch {
    return '';
  }
};

export default function Press() {
  const [items, setItems] = useState<PressItem[]>([]);

  useEffect(() => {
    fetch('/content/press_home.json')
      .then((response) => response.ok ? response.json() : [])
      .then(async (data: PressItem[]) => {
        if (!Array.isArray(data)) return setItems([]);
        setItems(data);
        const resolvedItems = await Promise.all(data.map(async (item) => {
          if (item.title && item.thumbnail && item.publisher && item.date) return item;
          try {
            const response = await fetch(`/api/admin/press-preview?url=${encodeURIComponent(item.url)}`);
            if (!response.ok) return item;
            const preview = await response.json();
            return {
              ...item,
              title: item.title || preview.title || '',
              thumbnail: item.thumbnail || preview.thumbnail || '',
              publisher: item.publisher || preview.publisher || '',
              date: item.date || preview.date || '',
            };
          } catch {
            return item;
          }
        }));
        setItems(resolvedItems);
      })
      .catch(() => setItems([]));
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="press" className="bg-gray-900 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Press
        </motion.h2>
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {items.map((item, index) => (
            <motion.a
              key={`${item.url}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full max-w-[300px] overflow-hidden rounded-lg border border-white/10 bg-black transition-colors hover:border-amber-400/70 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="relative aspect-video overflow-hidden bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
                  <FaNewspaper className="text-4xl text-white/30" aria-hidden="true" />
                </div>
                {item.thumbnail ? (
                  <img
                    src={item.thumbnail}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="relative z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(event) => { event.currentTarget.style.display = 'none'; }}
                  />
                ) : null}
              </div>
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-3 text-xs uppercase tracking-widest text-amber-400">
                  <span className="flex min-w-0 items-center gap-2">
                    {getPublisherMark(item.url) && (
                      <img
                        src={getPublisherMark(item.url)}
                        alt=""
                        width={28}
                        height={28}
                        className="h-7 w-7 shrink-0 rounded-md bg-white object-contain p-0.5"
                        onError={(event) => { event.currentTarget.style.display = 'none'; }}
                      />
                    )}
                    <span className="truncate">{item.publisher || 'Press'}</span>
                  </span>
                  <FaArrowUpRightFromSquare aria-label="Open article" />
                </div>
                <h3 className="text-lg font-semibold leading-snug text-white group-hover:text-amber-400">{item.title || 'Open article'}</h3>
                {item.date && <p className="mt-3 text-sm text-gray-500">{item.date}</p>}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
