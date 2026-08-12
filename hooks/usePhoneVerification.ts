import { useState, useCallback } from 'react'
import { isValidNorthAmericanPhone, toE164Phone } from '@/lib/phoneUtils'

const API_TIMEOUT_MS = 20000

async function fetchWithTimeout(url: string, options: RequestInit) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timeoutId)
  }
}

export function usePhoneVerification() {
  const [isVerified, setIsVerified] = useState(false)
  const [verifiedPhone, setVerifiedPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [codeSent, setCodeSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const reset = useCallback(() => {
    setIsVerified(false)
    setVerifiedPhone('')
    setOtp(['', '', '', '', '', ''])
    setCodeSent(false)
    setLoading(false)
    setError('')
  }, [])

  const sendCode = useCallback(async (phone: string) => {
    setError('')
    if (!isValidNorthAmericanPhone(phone)) {
      setError('Please enter a valid 10-digit phone number.')
      return false
    }

    setLoading(true)
    try {
      const res = await fetchWithTimeout('/api/verify/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: toE164Phone(phone) }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to send code')
      setCodeSent(true)
      setIsVerified(false)
      return true
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to send verification code')
      }
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const verifyCode = useCallback(async (phone: string, code: string) => {
    setError('')
    const e164 = toE164Phone(phone)
    if (!e164 || !isValidNorthAmericanPhone(phone)) {
      setError('Please enter a valid 10-digit phone number.')
      return false
    }
    if (code.length !== 6) {
      setError('Please enter the full 6-digit code.')
      return false
    }

    setLoading(true)
    try {
      const res = await fetchWithTimeout('/api/verify/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: e164, code }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Invalid verification code')
      setIsVerified(true)
      setVerifiedPhone(e164)
      return true
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request timed out. Please try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Verification failed')
      }
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const handleOtpChange = useCallback((index: number, value: string, refs: (HTMLInputElement | null)[]) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < 5) refs[index + 1]?.focus()
  }, [otp])

  const handleOtpKeyDown = useCallback((index: number, key: string, refs: (HTMLInputElement | null)[]) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      refs[index - 1]?.focus()
    }
  }, [otp])

  return {
    isVerified,
    verifiedPhone,
    otp,
    setOtp,
    codeSent,
    loading,
    error,
    setError,
    reset,
    sendCode,
    verifyCode,
    handleOtpChange,
    handleOtpKeyDown,
  }
}
