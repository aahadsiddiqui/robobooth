import React from 'react'
import '../styles/globals.css'
import 'react-calendar/dist/Calendar.css'
import '../styles/calendar.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import Chatbot from '@/components/Chatbot'
import Footer from '../components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <Component {...pageProps} />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
} 