export type EventType = 'wedding' | 'birthday' | 'corporate'

export type PackageRecommendation = {
  id: string
  name: string
  tagline: string
  description: string
  highlights: string[]
  priceLabel: string
  featured?: boolean
}

export const eventOptions: { value: EventType; label: string; emoji: string }[] = [
  { value: 'wedding', label: 'Wedding', emoji: '💍' },
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'corporate', label: 'Corporate', emoji: '🏢' },
]

export const packagesByEvent: Record<EventType, PackageRecommendation[]> = {
  wedding: [
    {
      id: 'wedding-signature',
      name: 'Signature Wedding Experience',
      tagline: 'Robot + Aerial duo for unforgettable moments',
      description:
        'Our most-loved wedding package pairs the interactive Robot Photobooth with the enclosed Aerial Booth for studio-quality portraits and viral-worthy clips.',
      highlights: ['Robot Photobooth', 'Aerial Booth', 'Custom overlays', 'On-site attendant'],
      priceLabel: 'From $2,499',
      featured: true,
    },
    {
      id: 'wedding-360',
      name: 'Cinematic 360 Package',
      tagline: 'Slow-motion magic for your reception',
      description:
        'Add a 360 Video Setup to capture cinematic slow-motion clips your guests will share instantly.',
      highlights: ['360 Booth', 'Instant sharing', 'Custom branding', '4–6 hour coverage'],
      priceLabel: 'From $1,899',
    },
    {
      id: 'wedding-premium-addon',
      name: 'Premium Photobooth Add-On',
      tagline: 'Compact elegance at a discounted bundle rate',
      description:
        'Add our Premium Photobooth as a discounted add-on — perfect for cocktail hour or a second activation zone.',
      highlights: ['Discounted when bundled', 'Ultra-portable', 'Instant prints', 'Great for tight spaces'],
      priceLabel: 'Add from $799',
    },
  ],
  birthday: [
    {
      id: 'birthday-robot',
      name: 'Robot Party Package',
      tagline: 'The guest magnet every celebration needs',
      description:
        'Our interactive Robot Photobooth draws a crowd and keeps energy high from first photo to last dance.',
      highlights: ['Robot Photobooth', 'Fun props', 'GIFs & prints', 'On-site attendant'],
      priceLabel: 'From $1,499',
      featured: true,
    },
    {
      id: 'birthday-360',
      name: '360 Celebration Bundle',
      tagline: 'Viral clips your guests will love',
      description:
        'Step into the 360 setup and walk away with cinematic slow-motion content in seconds.',
      highlights: ['360 Video Setup', 'Instant SMS delivery', 'Custom overlays', '3–4 hour rental'],
      priceLabel: 'From $1,299',
    },
    {
      id: 'birthday-premium',
      name: 'Premium Photobooth Standalone',
      tagline: 'High-value standalone or discounted add-on',
      description:
        'Book the Premium Photobooth on its own for smaller venues, or bundle it with any package for a discounted rate.',
      highlights: ['Standalone or add-on', 'Quick setup', 'Compact footprint', 'Instant sharing'],
      priceLabel: 'From $899',
    },
  ],
  corporate: [
    {
      id: 'corporate-activation',
      name: 'Brand Activation Suite',
      tagline: 'Turn attendees into brand ambassadors',
      description:
        'Combine Robot Photobooths with 360 Video Setups for maximum engagement, custom branding, and measurable social reach.',
      highlights: ['Robot + 360 combo', 'Full brand customization', 'Lead capture', 'Analytics dashboard'],
      priceLabel: 'From $3,499',
      featured: true,
    },
    {
      id: 'corporate-aerial',
      name: 'Executive Aerial Experience',
      tagline: 'High-angle capture with enclosed luxury',
      description:
        'Our High-Angle Aerial Capture Enclosure delivers consistent, studio-grade results for galas, conferences, and VIP events.',
      highlights: ['Aerial Booth', 'DSLR quality', 'Private enclosed setup', 'Professional attendant'],
      priceLabel: 'From $2,199',
    },
    {
      id: 'corporate-premium',
      name: 'Premium Photobooth Add-On',
      tagline: 'Flexible standalone or discounted bundle',
      description:
        'Deploy the Premium Photobooth as a standalone activation or add it to any corporate package at a reduced rate.',
      highlights: ['Standalone or add-on pricing', 'Logo overlays', 'Fast throughput', 'Compact setup'],
      priceLabel: 'Add from $699',
    },
  ],
}
