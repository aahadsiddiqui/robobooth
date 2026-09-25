import React, { useEffect, useState } from 'react'

type Flake = { left: number; size: number; duration: number; delay: number; drift: number; opacity: number }

function makeFlakes(count: number): Flake[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 9 + Math.random() * 12,
    delay: -Math.random() * 20,
    drift: -40 + Math.random() * 80,
    opacity: 0.35 + Math.random() * 0.55,
  }))
}

/** Flakes are generated after mount so server and client markup match. */
export function Snowfall({ count = 60, className = '' }: { count?: number; className?: string }) {
  const [flakes, setFlakes] = useState<Flake[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    setFlakes(makeFlakes(isMobile ? Math.round(count / 2) : count))
  }, [count])

  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            filter: f.size > 4.5 ? 'blur(1px)' : undefined,
            ['--snow-drift' as string]: `${f.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

export function PineTree({ className = '', color = '#0f3d2e', snow = true }: { className?: string; color?: string; snow?: boolean }) {
  return (
    <svg viewBox="0 0 100 140" className={className} aria-hidden="true">
      <rect x="44" y="118" width="12" height="22" fill="#2a1d12" />
      <polygon points="50,38 94,122 6,122" fill={color} />
      <polygon points="50,18 82,86 18,86" fill={color} />
      <polygon points="50,0 72,52 28,52" fill={color} />
      {snow && (
        <g fill="#f4f8ff">
          <polygon points="50,0 58,18 54,16 50,20 46,16 42,18" />
          <polygon points="50,18 62,42 56,39 50,44 44,39 38,42" opacity="0.9" />
          <polygon points="50,38 66,68 58,64 50,70 42,64 34,68" opacity="0.85" />
          <path d="M6,122 Q18,114 30,120 Q42,112 54,120 Q68,112 80,120 Q88,116 94,122 Z" />
        </g>
      )}
    </svg>
  )
}

const treeRow = [
  { left: '-2%', h: 'h-20 md:h-32', color: '#0b2e22' },
  { left: '6%', h: 'h-28 md:h-44', color: '#0f3d2e' },
  { left: '14%', h: 'h-16 md:h-24', color: '#0b2e22' },
  { left: '78%', h: 'h-16 md:h-24', color: '#0b2e22' },
  { left: '85%', h: 'h-28 md:h-44', color: '#0f3d2e' },
  { left: '93%', h: 'h-20 md:h-32', color: '#0b2e22' },
]

/** Snowy ground with a row of pines framing the left and right edges. */
export function TreeLine({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 ${className}`}>
      {treeRow.map((t, i) => (
        <div key={i} className="absolute bottom-3 md:bottom-5" style={{ left: t.left }}>
          <PineTree className={`${t.h} w-auto`} color={t.color} />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-0 h-6 md:h-9 bg-gradient-to-t from-[#e8f0fb]/25 via-[#e8f0fb]/10 to-transparent" />
    </div>
  )
}

const lightColors = ['#fce4a6', '#ffffff', '#8ec5ff', '#fce4a6', '#d6ebff', '#ffffff']

export function TwinkleLights({ count = 24, className = '' }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none flex justify-between items-start px-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="animate-twinkle block w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
          style={{
            backgroundColor: lightColors[i % lightColors.length],
            boxShadow: `0 0 10px 2px ${lightColors[i % lightColors.length]}90`,
            animationDelay: `${(i % 6) * 0.4}s`,
            marginTop: i % 2 === 0 ? 0 : 6,
          }}
        />
      ))}
    </div>
  )
}
