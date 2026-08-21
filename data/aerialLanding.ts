export type AerialLandingVariant = 'corporate' | 'private'

export type AerialTestimonial = {
  name: string
  role: string
  text: string
}

export type AerialFeature = {
  title: string
  desc: string
}

export type AerialStep = {
  title: string
  desc: string
}

export type AerialPackage = {
  id: 'bronze' | 'gold' | 'platinum'
  badge: string
  title: string
  desc: string
  benefits: string[]
  cta: string
  highlight?: boolean
  showBoothChoice?: boolean
  boothChoiceCount?: 1 | 2
  photographyAddOn?: boolean
}

export const additionalBooths = [
  {
    id: 'robot',
    name: 'Robot Photobooth',
    desc: 'Roaming interactive robot that visits tables and captures studio-quality shots.',
    image: '/images/robot1.jpg',
  },
  {
    id: 'vogue',
    name: 'Vogue Booth',
    desc: 'Magazine-cover portraits with custom editorial overlays and studio lighting.',
    image: '/images/voguebooth1.png',
  },
  {
    id: 'premium',
    name: 'Premium Photobooth',
    desc: 'Classic enclosed photobooth with instant prints and custom branding.',
    image: '/images/premium-booth.jpg',
  },
  {
    id: '360',
    name: '360 Booth',
    desc: 'Cinematic spinning video content guests share instantly to social.',
    image: '/images/360-booth-main.jpg',
  },
] as const

export const companyLogos = [
  '/images/adamas.png',
  '/images/bell.png',
  '/images/bgo.png',
  '/images/equifax.svg',
  '/images/geotab.png',
  '/images/hilton.png',
  '/images/infosys.png',
  '/images/meta.png',
  '/images/pdsb.png',
  '/images/remax.png',
  '/images/ritz.webp',
  '/images/rlp.svg',
  '/images/stonex.png',
  '/images/talent.png',
  '/images/td.png',
  '/images/torontopearson.png',
  '/images/BMO.svg.png',
  '/images/tdsynnex.png',
  '/images/carmichael.png',
  '/images/siemens.png',
  '/images/alphawave.png',
  '/images/newmarket.png',
]

export const venueMarqueeItems = [
  { label: 'The Ritz-Carlton', logo: '/images/ritz.webp' },
  { label: 'Hilton', logo: '/images/hilton.png' },
  { label: 'Casa Loma', logo: null },
  { label: 'Four Seasons Toronto', logo: null },
  { label: 'Liberty Grand', logo: null },
  { label: 'The Distillery District', logo: null },
  { label: 'Shangri-La Toronto', logo: null },
  { label: 'The Carlu', logo: null },
  { label: 'Royal Ontario Museum', logo: null },
  { label: 'Fairmont Royal York', logo: null },
  { label: 'Scarborough Convention Centre', logo: null },
  { label: 'Durham Convention Centre', logo: null },
  { label: 'IKON Event Space', logo: null },
  { label: 'Nuvo Event Space', logo: null },
  { label: 'Brighton Convention Centre', logo: null },
  { label: 'Red Rose Convention Centre', logo: null },
  { label: 'Verdi Convention Centre', logo: null },
]

export type AerialLandingCopy = {
  variant: AerialLandingVariant
  path: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  ogTitle: string
  ogDescription: string
  urgency: string
  heroEyebrow: string
  headlineLead: string
  headlineAccent: string
  headlineRest: string
  subheadline: string
  primaryCta: string
  microCopy: string
  heroVideo: string
  heroPoster: string
  /** Optional second clear video shown mid-page (same style as hero panel) */
  secondaryVideo?: string
  secondaryPoster?: string
  marqueeLabel: string
  marqueeMode: 'logos' | 'venues'
  featuresTitleLead: string
  featuresTitleAccent: string
  features: AerialFeature[]
  galleryTitleLead: string
  galleryTitleAccent: string
  gallerySubtitle: string
  processTitleLead: string
  processTitleAccent: string
  processSubtitle: string
  steps: AerialStep[]
  packagesTitle: string
  packagesSubtitle: string
  packages: AerialPackage[]
  gallery: { src: string; alt: string; title?: string }[]
  testimonialsTitleLead: string
  testimonialsTitleAccent: string
  testimonials: AerialTestimonial[]
  finalHeadlineLead: string
  finalHeadlineAccent: string
  finalSub: string
  finalCta: string
  stickyCta: string
  eventType: string
  source: string
  pricingContext: 'corporate' | 'standard' | 'aerial-private'
  packageLabels: Record<'bronze' | 'gold' | 'platinum', string>
  packageBannerSubtitles: Record<'bronze' | 'gold' | 'platinum', string>
}

