import React, { useState, useEffect, useRef, useCallback } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiCheck, FiPhone, FiChevronDown, FiChevronUp, FiClock, FiUsers, FiCamera, FiImage, FiStar, FiZap, FiX, FiMonitor, FiBriefcase } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useMetaPixel } from '../hooks/useMetaPixel'
import { useUTM } from '../hooks/useUTM'

/* ─── Lazy Video ─── */
const LazyVideo = ({ src, className, onPlay }: { src: string; className: string; onPlay?: () => void }) => {
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const vidRef = useRef<HTMLVideoElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold: 0.1, rootMargin: '400px' })
    if (boxRef.current) obs.observe(boxRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (inView && vidRef.current) {
      const v = vidRef.current
      v.load()
      v.addEventListener('loadeddata', () => setLoaded(true))
      const t = setTimeout(() => { if (v.paused) v.play().catch(() => {}) }, 3000)
      return () => clearTimeout(t)
    }
  }, [inView])

  return (
    <div ref={boxRef} className="w-full">
      {inView ? (
        <video ref={vidRef} className={className} autoPlay={loaded} loop muted playsInline controls={false} preload="none" disablePictureInPicture onPlay={onPlay}>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className={`${className} bg-white/5 flex items-center justify-center`}>
          <div className="text-white/30 text-sm">Loading…</div>
        </div>
      )}
    </div>
  )
}

/* ─── Stagger wrapper ─── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay }} className={className}>
    {children}
  </motion.div>
)

/* ════════════════════════════════════════════════════════════════
   CORPORATE HEADSHOTS — "The Office Takeover"
   Professional Headshots · Team Photos · Brand Imagery
   ════════════════════════════════════════════════════════════════ */
