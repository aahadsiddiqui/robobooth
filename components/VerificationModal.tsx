'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiPhone, FiShield, FiCheck, FiLoader } from 'react-icons/fi'

type VerificationModalProps = {
  isOpen: boolean
  onClose: () => void
  onVerified?: (phone: string) => void
}

type Step = 'phone' | 'otp' | 'success'

export default function VerificationModal({
  isOpen,
  onClose,
  onVerified,
}: VerificationModalProps) {
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!isOpen) {
      setStep('phone')
      setPhone('')
      setOtp(['', '', '', '', '', ''])
      setError('')
      setLoading(false)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const toE164 = (formatted: string) => {
    const digits = formatted.replace(/\D/g, '')
    return digits.length === 10 ? `+1${digits}` : `+${digits}`
  }

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const digits = phone.replace(/\D/g, '')
    if (digits.length < 10) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/verify/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: toE164(phone) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send code')
      setStep('otp')
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < 5) otpRefs.current[index + 1]?.focus()
  }

  const handleOtpKeyDown = (index: number, key: string) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const code = otp.join('')
    if (code.length !== 6) {
      setError('Please enter the full 6-digit code.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/verify/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: toE164(phone), code }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid code')
      setStep('success')
      onVerified?.(toE164(phone))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md backdrop-blur-xl bg-black/60 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                {step === 'success' ? (
                  <FiCheck className="w-5 h-5 text-gold" />
                ) : (
                  <FiShield className="w-5 h-5 text-gold" />
                )}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  {step === 'success' ? 'Verified!' : 'Secure Lead Capture'}
                </h3>
                <p className="text-white/40 text-xs">
                  {step === 'phone' && 'Enter your phone to get a quote'}
                  {step === 'otp' && 'Enter the 6-digit code we sent'}
                  {step === 'success' && 'You\'re all set — we\'ll be in touch'}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {step === 'phone' && (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="(555) 123-4567"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-all duration-500 ease-in-out"
                      autoFocus
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-black font-bold py-3.5 rounded-xl transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <FiLoader className="w-4 h-4 animate-spin" /> : 'Send Verification Code'}
                </button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleVerify} className="space-y-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-3 text-center">
                    Verification Code
                  </label>
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e.key)}
                        className="w-11 h-13 py-3 text-center text-lg font-bold rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-gold/40 transition-all duration-500 ease-in-out"
                      />
                    ))}
                  </div>
                  <p className="text-white/30 text-xs text-center mt-3">
                    Sent to {phone}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-black font-bold py-3.5 rounded-xl transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-gold/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <FiLoader className="w-4 h-4 animate-spin" /> : 'Verify & Continue'}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep('phone'); setOtp(['', '', '', '', '', '']); setError('') }}
                  className="w-full text-white/40 hover:text-white text-sm transition-colors"
                >
                  Use a different number
                </button>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <FiCheck className="w-8 h-8 text-gold" />
                </div>
                <p className="text-white/60 text-sm">
                  Thanks! Our team will reach out within 15 minutes.
                </p>
                <a
                  href="/contact"
                  className="inline-block w-full bg-gold text-black font-bold py-3.5 rounded-xl transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-gold/20 text-center"
                >
                  Complete Your Quote Request
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
