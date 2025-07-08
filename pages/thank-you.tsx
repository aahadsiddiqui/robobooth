import Head from 'next/head'
import { motion } from 'framer-motion'

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Head>
        <title>Thank You - Robo Booth</title>
        <meta name="robots" content="noindex" />
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#fce4a6] rounded-2xl shadow-xl p-10 text-center max-w-lg w-full"
      >
        <h1 className="text-3xl font-bold mb-4 text-black">Thank You!</h1>
        <p className="text-black/80 text-lg mb-4">Your submission has been received. Our team will be in touch soon to help you create an unforgettable event.</p>
        <p className="text-black/60 text-sm">You may now close this page or return to the homepage.</p>
      </motion.div>
    </div>
  )
} 