export default function CorporateHeadshots() {
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [leadForm, setLeadForm] = useState({ firstName: '', email: '', phone: '', eventDate: '', budget: '', teamSize: '', eventType: 'Corporate Headshots' })
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const [leadSuccess, setLeadSuccess] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [urgencyDismissed, setUrgencyDismissed] = useState(false)

  const router = useRouter()
  const { trackLead, trackVideoView, trackBookingInquiry, trackPhoneClick } = useMetaPixel()
  const utmData = useUTM()

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { const t = setTimeout(() => setShowLeadModal(true), 25000); return () => clearTimeout(t) }, [])
  useEffect(() => { showLeadModal ? document.body.classList.add('overflow-hidden') : document.body.classList.remove('overflow-hidden'); return () => document.body.classList.remove('overflow-hidden') }, [showLeadModal])

  const openQuoteModal = useCallback(() => { trackBookingInquiry('Corporate Headshots', 'Toronto'); setShowLeadModal(true) }, [trackBookingInquiry])

  const handleLeadInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setLeadForm({ ...leadForm, [e.target.name]: e.target.value })

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLeadSubmitting(true)
    try {
      trackLead('Corporate Headshots Lead', 'Toronto', { fn: leadForm.firstName, em: leadForm.email, ph: leadForm.phone, ct: 'Toronto', country: 'CA', ...utmData })
      const fd = new FormData()
      fd.append('first-name', leadForm.firstName); fd.append('phone-number', leadForm.phone); fd.append('email', leadForm.email)
      fd.append('event-date', leadForm.eventDate); fd.append('budget', leadForm.budget); fd.append('event-type', 'Corporate Headshots')
      if (leadForm.teamSize) fd.append('team-size', leadForm.teamSize)
      fd.append('_replyto', leadForm.email); fd.append('source', 'Corporate Headshots Page')
      Object.entries(utmData).forEach(([k, v]) => { if (v) fd.append(k, v) })
      const res = await fetch('https://formspree.io/f/xkgoedyp', { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      if (res.ok) { setLeadSuccess(true); router.push('/thank-you') } else { alert('Failed to submit. Please try again.') }
    } catch { alert('Failed to submit. Please try again.') } finally { setLeadSubmitting(false) }
  }

  return (
    <>
      <div className={showLeadModal ? 'blur-sm pointer-events-none select-none' : ''}>
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <Head>
            <title>Corporate Headshots Toronto | Mobile Studio for Your Office | Robo Booth</title>
            <meta name="description" content="Elevate your team's professional image without leaving the office. Mobile professional studio, instant image review, creative art direction — we come to you across Toronto & GTA." />
            <meta name="keywords" content="corporate headshots Toronto, office headshot photography, team headshots GTA, professional headshot photographer, mobile headshot studio, corporate portrait photography" />
            <meta property="og:title" content="Corporate Headshots Toronto | Mobile Studio for Your Office | Robo Booth" />
            <meta property="og:description" content="We bring the studio to your workplace. Professional headshots with zero downtime." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://robobooth.ca/corporate-headshots" />
            <link rel="canonical" href="https://robobooth.ca/corporate-headshots" />
            <link rel="dns-prefetch" href="//formspree.io" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>

          {/* ── Fixed Header Stack ── */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <div className="bg-black/95 backdrop-blur-md border-b border-[#fce4a6]/20">
              <div className="max-w-7xl mx-auto px-4 py-2 md:py-2.5 flex justify-between items-center">
                <a href="/" className="flex-shrink-0">
                  <img src="/images/1.png" alt="Robo Booth" className="h-8 md:h-12 w-auto" />
                </a>
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="hidden lg:inline text-[#fce4a6]/80 text-xs font-medium">5.0 ★ Rating&ensp;|&ensp;Serving Toronto&apos;s Top Brands</span>
                  <button onClick={openQuoteModal} className="hidden md:inline-flex items-center gap-2 bg-[#fce4a6] text-black px-4 py-2 rounded-full font-bold text-xs hover:bg-white transition-colors">
                    Get a Quote <FiArrowRight className="w-3 h-3" />
                  </button>
                  <a href="tel:289-301-4039" onClick={() => trackPhoneClick('Headshots Header', 'Toronto')}
                    className="flex items-center gap-1.5 bg-[#fce4a6] text-black px-3 md:px-4 py-2 rounded-full font-bold text-xs md:text-sm hover:bg-white transition-colors">
                    <FiPhone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">289-301-4039</span>
                    <span className="sm:hidden">Call Now</span>
                  </a>
                </div>
              </div>
            </div>
            {!urgencyDismissed && (
              <div className="bg-[#fce4a6] text-black text-center py-2 px-4 border-b border-[#fce4a6]/40">
                <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold">
                  <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Q1 headshot sessions booking fast — <button onClick={openQuoteModal} className="underline font-bold">reserve your slot now</button></span>
                  <button onClick={() => setUrgencyDismissed(true)} className="ml-2 text-black/50 hover:text-black" aria-label="Dismiss"><FiX className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════
              HERO
             ═══════════════════════════════════════ */}
          <section className={`relative ${urgencyDismissed ? 'pt-16 md:pt-20' : 'pt-[6.5rem] md:pt-[7.5rem]'} pb-6 md:pb-10 px-4`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#fce4a620_0%,_transparent_50%)] pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-white/60 text-xs font-medium">5.0 Rating · The Office Takeover</span>
                  </div>

                  <h1 className="text-[1.65rem] leading-[1.15] md:text-4xl lg:text-5xl font-black md:leading-[1.1] mb-4">
                    Elevate Your Team&apos;s Professional Image{' '}
                    <span className="text-[#fce4a6]">Without Leaving the Office.</span>
                  </h1>

                  <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-5 max-w-xl">
                    We bring the studio to your workplace. A high-end, creative photography experience that captures your team&apos;s best side with zero downtime for your business.{' '}
                    <span className="text-white font-semibold">Professional. Efficient. Hassle-free.</span>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openQuoteModal}
                      className="w-full sm:w-auto bg-[#fce4a6] text-black px-6 py-3.5 md:px-7 md:py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group text-center">
                      Check Availability & Get a Quote <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <a href="tel:289-301-4039" onClick={() => trackPhoneClick('Headshots Hero', 'Toronto')}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#fce4a6]/40 text-[#fce4a6] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#fce4a6]/10 transition-all text-center">
                      <FiPhone className="w-4 h-4" /> Call 289-301-4039
                    </a>
                  </div>
                  <p className="text-white/40 text-[11px] md:text-xs">Responses in &lt;15 mins&ensp;|&ensp;No credit card required</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Mobile Professional Studio', 'Instant Image Review', 'Creative Art Direction', 'Uniform Brand Aesthetic'].map((t) => (
                      <span key={t} className="flex items-center gap-1.5 text-[10px] md:text-xs text-[#fce4a6]/90 bg-[#fce4a6]/10 border border-[#fce4a6]/20 rounded-full px-2.5 py-1">
                        <FiCheck className="w-3 h-3" /> {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Desktop hero images */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative hidden md:block">
                  <div className="grid grid-cols-2 gap-3">
                    <img src="/images/corporate1.JPG" alt="Corporate Headshot Session" className="w-full h-56 md:h-72 object-cover rounded-2xl" loading="eager" fetchPriority="high" />
                    <img src="/images/corporate3.jpeg" alt="Professional Headshots" className="w-full h-56 md:h-72 object-cover rounded-2xl mt-6" loading="eager" fetchPriority="high" />
                  </div>
                  <div className="absolute -bottom-3 left-4 bg-black/90 backdrop-blur-sm border border-[#fce4a6]/30 rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <div className="text-[#fce4a6] font-black text-xl">50+</div>
                    <div className="text-white/70 text-xs leading-tight">Companies photographed<br/>across Toronto &amp; GTA</div>
                  </div>
                </motion.div>

                {/* Mobile hero */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="md:hidden -mx-4">
                  <img src="/images/corporate1.JPG" alt="Corporate Headshots" className="w-full h-48 object-cover" loading="eager" fetchPriority="high" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Logo Marquee ── */}
          <section className="py-4 md:py-6 border-y border-[#fce4a6]/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-3">
              <p className="text-center text-[#fce4a6]/60 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase">Trusted by leading companies across Canada</p>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="animate-marquee flex items-center gap-10 md:gap-14 px-4">
                {[...companyLogos, ...companyLogos].map((logo, i) => (
                  <div key={i} className="flex-shrink-0 w-20 md:w-28 h-10 md:h-12 flex items-center justify-center">
                    <img src={logo} alt="Client" className={`max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity ${logo.includes('ritz.webp') || logo.includes('hilton.png') ? 'filter invert grayscale' : logo.includes('td.png') ? '' : 'filter brightness-0 invert'}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── How It Works — 3 Steps ── */}
          <section className="py-10 md:py-14 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">How It <span className="text-[#fce4a6]">Works</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Zero disruption to your workday</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {howItWorks.map((step, i) => (
                  <Reveal key={i} delay={i * 0.12} className="relative">
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 md:p-6 text-center hover:border-[#fce4a6]/30 transition-colors group h-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#fce4a6]/10 border border-[#fce4a6]/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#fce4a6]/20 transition-colors">
                        <span className="text-[#fce4a6] font-black text-lg md:text-xl">{i + 1}</span>
                      </div>
                      <h3 className="font-bold text-sm md:text-base mb-1.5 text-white">{step.title}</h3>
                      <p className="text-white/50 text-xs md:text-sm leading-relaxed">{step.desc}</p>
                    </div>
                    {i < 2 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-[#fce4a6]/30 text-2xl">→</div>}
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Video Section ── */}
          <section className="py-8 md:py-10 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">
                  See the <span className="text-[#fce4a6]">Office Takeover</span> in Action
                </h2>
                <p className="text-white/50 text-xs md:text-sm">Professional headshots, delivered at your workplace</p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="rounded-2xl overflow-hidden border border-white/10">
                  <LazyVideo src="/videos/corporateheadshot.MOV" className="w-full aspect-video object-cover" onPlay={() => trackVideoView('Corporate Headshots')} />
                </div>
              </Reveal>
              <Reveal delay={0.2} className="text-center mt-4">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openQuoteModal}
                  className="bg-[#fce4a6] text-black px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all group">
                  Book Your Team Session <FiArrowRight className="inline ml-1.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Reveal>
            </div>
          </section>

          {/* ── Features — Value Stack ── */}
          <section className="py-8 md:py-10 px-4">
            <div className="max-w-6xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Why Companies Choose <span className="text-[#fce4a6]">Our Headshot Service</span></h2>
                <p className="text-white/50 text-xs md:text-sm max-w-lg mx-auto">Professional imagery that reflects your company culture — without the logistics headache.</p>
              </Reveal>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4">
                {valueStack.map((item, i) => (
                  <Reveal key={i} delay={i * 0.06} className="bg-white/[0.04] border border-white/10 rounded-xl p-3.5 md:p-5 hover:border-[#fce4a6]/30 transition-colors group">
                    <div className="text-[#fce4a6] mb-2 md:mb-3 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                    <h3 className="font-bold text-xs md:text-base mb-0.5 md:mb-1">{item.title}</h3>
                    <p className="text-white/50 text-[10px] md:text-xs leading-relaxed">{item.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Dream Outcome ── */}
          <section className="py-8 md:py-10 px-4">
            <Reveal className="max-w-4xl mx-auto bg-gradient-to-r from-[#fce4a6]/10 to-transparent border border-[#fce4a6]/20 rounded-2xl p-5 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <h2 className="text-lg md:text-2xl font-black mb-2">A Cohesive, Modern <span className="text-[#fce4a6]">&ldquo;About Us&rdquo; Page</span></h2>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-4">
                    Your team&apos;s professional image says everything about your company culture. We create uniform, polished headshots that make your &ldquo;About Us&rdquo; page reflect the high-performing team you actually are.
                  </p>
                  <ul className="space-y-2">
                    {['Consistent look across all team members', 'Creative direction that matches your brand', 'LinkedIn-ready and website-optimized', 'Same-day delivery of edited files'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/80 text-xs md:text-sm">
                        <FiCheck className="text-[#fce4a6] w-3.5 h-3.5 mt-0.5 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img src="/images/corporate2.jpg" alt="Corporate Headshot Results" className="w-full h-48 md:h-64 object-cover rounded-xl" loading="lazy" />
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── Mid-page CTA ── */}
          <section className="py-6 md:py-8 px-4">
            <Reveal className="max-w-3xl mx-auto text-center bg-gradient-to-r from-[#fce4a6]/10 to-transparent border border-[#fce4a6]/20 rounded-2xl p-5 md:p-8">
              <h2 className="text-lg md:text-2xl font-black mb-1.5">Ready to Upgrade Your Team&apos;s Image?</h2>
              <p className="text-white/60 text-xs md:text-sm mb-4">Get a per-person quote in minutes — we handle teams of any size.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openQuoteModal}
                  className="w-full sm:w-auto bg-[#fce4a6] text-black px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all group">
                  Check Availability & Get a Quote <FiArrowRight className="inline ml-1.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <a href="tel:289-301-4039" onClick={() => trackPhoneClick('Headshots Mid CTA', 'Toronto')}
                  className="flex items-center gap-2 text-[#fce4a6] text-sm font-semibold hover:text-white transition-colors">
                  <FiPhone className="w-4 h-4" /> Or call: 289-301-4039
                </a>
              </div>
              <p className="text-white/30 text-[10px] md:text-xs mt-2">Responses in &lt;15 mins&ensp;|&ensp;No credit card required</p>
            </Reveal>
          </section>

          {/* ── Testimonials ── */}
          <section className="py-8 md:py-10 px-4">
            <div className="max-w-6xl mx-auto">
              <Reveal className="text-center mb-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">What HR &amp; Marketing Teams <span className="text-[#fce4a6]">Say</span></h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <a href="https://g.co/kgs/v9p1CzT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#fce4a6] hover:text-white transition-colors text-xs md:text-sm">
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    <span className="text-yellow-400 text-xs md:text-sm">★★★★★</span>
                    <span className="text-white/50 text-[10px] md:text-xs">5.0 on Google</span>
                  </a>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {testimonials.map((t, i) => (
                  <Reveal key={i} delay={i * 0.08} className="bg-gradient-to-br from-[#fce4a6]/15 to-transparent border border-[#fce4a6]/20 rounded-xl p-4 md:p-5">
                    <div className="text-[#fce4a6] text-xl md:text-2xl mb-1.5">&ldquo;</div>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-2.5">{t.text}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#fce4a6]/20 flex items-center justify-center text-[#fce4a6] text-[10px] md:text-xs font-bold">{t.name[0]}</div>
                      <div>
                        <div className="text-white text-[10px] md:text-xs font-bold">{t.name}</div>
                        <div className="text-white/40 text-[10px] md:text-xs">{t.role}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Package Includes ── */}
          <section className="py-6 md:py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <Reveal className="text-center mb-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Everything <span className="text-[#fce4a6]">Included</span></h2>
                <p className="text-white/50 text-xs md:text-sm">One flat rate. No hidden fees. We handle everything.</p>
              </Reveal>
              <Reveal delay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                {packageIncludes.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white/[0.04] border border-white/10 rounded-xl p-3">
                    <FiCheck className="text-[#fce4a6] w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-white/80 text-[10px] md:text-sm font-medium">{item}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="py-6 md:py-8 px-4">
            <div className="max-w-3xl mx-auto">
              <Reveal className="text-center mb-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Common <span className="text-[#fce4a6]">Questions</span></h2>
              </Reveal>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full text-left bg-white/[0.04] border border-white/10 rounded-xl p-3.5 md:p-4 hover:border-[#fce4a6]/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-xs md:text-base text-white/90 pr-4">{faq.question}</h3>
                        {expandedFaq === i ? <FiChevronUp className="text-[#fce4a6] w-4 h-4 flex-shrink-0" /> : <FiChevronDown className="text-[#fce4a6] w-4 h-4 flex-shrink-0" />}
                      </div>
                      <AnimatePresence>
                        {expandedFaq === i && (
                          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-white/60 text-xs md:text-sm mt-2 leading-relaxed">
                            {faq.answer}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </button>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Trust Bar ── */}
          <section className="py-5 md:py-6 px-4">
            <Reveal className="max-w-4xl mx-auto bg-white/[0.04] border border-white/10 rounded-2xl p-4 md:p-6">
              <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
                <div>
                  <div className="text-xl md:text-3xl font-black text-[#fce4a6]">50+</div>
                  <div className="text-white/50 text-[10px] md:text-xs">Companies Served</div>
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-[#fce4a6]">2,000+</div>
                  <div className="text-white/50 text-[10px] md:text-xs">Headshots Delivered</div>
                </div>
                <div>
                  <div className="text-xl md:text-3xl font-black text-[#fce4a6]">5.0★</div>
                  <div className="text-white/50 text-[10px] md:text-xs">Google Rating</div>
                </div>
              </div>
            </Reveal>
          </section>

          {/* ── Final CTA ── */}
          <section className="py-8 md:py-10 px-4">
            <Reveal className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-black mb-2 md:mb-3">
                Your Team Deserves <span className="text-[#fce4a6]">Professional Imagery.</span>
              </h2>
              <p className="text-white/60 text-xs md:text-sm lg:text-base mb-4 md:mb-5 max-w-lg mx-auto">
                Join 50+ companies who upgraded their professional image with our mobile headshot studio. Zero downtime. Maximum impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openQuoteModal}
                  className="w-full sm:w-auto bg-[#fce4a6] text-black px-7 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group">
                  Check Availability & Get a Quote <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <a href="tel:289-301-4039" onClick={() => trackPhoneClick('Headshots Final CTA', 'Toronto')}
                  className="flex items-center gap-2 text-[#fce4a6] text-sm font-semibold hover:text-white transition-colors">
                  <FiPhone className="w-4 h-4" /> 289-301-4039
                </a>
              </div>
              <p className="text-white/30 text-[10px] md:text-xs mt-2">Responses in &lt;15 mins&ensp;|&ensp;No credit card required</p>
            </Reveal>
          </section>

          <div className="h-20 md:h-16" />
        </div>
      </div>

      {/* ── Lead Modal ── */}
      <AnimatePresence>
        {showLeadModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-md p-0 md:p-4">
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
              className="bg-white rounded-t-2xl md:rounded-2xl p-5 md:p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowLeadModal(false)} className="absolute top-3 right-4 text-black/40 hover:text-black text-2xl" aria-label="Close">×</button>
              <h2 className="text-lg md:text-2xl font-black text-black mb-1 text-center">Get Your Headshot Session Quote</h2>
              <p className="text-black/60 text-xs md:text-sm mb-4 md:mb-5 text-center">We&apos;ll respond within 15 minutes with a custom package for your team.</p>
              {leadSuccess ? (
                <div className="text-green-600 text-center font-bold py-6">Thank you! We&apos;ll be in touch soon.</div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-2.5 md:space-y-3">
                  <input type="text" name="firstName" value={leadForm.firstName} onChange={handleLeadInput} required placeholder="First Name *"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none" />
                  <input type="tel" name="phone" value={leadForm.phone} onChange={handleLeadInput} required placeholder="Phone Number *"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none" />
                  <input type="email" name="email" value={leadForm.email} onChange={handleLeadInput} required placeholder="Work Email *"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none" />
                  <select name="teamSize" value={leadForm.teamSize} onChange={handleLeadInput} required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none text-black">
                    <option value="">Team Size *</option>
                    <option value="1-10">1–10 people</option>
                    <option value="11-25">11–25 people</option>
                    <option value="26-50">26–50 people</option>
                    <option value="50+">50+ people</option>
                  </select>
                  <input type="date" name="eventDate" value={leadForm.eventDate} onChange={handleLeadInput} required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none" />
                  <button type="submit" disabled={leadSubmitting}
                    className="w-full bg-[#fce4a6] text-black py-3.5 rounded-xl font-bold text-sm hover:bg-[#e8d08e] transition-colors">
                    {leadSubmitting ? 'Sending…' : 'Get My Team Quote →'}
                  </button>
                  <p className="text-center text-black/30 text-[10px]">No spam. We respond within 15 minutes during business hours.</p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky CTA ── */}
      <AnimatePresence>
        {!showLeadModal && showStickyBar && (
          <>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-[#fce4a6]/30 px-3 py-3 safe-area-pb">
              <div className="flex gap-2">
                <a href="tel:289-301-4039" onClick={() => trackPhoneClick('Mobile Sticky', 'Toronto')}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-[#fce4a6]/30 text-[#fce4a6] py-3 rounded-full font-bold text-sm">
                  <FiPhone className="w-4 h-4" /> Call Now
                </a>
                <button onClick={openQuoteModal}
                  className="flex-[2] flex items-center justify-center gap-2 bg-[#fce4a6] text-black py-3 rounded-full font-bold text-sm shadow-lg shadow-[#fce4a6]/20">
                  Get a Quote <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            <motion.button initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openQuoteModal}
              className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-3.5 rounded-full shadow-xl shadow-black/40 hover:bg-white transition-colors text-sm items-center gap-2">
              Check Availability <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── DATA ─── */
const howItWorks = [
  { title: 'You Book', desc: 'Tell us your team size, preferred date, and any brand guidelines. We plan the entire session for you.' },
  { title: 'We Show Up', desc: 'Our mobile studio arrives at your office with professional lighting, backdrops, and a creative director. Setup takes 30 minutes.' },
  { title: 'Your Team Is Wow\'d', desc: 'Each team member gets a 10-minute session with instant review. Edited files delivered the same day.' },
]

const valueStack = [
  { icon: <FiBriefcase className="w-5 h-5 md:w-6 md:h-6" />, title: 'Mobile Professional Studio', desc: 'We bring studio-grade equipment to your office — lighting, backdrops, and everything needed for perfect headshots.' },
  { icon: <FiMonitor className="w-5 h-5 md:w-6 md:h-6" />, title: 'Instant Image Review', desc: 'Every team member reviews and approves their shot on the spot. No waiting for proofs or back-and-forth emails.' },
  { icon: <FiStar className="w-5 h-5 md:w-6 md:h-6" />, title: 'Creative Art Direction', desc: 'Our photographers guide every pose and expression — even camera-shy team members look incredible.' },
  { icon: <FiImage className="w-5 h-5 md:w-6 md:h-6" />, title: 'Uniform Brand Aesthetic', desc: 'Consistent lighting, backgrounds, and editing style so your entire team looks cohesive across all platforms.' },
  { icon: <FiZap className="w-5 h-5 md:w-6 md:h-6" />, title: 'Same-Day Delivery', desc: 'Professionally edited, high-resolution files delivered the same day — ready for LinkedIn, your website, and marketing materials.' },
  { icon: <FiCamera className="w-5 h-5 md:w-6 md:h-6" />, title: 'Zero Downtime', desc: 'Each session takes only 10 minutes per person. Your team barely leaves their desk — maximum efficiency.' },
]

const packageIncludes = [
  'Professional Photographer & Director',
  'Mobile Studio Setup at Your Office',
  'Studio-Grade Lighting & Backdrops',
  'Instant On-Set Image Review',
  'Professional Retouching & Color Grading',
  'High-Resolution Digital Files',
  'Multiple Background Options',
  'LinkedIn & Website-Optimized Crops',
  'Same-Day File Delivery',
]

const faqs = [
  { question: 'How long does each person\'s session take?', answer: 'About 10 minutes per person. We work efficiently so your team experiences minimal disruption. For a team of 20, plan for about 3-4 hours total including setup.' },
  { question: 'Do you handle everything or do we need to prepare?', answer: 'We handle everything — equipment, setup, art direction, and editing. Just book a room or open area in your office and we bring the rest.' },
  { question: 'Can you match our existing brand guidelines?', answer: 'Absolutely. Send us your brand guidelines and we\'ll match background colors, lighting mood, and editing style to ensure a uniform aesthetic across your team.' },
  { question: 'How many final photos does each person receive?', answer: 'Each person receives 2-3 professionally retouched options in multiple crops (portrait, square, landscape) optimized for LinkedIn, your website, and email signatures.' },
  { question: 'What if someone is camera-shy?', answer: 'Our photographers are experts at making people feel comfortable. With professional art direction and a relaxed atmosphere, even the most camera-shy team members end up loving their headshots.' },
  { question: 'Can you photograph large teams (100+)?', answer: 'Absolutely. We\'ve photographed teams of all sizes. For larger teams, we can bring multiple setups to run parallel sessions and complete the shoot faster.' },
]

const testimonials = [
  { name: 'Amanda T.', role: 'HR Director, Tech Company', text: 'Our entire team of 40 was photographed in a single afternoon. The quality was phenomenal and everyone loved their shots. Best investment we\'ve made in our brand.' },
  { name: 'David P.', role: 'Marketing Lead, Financial Services', text: 'The consistency across all headshots was incredible. Our website and LinkedIn profiles finally look cohesive and professional. Clients have commented on how polished we look.' },
  { name: 'Rachel M.', role: 'Office Manager, Law Firm', text: 'They set up, photographed 25 people, and cleaned up with zero disruption to our workday. The results were stunning — way better than the studio we used before.' },
]

const companyLogos = [
  '/images/adamas.png', '/images/bell.png', '/images/bgo.png', '/images/equifax.svg',
  '/images/geotab.png', '/images/hilton.png', '/images/infosys.png', '/images/meta.png',
  '/images/pdsb.png', '/images/remax.png', '/images/ritz.webp', '/images/rlp.svg',
  '/images/stonex.png', '/images/talent.png', '/images/td.png', '/images/torontopearson.png',
]




