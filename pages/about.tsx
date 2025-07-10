import React, { useState } from 'react'
import Head from 'next/head'
import CornerNav from '../components/CornerNav'
import OppoScroll from '../components/OppoScroll'

export default function About() {
  const [navActive, setNavActive] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Head>
        <title>About Robo Booth - Toronto's Premier Robot Photobooth & 360 Photo Booth | GTA Photo Booth Rental</title>
        <meta name="description" content="Learn about Toronto's premier robot photobooth and 360 photo booth. Serving Ajax, Oshawa, Whitby, Markham, Vaughan, Courtice, Etobicoke, King City, Pickering, North York, Bowmanville, Mississauga, Richmond Hill, East Gwillimbury, Barrie, Whitchurch-Stouffville. Canada's first interactive robotic photobooth technology." />
        <meta name="keywords" content="about robot photobooth, about 360 photo booth, Toronto robot photobooth, GTA photo booth rental, Ajax photobooth, Oshawa photobooth, Whitby photobooth, Markham photobooth, Vaughan photobooth, Courtice photobooth, Etobicoke photobooth, King City photobooth, Pickering photobooth, North York photobooth, Bowmanville photobooth, Mississauga photobooth, Richmond Hill photobooth, East Gwillimbury photobooth, Barrie photobooth, Whitchurch-Stouffville photobooth, interactive photobooth, robotic photobooth, 360 degree photobooth, photo booth rental Toronto, photo booth rental GTA" />
        <meta property="og:title" content="About Robo Booth - Toronto's Premier Robot Photobooth & 360 Photo Booth" />
        <meta property="og:description" content="Learn about Toronto's premier robot photobooth and 360 photo booth. Canada's first interactive robotic photobooth technology serving the GTA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://robobooth.ca/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Robo Booth - Toronto's Premier Robot Photobooth & 360 Photo Booth" />
        <meta name="twitter:description" content="Learn about Toronto's premier robot photobooth and 360 photo booth. Canada's first interactive robotic photobooth technology serving the GTA." />
        <link rel="canonical" href="https://robobooth.ca/about" />
      </Head>
      <CornerNav active={navActive} setActive={setNavActive} />
      <OppoScroll />
    </div>
  )
} 