import React, { useCallback, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiCheck, FiChevronDown, FiChevronUp, FiClock, FiPhone, FiX } from 'react-icons/fi'
import Navbar from './Navbar'
import SteppedQuoteModal from './SteppedQuoteModal'
import { companyLogos } from '@/data/aerialLanding'
import type { BundleCombo, BundleLandingCopy, BundleMedia } from '@/data/bundleLanding'

const companyLogoClass = (logo: string) => {
  if (logo.includes('ritz.webp') || logo.includes('hilton.png')) return 'filter invert grayscale'
  if (
    logo.includes('tdsynnex.png') ||
    logo.includes('carmichael.png') ||
    logo.includes('siemens.png') ||
    logo.includes('alphawave.png') ||
    logo.includes('newmarket.png')
  ) {
    return 'filter invert grayscale brightness-150'
  }
  if (logo.includes('td.png')) return ''
  return 'filter brightness-0 invert'
}

function HeroMedia({ video, poster, imageAlt }: { video?: string; poster: string; imageAlt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [soundOn, setSoundOn] = useState(false)

  const arm = useCallback((el: HTMLVideoElement, withSound: boolean) => {
    el.playsInline = true
    el.defaultMuted = !withSound
    el.muted = !withSound
    el.volume = withSound ? 1 : 0
    if (withSound) el.removeAttribute('muted')
    else el.setAttribute('muted', '')
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !video) return
    arm(el, false)
    const attempt = el.play()
    if (attempt) attempt.catch(() => {})
  }, [video, arm])

  const toggleSound = () => {
    const el = videoRef.current
    if (!el) return
    const next = !soundOn
    arm(el, next)
    setSoundOn(next)
    const attempt = el.play()
    if (attempt) attempt.catch(() => {})
  }

  if (!video) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        <img src={poster} alt={imageAlt} className="w-full h-auto max-h-[70vh] object-cover object-center" />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
        <video
          ref={videoRef}
          className="w-full h-auto object-contain bg-black"
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        />
        <button
          type="button"
          onClick={toggleSound}
          className="absolute bottom-3 right-3 z-10 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-semibold text-white border border-white/20 hover:bg-black"
        >
          {soundOn ? 'Sound on' : 'Tap for sound'}
        </button>
      </div>
    </div>
  )
}

