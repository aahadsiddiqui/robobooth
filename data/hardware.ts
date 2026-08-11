export type HardwareItem = {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  features: string[]
  pricingNote?: string
  badge?: string
  link: string
}

export const hardwareFleet: HardwareItem[] = [
  {
    id: 'robot-photobooth',
    name: 'Interactive Robot Photobooths',
    tagline: 'Canada\'s first — a guest magnet at every event',
    description:
      'Our signature robotic photobooth glides through your venue, engaging guests with smooth movement, studio lighting, and instant sharing. The experience that started it all.',
    image: '/images/robo-booth-1.jpg',
    features: ['Robotic guest engagement', 'Studio-grade lighting', 'GIFs, prints & digital', 'On-site attendant'],
    badge: 'Signature',
    link: '/products/robot-photobooth',
  },
  {
    id: '360-booth',
    name: '360 Video Setups',
    tagline: 'Cinematic slow-motion content in seconds',
    description:
      'Guests step onto the platform while our camera orbits 360°, capturing premium slow-motion clips they receive instantly via SMS or AirDrop.',
    image: '/images/360-booth-main.jpg',
    features: ['4K slow-motion capture', 'Instant sharing', 'Custom brand overlays', 'Under 30-min setup'],
    badge: 'Most Popular',
    link: '/360-booth',
  },
  {
    id: 'aerial-booth',
    name: 'High-Angle Aerial Capture Enclosures',
    tagline: 'Enclosed luxury with flawless consistency',
    description:
      'A private, elevated booth experience with DSLR-quality capture and consistent studio lighting — perfect for premium events and brand activations.',
    image: '/images/aerial2.jpg',
    features: ['Enclosed private experience', 'DSLR-quality photos', 'High-angle perspective', 'Instant prints'],
    badge: 'Premium',
    link: '/aerial',
  },
  {
    id: 'premium-photobooth',
    name: 'Premium Photobooths',
    tagline: 'Standalone excellence or discounted add-on',
    description:
      'Ultra-portable and sleek, the Premium Photobooth fits anywhere without sacrificing quality. Book standalone for smaller events, or add it to any package at a discounted bundle rate.',
    image: '/images/premium-booth.jpg',
    features: ['Ultra-portable design', 'Quick 15-min setup', 'Standalone or add-on pricing', 'Custom branding'],
    pricingNote: 'Available as a high-value standalone rental or discounted when bundled with any package.',
    link: '/premium-photobooth',
  },
]
