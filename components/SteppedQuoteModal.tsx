import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi'
import PhoneVerificationFields from './PhoneVerificationFields'
import { appendUtmParams } from '@/lib/utmParams'

export type QuoteFormData = {
  firstName: string
  email: string
  phone: string
  eventDate: string
  budget: string
}

type SteppedQuoteModalProps = {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  packageBanner?: React.ReactNode
  eventType: string
  packageLabel: string
  source: string
  budgetOptions?: { value: string; label: string }[]
  formspreeUrl?: string
}

const DEFAULT_BUDGETS = [
  { value: '$1500-$2500', label: '$1,500–$2,500' },
  { value: '$2500-$4000', label: '$2,500–$4,000' },
  { value: '$4000+', label: '$4,000+' },
]

const STEPS = ['name', 'phone', 'email', 'date', 'budget'] as const
type Step = (typeof STEPS)[number]

const STEP_LABELS: Record<Step, { short: string; full: string }> = {
  name: { short: 'Name', full: 'Your name' },
  phone: { short: 'Phone', full: 'Verify phone' },
  email: { short: 'Email', full: 'Your email' },
  date: { short: 'Date', full: 'Event date' },
  budget: { short: 'Budget', full: 'Budget' },
}

// 16px on mobile avoids iOS zooming into inputs
const inputClass =
  'w-full px-4 py-3.5 md:py-3 border border-gray-200 rounded-xl text-base md:text-sm focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none text-black'

