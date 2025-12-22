import React, { useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import CornerNav from '../components/CornerNav'
import { useMetaPixel } from '../hooks/useMetaPixel'
import { useUTM } from '../hooks/useUTM'

const Toast = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#fce4a6] text-black px-8 py-4 rounded-xl shadow-xl flex items-center gap-3 z-50"
  >
    <div className="bg-black/10 p-2 rounded-full">
      <svg
        className="w-5 h-5 text-black"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    {message}
    <motion.span
      className="absolute bottom-0 left-0 h-1 bg-black/20 rounded-full"
      initial={{ width: "100%" }}
      animate={{ width: "0%" }}
      transition={{ duration: 3, ease: "linear" }}
    />
  </motion.div>
)

export default function Contact() {
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [navActive, setNavActive] = useState(false)
  const { trackFormSubmission } = useMetaPixel()
  const utmData = useUTM()

  return (
    <div className="min-h-screen w-full bg-black text-white pb-12">
      <Head>
        <title>Contact Us - Robo Booth</title>
        <meta name="description" content="Book Robo Booth for your next event or get in touch with any questions" />
      </Head>
      <CornerNav active={navActive} setActive={setNavActive} />
      <div className="max-w-3xl mx-auto pt-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#fce4a6]/20"
        >
          <div className="md:flex">
            {/* Contact Info */}
            <div className="bg-black text-[#fce4a6] p-8 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#fce4a6]/20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-[#fce4a6]">Get in Touch</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-1 text-white">Email</h3>
                    <p className="text-[#fce4a6]">info@robobooth.ca</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-white">Phone</h3>
                    <p className="text-[#fce4a6]">(647) 877-7699</p>
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Contact Form */}
            <div className="p-8 md:w-2/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold mb-6 text-[#fce4a6]">Book Robo Booth</h1>
                <form
                  action="https://formspree.io/f/xkgoedyp"
                  method="POST"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setIsSubmitting(true)
                    setIsSubmitting(true)

                    const form = e.target as HTMLFormElement
                    const formDataObj = new FormData(form)

                    // Track form submission
                    trackFormSubmission('Contact Page Form', 'Toronto', {
                      fn: formDataObj.get('full-name')?.toString().split(' ')[0],
                      ln: formDataObj.get('full-name')?.toString().split(' ').slice(1).join(' '),
                      em: formDataObj.get('_replyto')?.toString(),
                      ph: formDataObj.get('phone-number')?.toString(),
                      ct: 'Toronto',
                      country: 'CA',
                      ...utmData
                    })

                    try {
                      const formData = new FormData(form)

                      // Add UTM parameters to Formspree submission
                      Object.entries(utmData).forEach(([key, value]) => {
                        if (value) formData.append(key, value)
                      })

                      const response = await fetch('https://formspree.io/f/xkgoedyp', {
                        method: 'POST',
                        body: formData,
                        headers: {
                          'Accept': 'application/json'
                        }
                      })
                      if (response.ok) {
                        setShowToast(true)
                        form.reset()
                        setTimeout(() => setShowToast(false), 3000)
                      } else {
                        throw new Error('Failed to submit form')
                      }
                    } catch (error) {
                      console.error('Error submitting form:', error)
                      alert('Failed to send message. Please try again.')
                    } finally {
                      setIsSubmitting(false)
                    }
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-[#fce4a6] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      name="full-name"
                      className="w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#fce4a6] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      name="_replyto"
                      className="w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#fce4a6] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone-number"
                      className="w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#fce4a6] mb-1">
                      Event Type
                    </label>
                    <select
                      required
                      name="event-type"
                      className="w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6]"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="birthday">Birthday Party</option>
                      <option value="graduation">Graduation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#fce4a6] mb-1">
                      Budget
                    </label>
                    <select
                      required
                      name="budget"
                      className="w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6]"
                    >
                      <option value="">Select budget</option>
                      <option value="$1000-$1500">$1000-$1500 (Robot Photobooth)</option>
                      <option value="$1500-$2000">$1500-$2000 (Robot Photobooth & Bundle)</option>
                      <option value="$2000+">$2000+ (Premium Package)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#fce4a6] mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      required
                      name="event-date"
                      className="w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#fce4a6] mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      className="w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                      placeholder="Tell us about your event..."
                    />
                  </div>
                  <input type="hidden" name="source" value="Contact Page" />
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#fce4a6] text-black font-semibold py-3 rounded-xl text-lg shadow-md hover:bg-[#fce4a6]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <AnimatePresence>
          {showToast && <Toast message="Thank you! Your message has been sent." />}
        </AnimatePresence>
      </div>
    </div>
  )
} 