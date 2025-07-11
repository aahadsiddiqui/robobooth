import React from 'react'
import '../styles/globals.css'
import 'react-calendar/dist/Calendar.css'
import '../styles/calendar.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer'
import { useMetaPixel } from '../hooks/useMetaPixel'

export default function App({ Component, pageProps }: AppProps) {
  // Initialize Meta Pixel
  useMetaPixel();

  return (
    <>
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
} 