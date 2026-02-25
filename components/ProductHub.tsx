import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiEye } from 'react-icons/fi'
import { ProductData } from '../data/products'

type ProductHubProps = {
  title: string
  subtitle: string
  products: ProductData[]
  hideHeader?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
}

function getProductLink(product: ProductData) {
  return product.linkOverride || `/products/${product.slug}`
}

export default function ProductHub({ title, subtitle, products, hideHeader }: ProductHubProps) {
  return (
    <section className={`${hideHeader ? 'pb-8' : 'pt-24 pb-8'} bg-black text-white`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col">
        {!hideHeader && (
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#fce4a6] mb-2">Product Hub</div>
              <h1 className="text-3xl md:text-5xl font-black mb-2">{title}</h1>
              <p className="text-white/70 max-w-2xl">{subtitle}</p>
            </div>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#fce4a6] text-black px-5 py-3 rounded-full font-bold shadow-lg hover:shadow-xl"
            >
              Reserve Yours
              <FiArrowRight />
            </motion.a>
          </div>
        )}

        {/* ── Desktop Grid: 3 columns, 2 rows, tall cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="hidden md:grid gap-4 grid-cols-3"
        >
          {products.map((product) => (
            <motion.div
              key={product.slug}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-xl h-[420px] lg:h-[500px] xl:h-[550px] flex flex-col"
            >
              <Link href={getProductLink(product)} className="absolute inset-0 z-20" aria-label={`View ${product.name}`} />
              {/* Image area — takes up all available space */}
              <div className="relative flex-1 overflow-hidden">
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Solid black info bar at the bottom */}
              <div className="relative z-10 bg-black px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm lg:text-base font-bold text-white leading-tight">{product.name}</h3>
                  <span className="flex-shrink-0 text-xs text-[#fce4a6] flex items-center gap-1 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Learn More <FiArrowRight className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-white/40 text-[11px] mt-1 leading-snug">{product.tagline}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Mobile Grid: 2 columns, proper fit ── */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {products.map((product) => (
            <Link
              key={product.slug}
              href={getProductLink(product)}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-xl flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="bg-black px-3 py-3">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-xs font-bold text-white leading-tight">{product.name}</h3>
                  <span className="flex-shrink-0 text-[10px] text-[#fce4a6] flex items-center gap-0.5 mt-0.5 whitespace-nowrap">
                    <FiArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
                <p className="text-white/40 text-[10px] mt-1 leading-snug line-clamp-2">{product.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
