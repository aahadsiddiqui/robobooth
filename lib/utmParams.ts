const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

/**
 * Call once on every page load / route change (wired into _app.tsx).
 * Reads UTM params from the URL and persists them in sessionStorage in two
 * formats so they are compatible with both this utility and the existing
 * useUTM hook used by TerminalContact.
 */
export function storeUtmParams(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const captured: Record<string, string> = {}

  UTM_KEYS.forEach((key) => {
    const value = params.get(key)
    if (value) {
      captured[key] = value
      sessionStorage.setItem(key, value)
    }
  })

  if (Object.keys(captured).length > 0) {
    // Also write the JSON blob used by the existing useUTM hook
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
 */
export function appendUtmParams(fd: FormData): void {
  if (typeof window === 'undefined') return

  // Prefer the shared JSON blob (populated by both storeUtmParams and useUTM)
  try {
    const blob = sessionStorage.getItem('utm_data')
    if (blob) {
      const data: Record<string, string> = JSON.parse(blob)
      Object.entries(data).forEach(([key, value]) => {
        if (value) fd.append(key, value)
      })
      return
    }
  } catch {
    // fall through to individual keys
  }

  // Fallback: individual keys written by storeUtmParams
  UTM_KEYS.forEach((key) => {
    const value = sessionStorage.getItem(key)
    if (value) fd.append(key, value)
  })
}
