import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiCheck, FiDownload, FiMail, FiPhone, FiCalendar, FiUsers } from 'react-icons/fi'
import { useRouter } from 'next/router'

export default function Wedding() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  const [formData, setFormData] = useState({
    name: '',
    partner: '',
    email: '',
    phone: '',
    weddingDate: '',
    venue: '',
    notes: ''
  })

  const [showForm, setShowForm] = useState(false)
  const [showLookbook, setShowLookbook] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [leadForm, setLeadForm] = useState({
    email: '',
    phone: '',
    eventType: 'Wedding'
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setShowLeadModal(true), 5000)
    return () => clearTimeout(timer)
  }, [])

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
      formData.append('event-type', 'Wedding')
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
                    <title>Wedding Photobooth Rental Toronto GTA | Robot Photobooth & 360 Photo Booth for Weddings</title>
        <meta name="description" content="Toronto's premier wedding photobooth rental featuring robot photobooth & 360 photo booth. Serving Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, Whitchurch-Stouffville. Interactive wedding photobooth that wows your guests and captures magical memories instantly." />
        <meta name="keywords" content="wedding photobooth rental, wedding robot photobooth, wedding 360 photo booth, Toronto wedding photobooth, GTA wedding photobooth, Ajax wedding photobooth, Oshawa wedding photobooth, Whitby wedding photobooth, Markham wedding photobooth, Vaughan wedding photobooth, Courtice wedding photobooth, Etobicoke wedding photobooth, King City wedding photobooth, Pickering wedding photobooth, North York wedding photobooth, Bowmanville wedding photobooth, Mississauga wedding photobooth, Richmond Hill wedding photobooth, East Gwillimbury wedding photobooth, Barrie wedding photobooth, Whitchurch-Stouffville wedding photobooth, interactive wedding photobooth, robotic wedding photobooth, 360 degree wedding photobooth, wedding reception photobooth, bridal party photobooth" />
        <meta property="og:title" content="Wedding Photobooth Rental Toronto GTA | Robot Photobooth & 360 Photo Booth for Weddings" />
        <meta property="og:description" content="Toronto's premier wedding photobooth rental featuring robot photobooth & 360 photo booth. Interactive wedding photobooth that wows your guests and captures magical memories instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://robobooth.ca/wedding" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wedding Photobooth Rental Toronto GTA | Robot Photobooth & 360 Photo Booth for Weddings" />
        <meta name="twitter:description" content="Toronto's premier wedding photobooth rental featuring robot photobooth & 360 photo booth. Interactive wedding photobooth that wows your guests and captures magical memories instantly." />
        <link rel="canonical" href="https://robobooth.ca/wedding" />
          </Head>

          {/* Hero Section */}
          <section className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
              <div className="absolute inset-0 bg-[url('/images/wedding-hero.jpg')] bg-cover bg-center bg-no-repeat opacity-40"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-black leading-tight text-white mb-6">
                  Toronto's Premier <span className="text-[#fce4a6]">Robot Photobooth</span> & 360 Photo Booth for Weddings
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
                  Make your wedding unforgettable with interactive robot photobooth and 360 photo booth that wow your guests and capture magical memories instantly. Serving Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, and Whitchurch-Stouffville.
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
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#fce4a6]"
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
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Wedding Robot Photobooth & 360 Photo Booth in Action</h2>
                <p className="text-black/80 text-lg max-w-3xl mx-auto">
                  See how our interactive robot photobooth and 360 photo booth create magical moments at weddings across Toronto and the GTA
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
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/Wedding.mov" type="video/mp4" />
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
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Why Couples Love Our Robot Photobooth & 360 Photo Booth</h2>
                <p className="text-black/80 text-lg max-w-3xl mx-auto">
                  Elegant, interactive, and unforgettable robot photobooth and 360 photo booth experiences that make your wedding day truly special across Toronto, Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, and Whitchurch-Stouffville.
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
                <h2 className="text-4xl font-bold mb-4 text-[#fce4a6]">Trusted by Toronto's Happiest Couples</h2>
                <p className="text-white/80 text-lg">Couples and families choose Robo Booth for their most important day</p>
              </motion.div>
              {/* Animated Logo Marquee (replace with wedding venues or leave out if not available) */}
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
                <h2 className="text-4xl font-bold mb-4 text-black">Wedding Package Includes</h2>
                <p className="text-black/80 text-lg">Everything you need for a magical wedding celebration</p>
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
                <p className="text-white/80 text-lg">Everything you need to know about our wedding services</p>
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
                  Professional team with 100+ beautiful weddings hosted in Toronto. Fully insured & licensed.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fce4a6]">100+</div>
                    <div className="text-white/80">Weddings Hosted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fce4a6]">100%</div>
                    <div className="text-white/80">Happy Couples</div>
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
                <h2 className="text-4xl font-bold mb-4 text-[#fce4a6]">Ready to Make Your Wedding Unforgettable?</h2>
                <p className="text-white/90 text-lg mb-8">
                  Get instant pricing and availability for your special day
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
            <p className="text-black/80 mb-6 text-center">Enter your details so we can give you a call and create a customized package for your wedding.</p>
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
      {/* Sticky Book Now Button */}
      {!showLeadModal && (
        <button
          onClick={() => setShowLeadModal(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-4 rounded-full shadow-xl hover:bg-[#a49056] transition-all text-lg"
        >
          Book Now
        </button>
      )}
    </>
  )
}

const benefits = [
  {
    icon: '💍',
    title: 'Elegant & Romantic',
    description: 'Beautiful photo experiences that match your wedding theme and style.'
  },
  {
    icon: '📸',
    title: 'Stunning Photos & Videos',
    description: 'Capture every magical moment with professional quality.'
  },
  {
    icon: '🤖',
    title: 'Interactive Robot Photobooth',
    description: 'A unique, fun, and memorable experience for your guests.'
  },
  {
    icon: '🎉',
    title: 'Perfect for Receptions & Parties',
    description: 'Keep the celebration going with interactive entertainment.'
  },
  {
    icon: '👰',
    title: 'Personalized for Your Love Story',
    description: 'Custom overlays, props, and experiences tailored to you.'
  },
  {
    icon: '💌',
    title: 'Instant Sharing',
    description: 'Guests can instantly share their memories via QR code, text, email, or Airdrop.'
  }
]

const packageFeatures = [
  {
    title: 'Custom Wedding Overlay',
    description: 'Personalized overlays and graphics to match your wedding theme.'
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
    title: 'Instant Sharing via QR Code, Text, E-Mail, Airdrop',
    description: 'Guests can instantly receive their photos and videos through QR code, text message, email, or Airdrop.'
  },
  {
    title: 'High-Resolution Prints',
    description: 'Professional quality prints for immediate takeaway.'
  }
]

const faqs = [
  {
    question: 'How much setup time do you need?',
    answer: 'We typically need 30 minutes for setup and testing to ensure everything works perfectly for your wedding.'
  },
  {
    question: 'Can we personalize the experience?',
    answer: 'Absolutely! We offer custom overlays, props, and experiences tailored to your love story.'
  },
  {
    question: 'What happens if an issue occurs on-site?',
    answer: 'We have professional attendants at all times who are trained to handle any technical issues immediately, ensuring your wedding runs smoothly.'
  },
  {
    question: 'Do you provide insurance and licensing?',
    answer: 'Yes, we are fully insured and licensed to operate in Toronto and the GTA, giving you peace of mind for your special day.'
  },
  {
    question: 'Can you accommodate different venue sizes?',
    answer: 'Our robot photo booth is designed to work in various venue sizes, from intimate gatherings to large banquet halls and outdoor spaces.'
  }
]

const testimonials = [
  {
    couple: 'Emily & James',
    title: 'Bride & Groom',
    text: 'Robo Booth made our wedding so much fun! Our guests loved the robot and the photos were absolutely stunning.'
  },
  {
    couple: 'Priya & Arjun',
    title: 'Newlyweds',
    text: 'The interactive photobooth was a huge hit at our reception. The instant sharing was perfect for our social media.'
  },
  {
    couple: 'Samantha & Alex',
    title: 'Bride & Groom',
    text: 'We wanted something unique for our wedding and Robo Booth delivered. The custom overlays were beautiful.'
  },
  {
    couple: 'Jessica & Mark',
    title: 'Bride & Groom',
    text: 'Our guests are still talking about the robot photobooth! The team was professional and made everything seamless.'
  }
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
      <div className="text-black font-bold">- {testimonial.title}, {testimonial.couple}</div>
    </motion.div>
  )
} 