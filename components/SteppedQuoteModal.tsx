import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi'
import PhoneVerificationFields from './PhoneVerificationFields'
import { appendUtmParams } from '@/lib/utmParams'
import {
  getPackageBudgetOptions,
  getTodayDateString,
  type PricingContext,
  type QuotePackageTier,
} from '@/lib/quoteBudgets'

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
  /** Selected package — drives budget dropdown ranges */
  packageTier?: QuotePackageTier
  /** corporate = corporate page pricing; standard = robot/event pages */
  pricingContext?: PricingContext
  formspreeUrl?: string
}

const STEPS = ['name', 'phone', 'email', 'date', 'budget'] as const
type Step = (typeof STEPS)[number]

const STEP_LABELS: Record<Step, { short: string; full: string }> = {
  name: { short: 'Name', full: 'Your name' },
  phone: { short: 'Phone', full: 'Verify phone' },
  email: { short: 'Email', full: 'Your email' },
  date: { short: 'Date', full: 'Event date' },
  budget: { short: 'Budget', full: 'Budget' },
}

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
  packageTier = '',
  pricingContext = 'standard',
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
  const [viewport, setViewport] = useState({ height: 0, offsetTop: 0 })
  const scrollRef = useRef<HTMLDivElement>(null)

  const step = STEPS[stepIndex]
  const today = useMemo(() => getTodayDateString(), [])
  const budgetOptions = useMemo(
    () => getPackageBudgetOptions(packageTier, pricingContext),
    [packageTier, pricingContext]
  )

  useEffect(() => {
    if (form.budget && !budgetOptions.some((o) => o.value === form.budget)) {
      setForm((prev) => ({ ...prev, budget: '' }))
    }
  }, [budgetOptions, form.budget])

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

  // Keep modal inside the visible viewport above the iOS/Android keyboard
  useEffect(() => {
    if (!open || typeof window === 'undefined') return

    const syncViewport = () => {
      const vv = window.visualViewport
      if (vv) {
        setViewport({ height: vv.height, offsetTop: vv.offsetTop })
      } else {
        setViewport({ height: window.innerHeight, offsetTop: 0 })
      }
    }

    syncViewport()
    const vv = window.visualViewport
    vv?.addEventListener('resize', syncViewport)
    vv?.addEventListener('scroll', syncViewport)
    window.addEventListener('resize', syncViewport)

    return () => {
      vv?.removeEventListener('resize', syncViewport)
      vv?.removeEventListener('scroll', syncViewport)
      window.removeEventListener('resize', syncViewport)
    }
  }, [open])

  // When keyboard opens / step changes, keep the active field visible
  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => {
      const active = document.activeElement
      if (active instanceof HTMLElement && scrollRef.current?.contains(active)) {
        active.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    }, 80)
    return () => window.clearTimeout(id)
  }, [open, stepIndex, viewport.height])

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
      if (form.eventDate < today) {
        setStepError('Event date cannot be in the past.')
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

  const overlayStyle =
    viewport.height > 0
      ? {
          top: viewport.offsetTop,
          height: viewport.height,
          bottom: 'auto' as const,
        }
      : undefined

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-x-0 z-[60] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-0 sm:p-4"
          style={overlayStyle ?? { top: 0, bottom: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md shadow-2xl relative flex flex-col max-h-full sm:max-h-[min(90vh,920px)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            <div className="sm:hidden flex justify-center pt-2.5 pb-0.5 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            {/* Banner + close share one row so the X never overlaps content */}
            <div className="flex-shrink-0 flex items-start gap-2 px-4 pt-2 sm:px-6 sm:pt-4">
              <div className="flex-1 min-w-0 [&_>div]:mb-0">{packageBanner}</div>
              <button
                onClick={handleClose}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-black/50 hover:text-black hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 pt-3 pb-3 sm:px-8 sm:pt-3 sm:pb-4"
            >
              <h2
                id="quote-modal-title"
                className="text-lg sm:text-xl md:text-2xl font-black text-black mb-1 text-center"
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
                            Step 4 of {STEPS.length} · Event Date
                          </label>
                          <div className="relative">
                            <div
                              className={`${inputClass} min-h-[48px] flex items-center bg-white pointer-events-none ${
                                form.eventDate ? 'text-black font-semibold' : 'text-black/70'
                              }`}
                              aria-hidden
                            >
                              {form.eventDate
                                ? new Date(`${form.eventDate}T12:00:00`).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })
                                : 'Select your event date'}
                            </div>
                            <input
                              type="date"
                              autoFocus
                              min={today}
                              value={form.eventDate}
                              onChange={(e) => {
                                const value = e.target.value
                                if (value && value < today) {
                                  setStepError('Event date cannot be in the past.')
                                  setForm((prev) => ({ ...prev, eventDate: '' }))
                                  return
                                }
                                setStepError('')
                                setForm((prev) => ({ ...prev, eventDate: value }))
                              }}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), goNext())}
                              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                              style={{ colorScheme: 'light' }}
                              aria-label="Event date"
                            />
                          </div>
                          {form.eventDate ? (
                            <p className="mt-2 text-sm font-semibold text-black">
                              Selected:{' '}
                              {new Date(`${form.eventDate}T12:00:00`).toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          ) : (
                            <p className="mt-2 text-sm text-black/55">Tap the field to open the calendar</p>
                          )}
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
