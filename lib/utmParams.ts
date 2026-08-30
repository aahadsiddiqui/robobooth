export const ATTRIBUTION_KEYS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'campaign_id', 'adset_id', 'ad_id', 'fbclid',
  'hsa_acc', 'hsa_cam', 'hsa_grp', 'hsa_ad', 'hsa_src', 'hsa_net', 'hsa_ver',
] as const

export type AttributionData = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>> & {
  landing_page?: string
  initial_referrer?: string
  attribution_captured_at?: string
}

const STORAGE_KEY = 'robobooth_attribution'
const LEGACY_STORAGE_KEY = 'utm_data'
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

function isUnresolvedToken(value: string): boolean {
  return value.includes('{{') && value.includes('}}')
}

function isValidValue(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && !isUnresolvedToken(value)
}

function readJson(storage: Storage, key: string): AttributionData {
  try {
    const value = storage.getItem(key)
    return value ? JSON.parse(value) : {}
  } catch {
    return {}
  }
}

function isFresh(data: AttributionData): boolean {
  if (!data.attribution_captured_at) return true
  const capturedAt = Date.parse(data.attribution_captured_at)
  return Number.isFinite(capturedAt) && Date.now() - capturedAt <= MAX_AGE_MS
}

/** Capture the most recent paid-marketing visit and retain it for 90 days. */
export function storeUtmParams(): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const captured: AttributionData = {}

  ATTRIBUTION_KEYS.forEach((key) => {
    const value = params.get(key)
    if (isValidValue(value)) captured[key] = value
  })

  if (Object.keys(captured).length === 0) return

  // Keep compatibility with the legacy Formspree/Zapier field names.
  if (captured.campaign_id && !captured.hsa_cam) captured.hsa_cam = captured.campaign_id
  if (captured.adset_id && !captured.hsa_grp) captured.hsa_grp = captured.adset_id
  if (captured.ad_id && !captured.hsa_ad) captured.hsa_ad = captured.ad_id

  const existing = readJson(localStorage, STORAGE_KEY)
  const next: AttributionData = {
    ...(isFresh(existing) ? existing : {}),
    ...captured,
    landing_page: `${window.location.pathname}${window.location.search}`,
    initial_referrer: existing.initial_referrer || document.referrer || undefined,
    attribution_captured_at: new Date().toISOString(),
  }

  try {
    const serialized = JSON.stringify(next)
    localStorage.setItem(STORAGE_KEY, serialized)
    sessionStorage.setItem(STORAGE_KEY, serialized)
    sessionStorage.setItem(LEGACY_STORAGE_KEY, serialized)
  } catch {
    // Storage can be unavailable in private browsing; never disrupt the page.
  }
}

export function getStoredAttribution(): AttributionData {
  if (typeof window === 'undefined') return {}

  const candidates = [
    readJson(sessionStorage, STORAGE_KEY),
    readJson(localStorage, STORAGE_KEY),
    readJson(sessionStorage, LEGACY_STORAGE_KEY),
  ]

  return candidates.find((candidate) => Object.keys(candidate).length > 0 && isFresh(candidate)) || {}
}

/** Add stored attribution to a Formspree submission without duplicate fields. */
export function appendUtmParams(fd: FormData): void {
  const data = getStoredAttribution()
  Object.entries(data).forEach(([key, value]) => {
    if (isValidValue(value)) fd.set(key, value)
  })
}
