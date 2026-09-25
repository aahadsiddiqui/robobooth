import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiCheck, FiPhone, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight, FiClock, FiX, FiZap, FiUsers, FiHeart, FiShield, FiImage, FiShare2, FiVideo, FiGift, FiCalendar } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import PackageCardsGrid from '../components/PackageCardsGrid'
import SteppedQuoteModal from '../components/SteppedQuoteModal'
import { Snowfall, TreeLine, TwinkleLights } from '../components/HolidayDecor'
import { holidayCorporatePackageTiers, holidayTierLabels } from '../data/packageTiers'

/* ─── Reveal ─── */
const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5, delay }} className={className}>
    {children}
  </motion.div>
)

/* ─── Subtle CTA ─── */
const SubtleCTA = ({ label, onQuote }: { label: string; onQuote: () => void }) => (
  <div className="relative z-10 flex justify-center pt-4 pb-2">
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onQuote}
      className="bg-[#fce4a6] text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#fce4a6]/20 hover:shadow-lg transition-all group">
      {label} <FiArrowRight className="inline ml-1.5 group-hover:translate-x-1 transition-transform" />
    </motion.button>
  </div>
)

/* ─── Days until December (client-only to avoid hydration mismatch) ─── */
function useDaysUntilDecember() {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => {
    const now = new Date()
    const target = new Date(now.getFullYear(), 11, 1)
    setDays(Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000)))
  }, [])
  return days
}

/* ─── Which booking-timeline phase today falls in: Sep–Oct, Nov, Dec ─── */
function useCurrentBookingPhase() {
  const [phase, setPhase] = useState<number | null>(null)
  useEffect(() => {
    const month = new Date().getMonth()
    setPhase(month === 11 ? 2 : month === 10 ? 1 : 0)
  }, [])
  return phase
}

type HolidayTier = 'bronze' | 'gold' | 'platinum' | ''

/* ════════════════════════════════════════════════════════════════
   HOLIDAY CORPORATE LANDING PAGE
   ════════════════════════════════════════════════════════════════ */
