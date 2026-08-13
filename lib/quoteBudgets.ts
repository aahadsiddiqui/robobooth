export type BudgetOption = { value: string; label: string }

export type QuotePackageTier = 'bronze' | 'gold' | 'platinum' | ''

export type PricingContext = 'corporate' | 'standard'

const BRONZE_STANDARD: BudgetOption[] = [
  { value: '$1000-$2000', label: '$1,000–$2,000' },
  { value: '$2000-$3000', label: '$2,000–$3,000' },
  { value: '$3000+', label: '$3,000+' },
]

const GOLD_STANDARD: BudgetOption[] = [
  { value: '$2000-$3000', label: '$2,000–$3,000' },
  { value: '$3000-$4000', label: '$3,000–$4,000' },
  { value: '$4000+', label: '$4,000+' },
]

const PLATINUM_STANDARD: BudgetOption[] = [
  { value: '$3000-$4000', label: '$3,000–$4,000' },
  { value: '$4000-$5000', label: '$4,000–$5,000' },
  { value: '$5000+', label: '$5,000+' },
]

const BRONZE_CORPORATE: BudgetOption[] = [
  { value: '$2000-$3000', label: '$2,000–$3,000' },
  { value: '$3000-$4000', label: '$3,000–$4,000' },
  { value: '$4000+', label: '$4,000+' },
]

const GOLD_CORPORATE: BudgetOption[] = [
  { value: '$3000-$4000', label: '$3,000–$4,000' },
  { value: '$4000-$5000', label: '$4,000–$5,000' },
  { value: '$5000+', label: '$5,000+' },
]

const PLATINUM_CORPORATE: BudgetOption[] = [
  { value: '$4500-$5500', label: '$4,500–$5,500' },
  { value: '$5500-$6500', label: '$5,500–$6,500' },
  { value: '$6500+', label: '$6,500+' },
]

const DEFAULT_STANDARD: BudgetOption[] = GOLD_STANDARD
const DEFAULT_CORPORATE: BudgetOption[] = GOLD_CORPORATE

/** Budget dropdown options based on selected package + corporate vs standard pages */
export function getPackageBudgetOptions(
  packageTier: QuotePackageTier,
  pricingContext: PricingContext = 'standard'
): BudgetOption[] {
  if (pricingContext === 'corporate') {
    if (packageTier === 'gold') return GOLD_CORPORATE
    if (packageTier === 'platinum') return PLATINUM_CORPORATE
    if (packageTier === 'bronze') return BRONZE_CORPORATE
    return DEFAULT_CORPORATE
  }

  if (packageTier === 'gold') return GOLD_STANDARD
  if (packageTier === 'platinum') return PLATINUM_STANDARD
  if (packageTier === 'bronze') return BRONZE_STANDARD
  return DEFAULT_STANDARD
}

/** Local YYYY-MM-DD for HTML date min attribute */
export function getTodayDateString(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}
