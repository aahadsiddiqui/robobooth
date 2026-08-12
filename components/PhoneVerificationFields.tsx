import React, { useRef, useEffect } from 'react'
import { FiCheck, FiLoader, FiShield } from 'react-icons/fi'
import { usePhoneVerification } from '@/hooks/usePhoneVerification'
import { toE164Phone } from '@/lib/phoneUtils'

type PhoneVerificationFieldsProps = {
  phone: string
  onPhoneChange?: (phone: string) => void
  onVerifiedChange?: (verified: boolean) => void
  variant?: 'light' | 'dark'
  readOnlyPhone?: boolean
}

export default function PhoneVerificationFields({
  phone,
  onPhoneChange,
  onVerifiedChange,
  variant = 'light',
  readOnlyPhone = false,
}: PhoneVerificationFieldsProps) {
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const phoneInputRef = useRef<HTMLInputElement | null>(null)
  const {
    isVerified,
    verifiedPhone,
    otp,
    codeSent,
    loading,
    error,
    reset,
    sendCode,
    verifyCode,
    handleOtpChange,
    handleOtpKeyDown,
  } = usePhoneVerification()

  useEffect(() => {
    onVerifiedChange?.(isVerified)
  }, [isVerified, onVerifiedChange])

  // If the verified number changes, clear verification
  useEffect(() => {
    if (isVerified && verifiedPhone && verifiedPhone !== toE164Phone(phone)) {
      reset()
    }
  }, [phone, isVerified, verifiedPhone, reset])

  const isLight = variant === 'light'
  const phoneLocked = Boolean(readOnlyPhone || isVerified)

  const inputClass = isLight
    ? 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#fce4a6] focus:border-transparent outline-none text-black'
    : 'w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] placeholder:text-white/50'

  const handlePhoneChange = (value: string) => {
    onPhoneChange?.(value)
    // Editing the number after a code was sent should clear OTP state so they can re-send
    if (codeSent && !isVerified) {
      reset()
    }
  }

  const handleChangeNumber = () => {
    reset()
    onVerifiedChange?.(false)
    setTimeout(() => {
      phoneInputRef.current?.focus()
      phoneInputRef.current?.select()
    }, 0)
  }

  const handleSend = async () => {
    const value = phone.trim() || phoneInputRef.current?.value?.trim() || ''
    if (value && value !== phone) onPhoneChange?.(value)
    const sent = await sendCode(value || phone)
    if (sent) setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }

  const handleVerify = async () => {
    const value = phone.trim() || phoneInputRef.current?.value?.trim() || ''
    if (value && value !== phone) onPhoneChange?.(value)
    await verifyCode(value || phone, otp.join(''))
  }

  return (
    <div className="space-y-2.5">
      <div className={isLight ? '' : 'space-y-1'}>
        {!isLight && (
          <label className="block text-sm font-medium text-[#fce4a6] mb-1">
            Phone Number *
          </label>
        )}
        <div className="flex gap-2">
          <input
            ref={phoneInputRef}
            type="tel"
            name="phone-verification"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            readOnly={phoneLocked}
            placeholder={isLight ? 'Phone Number *' : ''}
            className={`${inputClass} flex-1 ${phoneLocked ? 'bg-gray-50 cursor-default' : ''}`}
          />
          {!isVerified && (
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !phone.trim()}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 ${
                isLight
                  ? 'bg-black text-white hover:bg-black/80'
                  : 'bg-[#fce4a6] text-black hover:bg-[#e8d08e]'
              }`}
            >
              {loading && !codeSent ? <FiLoader className="w-4 h-4 animate-spin" /> : codeSent ? 'Resend' : 'Send Code'}
            </button>
          )}
        </div>
        {codeSent && !isVerified && (
          <button
            type="button"
            onClick={handleChangeNumber}
            className={`mt-1.5 text-[11px] font-semibold underline ${
              isLight ? 'text-black/50 hover:text-black' : 'text-white/40 hover:text-white'
            }`}
          >
            Change phone number
          </button>
        )}
      </div>

      {codeSent && !isVerified && (
        <div className="space-y-2">
          <p className={`text-[10px] font-semibold uppercase tracking-wider ${isLight ? 'text-black/50' : 'text-white/40'}`}>
            Enter 6-digit verification code
          </p>
          <div className="flex justify-between gap-1.5">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { otpRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value, otpRefs.current)}
                onKeyDown={(e) => handleOtpKeyDown(i, e.key, otpRefs.current)}
                className={`w-full aspect-square text-center text-sm font-bold rounded-lg outline-none ${
                  isLight
                    ? 'border border-gray-200 text-black focus:ring-2 focus:ring-[#fce4a6]'
                    : 'border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6]'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleVerify}
            disabled={loading || otp.join('').length !== 6 || !phone.trim()}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${
              isLight
                ? 'bg-[#fce4a6] text-black hover:bg-[#e8d08e]'
                : 'border border-[#fce4a6]/40 text-[#fce4a6] hover:bg-[#fce4a6]/10'
            }`}
          >
            {loading ? <FiLoader className="w-3.5 h-3.5 animate-spin" /> : <><FiShield className="w-3.5 h-3.5" /> Verify Phone</>}
          </button>
        </div>
      )}

      {isVerified && (
        <div className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
          isLight ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-green-500/10 text-green-400 border border-green-500/20'
        }`}>
          <span className="flex items-center gap-2">
            <FiCheck className="w-4 h-4" />
            Phone verified
          </span>
          <button
            type="button"
            onClick={handleChangeNumber}
            className="underline font-semibold opacity-70 hover:opacity-100"
          >
            Change
          </button>
        </div>
      )}

      {error && (
        <p className={`text-xs ${isLight ? 'text-red-600' : 'text-red-400'}`}>{error}</p>
      )}

      <input type="hidden" name="phone-verified" value={isVerified ? 'true' : 'false'} readOnly />
    </div>
  )
}

/** Helper for form submit handlers — call before posting to Formspree */
export function requirePhoneVerified(form: HTMLElement | null): boolean {
  const field = form?.querySelector<HTMLInputElement>('input[name="phone-verified"]')
  return field?.value === 'true'
}
