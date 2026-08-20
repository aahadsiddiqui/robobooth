import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

export type GalleryCarouselImage = {
  src: string
  alt: string
  title?: string
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

type GalleryCarouselProps = {
  images: GalleryCarouselImage[]
  onImageClick?: (image: GalleryCarouselImage) => void
}

export default function GalleryCarousel({ images, onImageClick }: GalleryCarouselProps) {
  const [idx, setIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState(0)

  if (!images.length) return null

  const trend = idx > prevIdx ? 1 : -1
  const imageIndex = ((idx % images.length) + images.length) % images.length
  const current = images[imageIndex]
  const caption = current.title ?? current.alt

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
              key={current.src}
              src={current.src}
              alt={current.alt}
              style={{ y: '-50%', x: '-50%' }}
              className={`max-h-[90%] max-w-[calc(100%-80px)] mx-auto bg-black object-contain shadow-2xl absolute left-1/2 top-1/2 ${
                onImageClick ? 'cursor-pointer' : ''
              }`}
              loading="lazy"
              onClick={() => onImageClick?.(current)}
              role={onImageClick ? 'button' : undefined}
              tabIndex={onImageClick ? 0 : undefined}
              onKeyDown={
                onImageClick
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        onImageClick(current)
                      }
                    }
                  : undefined
              }
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
            key={`${current.src}-caption`}
            className="text-white text-sm md:text-xl p-2 md:p-3 rounded-lg bg-white/10 backdrop-blur-lg font-semibold shadow-lg absolute z-20 left-4 md:left-10 bottom-4 max-w-[calc(100%-2rem)]"
          >
            {caption}
          </motion.span>
        </AnimatePresence>

        <div className="absolute bottom-4 right-4 z-20 flex gap-1.5">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => {
                setPrevIdx(idx)
                setIdx(i)
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === imageIndex ? 'w-5 bg-[#fce4a6]' : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <AnimatePresence initial={false}>
          <motion.div
            key={`${current.src}-bg`}
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
