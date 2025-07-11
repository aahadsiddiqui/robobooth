import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Robo Booth" />
        <meta property="og:title" content="Robo Booth - Interactive Photo Experience" />
        <meta property="og:description" content="Experience the future of event photography with our interactive robot photo booth" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/favicon.png" />
        
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Meta Pixel (Facebook Pixel) Code */}
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1125962542706222&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </Html>
  )
} 