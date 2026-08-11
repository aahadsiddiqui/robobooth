'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUsers } from 'react-icons/fi'
import { getRobotRecommendationCopy } from '@/lib/robotRecommendation'

type RobotGuestRecommenderProps = {
  onGetQuote?: () => void
}

export default function RobotGuestRecommender({ onGetQuote }: RobotGuestRecommenderProps) {
  const [guestInput, setGuestInput] = useState('')

  const guestCount = parseInt(guestInput.replace(/\D/g, ''), 10)
  const recommendation =
    guestInput && !Number.isNaN(guestCount) && guestCount > 0
      ? getRobotRecommendationCopy(guestCount)
      : null

  const handleChange = (value: string) => {
    setGuestInput(value.replace(/\D/g, ''))
  }

  return (
    <section className="py-10 md:py-14 px-4 border-t border-white/5 bg-black">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#fce4a6]/60 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-3"
        >
          Right-Size Your Experience
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-8 leading-tight"
        >
          How many guests are you expecting<span className="text-[#fce4a6]">?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative inline-block w-full max-w-md mx-auto"
        >
          <div className="relative">
            <FiUsers className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#fce4a6]/60 pointer-events-none" />
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={guestInput}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Enter number of guests"
              className="w-full pl-14 pr-5 py-4 md:py-5 bg-white/[0.06] border-2 border-[#fce4a6]/40 hover:border-[#fce4a6]/80 focus:border-[#fce4a6] text-white rounded-2xl font-bold text-base md:text-lg transition-all outline-none placeholder:text-white/40 text-center"
              aria-label="Number of guests"
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/30 text-xs mt-4"
        >
          We&apos;ll recommend the ideal number of robot photobooths for your event size
        </motion.p>

        <AnimatePresence mode="wait">
          {recommendation && (
            <motion.div
              key={recommendation.count}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mt-8 md:mt-10"
            >
              <div className="rounded-2xl border border-[#fce4a6]/30 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8">
                <p className="text-[#fce4a6] text-4xl md:text-5xl font-black mb-2">
                  {recommendation.count}
                </p>
                <p className="text-white text-lg md:text-xl font-bold mb-3">
                  {recommendation.headline}
                </p>
                <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                  {recommendation.description}
                </p>

                {onGetQuote && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onGetQuote}
                    className="mt-6 bg-[#fce4a6] text-black px-6 py-3 rounded-full font-bold text-sm shadow-md shadow-[#fce4a6]/20 hover:shadow-lg transition-all"
                  >
                    Get a Quote for {recommendation.count} Robot{recommendation.count > 1 ? 's' : ''}
                  </motion.button>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                {[
                  { range: 'Up to 150 guests', robots: '1 robot' },
                  { range: '151–300 guests', robots: '2 robots' },
                  { range: '301+ guests', robots: '3 robots' },
                ].map((tier) => (
                  <div
                    key={tier.range}
                    className={`rounded-xl border px-4 py-3 text-xs transition-all ${
                      (recommendation.count === 1 && tier.robots === '1 robot') ||
                      (recommendation.count === 2 && tier.robots === '2 robots') ||
                      (recommendation.count === 3 && tier.robots === '3 robots')
                        ? 'border-[#fce4a6]/40 bg-[#fce4a6]/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-white/40'
                    }`}
                  >
                    <p className="font-bold text-white/80">{tier.range}</p>
                    <p className="mt-0.5">{tier.robots}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
