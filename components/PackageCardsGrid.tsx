import React from 'react'
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
  showBoothAddOns?: boolean
}

function PhotographySubsection({
  benefits,
  variant,
}: {
  benefits: string[]
  variant: PackageTierId
}) {
  const styles = {
    bronze: 'border-white/10 bg-white/[0.03]',
    gold: 'border-[#fce4a6]/20 bg-[#fce4a6]/5',
    platinum: 'border-white/15 bg-white/[0.05]',
  }

  const iconColor = {
    bronze: 'text-white/40',
    gold: 'text-[#fce4a6]',
    platinum: 'text-white/60',
  }

  const checkColor = {
    bronze: 'text-white/30',
    gold: 'text-[#fce4a6]/70',
    platinum: 'text-white/50',
  }

  return (
    <div className={`rounded-xl border p-3.5 mt-4 ${styles[variant]}`}>
      <div className="flex items-center gap-2 mb-2.5">
        <FiCamera className={`w-3.5 h-3.5 ${iconColor[variant]}`} />
        <p className={`text-[10px] font-black uppercase tracking-widest ${variant === 'gold' ? 'text-[#fce4a6]/80' : 'text-white/50'}`}>
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

function BoothAddOnsSubsection() {
  return (
    <div className="rounded-xl border border-white/15 bg-white/[0.05] p-3.5 mt-4">
      <div className="flex items-center gap-2 mb-2.5">
        <FiPlus className="w-3.5 h-3.5 text-white/60" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/50">
          Add on: Extra Booths
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {boothAddOns.map((booth) => (
          <span
            key={booth.name}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-white/70"
          >
            {booth.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function RobotCountBadge({ label, variant }: { label: string; variant: PackageTierId }) {
  const styles = {
    bronze: 'bg-white/10 text-white/70 border-white/10',
    gold: 'bg-[#fce4a6]/15 text-[#fce4a6] border-[#fce4a6]/30',
    platinum: 'bg-white/10 text-white/80 border-white/20',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${styles[variant]}`}>
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
  insertAfterBronze,
  maxWidth = 'max-w-5xl',
  showBoothAddOns = true,
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
            Choose Your <span className="text-[#fce4a6]">Package</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base">{subtitle}</p>
        </Reveal>

        <div className={`grid grid-cols-1 gap-4 md:gap-5 items-stretch ${gridCols}`}>
          {/* Bronze */}
          <Reveal>
            <div className="relative rounded-3xl border border-white/20 bg-white/[0.04] p-6 md:p-7 h-full flex flex-col">
              <div className="flex justify-center mb-3">
                <span className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
                  {bronzeLabel}
                </span>
              </div>
              <div className="flex justify-center mb-3">
                <RobotCountBadge label={tiers.bronze.robotLabel} variant="bronze" />
              </div>
              <h3 className="text-lg md:text-xl font-black text-center mb-2">{tiers.bronze.title}</h3>
              <p className="text-white/50 text-xs text-center mb-4">{tiers.bronze.desc}</p>
              <div className="space-y-2.5 flex-1">
                {tiers.bronze.robotBenefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <FiCheck className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                    <p className="text-white/60 text-xs leading-relaxed">{b}</p>
                  </div>
                ))}
                <PhotographySubsection benefits={tiers.bronze.photographyBenefits} variant="bronze" />
              </div>
              <div className="text-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBookBronze}
                  className="border-2 border-white/30 text-white px-4 py-3 rounded-full font-bold text-xs md:text-sm hover:bg-white/10 transition-all group w-full"
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
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#fce4a6]/50 bg-gradient-to-br from-[#fce4a6]/10 via-black to-black p-6 md:p-7 shadow-2xl shadow-[#fce4a6]/10 h-full flex flex-col">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#fce4a625_0%,_transparent_65%)] pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-center mb-3">
                  <span className="inline-flex items-center gap-2 bg-[#fce4a6] text-black text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg">
                    ⭐ {tiers.gold.badge}
                  </span>
                </div>
                <div className="flex justify-center mb-3">
                  <RobotCountBadge label={tiers.gold.robotLabel} variant="gold" />
                </div>
                <h3 className="text-lg md:text-xl font-black text-center mb-2">
                  {tiers.gold.title}
                </h3>
                <p className="text-white/60 text-xs text-center mb-4">{tiers.gold.desc}</p>
                <div className="space-y-2.5 flex-1">
                  {tiers.gold.robotBenefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FiCheck className="w-4 h-4 text-[#fce4a6] mt-0.5 flex-shrink-0" />
                      <p className="text-white/70 text-xs leading-relaxed">{b}</p>
                    </div>
                  ))}
                  <PhotographySubsection benefits={tiers.gold.photographyBenefits} variant="gold" />
                </div>
                <div className="text-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onBookGold}
                    className="bg-[#fce4a6] text-black px-4 py-3 rounded-full font-black text-xs md:text-sm shadow-lg shadow-[#fce4a6]/30 hover:shadow-xl transition-all group w-full"
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
                  <RobotCountBadge label={tiers.platinum.robotLabel} variant="platinum" />
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
                  <BoothAddOnsSubsection />
                  <PhotographySubsection benefits={tiers.platinum.photographyBenefits} variant="platinum" />
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

        {showBoothAddOns && (
          <Reveal className="mt-10 md:mt-12" delay={0.15}>
            <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-6 md:p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-[11px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
                  <FiPlus className="w-3.5 h-3.5" />
                  Add-On Booths
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-2">
                  Pair Any Package with an <span className="text-[#fce4a6]">Extra Booth</span>
                </h3>
                <p className="text-white/50 text-sm max-w-xl mx-auto">
                  Layer on a second activation for more coverage, more content, and more guest moments.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {boothAddOns.map((booth) => (
                  <div
                    key={booth.name}
                    className="rounded-2xl border border-white/10 bg-black/40 p-4 hover:border-[#fce4a6]/40 transition-colors"
                  >
                    <p className="text-sm font-bold text-white mb-1.5">{booth.name}</p>
                    <p className="text-white/45 text-[11px] leading-relaxed">{booth.desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBookPlatinum}
                  className="border border-[#fce4a6]/40 text-[#fce4a6] px-5 py-2.5 rounded-full font-bold text-xs md:text-sm hover:bg-[#fce4a6]/10 transition-all group"
                >
                  Ask About Add-On Booths <FiArrowRight className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
