import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  getStoredAttribution,
  storeUtmParams,
  type AttributionData,
} from '../lib/utmParams'

export interface UTMData extends AttributionData {
  [key: string]: string | undefined
}

/** Exposes the same attribution payload used by all Formspree submissions. */
export const useUTM = (): UTMData => {
  const router = useRouter()
  const [utmData, setUtmData] = useState<UTMData>({})

  useEffect(() => {
    if (!router.isReady) return
    storeUtmParams()
    setUtmData(getStoredAttribution())
  }, [router.isReady, router.asPath])

  return utmData
}
