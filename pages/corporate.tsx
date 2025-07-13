import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiCheck, FiDownload, FiMail, FiPhone, FiCalendar, FiUsers } from 'react-icons/fi'
import { useRouter } from 'next/router'

export default function Corporate() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: '',
    notes: ''
  })

  const [showForm, setShowForm] = useState(false)
  const [showLookbook, setShowLookbook] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [leadForm, setLeadForm] = useState({
    email: '',
    phone: '',
    eventType: ''
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setShowLeadModal(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  // Disable scroll when modal is open
  useEffect(() => {
    if (showLeadModal) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [showLeadModal])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  const handleLookbookDownload = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle lookbook download
    console.log('Lookbook download requested')
  }

  const handleLeadInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLeadForm({ ...leadForm, [e.target.name]: e.target.value })
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('phone-number', leadForm.phone)
      formData.append('event-type', leadForm.eventType)
      formData.append('_replyto', leadForm.email)
      const response = await fetch('https://formspree.io/f/xkgoedyp', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      if (response.ok) {
        setLeadSuccess(true)
        router.push('/thank-you')
      } else {
        alert('Failed to submit. Please try again.')
      }
    } catch (err) {
      alert('Failed to submit. Please try again.')
    } finally {
      setLeadSubmitting(false)
    }
  }

  return (
    <>
      {/* Blur only the background when modal is open */}
      <div className={showLeadModal ? 'blur-sm pointer-events-none select-none' : ''}>
        <div className="min-h-screen overflow-x-hidden">
          <Head>
            <title>Corporate Events - Robo Booth | Toronto's Premier Robot Photo Booth</title>
            <meta name="description" content="Toronto's only robot photobooth & 360 photo booth for corporate events. Make your event unforgettable with interactive photo booths that wow your guests and amplify your brand reach instantly." />
            <meta name="keywords" content="corporate photo booth, robot photo booth, Toronto, corporate events, trade shows, conferences, staff parties" />
          </Head>

          {/* Hero Section */}
          <section className="relative h-screen bg-black flex flex-col items-center justify-center w-full overflow-x-hidden">
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
              <div className="absolute inset-0 bg-[url('/images/corporate-hero.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-black leading-tight text-white mb-6">
                  Toronto's First <span className="text-[#fce4a6]">Robot Photobooth</span> & 360 Photo Booth for Corporate Events
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
                  Make your event unforgettable with interactive photo booths that wow your guests and amplify your brand reach instantly.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowForm(true)}
                    className="bg-[#fce4a6] text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all group"
                  >
                    Book Now
                    <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#fce4a6]"
            >
              <FiArrowRight className="w-8 h-8 rotate-90" />
            </motion.div>
          </section>

          {/* Video Section */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Robot Photobooth in Action</h2>
                <p className="text-black/80 text-lg max-w-3xl mx-auto">
                  See how our interactive robot photobooth creates unforgettable moments at corporate events
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <video
                  className="w-full h-auto"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="/videos/Corporate.mov" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Why Corporate Teams Choose Robo Booth</h2>
                <p className="text-black/80 text-lg max-w-3xl mx-auto">
                  Professional, branded, and unforgettable experiences that elevate your corporate events
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black p-8 rounded-xl shadow-lg border border-[#fce4a6]/20 hover:shadow-xl transition-all"
                  >
                    <div className="text-4xl mb-4 text-[#fce4a6]">{benefit.icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-[#fce4a6]">{benefit.title}</h3>
                    <p className="text-white/80">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="py-20 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4 text-[#fce4a6]">Trusted by Toronto's Corporate Teams</h2>
                <p className="text-white/80 text-lg">Leading companies choose Robo Booth for their events</p>
              </motion.div>

              {/* Animated Logo Marquee */}
              <div className="overflow-hidden w-full mb-16">
                <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
                  {companyLogos.concat(companyLogos).map((logo, idx) => (
                    <div key={idx} className="flex-shrink-0 flex items-center justify-center h-24 w-48 bg-white rounded-xl shadow-lg mx-2 p-4">
                      <Image src={logo.src} alt={logo.alt} width={160} height={80} className="object-contain h-20 w-auto grayscale hover:grayscale-0 transition duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Rotating Testimonials Carousel */}
              <TestimonialCarousel />
            </div>
          </section>

          {/* Package Highlights */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4 text-black">Corporate Packages Include</h2>
                <p className="text-black/80 text-lg">Everything you need for a successful corporate event</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packageFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black p-6 rounded-xl shadow-lg border border-[#fce4a6]/20"
                  >
                    <div className="text-[#fce4a6] mb-3">
                      <FiCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-[#fce4a6] font-bold mb-2">{feature.title}</h3>
                    <p className="text-white/80 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 px-4 bg-black">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4 text-[#fce4a6]">Frequently Asked Questions</h2>
                <p className="text-white/80 text-lg">Everything you need to know about our corporate services</p>
              </motion.div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10"
                  >
                    <h3 className="text-xl font-bold mb-3 text-[#fce4a6]">{faq.question}</h3>
                    <p className="text-white/80">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust/Guarantee Section */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-8 md:p-12 text-white"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#fce4a6]">Professional & Reliable</h2>
                <p className="text-white/90 text-lg mb-6">
                  Professional team with 50+ successful corporate events hosted in Toronto. Fully insured & licensed.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fce4a6]">50+</div>
                    <div className="text-white/80">Corporate Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fce4a6]">100%</div>
                    <div className="text-white/80">Satisfaction Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fce4a6]">24/7</div>
                    <div className="text-white/80">Support Available</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20 px-4 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-4 text-[#fce4a6]">Ready to Transform Your Corporate Event?</h2>
                <p className="text-white/90 text-lg mb-8">
                  Get instant pricing and availability for your next corporate event
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="bg-[#fce4a6] text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all group"
                >
                  Book Now
                  <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* Pricing Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-black">Get Corporate Pricing</h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-black/60 hover:text-black text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Company *</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Event Type</label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    >
                      <option value="">Select Event Type</option>
                      <option value="conference">Conference</option>
                      <option value="trade-show">Trade Show</option>
                      <option value="staff-party">Staff Party</option>
                      <option value="gala">Gala</option>
                      <option value="product-launch">Product Launch</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                      placeholder="Tell us about your event..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#fce4a6] text-black py-3 rounded-lg font-bold hover:bg-[#a49056] transition-colors"
                  >
                    Get Pricing
                  </button>
                </form>
              </motion.div>
            </div>
          )}

          {/* Lookbook Download Modal */}
          {showLookbook && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-black">Download Corporate Event Lookbook</h3>
                  <button
                    onClick={() => setShowLookbook(false)}
                    className="text-black/60 hover:text-black text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <form onSubmit={handleLookbookDownload} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#fce4a6] text-black py-3 rounded-lg font-bold hover:bg-[#a49056] transition-colors flex items-center justify-center"
                  >
                    <FiDownload className="mr-2" />
                    Download Lookbook
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      {/* Lead Capture Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button
              onClick={() => setShowLeadModal(false)}
              className="absolute top-4 right-4 text-black/60 hover:text-black text-2xl"
              aria-label="Close lead form"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-black mb-4 text-center">Enter your details below!</h2>
            <p className="text-black/80 mb-6 text-center">Enter your details so we can give you a call and create a customized package for your event.</p>
            {leadSuccess ? (
              <div className="text-green-600 text-center font-bold py-8">Thank you! We’ll be in touch soon.</div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={leadForm.phone}
                    onChange={handleLeadInput}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Type of Event *</label>
                  <select
                    name="eventType"
                    value={leadForm.eventType}
                    onChange={handleLeadInput}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                  >
                    <option value="">Select Event Type</option>
                    <option value="conference">Conference</option>
                    <option value="trade-show">Trade Show</option>
                    <option value="staff-party">Staff Party</option>
                    <option value="gala">Gala</option>
                    <option value="product-launch">Product Launch</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={leadForm.email}
                    onChange={handleLeadInput}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    placeholder="you@email.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#fce4a6] text-black py-3 rounded-lg font-bold hover:bg-[#a49056] transition-colors"
                  disabled={leadSubmitting}
                >
                  {leadSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </>
  )
}

const benefits = [
  {
    icon: '🏢',
    title: 'Fully Branded for Your Company',
    description: 'Custom logos, colors, and messaging integrated throughout the experience to amplify your brand.'
  },
  {
    icon: '📱',
    title: 'Instant Social Sharing + Lead Capture',
    description: 'Guests share photos instantly while you capture valuable contact information for follow-up.'
  },
  {
    icon: '🤖',
    title: 'Interactive Robot Photo Booth & 360 Video Booth',
    description: 'Cutting-edge technology that creates memorable experiences and generates buzz at your event.'
  },
  {
    icon: '🎯',
    title: 'Perfect for Conferences, Trade Shows, Staff Parties, & Galas',
    description: 'Versatile solution that adapts to any corporate event type and venue requirements.'
  },
  {
    icon: '👥',
    title: 'Professional Setup, On-Site Team, Seamless Experience',
    description: 'Our experienced team handles everything from setup to teardown, ensuring a flawless event.'
  },
  {
    icon: '📊',
    title: 'Analytics & ROI Tracking',
    description: 'Detailed reports on engagement, social reach, and lead generation to measure your event success.'
  }
]

const companyLogos = [
  { src: '/images/pearson.png', alt: 'Toronto Pearson' },
  { src: '/images/talent.png', alt: 'Talent Inc Canada' },
  { src: '/images/remax.png', alt: 'Remax Impact' },
  { src: '/images/gradegear.png', alt: 'Grade Gear' },
  { src: '/images/pdsb.png', alt: 'PDSB' },
]

const packageFeatures = [
  {
    title: 'Custom Logo Branding',
    description: 'Your company logo and colors integrated throughout the photo experience.'
  },
  {
    title: 'Unlimited Photos & Videos',
    description: 'No limits on captures - every guest can enjoy the full experience.'
  },
  {
    title: 'On-Site Attendant',
    description: 'Professional team member ensures smooth operation and guest assistance.'
  },
  {
    title: 'Sharing via QR Code, Text, E-Mail, Airdrop',
    description: 'Guests can instantly receive their photos and videos through QR code, text message, email, or Airdrop.'
  },
  {
    title: 'High-Resolution Prints',
    description: 'Professional quality prints with your branding for immediate takeaway.'
  }
]

const faqs = [
  {
    question: 'How much setup time do you need?',
    answer: 'We typically need 30 minutes for setup and testing to ensure everything works perfectly for your event.'
  },
  {
    question: 'Can we add our branding?',
    answer: 'Absolutely! That\'s the whole purpose of our corporate service. We integrate your logos, colors, and messaging throughout the entire experience.'
  },
  {
    question: 'What happens if an issue occurs on-site?',
    answer: 'We have professional attendants at all times who are trained to handle any technical issues immediately, ensuring your event runs smoothly.'
  },
  {
    question: 'What types of corporate events do you serve?',
    answer: 'We serve conferences, trade shows, staff parties, galas, product launches, holiday parties, and any other corporate gathering.'
  },
  {
    question: 'Do you provide insurance and licensing?',
    answer: 'Yes, we are fully insured and licensed to operate in Toronto and the GTA, giving you peace of mind for your corporate event.'
  },
  {
    question: 'Can you accommodate different venue sizes?',
    answer: 'Our robot photo booth is designed to work in various venue sizes, from intimate boardrooms to large conference halls and outdoor spaces.'
  }
] 

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
  // Add more testimonials as needed
]

function TestimonialCarousel() {
  const [index, setIndex] = React.useState(0)
  React.useEffect(() => {
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

// Add this to your global CSS (e.g., styles/globals.css) if not present:
// .animate-marquee { animation: marquee 30s linear infinite; }
// @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } 