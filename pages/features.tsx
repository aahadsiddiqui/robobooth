import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'

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

export default function Features() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <Head>
        <title>Features & Packages - Robo Booth</title>
        <meta name="description" content="Explore our innovative features and flexible packages for your next event" />
      </Head>

      {/* Interactive Features Section */}
      <div className="max-w-6xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Interactive Features
          </h1>
          <p className="text-gray-600 text-lg">
            Experience the future of event photography with our cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Packages Section */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Package</h2>
          <p className="text-gray-600 text-lg">
            Flexible options for every event type and budget
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <motion.div
                whileHover={{ y: -10 }}
                className={`bg-white p-8 rounded-xl shadow-lg h-full flex flex-col ${
                  pkg.popular ? 'border-2 border-blue-500' : ''
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  <span className="text-gray-600">/event</span>
                </div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <motion.span
                        className="text-green-500 mr-2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        ✓
                      </motion.span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className={`block text-center py-3 px-6 rounded-lg text-white font-semibold transition-colors ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    Book Now
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8"
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <details className="group">
                <summary className="flex justify-between items-center p-6 cursor-pointer">
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  <span className="transform group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const features: Feature[] = [
  {
    icon: '🤖',
    title: 'AI-Powered Interaction',
    description: 'Natural voice commands and gesture recognition for an intuitive experience',
    animation: 'spin'
  },
  {
    icon: '🎭',
    title: 'Smart Pose Guidance',
    description: 'Real-time suggestions and positioning help for perfect shots',
    animation: 'bounce'
  },
  {
    icon: '✨',
    title: 'Premium Effects',
    description: 'Professional lighting and real-time filters for stunning results',
    animation: 'pulse'
  },
  {
    icon: '🎨',
    title: 'Custom Branding',
    description: 'Personalized overlays and designs matching your event theme',
    animation: 'float'
  },
  {
    icon: '📱',
    title: 'Instant Sharing',
    description: 'Direct to social media or email with custom hashtags',
    animation: 'slide'
  },
  {
    icon: '🎪',
    title: '360° Experience',
    description: 'Immersive photo capture from every angle',
    animation: 'rotate'
  }
]

const packages: Package[] = [
  {
    name: 'Essential',
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