export const aerialCorporateCopy: AerialLandingCopy = {
  variant: 'corporate',
  path: '/aerial-corporate',
  seoTitle: 'Corporate Aerial Booth Toronto | Luxury Brand Activations | RoboBooth',
  seoDescription:
    'Toronto’s first luxury Aerial Booth for corporate events and brand activations. High-angle branded content, white-label customization, and white-glove service across the GTA.',
  seoKeywords:
    'corporate aerial booth Toronto, luxury aerial photo booth, brand activation Toronto, high angle photo booth GTA, branded photo booth corporate',
  ogTitle: 'Elevate Your Brand. Toronto’s First Luxury Aerial Booth.',
  ogDescription:
    'High-impact Aerial Booth activations for corporate events, galas, and brand campaigns. Fully branded, fully managed.',
  urgency: 'Corporate and campaign dates are filling fast',
  heroEyebrow: '5.0 Rating · Corporate & Brand Activations',
  headlineLead: 'Elevate Your Brand.',
  headlineAccent: 'Toronto’s First Luxury Aerial Booth.',
  headlineRest: '',
  subheadline:
    'Deliver a high-impact brand activation that guests can’t stop sharing. Immersive, high-angle content designed for maximum engagement, lead generation, and world-class corporate events.',
  primaryCta: 'Check Availability & Get a Quote',
  microCopy: 'Responses in <15 mins | No credit card required.',
  heroVideo: '/videos/corporateaerial.mp4',
  heroPoster: '/images/aerial-corporate-poster.png',
  marqueeLabel: 'Trusted by leading companies across the GTA',
  marqueeMode: 'logos',
  featuresTitleLead: 'Not Just a Photo Booth.',
  featuresTitleAccent: 'A Complete Brand Experience.',
  features: [
    {
      title: 'High-Angle Impact',
      desc: 'Capture stunning overhead photos, videos, and GIFs that dominate social feeds.',
    },
    {
      title: 'White-Label Customization',
      desc: 'Your logo, corporate colors, and campaign messaging on every digital overlay and physical print. Matching booth walls are available as an add-on.',
    },
    {
      title: 'Frictionless Sharing',
      desc: 'Content delivered instantly to phones via QR, SMS, or AirDrop, driving immediate brand reach.',
    },
  ],
  galleryTitleLead: 'Branded Aerial Booth',
  galleryTitleAccent: 'Image Gallery',
  gallerySubtitle: 'Real corporate and brand activation prints from events across the GTA.',
  processTitleLead: 'White-Glove Service.',
  processTitleAccent: 'Zero Stress for Your Team.',
  processSubtitle: 'We handle logistics, setup, and guest flow so your team stays focused on the event.',
  steps: [
    {
      title: 'You Book the Activation',
      desc: 'Tell us your campaign goals and event footprint. We handle the logistics.',
    },
    {
      title: 'Rapid Setup',
      desc: 'Our professional team arrives early, setting up the complete experience in 30 minutes.',
    },
    {
      title: 'High-Volume Engagement',
      desc: 'A dedicated on-site attendant guides guests, keeping lines moving and ensuring brand alignment.',
    },
  ],
  packagesTitle: 'Corporate Packages',
  packagesSubtitle: 'Scale from a flagship Aerial Booth to a full-floor takeover.',
  packages: [
    {
      id: 'bronze',
      badge: 'Bronze · Brand Activation',
      title: 'Aerial Booth Only',
      desc: 'The flagship high-angle experience — fully branded and fully staffed.',
      benefits: [
        'Aerial Booth only',
        'Fully branded digital overlays and instant sharing',
        'Dedicated on-site attendant',
      ],
      cta: 'Book Bronze Package',
    },
    {
      id: 'gold',
      badge: '⭐ Most Popular · Gold',
      title: 'Multi-Touchpoint',
      desc: 'Two simultaneous activations for maximum floor coverage.',
      benefits: [
        'Aerial Booth + choice of 1 additional booth',
        'Robot Photobooth, Vogue Booth, Premium Photobooth, or 360 Booth',
        'Two simultaneous activations for maximum floor coverage',
      ],
      cta: 'Book Gold Package',
      highlight: true,
      showBoothChoice: true,
      boothChoiceCount: 1,
      photographyAddOn: true,
    },
    {
      id: 'platinum',
      badge: '💎 Platinum · Ultimate Takeover',
      title: 'The Ultimate Takeover',
      desc: 'High-capacity engagement for large-scale galas and summits.',
      benefits: [
        'Aerial Booth + choice of 2 additional booths',
        'Robot, Vogue, Premium, or 360',
        'High-capacity engagement for large-scale galas and summits',
      ],
      cta: 'Book Platinum Package',
      showBoothChoice: true,
      boothChoiceCount: 2,
      photographyAddOn: true,
    },
  ],
  gallery: [
    { src: '/images/aerial-corporate/print-1.png', alt: 'Aerial Booth corporate print — Air Canada guests', title: 'Air Canada' },
    { src: '/images/aerial-corporate/print-2.png', alt: 'Aerial Booth corporate print — K-Dental team', title: 'K-Dental' },
    { src: '/images/aerial-corporate/print-3.png', alt: 'Aerial Booth branded print — Orthodontic Supply of Canada', title: 'Orthodontic Supply of Canada' },
    { src: '/images/aerial-corporate/print-4.png', alt: 'Aerial Booth corporate print — Air Canada event', title: 'Air Canada Event' },
    { src: '/images/aerial-corporate/print-5.png', alt: 'Aerial Booth gala print — CAVA Gala 2026', title: 'CAVA Gala 2026' },
    { src: '/images/aerial-corporate/print-6.png', alt: 'Aerial Booth corporate gala print — CAVA guests', title: 'CAVA Guests' },
  ],
  testimonialsTitleLead: 'What Corporate Hosts',
  testimonialsTitleAccent: 'Are Saying',
  testimonials: [
    {
      name: 'Rosanna',
      role: 'Project Manager, TD Canada Trust',
      text: 'I want to extend a huge THANK YOU to you and your team. The photo booths were very popular among TechCon attendees. You and your team were accommodating, patient and friendly from beginning to end. The backdrop and pictures were great quality.',
    },
    {
      name: 'Maya L.',
      role: 'Corporate Event Host',
      text: 'The Aerial Booth was the highlight of our event. The high-angle photos looked unreal and the team handled absolutely everything — we didn’t lift a finger.',
    },
    {
      name: 'Priya S.',
      role: 'Corporate Events Manager',
      text: 'We’ve done a lot of activations — this was by far the most talked-about. Guests loved stepping inside, the setup was seamless, and the branded content was exactly on-point. Will book again.',
    },
  ],
  finalHeadlineLead: 'Make Your Next Corporate Event',
  finalHeadlineAccent: 'Unforgettable.',
  finalSub: 'Reserve the Aerial Booth for your next summit, gala, or brand activation. We confirm availability within 15 minutes.',
  finalCta: 'Reserve Your Date Now',
  stickyCta: 'Get a Corporate Quote',
  eventType: 'Corporate Event - Aerial Booth',
  source: 'Aerial Corporate Page',
  pricingContext: 'corporate',
  packageLabels: {
    bronze: 'Bronze Package (Aerial Booth Only — Brand Activation)',
    gold: 'Gold Package (Aerial Booth + 1 Additional Booth)',
    platinum: 'Platinum Package (Aerial Booth + 2 Additional Booths)',
  },
  packageBannerSubtitles: {
    bronze: 'Aerial Booth Only',
    gold: 'Aerial + 1 Additional Booth',
    platinum: 'Aerial + 2 Additional Booths',
  },
}

export const aerialPrivateCopy: AerialLandingCopy = {
  variant: 'private',
  path: '/aerial-private',
  seoTitle: 'Private Event Aerial Booth Toronto | Weddings & Birthdays | RoboBooth',
  seoDescription:
    'Bring Toronto’s first luxury Aerial Booth to your wedding or milestone birthday. DSLR-quality photos, premium prints, and an immersive high-angle guest experience.',
  seoKeywords:
    'wedding aerial booth Toronto, luxury photo booth private event, aerial photobooth GTA, birthday photo booth, private event photo booth Toronto',
  ogTitle: 'Toronto’s Luxury Aerial Booth for Private Events | RoboBooth',
  ogDescription:
    'Toronto’s first luxury Aerial Booth for weddings, milestone birthdays, and private celebrations. Premium prints, instant sharing, and a fully themed experience.',
  urgency: 'Peak weekends are filling fast',
  heroEyebrow: '5.0 on Google · Weddings & Birthdays',
  headlineLead: 'Toronto’s Luxury',
  headlineAccent: 'Aerial Booth',
  headlineRest: ' for Private Events.',
  subheadline:
    'Bring Toronto’s first luxury Aerial Booth to your wedding or milestone birthday. DSLR-quality photos, premium prints, and an immersive high-angle experience guests can’t stop talking about.',
  primaryCta: 'Secure Your Date',
  microCopy: 'Perfect for Weddings and Milestone Birthdays.',
  heroVideo: '/videos/privateeventaerial-hero.mp4',
  heroPoster: '/images/aerial2.jpg',
  secondaryVideo: '/videos/privateeventaerial2.mp4',
  secondaryPoster: '/images/aerial2.jpg',
  marqueeLabel: 'Delivering unforgettable experiences at top venues',
  marqueeMode: 'venues',
  featuresTitleLead: 'Give Your Guests',
  featuresTitleAccent: 'the VIP Treatment.',
  features: [
    {
      title: 'A Unique Perspective',
      desc: 'Step inside for stunning overhead shots, dynamic videos, and fun GIFs.',
    },
    {
      title: 'Instant Memories',
      desc: 'Premium physical prints to take home, plus instant digital sharing so they can post immediately.',
    },
    {
      title: 'Beautifully Themed',
      desc: 'Filters and print layouts customized to match your color palette and theme. Matching booth walls are available as an add-on.',
    },
  ],
  galleryTitleLead: 'Private Event',
  galleryTitleAccent: 'Image Gallery',
  gallerySubtitle: 'Real Aerial Booth prints from weddings, birthdays, and celebrations across the GTA.',
  processTitleLead: 'You Enjoy the Party.',
  processTitleAccent: 'We Handle the Rest.',
  processSubtitle: 'From theming to teardown, your only job is to celebrate.',
  steps: [
    {
      title: 'Share Your Vision',
      desc: 'Tell us about your event, and we’ll customize the aesthetics to match.',
    },
    {
      title: 'We Show Up',
      desc: 'We arrive early and quietly set up the full experience before your first guest walks in.',
    },
    {
      title: 'You Take the Credit',
      desc: 'Our attendant runs the booth flawlessly while you focus on celebrating.',
    },
  ],
  packagesTitle: 'Private Event Packages',
  packagesSubtitle: 'From an unforgettable Aerial moment to a full celebration takeover.',
  packages: [
    {
      id: 'bronze',
      badge: 'Bronze · The Party Starter',
      title: 'Aerial Booth Only',
      desc: 'The luxury high-angle experience your guests will talk about all night.',
      benefits: [
        'Aerial Booth only',
        'Unlimited digital captures and a dedicated attendant',
      ],
      cta: 'Book Bronze Package',
    },
    {
      id: 'gold',
      badge: '⭐ Most Popular · Gold',
      title: 'Double Feature',
      desc: 'Keep guests entertained with two completely different photo experiences.',
      benefits: [
        'Aerial Booth + choice of 1 additional booth',
        'Robot Photobooth, Vogue Booth, Premium Photobooth, or 360 Booth',
        'Two completely different photo experiences',
      ],
      cta: 'Book Gold Package',
      highlight: true,
      showBoothChoice: true,
      boothChoiceCount: 1,
      photographyAddOn: true,
    },
    {
      id: 'platinum',
      badge: '💎 Platinum · Showstopper',
      title: 'The Showstopper',
      desc: 'The ultimate setup for large-scale weddings and massive celebrations.',
      benefits: [
        'Aerial Booth + choice of 2 additional booths',
        'Robot, Vogue, Premium, or 360',
        'Built for large-scale weddings and massive celebrations',
      ],
      cta: 'Book Platinum Package',
      showBoothChoice: true,
      boothChoiceCount: 2,
      photographyAddOn: true,
    },
  ],
  gallery: [
    { src: '/images/aerial-private/print-1.png', alt: 'Aerial Booth wedding print — Dylan & Manpreet', title: "Dylan & Manpreet's Wedding" },
    { src: '/images/aerial-private/print-2.png', alt: 'Aerial Booth wedding print — Sukhmani & Sahib', title: "Sukhmani & Sahib's Wedding" },
    { src: '/images/aerial-private/print-3.png', alt: 'Aerial Booth wedding print — Sukhmani & Sahib', title: "Sukhmani & Sahib's Wedding" },
    { src: '/images/aerial-private/print-4.png', alt: 'Aerial Booth wedding print — Dylan & Manpreet', title: "Dylan & Manpreet's Wedding" },
    { src: '/images/aerial-private/print-5.png', alt: "Aerial Booth birthday print — Minujan's 21st", title: "Minujan's 21st Birthday" },
    { src: '/images/aerial-private/print-6.png', alt: 'Aerial Booth wedding print — Abdullah & Sara', title: "Abdullah & Sara's Wedding" },
    { src: '/images/aerial-private/print-7.png', alt: 'Aerial Booth private event couple print', title: 'Private Event Couples' },
  ],
  testimonialsTitleLead: '5-Star Google Reviews from',
  testimonialsTitleAccent: 'Weddings & Birthdays',
  testimonials: [
    {
      name: 'Emma D.',
      role: 'Bride · 5.0 Google review',
      text: 'The booth felt so premium and the prints were stunning. Our wedding guests could not stop talking about the overhead shots — it was the highlight of the reception.',
    },
    {
      name: 'Ben S.',
      role: 'Groom · 5.0 Google review',
      text: 'We wanted something our guests had never seen. The Aerial Booth delivered. Setup was quiet, the attendant was wonderful, and everyone left with a print they actually kept.',
    },
    {
      name: 'Danica L.',
      role: 'Birthday Host · 5.0 Google review',
      text: 'It felt luxurious without being fussy. The themed overlays matched our party perfectly and guests were posting from the booth within seconds.',
    },
  ],
  finalHeadlineLead: 'Peak Weekends Are Filling Fast.',
  finalHeadlineAccent: 'Secure the Best Booth in the GTA Today.',
  finalSub: 'Weddings and milestone birthdays book out first. We’ll confirm your date within 15 minutes.',
  finalCta: 'Get a Quote',
  stickyCta: 'Secure Your Date',
  eventType: 'Private Event - Aerial Booth',
  source: 'Aerial Private Page',
  pricingContext: 'aerial-private',
  packageLabels: {
    bronze: 'Bronze Package (Aerial Booth Only — Party Starter)',
    gold: 'Gold Package (Aerial Booth + 1 Additional Booth — Double Feature)',
    platinum: 'Platinum Package (Aerial Booth + 2 Additional Booths — Showstopper)',
  },
  packageBannerSubtitles: {
    bronze: 'Aerial Booth Only · $1,500–$2,000',
    gold: 'Aerial + 1 Additional Booth · from $2,500',
    platinum: 'Aerial + 2 Additional Booths · from $4,000',
  },
}
