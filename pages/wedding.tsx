import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowRight, FiCheck, FiPhone, FiChevronDown, FiChevronUp,
  FiClock, FiX, FiHeart, FiImage, FiStar, FiUsers, FiZap, FiShield
} from 'react-icons/fi'
import Navbar from '../components/Navbar'
import PackageCardsGrid from '../components/PackageCardsGrid'
import SteppedQuoteModal from '../components/SteppedQuoteModal'
import { weddingPackageTiers } from '../data/packageTiers'
import WeddingGalleryCarousel from '../components/WeddingGalleryCarousel'

/* ─── Reveal ─── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay }} className={className}>
    {children}
  </motion.div>
)

/* ─── Subtle CTA ─── */
const SubtleCTA = ({ label, onQuote }: { label: string; onQuote: () => void }) => (
  <div className="flex justify-center pt-4 pb-2">
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onQuote}
      className="bg-[#fce4a6] text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#fce4a6]/20 hover:shadow-lg transition-all group">
      {label} <FiArrowRight className="inline ml-1.5 group-hover:translate-x-1 transition-transform" />
    </motion.button>
  </div>
)

export default function Wedding() {
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
      document.querySelectorAll('video').forEach(v => { if (v !== e.target) v.pause() })
    }
    document.addEventListener('play', handlePlay, true)
    return () => document.removeEventListener('play', handlePlay, true)
  }, [])

  const openQuote = useCallback(() => { setPackageType(''); setShowModal(true) }, [])
  const openBronzePackage = useCallback(() => { setPackageType('bronze'); setShowModal(true) }, [])
  const openGoldPackage = useCallback(() => { setPackageType('gold'); setShowModal(true) }, [])
  const openPlatinumPackage = useCallback(() => { setPackageType('platinum'); setShowModal(true) }, [])

  const modalTitle =
    packageType === 'gold' ? 'Book Gold Package' :
    packageType === 'bronze' ? 'Book Bronze Package' :
    packageType === 'platinum' ? 'Book Platinum Package' :
    "Get a Wedding Quote"

  const packageLabel =
    packageType === 'gold' ? "Gold Package (2 Robot Photobooths)" :
    packageType === 'platinum' ? "Platinum Package (Multiple Robots)" :
    packageType === 'bronze' ? "Bronze Package (Robot Photobooth Only)" :
    'General Inquiry'

  const packageBanner = (
    <>
      {packageType === 'bronze' && (
        <div className="bg-white/90 border border-black/10 rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">🥉 Bronze Package Selected</span>
          <span className="text-black/60 text-[10px]">Robot Photobooth Only</span>
        </div>
      )}
      {packageType === 'gold' && (
        <div className="bg-[#fce4a6] rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">⭐ Gold Package Selected</span>
          <span className="text-black/60 text-[10px]">2 Robot Photobooths</span>
        </div>
      )}
      {packageType === 'platinum' && (
        <div className="bg-gradient-to-r from-white/95 to-gray-100 border border-gray-300 rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">💎 Platinum Package Selected</span>
          <span className="text-black/60 text-[10px]">Multiple Robots</span>
        </div>
      )}
    </>
  )

  return (
    <>
      <Head>
        <title>Wedding Robot Photobooth Toronto GTA | Robo Booth</title>
        <meta name="description" content="Make your wedding reception unforgettable with Canada's first Robot Photobooth. Personalized keepsakes for every guest. White-glove service. Serving Toronto & GTA." />
        <meta name="keywords" content="wedding photobooth Toronto, robot photobooth wedding GTA, wedding photo booth rental, wedding entertainment Toronto" />
        <meta property="og:title" content="Wedding Robot Photobooth | Robo Booth" />
        <meta property="og:description" content="The wedding activation your guests will never stop talking about. Personalized branded photos delivered to every guest — physical prints they take home forever." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://robobooth.ca/wedding" />
        <link rel="canonical" href="https://robobooth.ca/wedding" />
        <link rel="preload" href="/images/wedding/hero-poster.png" as="image" />
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
                <span>Wedding dates are filling fast — <button onClick={openQuote} className="underline font-bold">check availability now</button></span>
                <button onClick={() => setUrgencyDismissed(true)} className="ml-2 text-black/50 hover:text-black"><FiX className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )}

          {/* ══ HERO ══ */}
          <section className={`relative bg-black ${urgencyDismissed ? 'pt-20 md:pt-24' : 'pt-[7rem] md:pt-[8rem]'} pb-6 md:pb-8 px-4`}>
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <FiHeart className="w-4 h-4 text-[#fce4a6]" />
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-white/60 text-xs font-medium">5.0 Rating · Trusted by Couples Across the GTA</span>
                  </div>
                  <h1 className="text-[1.65rem] leading-[1.15] md:text-4xl lg:text-5xl font-black md:leading-[1.1] mb-4">
                    Canada&apos;s First <span className="text-[#fce4a6]">Robot Photobooth</span> for Weddings
                  </h1>
                  <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-5 max-w-xl">
                    Our robot photobooth roams your reception, visits every table, delivers personalized photos to every guest&apos;s phone in real-time, and prints physical keepsakes on the spot.{' '}
                    <span className="text-white font-semibold">White-glove service — you celebrate, we handle everything.</span>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openQuote}
                      className="w-full sm:w-auto bg-[#fce4a6] text-black px-6 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group text-center">
                      Check Your Date <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <a href="tel:289-301-4039" className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#fce4a6]/40 text-[#fce4a6] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#fce4a6]/10 transition-all text-center">
                      <FiPhone className="w-4 h-4" /> Call 289-301-4039
                    </a>
                  </div>
                  <p className="text-white/40 text-[11px] md:text-xs">Responses in &lt;15 mins&ensp;|&ensp;No credit card required</p>
                </motion.div>

                {/* Desktop hero video */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="hidden md:block">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
                    <video className="w-full h-[480px] lg:h-[520px] object-contain" controls loop playsInline preload="metadata" poster="/images/wedding/hero-poster.png" style={{ display: 'block' }}>
                      <source src="/videos/robotwedding1.MOV" type="video/quicktime" />
                      <source src="/videos/robotwedding1.MOV" type="video/mp4" />
                    </video>
                  </div>
                </motion.div>

                {/* Mobile hero video */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="md:hidden -mx-4">
                  <div className="overflow-hidden bg-black">
                    <video className="w-full max-h-[50vh] object-contain" controls loop playsInline preload="metadata" poster="/images/wedding/hero-poster.png" style={{ display: 'block' }}>
                      <source src="/videos/robotwedding1.MOV" type="video/quicktime" />
                      <source src="/videos/robotwedding1.MOV" type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Wedding Marquee ── */}
          <section className="py-4 md:py-6 border-y border-[#fce4a6]/10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-3">
              <p className="text-center text-[#fce4a6]/60 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase">Celebrating love stories across the GTA</p>
            </div>
            <div className="relative w-full overflow-hidden">
              <div className="animate-marquee flex items-center gap-8 md:gap-12 px-4">
                {[...weddingHighlights, ...weddingHighlights].map((item, i) => (
                  <div key={i} className="flex-shrink-0 flex items-center gap-2 text-white/50 hover:text-[#fce4a6] transition-colors">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-sm md:text-base font-semibold whitespace-nowrap">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── How It Works ── */}
          <section className="py-8 md:py-10 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">How It <span className="text-[#fce4a6]">Works</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Simple, romantic, and completely stress-free for the couple</p>
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

              <Reveal delay={0.2} className="mt-8">
                <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-black">
                  <video className="w-full max-h-[60vh] object-contain" controls loop playsInline preload="metadata" poster="/images/wedding/how-it-works-poster.png" style={{ display: 'block' }}>
                    <source src="/videos/robotwedding2.MOV" type="video/quicktime" />
                    <source src="/videos/robotwedding2.MOV" type="video/mp4" />
                  </video>
                </div>
              </Reveal>
            </div>
          </section>

          <PackageCardsGrid
            subtitle="Every wedding is unique — pick the package that fits your vision."
            tiers={weddingPackageTiers}
            onBookBronze={openBronzePackage}
            onBookGold={openGoldPackage}
            onBookPlatinum={openPlatinumPackage}
          />

          {/* ── CTA 1 ── */}
          <SubtleCTA label="Check Your Date" onQuote={openQuote} />

          {/* ── Wedding Gallery ── */}
          <section className="py-8 md:py-12 px-4 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
              <Reveal className="text-center mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Wedding <span className="text-[#fce4a6]">Gallery</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Real couples. Real receptions. Real memories.</p>
              </Reveal>
              <Reveal delay={0.1}>
                <WeddingGalleryCarousel />
              </Reveal>
            </div>
          </section>

          {/* ── Why Couples Love It ── */}
          <section className="py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Why Couples <span className="text-[#fce4a6]">Choose Us</span></h2>
                <p className="text-white/50 text-xs md:text-sm">The wedding moment every guest talks about for years</p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {whyCouplesLove.map((item, i) => (
                  <Reveal key={i} delay={i * 0.06} className="bg-white/[0.04] border border-white/10 rounded-xl p-4 md:p-5 hover:border-[#fce4a6]/30 transition-colors group">
                    <div className="text-[#fce4a6] mb-2 md:mb-3 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                    <h3 className="font-bold text-sm md:text-base mb-1">{item.title}</h3>
                    <p className="text-white/50 text-[11px] md:text-xs leading-relaxed">{item.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <SubtleCTA label="Get a Wedding Quote" onQuote={openQuote} />

          {/* ── Personalization ── */}
          <section className="py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Built Around <span className="text-[#fce4a6]">Your Love Story</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Every detail tailored to reflect your wedding aesthetic</p>
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

          {/* ── CTA 3 ── */}
          <SubtleCTA label="Book Now" onQuote={openQuote} />

          {/* ── Testimonials ── */}
          <section className="py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">What Couples <span className="text-[#fce4a6]">Are Saying</span></h2>
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
            </div>
          </section>

          <SubtleCTA label="Check Your Date" onQuote={openQuote} />

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
                Your Wedding Day Deserves <span className="text-[#fce4a6]">Something Extraordinary.</span>
              </h2>
              <p className="text-white/60 text-xs md:text-sm lg:text-base mb-5 max-w-lg mx-auto">
                Give every guest a personalized keepsake from the most important night of your life. Elegant, romantic, and completely managed — you focus on each other.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openQuote}
                  className="w-full sm:w-auto bg-[#fce4a6] text-black px-7 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group">
                  Check Your Date & Get a Quote <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
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

      {/* ── Lead Modal ── */}
      <SteppedQuoteModal
        open={showModal}
        onClose={() => { setShowModal(false); setPackageType('') }}
        title={modalTitle}
        subtitle="Tell us your event date and we'll confirm availability within 15 minutes."
        packageBanner={packageBanner}
        eventType={"Wedding"}
        packageLabel={packageLabel}
        source={"Wedding Page"}
        packageTier={packageType}
        pricingContext="standard"
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
                <button onClick={openQuote} className="flex-[2] flex items-center justify-center gap-2 bg-[#fce4a6] text-black py-3 rounded-full font-bold text-sm shadow-lg shadow-[#fce4a6]/20">
                  Get a Quote <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            <motion.button initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openQuote}
              className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-3.5 rounded-full shadow-xl shadow-black/40 hover:bg-white transition-colors text-sm items-center gap-2">
              Get a Wedding Quote <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── DATA ─── */
const howItWorks = [
  { title: 'Tell Us Your Vision', desc: 'Share your wedding date, venue, colour palette, and theme. We design a fully custom overlay and robot styling that feels like it was made for your love story — because it was.' },
  { title: 'We Arrive & Set Up', desc: 'Our team arrives before your first guest. The robot is set up, branded, and ready — no venue power or WiFi needed. You focus on getting ready; we handle every detail.' },
  { title: 'Every Guest Gets a Keepsake', desc: 'The robot visits every table throughout the reception, capturing personalized photos. Physical prints in hand and digital copies on their phones — a memory from your night, forever.' },
]

const whyCouplesLove = [
  { icon: <FiHeart className="w-5 h-5 md:w-6 md:h-6" />, title: 'Visits Every Table', desc: 'The robot comes to every guest — not the other way around. From grandparents to the kids\' table, everyone gets their moment without leaving their seat.' },
  { icon: <FiImage className="w-5 h-5 md:w-6 md:h-6" />, title: 'Physical Print Keepsakes', desc: 'Beautiful branded prints with your names and wedding date delivered on the spot. Something guests frame and display for years — a far more personal take-home than a favour bag.' },
  { icon: <FiStar className="w-5 h-5 md:w-6 md:h-6" />, title: 'Fully Personalized Design', desc: 'Custom overlay designed around your wedding theme — florals, gold foil, minimalist, or whatever reflects your aesthetic. Every photo feels like it was made for your day.' },
  { icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />, title: 'Engages Every Generation', desc: 'From the flower girls to the grandparents — the robot creates moments everyone loves. A shared experience that brings your whole guest list together.' },
  { icon: <FiZap className="w-5 h-5 md:w-6 md:h-6" />, title: 'Zero Venue Requirements', desc: 'Self-powered and self-connected. Ballrooms, barns, gardens, rooftops — the robot works in any venue with no cables, no WiFi, no disruption to your décor.' },
  { icon: <FiShield className="w-5 h-5 md:w-6 md:h-6" />, title: 'Zero Stress for the Couple', desc: 'Our dedicated attendant manages everything from arrival to teardown. You and your partner are fully present for every moment — not managing a vendor.' },
]

const customizations = [
  { icon: <FiImage className="w-5 h-5" />, title: 'Couple\'s Name & Date Overlay', desc: 'Your names, wedding date, and a custom design that reflects your aesthetic — romantic florals, gold foil, modern minimalist. Every photo is a beautifully branded keepsake from your day.' },
  { icon: <FiHeart className="w-5 h-5" />, title: 'Custom Voice Message from the Couple', desc: 'Record a personal message from the bride, groom, or both — with a special customized greeting before & after it takes a photo. A heartfelt touch that makes every guest interaction feel uniquely yours.' },
  { icon: <FiStar className="w-5 h-5" />, title: 'Multi-Booth Reception Experience', desc: 'Add a Premium Photobooth, Aerial Booth, or 360 Booth alongside the robot — giving your guests multiple keepsake experiences throughout the reception that they\'ll be talking about for decades.' },
]

const testimonials = [
  { name: 'Sarah J.', role: 'Bride', text: 'Our guests absolutely loved the robot. It visited every table during dinner, everyone got a personalized print with our names on it, and people are still talking about it months later. Best wedding decision we made.' },
  { name: 'Ben S.', role: 'Groom', text: 'We were worried it might feel out of place at a formal reception. It didn\'t — it was elegant, warm, and our photographer said the candid moments the robot created were some of the best shots of the entire night.' },
  { name: 'Emma D.', role: 'Maid of Honour', text: 'I\'ve been to over 20 weddings and this was the first time entertainment made me tear up. The bride\'s voice coming out of the robot at every photo was so personal and beautiful. Every guest loved it.' },
]

const faqs = [
  { question: 'Is the robot appropriate for a formal wedding reception?', answer: 'Absolutely. The robot is operated elegantly by our professional attendant and moves gracefully through the venue. We can style it to complement your wedding aesthetic — from black tie and formal to rustic, boho, or garden chic.' },
  { question: 'Can the photos feature both of our names and our wedding date?', answer: 'Yes. We design a fully custom overlay with your names, wedding date, and a theme that matches your aesthetic — florals, gold foil, minimalist lettering, or whatever reflects your vision.' },
  { question: 'When does the robot operate during the reception?', answer: 'Typically during cocktail hour and throughout the dinner reception when guests are seated and relaxed. Our attendant visits each table ensuring every single guest has their personalized photo moment.' },
  { question: 'Are physical prints included?', answer: 'Yes. Every booking includes physical prints delivered on the spot — a personalized keepsake from your wedding day that guests take home and treasure. Better than any traditional party favour.' },
  { question: 'Can we record a personal voice message for guests?', answer: 'Yes. We can record a message from the bride, groom, or both — the robot delivers it before each photo moment, making every interaction feel heartfelt and uniquely yours.' },
  { question: 'Does the robot require power or WiFi from our venue?', answer: 'No. The robot is fully self-powered and self-connected. No cables, no WiFi requirements, no disruption to your venue setup or décor whatsoever.' },
  { question: 'How far in advance should we book?', answer: 'We strongly recommend booking 6–8 weeks ahead. Peak wedding season (May–October) fills extremely fast. Contact us now to secure your date before it\'s gone.' },
]

const weddingHighlights = [
  { emoji: '💒', label: 'Reception' },
  { emoji: '⛪', label: 'Ceremony' },
  { emoji: '🥂', label: 'Cocktail Hour' },
  { emoji: '👰', label: 'First Dance' },
  { emoji: '💍', label: 'South Asian Weddings' },
  { emoji: '🌸', label: 'Garden & Outdoor' },
  { emoji: '✨', label: 'Black Tie' },
  { emoji: '🎉', label: 'Sangeet & Mehndi' },
  { emoji: '🏛️', label: 'Ballroom' },
  { emoji: '💐', label: 'Intimate Celebrations' },
]
