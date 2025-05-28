import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { ImageTrailHero } from '../components/ImageTrailHero'
import ScrollingTestimonials from '../components/ScrollingTestimonials'
import CornerNav from '../components/CornerNav'

type LeadFormData = {
  name: string
  phone: string
  eventType: string
}

export default function Home() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  const [showWelcome, setShowWelcome] = useState(false)
  const [navActive, setNavActive] = useState(false)

  useEffect(() => {
    // Show welcome message only
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true)
    }, 1000)

    return () => clearTimeout(welcomeTimer)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Head>
        <title>Robo Booth - Interactive Photo Experience</title>
        <meta name="description" content="Experience the future of photo booths with Robo Booth - an interactive robotic photo experience for your events" />
      </Head>
      <CornerNav active={navActive} setActive={setNavActive} />

      {/* Hero Section */}
      <ImageTrailHero overlayActive={navActive} />

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-black">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-black shadow-lg hover:shadow-xl transition-all border border-[#fce4a6]/20">
                <div className="text-4xl mb-4 text-[#fce4a6]">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#fce4a6]">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#fce4a6]">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#fce4a6] text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#fce4a6]">{step.title}</h3>
                  <p className="text-white/80">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-[#fce4a6]/20 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive "Why Choose Us" Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-black">Why Choose Robo Booth?</h2>
            <p className="text-black/80 text-lg">
              Experience the perfect blend of technology and entertainment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-black to-black p-6 rounded-xl shadow-lg border border-[#fce4a6]/20"
              >
                <motion.div
                  className="text-4xl mb-4 text-[#fce4a6]"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-[#fce4a6]">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Interactive CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-[#fce4a6] to-[#a49056] rounded-2xl p-8 md:p-12 overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(to right, #fce4a6, #a49056)',
                  'linear-gradient(to right, #a49056, #fce4a6)',
                  'linear-gradient(to right, #fce4a6, #a49056)'
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="text-black mb-6 md:mb-0 md:mr-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-2"
                >
                  Ready to Transform Your Event?
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-black/90"
                >
                  Book now for 15% off your first event!
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-black text-[#fce4a6] rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all group"
                >
                  Get Started
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <ScrollingTestimonials />
    </div>
  )
}

const features = [
  {
    icon: '🤖',
    title: 'Robotic Automation',
    description: 'Our DSLR robot photobooth drives around your event, creating a fun and interactive experience for guests.'
  },
  {
    icon: '📸',
    title: 'Pro Quality Photos',
    description: 'Studio-grade DSLR camera system with perfect lighting and advanced image processing for stunning results.'
  },
  {
    icon: '🎯',
    title: 'Custom Poses',
    description: 'Robotic movement and positioning help capture your best angles and candid moments.'
  }
]

const steps = [
  {
    title: 'Book Robo Booth',
    description: 'We learn about your event and tailor it to offer a product specific to your event type.'
  },
  {
    title: 'Setup',
    description: 'We handle all the technical setup'
  },
  {
    title: 'Interact',
    description: 'Guests interact with the roaming robot photobooth for a fun and memorable experience.'
  },
  {
    title: 'Share',
    description: 'Guests receive physical prints or instantly share their photos via SMS, E-Mail, QR Code, or Airdrop.'
  }
]

const whyChooseUs = [
  {
    icon: '🎯',
    title: 'Perfect Every Time',
    description: 'Robotic positioning and lighting ensures every shot is Instagram-worthy.'
  },
  {
    icon: '🎮',
    title: 'Interactive Experience',
    description: 'The robot drives around, engaging guests and making every event memorable.'
  },
  {
    icon: '🚀',
    title: 'Instant Delivery',
    description: 'Print photos on the spot or share instantly via SMS, E-Mail, QR Code, or Airdrop.'
  }
] 