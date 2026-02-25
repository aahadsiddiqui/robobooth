import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiChevronDown, FiChevronUp, FiCheck, FiPhone } from 'react-icons/fi'
import { ProductFAQ, ProductTestimonial, ProductUSP } from '../data/products'

type ProductLayoutProps = {
  name: string
  tagline: string
  summary: string
  priceLabel: string
  priceNote?: string
  badges: string[]
  usp: ProductUSP[]
  videoUrl: string
  productImage: string
  faqData: ProductFAQ[]
  testimonials: ProductTestimonial[]
  ctaLabel?: string
  ctaHref?: string
  belowHeroContent?: React.ReactNode
}

const LazyVideo = ({ videoUrl, poster }: { videoUrl: string; poster: string }) => {
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '200px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      {isInView ? (
        <video
          className="w-full aspect-[4/5] max-h-[520px] rounded-3xl object-cover shadow-2xl"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="none"
          poster={poster}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full aspect-[9/16] rounded-3xl bg-black/10 flex items-center justify-center text-black/50">
          Loading preview...
        </div>
      )}
    </div>
  )
}

export default function ProductLayout({
  name,
  tagline,
  summary,
  priceLabel,
  priceNote,
  badges,
  usp,
  videoUrl,
  productImage,
  faqData,
  testimonials,
  ctaLabel = 'Reserve Yours',
  ctaHref = '/contact',
  belowHeroContent
}: ProductLayoutProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/1.png" alt="Robo Booth logo" className="h-16 w-auto md:h-20" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-white/70 hover:text-white">
              Back to Products
            </Link>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="tel:289-301-4039"
              className="hidden md:inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm"
            >
              <FiPhone className="w-4 h-4" />
              289-301-4039
            </motion.a>
          </div>
        </div>
      </nav>

      <section className="pt-20 pb-6 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-sm text-[#fce4a6] uppercase tracking-[0.2em] mb-3">Product</div>
            <h1 className="text-3xl md:text-5xl font-black mb-4">{name}</h1>
            <p className="text-lg text-white/90 mb-4">{tagline}</p>
            <p className="text-white/70 mb-6">{summary}</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
              <div className="text-2xl font-black text-white">{priceLabel}</div>
              {priceNote && <div className="text-xs text-white/60">{priceNote}</div>}
              <div className="flex flex-wrap gap-2 mt-3">
                {badges.map((badge) => (
                  <span key={badge} className="text-xs text-[#fce4a6] border border-[#fce4a6]/30 px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={ctaHref}
              className="inline-flex items-center gap-2 bg-[#fce4a6] text-black px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl"
            >
              {ctaLabel}
              <FiArrowRight />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <img
              src={productImage}
              alt={`${name} product`}
              className="w-full h-full max-h-[520px] rounded-3xl object-cover shadow-2xl"
              loading="eager"
              decoding="async"
            />
            <LazyVideo videoUrl={videoUrl} poster={productImage} />
          </motion.div>
        </div>
      </section>

      {belowHeroContent && (
        <section className="py-5 bg-black text-white border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4">
            {belowHeroContent}
          </div>
        </section>
      )}

      <section className="py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-black text-black">Why Guests Love It</h2>
            <p className="text-black/70 mt-2">Three reasons this booth drives engagement and shares.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usp.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-black/10 p-6 bg-white shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-black text-[#fce4a6] flex items-center justify-center mb-4">
                  <FiCheck />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-black/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-black text-[#fce4a6]">Social Proof Wall</h2>
            <p className="text-white/80">Real guests. Real reactions.</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {testimonials.map((item) => (
              <div key={item.name} className="break-inside-avoid mb-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-44 object-cover rounded-xl mb-4"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <p className="text-sm text-white/90 mb-3">"{item.text}"</p>
                  <div className="text-xs text-white/60">
                    <span className="font-semibold text-white">{item.name}</span> · {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-black text-black">FAQs</h2>
            <p className="text-black/70">Quick answers to the most common questions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqData.map((faq, index) => (
              <div
                key={faq.question}
                className="border border-black/10 rounded-2xl p-4 cursor-pointer"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold text-black">{faq.question}</div>
                  {expandedFaq === index ? (
                    <FiChevronUp className="text-black/60" />
                  ) : (
                    <FiChevronDown className="text-black/60" />
                  )}
                </div>
                {expandedFaq === index && (
                  <p className="text-sm text-black/70 mt-3">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-[#fce4a6] mb-3">Ready to Reserve?</h2>
          <p className="text-white/80 mb-6">We confirm availability fast and handle everything on-site.</p>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-[#fce4a6] text-black px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl"
          >
            {ctaLabel}
            <FiArrowRight />
          </motion.a>
        </div>
      </section>

      <motion.a
        whileTap={{ scale: 0.97 }}
        href={ctaHref}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-auto z-50 bg-[#fce4a6] text-black font-bold px-6 py-4 rounded-full shadow-xl text-center"
      >
        {ctaLabel}
      </motion.a>
    </div>
  )
}