function MediaGrid({ media }: { media: BundleMedia[] }) {
  const frame = 'overflow-hidden rounded-2xl border border-white/10 bg-black'
  if (media.length === 1) {
    return (
      <div className={`${frame} shadow-2xl`}>
        <img src={media[0].src} alt={media[0].alt} className="w-full aspect-[3/4] object-cover object-center" />
      </div>
    )
  }
  if (media.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {media.map((item) => (
          <div key={item.src} className={frame}>
            <img src={item.src} alt={item.alt} className="w-full aspect-[3/4] object-cover" />
          </div>
        ))}
      </div>
    )
  }
  if (media.length === 3) {
    return (
      <div className="grid grid-cols-3 gap-2 md:gap-3">
        {media.map((item) => (
          <div key={item.src} className={frame}>
            <img src={item.src} alt={item.alt} className="w-full aspect-[3/4] object-cover" />
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      {media.slice(0, 4).map((item) => (
        <div key={item.src} className={frame}>
          <img src={item.src} alt={item.alt} className="w-full aspect-square object-cover" />
        </div>
      ))}
    </div>
  )
}

export default function BundleLanding({ copy }: { copy: BundleLandingCopy }) {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState<BundleCombo | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showSticky, setShowSticky] = useState(false)
  const [urgencyDismissed, setUrgencyDismissed] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 520)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openCombo = useCallback((combo: BundleCombo) => {
    setSelected(combo)
    setShowModal(true)
  }, [])

  const openGeneral = useCallback(() => {
    setSelected(null)
    setShowModal(true)
  }, [])

  const tierName = selected?.packageId === 'gold' ? 'Gold' : selected?.packageId === 'platinum' ? 'Platinum' : selected?.packageId === 'bronze' ? 'Bronze' : ''
  const modalTitle = selected ? `Book ${tierName} · ${selected.label}` : copy.primaryCta
  const packageLabel = selected ? `${tierName} Package — ${selected.label}` : 'Bundle inquiry — help me choose'

  const packageBanner = selected ? (
    <div className={`rounded-xl px-4 py-2.5 mb-3 text-center ${selected.packageId === 'gold' ? 'bg-[#fce4a6]' : 'bg-white/90 border border-black/10'}`}>
      <p className="text-black text-xs font-black">{tierName} · {copy.tiers.find((t) => t.id === selected.packageId)?.count}</p>
      <p className="text-black/70 text-[11px] mt-0.5">{selected.label}</p>
    </div>
  ) : null

  return (
    <>
      <Head>
        <title>{copy.seoTitle}</title>
        <meta name="description" content={copy.seoDescription} />
        <meta name="keywords" content={copy.seoKeywords} />
        <meta property="og:title" content={copy.ogTitle} />
        <meta property="og:description" content={copy.seoDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://robobooth.ca${copy.path}`} />
        <meta property="og:image" content={`https://robobooth.ca${copy.heroPoster}`} />
        <link rel="canonical" href={`https://robobooth.ca${copy.path}`} />
      </Head>

      <div className={showModal ? 'blur-sm pointer-events-none select-none' : ''}>
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <Navbar />

          {!urgencyDismissed && (
            <div className="fixed top-16 md:top-[4.5rem] left-0 right-0 z-40 bg-[#fce4a6] text-black text-center py-2 px-4">
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold">
                <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{copy.urgency} — <button type="button" onClick={openGeneral} className="underline font-bold">check your date</button></span>
                <button type="button" onClick={() => setUrgencyDismissed(true)} className="ml-2 text-black/50 hover:text-black" aria-label="Dismiss">
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <section className={`relative ${urgencyDismissed ? 'pt-20 md:pt-24' : 'pt-[7rem] md:pt-[8rem]'} pb-8 md:pb-12 px-4`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#fce4a620_0%,_transparent_50%)] pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400 text-sm" aria-hidden>★★★★★</div>
                  <span className="text-white/60 text-xs font-medium">{copy.eyebrow}</span>
                </div>
                <h1 className="text-[1.7rem] leading-[1.12] md:text-4xl lg:text-5xl font-black md:leading-[1.08] mb-4">
                  {copy.headlineLead}{' '}
                  <span className="text-[#fce4a6]">{copy.headlineAccent}</span>
                </h1>
                <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-5 max-w-xl">
                  {copy.subheadline}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {['2 booths', '3 booths', '4 booths +'].map((item) => (
                    <a key={item} href="#packages" className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-black bg-[#fce4a6] rounded-full px-3 py-1 hover:bg-white transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <button
                    type="button"
                    onClick={openGeneral}
                    className="w-full sm:w-auto bg-[#fce4a6] text-black px-6 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:bg-white transition-colors"
                  >
                    {copy.primaryCta} <FiArrowRight className="inline ml-1.5" />
                  </button>
                  <a href="tel:289-301-4039" className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#fce4a6]/40 text-[#fce4a6] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#fce4a6]/10 transition-colors">
                    <FiPhone className="w-4 h-4" /> 289-301-4039
                  </a>
                </div>
                <p className="text-white/40 text-[11px] md:text-xs">{copy.microCopy}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <HeroMedia
                  video={copy.heroVideo}
                  poster={copy.heroPoster}
                  imageAlt="Two Robot Photobooths staged for an event"
                />
              </motion.div>
            </div>
          </section>

          <section className="py-4 md:py-6 border-y border-[#fce4a6]/10 overflow-hidden">
            <p className="text-center text-[#fce4a6]/60 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-3 px-4">
              {copy.marqueeLabel}
            </p>
            <div className="relative w-full overflow-hidden">
              <div className="animate-marquee flex items-center gap-10 md:gap-14 px-4">
                {[...companyLogos, ...companyLogos].map((logo, i) => (
                  <div key={`${logo}-${i}`} className="flex-shrink-0 w-28 md:w-40 h-16 md:h-20 flex items-center justify-center">
                    <img src={logo} alt="" className={`w-full h-full object-contain opacity-60 ${companyLogoClass(logo)}`} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {copy.stories.map((story, index) => {
            const flipped = index % 2 === 0
            return (
              <section key={story.combo.id} className="py-10 md:py-16 px-4 border-b border-white/5">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: flipped ? 28 : -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.55 }}
                    className={flipped ? 'lg:order-2' : 'lg:order-1'}
                  >
                    <p className="text-[#fce4a6] text-[10px] md:text-xs font-bold tracking-[0.18em] uppercase mb-2">{story.eyebrow}</p>
                    <h2 className="text-2xl md:text-4xl font-black leading-tight mb-3">
                      {story.title}{' '}
                      <span className="text-[#fce4a6]">{story.accent}</span>
                    </h2>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">{story.body}</p>
                    <ul className="space-y-2 mb-5">
                      {story.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-white/80">
                          <FiCheck className="w-4 h-4 text-[#fce4a6] mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => openCombo(story.combo)}
                      className="bg-[#fce4a6] text-black px-5 py-3 rounded-full font-bold text-sm hover:bg-white transition-colors"
                    >
                      {story.cta} <FiArrowRight className="inline ml-1" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: flipped ? -28 : 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.55, delay: 0.08 }}
                    className={flipped ? 'lg:order-1' : 'lg:order-2'}
                  >
                    <MediaGrid media={story.media} />
                  </motion.div>
                </div>
              </section>
            )
          })}

          <section className="py-8 md:py-10 px-4 border-b border-white/5">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
              {copy.proof.map((item) => (
                <figure key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-[#fce4a6] text-xs mb-2" aria-hidden>★★★★★</div>
                  <blockquote className="text-sm md:text-base text-white/85 leading-relaxed">&ldquo;{item.quote}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-xs text-white/50">
                    <span className="text-white font-bold">{item.name}</span> · {item.role}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="packages" className="py-12 md:py-16 px-4 scroll-mt-28">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <p className="text-[#fce4a6]/70 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2">{copy.packagesEyebrow}</p>
                <h2 className="text-2xl md:text-4xl font-black mb-2">{copy.packagesTitle}</h2>
                <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto">{copy.packagesSubtitle}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 items-stretch">
                {copy.tiers.map((tier) => (
                  <div
                    key={tier.id}
                    className={`rounded-3xl border p-5 md:p-6 flex flex-col ${
                      tier.highlight
                        ? 'bg-[#fce4a6] text-black border-[#fce4a6] lg:-translate-y-2 shadow-xl shadow-[#fce4a6]/10'
                        : 'bg-white/[0.04] border-white/10'
                    }`}
                  >
                    <p className={`text-[10px] font-black tracking-[0.16em] uppercase ${tier.highlight ? 'text-black/60' : 'text-[#fce4a6]'}`}>
                      {tier.badge}
                    </p>
                    <p className="text-3xl font-black mt-2">{tier.count}</p>
                    <h3 className="text-lg font-bold mt-1">{tier.title}</h3>
                    <p className={`text-sm leading-relaxed mt-2 mb-4 ${tier.highlight ? 'text-black/70' : 'text-white/60'}`}>{tier.outcome}</p>
                    <div className="space-y-2 mt-auto">
                      {tier.combos.map((combo) => (
                        <button
                          key={combo.id}
                          type="button"
                          onClick={() => openCombo(combo)}
                          className={`w-full text-left rounded-2xl px-4 py-3 transition-colors ${
                            tier.highlight
                              ? 'bg-black text-white hover:bg-black/80'
                              : 'bg-white/5 border border-white/10 hover:border-[#fce4a6]/40'
                          }`}
                        >
                          <span className="block text-sm font-bold">{combo.label}</span>
                          <span className={`block text-[11px] mt-1 leading-snug ${tier.highlight ? 'text-white/60' : 'text-white/45'}`}>{combo.detail}</span>
                          <span className="block text-[11px] font-bold mt-2 text-[#fce4a6]">
                            Reserve this mix <FiArrowRight className="inline" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-white/40 text-xs mt-5">Attendant, delivery, and teardown included on every station.</p>
            </div>
          </section>

          <section className="py-10 md:py-14 px-4 border-t border-white/5">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-center mb-5">Questions before you book</h2>
              <div className="space-y-2">
                {copy.faqs.map((faq, i) => (
                  <button
                    key={faq.question}
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full text-left bg-white/[0.04] border border-white/10 rounded-xl p-4 hover:border-[#fce4a6]/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-bold text-sm md:text-base text-white/90">{faq.question}</h3>
                      {expandedFaq === i ? <FiChevronUp className="text-[#fce4a6] flex-shrink-0" /> : <FiChevronDown className="text-[#fce4a6] flex-shrink-0" />}
                    </div>
                    <AnimatePresence>
                      {expandedFaq === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-white/60 text-sm mt-2 leading-relaxed"
                        >
                          {faq.answer}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 md:py-16 px-4 border-t border-white/5">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-4xl font-black mb-3">
                {copy.finalLead} <span className="text-[#fce4a6]">{copy.finalAccent}</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-6 max-w-xl mx-auto">{copy.finalSub}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={openGeneral}
                  className="bg-[#fce4a6] text-black px-7 py-3.5 rounded-full font-bold text-sm md:text-base hover:bg-white transition-colors"
                >
                  {copy.primaryCta} <FiArrowRight className="inline ml-1.5" />
                </button>
                <a href="tel:289-301-4039" className="flex items-center justify-center gap-2 text-[#fce4a6] font-semibold text-sm">
                  <FiPhone className="w-4 h-4" /> 289-301-4039
                </a>
              </div>
              <p className="text-white/30 text-[11px] mt-3">{copy.microCopy}</p>
            </div>
          </section>

          <div className="h-24 md:h-16" />
        </div>
      </div>

      <SteppedQuoteModal
        open={showModal}
        onClose={() => { setShowModal(false); setSelected(null) }}
        title={modalTitle}
        subtitle="Tell us the date. We confirm whether that mix is free within 15 minutes."
        packageBanner={packageBanner}
        eventType={copy.eventType}
        packageLabel={packageLabel}
        source={copy.source}
        packageTier={selected?.packageId ?? ''}
        pricingContext={copy.pricingContext}
      />

      <AnimatePresence>
        {!showModal && showSticky && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-[#fce4a6]/30 px-3 py-3 md:hidden"
          >
            <div className="flex gap-2">
              <a href="tel:289-301-4039" className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-[#fce4a6]/30 text-[#fce4a6] py-3 rounded-full font-bold text-sm">
                <FiPhone className="w-4 h-4" /> Call
              </a>
              <a href="#packages" className="flex-[2] flex items-center justify-center bg-[#fce4a6] text-black py-3 rounded-full font-bold text-sm">
                Choose 2, 3, or 4
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!showModal && showSticky && (
          <motion.a
            href="#packages"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-3.5 rounded-full shadow-xl items-center gap-2 hover:bg-white transition-colors text-sm"
          >
            Choose 2, 3, or 4 <FiArrowRight className="w-4 h-4" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  )
}
