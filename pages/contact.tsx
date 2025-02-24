import React from 'react'
import Head from 'next/head'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FormData = {
  name: string
  email: string
  phone: string
  eventType: string
  date: string
  message: string
}

const Toast = ({ message }: { message: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="fixed top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 
      text-white px-8 py-4 rounded-xl shadow-xl flex items-center gap-3 z-50"
  >
    <div className="bg-white/20 p-2 rounded-full">
      <svg 
        className="w-5 h-5" 
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
      className="absolute bottom-0 left-0 h-1 bg-white/20 rounded-full"
      initial={{ width: "100%" }}
      animate={{ width: "0%" }}
      transition={{ duration: 3, ease: "linear" }}
    />
  </motion.div>
)

export default function Contact() {
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4">
      <Head>
        <title>Contact Us - Robo Booth</title>
        <meta name="description" content="Book Robo Booth for your next event or get in touch with any questions" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 md:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <p>info@robobooth.ca</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Phone</h3>

                    <p>(647) 877-7699</p>
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
                <h1 className="text-3xl font-bold mb-6">Book Robo Booth</h1>
                <form 
                  action="https://formspree.io/f/xkgoedyp"
                  method="POST"
                  onSubmit={async (e) => {
                    e.preventDefault()
                    setIsSubmitting(true)
                    
                    try {
                      const form = e.target as HTMLFormElement
                      const formData = new FormData(form)
                      
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      name="full-name"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      name="_replyto"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone-number"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type
                    </label>
                    <select
                      required
                      name="event-type"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      required
                      name="event-date"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us more about your event..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 text-white rounded-lg transition-colors ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <Toast message="Message sent successfully! We'll get back to you soon." />
        )}
      </AnimatePresence>
    </div>
  )
} 