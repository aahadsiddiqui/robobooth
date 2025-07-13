import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import CornerNav from '../components/CornerNav'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useRouter } from 'next/router'

// Testimonials and Carousel
const testimonials = [
  {
    company: 'Toronto Pearson',
    title: 'Event Coordinator',
    text: 'Robo Booth was a huge hit at our staff appreciation event. The robot photobooth created a buzz and the branded photos were a fantastic touch for our team.'
  },
  {
    company: 'Talent Inc Canada',
    title: 'Marketing Director',
    text: 'The interactive experience was unlike anything we have seen before. Our guests loved it and the instant sharing helped us boost our social presence.'
  },
  {
    company: 'Remax Impact',
    title: 'Office Manager',
    text: 'Professional, seamless, and fun! The Robo Booth team handled everything and our agents are still talking about the experience.'
  },
  {
    company: 'Grade Gear',
    title: 'Brand Manager',
    text: 'We wanted something unique for our product launch and Robo Booth delivered. The branded prints were perfect for our goals.'
  },
  {
    company: 'PDSB',
    title: 'Communications Lead',
    text: 'The robot photobooth was a highlight at our conference. The team was professional and the service was a great bonus.'
  },
]

function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  const testimonial = testimonials[index]
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#fce4a6] to-[#a49056] rounded-2xl p-8 md:p-12 text-center min-h-[220px] flex flex-col justify-center"
    >
      <div className="text-4xl mb-4">"</div>
      <p className="text-black text-xl md:text-2xl font-medium mb-6 max-w-4xl mx-auto">
        {testimonial.text}
      </p>
      <div className="text-black font-bold">- {testimonial.title}, {testimonial.company}</div>
    </motion.div>
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

export default function Packages() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [active, setActive] = useState(false)
  const [activeRoboImage, setActiveRoboImage] = useState(0)
  const [active360Image, setActive360Image] = useState(0)
  const roboControls = useAnimation()
  const booth360Controls = useAnimation()
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [offerForm, setOfferForm] = useState({ phone: '', email: '' })
  const [offerSubmitting, setOfferSubmitting] = useState(false)
  const [offerSuccess, setOfferSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const original = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#000';
    return () => {
      document.body.style.backgroundColor = original;
    };
  }, []);

  useEffect(() => {
    if (showOfferModal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [showOfferModal])

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // Only show the video in the gallery
  const booth360Images = ['IMG_1167.jpg', 'IMG_1170.jpg', 'IMG_1188.jpg']

  const handleImageChange = (direction: 'prev' | 'next', type: 'robo' | '360') => {
    const images = type === 'robo' ? booth360Images : booth360Images
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

  const handleOfferInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOfferForm({ ...offerForm, [e.target.name]: e.target.value })
  }
  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOfferSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('phone-number', offerForm.phone)
      formData.append('_replyto', offerForm.email)
      const response = await fetch('https://formspree.io/f/xkgoedyp', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      if (response.ok) {
        setOfferSuccess(true)
        setTimeout(() => {
          setShowOfferModal(false)
          router.push('/thank-you')
        }, 1200)
      } else {
        alert('Failed to submit. Please try again.')
      }
    } catch (err) {
      alert('Failed to submit. Please try again.')
    } finally {
      setOfferSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Head>
        <title>Robot Photobooth & 360 Photo Booth Packages | Toronto GTA Photo Booth Rental</title>
        <meta name="description" content="Robot photobooth and 360 photo booth packages for Toronto, GTA, Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, Whitchurch-Stouffville. Wedding photobooth, corporate photobooth, party photobooth rental." />
        <meta name="keywords" content="robot photobooth packages, 360 photo booth packages, Toronto photobooth rental, GTA photo booth packages, Ajax photobooth rental, Oshawa photobooth rental, Whitby photobooth rental, Markham photobooth rental, Vaughan photobooth rental, Courtice photobooth rental, Etobicoke photobooth rental, King City photobooth rental, Pickering photobooth rental, North York photobooth rental, Bowmanville photobooth rental, Mississauga photobooth rental, Richmond Hill photobooth rental, East Gwillimbury photobooth rental, Barrie photobooth rental, Whitchurch-Stouffville photobooth rental, wedding photobooth packages, corporate photobooth packages, party photobooth packages, interactive photobooth rental, robotic photobooth rental, 360 degree photobooth rental" />
        <meta property="og:title" content="Robot Photobooth & 360 Photo Booth Packages | Toronto GTA" />
        <meta property="og:description" content="Robot photobooth and 360 photo booth packages for Toronto, GTA, Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, Whitchurch-Stouffville." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://robobooth.ca/packages" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Robot Photobooth & 360 Photo Booth Packages | Toronto GTA" />
        <meta name="twitter:description" content="Robot photobooth and 360 photo booth packages for Toronto, GTA, Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, Whitchurch-Stouffville." />
        <link rel="canonical" href="https://robobooth.ca/packages" />
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
            Robot Photobooth & 360 Photo Booth Packages
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Experience Canada's First Robot Photo Booth and 360° Photo Booth.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#fce4a6]">Interactive Robot Photobooth Experience</h2>
            <p className="text-white/80 text-lg">
              The complete robot photobooth experience for your wedding, corporate event, or party in Toronto and the GTA
            </p>
          </div>

          {/* Image Carousel */}
          <div className="max-w-6xl mx-auto px-4 mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video
                key="robo-video"
                src="/videos/Corporate.mov"
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>

          {/* Features List */}
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#fce4a6]/20">
            <h3 className="text-2xl font-semibold text-[#fce4a6] mb-6">What's Included</h3>
            <ul className="grid md:grid-cols-2 gap-6">
              {[
                'Roaming Robot Photobooth',
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#fce4a6]">360° Booth Experience</h2>
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
              {faqs.map((faq: any, index: number) => (
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
        {/* Testimonials Section */}
        <section className="max-w-4xl mx-auto mb-24">
          <h3 className="text-2xl font-bold mb-8 text-center text-[#fce4a6]">What Our Clients Say</h3>
          <TestimonialCarousel />
        </section>
        {/* Offer Modal */}
        {showOfferModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowOfferModal(false)}
                className="absolute top-4 right-4 text-black/60 hover:text-black text-2xl"
                aria-label="Close offer form"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold text-black mb-4 text-center">Unlock a Special Offer!</h2>
              <p className="text-black/80 mb-6 text-center">Enter your details and our team will reach out with a custom deal for your event.</p>
              {offerSuccess ? (
                <div className="text-green-600 text-center font-bold py-8">Thank you! We’ll be in touch soon.</div>
              ) : (
                <form onSubmit={handleOfferSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={offerForm.phone}
                      onChange={handleOfferInput}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={offerForm.email}
                      onChange={handleOfferInput}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                      placeholder="you@email.com"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#fce4a6] text-black py-3 rounded-lg font-bold hover:bg-[#a49056] transition-colors"
                    disabled={offerSubmitting}
                  >
                    {offerSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
        {/* Sticky Get Offer Button */}
        {!showOfferModal && (
          <button
            onClick={() => setShowOfferModal(true)}
            className="fixed bottom-6 right-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-4 rounded-full shadow-xl hover:bg-[#a49056] transition-all text-lg"
          >
            Get Offer
          </button>
        )}
      </div>
    </div>
  )
} 