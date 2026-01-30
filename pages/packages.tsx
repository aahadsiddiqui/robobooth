import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import CornerNav from '../components/CornerNav'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useMetaPixel } from '../hooks/useMetaPixel'
import { useUTM } from '../hooks/useUTM'

// Testimonials Data
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
    }, 6000)
    return () => clearInterval(timer)
  }, [])
  const testimonial = testimonials[index]
  return (
    <div className="relative h-[300px] md:h-[250px] w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-2xl"
        >
          <div className="text-5xl text-[#fce4a6] opacity-30 absolute top-6 left-8 font-serif">"</div>
          <p className="text-white text-lg md:text-2xl font-light mb-6 leading-relaxed">
            {testimonial.text}
          </p>
          <div className="text-[#fce4a6] font-medium tracking-wide uppercase text-sm">
            {testimonial.title} <span className="text-white/40 mx-2">|</span> {testimonial.company}
          </div>
        </motion.div>
      </AnimatePresence>
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

export default function Packages() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [active, setActive] = useState(false)

  // Image State
  const [activeRoboImage, setActiveRoboImage] = useState(0)
  const [active360Image, setActive360Image] = useState(0)
  const [activeAerialImage, setActiveAerialImage] = useState(0)
  const [activePremiumImage, setActivePremiumImage] = useState(0)

  const roboImages = ['robo-booth-1.jpg', 'robo-booth-2.jpg']
  const booth360Images = ['360-booth-main.jpg']
  const aerialImages = ['aerial-booth-1.png', 'aerial-booth-2.png']
  const premiumImages = ['premium-booth.jpg']

  const [showOfferModal, setShowOfferModal] = useState(false)
  const [offerForm, setOfferForm] = useState({
    firstName: '',
    phone: '',
    email: '',
    eventDate: '',
    eventType: '',
    budget: ''
  })
  const [offerSubmitting, setOfferSubmitting] = useState(false)
  const [offerSuccess, setOfferSuccess] = useState(false)
  const router = useRouter()
  const { trackFormSubmission } = useMetaPixel()
  const utmData = useUTM()

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

  const handleSwipe = (direction: 'left' | 'right', type: 'robo' | '360' | 'aerial' | 'premium') => {
    handleImageChange(direction === 'left' ? 'next' : 'prev', type)
  }
  const handleImageChange = (direction: 'prev' | 'next', type: 'robo' | '360' | 'aerial' | 'premium') => {
    const images = type === 'robo' ? roboImages : type === '360' ? booth360Images : type === 'aerial' ? aerialImages : premiumImages
    const currentIndex = type === 'robo' ? activeRoboImage : type === '360' ? active360Image : type === 'aerial' ? activeAerialImage : activePremiumImage
    const setActiveImage = type === 'robo' ? setActiveRoboImage : type === '360' ? setActive360Image : type === 'aerial' ? setActiveAerialImage : setActivePremiumImage

    if (images.length <= 1) return

    const newIndex = direction === 'next'
      ? (currentIndex + 1) % images.length
      : (currentIndex - 1 + images.length) % images.length

    setActiveImage(newIndex)
  }

  const handleOfferInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOfferForm({ ...offerForm, [e.target.name]: e.target.value })
  }

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOfferSubmitting(true)

    // Track form submission with user data
    trackFormSubmission('Packages Offer Form', 'Toronto', {
      fn: offerForm.firstName,
      ph: offerForm.phone,
      em: offerForm.email,
      ct: 'Toronto',
      country: 'CA',
      ...utmData
    })

    try {
      const formData = new FormData()
      formData.append('first-name', offerForm.firstName)
      formData.append('phone-number', offerForm.phone)
      formData.append('_replyto', offerForm.email)
      formData.append('event-date', offerForm.eventDate)
      formData.append('event-type', offerForm.eventType)
      formData.append('budget', offerForm.budget)

      // Add UTM parameters
      console.log('Adding UTM parameters to Packages form:', utmData)
      Object.entries(utmData).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value)
          console.log(`Added UTM param: ${key} = ${value}`)
        }
      })

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
    <div className="min-h-screen w-full bg-black text-white selection:bg-[#fce4a6] selection:text-black">
      <Head>
        <title>Packages | Robot Photobooth & 360 Photo Booth Toronto</title>
        <meta name="description" content="Premium robot photobooth and 360 photo booth packages for events in Toronto and GTA. Elevate your wedding, corporate event, or party." />
      </Head>

      <CornerNav active={active} setActive={setActive} />

      <main className="pt-32 pb-24 px-4 md:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#fce4a6] via-[#fff] to-[#fce4a6]">
              Premium Experiences
            </span>
          </h1>
          <p className="text-white/60 text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
            Elevate your event with Canada's most advanced interactive entertainment.
          </p>
        </motion.div>

        {/* Robo Booth Section */}
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRoboImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={`/images/${roboImages[activeRoboImage]}`}
                      alt="Robot Photobooth"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4">
                  <button
                    onClick={() => handleImageChange('prev', 'robo')}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white border border-white/20"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <div className="flex gap-2">
                    {roboImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === activeRoboImage ? 'bg-[#fce4a6] w-6' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => handleImageChange('next', 'robo')}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white border border-white/20"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                The <span className="text-[#fce4a6]">Robo Booth</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                A roaming photography experience that comes to your guests. Our robot interacts, snaps photos, and delivers instant prints and digital shares, creating a buzz that traditional booths simply can't match.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  'Roaming Interaction',
                  'DSLR Quality Photos',
                  'Instant Printing',
                  'Personalized Voice Customization',
                  'Custom Branding',
                  'Social Sharing'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#fce4a6]/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#fce4a6]/10 flex items-center justify-center text-[#fce4a6]">
                      <FiCheck size={16} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#fce4a6] text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-[#fff] transition-colors shadow-[0_0_20px_rgba(252,228,166,0.3)]"
                >
                  Book Robo Booth
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 360 Booth Section */}
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center lg:grid-flow-col-dense">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-start-2"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active360Image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-neutral-900"
                  >
                    <Image
                      src={`/images/${booth360Images[active360Image]}`}
                      alt="360 Photo Booth"
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4">
                  <button
                    onClick={() => handleImageChange('prev', '360')}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white border border-white/20"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <div className="flex gap-2">
                    {booth360Images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === active360Image ? 'bg-[#fce4a6] w-6' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => handleImageChange('next', '360')}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white border border-white/20"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-start-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                The <span className="text-[#fce4a6]">360° Experience</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Capture every angle in stunning high-definition slow motion. Guests step onto the platform, and our camera orbits them to create music-video quality content ready for instant viral sharing.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  '4K Video Capture',
                  'Slow Motion Effects',
                  'RGB LED Platform',
                  'Instant AirDrop',
                  'Custom Overlays',
                  'Music Integration'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#fce4a6]/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#fce4a6]/10 flex items-center justify-center text-[#fce4a6]">
                      <FiCheck size={16} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent border-2 border-[#fce4a6] text-[#fce4a6] px-10 py-5 rounded-full text-lg font-bold hover:bg-[#fce4a6] hover:text-black transition-all"
                >
                  Book 360° Booth
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Aerial Booth Section */}
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAerialImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={`/images/${aerialImages[activeAerialImage]}`}
                      alt="Aerial Booth"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4">
                  <button
                    onClick={() => handleImageChange('prev', 'aerial')}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white border border-white/20"
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <div className="flex gap-2">
                    {aerialImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === activeAerialImage ? 'bg-[#fce4a6] w-6' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => handleImageChange('next', 'aerial')}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white border border-white/20"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                The <span className="text-[#fce4a6]">Aerial Booth</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Capture unique high-angle moments with photos, videos, and GIFs. This unique booth offers a fresh perspective that makes every shot stand out.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  'High Angle Shots',
                  'Instant Printing',
                  'QR Code Sharing',
                  'AirDrop Support',
                  'Text Sharing',
                  'Custom Branding'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#fce4a6]/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#fce4a6]/10 flex items-center justify-center text-[#fce4a6]">
                      <FiCheck size={16} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#fce4a6] text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-[#fff] transition-colors shadow-[0_0_20px_rgba(252,228,166,0.3)]"
                >
                  Book Aerial Booth
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Premium Photobooth Section */}
        <section className="max-w-7xl mx-auto mb-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center lg:grid-flow-col-dense">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-start-2"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePremiumImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={`/images/${premiumImages[activePremiumImage]}`}
                      alt="Premium Photobooth"
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Overlay - Only show if more than 1 image */}
                {premiumImages.length > 1 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4">
                    <button
                      onClick={() => handleImageChange('prev', 'premium')}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white border border-white/20"
                    >
                      <FiChevronLeft size={24} />
                    </button>
                    <div className="flex gap-2">
                      {premiumImages.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${idx === activePremiumImage ? 'bg-[#fce4a6] w-6' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => handleImageChange('next', 'premium')}
                      className="p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white border border-white/20"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-start-1"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                The <span className="text-[#fce4a6]">Premium Booth</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Experience studio-quality photography with our premium setup. Featuring DSLR cameras, professional lighting, and a red carpet experience that makes every guest feel like a star.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {[
                  'DSLR Quality Photos',
                  'Instant Prints',
                  'Red Carpet Setup',
                  'Gold Stanchions',
                  'Premium Props',
                  'Black/White Backdrop'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#fce4a6]/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#fce4a6]/10 flex items-center justify-center text-[#fce4a6]">
                      <FiCheck size={16} />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent border-2 border-[#fce4a6] text-[#fce4a6] px-10 py-5 rounded-full text-lg font-bold hover:bg-[#fce4a6] hover:text-black transition-all"
                >
                  Book Premium Booth
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Common Questions</h2>
            <p className="text-white/50">Everything you need to know about our services</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-medium text-white/90">{faq.question}</span>
                  <FiChevronLeft
                    className={`w-5 h-5 text-[#fce4a6] transition-transform duration-300 ${openFaq === index ? '-rotate-90' : 'rotate-180'}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-white/60 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-24">
          <TestimonialCarousel />
        </section>

        {/* Offer Modal */}
        <AnimatePresence>
          {showOfferModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowOfferModal(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative z-10"
              >
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Unlock Exclusive Pricing</h2>
                  <p className="text-white/50 text-sm">Fill out the form below and we'll send you a custom quote within 24 hours.</p>
                </div>

                {offerSuccess ? (
                  <div className="text-[#fce4a6] text-center font-bold py-12 text-xl">
                    <div className="w-16 h-16 rounded-full bg-[#fce4a6]/10 flex items-center justify-center mx-auto mb-4 text-[#fce4a6]">
                      <FiCheck size={32} />
                    </div>
                    Request Received! <br /> <span className="text-white/60 text-base font-normal">We'll be in touch shortly.</span>
                  </div>
                ) : (
                  <form onSubmit={handleOfferSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={offerForm.firstName}
                          onChange={handleOfferInput}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={offerForm.phone}
                          onChange={handleOfferInput}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={offerForm.email}
                        onChange={handleOfferInput}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">Date</label>
                        <input
                          type="date"
                          name="eventDate"
                          value={offerForm.eventDate}
                          onChange={handleOfferInput}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">Type</label>
                        <select
                          name="eventType"
                          value={offerForm.eventType}
                          onChange={handleOfferInput}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none transition-all appearance-none"
                        >
                          <option value="" className="bg-black">Select Type</option>
                          <option value="Corporate" className="bg-black">Corporate</option>
                          <option value="Wedding" className="bg-black">Wedding</option>
                          <option value="Party" className="bg-black">Party</option>
                          <option value="Other" className="bg-black">Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 mb-1 uppercase tracking-wider">Budget</label>
                      <select
                        name="budget"
                        value={offerForm.budget}
                        onChange={handleOfferInput}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none transition-all appearance-none"
                      >
                        <option value="" className="bg-black">Select Budget Range</option>
                        <option value="$1000-$1500" className="bg-black">$1000-$1500</option>
                        <option value="$1500-$2000" className="bg-black">$1500-$2000</option>
                        <option value="$2000+" className="bg-black">$2000+</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#fce4a6] text-black py-4 rounded-xl font-bold hover:bg-white transition-colors mt-4"
                      disabled={offerSubmitting}
                    >
                      {offerSubmitting ? 'Processing...' : 'Get Custom Quote'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Sticky Get Offer Button */}
        <AnimatePresence>
          {!showOfferModal && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setShowOfferModal(true)}
              className="fixed bottom-8 right-8 z-40 bg-[#fce4a6] text-black font-bold px-8 py-4 rounded-full shadow-[0_0_30px_rgba(252,228,166,0.3)] hover:bg-white transition-all text-lg hover:scale-105 active:scale-95"
            >
              Get Quote
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
} 