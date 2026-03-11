import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { useRouter } from 'next/router'
import ProductHub from '../components/ProductHub'
import ScrollingTestimonials from '../components/ScrollingTestimonials'
import Navbar from '../components/Navbar'
import { products } from '../data/products'
import { eventTypes } from '../data/events'

const companyLogos = [
  '/images/adamas.png', '/images/bell.png', '/images/bgo.png', '/images/equifax.svg',
  '/images/geotab.png', '/images/hilton.png', '/images/infosys.png', '/images/meta.png',
  '/images/pdsb.png', '/images/remax.png', '/images/ritz.webp', '/images/rlp.svg',
  '/images/stonex.png', '/images/talent.png', '/images/td.png', '/images/torontopearson.png', '/images/BMO.svg.png',
]

export default function Home() {
  const router = useRouter()
  const [plannerOpen, setPlannerOpen] = useState(false)
  const plannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (plannerRef.current && !plannerRef.current.contains(e.target as Node)) {
        setPlannerOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const slugToPath = (slug: string) => {
    const map: Record<string, string> = {
      'product-launches': '/events/product-launch',
      'retail-pop-ups': '/events/retail-pop-up',
      'conferences-summits': '/events/conference-summit',
      'trade-shows-expos': '/events/trade-show-expo',
      'gala-dinners-award-ceremonies': '/events/gala-dinner',
      'holiday-parties': '/events/holiday-party',
      'milestone-celebrations': '/events/milestone-celebration',
      'engagements': '/events/engagement',
      'bar-bat-mitzvahs': '/events/bar-bat-mitzvah',
      'concerts-festivals': '/events/concert-festival',
      'graduation': '/events/graduation',
    }
    return map[slug] || `/events/${slug}`
  }

  const handleEventSelect = (path: string) => {
    setPlannerOpen(false)
    if (path === 'corporate') { router.push('/corporate'); return }
    if (path === 'brand-activation') { router.push('/brand-activations'); return }
    if (path === 'wedding') { router.push('/wedding'); return }
    router.push(path)
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Head>
        <title>RoboBooth | Canada's First Robot PhotoBooth & Aerial Booth</title>
        <meta name="description" content="Canada's first Robot PhotoBooth and Aerial Booth serving the GTA and surrounding areas. Your one-stop shop for photography and event entertainment." />
        <meta name="keywords" content="robot photo booth, aerial booth, photo booth rental Toronto, GTA photo booth, event entertainment, 360 booth, premium photobooth" />
        <meta property="og:title" content="RoboBooth | Canada's First Robot PhotoBooth & Aerial Booth" />
        <meta property="og:description" content="Canada's first Robot PhotoBooth and Aerial Booth. Your one-stop shop for photography and event entertainment across the GTA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://robobooth.ca" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RoboBooth | Canada's First Robot PhotoBooth & Aerial Booth" />
        <meta name="twitter:description" content="Canada's first Robot PhotoBooth and Aerial Booth. Your one-stop shop for photography and event entertainment across the GTA." />
        <link rel="canonical" href="https://robobooth.ca" />
      </Head>

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="pt-20 md:pt-24 pb-6 md:pb-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 md:mb-4">
              Canada&apos;s First <span className="text-[#fce4a6]">Robot PhotoBooth</span> and <span className="text-[#fce4a6]">Aerial Booth</span>
              <br className="hidden md:block" />
              <span className="text-white/90"> Serving GTA and Surrounding Areas</span>
            </h1>
            <p className="text-white/60 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto">
              Your one-stop shop for photography and event entertainment
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Choose Your Experience Label ── */}
      <section className="pb-2 px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#fce4a6] text-center md:text-left">Choose Your Event Experience</p>
        </motion.div>
      </section>

      {/* ── Product Panels ── */}
      <ProductHub
        title=""
        subtitle=""
        products={products}
        hideHeader
      />

      {/* ── Companies We've Worked With ── */}
      <section className="py-8 md:py-10 border-t border-white/5 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 mb-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-xl md:text-3xl lg:text-4xl font-black text-white mb-2"
          >
            Companies We&apos;ve <span className="text-[#fce4a6]">Worked With</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-white/40 text-xs md:text-sm"
          >
            Trusted by leading brands across Canada
          </motion.p>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-center gap-10 md:gap-16 px-4">
            {[...companyLogos, ...companyLogos].map((logo, i) => (
              <div key={i} className="flex-shrink-0 w-32 md:w-44 h-20 md:h-24 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Client"
                  className={`w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 ${
                    logo.includes('ritz.webp') || logo.includes('hilton.png')
                      ? 'filter invert grayscale'
                      : logo.includes('td.png')
                        ? ''
                        : 'filter brightness-0 invert'
                  }`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── I'm Planning a... ── */}
      <section className="py-10 md:py-14 px-4 border-t border-white/5 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[#fce4a6]/60 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-3">Find Your Perfect Experience</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
              I&apos;m planning a<span className="text-[#fce4a6]">...</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            ref={plannerRef}
            className="relative inline-block w-full max-w-md"
          >
            <button
              onClick={() => setPlannerOpen(!plannerOpen)}
              className="w-full flex items-center justify-between bg-white/[0.06] border-2 border-[#fce4a6]/40 hover:border-[#fce4a6]/80 text-white px-5 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all group"
            >
              <span className={plannerOpen ? 'text-white' : 'text-white/50'}>
                {plannerOpen ? 'Select your event type' : 'Select your event type'}
              </span>
              <FiChevronDown className={`w-5 h-5 text-[#fce4a6] transition-transform duration-200 ${plannerOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {plannerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/98 backdrop-blur-xl border border-[#fce4a6]/20 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50"
                >
                  <div className="py-2 max-h-[60vh] overflow-y-auto">
                    {/* Featured — white bold */}
                    {[
                      { slug: 'corporate', name: 'Corporate Event', emoji: '🏢' },
                      { slug: 'brand-activation', name: 'Brand Activation', emoji: '🚀' },
                      { slug: 'wedding', name: 'Wedding', emoji: '👫' },
                    ].map((item, i) => (
                      <motion.button
                        key={item.slug}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        onClick={() => handleEventSelect(item.slug)}
                        className="w-full flex items-center justify-between px-5 py-3.5 text-left text-white hover:bg-[#fce4a6]/10 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.emoji}</span>
                          <span className="font-bold text-sm md:text-base">{item.name}</span>
                        </div>
                        <FiArrowRight className="w-4 h-4 text-[#fce4a6] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </motion.button>
                    ))}
                    <div className="mx-5 my-1 border-t border-white/10" />
                    {/* All event types — exclude wedding since it's featured above */}
                    {eventTypes.filter(e => e.slug !== 'weddings').map((event, i) => (
                      <motion.button
                        key={event.slug}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (i + 3) * 0.03 }}
                        onClick={() => handleEventSelect(slugToPath(event.slug))}
                        className="w-full flex items-center justify-between px-5 py-3.5 text-left text-white/70 hover:text-white hover:bg-[#fce4a6]/10 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{event.emoji}</span>
                          <span className="font-semibold text-sm md:text-base">{event.name}</span>
                        </div>
                        <FiArrowRight className="w-4 h-4 text-[#fce4a6] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/30 text-xs mt-4"
          >
            Select your event type to see the perfect package for your celebration
          </motion.p>
        </div>
      </section>

      {/* ── Trusted by Hundreds — Testimonials ── */}
      <section className="bg-black">
        <ScrollingTestimonials />
      </section>

      {/* ── Final CTA ── */}
      <section className="py-12 md:py-16 px-4 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white mb-3">
            Ready to Elevate Your <span className="text-[#fce4a6]">Next Event?</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base mb-6 max-w-lg mx-auto">
            Get a custom quote in minutes. We serve Toronto, the GTA, and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="/contact"
              className="w-full sm:w-auto bg-[#fce4a6] text-black px-7 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group text-center"
            >
              Get a Quote <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <a href="tel:289-301-4039" className="flex items-center gap-2 text-[#fce4a6] text-sm font-semibold hover:text-white transition-colors">
              <FiPhone className="w-4 h-4" /> Or call: 289-301-4039
            </a>
          </div>
          <p className="text-white/30 text-[10px] md:text-xs mt-3">Responses in &lt;15 mins&ensp;|&ensp;No credit card required</p>
        </motion.div>
      </section>

      <div className="h-20 md:h-0" />

      {/* ── Sticky CTA ── */}
      <motion.a
        whileTap={{ scale: 0.97 }}
        href="/contact"
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-auto z-50 bg-[#fce4a6] text-black font-bold px-6 py-4 rounded-full shadow-xl text-center flex items-center justify-center gap-2"
      >
        Get a Quote <FiArrowRight className="w-4 h-4" />
      </motion.a>
    </div>
  )
}
