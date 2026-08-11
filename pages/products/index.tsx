import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiPhone } from 'react-icons/fi'
import ProductHub from '../../components/ProductHub'
import { products } from '../../data/products'

export default function ProductsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Head>
        <title>Robo Booth Products | Full Lineup</title>
        <meta name="description" content="Browse the full Robo Booth product lineup: 360 Booth, Robo Booth, Aerial Booth, and iPad Booth." />
        <link rel="canonical" href="https://robobooth.ca/products" />
      </Head>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/1.png" alt="Robo Booth logo" className="h-16 w-auto md:h-20" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {products.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="hover:text-white">
                {product.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:289-301-4039" className="hidden md:flex items-center gap-2 text-white/80 text-sm">
              <FiPhone className="w-4 h-4" />
              289-301-4039
            </a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="/contact"
              className="bg-[#fce4a6] text-black px-4 py-2 rounded-full font-semibold text-sm"
            >
              Reserve Yours
            </motion.a>
          </div>
        </div>
      </nav>

      <ProductHub
        title="Full Robo Booth Lineup"
        subtitle="Compare every flagship product instantly, then click through for the details."
        products={products}
      />
    </div>
  )
}

