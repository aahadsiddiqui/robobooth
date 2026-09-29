import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheck, FiCamera, FiPlus } from 'react-icons/fi'
import { PackageTierContent, PackageTierId, boothAddOns } from '@/data/packageTiers'

const Reveal = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

type PackageCardsGridProps = {
  subtitle?: string
  tiers: Record<PackageTierId, PackageTierContent>
  onBookBronze: () => void
  onBookGold: () => void
  onBookPlatinum: () => void
  bronzeLabel?: string
  goldLabel?: string
  platinumLabel?: string
  excludeAddOnIds?: string[]
  festive?: boolean
}

function PhotographySubsection({
  benefits,
  variant,
  festive = false,
}: {
  benefits: string[]
  variant: PackageTierId
  festive?: boolean
}) {
  const styles = festive
    ? {
        bronze: 'border-[#3d9a62]/30 bg-[#145c38]/15',
        gold: 'border-[#e23d4a]/30 bg-[#9b2033]/15',
        platinum: 'border-white/15 bg-white/[0.05]',
      }
    : {
        bronze: 'border-white/10 bg-white/[0.03]',
        gold: 'border-[#fce4a6]/20 bg-[#fce4a6]/5',
        platinum: 'border-white/15 bg-white/[0.05]',
      }

  const iconColor = festive
    ? { bronze: 'text-[#6dce93]', gold: 'text-[#e23d4a]', platinum: 'text-white/70' }
    : { bronze: 'text-white/40', gold: 'text-[#fce4a6]', platinum: 'text-white/60' }

  const checkColor = festive
    ? { bronze: 'text-[#6dce93]/80', gold: 'text-[#e23d4a]/80', platinum: 'text-white/60' }
    : { bronze: 'text-white/30', gold: 'text-[#fce4a6]/70', platinum: 'text-white/50' }

  const labelColor = festive
    ? variant === 'gold' ? 'text-[#ff8a96]' : variant === 'bronze' ? 'text-[#6dce93]' : 'text-white/60'
    : variant === 'gold' ? 'text-[#fce4a6]/80' : 'text-white/50'

  return (
    <div className={`rounded-xl border p-3.5 mt-4 ${styles[variant]}`}>
      <div className="flex items-center gap-2 mb-2.5">
        <FiCamera className={`w-3.5 h-3.5 ${iconColor[variant]}`} />
        <p className={`text-[10px] font-black uppercase tracking-widest ${labelColor}`}>
          Add on: Event Photography
        </p>
      </div>
      <div className="space-y-1.5">
        {benefits.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <FiCheck className={`w-3 h-3 mt-0.5 flex-shrink-0 ${checkColor[variant]}`} />
            <p className="text-white/50 text-[10px] leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BoothAddOnsSubsection({ variant, excludeAddOnIds = [], festive = false }: { variant: PackageTierId; excludeAddOnIds?: string[]; festive?: boolean }) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const addOns = boothAddOns.filter((b) => !excludeAddOnIds.includes(b.id))
  const activeBooth = addOns.find((b) => b.id === activeId) ?? null

  const styles = festive
    ? {
        bronze: 'border-[#3d9a62]/30 bg-[#145c38]/15',
        gold: 'border-[#e23d4a]/30 bg-[#9b2033]/15',
        platinum: 'border-white/15 bg-white/[0.05]',
      }
    : {
        bronze: 'border-white/10 bg-white/[0.03]',
        gold: 'border-[#fce4a6]/20 bg-[#fce4a6]/5',
        platinum: 'border-white/15 bg-white/[0.05]',
      }
  const iconColor = festive
    ? { bronze: 'text-[#6dce93]', gold: 'text-[#e23d4a]', platinum: 'text-white/70' }
    : { bronze: 'text-white/40', gold: 'text-[#fce4a6]', platinum: 'text-white/60' }
  const chipIdle = festive
    ? {
        bronze: 'border-[#3d9a62]/30 bg-black/30 text-white/60 hover:border-[#6dce93]/50 hover:text-[#6dce93]',
        gold: 'border-white/15 bg-black/30 text-white/55 hover:border-[#e23d4a]/50 hover:text-[#ff8a96]',
        platinum: 'border-white/15 bg-white/[0.04] text-white/55 hover:border-white/40 hover:text-white',
      }
    : {
        bronze: 'border-white/15 bg-white/[0.04] text-white/55 hover:border-white/30 hover:text-white/85',
        gold: 'border-white/15 bg-black/30 text-white/55 hover:border-[#fce4a6]/40 hover:text-[#fce4a6]/90',
        platinum: 'border-white/15 bg-white/[0.04] text-white/55 hover:border-white/30 hover:text-white/85',
      }
  const chipActive = festive
    ? {
        bronze: 'border-[#6dce93] bg-[#145c38]/40 text-[#b7ebc9] shadow-[0_0_0_1px_rgba(109,206,147,0.35)]',
        gold: 'border-[#e23d4a] bg-[#9b2033]/40 text-[#ff8a96] shadow-[0_0_0_1px_rgba(226,61,74,0.35)]',
        platinum: 'border-white/70 bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)]',
      }
    : {
        bronze: 'border-white/55 bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
        gold: 'border-[#fce4a6] bg-[#fce4a6]/20 text-[#fce4a6] shadow-[0_0_0_1px_rgba(252,228,166,0.35)]',
        platinum: 'border-white/55 bg-white/15 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.15)]',
      }
  const addOnLabel = festive
    ? variant === 'gold' ? 'text-[#ff8a96]' : variant === 'bronze' ? 'text-[#6dce93]' : 'text-white/60'
    : variant === 'gold' ? 'text-[#fce4a6]/80' : 'text-white/50'

  return (
    <div
      className={`rounded-xl border p-3.5 mt-4 ${styles[variant]}`}
      onMouseLeave={() => setActiveId(null)}
    >
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <FiPlus className={`w-3.5 h-3.5 ${iconColor[variant]}`} />
          <p className={`text-[10px] font-black uppercase tracking-widest ${addOnLabel}`}>
            Add on: Extra Booths
          </p>
        </div>
        <p className="text-[9px] text-white/30 hidden sm:block">Hover to preview</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {addOns.map((booth) => {
          const isActive = activeId === booth.id
          return (
            <button
              key={booth.id}
              type="button"
              onMouseEnter={() => setActiveId(booth.id)}
              onFocus={() => setActiveId(booth.id)}
              onClick={() => setActiveId((prev) => (prev === booth.id ? null : booth.id))}
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/40 ${
                isActive ? chipActive[variant] : chipIdle[variant]
              }`}
              aria-pressed={isActive}
              aria-label={`Preview ${booth.name}`}
            >
              {booth.name}
            </button>
          )
        })}
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          activeBooth ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr] mt-0'
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="rounded-lg border border-white/10 bg-black/55 overflow-hidden">
            <div className="relative h-[140px] w-full bg-black">
              {addOns.map((booth) => (
                <img
                  key={booth.id}
                  src={booth.image}
                  alt={booth.name}
                  className={`absolute inset-0 h-full w-full object-contain p-1.5 transition-opacity duration-200 ${
                    activeId === booth.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  style={{ objectPosition: booth.objectPosition }}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="px-2.5 py-2 border-t border-white/10 bg-black/40 min-h-[52px]">
              <p className="text-white text-[11px] font-bold leading-tight">
                {activeBooth?.name ?? '\u00A0'}
              </p>
              <p className="text-white/60 text-[10px] leading-snug mt-0.5">
                {activeBooth?.desc ?? '\u00A0'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RobotCountBadge({ label, variant, festive = false }: { label: string; variant: PackageTierId; festive?: boolean }) {
  const styles = festive
    ? {
        bronze: 'bg-[#145c38]/40 text-[#b7ebc9] border-[#6dce93]/30',
        gold: 'bg-[#9b2033]/40 text-[#ff8a96] border-[#e23d4a]/40',
        platinum: 'bg-white/10 text-white border-white/30',
      }
    : {
        bronze: 'bg-white/10 text-white/70 border-white/10',
        gold: 'bg-[#fce4a6]/15 text-[#fce4a6] border-[#fce4a6]/30',
        platinum: 'bg-white/10 text-white/80 border-white/20',
      }

  return (
    <span className={`inline-flex items-center justify-center text-center gap-1.5 text-[10px] font-bold uppercase tracking-wider leading-snug px-3 py-1.5 rounded-full border max-w-full ${styles[variant]}`}>
      <span className="text-xs">🤖</span>
      {label}
    </span>
  )
}

export default function PackageCardsGrid({
  subtitle = 'Every event is different — pick the package that fits yours.',
  tiers,
  onBookBronze,
  onBookGold,
  onBookPlatinum,
  bronzeLabel = 'Bronze Package',
  goldLabel = 'Gold Package',
  platinumLabel = 'Platinum Package',
  excludeAddOnIds,
  insertAfterBronze,
  maxWidth = 'max-w-5xl',
  festive = false,
}: PackageCardsGridProps & {
  insertAfterBronze?: React.ReactNode
  maxWidth?: string
}) {
  const gridCols = insertAfterBronze
    ? 'md:grid-cols-2 xl:grid-cols-4'
    : 'md:grid-cols-3'

  return (
    <section className="py-10 md:py-14 px-4">
      <div className={`${maxWidth} mx-auto`}>
        <Reveal className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2">
            Choose Your <span className={festive ? 'text-[#e23d4a]' : 'text-[#fce4a6]'}>Package</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base">{subtitle}</p>
        </Reveal>

        <div className={`grid grid-cols-1 gap-4 md:gap-5 items-stretch ${gridCols}`}>
          {/* Bronze */}
          <Reveal>
            <div className={`relative rounded-3xl border p-6 md:p-7 h-full flex flex-col ${festive ? 'border-[#3d9a62]/45 bg-[#145c38]/10' : 'border-white/20 bg-white/[0.04]'}`}>
              <div className="flex justify-center mb-3">
                <span className={`inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full ${festive ? 'bg-[#145c38]/70 text-[#b7ebc9]' : 'bg-white/10 text-white/70'}`}>
                  {bronzeLabel}
                </span>
              </div>
              <div className="flex justify-center mb-3">
                <RobotCountBadge label={tiers.bronze.robotLabel} variant="bronze" festive={festive} />
              </div>
              <h3 className="text-lg md:text-xl font-black text-center mb-2">{tiers.bronze.title}</h3>
              <p className="text-white/50 text-xs text-center mb-4">{tiers.bronze.desc}</p>
              <div className="space-y-2.5 flex-1">
                {tiers.bronze.robotBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheck className={`w-4 h-4 mt-0.5 flex-shrink-0 ${festive ? 'text-[#6dce93]' : 'text-white/40'}`} />
                    <p className="text-white/60 text-xs leading-relaxed">{b}</p>
                  </div>
                ))}
                <BoothAddOnsSubsection variant="bronze" excludeAddOnIds={excludeAddOnIds} festive={festive} />
                <PhotographySubsection benefits={tiers.bronze.photographyBenefits} variant="bronze" festive={festive} />
              </div>
              <div className="text-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBookBronze}
                  className={`border-2 text-white px-4 py-3 rounded-full font-bold text-xs md:text-sm transition-all group w-full ${festive ? 'border-[#6dce93]/55 hover:bg-[#145c38]/40' : 'border-white/30 hover:bg-white/10'}`}
                >
                  Book {bronzeLabel} <FiArrowRight className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <p className="text-white/30 text-[10px] mt-2">Responses in &lt;15 mins · No credit card required</p>
              </div>
            </div>
          </Reveal>

          {insertAfterBronze}

          {/* Gold */}
          <Reveal delay={0.1}>
            <div className={`relative rounded-3xl overflow-hidden border-2 p-6 md:p-7 shadow-2xl h-full flex flex-col ${festive ? 'border-[#e23d4a]/55 bg-gradient-to-br from-[#e23d4a]/15 via-black to-black shadow-[#e23d4a]/15' : 'border-[#fce4a6]/50 bg-gradient-to-br from-[#fce4a6]/10 via-black to-black shadow-[#fce4a6]/10'}`}>
              <div className={`absolute inset-0 pointer-events-none ${festive ? 'bg-[radial-gradient(ellipse_at_top_left,_#e23d4a30_0%,_transparent_65%)]' : 'bg-[radial-gradient(ellipse_at_top_left,_#fce4a625_0%,_transparent_65%)]'}`} />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-center mb-3">
                  <span className={`inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg ${festive ? 'bg-[#c4313d] text-white' : 'bg-[#fce4a6] text-black'}`}>
                    ⭐ {tiers.gold.badge}
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <RobotCountBadge label={tiers.gold.robotLabel} variant="gold" festive={festive} />
                </div>
                <h3 className="text-lg md:text-xl font-black text-center mb-2">
                  {tiers.gold.title}
                </h3>
                <p className="text-white/60 text-xs text-center mb-4">{tiers.gold.desc}</p>
                <div className="space-y-2.5 flex-1">
                  {tiers.gold.robotBenefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FiCheck className={`w-4 h-4 mt-0.5 flex-shrink-0 ${festive ? 'text-[#e23d4a]' : 'text-[#fce4a6]'}`} />
                      <p className="text-white/70 text-xs leading-relaxed">{b}</p>
                    </div>
                  ))}
                  <BoothAddOnsSubsection variant="gold" excludeAddOnIds={excludeAddOnIds} festive={festive} />
                  <PhotographySubsection benefits={tiers.gold.photographyBenefits} variant="gold" festive={festive} />
                </div>
                <div className="text-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onBookGold}
                    className={`px-4 py-3 rounded-full font-black text-xs md:text-sm shadow-lg hover:shadow-xl transition-all group w-full ${festive ? 'bg-[#c4313d] text-white shadow-[#c4313d]/30 hover:bg-[#d24a55]' : 'bg-[#fce4a6] text-black shadow-[#fce4a6]/30'}`}
                  >
                    Book {goldLabel} <FiArrowRight className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <p className="text-white/30 text-[10px] mt-2">Responses in &lt;15 mins · No credit card required</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Platinum */}
          <Reveal delay={0.2}>
            <div
              className="relative rounded-3xl overflow-hidden border-2 border-white/40 bg-gradient-to-br from-white/[0.08] via-black to-black p-6 md:p-7 h-full flex flex-col"
              style={{ boxShadow: '0 0 40px rgba(255,255,255,0.06)' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.07)_0%,_transparent_60%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-white/20 to-white/10 text-white text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/30">
                    💎 {platinumLabel}
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <RobotCountBadge label={tiers.platinum.robotLabel} variant="platinum" festive={festive} />
                </div>
                <h3 className="text-lg md:text-xl font-black text-center mb-2">{tiers.platinum.title}</h3>
                <p className="text-white/60 text-xs text-center mb-4">{tiers.platinum.desc}</p>
                <div className="space-y-2.5 flex-1">
                  {tiers.platinum.robotBenefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FiCheck className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
                      <p className="text-white/70 text-xs leading-relaxed">{b}</p>
                    </div>
                  ))}
                  <BoothAddOnsSubsection variant="platinum" excludeAddOnIds={excludeAddOnIds} festive={festive} />
                  <PhotographySubsection benefits={tiers.platinum.photographyBenefits} variant="platinum" festive={festive} />
                </div>
                <div className="text-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onBookPlatinum}
                    className="bg-white text-black px-4 py-3 rounded-full font-black text-xs md:text-sm hover:bg-white/90 transition-all group w-full shadow-lg shadow-white/10"
                  >
                    Book {platinumLabel} <FiArrowRight className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                  <p className="text-white/30 text-[10px] mt-2">Responses in &lt;15 mins · No credit card required</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
