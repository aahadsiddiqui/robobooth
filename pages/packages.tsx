import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import CornerNav from '../components/CornerNav'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function Packages() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [active, setActive] = useState(false)
  const [activeRoboImage, setActiveRoboImage] = useState(0)
  const [active360Image, setActive360Image] = useState(0)
  const roboControls = useAnimation()
  const booth360Controls = useAnimation()

  useEffect(() => {
    const original = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#000';
    return () => {
      document.body.style.backgroundColor = original;
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const roboImages = ['IMG_0955.JPEG', 'IMG_1019.JPG']
  const booth360Images = ['IMG_1167.jpg', 'IMG_1170.jpg', 'IMG_1188.jpg']

  const handleImageChange = (direction: 'prev' | 'next', type: 'robo' | '360') => {
    const images = type === 'robo' ? roboImages : booth360Images
    const currentIndex = type === 'robo' ? activeRoboImage : active360Image
    const setActiveImage = type === 'robo' ? setActiveRoboImage : setActive360Image
    const controls = type === 'robo' ? roboControls : booth360Controls

    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length

    setActiveImage(newIndex)
    controls.start({ opacity: 0, x: direction === 'next' ? 100 : -100 })
    setTimeout(() => {
      controls.start({ opacity: 1, x: 0 })
    }, 50)
  }

  const handleSwipe = (direction: 'left' | 'right', type: 'robo' | '360') => {
    handleImageChange(direction === 'left' ? 'next' : 'prev', type)
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Head>
        <title>Packages - Robo Booth</title>
        <meta name="description" content="Experience Canada's First Robot Photo Booth and 360° Photo Booth - Choose your perfect experience" />
      </Head>

      <CornerNav active={active} setActive={setActive} />

      <div className="mx-auto px-4 pt-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#fce4a6]">
            Choose Your Experience
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Experience Canada's First Robot Photo Booth and 360° Photo Booth
          </p>
        </motion.div>

        {/* Robo Booth Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#fce4a6]">Robo Booth Experience</h2>
            <p className="text-white/80 text-lg">
              The complete robot photo booth experience for your event
            </p>
          </div>

          {/* Image Carousel */}
          <div className="relative aspect-[4/3] mb-12 rounded-3xl overflow-hidden group">
            <motion.div 
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (Math.abs(info.offset.x) > 50) {
                  handleSwipe(info.offset.x > 0 ? 'right' : 'left', 'robo')
                }
              }}
            >
              {roboImages.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0 }}
                  animate={activeRoboImage === index ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/images/${image}`}
                    alt="Robo Booth"
                    fill
                    className="object-contain bg-black"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={() => handleImageChange('prev', 'robo')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleImageChange('next', 'robo')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
            >
              <FiChevronRight size={24} />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {roboImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveRoboImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeRoboImage === index ? 'bg-[#fce4a6]' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#fce4a6]/20">
            <h3 className="text-2xl font-semibold text-[#fce4a6] mb-6">What's Included</h3>
            <ul className="grid md:grid-cols-2 gap-6">
              {[
                'Roaming DSLR Robot Photobooth',
                'Professional Studio Lighting',
                'Instant Photo Prints',
                'Digital Gallery Access',
                'SMS & Email Sharing',
                'QR Code Downloads',
                'AirDrop Support',
                'Custom Branding Options',
                'Professional Attendant',
                'Setup & Teardown'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <svg className="w-5 h-5 text-[#fce4a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#fce4a6] text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#fce4a6]/90 transition-colors"
                >
                  Book Robo Booth
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 360° Photo Booth Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto mb-32"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#fce4a6]">360° Photo Booth Experience</h2>
            <p className="text-white/80 text-lg">
              Create stunning 360° videos that capture every moment from all angles
            </p>
          </div>

          {/* Image Carousel */}
          <div className="relative aspect-[4/3] mb-12 rounded-3xl overflow-hidden group">
            <motion.div 
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (Math.abs(info.offset.x) > 50) {
                  handleSwipe(info.offset.x > 0 ? 'right' : 'left', '360')
                }
              }}
            >
              {booth360Images.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0 }}
                  animate={active360Image === index ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/images/${image}`}
                    alt="360° Photo Booth"
                    fill
                    className="object-contain bg-black"
                    priority={index === 0}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={() => handleImageChange('prev', '360')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleImageChange('next', '360')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity z-10"
            >
              <FiChevronRight size={24} />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {booth360Images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive360Image(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    active360Image === index ? 'bg-[#fce4a6]' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#fce4a6]/20">
            <h3 className="text-2xl font-semibold text-[#fce4a6] mb-6">What's Included</h3>
            <ul className="grid md:grid-cols-2 gap-6">
              {[
                '360° Video Capture',
                'Slow Motion Effects',
                'Custom Music Selection',
                'LED Platform',
                'Digital Gallery Access',
                'Social Media Sharing',
                'Custom Branding Options',
                'Professional Attendant',
                'Setup & Teardown',
                'Instant Downloads'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <svg className="w-5 h-5 text-[#fce4a6] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-12 text-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#fce4a6] text-black px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#fce4a6]/90 transition-colors"
                >
                  Book 360° Photo Booth
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto mb-24"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-[#fce4a6]/20">
            <h3 className="text-2xl font-bold mb-8 text-center text-[#fce4a6]">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/10"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 flex justify-between items-center text-left"
                  >
                    <h4 className="text-lg font-semibold text-white">{faq.question}</h4>
                    <svg
                      className={`w-5 h-5 transform transition-transform text-[#fce4a6] ${
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
                    <p className="text-white/80">{faq.answer}</p>
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

const faqs = [
  {
    question: "How much space is needed for the Robo Booth?",
    answer: "The best part is that the Robo Booth doesn't require much space at all! It's about 5ft tall and drives around your event, so it can fit into most venues and layouts with ease."
  },
  {
    question: "How much space is needed for the 360° Photo Booth?",
    answer: "The 360° Photo Booth requires a 12x12 foot space for optimal performance, including the platform and guest movement area."
  },
  {
    question: "How long does setup take?",
    answer: "It generally takes 30 minutes or less to set up. We arrive early to ensure everything is perfectly arranged and tested before your guests arrive."
  },
  {
    question: "How do guests receive their photos/videos?",
    answer: "Guests can instantly receive their content through multiple options: physical prints, SMS, email, QR code, or AirDrop. All content is also uploaded to a private online gallery for easy access."
  },
  {
    question: "What kind of events are these photo booths perfect for?",
    answer: "Both the Robo Booth and 360° Photo Booth are perfect for any event where you want to create memorable moments: weddings, corporate events, parties, galas, and more. The Robo Booth adds a unique interactive element with its roaming capabilities, while the 360° booth creates stunning viral-worthy content."
  },
  {
    question: "Do you provide an attendant?",
    answer: "Yes, all services include a professional attendant who will guide your guests, ensure proper operation, and help create the best possible experience."
  },
  {
    question: "Can we customize the experience?",
    answer: "Absolutely! We offer custom branding options, themed props, and can create a unique experience tailored to your event. Contact us to discuss your specific needs."
  }
] 