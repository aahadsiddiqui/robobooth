import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { ImageTrailHero } from '../components/ImageTrailHero'
import { USPSection } from '../components/USPSection'
import { AerialBoothSection } from '../components/AerialBoothSection'
import { HowItWorks } from '../components/HowItWorks'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { HowItWorksAerial } from '../components/HowItWorksAerial'
import { WhyChooseAerialBooth } from '../components/WhyChooseAerialBooth'
import ScrollingTestimonials from '../components/ScrollingTestimonials'
import CornerNav from '../components/CornerNav'
import { FiPhone } from 'react-icons/fi'

type LeadFormData = {
  name: string
  phone: string
  eventType: string
}

export default function Home() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  const [showWelcome, setShowWelcome] = useState(false)
  const [navActive, setNavActive] = useState(false)

  useEffect(() => {
    // Show welcome message only
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true)
    }, 1000)

    return () => clearTimeout(welcomeTimer)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Head>
        <title>Robo Booth - Canada's First Robot Photobooth & Aerial Booth | GTA Photo Booth Rental</title>
        <meta name="description" content="Canada's first robot photobooth & aerial booth rental. Serving Toronto, Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, Whitchurch-Stouffville. Interactive robotic photo booth and stunning aerial booth experience for weddings, corporate events, parties." />
        <meta name="keywords" content="robot photobooth, aerial booth, Toronto photobooth rental, GTA photo booth, Ajax photobooth, Oshawa photobooth, Whitby photobooth, Markham photobooth, Vaughan photobooth, Courtice photobooth, Etobicoke photobooth, King City photobooth, Pickering photobooth, North York photobooth, Bowmanville photobooth, Mississauga photobooth, Richmond Hill photobooth, East Gwillimbury photobooth, Barrie photobooth, Whitchurch-Stouffville photobooth, wedding photobooth, corporate photobooth, party photobooth, interactive photobooth, robotic photobooth, aerial photo booth, photo booth rental Toronto, photo booth rental GTA" />
        <meta property="og:title" content="Robo Booth - Canada's First Robot Photobooth & Aerial Booth" />
        <meta property="og:description" content="Canada's first robot photobooth & aerial booth rental. Interactive robotic photo booth and stunning aerial booth experience for weddings, corporate events, parties across the GTA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://robobooth.ca" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Robo Booth - Canada's First Robot Photobooth & Aerial Booth" />
        <meta name="twitter:description" content="Canada's first robot photobooth & aerial booth rental. Interactive robotic photo booth and stunning aerial booth experience for weddings, corporate events, parties." />
        <link rel="canonical" href="https://robobooth.ca" />
      </Head>

      {/* Phone Number Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-[#fce4a6]/20">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-center items-center">
          <a
            href="tel:289-301-4039"
            className="text-[#fce4a6] font-bold text-lg hover:text-white transition-colors flex items-center gap-2"
          >
            <FiPhone className="w-5 h-5" />
            Call Now: 289-301-4039
          </a>
        </div>
      </div>

      <CornerNav active={navActive} setActive={setNavActive} />

      {/* Hero Section */}
      <ImageTrailHero />

      {/* Robot Photobooth USP Section */}
      <USPSection />

      {/* How Robot Photobooth Works Section */}
      <HowItWorks />

      {/* Why Choose Robot Photobooth Section */}
      <WhyChooseUs />

      {/* Aerial Booth Section */}
      <AerialBoothSection />

      {/* How Aerial Booth Works Section */}
      <HowItWorksAerial />

      {/* Why Choose Aerial Booth Section */}
      <WhyChooseAerialBooth />

      {/* Testimonials Section */}
      <ScrollingTestimonials />
    </div>
  )
}
