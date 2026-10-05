import React, { useState, useEffect, useCallback, useRef } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiPhone, FiChevronDown, FiChevronUp, FiClock, FiX, FiVideo, FiMic, FiMapPin, FiUsers, FiStar, FiHeart, FiShare2, FiImage, FiCheck, FiZap, FiSmile } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import PackageCardsGrid from '../components/PackageCardsGrid'
import SteppedQuoteModal from '../components/SteppedQuoteModal'
import { photoGuestbookBundleTiers } from '../data/packageTiers'

/* ─── Reveal ─── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay }} className={className}>
    {children}
  </motion.div>
)

/* ─── CTA Block (reused between sections) ─── */
const SubtleCTA = ({ label, onQuote }: { label: string; onQuote: () => void }) => (
  <div className="flex justify-center pt-4 pb-2">
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onQuote}
      className="bg-[#fce4a6] text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#fce4a6]/20 hover:shadow-lg transition-all group">
      {label} <FiArrowRight className="inline ml-1.5 group-hover:translate-x-1 transition-transform" />
    </motion.button>
  </div>
)

/* Hero video — the guestbook clip itself, no poster thumbnail */
const HeroAutoplayVideo = ({ className }: { className: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [soundOn, setSoundOn] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    let cancelled = false

    const start = () => {
      if (cancelled) return
      video.defaultMuted = true
      video.muted = true
      video.volume = 0
      const attempt = video.play()
      if (attempt) attempt.catch(() => {})
    }

    if (video.readyState >= 2) start()
    else video.addEventListener('canplay', start)

    return () => {
      cancelled = true
      video.removeEventListener('canplay', start)
    }
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !soundOn
    video.muted = !next
    video.volume = next ? 1 : 0
    setSoundOn(next)
    const attempt = video.play()
    if (attempt) attempt.catch(() => {})
  }

  return (
    <div className="relative h-full">
      <video
        ref={videoRef}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ display: 'block' }}
      >
        <source src="/videos/robot-video-guestbook-hero.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white border border-white/20 hover:bg-black"
      >
        {soundOn ? 'Sound on' : 'Tap for sound'}
      </button>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   PHOTOBOOTH + GUESTBOOK — Ad landing at /robot-photobooth-guestbook
   ════════════════════════════════════════════════════════════════ */
