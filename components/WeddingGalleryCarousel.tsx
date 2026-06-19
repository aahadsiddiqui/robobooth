import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

export type CarouselImage = {
  id: number
  src: string
  title: string
}

const imgVariants = {
  initial: (trend: number) => ({
    x: trend === 1 ? '200%' : '-200%',
    opacity: 0,
  }),
  animate: { x: '-50%', opacity: 1 },
  exit: (trend: number) => ({
    x: trend === 1 ? '-200%' : '200%',
    opacity: 0,
  }),
}

const titleVariants = {
  initial: (trend: number) => ({
    y: trend === 1 ? 20 : -20,
    opacity: 0,
  }),
  animate: { y: 0, opacity: 1 },
  exit: (trend: number) => ({
    y: trend === 1 ? -20 : 20,
    opacity: 0,
  }),
}

const weddingGalleryImages: CarouselImage[] = [
  { id: 1, src: '/images/wedding/wedding-1.png', title: "Aman & Aarushi's Wedding!" },
  { id: 2, src: '/images/wedding/wedding-2.png', title: "Nithya & Michael's Wedding!" },
  { id: 3, src: '/images/wedding/wedding-3.png', title: "Tealyah & Josh's Wedding!" },
  { id: 4, src: '/images/wedding/wedding-4.png', title: "Chantal & Matthew's Wedding!" },
  { id: 5, src: '/images/wedding/wedding-5.png', title: "The Whyte's Wedding!" },
  { id: 6, src: '/images/wedding/wedding-6.png', title: "J & M's Wedding!" },
  { id: 7, src: '/images/wedding/wedding-7.png', title: "Carla & Scott's Wedding!" },
  { id: 8, src: '/images/wedding/wedding-8.png', title: "Michael & Chloe's Wedding!" },
  { id: 9, src: '/images/wedding/wedding-9.png', title: "Gianpaolo & Milly's Wedding!" },
  { id: 10, src: '/images/wedding/wedding-10.png', title: "Shehryar & Mahnoor's Wedding!" },
  { id: 11, src: '/images/wedding/wedding-11.png', title: "The Toors' Wedding!" },
  { id: 12, src: '/images/wedding/wedding-12.png', title: "Chloe & Todd's Wedding!" },
  { id: 13, src: '/images/wedding/wedding-13.png', title: "Abdullah & Sara's Wedding!" },
]

type WeddingGalleryCarouselProps = {
  images?: CarouselImage[]
}

export default function WeddingGalleryCarousel({ images = weddingGalleryImages }: WeddingGalleryCarouselProps) {
  const [idx, setIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState(idx)

  const trend = idx > prevIdx ? 1 : -1
  const imageIndex = Math.abs(idx % images.length)
  const current = images[imageIndex]

  const goPrev = () => {
    setPrevIdx(idx)
    setIdx((pv) => pv - 1)
  }

  const goNext = () => {
    setPrevIdx(idx)
    setIdx((pv) => pv + 1)
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10">
      <div className="h-[50vw] min-h-[320px] max-h-[600px] bg-black relative overflow-hidden">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className="bg-black/50 hover:bg-black/60 transition-colors text-white p-2 absolute z-10 left-0 top-0 bottom-0"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>

        <div className="absolute inset-0 z-[5] backdrop-blur-xl">
          <AnimatePresence initial={false} custom={trend}>
            <motion.img
              variants={imgVariants}
              custom={trend}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              key={current.id}
              src={current.src}
              alt={current.title}
              style={{ y: '-50%', x: '-50%' }}
              className="max-h-[90%] max-w-[calc(100%-80px)] mx-auto bg-black object-contain shadow-2xl absolute left-1/2 top-1/2"
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className="bg-black/50 hover:bg-black/60 transition-colors text-white p-2 absolute z-10 right-0 top-0 bottom-0"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>

        <AnimatePresence initial={false} custom={trend}>
          <motion.span
            custom={trend}
            variants={titleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            key={current.id}
            className="text-white text-sm md:text-xl p-2 md:p-3 rounded-lg bg-white/10 backdrop-blur-lg font-semibold shadow-lg absolute z-20 left-4 md:left-10 bottom-4 max-w-[calc(100%-2rem)]"
          >
            {current.title}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          <motion.div
            key={current.id + images.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${current.src})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
