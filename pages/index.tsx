import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

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

  useEffect(() => {
    // Show welcome message only
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true)
    }, 1000)

    return () => clearTimeout(welcomeTimer)
  }, [])

  return (
    <div className="min-h-screen">
      <Head>
        <title>Robo Booth - Interactive Photo Experience</title>
        <meta name="description" content="Experience the future of photo booths with Robo Booth - an interactive robotic photo experience for your events" />
      </Head>

      {/* Enhanced Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 0.8, 0.3],
                y: ['0vh', '100vh']
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [180, 0, 180],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Welcome Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
          className={`
            absolute top-[5%] md:top-[8%]
            px-6 py-2 
            text-sm md:text-base
            bg-white/10 backdrop-blur-md
            rounded-full border border-white/20
            text-white font-medium
            transform -translate-y-0
            max-w-[90%] md:max-w-fit
            whitespace-nowrap
            z-20
            cursor-pointer
            hover:border-white/40
            hover:shadow-lg hover:shadow-white/10
            transition-all duration-300
            overflow-hidden
            group
          `}
          onClick={() => {
            // Add a fun confetti effect when clicked
            const colors = ['#FF69B4', '#4169E1', '#9400D3', '#00CED1'];
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.1 },
              colors: colors,
            });
          }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"
            animate={{
              x: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Welcome text with wave animation */}
          <div className="flex items-center gap-2">
            Welcome to Robo Booth!
            <motion.span
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              👋
            </motion.span>
          </div>

          {/* Sparkle effects */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial="hidden"
            animate="visible"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.4,
                  repeatDelay: 2
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="relative text-center text-white px-4 z-10 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Animated Robot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1
              }}
              className="text-7xl md:text-8xl mb-6"
            >
              <motion.span
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="inline-block"
              >
                🤖
              </motion.span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Meet Robo Booth
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-3xl text-white/90"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The Future of Event Photography
            </motion.p>
            
            {/* CTAs */}
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4"
              >
                <Link href="/contact" 
                  className="group relative inline-flex items-center px-12 py-4 overflow-hidden rounded-full bg-white font-bold text-lg transition-all duration-300"
                >
                  <span className="absolute left-0 w-full h-0 transition-all bg-gradient-to-r from-blue-600 to-purple-600 opacity-100 group-hover:h-full group-hover:top-0 duration-400 ease"></span>
                  <span className="relative text-blue-600 group-hover:text-white transition-colors duration-300 flex items-center">
                    Book Now
                    <motion.span
                      className="ml-2 text-xl"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </Link>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center"
              >
                <span className="text-sm text-white/70 mb-2">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg 
                    className="w-6 h-6 text-white/70" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-3 gap-4 text-white text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                >
                  <div className="text-2xl md:text-4xl font-bold drop-shadow-lg">{stat.value}</div>
                  <div className="text-sm md:text-base text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-blue-200 -z-10"></div>
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
            <h2 className="text-4xl font-bold mb-4">Why Choose Robo Booth?</h2>
            <p className="text-gray-600 text-lg">
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
                className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg"
              >
                <motion.div
                  className="text-4xl mb-4 text-blue-600"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Interactive CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'linear-gradient(to right, #3b82f6, #8b5cf6)',
                  'linear-gradient(to right, #8b5cf6, #ec4899)',
                  'linear-gradient(to right, #ec4899, #3b82f6)'
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-6 md:mb-0 md:mr-8">
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
                  className="text-white/90"
                >
                  Book now and get a free 360° Photo Booth add-on worth $599!
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
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all group"
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
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.event}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: '🤖',
    title: 'Interactive AI',
    description: 'Engage with our smart robot that responds to voice commands and gestures, creating a unique and memorable experience'
  },
  {
    icon: '📸',
    title: 'Pro Quality Photos',
    description: 'Studio-grade camera system with perfect lighting and advanced image processing for stunning results'
  },
  {
    icon: '🎯',
    title: 'Custom Poses',
    description: 'AI-powered pose suggestions and real-time guidance to capture your best angles'
  }
]

const steps = [
  {
    title: 'Book Robo Booth',
    description: 'Choose your event date and package'
  },
  {
    title: 'Setup',
    description: 'We handle all the technical setup'
  },
  {
    title: 'Interact',
    description: 'Guests enjoy the AI-powered experience'
  },
  {
    title: 'Share',
    description: 'Instantly share your photos'
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    event: 'Wedding Celebration',
    quote: 'Robo Booth was the highlight of our wedding! Our guests couldn\'t stop talking about it.'
  },
  {
    name: 'Mike Chen',
    event: 'Corporate Event',
    quote: 'The AI interaction made our company event truly memorable. Highly recommended!'
  },
  {
    name: 'Emma Davis',
    event: 'Birthday Party',
    quote: 'Such a fun and unique experience! The photo quality is amazing.'
  }
]

const stats = [
  { value: '20+', label: 'Events Covered' },
  { value: '1K+', label: 'Photos & VideosTaken' },
  { value: '99%', label: 'Happy Clients' }
]

const whyChooseUs = [
  {
    icon: '🎯',
    title: 'Perfect Every Time',
    description: 'AI-powered positioning and lighting ensures every shot is Instagram-worthy'
  },
  {
    icon: '🎮',
    title: 'Interactive Experience',
    description: 'Voice-controlled operation and gesture recognition for seamless interaction'
  },
  {
    icon: '🚀',
    title: 'Instant Delivery',
    description: 'Share your photos instantly to social media or get them printed on the spot'
  }
] 