export default function PhotoGuestbookBundlePage() {
  const [showModal, setShowModal] = useState(false)
  const [packageType, setPackageType] = useState<'bronze' | 'gold' | 'platinum' | ''>('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showSticky, setShowSticky] = useState(false)
  const [urgencyDismissed, setUrgencyDismissed] = useState(false)

  useEffect(() => {
    const fn = () => setShowSticky(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { const t = setTimeout(() => setShowModal(true), 25000); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const handlePlay = (e: Event) => {
      const current = e.target as HTMLVideoElement
      if (current.muted) return
      document.querySelectorAll('video').forEach(v => { if (v !== current) v.pause() })
    }
    document.addEventListener('play', handlePlay, true)
    return () => document.removeEventListener('play', handlePlay, true)
  }, [])

  const openQuote = useCallback(() => { setPackageType(''); setShowModal(true) }, [])
  const openGoldPackage = useCallback(() => { setPackageType('gold'); setShowModal(true) }, [])
  const openPlatinumPackage = useCallback(() => { setPackageType('platinum'); setShowModal(true) }, [])

  const modalTitle =
    packageType === 'gold' ? 'Book Gold Package' :
    packageType === 'platinum' ? 'Book Platinum Package' :
    'Reserve the Photobooth + Guestbook Bundle'

  const packageLabel =
    packageType === 'gold' ? 'Gold Package (Robot Photobooth + Robot Video Guestbook)' :
    packageType === 'platinum' ? 'Platinum Package (Multiple Robot Photobooths + Robot Video Guestbooks)' :
    'General Inquiry'

  const packageBanner = (
    <>
      {packageType === 'gold' && (
        <div className="bg-[#fce4a6] rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">⭐ Gold Package Selected</span>
          <span className="text-black/60 text-[10px]">Robot Photobooth + Robot Video Guestbook</span>
        </div>
      )}
      {packageType === 'platinum' && (
        <div className="bg-gradient-to-r from-white/95 to-gray-100 border border-gray-300 rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">💎 Platinum Package Selected</span>
          <span className="text-black/60 text-[10px]">Multiple Robot Photobooths + Robot Video Guestbooks</span>
        </div>
      )}
    </>
  )

  return (
    <>
      <Head>
        <title>Robot Photobooth + Video Guestbook Bundle | Toronto GTA | Robo Booth</title>
        <meta name="description" content="Book the Robot Photobooth and Robot Video Guestbook together. Studio photos and instant prints the night of your event, plus personal video messages we compile and send to you so you can see what your guests left." />
        <meta name="keywords" content="robot photobooth video guestbook bundle, robot photobooth Toronto, robot video guestbook GTA, wedding photo and video guestbook, birthday robot photobooth" />
        <meta property="og:title" content="Robot Photobooth + Video Guestbook Bundle | Robo Booth" />
        <meta property="og:description" content="Photos they take home tonight. Messages they'll watch for years. Two roaming robots, one booking." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:url" content="https://robobooth.ca/robot-photobooth-guestbook" />
        <meta property="og:image" content="https://robobooth.ca/images/robot1.jpg" />
        <link rel="canonical" href="https://robobooth.ca/robot-photobooth-guestbook" />
        <link rel="dns-prefetch" href="//formspree.io" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={showModal ? 'blur-sm pointer-events-none select-none' : ''}>
        <div className="min-h-screen bg-black text-white overflow-x-hidden">

          <Navbar />

          {/* ── Urgency Banner ── */}
          {!urgencyDismissed && (
            <div className="fixed top-16 md:top-[4.5rem] left-0 right-0 z-40 bg-[#fce4a6] text-black text-center py-2 px-4">
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold">
                <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Weekend dates filling fast — <button onClick={openQuote} className="underline font-bold">lock yours in now</button></span>
                <button onClick={() => setUrgencyDismissed(true)} className="ml-2 text-black/50 hover:text-black"><FiX className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
              HERO
             ═══════════════════════════════════════ */}
          <section className={`relative ${urgencyDismissed ? 'pt-20 md:pt-24' : 'pt-[7rem] md:pt-[8rem]'} pb-6 md:pb-8 px-4`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#fce4a620_0%,_transparent_50%)] pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-white/60 text-xs font-medium">5.0 Rating · Photobooth + Video Guestbook</span>
                  </div>
                  <h1 className="text-[1.65rem] leading-[1.15] md:text-4xl lg:text-5xl font-black md:leading-[1.1] mb-4">
                    The Robot Photobooth and Video Guestbook,{' '}
                    <span className="text-[#fce4a6]">Together.</span>
                  </h1>
                  <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-5 max-w-xl">
                    One robot roams for studio-quality photos, instant prints, and digital copies. The other collects personal video messages against the atmosphere of your event — we compile them and send them to you, so you can see what your guests left about you.{' '}
                    <span className="text-white font-semibold">We handle both. You take the credit.</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openGoldPackage}
                      className="w-full sm:w-auto bg-[#fce4a6] text-black px-6 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group text-center">
                      Book Both Robots <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <a href="tel:289-301-4039" className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#fce4a6]/40 text-[#fce4a6] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#fce4a6]/10 transition-all text-center">
                      <FiPhone className="w-4 h-4" /> Call 289-301-4039
                    </a>
                  </div>
                  <p className="text-white/40 text-[11px] md:text-xs">Responses in &lt;15 mins&ensp;|&ensp;No credit card required</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="grid grid-cols-2 gap-3">
                  <div>
                    <img src="/images/robot1.jpg" alt="Robot Photobooth roaming an event" className="w-full h-56 sm:h-72 lg:h-[460px] object-cover rounded-2xl border border-white/10 shadow-2xl" loading="eager" fetchPriority="high" />
                    <p className="text-white/40 text-[10px] md:text-xs text-center mt-2">Robot Photobooth</p>
                  </div>
                  <div>
                    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black h-56 sm:h-72 lg:h-[460px]">
                      <HeroAutoplayVideo className="w-full h-full object-cover" />
                    </div>
                    <p className="text-white/40 text-[10px] md:text-xs text-center mt-2">Robot Video Guestbook</p>
                  </div>
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
                  <div key={i} className="flex-shrink-0 w-32 md:w-44 h-20 md:h-24 flex items-center justify-center">
                    <img src={logo} alt="Client" className={`w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity ${logo.includes('ritz.webp') || logo.includes('hilton.png') ? 'filter invert grayscale' : logo.includes('tdsynnex.png') || logo.includes('carmichael.png') || logo.includes('siemens.png') || logo.includes('alphawave.png') || logo.includes('newmarket.png') ? 'filter invert grayscale brightness-150' : logo.includes('td.png') ? '' : 'filter brightness-0 invert'}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── See Both in Action ── */}
          <section className="py-8 md:py-10 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">See Both Robots <span className="text-[#fce4a6]">in Action</span></h2>
                <p className="text-white/50 text-xs md:text-sm">The photobooth roams for photos. The guestbook captures real guest messages — turn the sound on.</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 md:items-start">
                <Reveal>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black md:aspect-[9/16]">
                    <video className="w-full h-auto md:h-full md:object-cover" autoPlay loop muted playsInline controls={false} preload="metadata" style={{ display: 'block' }}>
                      <source src="/videos/robot.mov" type="video/quicktime" />
                      <source src="/videos/robot.mov" type="video/mp4" />
                    </video>
                  </div>
                  <p className="text-white/40 text-[11px] text-center mt-2">Robot Photobooth — roaming, engaging, and printing on the spot.</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="flex flex-col gap-3 md:aspect-[9/16] md:gap-4">
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black md:relative md:min-h-0 md:flex-1">
                      <video className="w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover" controls playsInline preload="metadata" poster="/images/videobooth2-poster.jpg" style={{ display: 'block' }}>
                        <source src="/videos/videobooth2.mp4" type="video/mp4" />
                      </video>
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black md:relative md:min-h-0 md:flex-1">
                      <video className="w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover" controls playsInline preload="metadata" poster="/images/videobooth3-poster.jpg" style={{ display: 'block' }}>
                        <source src="/videos/videobooth3.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <p className="text-white/40 text-[11px] text-center mt-2">Robot Video Guestbook — real messages, recorded at a live event.</p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── How It Works ── */}
          <section className="py-8 md:py-10 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">How It <span className="text-[#fce4a6]">Works</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Simple, stress-free, and handled entirely by us</p>
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

          {/* ── What each robot does ── */}
          <section className="py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Two Robots. <span className="text-[#fce4a6]">Two Keepsakes.</span></h2>
                <p className="text-white/50 text-xs md:text-sm">The points that matter most from each product, in one booking</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productPoints.map((product, i) => (
                  <Reveal key={product.title} delay={i * 0.1}>
                    <div className="bg-gradient-to-br from-[#fce4a6]/10 to-transparent border border-[#fce4a6]/20 rounded-2xl p-5 md:p-6 h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#fce4a6]/10 border border-[#fce4a6]/30 flex items-center justify-center text-[#fce4a6]">
                          {product.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-base md:text-lg text-white">{product.title}</h3>
                          <p className="text-[#fce4a6]/80 text-[11px] md:text-xs">{product.kicker}</p>
                        </div>
                      </div>
                      <div className="space-y-2.5">
                        {product.points.map((point) => (
                          <div key={point} className="flex items-start gap-2.5">
                            <FiCheck className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#fce4a6]" />
                            <p className="text-white/70 text-xs md:text-sm leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Gallery pair 1 ── */}
          <section className="px-4 py-6 md:py-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Reveal>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/robothalloween.JPG" alt="Robot Photobooth at a themed event" className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover" loading="lazy" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/robotpeople.PNG" alt="Guests with the Robot Photobooth" className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover" loading="lazy" />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <PackageCardsGrid
            subtitle="Gold is the bundle — the Robot Photobooth and the Robot Video Guestbook, together."
            tiers={photoGuestbookBundleTiers}
            onBookBronze={openGoldPackage}
            onBookGold={openGoldPackage}
            onBookPlatinum={openPlatinumPackage}
            excludeAddOnIds={['video']}
            hideBronze
            maxWidth="max-w-4xl"
          />

          <SubtleCTA label="Book Both Robots" onQuote={openGoldPackage} />

          {/* ── Guestbook clip ── */}
          <section className="px-4 py-6 md:py-8">
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-black flex justify-center">
                  <video className="w-full h-auto max-h-[75vh]" controls playsInline preload="metadata" poster="/images/videobooth3-poster.jpg" style={{ display: 'block' }}>
                    <source src="/videos/videobooth3.mp4" type="video/mp4" />
                  </video>
                </div>
                <p className="text-white/40 text-[11px] text-center mt-2">Every message is recorded against the real atmosphere of your venue.</p>
              </Reveal>
            </div>
          </section>

          {/* ── Why Guests Love It ── */}
          <section className="py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Why Guests <span className="text-[#fce4a6]">Love It</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Photos they take home tonight. Messages they&apos;ll replay for years.</p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {whyGuestsLove.map((item, i) => (
                  <Reveal key={i} delay={i * 0.06} className="bg-white/[0.04] border border-white/10 rounded-xl p-4 md:p-5 hover:border-[#fce4a6]/30 transition-colors group">
                    <div className="text-[#fce4a6] mb-2 md:mb-3 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                    <h3 className="font-bold text-sm md:text-base mb-1">{item.title}</h3>
                    <p className="text-white/50 text-[11px] md:text-xs leading-relaxed">{item.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Gallery pair 2 ── */}
          <section className="px-4 py-6 md:py-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Reveal>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/robotfire.png" alt="Robot Photobooth with a custom effect" className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover" loading="lazy" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/robotbell.jpg" alt="Robot Photobooth at a branded event" className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover" loading="lazy" />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <SubtleCTA label="Check Availability" onQuote={openQuote} />

          {/* ── Customize ── */}
          <section className="py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Customize Your <span className="text-[#fce4a6]">Experience</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Photos, messages, and the robots themselves — tailored to your event</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {customizations.map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="bg-gradient-to-br from-[#fce4a6]/10 to-transparent border border-[#fce4a6]/20 rounded-2xl p-5 md:p-6 h-full hover:border-[#fce4a6]/40 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-[#fce4a6]/10 border border-[#fce4a6]/30 flex items-center justify-center mb-4 text-[#fce4a6] group-hover:bg-[#fce4a6]/20 transition-colors">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-base md:text-lg text-white mb-2">{item.title}</h3>
                      <p className="text-white/60 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Gallery pair 3 ── */}
          <section className="px-4 py-6 md:py-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Reveal>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/robottd.jpg" alt="Robot Photobooth at a corporate event" className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover" loading="lazy" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/robotfairy.jpg" alt="Robot Photobooth styled for a themed party" className="w-full h-56 sm:h-64 md:h-80 lg:h-96 object-cover" loading="lazy" />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <SubtleCTA label="Book Now" onQuote={openGoldPackage} />

          {/* ── Testimonials ── */}
          <section className="py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">What Clients <span className="text-[#fce4a6]">Are Saying</span></h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <a href="https://g.co/kgs/v9p1CzT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#fce4a6] hover:text-white transition-colors text-xs md:text-sm">
                    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-white/50 text-[10px] md:text-xs">5.0 on Google</span>
                  </a>
                </div>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {testimonials.map((t, i) => (
                  <Reveal key={i} delay={i * 0.08} className="bg-white/[0.04] border border-white/10 rounded-xl p-4 md:p-5 hover:border-[#fce4a6]/20 transition-colors">
                    <div className="flex text-[#fce4a6]/60 text-xs mb-3">★★★★★</div>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#fce4a6]/20 flex items-center justify-center text-[#fce4a6] text-[10px] font-bold">{t.name[0]}</div>
                      <div>
                        <div className="text-white text-[10px] md:text-xs font-bold">{t.name}</div>
                        <div className="text-white/40 text-[10px]">{t.role}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.2} className="mt-6">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {videoTestimonials.map((v, i) => (
                    <div key={i} className="bg-white/[0.04] border border-white/10 rounded-xl p-2 md:p-4">
                      <div className="rounded-xl overflow-hidden mb-2 md:mb-3 aspect-[9/16] bg-black">
                        <video className="w-full h-full object-cover" controls preload="none" poster={v.poster} style={{ display: 'block' }}>
                          <source src={v.src} type="video/quicktime" />
                          <source src={v.src} type="video/mp4" />
                        </video>
                      </div>
                      <p className="text-white/60 text-[10px] md:text-sm leading-snug">{v.caption}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <SubtleCTA label="Reserve Your Date" onQuote={openQuote} />

          {/* ── FAQs ── */}
          <section className="py-8 md:py-10 px-4">
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

          {/* ── Final CTA ── */}
          <section className="py-10 md:py-14 px-4 border-t border-white/5">
            <Reveal className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-black mb-2 md:mb-3">
                Photos of the Night. <span className="text-[#fce4a6]">Messages They&apos;ll Keep.</span>
              </h2>
              <p className="text-white/60 text-xs md:text-sm lg:text-base mb-5 max-w-lg mx-auto">
                The Robot Photobooth captures the night. The Robot Video Guestbook keeps the words. Book both — we handle everything.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openGoldPackage}
                  className="w-full sm:w-auto bg-[#fce4a6] text-black px-7 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group">
                  Book Both Robots <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <a href="tel:289-301-4039" className="flex items-center gap-2 text-[#fce4a6] text-sm font-semibold hover:text-white transition-colors">
                  <FiPhone className="w-4 h-4" /> 289-301-4039
                </a>
              </div>
              <p className="text-white/30 text-[10px] md:text-xs mt-2">Responses in &lt;15 mins&ensp;|&ensp;No credit card required</p>
            </Reveal>
          </section>

          <div className="h-20 md:h-16" />
        </div>
      </div>

      <SteppedQuoteModal
        open={showModal}
        onClose={() => { setShowModal(false); setPackageType('') }}
        title={modalTitle}
        subtitle="Tell us your event date and we'll confirm availability within 15 minutes."
        packageBanner={packageBanner}
        eventType="Robot Photobooth + Video Guestbook"
        packageLabel={packageLabel}
        source="Robot Photobooth Guestbook Ads"
        packageTier={packageType}
        pricingContext="photo-guestbook-bundle"
      />

      {/* ── Sticky CTA ── */}
      <AnimatePresence>
        {!showModal && showSticky && (
          <>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-[#fce4a6]/30 px-3 py-3 safe-area-pb">
              <div className="flex gap-2">
                <a href="tel:289-301-4039" className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-[#fce4a6]/30 text-[#fce4a6] py-3 rounded-full font-bold text-sm">
                  <FiPhone className="w-4 h-4" /> Call Now
                </a>
                <button onClick={openGoldPackage} className="flex-[2] flex items-center justify-center gap-2 bg-[#fce4a6] text-black py-3 rounded-full font-bold text-sm shadow-lg shadow-[#fce4a6]/20">
                  Book Both Robots <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            <motion.button initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openGoldPackage}
              className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-3.5 rounded-full shadow-xl shadow-black/40 hover:bg-white transition-colors text-sm items-center gap-2">
              Book Both Robots <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── DATA ─── */
const howItWorks = [
  { title: 'You Book', desc: 'Tell us the date, the venue, and who the videos are for. We confirm availability and design overlays for both the photos and the messages.' },
  { title: 'Both Robots Roam', desc: 'The Robot Photobooth visits guests for photos and prints. The Robot Video Guestbook collects spoken messages against the room you designed. Attendants run both.' },
  { title: 'You Keep Both', desc: 'Guests leave with prints and digital photos that night. We compile the Robot Video Guestbook messages and send them to you, so you can see what your guests left about you.' },
]

const productPoints = [
  {
    icon: <FiImage className="w-5 h-5" />,
    title: 'Robot Photobooth',
    kicker: 'The photos they take home tonight',
    points: [
      'Comes to your guests — no booth stuck in a corner',
      'Studio-quality photos anywhere in the venue, including candid moments',
      'Instant prints plus digital copies on their phones',
      'Custom overlays, a custom voice, and themed styling',
      'About as much space as one person. No power or WiFi required',
    ],
  },
  {
    icon: <FiVideo className="w-5 h-5" />,
    title: 'Robot Video Guestbook',
    kicker: 'The messages they watch for years',
    points: [
      'Guests record a personal message for the guest of honor',
      'Your lighting, décor, and atmosphere are the backdrop',
      'An attendant prompts guests — no app, no line, no leaving the party',
      'Names, date, or branding on every clip',
      'Every message compiled and sent to you, so you can see what guests left about you',
    ],
  },
]

const whyGuestsLove = [
  { icon: <FiHeart className="w-5 h-5 md:w-6 md:h-6" />, title: 'Photos and Words', desc: 'Prints and digital photos from the night, plus spoken messages they can replay. Two keepsakes from one booking.' },
  { icon: <FiMapPin className="w-5 h-5 md:w-6 md:h-6" />, title: 'The Robots Come to Them', desc: 'Guests don\'t walk to a corner booth. Both robots roam the room, so the party stays where it is.' },
  { icon: <FiSmile className="w-5 h-5 md:w-6 md:h-6" />, title: 'Studio Photos, On the Spot', desc: 'Flattering light, branded overlays, and prints in their hands before they sit back down.' },
  { icon: <FiShare2 className="w-5 h-5 md:w-6 md:h-6" />, title: 'A Guestbook They\'ll Keep', desc: 'We compile every Robot Video Guestbook message and send it to you after the event, so you can see what your guests left about you.' },
  { icon: <FiZap className="w-5 h-5 md:w-6 md:h-6" />, title: 'Zero Venue Requirements', desc: 'No outlets, no WiFi, no backdrop, no blocked walkway. Each robot takes about as much space as a person.' },
  { icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />, title: 'One Team, Both Robots', desc: 'Dedicated attendants guide photos and prompt messages so every guest knows exactly what to do.' },
]

const customizations = [
  { icon: <FiImage className="w-5 h-5" />, title: 'Photo Overlays & Prints', desc: 'Logo, names, date, and brand colors on every photo. Guests take a printed keepsake home and get a digital copy instantly.' },
  { icon: <FiMic className="w-5 h-5" />, title: 'Message Overlays & Prompts', desc: 'Names, the date, or your branding on every clip. We can cue a favorite memory, a toast, or a wish so shy guests still leave something meaningful.' },
  { icon: <FiStar className="w-5 h-5" />, title: 'Dress It Up & Custom Voice', desc: 'Style the robots to your theme, and record a custom voice so the photobooth speaks before and after each photo — your voice, or any recording you want.' },
]

const testimonials = [
  { name: 'Sarah J.', role: 'Wedding Host, Toronto', text: 'The robot was the highlight of our wedding. Guests couldn\'t stop talking about it and the photos were incredible. It roamed around and captured moments we would have missed.' },
  { name: 'Priya S.', role: 'Wedding Host, Toronto', text: 'The video messages were the most emotional gift we received. Guests recorded at their tables — the room, the lighting, everything we designed is in the background of every clip.' },
  { name: 'Marcus T.', role: 'Birthday Celebration', text: 'Our dad watched the compiled video the next morning and cried. Having the robot come to people instead of a booth in the hallway made all the difference.' },
]

const videoTestimonials = [
  { src: '/videos/robottest1.MOV', poster: '/images/robot1.jpg', caption: 'Hear it straight from one of our clients — the Robot Photobooth made their event unforgettable.' },
  { src: '/videos/robottest2.MOV', poster: '/images/robothalloween.JPG', caption: 'Don\'t just take our word for it — hear what our clients have to say about the experience.' },
]

const faqs = [
  { question: 'What do I get when I book both?', answer: 'The Gold package is the bundle: a Robot Photobooth and a Robot Video Guestbook, each with an attendant. Guests get studio photos, prints, and digital copies that night. After the event, we compile the Robot Video Guestbook messages and send them to you, so you can see what your guests left about you.' },
  { question: 'How do guests get their photos?', answer: 'Instantly, via QR code, AirDrop, SMS, or email. On-site prints are included, with your names, date, logo, or theme on the overlay.' },
  { question: 'How do guests record a message, and who receives them?', answer: 'An attendant brings the Robot Video Guestbook to guests. We prompt them, they speak, and we capture the clip — no app and no booth line. We compile those video messages and send them to you, so you can see what your guests left about you.' },
  { question: 'Do we need space, power, WiFi, or a backdrop?', answer: 'No. Each robot takes about as much space as a person, runs on battery, and uses its own connectivity. The robots roam, so your lighting and décor become the background.' },
  { question: 'Can both be customized?', answer: 'Yes. Photo overlays, a custom robot voice, and themed styling for the photobooth. Name, date, or brand overlays and optional prompts for the video guestbook.' },
  { question: 'What events is this bundle best for?', answer: 'Weddings, birthdays, anniversaries, retirements, bar and bat mitzvahs, and any milestone where you want photos of the night and spoken messages for someone special.' },
  { question: 'How far in advance should I book?', answer: 'We recommend booking at least 6 months in advance. Weekends and holidays fill quickly. Contact us now to lock in your date.' },
]

const companyLogos = [
  '/images/adamas.png', '/images/bell.png', '/images/bgo.png', '/images/equifax.svg',
  '/images/geotab.png', '/images/hilton.png', '/images/infosys.png', '/images/meta.png',
  '/images/pdsb.png', '/images/remax.png', '/images/ritz.webp', '/images/rlp.svg',
  '/images/stonex.png', '/images/talent.png', '/images/td.png', '/images/torontopearson.png', '/images/BMO.svg.png', '/images/tdsynnex.png', '/images/carmichael.png', '/images/siemens.png', '/images/alphawave.png', '/images/newmarket.png',
]
