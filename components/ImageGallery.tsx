'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryImages, galleryCategories, GalleryCategory } from '@/data/gallery'

export default function ImageGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('weddings')

  const filteredImages = galleryImages.filter((img) => img.category === activeCategory)

  return (
    <section className="py-16 md:py-24 px-4 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-gold/60 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Real Events, Real Moments
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Event <span className="text-gold">Gallery</span>
          </h2>

          <div className="inline-flex items-center gap-1 p-1 rounded-full backdrop-blur-lg bg-black/40 border border-white/10">
            {galleryCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-500 ease-in-out ${
                  activeCategory === cat.value
                    ? 'text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {activeCategory === cat.value && (
                  <motion.span
                    layoutId="gallery-pill"
                    className="absolute inset-0 bg-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4"
          >
            {filteredImages.map((image, i) => (
              <motion.figure
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="group relative break-inside-avoid rounded-2xl overflow-hidden backdrop-blur-lg bg-black/40 border border-white/10 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:border-gold/20"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                  <p className="text-white text-xs md:text-sm font-semibold">{image.title}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
