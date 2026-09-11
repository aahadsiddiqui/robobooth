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

let memoryAttribution: AttributionData = {}

function readJson(kind: 'localStorage' | 'sessionStorage', key: string): AttributionData {
  try {
    const value = window[kind].getItem(key)
    const parsed = value ? JSON.parse(value) : {}
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

function writeJson(kind: 'localStorage' | 'sessionStorage', key: string, value: string): void {
  try {
    window[kind].setItem(key, value)
  } catch {
    // Each storage target is independent; memory remains available for this page.
  }
}

function isFresh(data: AttributionData): boolean {
  if (!data.attribution_captured_at) return true
  const capturedAt = Date.parse(data.attribution_captured_at)
  return Number.isFinite(capturedAt) && Date.now() - capturedAt <= MAX_AGE_MS
}

/** Capture the most recent tagged visit as one complete touch, for 90 days. */
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

  const next: AttributionData = {
    ...captured,
    landing_page: `${window.location.pathname}${window.location.search}`,
    initial_referrer: document.referrer || undefined,
    attribution_captured_at: new Date().toISOString(),
  }

  // Never merge IDs from an older ad with a different visit's UTM labels.
  memoryAttribution = next
  const serialized = JSON.stringify(next)
  writeJson('localStorage', STORAGE_KEY, serialized)
  writeJson('sessionStorage', STORAGE_KEY, serialized)
  writeJson('sessionStorage', LEGACY_STORAGE_KEY, serialized)
}

export function getStoredAttribution(): AttributionData {
  if (typeof window === 'undefined') return {}

  const candidates = [
    memoryAttribution,
    readJson('sessionStorage', STORAGE_KEY),
    readJson('localStorage', STORAGE_KEY),
    readJson('sessionStorage', LEGACY_STORAGE_KEY),
  ]

  return candidates
    .filter((candidate) => Object.keys(candidate).length > 0 && isFresh(candidate))
    .sort((a, b) => Date.parse(b.attribution_captured_at || '1970-01-01') - Date.parse(a.attribution_captured_at || '1970-01-01'))[0] || {}
}

/** Add stored attribution to a Formspree submission without duplicate fields. */
export function appendUtmParams(fd: FormData): void {
  const data = getStoredAttribution()
  Object.entries(data).forEach(([key, value]) => {
    if (isValidValue(value)) fd.set(key, value)
  })
}
