import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiCheck, FiDownload, FiMail, FiPhone, FiCalendar, FiUsers, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useMetaPixel } from '../hooks/useMetaPixel'

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
    firstName: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: 'Corporate'
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const router = useRouter()
  const { trackLead, trackFormSubmission, trackContactClick, trackVideoView, trackBookingInquiry, trackPhoneClick } = useMetaPixel()

  useEffect(() => {
    const timer = setTimeout(() => setShowLeadModal(true), 30000)
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
    // Track form submission
    trackFormSubmission('Corporate Inquiry', 'Toronto')
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
      // Track lead generation
      trackLead('Corporate Lead Modal', 'Toronto')
      
      const formData = new FormData()
      formData.append('first-name', leadForm.firstName)
      formData.append('phone-number', leadForm.phone)
      formData.append('email', leadForm.email)
      formData.append('event-date', leadForm.eventDate)
      formData.append('event-type', 'Corporate')
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
            <title>Corporate Photobooth Rental Toronto GTA | Robot Photobooth & 360 Photo Booth for Corporate Events</title>
            <meta name="description" content="Toronto's premier corporate photobooth rental featuring robot photobooth & 360 photo booth. Serving Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, Whitchurch-Stouffville. Interactive corporate photobooth that elevates your events and creates memorable team experiences." />
            <meta name="keywords" content="corporate photobooth rental, corporate robot photobooth, corporate 360 photo booth, Toronto corporate photobooth, GTA corporate photobooth, Ajax corporate photobooth, Oshawa corporate photobooth, Whitby corporate photobooth, Markham corporate photobooth, Vaughan corporate photobooth, Courtice corporate photobooth, Etobicoke corporate photobooth, King City corporate photobooth, Pickering corporate photobooth, North York corporate photobooth, Bowmanville corporate photobooth, Mississauga corporate photobooth, Richmond Hill corporate photobooth, East Gwillimbury corporate photobooth, Barrie corporate photobooth, Whitchurch-Stouffville corporate photobooth, interactive corporate photobooth, robotic corporate photobooth, 360 degree corporate photobooth, corporate event photobooth, team building photobooth" />
            <meta property="og:title" content="Corporate Photobooth Rental Toronto GTA | Robot Photobooth & 360 Photo Booth for Corporate Events" />
            <meta property="og:description" content="Toronto's premier corporate photobooth rental featuring robot photobooth & 360 photo booth. Interactive corporate photobooth that elevates your events and creates memorable team experiences." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://robobooth.ca/corporate" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Corporate Photobooth Rental Toronto GTA | Robot Photobooth & 360 Photo Booth for Corporate Events" />
            <meta name="twitter:description" content="Toronto's premier corporate photobooth rental featuring robot photobooth & 360 photo booth. Interactive corporate photobooth that elevates your events and creates memorable team experiences." />
            <link rel="canonical" href="https://robobooth.ca/corporate" />
          </Head>

          {/* Phone Number Header */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#fce4a6]/20">
            <div className="max-w-6xl mx-auto px-4 py-2 flex justify-center items-center">
              <a 
                href="tel:289-301-4039" 
                className="text-[#fce4a6] font-bold text-lg hover:text-white transition-colors flex items-center gap-2"
                onClick={() => trackPhoneClick('Corporate Page Header', 'Toronto')}
              >
                <FiPhone className="w-5 h-5" />
                Call Now: 289-301-4039
              </a>
            </div>
          </div>

          {/* Hero Section */}
          <section className="relative h-1/3 bg-black flex items-center justify-center overflow-hidden pt-12">
            {/* Background Video/Image */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
              <div className="absolute inset-0 bg-[url('/images/corporate-hero.jpg')] bg-cover bg-center bg-no-repeat opacity-40 scale-125"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 w-full h-full flex items-center">
              <div className="flex flex-row items-center justify-between w-full gap-6 lg:gap-8">
                {/* Left Side - Text Content */}
              <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                  className="flex-1 text-left"
              >
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-black leading-tight text-white mb-3 lg:mb-4">
                    Toronto's Premier <span className="text-[#fce4a6]">Robot Photobooth</span> & 360 Photo Booth for Corporate Events
                </h1>
                  <p className="text-sm md:text-base lg:text-lg text-white/90 mb-4 lg:mb-6 max-w-sm md:max-w-md lg:max-w-lg">
                    Elevate your corporate events with interactive robot photobooth and 360 photo booth that engage your team and create memorable experiences.
                </p>
                {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-start items-start mb-4 lg:mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        trackBookingInquiry('Corporate', 'Toronto')
                        setShowLeadModal(true)
                      }}
                      className="bg-[#fce4a6] text-black px-5 py-2 lg:px-6 lg:py-3 rounded-full font-bold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all group"
                  >
                    Book Now
                    <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>

                {/* Right Side - Image */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-shrink-0 flex items-center justify-center w-1/3"
                >
                  <div className="relative">
                    <img
                      src="/images/corporate1.JPG"
                      alt="Robot Photobooth at Corporate Event"
                      className="w-full h-auto max-h-64 object-contain rounded-xl shadow-2xl"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-4"
              >
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 lg:mb-4 text-black">Corporate Robot Photobooth in Action</h2>
              </motion.div>
                            <div className="flex justify-center -mx-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                  className="relative w-screen"
              >
                                  <video
                    className="w-full h-auto max-h-64"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    preload="auto"
                    disablePictureInPicture
                    disableRemotePlayback
                    webkit-playsinline="true"
                    onPlay={() => trackVideoView('Corporate Robot Photobooth')}
                  >
                  <source src="/videos/Corporate.mov" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6"
              >
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 lg:mb-4 text-black">Why Companies Choose Our Robot Photobooth & 360 Photo Booth</h2>
                <p className="text-sm md:text-base lg:text-lg text-black/80 max-w-2xl mx-auto">
                  Professional, engaging, and innovative robot photobooth and 360 photo booth experiences that elevate your corporate events across the GTA & surrounding areas!
                </p>
              </motion.div>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {corporateBenefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black p-2 md:p-4 rounded-xl shadow-lg border border-[#fce4a6]/20 hover:shadow-xl transition-all text-center"
                  >
                    <div className="text-lg md:text-2xl mb-1 md:mb-2 text-[#fce4a6]">{benefit.icon}</div>
                    <h3 className="text-xs md:text-sm font-bold text-[#fce4a6]">{benefit.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Second Video Section */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-4"
              >
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 lg:mb-4 text-black">Corporate Robot Photobooth Experience</h2>
              </motion.div>
              <div className="flex justify-center -mx-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative w-screen"
                >
                  <video
                    className="w-full h-auto max-h-64"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    preload="auto"
                    disablePictureInPicture
                    disableRemotePlayback
                    webkit-playsinline="true"
                    onPlay={() => trackVideoView('Corporate Robot Photobooth Experience')}
                  >
                    <source src="/videos/corporate2.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Call Now CTA Section */}
          <section className="py-8 px-4 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-lg md:text-xl font-bold mb-3 text-[#fce4a6]">Ready to Elevate Your Corporate Event?</h2>
                <p className="text-white/90 text-sm mb-4">
                  Call us now to discuss your event and get instant pricing
                </p>
                <motion.a
                  href="tel:289-301-4039"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackPhoneClick('Corporate CTA Section', 'Toronto')}
                  className="inline-flex items-center gap-3 bg-[#fce4a6] text-black px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all group"
                >
                  <FiPhone className="w-5 h-5" />
                  Call Now: 289-301-4039
                </motion.a>
              </motion.div>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="py-8 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 text-[#fce4a6]">Trusted by Toronto's Leading Companies</h2>
                <p className="text-white/80 text-sm md:text-base mb-4">Companies choose Robo Booth for their most important events</p>
                
                {/* Google Rating */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <a 
                    href="https://g.co/kgs/v9p1CzT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#fce4a6] hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-yellow-400">★</span>
                      <span className="text-yellow-400">★</span>
                      <span className="text-yellow-400">★</span>
                      <span className="text-yellow-400">★</span>
                    </div>
                  </a>
                </div>
              </motion.div>
              
              {/* Static Testimonial Cards */}
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {corporateTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-[#fce4a6] to-[#a49056] p-3 md:p-4 rounded-xl shadow-lg text-center"
                  >
                    <div className="text-2xl mb-2 text-black">"</div>
                    <p className="text-black text-xs md:text-sm font-medium mb-3 leading-tight">
                      {testimonial.text}
                    </p>
                    <div className="text-black text-xs font-bold">
                      - {testimonial.title}, {testimonial.company}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Image Gallery Section */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-4"
              >
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 lg:mb-4 text-black">Corporate Robot Photobooth Gallery</h2>
              </motion.div>
              <div className="flex justify-center gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative w-1/3"
                >
                  <img
                    src="/images/corporate1.JPG"
                    alt="Corporate Robot Photobooth"
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative w-1/3"
                >
                  <img
                    src="/images/corporate2.jpg"
                    alt="Corporate Event Photobooth"
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="relative w-1/3"
                >
                  <img
                    src="/images/corporate3.png"
                    alt="Corporate Robot Photobooth"
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Package Highlights */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6"
              >
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 text-black">Corporate Package Includes</h2>
                <p className="text-sm md:text-base text-black/80">Everything you need for a successful corporate event</p>
              </motion.div>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {corporatePackageFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-black p-2 md:p-4 rounded-xl shadow-lg border border-[#fce4a6]/20 text-center"
                  >
                    <div className="text-[#fce4a6] mb-2">
                      <FiCheck className="w-4 h-4 md:w-5 md:h-5 mx-auto" />
                    </div>
                    <h3 className="text-[#fce4a6] font-bold text-xs md:text-sm">{feature.title}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-8 px-4 bg-black">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 text-[#fce4a6]">Frequently Asked Questions</h2>
                <p className="text-white/80 text-sm md:text-base">Everything you need to know about our corporate services</p>
              </motion.div>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {corporateFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/10 cursor-pointer"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex items-start justify-between min-h-[3rem] relative">
                      <h3 className="text-sm md:text-base font-bold text-[#fce4a6] flex-1 pr-8 leading-tight">{faq.question}</h3>
                      <div className="absolute top-1 right-3">
                        {expandedFaq === index ? (
                          <FiChevronUp className="text-[#fce4a6] w-4 h-4" />
                        ) : (
                          <FiChevronDown className="text-[#fce4a6] w-4 h-4" />
                        )}
                      </div>
                    </div>
                    {expandedFaq === index && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-white/80 text-xs"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust/Guarantee Section */}
          <section className="py-8 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-black to-gray-800 rounded-xl p-4 md:p-6 text-white"
              >
                <h2 className="text-lg md:text-2xl font-bold mb-2 text-[#fce4a6]">Professional & Reliable</h2>
                <p className="text-white/90 text-sm md:text-base mb-3">
                  Professional team with 100+ successful corporate events in Toronto. Fully insured & licensed.
                </p>
                <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#fce4a6]">100+</div>
                    <div className="text-white/80 text-xs md:text-sm">Corporate Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#fce4a6]">100%</div>
                    <div className="text-white/80 text-xs md:text-sm">Satisfied Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#fce4a6]">24/7</div>
                    <div className="text-white/80 text-xs md:text-sm">Support Available</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-12 px-4 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-3 text-[#fce4a6]">Ready to Elevate Your Corporate Event?</h2>
                <p className="text-white/90 text-base mb-6">
                  Get instant pricing and availability for your event
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    trackBookingInquiry('Corporate', 'Toronto')
                    setShowLeadModal(true)
                  }}
                  className="bg-[#fce4a6] text-black px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all group"
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
            <p className="text-black/80 mb-6 text-center">Enter your details so we can give you a call and create a customized package for your corporate event.</p>
            {leadSuccess ? (
              <div className="text-green-600 text-center font-bold py-8">Thank you! We'll be in touch soon.</div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={leadForm.firstName}
                    onChange={handleLeadInput}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                    placeholder="Your first name"
                  />
                </div>
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
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Date of Event *</label>
                  <input
                    type="date"
                    name="eventDate"
                    value={leadForm.eventDate}
                    onChange={handleLeadInput}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
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
          className="fixed bottom-6 left-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-4 rounded-full shadow-xl hover:bg-[#a49056] transition-all text-lg"
        >
          Book Now
        </button>
      )}
    </>
  )
}

const corporateBenefits = [
  {
    icon: '🏢',
    title: 'Professional & Corporate',
    description: 'Elegant photo experiences that match your corporate brand and event theme.'
  },
  {
    icon: '📸',
    title: 'Stunning Photos & Videos',
    description: 'Capture every moment with professional quality for your team.'
  },
  {
    icon: '🤖',
    title: 'Interactive Robot Photobooth',
    description: 'A unique, engaging experience that wows your team and clients.'
  },
  {
    icon: '🎯',
    title: 'Perfect for Team Building',
    description: 'Enhance team bonding and create memorable corporate experiences.'
  },
  {
    icon: '💼',
    title: 'Branded for Your Company',
    description: 'Custom overlays, props, and experiences tailored to your brand.'
  },
  {
    icon: '💌',
    title: 'Instant Sharing',
    description: 'Team members can instantly share their memories via QR code, text, email, or Airdrop.'
  }
]

const corporatePackageFeatures = [
  {
    title: 'Custom Corporate Overlay',
    description: 'Personalized overlays and graphics to match your company branding.'
  },
  {
    title: 'Unlimited Photos & Videos + High-Resolution Prints',
    description: 'No limits on captures - every team member can enjoy the full experience with professional quality prints.'
  },
  {
    title: 'On-Site Attendant',
    description: 'Professional team member ensures smooth operation and team assistance.'
  }
]

const corporateFaqs = [
  {
    question: 'How much setup time do you need?',
    answer: 'We typically need 30 minutes for setup and testing to ensure everything works perfectly for your corporate event.'
  },
  {
    question: 'Can we add our company branding?',
    answer: 'Absolutely! We offer custom overlays, props, and experiences tailored to your company brand and event theme.'
  },
  {
    question: 'What happens if an issue occurs on-site?',
    answer: 'We have professional attendants at all times who are trained to handle any technical issues immediately, ensuring your event runs smoothly.'
  },
  {
    question: 'Do you provide insurance and licensing?',
    answer: 'Yes, we are fully insured and licensed to operate in Toronto and the GTA, giving you peace of mind for your corporate event.'
  },
  {
    question: 'Can you accommodate different venue sizes?',
    answer: 'Our robot photo booth is designed to work in various venue sizes, from intimate meetings to large conference halls and outdoor corporate events.'
  },
  {
    question: 'How long does the photobooth rental last?',
    answer: 'Our photobooth rentals have a 2-hour minimum and can be extended for however many hours you\'d like. Most companies choose 4-6 hours to capture all the fun moments throughout their event.'
  }
]

const corporateTestimonials = [
  {
    company: 'TechCorp Inc.',
    title: 'Marketing Director',
    text: 'Robo Booth made our product launch incredible! Our clients loved the interactive experience and the photos were amazing.'
  },
  {
    company: 'Global Solutions',
    title: 'Event Manager',
    text: 'The robot photobooth was a huge hit at our annual conference. The instant sharing feature was perfect for social media.'
  },
  {
    company: 'Innovation Labs',
    title: 'HR Director',
    text: 'We wanted something unique for our team building event and Robo Booth delivered. The custom branding was perfect.'
  }
]

function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % corporateTestimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])
  const testimonial = corporateTestimonials[index]
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