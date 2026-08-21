export type BudgetOption = { value: string; label: string }

export type QuotePackageTier = 'bronze' | 'gold' | 'platinum' | ''

export type PricingContext = 'corporate' | 'standard' | 'aerial-private' | 'aerial-corporate'

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
  { value: '$2000-$2500+', label: '$2,000–$2,500+' },
]

const GOLD_CORPORATE: BudgetOption[] = [
  { value: '$3500-$4000', label: '$3,500–$4,000' },
  { value: '$4000-$4500', label: '$4,000–$4,500' },
  { value: '$4500-$5000+', label: '$4,500–$5,000+' },
]

const PLATINUM_CORPORATE: BudgetOption[] = [
  { value: '$5000-$5500', label: '$5,000–$5,500' },
  { value: '$5500-$6000', label: '$5,500–$6,000' },
  { value: '$6000-$6500+', label: '$6,000–$6,500+' },
]

/** Aerial corporate (/aerial-corporate) package budgets */
const BRONZE_AERIAL_CORPORATE: BudgetOption[] = [
  { value: '$2500-$3000', label: '$2,500–$3,000' },
]

const GOLD_AERIAL_CORPORATE: BudgetOption[] = GOLD_CORPORATE
const PLATINUM_AERIAL_CORPORATE: BudgetOption[] = PLATINUM_CORPORATE

/** Aerial private events (/aerial-private) package budgets */
const BRONZE_AERIAL_PRIVATE: BudgetOption[] = [
  { value: '$2000-$2500', label: '$2,000–$2,500' },
  { value: '$2500-$3000', label: '$2,500–$3,000' },
  { value: '$3000-$3500+', label: '$3,000–$3,500+' },
]

const GOLD_AERIAL_PRIVATE: BudgetOption[] = [
  { value: '$3000-$3500', label: '$3,000–$3,500' },
  { value: '$3500-$4000', label: '$3,500–$4,000' },
  { value: '$4000-$4500+', label: '$4,000–$4,500+' },
]

const PLATINUM_AERIAL_PRIVATE: BudgetOption[] = [
  { value: '$4000-$4500', label: '$4,000–$4,500' },
  { value: '$4500-$5000', label: '$4,500–$5,000' },
  { value: '$5000-$5500+', label: '$5,000–$5,500+' },
]

const DEFAULT_STANDARD: BudgetOption[] = GOLD_STANDARD
const DEFAULT_CORPORATE: BudgetOption[] = GOLD_CORPORATE
/** Generic Secure Your Date CTAs on aerial-private use bronze starting ranges */
const DEFAULT_AERIAL_PRIVATE: BudgetOption[] = BRONZE_AERIAL_PRIVATE
const DEFAULT_AERIAL_CORPORATE: BudgetOption[] = GOLD_AERIAL_CORPORATE

/** Budget dropdown options based on selected package + page pricing context */
export function getPackageBudgetOptions(
  packageTier: QuotePackageTier,
  pricingContext: PricingContext = 'standard'
): BudgetOption[] {
  if (pricingContext === 'aerial-private') {
    if (packageTier === 'bronze') return BRONZE_AERIAL_PRIVATE
    if (packageTier === 'gold') return GOLD_AERIAL_PRIVATE
    if (packageTier === 'platinum') return PLATINUM_AERIAL_PRIVATE
    return DEFAULT_AERIAL_PRIVATE
  }

  if (pricingContext === 'aerial-corporate') {
    if (packageTier === 'bronze') return BRONZE_AERIAL_CORPORATE
    if (packageTier === 'gold') return GOLD_AERIAL_CORPORATE
    if (packageTier === 'platinum') return PLATINUM_AERIAL_CORPORATE
    return DEFAULT_AERIAL_CORPORATE
  }

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
