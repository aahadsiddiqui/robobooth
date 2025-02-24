import React, { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-32 px-4 relative overflow-hidden">
      <Head>
        <title>Packages - Robo Booth</title>
        <meta name="description" content="Choose from our range of photo booth packages for your next event" />
      </Head>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/2 left-1/3 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 relative"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Choose Your Experience
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-8">
            Select the perfect package for your event
          </p>
          
          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => document.getElementById('360-booth')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              360° Photo Booth →
            </button>
            <button
              onClick={() => document.getElementById('robo-booth')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              Robo Photo Booth →
            </button>
          </div>
        </motion.div>

        {/* Info Banner - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 mb-16 text-center relative overflow-hidden border border-white/20"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50"></div>
          <h2 className="text-xl font-semibold mb-2 relative">✨ Limited Time Offer</h2>
          <p className="text-gray-600 relative">
            Book now and get <span className="font-bold text-blue-600">$200 off</span> on any package!
            Plus, free delivery within the GTA.
          </p>
        </motion.div>

        {/* Move 360° Booth Section to be first */}
        <section id="360-booth" className="mb-32 scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">360° Photo Booth Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create stunning 360° videos that capture every moment from all angles.
              Perfect for making viral-worthy content for your special event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 360° Essential */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
            >
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold mb-2">360° Essential</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">$250</span>
                  <span className="text-gray-500">/event</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 line-through">$450</span>
                  <span className="text-green-500 font-semibold">Save $200!</span>
                </div>
                <p className="text-gray-600 mb-8">
                  Experience the viral 360° booth trend
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    '2 Hours of Service',
                    'Unlimited Videos',
                    'Slow Motion Effects',
                    'Digital Gallery',
                    'Social Media Sharing',
                    'On-site Attendant'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0">
                <Link 
                  href="/contact"
                  className="block w-full py-3 px-6 text-center text-white font-semibold bg-gray-900 rounded-xl 
                    hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform transition-all duration-200"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>

            {/* 360° Premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-b-xl">
                  Best Value
                </div>
              </div>
              <div className="p-8 pt-16 flex-grow">
                <h3 className="text-2xl font-bold mb-2">360° Premium</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">$350</span>
                  <span className="text-gray-500">/event</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 line-through">$599</span>
                  <span className="text-green-500 font-semibold">Save $249!</span>
                </div>
                <p className="text-gray-600 mb-8">
                  The complete 360° experience
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    '3 Hours of Service',
                    'Unlimited Videos',
                    'Slow Motion Effects',
                    'Custom Music Selection',
                    'LED Platform',
                    'Digital Gallery',
                    'Social Media Sharing',
                    'Custom Branding'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0">
                <Link 
                  href="/contact"
                  className="block w-full py-3 px-6 text-center text-white font-semibold 
                    bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl 
                    hover:opacity-90 hover:scale-105 hover:shadow-lg transform transition-all duration-200"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>

            {/* 360° Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
            >
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold mb-2">360° Pro</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">$450</span>
                  <span className="text-gray-500">/event</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 line-through">$749</span>
                  <span className="text-green-500 font-semibold">Save $299!</span>
                </div>
                <p className="text-gray-600 mb-8">
                  Perfect for larger events
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    '4 Hours of Service',
                    'Unlimited Videos',
                    'Slow Motion Effects',
                    'Custom Music Selection',
                    'LED Platform',
                    'Digital Gallery',
                    'Social Media Sharing',
                    'Custom Branding',
                    'Premium Location Setup'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0">
                <Link 
                  href="/contact"
                  className="block w-full py-3 px-6 text-center text-white font-semibold bg-gray-900 rounded-xl 
                    hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform transition-all duration-200"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Move Robo Booth section to be second */}
        <section id="robo-booth" className="scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Robo Photo Booth Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the future of photo booths with our AI-powered Robo Booth. 
              Perfect for any event, from intimate gatherings to large celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Essential Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
            >
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold mb-2">Photo Booth Essential</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">$899</span>
                  <span className="text-gray-500">/event</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 line-through">$1,299</span>
                  <span className="text-green-500 font-semibold">Save $400!</span>
                </div>
                <p className="text-gray-600 mb-8">
                  Perfect for intimate gatherings and small events
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    '3 Hours of Service',
                    'Unlimited Photos',
                    'Basic Props Package',
                    'Digital Gallery',
                    'Social Media Sharing',
                    'On-site Attendant'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0">
                <Link 
                  href="/contact"
                  className="block w-full py-3 px-6 text-center text-white font-semibold bg-gray-900 rounded-xl 
                    hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform transition-all duration-200"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>

            {/* Premium Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-b-xl">
                  Most Popular
                </div>
              </div>
              <div className="p-8 pt-16 flex-grow">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">$1,299</span>
                  <span className="text-gray-500">/event</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 line-through">$1,799</span>
                  <span className="text-green-500 font-semibold">Save $500!</span>
                </div>
                <p className="text-gray-600 mb-8">
                  Our most popular package for medium to large events
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    '5 Hours of Service',
                    'Unlimited Photos',
                    'Premium Props Package',
                    'Digital Gallery',
                    'Social Media Sharing',
                    'Custom Branding',
                    '360° Photo Booth',
                    'Guest Book Album'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0">
                <Link 
                  href="/contact"
                  className="block w-full py-3 px-6 text-center text-white font-semibold 
                    bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl 
                    hover:opacity-90 hover:scale-105 hover:shadow-lg transform transition-all duration-200"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>

            {/* Ultimate Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
            >
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold mb-2">Ultimate</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">$1,799</span>
                  <span className="text-gray-500">/event</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400 line-through">$2,499</span>
                  <span className="text-green-500 font-semibold">Save $700!</span>
                </div>
                <p className="text-gray-600 mb-8">
                  The complete experience for luxury events
                </p>
                <ul className="space-y-4 mb-8">
                  {[
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
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 pt-0">
                <Link 
                  href="/contact"
                  className="block w-full py-3 px-6 text-center text-white font-semibold bg-gray-900 rounded-xl 
                    hover:bg-gray-800 hover:scale-105 hover:shadow-lg transform transition-all duration-200"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <h4 className="text-lg font-semibold">{faq.question}</h4>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0,
                      marginBottom: openFaq === index ? 16 : 0
                    }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

const roboPricing = [
  {
    name: 'Essential',
    price: '$899',
    regularPrice: '$1,299',
    features: [
      '3 Hours of Service',
      'Unlimited Photos',
      'Basic Props Package',
      'Digital Gallery'
    ]
  },
  {
    name: 'Premium',
    price: '$1,299',
    regularPrice: '$1,799',
    features: [
      '5 Hours of Service',
      'Unlimited Photos',
      'Premium Props Package',
      'Digital Gallery',
      'Custom Branding',
      'Video Messages'
    ]
  },
  {
    name: 'Ultimate',
    price: '$1,799',
    regularPrice: '$2,499',
    features: [
      '7 Hours of Service',
      'Unlimited Photos',
      'Luxury Props Package',
      'Digital Gallery',
      'Custom Branding',
      'Video Messages',
      'Premium Location Setup'
    ]
  }
]

const booth360Pricing = [
  {
    name: '360° Essential',
    price: '$250',
    regularPrice: '$450',
    description: 'Experience the viral 360° booth trend',
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
    regularPrice: '$599',
    description: 'The complete 360° experience',
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
    name: '360° Pro',
    price: '$450',
    regularPrice: '$749',
    description: 'Perfect for larger events',
    features: [
      '4 Hours of Service',
      'Unlimited Videos',
      'Slow Motion Effects',
      'Custom Music Selection',
      'LED Platform',
      'Digital Gallery',
      'Social Media Sharing',
      'Custom Branding',
      'Premium Location Setup',
      'Save $299 Today!'
    ]
  }
]

const faqs = [
  {
    question: "What's included in the props package?",
    answer: "Our props packages include a variety of high-quality, event-appropriate items. Basic props include classic photo booth props, while Premium and Luxury packages include themed props, custom signs, and premium accessories tailored to your event."
  },
  {
    question: "How much space is needed for setup?",
    answer: "For the Robo Booth, we recommend a 10x10 ft area. The 360° booth requires a 12x12 ft space for optimal performance, including the platform and guest movement area."
  },
  {
    question: "How long does it take to set up?",
    answer: "Setup typically takes 1-1.5 hours before your event. We arrive early to ensure everything is perfectly arranged and tested before your guests arrive."
  },
  {
    question: "Can we get both digital and printed photos?",
    answer: "Yes! All packages include instant digital access to your photos/videos. Printed photos are available with our Robo Booth packages, and you can add unlimited prints to any package."
  },
  {
    question: "How do guests receive their photos/videos?",
    answer: "Guests can instantly access their content through QR codes, email, or SMS. All content is also uploaded to a private online gallery for easy sharing and downloading."
  },
  {
    question: "Do you provide an attendant?",
    answer: "Yes, all packages include a professional booth attendant who will guide your guests, ensure proper operation, and help create the best possible experience."
  },
  {
    question: "Can we customize the backdrop and overlays?",
    answer: "Absolutely! We offer custom backdrop options and can create branded overlays that match your event theme or corporate identity."
  }
] 