export default function HolidayCorporate() {
  const [showModal, setShowModal] = useState(false)
  const [packageType, setPackageType] = useState<HolidayTier>('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const [showSticky, setShowSticky] = useState(false)
  const [urgencyDismissed, setUrgencyDismissed] = useState(false)
  const daysUntilDecember = useDaysUntilDecember()
  const currentPhase = useCurrentBookingPhase()
  const [activePrint, setActivePrint] = useState<number | null>(null)

  const showPrevPrint = useCallback(() => setActivePrint(i => i === null ? i : (i - 1 + holidayPrints.length) % holidayPrints.length), [])
  const showNextPrint = useCallback(() => setActivePrint(i => i === null ? i : (i + 1) % holidayPrints.length), [])

  useEffect(() => {
    if (activePrint === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePrint(null)
      if (e.key === 'ArrowLeft') showPrevPrint()
      if (e.key === 'ArrowRight') showNextPrint()
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('overflow-hidden')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('overflow-hidden')
    }
  }, [activePrint, showPrevPrint, showNextPrint])

  useEffect(() => {
    const fn = () => setShowSticky(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { const t = setTimeout(() => setShowModal(true), 25000); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const handlePlay = (e: Event) => {
      document.querySelectorAll('video').forEach(v => { if (v !== e.target) { v.pause() } })
    }
    document.addEventListener('play', handlePlay, true)
    return () => document.removeEventListener('play', handlePlay, true)
  }, [])

  const openQuote = useCallback(() => { setPackageType(''); setShowModal(true) }, [])
  const openBronzePackage = useCallback(() => { setPackageType('bronze'); setShowModal(true) }, [])
  const openGoldPackage = useCallback(() => { setPackageType('gold'); setShowModal(true) }, [])
  const openPlatinumPackage = useCallback(() => { setPackageType('platinum'); setShowModal(true) }, [])

  const selectedTier = packageType ? holidayCorporatePackageTiers[packageType] : null

  const modalTitle = packageType ? `Book ${holidayTierLabels[packageType]}` : 'Check Your Holiday Party Date'

  const packageLabel = packageType && selectedTier
    ? `${holidayTierLabels[packageType]} — ${selectedTier.title} (${selectedTier.robotLabel}) · Corporate Holiday`
    : 'General Inquiry (Corporate Holiday)'

  const packageBanner = (
    <>
      {packageType === 'bronze' && selectedTier && (
        <div className="bg-white/90 border border-black/10 rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">❄️ {holidayTierLabels.bronze}</span>
          <span className="text-black/60 text-[10px]">{selectedTier.title} · {selectedTier.robotLabel}</span>
        </div>
      )}
      {packageType === 'gold' && selectedTier && (
        <div className="bg-[#fce4a6] rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">⭐ {holidayTierLabels.gold}</span>
          <span className="text-black/60 text-[10px]">{selectedTier.title} · {selectedTier.robotLabel}</span>
        </div>
      )}
      {packageType === 'platinum' && selectedTier && (
        <div className="bg-gradient-to-r from-white/95 to-gray-100 border border-gray-300 rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">💎 {holidayTierLabels.platinum}</span>
          <span className="text-black/60 text-[10px]">{selectedTier.title} · {selectedTier.robotLabel}</span>
        </div>
      )}
    </>
  )

  const urgencyCopy = daysUntilDecember && daysUntilDecember > 0
    ? <>Only <strong>{daysUntilDecember} days</strong> until December — holiday party dates are booking fast.</>
    : <>December is here — remaining holiday dates are going fast.</>

  return (
    <>
      <Head>
        <title>Corporate Holiday Party Robot Photobooth Toronto GTA | Robo Booth</title>
        <meta name="description" content="Make your company holiday party unforgettable with Canada's first Robot Photobooth and Robot Video Guestbook. Festive branded prints, instant sharing, fully managed. Serving Toronto & GTA — December dates filling fast." />
        <meta name="keywords" content="corporate holiday party photobooth Toronto, company holiday party photo booth GTA, year-end party entertainment Toronto, holiday party entertainment Toronto, robot photobooth holiday party, office holiday party ideas Toronto" />
        <meta property="og:title" content="Corporate Holiday Party Robot Photobooth | Robo Booth" />
        <meta property="og:description" content="The holiday party activation your team will talk about all year. Festive branded prints, video guestbook messages, and zero work for your team." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://robobooth.ca/holiday-corporate" />
        <meta property="og:image" content="https://robobooth.ca/images/robot1.jpg" />
        <link rel="canonical" href="https://robobooth.ca/holiday-corporate" />
        <link rel="preload" href="/images/robot1.jpg" as="image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={showModal ? 'blur-sm pointer-events-none select-none' : ''}>
        <div className="relative min-h-screen bg-gradient-to-b from-[#06101f] via-black to-[#04130d] text-white overflow-x-hidden">

          {/* Page-wide snowfall behind content */}
          <Snowfall count={50} className="fixed inset-0 z-0" />

          {/* ── Navbar ── */}
          <Navbar />

          {/* ── Urgency Banner ── */}
          {!urgencyDismissed && (
            <div className="fixed top-16 md:top-[4.5rem] left-0 right-0 z-40 bg-gradient-to-r from-[#0f2440] via-[#1e3a5f] to-[#0f2440] border-b border-[#8ec5ff]/20 text-white text-center py-2 px-4">
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold">
                <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{urgencyCopy} <button onClick={openQuote} className="underline font-bold text-[#fce4a6]">Check your date</button></span>
                <button onClick={() => setUrgencyDismissed(true)} className="ml-2 text-white/60 hover:text-white" aria-label="Dismiss"><FiX className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════
              HERO
             ═══════════════════════════════════════ */}
          <section className={`relative ${urgencyDismissed ? 'pt-20 md:pt-24' : 'pt-[7rem] md:pt-[8rem]'} pb-24 md:pb-40 px-4`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#1e3a5f40_0%,_transparent_55%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#fce4a61a_0%,_transparent_45%)] pointer-events-none" />
            <Snowfall count={70} className="absolute inset-0" />
            <TreeLine />

            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                  <div className="inline-flex items-center gap-2 bg-[#1e3a5f]/40 border border-[#8ec5ff]/30 text-[#d6ebff] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-3">
                    ❄️ Corporate Holiday Parties 2026
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-white/60 text-xs font-medium">5.0 Rating · Trusted by TD, BMO, Bell, KPMG &amp; PwC</span>
                  </div>
                  <h1 className="text-[1.65rem] leading-[1.15] md:text-4xl lg:text-5xl font-black md:leading-[1.1] mb-4">
                    The Holiday Party Moment Your Team <span className="text-[#fce4a6]">Talks About All Year</span>
                  </h1>
                  <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-4 max-w-xl">
                    Canada&apos;s first Robot Photobooth roams your holiday party, brings every department together, and hands out festive branded prints on the spot.{' '}
                    <span className="text-white font-semibold">You planned the party — we run the magic.</span>
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {heroBullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/80 text-xs md:text-sm">
                        <FiCheck className="w-4 h-4 text-[#8ec5ff] mt-0.5 flex-shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openQuote}
                      className="w-full sm:w-auto bg-[#fce4a6] text-black px-6 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/30 hover:shadow-xl transition-all group text-center">
                      Check My Holiday Date <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <a href="tel:289-301-4039" className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#fce4a6]/40 text-[#fce4a6] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#fce4a6]/10 transition-all text-center">
                      <FiPhone className="w-4 h-4" /> Call 289-301-4039
                    </a>
                  </div>
                  <p className="text-white/40 text-[11px] md:text-xs">Responses in &lt;15 mins&ensp;|&ensp;No credit card required&ensp;|&ensp;Fully insured</p>
                </motion.div>

                {/* Hero video — desktop */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="hidden md:block">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#1e3a5f]/30 border border-[#fce4a6]/20 bg-black">
                    <video className="w-full h-[480px] lg:h-[520px] object-contain" controls loop playsInline preload="metadata" poster="/images/robot1.jpg" style={{ display: 'block' }}>
                      <source src="/videos/equifaxrobot.mov" type="video/quicktime" />
                      <source src="/videos/equifaxrobot.mov" type="video/mp4" />
                    </video>
                  </div>
                </motion.div>

                {/* Mobile hero video */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="md:hidden -mx-4">
                  <div className="overflow-hidden bg-black">
                    <video className="w-full max-h-[50vh] object-contain" controls loop playsInline preload="metadata" poster="/images/robot1.jpg" style={{ display: 'block' }}>
                      <source src="/videos/equifaxrobot.mov" type="video/quicktime" />
                      <source src="/videos/equifaxrobot.mov" type="video/mp4" />
                    </video>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ── Logo Marquee ── */}
          <section className="relative z-10 py-4 md:py-6 border-y border-[#fce4a6]/10 bg-black/60 overflow-hidden">
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

          {/* ── How It Works — 3 Steps ── */}
          <section className="relative z-10 py-8 md:py-10 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">How It <span className="text-[#fce4a6]">Works</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Three steps to the easiest win of your holiday planning</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {howItWorks.map((step, i) => (
                  <Reveal key={i} delay={i * 0.12} className="relative">
                    <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-5 md:p-6 text-center hover:border-[#8ec5ff]/40 transition-colors group h-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1e3a5f]/40 border border-[#8ec5ff]/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1e3a5f]/60 transition-colors">
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

          {/* ── Packages ── */}
          <div className="relative z-10">
            <TwinkleLights className="max-w-5xl mx-auto mt-4" />
            <PackageCardsGrid
              tiers={holidayCorporatePackageTiers}
              subtitle="Three festive packages — every one fully set up, branded, and managed by our team."
              onBookBronze={openBronzePackage}
              onBookGold={openGoldPackage}
              onBookPlatinum={openPlatinumPackage}
              bronzeLabel={holidayTierLabels.bronze}
              goldLabel={holidayTierLabels.gold}
              platinumLabel={holidayTierLabels.platinum}
              excludeAddOnIds={['video']}
            />
          </div>

          <SubtleCTA label="Check My Holiday Date" onQuote={openQuote} />

          {/* ── Booking Timeline (urgency) ── */}
          <section className="relative z-10 py-10 md:py-14 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal>
                <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl px-5 py-9 sm:px-8 md:p-12">
                  <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#fce4a6]/60 to-transparent" />
                  <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full bg-[#8ec5ff]/10 blur-3xl pointer-events-none" />

                  <div className="relative text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                      <FiCalendar className="w-3 h-3 text-[#fce4a6]" /> Booking Timeline
                    </div>
                    <h2 className="mt-4 text-2xl md:text-4xl font-black tracking-tight">
                      December Fridays Go <span className="text-[#fce4a6]">First</span>
                    </h2>
                    <p className="mt-2 text-white/55 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                      Every company wants the same few weekends. Here&apos;s how the season typically books up.
                    </p>
                  </div>

                  <div className="relative mt-10 md:mt-12">
                    <div aria-hidden="true" className="hidden md:block absolute top-3 left-[calc(16.66%+12px)] right-[calc(16.66%+12px)] h-px bg-gradient-to-r from-[#8ec5ff]/70 via-[#fce4a6]/70 to-[#ff8a8a]/70" />
                    <div aria-hidden="true" className="md:hidden absolute left-3 top-3 bottom-8 w-px bg-gradient-to-b from-[#8ec5ff]/70 via-[#fce4a6]/70 to-[#ff8a8a]/70" />
                    <ol className="relative grid grid-cols-1 md:grid-cols-3 md:gap-6">
  
                      {bookingTimeline.map((t, i) => {
                        const isCurrent = currentPhase === i
                        return (
                          <li key={t.period} className="relative pl-10 pb-6 last:pb-0 md:pl-0 md:pb-0">
                            <span className="absolute left-0 top-0 md:relative md:mx-auto flex h-6 w-6 items-center justify-center rounded-full border bg-black" style={{ borderColor: `${t.accent}99` }}>
                              {isCurrent && <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${t.accent}40` }} />}
                              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.accent, boxShadow: `0 0 10px ${t.accent}` }} />
                            </span>
  
                            <div
                              className="md:mt-5 rounded-2xl border p-4 md:p-5 transition-colors"
                              style={isCurrent
                                ? { borderColor: `${t.accent}55`, background: `linear-gradient(180deg, ${t.accent}14, transparent)` }
                                : { borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.02)' }}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">{t.period}</span>
                                {isCurrent && (
                                  <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black" style={{ backgroundColor: t.accent }}>
                                    You&apos;re here
                                  </span>
                                )}
                              </div>
                              <h3 className="mt-1.5 text-lg md:text-xl font-black tracking-tight" style={{ color: t.accent }}>{t.status}</h3>
  
                              <div className="mt-3 flex items-center gap-3">
                                <div className="flex flex-1 gap-1" role="img" aria-label={`Availability: ${t.level} of 4`}>
                                  {[0, 1, 2, 3].map((s) => (
                                    <span key={s} className="h-1 flex-1 rounded-full" style={{ backgroundColor: s < t.level ? t.accent : 'rgba(255,255,255,0.1)' }} />
                                  ))}
                                </div>
                                <span className="text-[10px] font-medium text-white/40 whitespace-nowrap">Availability</span>
                              </div>
  
                              <p className="mt-3 text-white/60 text-[13px] md:text-sm leading-relaxed">{t.desc}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ol>
                  </div>

                  <div className="relative mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={openQuote}
                      className="w-full sm:w-auto bg-[#fce4a6] text-black px-7 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group">
                      Lock In My Date <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <p className="flex items-center gap-1.5 text-white/45 text-xs">
                      <FiClock className="w-3.5 h-3.5" /> 30-second form · Availability confirmed in &lt;15 mins
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── Holiday Prints Gallery ── */}
          <section className="relative z-10 py-8 md:py-12">
            <div className="max-w-6xl mx-auto">
              <Reveal className="text-center mb-6 md:mb-8 px-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
                  <FiImage className="w-3 h-3 text-[#fce4a6]" /> Last Holiday Season
                </div>
                <h2 className="mt-4 text-2xl md:text-4xl font-black tracking-tight">
                  Real Prints From <span className="text-[#fce4a6]">Real Holiday Parties</span>
                </h2>
                <p className="mt-2 text-white/55 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                  Every one of these was taken by our robot and printed on the spot, with each company&apos;s own logo &amp; theme.
                </p>
              </Reveal>

              <div className="flex md:flex-wrap md:justify-center gap-3 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {holidayPrints.map((p, i) => (
                  <Reveal key={p.src} delay={(i % 3) * 0.08} className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[calc((100%-2.5rem)/3)]">
                    <button type="button" onClick={() => setActivePrint(i)} className="group block w-full text-left" aria-label={`View ${p.company} print larger`}>
                      <div className="rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-xl shadow-black/40 ring-1 ring-white/10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
                        <img src={p.src} alt={`${p.company} ${p.event} — Robot Photobooth print`} className="w-full aspect-[3/2] object-cover" loading="lazy" />
                      </div>
                      <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
                        <span className="text-white text-xs md:text-sm font-bold">{p.company}</span>
                        <span className="text-white/40 text-[10px] md:text-xs">{p.event}</span>
                      </div>
                    </button>
                  </Reveal>
                ))}
              </div>
              <p className="md:hidden text-center text-white/35 text-[10px] mt-2">Swipe to see more →</p>
            </div>
          </section>

          {/* ── Print Lightbox ── */}
          <AnimatePresence>
            {activePrint !== null && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                onClick={() => setActivePrint(null)} role="dialog" aria-modal="true" aria-label="Holiday print preview">
                <button onClick={() => setActivePrint(null)} className="absolute top-4 right-4 text-white/70 hover:text-white" aria-label="Close"><FiX className="w-7 h-7" /></button>
                <button onClick={(e) => { e.stopPropagation(); showPrevPrint() }} className="absolute left-2 md:left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" aria-label="Previous print"><FiChevronLeft className="w-6 h-6" /></button>
                <motion.figure key={activePrint} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                  <img src={holidayPrints[activePrint].src} alt={`${holidayPrints[activePrint].company} ${holidayPrints[activePrint].event}`} className="w-full h-auto max-h-[80vh] object-contain rounded-xl bg-white" />
                  <figcaption className="mt-3 text-center text-white/70 text-sm">
                    <span className="font-bold text-white">{holidayPrints[activePrint].company}</span> · {holidayPrints[activePrint].event}
                  </figcaption>
                </motion.figure>
                <button onClick={(e) => { e.stopPropagation(); showNextPrint() }} className="absolute right-2 md:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white" aria-label="Next print"><FiChevronRight className="w-6 h-6" /></button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Why Companies Choose Us ── */}
          <section className="relative z-10 py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Why HR &amp; Event Teams <span className="text-[#fce4a6]">Book Us for the Holidays</span></h2>
                <p className="text-white/50 text-xs md:text-sm">The one part of the party that plans itself — and gets all the credit</p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {whyClientsLove.map((item, i) => (
                  <Reveal key={i} delay={i * 0.06} className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 hover:border-[#8ec5ff]/40 transition-colors group">
                    <div className="text-[#8ec5ff] mb-2 md:mb-3 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                    <h3 className="font-bold text-sm md:text-base mb-1">{item.title}</h3>
                    <p className="text-white/50 text-[11px] md:text-xs leading-relaxed">{item.desc}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ── Gallery pair ── */}
          <section className="relative z-10 px-4 py-6 md:py-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Reveal>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/holiday/robot-holiday-gala-arch.jpg" alt="Robot Photobooth under a holiday balloon arch at a corporate gala" className="w-full h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] object-cover object-[center_40%]" loading="lazy" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/robottd.jpg" alt="Robot Photobooth at TD Coliseum holiday event" className="w-full h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] object-cover" loading="lazy" />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <SubtleCTA label="Get a Holiday Party Quote" onQuote={openQuote} />

          {/* ── Video Guestbook upsell ── */}
          <section className="relative z-10 py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
              <Reveal className="text-center">
                <div className="inline-flex items-center gap-2 bg-[#fce4a6]/10 border border-[#fce4a6]/30 text-[#fce4a6] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-3">
                  <FiVideo className="w-3.5 h-3.5" /> Most Popular Upgrade
                </div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight mb-3">Capture the Year-End <span className="text-[#fce4a6]">Thank-Yous</span></h2>
                <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                  The Robot Video Guestbook rolls up to your team and records short video messages — shout-outs to colleagues, holiday wishes, and highlights from the year. We compile them into one video you can play at the next all-hands or share internally.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 md:mt-8">
                {guestbookBullets.map((b, i) => (
                  <Reveal key={i} delay={i * 0.08} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#fce4a6]/10 border border-[#fce4a6]/30">
                      <FiCheck className="w-3.5 h-3.5 text-[#fce4a6]" />
                    </span>
                    <p className="text-white/75 text-xs md:text-sm leading-relaxed">{b}</p>
                  </Reveal>
                ))}
              </div>
              <div className="flex justify-center mt-6 md:mt-8">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openGoldPackage}
                  className="w-full sm:w-auto bg-[#fce4a6] text-black px-7 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group">
                  Book {holidayTierLabels.gold} <FiArrowRight className="inline ml-1.5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </section>

          {/* ── Customize Your Experience ── */}
          <section className="relative z-10 py-8 md:py-10 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Dressed for the Season, <span className="text-[#fce4a6]">Built for Your Brand</span></h2>
                <p className="text-white/50 text-xs md:text-sm">Every detail is tailored to your company&apos;s holiday theme</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {customizations.map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="bg-gradient-to-br from-[#1e3a5f]/30 to-transparent border border-[#8ec5ff]/20 rounded-2xl p-5 md:p-6 h-full hover:border-[#fce4a6]/40 transition-colors group">
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

          {/* ── Gallery pair 2 ── */}
          <section className="relative z-10 px-4 py-6 md:py-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Reveal>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/robot1.jpg" alt="Corporate Robot Photobooth" className="w-full h-72 sm:h-80 md:h-[28rem] lg:h-[32rem] object-cover" loading="lazy" />
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img src="/images/holiday/two-robots-light-tunnel.jpg" alt="Two Robot Photobooths in an illuminated corporate event tunnel" className="w-full h-72 sm:h-80 md:h-[28rem] lg:h-[32rem] object-cover object-[center_60%]" loading="lazy" />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <SubtleCTA label="Book My Holiday Party" onQuote={openQuote} />

          {/* ── Testimonials ── */}
          <section className="relative z-10 py-8 md:py-10 px-4 border-t border-white/5">
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
                  <Reveal key={i} delay={i * 0.08} className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5 hover:border-[#fce4a6]/20 transition-colors">
                    <div className="flex text-[#fce4a6]/60 text-xs mb-3">★★★★★</div>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#1e3a5f]/60 flex items-center justify-center text-[#fce4a6] text-[10px] font-bold">{t.name[0]}</div>
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

          {/* ── Testimonial Videos ── */}
          <section className="relative z-10 px-4 py-6 md:py-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <Reveal>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <video className="w-full max-h-[60vh] object-contain" controls loop playsInline preload="metadata" style={{ display: 'block' }}>
                      <source src="/videos/tdtestimonial.mov" type="video/quicktime" />
                      <source src="/videos/tdtestimonial.mov" type="video/mp4" />
                    </video>
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <video className="w-full max-h-[60vh] object-contain" controls loop playsInline preload="metadata" style={{ display: 'block' }}>
                      <source src="/videos/robottest1.MOV" type="video/quicktime" />
                      <source src="/videos/robottest1.MOV" type="video/mp4" />
                    </video>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <SubtleCTA label="Check My Holiday Date" onQuote={openQuote} />

          {/* ── FAQs ── */}
          <section className="relative z-10 py-8 md:py-10 px-4">
            <div className="max-w-3xl mx-auto">
              <Reveal className="text-center mb-5">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">Holiday Party <span className="text-[#fce4a6]">Questions</span></h2>
              </Reveal>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full text-left bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-3.5 md:p-4 hover:border-[#fce4a6]/30 transition-colors">
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
          <section className="relative z-10 pt-10 md:pt-14 pb-28 md:pb-40 px-4 border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#1e3a5f50_0%,_transparent_60%)] pointer-events-none" />
            <TreeLine />
            <Reveal className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="text-3xl md:text-4xl mb-2" aria-hidden="true">❄️</div>
              <h2 className="text-xl md:text-2xl lg:text-4xl font-black mb-2 md:mb-3">
                Give Your Team a Holiday Party <span className="text-[#fce4a6]">Worth Remembering.</span>
              </h2>
              <p className="text-white/60 text-xs md:text-sm lg:text-base mb-5 max-w-lg mx-auto">
                December weekends are limited and they go first. Tell us your date — we&apos;ll confirm availability and send your holiday package options within 15 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={openQuote}
                  className="w-full sm:w-auto bg-[#fce4a6] text-black px-7 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group">
                  Check Availability &amp; Get a Quote <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
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
        subtitle="Tell us your party date and we'll confirm availability within 15 minutes."
        packageBanner={packageBanner}
        eventType="Corporate Holiday Party"
        packageLabel={packageLabel}
        source="Holiday Corporate Page"
        packageTier={packageType}
        pricingContext="corporate"
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
                  Check My Date <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            <motion.button initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openQuote}
              className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-3.5 rounded-full shadow-xl shadow-black/40 hover:bg-white transition-colors text-sm items-center gap-2">
              ❄️ Check My Holiday Date <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── DATA ─── */
const heroBullets = [
  'Festive branded prints every employee takes home',
  'Brings every department together — no one left out',
  'Fully managed: no power, WiFi, or setup needed from your venue',
]

const howItWorks = [
  { title: 'Pick Your Date & Package', desc: 'Tell us your party date, venue, and headcount. We confirm availability within 15 minutes and recommend the right package for your team size.' },
  { title: 'We Design Your Holiday Look', desc: 'Share your logo and theme — winter wonderland, elegant gold, or fully on-brand. We build a custom holiday overlay and handle every detail.' },
  { title: 'Your Team Makes Memories', desc: 'Our attendant roams the robot through cocktails, dinner, and the dance floor. Prints roll out on the spot and photos hit phones instantly.' },
]

const holidayPrints = [
  { src: '/images/holiday/td-holiday-gala.jpg', company: 'TD', event: 'Holiday Gala' },
  { src: '/images/holiday/hilton-holiday-gala.jpg', company: 'Hilton Mississauga', event: 'Holiday Gala' },
  { src: '/images/holiday/alphawave-holiday-gala.jpg', company: 'Alphawave Semi', event: 'Holiday Gala' },
  { src: '/images/holiday/appficiency-holiday-party.jpg', company: 'Appficiency', event: 'Office Holiday Party' },
  { src: '/images/holiday/prg-holiday-party.jpg', company: 'PRG Corp', event: 'Holiday Celebration' },
  { src: '/images/holiday/relay-winter-holiday-party.jpg', company: 'Relay', event: 'Winter Holiday Party' },
  { src: '/images/holiday/alta-holiday-party.jpg', company: 'Alta E-Solutions', event: 'Holiday Party' },
  { src: '/images/holiday/td-coliseum-holiday.jpg', company: 'TD Coliseum', event: 'Holiday Greetings' },
  { src: '/images/holiday/universal-new-years.jpg', company: 'Universal EventSpace', event: 'New Year\'s Celebration' },
]

const bookingTimeline = [
  { period: 'Sep – Oct', status: 'Best Selection', accent: '#8ec5ff', level: 4, desc: 'Most December Fridays and Saturdays are still open. This is when the best-organized teams lock in their date.' },
  { period: 'November', status: 'Limited', accent: '#fce4a6', level: 2, desc: 'Peak weekends are usually taken. Weeknights and early-December dates are still possible.' },
  { period: 'December', status: 'Waitlist Only', accent: '#ff8a8a', level: 1, desc: 'Last-minute requests are first-come, first-served. We regularly turn teams away — don\'t leave it this late.' },
]

const whyClientsLove = [
  { icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />, title: 'Breaks Down Department Silos', desc: 'Finance, sales, and engineering all crowd around the robot. It sparks cross-team moments that simply don\'t happen at a regular party.' },
  { icon: <FiGift className="w-5 h-5 md:w-6 md:h-6" />, title: 'A Keepsake, Not Another Swag Item', desc: 'Festive prints with your logo and the year end up on desks and fridges well into the new year — a thank-you your team actually keeps.' },
  { icon: <FiZap className="w-5 h-5 md:w-6 md:h-6" />, title: 'Zero Work for Your Team', desc: 'No power outlets, no WiFi, no special layout. We arrive early, set up, run it, and pack up — you get to enjoy your own party.' },
  { icon: <FiShare2 className="w-5 h-5 md:w-6 md:h-6" />, title: 'Instant Employer-Brand Content', desc: 'Branded photos land on phones in seconds and flow onto LinkedIn and Slack — authentic culture content your talent team will love.' },
  { icon: <FiHeart className="w-5 h-5 md:w-6 md:h-6" />, title: 'Works in Any Venue', desc: 'Hotel ballrooms, restaurant buyouts, rooftop lounges, or your own office — the robot navigates between tables without disrupting service.' },
  { icon: <FiShield className="w-5 h-5 md:w-6 md:h-6" />, title: 'Procurement-Friendly & Insured', desc: 'Full liability insurance, professional attendants, and a clear, itemized quote you can forward to finance. Easy to get approved internally.' },
]

const guestbookBullets = [
  'Guests record in seconds — no line, the robot comes to them',
  'Real party atmosphere in every clip, not a static backdrop',
  'Compiled year-end video delivered after the event',
]

const customizations = [
  { icon: <FiImage className="w-5 h-5" />, title: 'Custom Holiday Overlays', desc: 'A custom holiday overlay with your company logo & theme on every print — winter wonderland, elegant silver & gold, or fully custom to your brief.' },
  { icon: <FiZap className="w-5 h-5" />, title: 'Holiday Voice Greetings', desc: 'Program the robot with a custom holiday message — even in your CEO\'s voice — greeting teams and announcing every photo.' },
  { icon: <FiUsers className="w-5 h-5" />, title: 'Seasonal Robot Styling', desc: 'We dress the robot to match your theme so it fits your décor, from elegant black-tie galas to cozy sweater parties.' },
]

const testimonials = [
  { name: 'Rosanna', role: 'Project Manager, TD Canada Trust', text: 'I want to extend a huge THANK YOU to you and your team. The photo booths were very popular among attendees. You and your team were accommodating, patient and friendly from the beginning to the end of the event. The backdrop and pictures were great quality.' },
  { name: 'Michelle T.', role: 'HR Director, Tech Company (320 employees)', text: 'We spent months planning this party and the robot was the thing everyone asked about afterward. It broke down every departmental silo in the room. We\'re booking it again next year without question.' },
  { name: 'James R.', role: 'Office Manager, Financial Services', text: 'Our team is pretty reserved at these things but within 10 minutes of the robot showing up, everyone was laughing and crowding around it. The prints are still on people\'s desks three months later.' },
]

const faqs = [
  { question: 'How far in advance should we book for December?', answer: 'As early as possible. December Fridays and Saturdays are the first dates to go — we recommend booking by October. November bookings are possible but peak weekends are usually taken by then.' },
  { question: 'Which package is right for our team size?', answer: 'For parties under ~100 guests, Winter Essentials (one Robot Photobooth) is usually perfect. Choose Year-End Signature to add the Robot Video Guestbook for year-end messages and shout-outs. For 150+ guests or multi-room venues, Executive Gala brings multiple robots to keep lines short and cover every corner.' },
  { question: 'Can the prints include our logo and a holiday message?', answer: 'Yes. Every print includes a custom festive overlay with your logo, the year, and an optional short message — a thank-you from leadership, a year-end tagline, or a team inside joke.' },
  { question: 'Does the robot work in a restaurant or dimly lit venue?', answer: 'Yes. The robot has built-in lighting, so ambient or candle-lit venues aren\'t a problem. It\'s about the footprint of a person and navigates between tables without disrupting service.' },
  { question: 'Do we need to provide power, WiFi, or space?', answer: 'No. The robot runs on battery and its own connectivity. No cables, no venue WiFi, no dedicated booth space — our team handles everything.' },
  { question: 'Is an attendant included?', answer: 'Yes. Every package includes a dedicated on-site attendant who manages the robot, guides guests, and handles setup and teardown.' },
  { question: 'Can you provide a quote for internal approval?', answer: 'Absolutely. We send a clear quote you can forward to finance or procurement, and we\'re fully insured. Most teams get approval within a day or two.' },
]

const companyLogos = [
  '/images/adamas.png', '/images/bell.png', '/images/bgo.png', '/images/equifax.svg',
  '/images/geotab.png', '/images/hilton.png', '/images/infosys.png',
  '/images/pdsb.png', '/images/remax.png', '/images/ritz.webp', '/images/rlp.svg',
  '/images/stonex.png', '/images/talent.png', '/images/td.png', '/images/torontopearson.png', '/images/BMO.svg.png', '/images/tdsynnex.png', '/images/carmichael.png', '/images/siemens.png', '/images/alphawave.png', '/images/newmarket.png',
]
