import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Head from 'next/head'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiCheck, FiDownload, FiMail, FiPhone, FiCalendar, FiUsers, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useMetaPixel } from '../hooks/useMetaPixel'

// Ultra-lightweight video component with minimal overhead
const UltraLightVideo = ({ src, className, onPlay, alt }: { src: string; className: string; onPlay?: () => void; alt: string }) => {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '300px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isInView && videoRef.current) {
      const video = videoRef.current
      video.load()
      video.addEventListener('loadeddata', () => setIsLoaded(true))

      // Much longer delay to reduce initial load impact
      const playTimer = setTimeout(() => {
        if (video.paused) {
          video.play().catch(() => { })
        }
      }, 5000)

      return () => clearTimeout(playTimer)
    }
  }, [isInView])

  return (
    <div ref={containerRef} className="w-full flex justify-center">
      {isInView ? (
        <video
          ref={videoRef}
          className={className}
          autoPlay={isLoaded}
          loop
          muted
          playsInline
          controls={false}
          preload="none"
          disablePictureInPicture
          disableRemotePlayback
          webkit-playsinline="true"
          onPlay={onPlay}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      )}
    </div>
  )
}

// Ultra-lightweight motion component with minimal overhead
const UltraLightMotion = ({ children, className, delay = 0, onClick }: { children: React.ReactNode; className: string; delay?: number; onClick?: () => void }) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '300px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  if (!isInView) {
    return <div ref={ref} className={className} onClick={onClick}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.02, delay }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

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
    firstName: '',
    email: '',
    phone: '',
    eventDate: '',
    budget: '',
    eventType: 'Wedding'
  })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const router = useRouter()
  const { trackLead, trackFormSubmission, trackContactClick, trackVideoView, trackBookingInquiry, trackPhoneClick } = useMetaPixel()

  // Optimize modal timer to reduce initial load
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
    trackFormSubmission('Wedding Inquiry', 'Toronto')
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
      trackLead('Wedding Lead Modal', 'Toronto')

      const formData = new FormData()
      formData.append('first-name', leadForm.firstName)
      formData.append('phone-number', leadForm.phone)
      formData.append('email', leadForm.email)
      formData.append('email', leadForm.email)
      formData.append('event-date', leadForm.eventDate)
      formData.append('budget', leadForm.budget)
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
            <meta name="description" content="Toronto's premier wedding photobooth rental featuring robot photobooth & 360 photo booth. Serving Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, Whitchurch-Stouffville. Interactive wedding photobooth that captures every magical moment of your special day." />
            <meta name="keywords" content="wedding photobooth rental, wedding robot photobooth, wedding 360 photo booth, Toronto wedding photobooth, GTA wedding photobooth, Ajax wedding photobooth, Oshawa wedding photobooth, Whitby wedding photobooth, Markham wedding photobooth, Vaughan wedding photobooth, Courtice wedding photobooth, Etobicoke wedding photobooth, King City wedding photobooth, Pickering wedding photobooth, North York wedding photobooth, Bowmanville wedding photobooth, Mississauga wedding photobooth, Richmond Hill wedding photobooth, East Gwillimbury wedding photobooth, Barrie wedding photobooth, Whitchurch-Stouffville wedding photobooth, interactive wedding photobooth, robotic wedding photobooth, 360 degree wedding photobooth, wedding reception photobooth, wedding entertainment" />
            <meta property="og:title" content="Wedding Photobooth Rental Toronto GTA | Robot Photobooth & 360 Photo Booth for Weddings" />
            <meta property="og:description" content="Toronto's premier wedding photobooth rental featuring robot photobooth & 360 photo booth. Interactive wedding photobooth that captures every magical moment of your special day." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://robobooth.ca/wedding" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Wedding Photobooth Rental Toronto GTA | Robot Photobooth & 360 Photo Booth for Weddings" />
            <meta name="twitter:description" content="Toronto's premier wedding photobooth rental featuring robot photobooth & 360 photo booth. Interactive wedding photobooth that captures every magical moment of your special day." />
            <link rel="canonical" href="https://robobooth.ca/wedding" />

            {/* Preload critical resources */}
            <link rel="preload" href="/images/wedding-hero.jpg" as="image" />
            <link rel="preload" href="/images/wedding1.jpg" as="image" />

            {/* DNS prefetch for external resources */}
            <link rel="dns-prefetch" href="//formspree.io" />
            <link rel="dns-prefetch" href="//www.facebook.com" />

            {/* Critical CSS inline */}
            <style dangerouslySetInnerHTML={{
              __html: `
                .hero-bg { background-image: url('/images/wedding-hero.jpg'); }
                .hero-image { background-image: url('/images/wedding1.jpg'); }
                @media (max-width: 768px) {
                  .hero-bg { background-image: url('/images/wedding-hero.jpg'); }
                }
              `
            }} />
          </Head>

          {/* Phone Number Header */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#fce4a6]/20">
            <div className="max-w-6xl mx-auto px-4 py-2 flex justify-center items-center">
              <a
                href="tel:289-301-4039"
                className="text-[#fce4a6] font-bold text-lg hover:text-white transition-colors flex items-center gap-2"
                onClick={() => trackPhoneClick('Wedding Page Header', 'Toronto')}
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
              <div className="absolute inset-0 hero-bg bg-cover bg-center bg-no-repeat opacity-40 scale-125"></div>
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
                    Toronto's Premier <span className="text-[#fce4a6]">Robot Photobooth</span> & 360 Photo Booth for Weddings
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-white/90 mb-4 lg:mb-6 max-w-sm md:max-w-md lg:max-w-lg">
                    Capture every magical moment of your special day with our interactive robot photobooth and 360 photo booth that wows your guests.
                  </p>
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-start items-start mb-4 lg:mb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        trackBookingInquiry('Wedding', 'Toronto')
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
                      src="/images/wedding1.jpg"
                      alt="Robot Photobooth at Wedding"
                      className="w-full h-auto max-h-64 object-contain rounded-xl shadow-2xl"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <UltraLightMotion className="text-center mb-4">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 lg:mb-4 text-black">Wedding Robot Photobooth in Action</h2>
              </UltraLightMotion>
              <div className="flex justify-center -mx-8">
                <UltraLightMotion className="relative w-screen" delay={0.2}>
                  <UltraLightVideo
                    src="/videos/Wedding.mov"
                    className="w-full h-auto max-h-64 md:max-h-[80vh]"
                    onPlay={() => trackVideoView('Wedding Robot Photobooth')}
                    alt="Wedding Robot Photobooth in Action"
                  />
                </UltraLightMotion>
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <UltraLightMotion className="text-center mb-6">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 lg:mb-4 text-black">Why Couples Love Our Robot Photobooth & 360 Photo Booth</h2>
                <p className="text-sm md:text-base lg:text-lg text-black/80 max-w-2xl mx-auto">
                  Elegant, interactive, and unforgettable robot photobooth and 360 photo booth experiences that make your wedding day truly special across the GTA & surrounding areas!
                </p>
              </UltraLightMotion>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {benefits.map((benefit, index) => (
                  <UltraLightMotion
                    key={index}
                    delay={index * 0.1}
                    className="bg-black p-2 md:p-4 rounded-xl shadow-lg border border-[#fce4a6]/20 hover:shadow-xl transition-all text-center"
                  >
                    <div className="text-lg md:text-2xl mb-1 md:mb-2 text-[#fce4a6]">{benefit.icon}</div>
                    <h3 className="text-xs md:text-sm font-bold text-[#fce4a6]">{benefit.title}</h3>
                  </UltraLightMotion>
                ))}
              </div>
            </div>
          </section>

          {/* Second Video Section */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <UltraLightMotion className="text-center mb-4">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 lg:mb-4 text-black">Wedding Robot Photobooth Experience</h2>
              </UltraLightMotion>
              <div className="flex justify-center -mx-8">
                <UltraLightMotion
                  delay={0.2}
                  className="relative w-screen"
                >
                  <UltraLightVideo
                    src="/videos/wedding2.mov"
                    className="w-full h-auto max-h-64 md:max-h-[80vh]"
                    onPlay={() => trackVideoView('Wedding Robot Photobooth Experience')}
                    alt="Wedding Robot Photobooth Experience"
                  />
                </UltraLightMotion>
              </div>
            </div>
          </section>

          {/* Call Now CTA Section */}
          <section className="py-8 px-4 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <UltraLightMotion className="">
                <h2 className="text-lg md:text-xl font-bold mb-3 text-[#fce4a6]">Ready to Make Your Wedding Unforgettable?</h2>
                <p className="text-white/90 text-sm mb-4">
                  Call us now to discuss your special day and get instant pricing
                </p>
                <motion.a
                  href="tel:289-301-4039"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => trackPhoneClick('Wedding CTA Section', 'Toronto')}
                  className="inline-flex items-center gap-3 bg-[#fce4a6] text-black px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all group"
                >
                  <FiPhone className="w-5 h-5" />
                  Call Now: 289-301-4039
                </motion.a>
              </UltraLightMotion>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="py-8 px-4 bg-black">
            <div className="max-w-6xl mx-auto">
              <UltraLightMotion className="text-center mb-8">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 text-[#fce4a6]">Trusted by Toronto's Happy Couples</h2>
                <p className="text-white/80 text-sm md:text-base mb-4">Couples choose Robo Booth for their most important day</p>

                {/* Google Rating */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <a
                    href="https://g.co/kgs/v9p1CzT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#fce4a6] hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
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
              </UltraLightMotion>

              {/* Static Testimonial Cards */}
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {testimonials.map((testimonial, index) => (
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
                      - {testimonial.title}, {testimonial.couple}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Image Gallery Section */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <UltraLightMotion className="text-center mb-4">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 lg:mb-4 text-black">Wedding Robot Photobooth Gallery</h2>
              </UltraLightMotion>
              <div className="flex justify-center gap-4">
                <UltraLightMotion
                  delay={0.2}
                  className="relative w-1/3"
                >
                  <img
                    src="/images/wedding1.jpg"
                    alt="Wedding Robot Photobooth"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </UltraLightMotion>
                <UltraLightMotion
                  delay={0.3}
                  className="relative w-1/3"
                >
                  <img
                    src="/images/wedding2.PNG"
                    alt="Robot Photobooth"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </UltraLightMotion>
                <UltraLightMotion
                  delay={0.4}
                  className="relative w-1/3"
                >
                  <img
                    src="/images/corporate3.jpeg"
                    alt="Corporate Robot Photobooth"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </UltraLightMotion>
              </div>
            </div>
          </section>

          {/* Package Highlights */}
          <section className="py-4 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <UltraLightMotion className="text-center mb-6">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 text-black">Wedding Package Includes</h2>
                <p className="text-sm md:text-base text-black/80">Everything you need for a magical wedding celebration</p>
              </UltraLightMotion>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {packageFeatures.map((feature, index) => (
                  <UltraLightMotion
                    key={index}
                    delay={index * 0.05}
                    className="bg-black p-2 md:p-4 rounded-xl shadow-lg border border-[#fce4a6]/20 text-center"
                  >
                    <div className="text-[#fce4a6] mb-2">
                      <FiCheck className="w-4 h-4 md:w-5 md:h-5 mx-auto" />
                    </div>
                    <h3 className="text-[#fce4a6] font-bold text-xs md:text-sm">{feature.title}</h3>
                  </UltraLightMotion>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-8 px-4 bg-black">
            <div className="max-w-4xl mx-auto">
              <UltraLightMotion className="text-center mb-8">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-3 text-[#fce4a6]">Frequently Asked Questions</h2>
                <p className="text-white/80 text-sm md:text-base">Everything you need to know about our wedding services</p>
              </UltraLightMotion>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {faqs.map((faq, index) => (
                  <UltraLightMotion
                    key={index}
                    delay={index * 0.05}
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
                  </UltraLightMotion>
                ))}
              </div>
            </div>
          </section>

          {/* Trust/Guarantee Section */}
          <section className="py-8 px-4 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <UltraLightMotion className="bg-gradient-to-r from-black to-gray-800 rounded-xl p-4 md:p-6 text-white">
                <h2 className="text-lg md:text-2xl font-bold mb-2 text-[#fce4a6]">Professional & Reliable</h2>
                <p className="text-white/90 text-sm md:text-base mb-3">
                  Professional team with 100+ beautiful weddings hosted in Toronto. Fully insured & licensed.
                </p>
                <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#fce4a6]">100+</div>
                    <div className="text-white/80 text-xs md:text-sm">Weddings Hosted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#fce4a6]">100%</div>
                    <div className="text-white/80 text-xs md:text-sm">Happy Couples</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-[#fce4a6]">24/7</div>
                    <div className="text-white/80 text-xs md:text-sm">Support Available</div>
                  </div>
                </div>
              </UltraLightMotion>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-12 px-4 bg-black">
            <div className="max-w-4xl mx-auto text-center">
              <UltraLightMotion className="">
                <h2 className="text-3xl font-bold mb-3 text-[#fce4a6]">Ready to Make Your Wedding Unforgettable?</h2>
                <p className="text-white/90 text-base mb-6">
                  Get instant pricing and availability for your special day
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    trackBookingInquiry('Wedding', 'Toronto')
                    setShowLeadModal(true)
                  }}
                  className="bg-[#fce4a6] text-black px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all group"
                >
                  Book Now
                  <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </UltraLightMotion>
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
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Budget *</label>
                  <select
                    name="budget"
                    value={leadForm.budget}
                    onChange={handleLeadInput}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent"
                  >
                    <option value="">Select budget</option>
                    <option value="$1000-$1500">$1000-$1500 (Robot Photobooth)</option>
                    <option value="$1500-$2000">$1500-$2000 (Robot Photobooth & Bundle)</option>
                    <option value="$2000+">$2000+ (Premium Package)</option>
                  </select>
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

const benefits = [
  {
    icon: '💒',
    title: 'Wedding Perfect',
    description: 'Elegant photo experiences that match your wedding theme and style.'
  },
  {
    icon: '📸',
    title: 'Stunning Photos & Videos',
    description: 'Capture every magical moment with professional quality for your memories.'
  },
  {
    icon: '🤖',
    title: 'Interactive Robot Photobooth',
    description: 'A unique, engaging experience that wows your guests and creates lasting memories.'
  },
  {
    icon: '🎉',
    title: 'Perfect for Celebrations',
    description: 'Enhance your wedding reception and create unforgettable guest experiences.'
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
    title: 'Unlimited Photos & Videos + High-Resolution Prints',
    description: 'No limits on captures - every guest can enjoy the full experience with professional quality prints.'
  },
  {
    title: 'On-Site Attendant',
    description: 'Professional team member ensures smooth operation and guest assistance.'
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
  },
  {
    question: 'How long does the photobooth rental last?',
    answer: 'Our photobooth rentals have a 2-hour minimum and can be extended for however many hours you\'d like. Most couples choose 4-6 hours to capture all the fun moments throughout their celebration.'
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
  }
] 