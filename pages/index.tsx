import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiPhone, FiArrowRight } from 'react-icons/fi'
import ProductHub from '../components/ProductHub'
import ScrollingTestimonials from '../components/ScrollingTestimonials'
import Navbar from '../components/Navbar'
import { products } from '../data/products'

const companyLogos = [
  '/images/adamas.png', '/images/bell.png', '/images/bgo.png', '/images/equifax.svg',
  '/images/geotab.png', '/images/hilton.png', '/images/infosys.png', '/images/meta.png',
  '/images/pdsb.png', '/images/remax.png', '/images/ritz.webp', '/images/rlp.svg',
  '/images/stonex.png', '/images/talent.png', '/images/td.png', '/images/torontopearson.png', '/images/BMO.svg.png',
]

export default function Home() {
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
      <section className="py-10 md:py-14 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6">
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
              <div key={i} className="flex-shrink-0 w-20 md:w-28 h-10 md:h-14 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Client"
                  className={`max-w-full max-h-full object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 ${
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
