import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import FadeIn from '../components/animations/FadeIn'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4">
      <Head>
        <title>About Robo Booth - Interactive Photo Experience</title>
        <meta name="description" content="Learn about Robo Booth's innovative features and how it can transform your events" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            About Robo Booth
          </h1>
        </FadeIn>
        
        <section className="mb-12">
          <FadeIn delay={0.2}>
            <h2 className="text-3xl font-bold mb-4">What is Robo Booth?</h2>
            <div className="prose max-w-none text-lg text-gray-700 space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Robo Booth is an innovative fusion of robotics and photography, creating an 
                interactive photo experience unlike any other.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Our AI-powered robot doesn't just 
                take photos - it engages with your guests, suggests poses, and creates memorable 
                moments.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Using cutting-edge artificial intelligence and machine learning, Robo Booth 
                understands natural language, recognizes gestures, and can even crack jokes to 
                help your guests feel comfortable and capture their genuine smiles.
              </motion.p>
            </div>
          </FadeIn>
        </section>

        <section className="mb-12">
          <FadeIn delay={0.3}>
            <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {techFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl"
                >
                  <div className="text-3xl mb-3 transform transition-transform hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <FadeIn delay={0.4}>
            <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {eventTypes.map((event, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-white p-6 rounded-lg text-center shadow-lg hover:shadow-xl transition-all"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl mb-3"
                  >
                    {event.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-700">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section>
          <FadeIn delay={0.5}>
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start group"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="text-blue-600 mr-3 transform transition-transform group-hover:rotate-12"
                    >
                      ✓
                    </motion.span>
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>
      </div>
    </div>
  )
}

const techFeatures = [
  {
    icon: '🤖',
    title: 'Advanced AI',
    description: 'State-of-the-art artificial intelligence for natural interactions and pose guidance'
  },
  {
    icon: '🎥',
    title: 'Pro Camera System',
    description: 'High-end DSLR cameras with professional lighting setup for studio-quality photos'
  },
  {
    icon: '🔊',
    title: 'Voice Recognition',
    description: 'Natural language processing for seamless voice-controlled operation'
  },
  {
    icon: '📱',
    title: 'Instant Sharing',
    description: 'Immediate digital delivery with social media integration'
  }
]

const features = [
  {
    title: 'Voice Interaction',
    description: 'Natural conversation with our AI for a fun and engaging experience'
  },
  {
    title: 'Gesture Recognition',
    description: 'Smart pose detection and real-time guidance for perfect shots'
  },
  {
    title: 'Instant Sharing',
    description: 'Share photos instantly to social media or email with custom branding'
  },
  {
    title: 'Custom Branding',
    description: 'Personalize the experience with your event theme and branding'
  }
]

const eventTypes = [
  {
    icon: '👰',
    title: 'Weddings',
    description: 'Create unforgettable memories with your guests'
  },
  {
    icon: '🏢',
    title: 'Corporate',
    description: 'Engage attendees at your business events'
  },
  {
    icon: '🎉',
    title: 'Parties',
    description: 'Add excitement to any celebration'
  }
]

const benefits = [
  'Unique and memorable experience for your guests',
  'Professional-grade photos with perfect lighting',
  'Instant social media sharing capabilities',
  'Customizable branding and themes',
  'Friendly and engaging AI personality',
  'Full event support and technical assistance',
  'High-capacity photo storage and backup',
  'Digital gallery for post-event sharing'
] 