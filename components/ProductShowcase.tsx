'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { hardwareFleet } from '@/data/hardware'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function ProductShowcase() {
  return (
    <section className="py-16 md:py-24 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-gold/60 text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Our Hardware Fleet
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Premium <span className="text-gold">Experiences</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto">
            Industry-leading photobooth technology — from interactive robots to cinematic 360 setups
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-2"
        >
          {hardwareFleet.map((item) => (
            <motion.article
              key={item.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl backdrop-blur-lg bg-black/40 border border-white/10 transition-all duration-500 ease-in-out hover:scale-[1.02] hover:border-gold/20 hover:shadow-xl hover:shadow-gold/5"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />

              {item.badge && (
                <span className="absolute top-4 left-4 z-20 bg-gold/90 text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {item.badge}
                </span>
              )}

              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-all duration-500 ease-in-out z-[5]" />
              </div>

              <div className="relative z-20 p-6 md:p-8 -mt-16">
                <p className="text-gold/70 text-xs font-semibold uppercase tracking-wider mb-1">
                  {item.tagline}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  {item.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.pricingNote && (
                  <p className="text-gold/60 text-xs italic mb-4 border-l-2 border-gold/30 pl-3">
                    {item.pricingNote}
                  </p>
                )}

                <ul className="flex flex-wrap gap-2 mb-6">
                  {item.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-[11px] text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 text-gold font-semibold text-sm transition-all duration-500 ease-in-out group-hover:gap-3"
                >
                  Learn More
                  <FiArrowRight className="w-4 h-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
