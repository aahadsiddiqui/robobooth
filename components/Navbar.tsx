import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiArrowRight, FiChevronDown, FiMenu, FiX } from 'react-icons/fi'
import { products } from '../data/products'
import { eventTypes } from '../data/events'

const eventSlugToPath = (slug: string): string => {
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

const featuredEvents = [
  { name: 'Corporate', href: '/corporate', emoji: '🏢' },
  { name: 'Brand Activations', href: '/brand-activations', emoji: '🚀' },
  { name: 'Wedding', href: '/wedding', emoji: '👫' },
]

export default function Navbar() {
  const [productsOpen, setProductsOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const eventsDropdownRef = useRef<HTMLDivElement>(null)

  /* Close desktop dropdowns on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
      if (eventsDropdownRef.current && !eventsDropdownRef.current.contains(e.target as Node)) {
        setEventsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    mobileMenuOpen
      ? document.body.classList.add('overflow-hidden')
      : document.body.classList.remove('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [mobileMenuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-[4.5rem] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/images/1.png" alt="Robo Booth logo" className="h-10 md:h-12 w-auto object-contain" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Home */}
            <Link href="/" className="text-sm text-white/70 hover:text-white transition-colors font-medium">
              Home
            </Link>

            {/* Products dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => { setProductsOpen(!productsOpen); setEventsOpen(false) }}
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors font-medium"
              >
                Products
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                  >
                    <div className="py-2">
                      {products.map((product) => (
                        <Link
                          key={product.slug}
                          href={product.linkOverride || `/products/${product.slug}`}
                          onClick={() => setProductsOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#fce4a6]/10 transition-colors group"
                        >
                          <span>{product.name}</span>
                          <FiArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#fce4a6]" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Events dropdown */}
            <div ref={eventsDropdownRef} className="relative">
              <button
                onClick={() => { setEventsOpen(!eventsOpen); setProductsOpen(false) }}
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors font-medium"
              >
                Events
                <FiChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${eventsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {eventsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
                  >
                    <div className="py-2 max-h-[70vh] overflow-y-auto">
                      <p className="px-4 pt-1 pb-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#fce4a6]/50">Featured</p>
                      {featuredEvents.map((event) => (
                        <Link
                          key={event.href}
                          href={event.href}
                          onClick={() => setEventsOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-[#fce4a6]/10 transition-colors group"
                        >
                          <span className="flex items-center gap-2"><span>{event.emoji}</span>{event.name}</span>
                          <FiArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#fce4a6]" />
                        </Link>
                      ))}
                      <div className="border-t border-white/10 mt-1 pt-1">
                        <p className="px-4 pt-1 pb-1.5 text-[10px] font-bold tracking-[0.15em] uppercase text-[#fce4a6]/50">All Event Types</p>
                        {eventTypes.filter(e => e.slug !== 'weddings').map((event) => (
                          <Link
                            key={event.slug}
                            href={eventSlugToPath(event.slug)}
                            onClick={() => setEventsOpen(false)}
                            className="flex items-center justify-between px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-[#fce4a6]/10 transition-colors group"
                          >
                            <span className="flex items-center gap-2"><span className="text-base">{event.emoji}</span>{event.name}</span>
                            <FiArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#fce4a6]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact */}
            <Link href="/contact" className="text-sm text-white/70 hover:text-white transition-colors font-medium">
              Contact
            </Link>

            {/* Phone */}
            <a href="tel:289-301-4039" className="flex items-center gap-2 text-white/70 text-sm hover:text-[#fce4a6] transition-colors">
              <FiPhone className="w-3.5 h-3.5" />
              289-301-4039
            </a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a href="tel:289-301-4039" className="lg:hidden flex items-center gap-1.5 text-white/70 text-sm hover:text-[#fce4a6] transition-colors">
              <FiPhone className="w-4 h-4" />
              <span className="hidden sm:inline">289-301-4039</span>
            </a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/contact"
              className="hidden sm:inline-flex bg-[#fce4a6] text-black px-4 py-2 rounded-full font-semibold text-sm"
            >
              Get a Quote
            </motion.a>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-20 px-6 overflow-y-auto lg:hidden"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              {/* Home link */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-3 rounded-xl text-white/80 hover:text-white hover:bg-[#fce4a6]/10 transition-colors group mb-4"
              >
                <span className="text-base font-medium">Home</span>
                <FiArrowRight className="w-4 h-4 text-[#fce4a6]/50 group-hover:text-[#fce4a6] group-hover:translate-x-1 transition-all" />
              </Link>

              <p className="text-[#fce4a6]/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">Products</p>
              <div className="space-y-1 mb-8">
                {products.map((product, i) => (
                  <motion.div key={product.slug} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                    <Link
                      href={product.linkOverride || `/products/${product.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 px-3 rounded-xl text-white/80 hover:text-white hover:bg-[#fce4a6]/10 transition-colors group"
                    >
                      <span className="text-base font-medium">{product.name}</span>
                      <FiArrowRight className="w-4 h-4 text-[#fce4a6]/50 group-hover:text-[#fce4a6] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <p className="text-[#fce4a6]/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">Events — Featured</p>
              <div className="space-y-1 mb-4">
                {featuredEvents.map((event, i) => (
                  <motion.div key={event.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                    <Link
                      href={event.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 px-3 rounded-xl text-white/80 hover:text-white hover:bg-[#fce4a6]/10 transition-colors group"
                    >
                      <span className="text-base font-medium flex items-center gap-2"><span>{event.emoji}</span>{event.name}</span>
                      <FiArrowRight className="w-4 h-4 text-[#fce4a6]/50 group-hover:text-[#fce4a6] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <p className="text-[#fce4a6]/60 text-[10px] uppercase tracking-[0.2em] font-semibold mb-2">All Event Types</p>
              <div className="space-y-0.5 mb-8">
                {eventTypes.filter(e => e.slug !== 'weddings').map((event, i) => (
                  <motion.div key={event.slug} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.03 }}>
                    <Link
                      href={eventSlugToPath(event.slug)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl text-white/70 hover:text-white hover:bg-[#fce4a6]/10 transition-colors group"
                    >
                      <span className="text-sm font-medium flex items-center gap-2"><span>{event.emoji}</span>{event.name}</span>
                      <FiArrowRight className="w-3.5 h-3.5 text-[#fce4a6]/50 group-hover:text-[#fce4a6] group-hover:translate-x-1 transition-all" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-3 rounded-xl text-white/80 hover:text-white hover:bg-[#fce4a6]/10 transition-colors"
                >
                  <span className="text-base font-medium">Contact</span>
                  <FiArrowRight className="w-4 h-4 text-[#fce4a6]/50" />
                </Link>
                <a
                  href="tel:289-301-4039"
                  className="flex items-center gap-3 py-3 px-3 rounded-xl text-[#fce4a6] hover:bg-[#fce4a6]/10 transition-colors"
                >
                  <FiPhone className="w-4 h-4" />
                  <span className="text-base font-medium">289-301-4039</span>
                </a>
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-[#fce4a6] text-black text-center py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#fce4a6]/20"
                >
                  Get a Quote <FiArrowRight className="inline ml-1.5 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
