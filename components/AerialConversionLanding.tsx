import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowRight,
  FiCamera,
  FiCheck,
  FiClock,
  FiPhone,
  FiPlus,
  FiShare2,
  FiStar,
  FiX,
} from 'react-icons/fi'
import Navbar from './Navbar'
import GalleryCarousel from './GalleryCarousel'
import SteppedQuoteModal from './SteppedQuoteModal'
import {
  additionalBooths,
  companyLogos,
  venueMarqueeItems,
  type AerialLandingCopy,
  type AerialPackage,
} from '@/data/aerialLanding'

const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

/** Safari-safe muted autoplay (must be visible — never start at opacity:0) */
function HeroSideVideo({
  src,
  poster,
  className = '',
  autoPlayOnMount = true,
}: {
  src: string
  poster: string
  className?: string
  autoPlayOnMount?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Set muted BEFORE paint — React's `muted` prop alone is unreliable in Safari
  useLayoutEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.defaultMuted = true
    video.muted = true
    video.volume = 0
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', 'true')
  }, [src])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let cancelled = false
    let tries = 0

    const play = () => {
      if (cancelled || !video) return
      video.muted = true
      video.volume = 0
      const attempt = video.play()
      if (attempt) {
        attempt.catch(() => {
          if (cancelled || tries >= 8) return
          tries += 1
          window.setTimeout(play, 200 * tries)
        })
      }
    }

    if (autoPlayOnMount) {
      play()
      video.addEventListener('loadeddata', play)
      video.addEventListener('canplay', play)
      // Safari often needs a tick after layout/fonts
      const t1 = window.setTimeout(play, 100)
      const t2 = window.setTimeout(play, 500)
      const t3 = window.setTimeout(play, 1200)

      return () => {
        cancelled = true
        window.clearTimeout(t1)
        window.clearTimeout(t2)
        window.clearTimeout(t3)
        video.removeEventListener('loadeddata', play)
        video.removeEventListener('canplay', play)
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.4 }
    )
    io.observe(video)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [src, autoPlayOnMount])

  return (
    <video
      ref={videoRef}
      className={`hero-autoplay-video w-full h-auto max-h-[50vh] md:max-h-none md:h-[480px] lg:h-[520px] object-contain bg-black ${className}`}
      style={{ display: 'block' }}
      autoPlay={autoPlayOnMount}
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      controls={false}
      disablePictureInPicture
      aria-label="Aerial Booth demo video"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

const featureIcons = [
  <FiCamera key="cam" className="w-5 h-5 md:w-6 md:h-6" />,
  <FiStar key="star" className="w-5 h-5 md:w-6 md:h-6" />,
  <FiShare2 key="share" className="w-5 h-5 md:w-6 md:h-6" />,
]

function logoFilterClass(logo: string) {
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

function BoothChoicePreview({ variant }: { variant: 'gold' | 'platinum' }) {
  const border =
    variant === 'gold' ? 'border-[#fce4a6]/20 bg-[#fce4a6]/5' : 'border-white/15 bg-white/[0.04]'
  const label = variant === 'gold' ? 'text-[#fce4a6]/80' : 'text-white/50'

  return (
    <div className={`mt-4 rounded-xl border p-3 ${border}`}>
      <p className={`text-[9px] font-black uppercase tracking-widest mb-2.5 ${label}`}>
        Choose from these additional booths
      </p>
      <div className="grid grid-cols-2 gap-2">
        {additionalBooths.map((booth) => (
          <div
            key={booth.id}
            className="rounded-lg overflow-hidden border border-white/10 bg-black/50"
          >
            <div className="relative aspect-[4/3] bg-black">
              <img
                src={booth.image}
                alt={booth.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="px-2 py-1.5 text-[10px] font-semibold text-white/80 leading-tight text-center">
              {booth.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function MediaAddOnBlock({ variant }: { variant: 'gold' | 'platinum' }) {
  const styles =
    variant === 'gold'
      ? 'border-[#fce4a6]/25 bg-[#fce4a6]/5'
      : 'border-white/15 bg-white/[0.05]'
  const title = variant === 'gold' ? 'text-[#fce4a6]/90' : 'text-white/70'
  const body = variant === 'gold' ? 'text-[#fce4a6]/70' : 'text-white/50'
  const iconWrap =
    variant === 'gold'
      ? 'bg-[#fce4a6]/15 text-[#fce4a6] border-[#fce4a6]/30'
      : 'bg-white/10 text-white/70 border-white/15'

  return (
    <div className={`mt-4 rounded-xl border p-3.5 ${styles}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border ${iconWrap}`}>
          <FiCamera className="w-3.5 h-3.5" />
        </span>
        <div>
          <p className={`text-[10px] font-black uppercase tracking-widest ${title}`}>
            Optional Add-on
          </p>
          <p className={`text-[11px] font-bold text-white`}>Photography & Videography</p>
        </div>
      </div>
      <ul className="space-y-1.5">
        {[
          'Professional event photography coverage',
          'Cinematic videography & highlight reel',
          'Edited gallery delivered within ~1 week',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <FiPlus className={`w-3 h-3 mt-0.5 flex-shrink-0 ${title}`} />
            <span className={`text-[10px] leading-relaxed ${body}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PackageCard({
  pkg,
  index,
  onBook,
}: {
  pkg: AerialPackage
  index: number
  onBook: () => void
}) {
  const isGold = pkg.highlight
  const isPlatinum = pkg.id === 'platinum'

  const shell = isGold
    ? 'relative rounded-3xl overflow-hidden border-2 border-[#fce4a6]/50 bg-gradient-to-br from-[#fce4a6]/10 via-black to-black p-6 md:p-7 shadow-2xl shadow-[#fce4a6]/10 h-full flex flex-col'
    : isPlatinum
      ? 'relative rounded-3xl overflow-hidden border-2 border-white/40 bg-gradient-to-br from-white/[0.08] via-black to-black p-6 md:p-7 h-full flex flex-col'
      : 'relative rounded-3xl border border-white/20 bg-white/[0.04] p-6 md:p-7 h-full flex flex-col'

  const badge = isGold
    ? 'inline-flex items-center gap-2 bg-[#fce4a6] text-black text-[10px] md:text-[11px] font-black tracking-widest uppercase px-3 md:px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap'
    : isPlatinum
      ? 'inline-flex items-center gap-1.5 bg-gradient-to-r from-white/20 to-white/10 text-white text-[10px] md:text-[11px] font-black tracking-wider uppercase px-3 md:px-4 py-1.5 rounded-full border border-white/30 whitespace-nowrap'
      : 'inline-flex items-center gap-2 bg-white/10 text-white/70 text-[10px] md:text-[11px] font-black tracking-widest uppercase px-3 md:px-4 py-1.5 rounded-full whitespace-nowrap'

  const check = isGold ? 'text-[#fce4a6]' : isPlatinum ? 'text-white/70' : 'text-white/40'
  const body = isGold ? 'text-white/70' : 'text-white/60'

  return (
    <Reveal delay={index * 0.1} className="h-full">
      <div className={shell} style={isPlatinum ? { boxShadow: '0 0 40px rgba(255,255,255,0.06)' } : undefined}>
        {isGold && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#fce4a625_0%,_transparent_65%)] pointer-events-none" />
        )}
        {isPlatinum && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.07)_0%,_transparent_60%)] pointer-events-none" />
        )}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-center mb-4">
            <span className={badge}>{pkg.badge}</span>
          </div>
          <h3 className="text-lg md:text-xl font-black text-center mb-2">{pkg.title}</h3>
          <p className="text-white/50 text-xs text-center mb-6">{pkg.desc}</p>
          <div className="space-y-2.5 flex-1">
            {pkg.benefits.map((b) => (
              <div key={b} className="flex items-start gap-3">
                <FiCheck className={`w-4 h-4 mt-0.5 flex-shrink-0 ${check}`} />
                <p className={`${body} text-xs leading-relaxed`}>{b}</p>
              </div>
            ))}
            {pkg.showBoothChoice && (pkg.id === 'gold' || pkg.id === 'platinum') && (
              <BoothChoicePreview variant={pkg.id} />
            )}
            {pkg.photographyAddOn && (pkg.id === 'gold' || pkg.id === 'platinum') && (
              <MediaAddOnBlock variant={pkg.id} />
            )}
          </div>
          <div className="text-center mt-6">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBook}
              className={
                isGold
                  ? 'bg-[#fce4a6] text-black px-4 py-3 rounded-full font-black text-xs md:text-sm shadow-lg shadow-[#fce4a6]/30 hover:shadow-xl transition-all group w-full'
                  : isPlatinum
                    ? 'bg-white text-black px-4 py-3 rounded-full font-black text-xs md:text-sm hover:bg-white/90 transition-all group w-full shadow-lg shadow-white/10'
                    : 'border-2 border-white/30 text-white px-4 py-3 rounded-full font-bold text-xs md:text-sm hover:bg-white/10 transition-all group w-full'
              }
            >
              {pkg.cta} <FiArrowRight className="inline ml-1 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-white/30 text-[10px] mt-2">Responses in &lt;15 mins · No credit card required</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function AerialConversionLanding({ copy }: { copy: AerialLandingCopy }) {
  const [showModal, setShowModal] = useState(false)
  const [packageType, setPackageType] = useState<'bronze' | 'gold' | 'platinum' | ''>('')
  const [showSticky, setShowSticky] = useState(false)
  const [urgencyDismissed, setUrgencyDismissed] = useState(false)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    const fn = () => setShowSticky(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  useEffect(() => {
    const t = setTimeout(() => setShowModal(true), 25000)
    return () => clearTimeout(t)
  }, [])

  const openQuote = useCallback(() => {
    setPackageType('')
    setShowModal(true)
  }, [])
  const openBronze = useCallback(() => {
    setPackageType('bronze')
    setShowModal(true)
  }, [])
  const openGold = useCallback(() => {
    setPackageType('gold')
    setShowModal(true)
  }, [])
  const openPlatinum = useCallback(() => {
    setPackageType('platinum')
    setShowModal(true)
  }, [])

  const modalTitle =
    packageType === 'gold'
      ? 'Book Gold Package'
      : packageType === 'bronze'
        ? 'Book Bronze Package'
        : packageType === 'platinum'
          ? 'Book Platinum Package'
          : copy.primaryCta

  const packageLabel =
    packageType === 'gold'
      ? copy.packageLabels.gold
      : packageType === 'platinum'
        ? copy.packageLabels.platinum
        : packageType === 'bronze'
          ? copy.packageLabels.bronze
          : 'General Inquiry'

  const packageBanner = (
    <>
      {packageType === 'bronze' && (
        <div className="bg-white/90 border border-black/10 rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">Bronze Package Selected</span>
          <span className="text-black/60 text-[10px]">{copy.packageBannerSubtitles.bronze}</span>
        </div>
      )}
      {packageType === 'gold' && (
        <div className="bg-[#fce4a6] rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">⭐ Gold Package Selected</span>
          <span className="text-black/60 text-[10px]">{copy.packageBannerSubtitles.gold}</span>
        </div>
      )}
      {packageType === 'platinum' && (
        <div className="bg-gradient-to-r from-white/95 to-gray-100 border border-gray-300 rounded-xl px-4 py-2.5 mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span className="text-black text-xs font-black">💎 Platinum Package Selected</span>
          <span className="text-black/60 text-[10px]">{copy.packageBannerSubtitles.platinum}</span>
        </div>
      )}
    </>
  )

  return (
    <>
      <Head>
        <title>{copy.seoTitle}</title>
        <meta name="description" content={copy.seoDescription} />
        <meta name="keywords" content={copy.seoKeywords} />
        <meta property="og:title" content={copy.ogTitle} />
        <meta property="og:description" content={copy.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://robobooth.ca${copy.path}`} />
        <link rel="canonical" href={`https://robobooth.ca${copy.path}`} />
        <link rel="preload" href={copy.heroPoster} as="image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={showModal ? 'blur-sm pointer-events-none select-none' : ''}>
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
          <Navbar />

          {!urgencyDismissed && (
            <div className="fixed top-16 md:top-[4.5rem] left-0 right-0 z-40 bg-[#fce4a6] text-black text-center py-2 px-4">
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold">
                <FiClock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  {copy.urgency} —{' '}
                  <button onClick={openQuote} className="underline font-bold">
                    {copy.variant === 'private' ? 'secure your date' : 'check availability now'}
                  </button>
                </span>
                <button onClick={() => setUrgencyDismissed(true)} className="ml-2 text-black/50 hover:text-black">
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Hero — text left, clear video right (matches other product pages) */}
          <section
            className={`relative ${urgencyDismissed ? 'pt-20 md:pt-24' : 'pt-[7rem] md:pt-[8rem]'} pb-6 md:pb-8 px-4`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#fce4a620_0%,_transparent_50%)] pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    <span className="text-white/60 text-xs font-medium">{copy.heroEyebrow}</span>
                  </div>
                  <h1 className="text-[1.65rem] leading-[1.15] md:text-4xl lg:text-5xl font-black md:leading-[1.1] mb-4">
                    {copy.headlineLead}{' '}
                    <span className="text-[#fce4a6]">{copy.headlineAccent}</span>
                    {copy.headlineRest}
                  </h1>
                  <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-5 max-w-xl">
                    {copy.subheadline}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mb-3">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={openQuote}
                      className="w-full sm:w-auto bg-[#fce4a6] text-black px-6 py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group text-center"
                    >
                      {copy.primaryCta}{' '}
                      <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    <a
                      href="tel:289-301-4039"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-[#fce4a6]/40 text-[#fce4a6] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#fce4a6]/10 transition-all text-center"
                    >
                      <FiPhone className="w-4 h-4" /> Call 289-301-4039
                    </a>
                  </div>
                  <p className="text-white/40 text-[11px] md:text-xs">{copy.microCopy}</p>
                </motion.div>

                {/* No opacity animation on the video — Safari blocks autoplay when opacity starts at 0 */}
                <div className="-mx-4 md:mx-0">
                  <div className="overflow-hidden bg-black border-y border-white/10 md:rounded-2xl md:border md:border-white/10 md:shadow-2xl">
                    <HeroSideVideo src={copy.heroVideo} poster={copy.heroPoster} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Marquee */}
          <section className="py-4 md:py-6 border-y border-[#fce4a6]/10 overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto px-4 mb-3">
              <p className="text-center text-[#fce4a6]/60 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase">
                {copy.marqueeLabel}
              </p>
            </div>
            <div className="relative w-full overflow-hidden">
              {copy.marqueeMode === 'logos' ? (
                <div className="animate-marquee flex items-center gap-10 md:gap-14 px-4">
                  {[...companyLogos, ...companyLogos].map((logo, i) => (
                    <div key={`${logo}-${i}`} className="flex-shrink-0 w-32 md:w-44 h-20 md:h-24 flex items-center justify-center">
                      <img
                        src={logo}
                        alt="Client logo"
                        className={`w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity ${logoFilterClass(logo)}`}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="animate-marquee flex items-center gap-8 md:gap-12 px-4">
                  {[...venueMarqueeItems, ...venueMarqueeItems].map((item, i) => (
                    <div
                      key={`${item.label}-${i}`}
                      className="flex-shrink-0 flex items-center gap-2 text-white/55 hover:text-[#fce4a6] transition-colors"
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.label}
                          className={`h-8 md:h-10 w-auto object-contain opacity-70 ${logoFilterClass(item.logo)}`}
                          loading="lazy"
                        />
                      ) : null}
                      <span className="text-sm md:text-base font-semibold whitespace-nowrap">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Value proposition */}
          <section className="py-10 md:py-14 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">
                  {copy.featuresTitleLead} <span className="text-[#fce4a6]">{copy.featuresTitleAccent}</span>
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {copy.features.map((feature, i) => (
                  <Reveal key={feature.title} delay={i * 0.08}>
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 md:p-6 h-full hover:border-[#fce4a6]/30 transition-colors">
                      <div className="text-[#fce4a6] mb-3">{featureIcons[i]}</div>
                      <h3 className="font-bold text-base md:text-lg mb-2">{feature.title}</h3>
                      <p className="text-white/55 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {copy.secondaryVideo ? (
                <Reveal delay={0.15} className="mt-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-2">
                      {copy.galleryTitleLead}{' '}
                      <span className="text-[#fce4a6]">{copy.galleryTitleAccent}</span>
                    </h3>
                    <p className="text-white/50 text-sm md:text-base">{copy.gallerySubtitle}</p>
                  </div>
                  <GalleryCarousel
                    images={copy.gallery}
                    onImageClick={(img) => setLightbox({ src: img.src, alt: img.alt })}
                  />
                </Reveal>
              ) : null}
            </div>
          </section>

          {/* Image Gallery (standalone — corporate) */}
          {!copy.secondaryVideo && (
            <section className="py-10 md:py-14 px-4 border-t border-white/5">
              <div className="max-w-5xl mx-auto">
                <Reveal className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">
                    {copy.galleryTitleLead} <span className="text-[#fce4a6]">{copy.galleryTitleAccent}</span>
                  </h2>
                  <p className="text-white/50 text-sm md:text-base">{copy.gallerySubtitle}</p>
                </Reveal>
                <Reveal>
                  <GalleryCarousel
                    images={copy.gallery}
                    onImageClick={(img) => setLightbox({ src: img.src, alt: img.alt })}
                  />
                </Reveal>
              </div>
            </section>
          )}

          {/* Process */}
          <section className="py-8 md:py-12 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">
                  {copy.processTitleLead} <span className="text-[#fce4a6]">{copy.processTitleAccent}</span>
                </h2>
                <p className="text-white/50 text-sm md:text-base">{copy.processSubtitle}</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {copy.steps.map((step, i) => (
                  <Reveal key={step.title} delay={i * 0.12} className="relative">
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 md:p-6 text-center hover:border-[#fce4a6]/30 transition-colors h-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#fce4a6]/10 border border-[#fce4a6]/30 flex items-center justify-center mx-auto mb-4">
                        <span className="text-[#fce4a6] font-black text-lg md:text-xl">{i + 1}</span>
                      </div>
                      <p className="text-[10px] font-black tracking-widest uppercase text-white/35 mb-1">
                        Step {i + 1}
                      </p>
                      <h3 className="font-bold text-sm md:text-base mb-1.5 text-white">{step.title}</h3>
                      <p className="text-white/50 text-xs md:text-sm leading-relaxed">{step.desc}</p>
                    </div>
                    {i < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-[#fce4a6]/30 text-2xl">→</div>
                    )}
                  </Reveal>
                ))}
              </div>

              {copy.secondaryVideo ? (
                <Reveal delay={0.15} className="mt-8">
                  <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                    <HeroSideVideo
                      src={copy.secondaryVideo}
                      poster={copy.secondaryPoster ?? copy.heroPoster}
                      autoPlayOnMount={false}
                    />
                  </div>
                </Reveal>
              ) : null}
            </div>
          </section>

          {/* Packages */}
          <section className="py-10 md:py-14 px-4">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">
                  Choose Your <span className="text-[#fce4a6]">{copy.packagesTitle.replace(' Packages', '')}</span> Package
                </h2>
                <p className="text-white/50 text-sm md:text-base">{copy.packagesSubtitle}</p>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch">
                {copy.packages.map((pkg, i) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    index={i}
                    onBook={pkg.id === 'bronze' ? openBronze : pkg.id === 'gold' ? openGold : openPlatinum}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Social proof */}
          <section className="py-8 md:py-12 px-4 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
              <Reveal className="text-center mb-6">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-1.5">
                  {copy.testimonialsTitleLead} <span className="text-[#fce4a6]">{copy.testimonialsTitleAccent}</span>
                </h2>
                <a
                  href="https://g.co/kgs/v9p1CzT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#fce4a6] hover:text-white transition-colors text-xs md:text-sm mt-2"
                >
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-white/50">5.0 on Google</span>
                </a>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {copy.testimonials.map((t, i) => (
                  <Reveal
                    key={t.name}
                    delay={i * 0.08}
                    className="bg-white/[0.04] border border-white/10 rounded-xl p-4 md:p-5 hover:border-[#fce4a6]/20 transition-colors"
                  >
                    <div className="flex text-[#fce4a6]/70 text-xs mb-3">★★★★★</div>
                    <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#fce4a6]/20 flex items-center justify-center text-[#fce4a6] text-[10px] font-bold">
                        {t.name[0]}
                      </div>
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

          {/* Footer CTA */}
          <section className="py-10 md:py-14 px-4 border-t border-white/5">
            <Reveal className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl lg:text-4xl font-black mb-2 md:mb-3">
                {copy.finalHeadlineLead} <span className="text-[#fce4a6]">{copy.finalHeadlineAccent}</span>
              </h2>
              <p className="text-white/60 text-xs md:text-sm lg:text-base mb-5 max-w-lg mx-auto">{copy.finalSub}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={openQuote}
                  className="w-full sm:w-auto bg-[#fce4a6] text-black px-7 py-3.5 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg shadow-[#fce4a6]/20 hover:shadow-xl transition-all group"
                >
                  {copy.finalCta} <FiArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <a
                  href="tel:289-301-4039"
                  className="flex items-center gap-2 text-[#fce4a6] text-sm font-semibold hover:text-white transition-colors"
                >
                  <FiPhone className="w-4 h-4" /> 289-301-4039
                </a>
              </div>
              <p className="text-white/30 text-[10px] md:text-xs mt-2">{copy.microCopy}</p>
            </Reveal>
          </section>

          <div className="h-20 md:h-16" />
        </div>
      </div>

      <SteppedQuoteModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setPackageType('')
        }}
        title={modalTitle}
        subtitle="Tell us your event date and we'll confirm availability within 15 minutes."
        packageBanner={packageBanner}
        eventType={copy.eventType}
        packageLabel={packageLabel}
        source={copy.source}
        packageTier={packageType}
        pricingContext={copy.pricingContext}
      />

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery lightbox"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showModal && showSticky && (
          <>
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-[#fce4a6]/30 px-3 py-3 safe-area-pb"
            >
              <div className="flex gap-2">
                <a
                  href="tel:289-301-4039"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 border border-[#fce4a6]/30 text-[#fce4a6] py-3 rounded-full font-bold text-sm"
                >
                  <FiPhone className="w-4 h-4" /> Call Now
                </a>
                <button
                  onClick={openQuote}
                  className="flex-[2] flex items-center justify-center gap-2 bg-[#fce4a6] text-black py-3 rounded-full font-bold text-sm shadow-lg shadow-[#fce4a6]/20"
                >
                  {copy.stickyCta} <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openQuote}
              className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#fce4a6] text-black font-bold px-6 py-3.5 rounded-full shadow-xl shadow-black/40 hover:bg-white transition-colors text-sm items-center gap-2"
            >
              {copy.stickyCta} <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
