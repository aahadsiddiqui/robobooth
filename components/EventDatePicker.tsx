import React, { useState, useRef, useEffect } from 'react'
import Calendar from 'react-calendar'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCalendar } from 'react-icons/fi'

type EventDatePickerProps = {
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputClassName?: string
}

function toFormValue(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function toDisplayValue(value: string): string {
  const [y, m, d] = value.split('-').map(Number)
  if (!y || !m || !d) return ''
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function EventDatePicker({
  name,
  value,
  onChange,
  placeholder = 'Select event date',
  inputClassName = '',
}: EventDatePickerProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selectedDate = value
    ? (() => {
        const [y, m, d] = value.split('-').map(Number)
        return new Date(y, m - 1, d)
      })()
    : null

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`w-full px-4 py-2 rounded-lg border border-[#fce4a6]/30 bg-black text-white focus:ring-2 focus:ring-[#fce4a6] focus:border-[#fce4a6] flex items-center justify-between gap-3 ${inputClassName}`}
      >
        <span className={value ? 'text-white text-left' : 'text-white/50 text-left'}>
          {value ? toDisplayValue(value) : placeholder}
        </span>
        <FiCalendar className="w-4 h-4 text-[#fce4a6] flex-shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="event-date-picker-popup absolute z-50 mt-2 left-0 right-0 sm:left-auto sm:right-0 shadow-2xl shadow-black/60 rounded-xl border border-[#fce4a6]/25 bg-[#0a0a0a]"
            role="dialog"
            aria-label="Choose event date"
          >
            <Calendar
              onChange={(date) => {
                if (date instanceof Date) {
                  onChange(toFormValue(date))
                  setOpen(false)
                }
              }}
              value={selectedDate}
              minDate={today}
              locale="en-US"
              showNeighboringMonth={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
