import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { appendUtmParams } from '@/lib/utmParams'
import { trackPhotoboothEvents } from '@/utils/metaPixel'
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

const inputClass =
  'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none text-black bg-white'

export default function SteppedQuoteModal({
  open,
  onClose,
  title,
  subtitle = "Tell us your event date and we'll confirm availability within 15 minutes.",
  packageBanner,
  eventType,
  packageLabel,
  source,
  packageTier = '',
  pricingContext = 'standard',
  formspreeUrl = 'https://formspree.io/f/xkgoedyp',
}: SteppedQuoteModalProps) {
  const [form, setForm] = useState<QuoteFormData>({
    firstName: '',
    email: '',
    phone: '',
    eventDate: '',
    budget: '',
  })
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

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
    setForm({ firstName: '', email: '', phone: '', eventDate: '', budget: '' })
    setFormError('')
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormError('')
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!form.firstName.trim()) {
      setFormError('Please enter your first name.')
      return
    }
    if (!form.phone.trim()) {
      setFormError('Please enter your phone number.')
      return
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError('Please enter a valid email address.')
      return
    }
    if (!form.eventDate) {
      setFormError('Please select your event date.')
      return
    }
    if (form.eventDate < today) {
      setFormError('Event date cannot be in the past.')
      return
    }
    if (!form.budget) {
      setFormError('Please select an estimated budget.')
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
        trackPhotoboothEvents.formSubmitted(source, 'Toronto', {
          fn: form.firstName,
          em: form.email,
          ph: form.phone,
          country: 'CA',
        })
        setSuccess(true)
      } else {
        setFormError('Failed to submit. Please try again.')
      }
    } catch {
      setFormError('Failed to submit. Please try again.')
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
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-md p-0 md:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="bg-white rounded-t-2xl md:rounded-2xl p-5 md:p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-4 text-black/40 hover:text-black text-2xl"
              aria-label="Close"
            >
              ×
            </button>

            {packageBanner}

            <h2
              id="quote-modal-title"
              className="text-lg md:text-2xl font-black text-black mb-1 text-center"
            >
              {title}
            </h2>
            <p className="text-black/60 text-xs md:text-sm mb-4 text-center">{subtitle}</p>

            {success ? (
              <div className="text-green-600 text-center font-bold py-6">
                Thank you! We&apos;ll be in touch soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-3">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInput}
                  required
                  autoComplete="given-name"
                  placeholder="First Name *"
                  className={inputClass}
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInput}
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Phone Number *"
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInput}
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Email *"
                  className={inputClass}
                />
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleInput}
                  required
                  min={today}
                  className={`${inputClass} [color-scheme:light]`}
                  style={{ colorScheme: 'light' }}
                  aria-label="Event date"
                />
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleInput}
                  required
                  className={inputClass}
                >
                  <option value="">Estimated Budget *</option>
                  {budgetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {formError && (
                  <p className="text-red-600 text-xs text-center">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#fce4a6] text-black py-3.5 rounded-xl font-bold text-sm hover:bg-[#e8d08e] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending…' : 'Get My Quote →'}
                </button>
                <p className="text-center text-black/30 text-[10px]">
                  No spam. We respond within 15 minutes during business hours.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
