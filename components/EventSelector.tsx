'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiCheck, FiArrowRight } from 'react-icons/fi'
import {
  EventType,
  eventOptions,
  packagesByEvent,
} from '@/data/packages'

export default function EventSelector() {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const packages = selectedEvent ? packagesByEvent[selectedEvent] : []
  const selectedLabel = eventOptions.find((o) => o.value === selectedEvent)

  const handleSelect = (value: EventType) => {
    setSelectedEvent(value)
    setDropdownOpen(false)
  }

  return (
    <section className="relative py-16 md:py-24 px-4 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gold/60 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-3"
        >
          Find Your Perfect Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight"
        >
          I&apos;m planning a<span className="text-gold">...</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          ref={dropdownRef}
          className="relative inline-block w-full max-w-md mx-auto"
        >
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between backdrop-blur-lg bg-black/40 border border-white/10 hover:border-gold/40 text-white px-5 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-500 ease-in-out group"
          >
            <span className={selectedLabel ? 'text-white' : 'text-white/50'}>
              {selectedLabel ? (
                <span className="flex items-center gap-2 justify-center">
                  <span>{selectedLabel.emoji}</span>
                  {selectedLabel.label}
                </span>
              ) : (
                'Select your event type'
              )}
            </span>
            <FiChevronDown
              className={`w-5 h-5 text-gold transition-transform duration-500 ease-in-out ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-black/80 border border-white/10 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50"
              >
                <div className="py-2">
                  {eventOptions.map((option, i) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleSelect(option.value)}
                      className={`w-full flex items-center justify-between px-5 py-3.5 text-left transition-all duration-500 ease-in-out group ${
                        selectedEvent === option.value
                          ? 'bg-gold/10 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{option.emoji}</span>
                        <span className="font-bold text-sm md:text-base">{option.label}</span>
                      </div>
                      {selectedEvent === option.value && (
                        <FiCheck className="w-4 h-4 text-gold" />
                      )}
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
          transition={{ delay: 0.2 }}
          className="text-white/30 text-xs mt-4"
        >
          Select your event type to see the perfect package for your celebration
        </motion.p>

        <AnimatePresence mode="wait">
          {selectedEvent && (
            <motion.div
              key={selectedEvent}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="mt-12 md:mt-16 text-left"
            >
              <h3 className="text-center text-lg md:text-xl font-bold text-white/80 mb-6">
                Recommended for your{' '}
                <span className="text-gold">{selectedLabel?.label}</span>
              </h3>

              <div className="grid gap-4 md:grid-cols-3">
                {packages.map((pkg, i) => (
                  <motion.article
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={`group relative rounded-2xl backdrop-blur-lg bg-black/40 border p-6 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:border-gold/30 ${
                      pkg.featured
                        ? 'border-gold/30 shadow-lg shadow-gold/5'
                        : 'border-white/10'
                    }`}
                  >
                    {pkg.featured && (
                      <span className="absolute -top-3 left-6 bg-gold text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}

                    <p className="text-gold/80 text-xs font-semibold uppercase tracking-wider mb-1">
                      {pkg.tagline}
                    </p>
                    <h4 className="text-white font-bold text-lg mb-2">{pkg.name}</h4>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">
                      {pkg.description}
                    </p>

                    <ul className="space-y-2 mb-5">
                      {pkg.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-white/70 text-sm"
                        >
                          <FiCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-gold font-bold text-sm">{pkg.priceLabel}</span>
                      <a
                        href="/contact"
                        className="flex items-center gap-1 text-white/50 hover:text-gold text-xs font-semibold transition-all duration-500 ease-in-out group-hover:gap-2"
                      >
                        Get Quote <FiArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
