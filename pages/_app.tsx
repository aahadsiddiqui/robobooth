import React from 'react'
import '../styles/globals.css'
import 'react-calendar/dist/Calendar.css'
import '../styles/calendar.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer'
import { useMetaPixel } from '../hooks/useMetaPixel'

import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // Initialize Meta Pixel
  useMetaPixel();

  // Pages where footer should be hidden
  const hideFooter = ['/corporate', '/wedding'].includes(router.pathname)

  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
      {!hideFooter && <Footer />}
    </>
  )
} 