export default function SteppedQuoteModal({
  open,
  onClose,
  title,
  subtitle = "We'll confirm availability within 15 minutes.",
  packageBanner,
  eventType,
  packageLabel,
  source,
  budgetOptions = DEFAULT_BUDGETS,
  formspreeUrl = 'https://formspree.io/f/xkgoedyp',
}: SteppedQuoteModalProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<QuoteFormData>({
    firstName: '',
    email: '',
    phone: '',
    eventDate: '',
    budget: '',
  })
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [stepError, setStepError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const step = STEPS[stepIndex]

  const resetModal = useCallback(() => {
    setStepIndex(0)
    setForm({ firstName: '', email: '', phone: '', eventDate: '', budget: '' })
    setPhoneVerified(false)
    setStepError('')
    setSubmitting(false)
    setSuccess(false)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
      resetModal()
    }
    return () => document.body.classList.remove('overflow-hidden')
  }, [open, resetModal])

  const handleClose = () => {
    onClose()
  }

  const validateStep = (): boolean => {
    setStepError('')
    if (step === 'name') {
      if (!form.firstName.trim()) {
        setStepError('Please enter your first name.')
        return false
      }
    }
    if (step === 'phone') {
      if (!form.phone.trim()) {
        setStepError('Please enter your phone number.')
        return false
      }
      if (!phoneVerified) {
        setStepError('Please verify your phone number before continuing.')
        return false
      }
    }
    if (step === 'email') {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        setStepError('Please enter a valid email address.')
        return false
      }
    }
    if (step === 'date') {
      if (!form.eventDate) {
        setStepError('Please select your event date.')
        return false
      }
    }
    if (step === 'budget') {
      if (!form.budget) {
        setStepError('Please select an estimated budget.')
        return false
      }
    }
    return true
  }

  const goNext = () => {
    if (!validateStep()) return
    if (stepIndex < STEPS.length - 1) setStepIndex((i) => i + 1)
  }

  const goBack = () => {
    setStepError('')
    if (stepIndex > 0) setStepIndex((i) => i - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    if (!phoneVerified) {
      setStepError('Please verify your phone number before submitting.')
      return
    }

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('first-name', form.firstName)
      fd.append('phone-number', form.phone)
      fd.append('email', form.email)
      fd.append('event-date', form.eventDate)
      fd.append('budget', form.budget)
      fd.append('event-type', eventType)
      fd.append('package', packageLabel)
      fd.append('_replyto', form.email)
      fd.append('source', source)
      appendUtmParams(fd)
      const res = await fetch(formspreeUrl, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setStepError('Failed to submit. Please try again.')
      }
    } catch {
      setStepError('Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-0 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl relative flex flex-col max-h-[min(92dvh,920px)] sm:max-h-[90vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-100 sm:bg-transparent text-black/50 hover:text-black hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-2 pb-3 sm:px-8 sm:pt-8 sm:pb-4">
              {packageBanner}

              <h2
                id="quote-modal-title"
                className="text-lg sm:text-xl md:text-2xl font-black text-black mb-1 text-center pr-8"
              >
                {title}
              </h2>
              <p className="text-black/60 text-xs sm:text-sm mb-4 text-center leading-relaxed px-1">
                {subtitle}
              </p>

              {success ? (
                <div className="text-green-600 text-center font-bold py-8 text-base sm:text-lg">
                  Thank you! We&apos;ll be in touch soon.
                </div>
              ) : (
                <>
                  {/* Progress — short labels on mobile */}
                  <div className="flex items-center gap-1 sm:gap-1.5 mb-4 sm:mb-5">
                    {STEPS.map((s, i) => (
                      <div key={s} className="flex-1 min-w-0 flex flex-col items-center gap-1">
                        <div
                          className={`h-1.5 w-full rounded-full transition-colors ${
                            i <= stepIndex ? 'bg-[#fce4a6]' : 'bg-gray-200'
                          }`}
                        />
                        <span
                          className={`text-[8px] sm:text-[9px] font-semibold truncate max-w-full ${
                            i === stepIndex ? 'text-black' : 'text-black/30'
                          }`}
                        >
                          <span className="sm:hidden">{STEP_LABELS[s].short}</span>
                          <span className="hidden sm:inline">{STEP_LABELS[s].full}</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.18 }}
                      className="space-y-3"
                    >
                      {step === 'name' && (
                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">
                            Step 1 of {STEPS.length}
                          </label>
                          <input
                            type="text"
                            autoFocus
                            autoComplete="given-name"
                            value={form.firstName}
                            onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), goNext())}
                            placeholder="First Name *"
                            className={inputClass}
                          />
                        </div>
                      )}

                      {step === 'phone' && (
                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">
                            Step 2 of {STEPS.length} — Verify to continue
                          </label>
                          <PhoneVerificationFields
                            phone={form.phone}
                            onPhoneChange={(phone) => {
                              setForm((prev) => ({ ...prev, phone }))
                              setStepError('')
                              setPhoneVerified(false)
                            }}
                            onVerifiedChange={setPhoneVerified}
                            variant="light"
                          />
                        </div>
                      )}

                      {step === 'email' && (
                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">
                            Step 3 of {STEPS.length}
                          </label>
                          <input
                            type="email"
                            autoFocus
                            autoComplete="email"
                            inputMode="email"
                            value={form.email}
                            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), goNext())}
                            placeholder="Email *"
                            className={inputClass}
                          />
                        </div>
                      )}

                      {step === 'date' && (
                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">
                            Step 4 of {STEPS.length}
                          </label>
                          <input
                            type="date"
                            autoFocus
                            value={form.eventDate}
                            onChange={(e) => setForm((prev) => ({ ...prev, eventDate: e.target.value }))}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), goNext())}
                            className={`${inputClass} min-h-[48px]`}
                          />
                        </div>
                      )}

                      {step === 'budget' && (
                        <div>
                          <label className="block text-[10px] sm:text-xs font-semibold text-black/50 mb-1.5 uppercase tracking-wider">
                            Step 5 of {STEPS.length}
                          </label>
                          <select
                            value={form.budget}
                            onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
                            className={`${inputClass} min-h-[48px]`}
                          >
                            <option value="">Estimated Budget *</option>
                            {budgetOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {stepError && (
                    <p className="text-red-600 text-xs sm:text-sm mt-3 text-center px-1">{stepError}</p>
                  )}
                </>
              )}
            </div>

            {/* Sticky footer actions — always visible above home indicator / keyboard */}
            {!success && (
              <div className="flex-shrink-0 border-t border-gray-100 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-4 sm:pb-6 bg-white">
                <div className="flex gap-2">
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex-1 min-h-[48px] border border-gray-200 text-black/70 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 active:scale-[0.98]"
                    >
                      <FiArrowLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  {stepIndex < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={step === 'phone' && !phoneVerified}
                      className="flex-[2] min-h-[48px] bg-[#fce4a6] text-black py-3 rounded-xl font-bold text-sm hover:bg-[#e8d08e] transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 active:scale-[0.98]"
                    >
                      Continue <FiArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-[2] min-h-[48px] bg-[#fce4a6] text-black py-3.5 rounded-xl font-bold text-sm hover:bg-[#e8d08e] transition-colors disabled:opacity-50 active:scale-[0.98]"
                    >
                      {submitting ? 'Sending…' : 'Get My Quote →'}
                    </button>
                  )}
                </div>
                <p className="text-center text-black/30 text-[10px] mt-2.5">
                  No spam. We respond within 15 minutes during business hours.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
