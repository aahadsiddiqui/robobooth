import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'RoboBooth | Canada\'s First Robot PhotoBooth & Aerial Booth',
  description:
    'Canada\'s first Robot PhotoBooth and Aerial Booth serving the GTA and surrounding areas. Your one-stop shop for photography and event entertainment.',
  keywords:
    'robot photo booth, aerial booth, photo booth rental Toronto, GTA photo booth, event entertainment, 360 booth, premium photobooth',
  openGraph: {
    title: 'RoboBooth | Canada\'s First Robot PhotoBooth & Aerial Booth',
    description:
      'Canada\'s first Robot PhotoBooth and Aerial Booth. Your one-stop shop for photography and event entertainment across the GTA.',
    type: 'website',
    url: 'https://robobooth.ca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RoboBooth | Canada\'s First Robot PhotoBooth & Aerial Booth',
    description:
      'Canada\'s first Robot PhotoBooth and Aerial Booth. Your one-stop shop for photography and event entertainment across the GTA.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  )
}
