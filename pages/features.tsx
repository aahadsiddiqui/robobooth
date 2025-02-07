import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

type Package = {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  color: string
}

type Feature = {
  icon: string
  title: string
  description: string
  animation: string
}

// Add carousel images
const carouselImages = [
  { src: '360booth1.jpg', alt: '360 Booth Setup' },
  { src: '360booth2.jpg', alt: '360 Booth in Action' },
  { src: '360booth3.jpg', alt: '360 Booth Event' }
]

export default function Features() {
  const [activeTab, setActiveTab] = useState('robo')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-32 px-4 relative overflow-hidden">
      <Head>
        <title>Features - Robo Booth</title>
        <meta name="description" content="Explore the amazing features of our photo booths" />
      </Head>

      <div className="max-w-6xl mx-auto relative">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20 relative"
        >
          {/* Modern, focused hero background */}
          <div className="absolute inset-0 -z-10">
            {/* Subtle animated rings */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] 
                bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
            />
          </div>

          {/* Floating elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm"
            />
            <motion.div
              animate={{
                y: [10, -10, 10],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-40 right-1/4 w-2 h-2 bg-purple-400 rounded-full blur-sm"
            />
          </div>

          <span className="inline-block text-sm font-semibold text-blue-600 mb-4 bg-blue-100/80 backdrop-blur-sm 
            px-4 py-1 rounded-full shadow-sm">
            Discover Our Features
          </span>
          <h1 className="text-6xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent 
              bg-clip-text animate-gradient bg-300% inline-block">
              Experience the Future
            </span>
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-12">
            Cutting-edge technology meets unforgettable moments
          </p>

          {/* Enhanced Tab Switcher */}
          <div className="flex justify-center gap-4 mb-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('robo')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm ${
                activeTab === 'robo'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Robo Booth
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('360')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm ${
                activeTab === '360'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-600 hover:bg-gray-50'
              }`}
            >
              360° Booth
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Sections with AnimatePresence */}
        <AnimatePresence mode="wait">
          {activeTab === 'robo' ? (
            <motion.div
              key="robo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr"
            >
              {roboFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredFeature(feature.title)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="relative group h-full"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg 
                    border border-transparent hover:border-blue-200 hover:shadow-2xl h-full flex flex-col">
                    <div className="flex items-start gap-6 h-full">
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 
                        p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">{feature.icon}</span>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                          text-transparent bg-clip-text mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          {feature.benefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0.6 }}
                              animate={{ 
                                opacity: hoveredFeature === feature.title ? 1 : 0.6,
                                x: hoveredFeature === feature.title ? 10 : 0
                              }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                              </svg>
                              <span className="text-gray-600">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="360"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr"
            >
              {booth360Features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredFeature(feature.title)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="relative group h-full"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg transition-all duration-300
                    border border-transparent hover:border-purple-200 hover:shadow-2xl h-full flex flex-col">
                    <div className="flex items-start gap-6 h-full">
                      <div className="bg-gradient-to-br from-purple-100 to-pink-100 
                        p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">{feature.icon}</span>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
                          text-transparent bg-clip-text mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{feature.description}</p>
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          {feature.benefits.map((benefit, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0.6 }}
                              animate={{ 
                                opacity: hoveredFeature === feature.title ? 1 : 0.6,
                                x: hoveredFeature === feature.title ? 10 : 0
                              }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center gap-2"
                            >
                              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                              </svg>
                              <span className="text-gray-600">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-12">
            <h3 className="text-3xl font-bold mb-4">Ready to Book Your Experience?</h3>
            <p className="text-xl mb-8 opacity-90">Choose from our range of packages and make your event unforgettable</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="/packages" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
                View Packages
              </a>
              <a href="/contact" className="bg-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-400 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const roboFeatures = [
  {
    icon: '🤖',
    title: 'AI-Powered Interaction',
    description: 'Experience seamless interaction with our advanced AI system that guides and enhances your photo session.',
    benefits: [
      'Voice command recognition',
      'Gesture controls',
      'Smart pose suggestions',
      'Real-time feedback',
      'Automated session flow'
    ]
  },
  {
    icon: '📸',
    title: 'Professional Photography',
    description: 'Capture studio-quality photos with our advanced camera system and lighting setup.',
    benefits: [
      'High-resolution images',
      'Perfect lighting every time',
      'Multiple angle captures',
      'Instant retouching',
      'Professional-grade equipment'
    ]
  },
  {
    icon: '🎨',
    title: 'Customization Options',
    description: 'Make your event unique with our extensive customization features.',
    benefits: [
      'Branded overlays',
      'Custom backgrounds',
      'Personalized messages',
      'Theme integration',
      'Custom prop selection'
    ]
  },
  {
    icon: '🚀',
    title: 'Instant Sharing',
    description: 'Share your memories instantly with our quick sharing features.',
    benefits: [
      'Social media sharing',
      'QR code gallery access',
      'Email delivery',
      'Digital gallery creation',
      'Print station integration'
    ]
  }
]

const booth360Features = [
  {
    icon: '🎥',
    title: 'Cinematic Experience',
    description: 'Create stunning 360-degree videos that capture every angle of your special moment.',
    benefits: [
      'Full 360° coverage',
      'Slow motion effects',
      'Smooth camera movement',
      'High-quality video',
      'Multiple speed options'
    ]
  },
  {
    icon: '🎵',
    title: 'Audio Integration',
    description: 'Add another dimension to your videos with our audio features.',
    benefits: [
      'Custom music selection',
      'Voice recording',
      'Sound effects library',
      'Background music',
      'Audio quality control'
    ]
  },
  {
    icon: '💫',
    title: 'Special Effects',
    description: 'Enhance your videos with our range of special effects and filters.',
    benefits: [
      'Digital overlays',
      'Motion graphics',
      'Color grading',
      'Visual effects',
      'Custom filters'
    ]
  },
  {
    icon: '🎪',
    title: 'Premium Setup',
    description: 'Professional grade equipment and setup for the perfect 360° experience.',
    benefits: [
      'LED platform',
      'Safety features',
      'Professional lighting',
      'Spacious recording',
      'Easy access design'
    ]
  }
]

const packages: Package[] = [
  {
    name: '360° Essential',
    price: '$250',
    description: 'Experience the viral 360° booth trend',
    color: 'blue',
    features: [
      '2 Hours of Service',
      'Unlimited Videos',
      'Slow Motion Effects',
      'Digital Gallery',
      'Social Media Sharing',
      'On-site Attendant',
      'Save $200 Today!'
    ]
  },
  {
    name: '360° Premium',
    price: '$350',
    description: 'The complete 360° experience',
    popular: true,
    color: 'purple',
    features: [
      '3 Hours of Service',
      'Unlimited Videos',
      'Slow Motion Effects',
      'Custom Music Selection',
      'LED Platform',
      'Digital Gallery',
      'Social Media Sharing',
      'Custom Branding',
      'Save $249 Today!'
    ]
  },
  {
    name: 'Photo Booth Essential',
    price: '$899',
    description: 'Perfect for intimate gatherings and small events',
    color: 'blue',
    features: [
      '3 Hours of Service',
      'Unlimited Photos',
      'Basic Props Package',
      'Digital Gallery',
      'Social Media Sharing',
      'On-site Attendant'
    ]
  },
  {
    name: 'Premium',
    price: '$1,299',
    description: 'Our most popular package for medium to large events',
    popular: true,
    color: 'purple',
    features: [
      '5 Hours of Service',
      'Unlimited Photos',
      'Premium Props Package',
      'Digital Gallery',
      'Social Media Sharing',
      'Custom Branding',
      '360° Photo Booth',
      'Guest Book Album'
    ]
  },
  {
    name: 'Ultimate',
    price: '$1,799',
    description: 'The complete experience for luxury events',
    color: 'pink',
    features: [
      '7 Hours of Service',
      'Unlimited Photos',
      'Luxury Props Package',
      'Digital Gallery',
      'Social Media Sharing',
      'Custom Branding',
      '360° Photo Booth',
      'Guest Book Album',
      'Video Messages',
      'Priority Support'
    ]
  }
]

const faqs = [
  {
    question: 'How much space is needed for setup?',
    answer: 'We recommend a minimum area of 10x10 feet for optimal operation, including space for guests to move comfortably.'
  },
  {
    question: 'How long does setup take?',
    answer: 'Our professional team typically requires 1 hour for setup and 30 minutes for takedown.'
  },
  {
    question: 'Is there an attendant present during the event?',
    answer: 'Yes, all packages include a trained booth attendant to assist guests and ensure smooth operation.'
  },
  {
    question: 'Can we customize the photo layout and design?',
    answer: 'Absolutely! We work with you to create custom overlays and designs that match your event theme.'
  },
  {
    question: 'What happens if there are technical issues?',
    answer: 'Our attendants are trained to handle technical issues, and we always have backup equipment available.'
  }
] 