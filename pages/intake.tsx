import React, { useState } from 'react'
import Head from 'next/head'
import { motion, AnimatePresence } from 'framer-motion'
import CornerNav from '../components/CornerNav'
import { FiUpload, FiX, FiCheck } from 'react-icons/fi'

const Toast = ({ message, type = 'success' }: { message: string; type?: 'success' | 'error' }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#fce4a6] text-black px-8 py-4 rounded-xl shadow-xl flex items-center gap-3 z-50"
  >
    <div className="bg-black/10 p-2 rounded-full">
      {type === 'success' ? (
        <FiCheck className="w-5 h-5 text-black" />
      ) : (
        <FiX className="w-5 h-5 text-black" />
      )}
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

interface FormData {
  companyLogo: File | null
  inspirationImages: File[]
  filterText: string
  robotTheme: string
  voiceActivation: string
  contactName: string
  contactEmail: string
  contactPhone: string
  loadingInstructions: string
}

export default function Intake() {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [navActive, setNavActive] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    companyLogo: null,
    inspirationImages: [],
    filterText: '',
    robotTheme: '',
    voiceActivation: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    loadingInstructions: ''
  })

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [inspirationPreviews, setInspirationPreviews] = useState<string[]>([])

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, companyLogo: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInspirationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newImages = [...formData.inspirationImages, ...files]
      setFormData({ ...formData, inspirationImages: newImages })
      
      files.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setInspirationPreviews(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeInspirationImage = (index: number) => {
    const newImages = formData.inspirationImages.filter((_, i) => i !== index)
    const newPreviews = inspirationPreviews.filter((_, i) => i !== index)
    setFormData({ ...formData, inspirationImages: newImages })
    setInspirationPreviews(newPreviews)
  }

  const removeLogo = () => {
    setFormData({ ...formData, companyLogo: null })
    setLogoPreview(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      
      // Append all form fields
      if (formData.companyLogo) {
        submitData.append('companyLogo', formData.companyLogo)
      }
      
      formData.inspirationImages.forEach((image, index) => {
        submitData.append(`inspirationImage_${index}`, image)
      })
      
      submitData.append('filterText', formData.filterText)
      submitData.append('robotTheme', formData.robotTheme)
      submitData.append('voiceActivation', formData.voiceActivation)
      submitData.append('contactName', formData.contactName)
      submitData.append('contactEmail', formData.contactEmail)
      submitData.append('contactPhone', formData.contactPhone)
      submitData.append('loadingInstructions', formData.loadingInstructions)
      submitData.append('submittedAt', new Date().toISOString())

      const response = await fetch('/api/intake', {
        method: 'POST',
        body: submitData
      })

      const result = await response.json()

      if (response.ok) {
        setToastMessage('Thank you! Your intake form has been submitted successfully.')
        setToastType('success')
        setShowToast(true)
        
        // Reset form
        setFormData({
          companyLogo: null,
          inspirationImages: [],
          filterText: '',
          robotTheme: '',
          voiceActivation: '',
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          loadingInstructions: ''
        })
        setLogoPreview(null)
        setInspirationPreviews([])
        
        setTimeout(() => setShowToast(false), 5000)
      } else {
        throw new Error(result.error || 'Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setToastMessage('Failed to submit form. Please try again.')
      setToastType('error')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white pb-12">
      <Head>
        <title>Client Intake Form - Robo Booth</title>
        <meta name="description" content="Complete your client intake form for Robo Booth" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <CornerNav active={navActive} setActive={setNavActive} />
      
      <div className="max-w-4xl mx-auto pt-32 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#fce4a6]">
            Client Intake Form
          </h1>
          <p className="text-white/70 text-lg">
            Please provide the following information to customize your Robo Booth experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-[#fce4a6]/20"
        >
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            {/* Custom Overlay Filter Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#fce4a6] border-b border-[#fce4a6]/30 pb-3">
                Custom Overlay Filter Information
              </h2>
              
              {/* Company Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                  Company Logo <span className="text-white/50">(Upload your logo)</span>
                </label>
                {!logoPreview ? (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#fce4a6]/30 rounded-lg cursor-pointer hover:border-[#fce4a6]/50 transition-colors bg-black/20"
                    >
                      <FiUpload className="w-8 h-8 text-[#fce4a6] mb-2" />
                      <p className="text-sm text-white/70">Click to upload logo</p>
                      <p className="text-xs text-white/50 mt-1">PNG, JPG, SVG up to 10MB</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-h-32 rounded-lg border border-[#fce4a6]/30"
                    />
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Design Inspiration Images */}
              <div>
                <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                  Design Inspiration Images
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleInspirationUpload}
                    className="hidden"
                    id="inspiration-upload"
                  />
                  <label
                    htmlFor="inspiration-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#fce4a6]/30 rounded-lg cursor-pointer hover:border-[#fce4a6]/50 transition-colors bg-black/20"
                  >
                    <FiUpload className="w-8 h-8 text-[#fce4a6] mb-2" />
                    <p className="text-sm text-white/70">Click to upload inspiration images</p>
                    <p className="text-xs text-white/50 mt-1">You can upload multiple images</p>
                  </label>
                </div>
                
                {inspirationPreviews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {inspirationPreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Inspiration ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-[#fce4a6]/30"
                        />
                        <button
                          type="button"
                          onClick={() => removeInspirationImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Text */}
              <div>
                <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                  What would you like the filter to say?
                </label>
                <textarea
                  name="filterText"
                  value={formData.filterText}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50 resize-none"
                  placeholder="Enter the text you'd like displayed on the filter..."
                />
              </div>
            </div>

            {/* Robot Theme */}
            <div className="space-y-6 pt-6 border-t border-[#fce4a6]/20">
              <h2 className="text-2xl font-bold text-[#fce4a6] border-b border-[#fce4a6]/30 pb-3">
                Robot Customization
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                  How would you like to dress up the robot? <span className="text-white/50">(Theme or description)</span>
                </label>
                <input
                  type="text"
                  name="robotTheme"
                  value={formData.robotTheme}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                  placeholder="e.g., Wedding theme, Corporate blue, Space theme..."
                />
              </div>
            </div>

            {/* Voice Activation */}
            <div className="space-y-6 pt-6 border-t border-[#fce4a6]/20">
              <h2 className="text-2xl font-bold text-[#fce4a6] border-b border-[#fce4a6]/30 pb-3">
                Custom Voice Activation
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                  What should the robot say? <span className="text-white/50">(One liner)</span>
                </label>
                <input
                  type="text"
                  name="voiceActivation"
                  value={formData.voiceActivation}
                  onChange={handleInputChange}
                  required
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                  placeholder="e.g., 'Say cheese for Robo Booth!' or 'Welcome to our event!'"
                />
                <p className="text-xs text-white/50 mt-1">{formData.voiceActivation.length}/200 characters</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6 pt-6 border-t border-[#fce4a6]/20">
              <h2 className="text-2xl font-bold text-[#fce4a6] border-b border-[#fce4a6]/30 pb-3">
                Contact Details (Day of Event)
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                    Contact Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                    Contact Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                    placeholder="email@example.com"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                    Contact Phone <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>

            {/* Loading Instructions */}
            <div className="space-y-6 pt-6 border-t border-[#fce4a6]/20">
              <h2 className="text-2xl font-bold text-[#fce4a6] border-b border-[#fce4a6]/30 pb-3">
                Loading Instructions <span className="text-sm font-normal text-white/50">(Optional)</span>
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-[#fce4a6] mb-2">
                  Special loading or setup instructions
                </label>
                <textarea
                  name="loadingInstructions"
                  value={formData.loadingInstructions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50 resize-none"
                  placeholder="Any special instructions for loading, setup, or access to the venue..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#fce4a6] to-[#a49056] text-black font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Intake Form'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast && <Toast message={toastMessage} type={toastType} />}
      </AnimatePresence>
    </div>
  )
}

