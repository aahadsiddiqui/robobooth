const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

/**
 * Returns true if the value is an unresolved Meta Ads dynamic token
 * (e.g. "{{campaign.name}}" passed literally in Story/preview links).
 * Meta only substitutes these tokens for real ad deliveries, not previews.
 */
function isUnresolvedToken(value: string): boolean {
  return value.includes('{{') && value.includes('}}')
}

/**
 * Call once on every page load / route change (wired into _app.tsx).
 * Reads UTM params from the URL and persists them in sessionStorage.
 * Unresolved Meta preview tokens are silently dropped to keep data clean.
 */
export function storeUtmParams(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const captured: Record<string, string> = {}

  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value && !isUnresolvedToken(value)) {
      captured[key] = value
      sessionStorage.setItem(key, value)
    }
  })

  if (Object.keys(captured).length > 0) {
    try {
      const existing = JSON.parse(sessionStorage.getItem('utm_data') || '{}')
      sessionStorage.setItem('utm_data', JSON.stringify({ ...existing, ...captured }))
    } catch {
      sessionStorage.setItem('utm_data', JSON.stringify(captured))
    }
  }
}

/**
 * Append all stored UTM params as hidden fields onto a FormData object
 * before it is posted to Formspree. Formspree forwards them verbatim in
 * the submission email — no Zapier zap is affected.
 * Unresolved Meta preview tokens ({{campaign.name}} etc.) are silently dropped.
 */
export function appendUtmParams(fd: FormData): void {
  if (typeof window === 'undefined') return

  try {
    const blob = sessionStorage.getItem('utm_data')
    if (blob) {
      const data: Record<string, string> = JSON.parse(blob)
      Object.entries(data).forEach(([key, value]) => {
        if (value && !isUnresolvedToken(value)) fd.append(key, value)
      })
      return
    }
  } catch {
    // fall through to individual keys
  }

  UTM_KEYS.forEach((key) => {
    const value = sessionStorage.getItem(key)
    if (value && !isUnresolvedToken(value)) fd.append(key, value)
  })
}
