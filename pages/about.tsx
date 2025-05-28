import React, { useState } from 'react'
import Head from 'next/head'
import CornerNav from '../components/CornerNav'
import OppoScroll from '../components/OppoScroll'

export default function About() {
  const [navActive, setNavActive] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Head>
        <title>About Robo Booth - Canada's First Robot Photo Booth</title>
        <meta name="description" content="Learn about Robo Booth's innovative features and how it can transform your events" />
      </Head>
      <CornerNav active={navActive} setActive={setNavActive} />
      <OppoScroll />
    </div>
  )
} 