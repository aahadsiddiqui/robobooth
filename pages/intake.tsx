import React, { useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

export default function IntakePage() {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (typeof e.data === 'object' && e.data.action === 'setHeight') {
        const iframe = document.getElementById('JotFormIFrame-261057837328059') as HTMLIFrameElement
        if (iframe) iframe.style.height = e.data.height + 'px'
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <>
      <Head>
        <title>Event Details Form | RoboBooth</title>
        <meta name="description" content="Submit your event details and customization preferences for your upcoming RoboBooth experience." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navbar />

        {/* ── Header ── */}
        <section className="pt-28 md:pt-32 pb-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-[#fce4a6]/10 border border-[#fce4a6]/30 rounded-full px-4 py-1.5 mb-4">
              <span className="text-[#fce4a6] text-xs font-semibold tracking-wide uppercase">Booking Confirmed</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black mb-3">
              Let&apos;s Customize Your{' '}
              <span className="text-[#fce4a6]">RoboBooth Experience.</span>
            </h1>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Please fill out the details below so we can tailor everything — from your custom overlay and robot outfit to venue access — before your event.
            </p>
          </motion.div>
        </section>

        {/* ── Steps ── */}
        <section className="pb-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { num: '1', label: 'Point of Contact' },
              { num: '2', label: 'Logo & Overlay' },
              { num: '3', label: 'Robot Customization' },
              { num: '4', label: 'Venue Access' },
            ].map((step) => (
              <div key={step.num} className="bg-white/[0.04] border border-white/10 rounded-xl p-3 text-center">
                <div className="w-7 h-7 rounded-full bg-[#fce4a6]/15 border border-[#fce4a6]/30 flex items-center justify-center mx-auto mb-1.5">
                  <span className="text-[#fce4a6] text-xs font-black">{step.num}</span>
                </div>
                <p className="text-white/60 text-[11px] font-medium">{step.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Jotform Embed ── */}
        <section className="pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <iframe
              id="JotFormIFrame-261057837328059"
              title="Event Details & Customization Form"
              allowTransparency={true}
              allow="geolocation; microphone; camera; fullscreen"
              src="https://form.jotform.com/261057837328059"
              frameBorder="0"
              style={{
                minWidth: '100%',
                maxWidth: '100%',
                height: '1600px',
                border: 'none',
                display: 'block',
              }}
              scrolling="yes"
            />
          </motion.div>
          <p className="text-white/30 text-xs text-center mt-4">
            Having trouble with the form?{' '}
            <a href="mailto:info@robobooth.ca" className="text-[#fce4a6] underline hover:text-white transition-colors">
              Email us directly
            </a>{' '}
            and we&apos;ll sort it out.
          </p>
        </section>
      </div>
    </>
  )
}
