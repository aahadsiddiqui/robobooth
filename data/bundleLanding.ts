import type { PricingContext } from '@/lib/quoteBudgets'

export type BundleMedia = { src: string; alt: string }

export type BundleCombo = {
  id: string
  label: string
  detail: string
  packageId: 'bronze' | 'gold' | 'platinum'
}

export type BundleStory = {
  eyebrow: string
  title: string
  accent: string
  body: string
  points: string[]
  cta: string
  combo: BundleCombo
  media: BundleMedia[]
}

export type BundleTier = {
  id: 'bronze' | 'gold' | 'platinum'
  count: string
  badge: string
  title: string
  outcome: string
  highlight?: boolean
  combos: BundleCombo[]
}

export type BundleLandingCopy = {
  path: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  ogTitle: string
  urgency: string
  eyebrow: string
  headlineLead: string
  headlineAccent: string
  subheadline: string
  primaryCta: string
  microCopy: string
  heroVideo?: string
  heroPoster: string
  marqueeLabel: string
  stories: BundleStory[]
  proof: { quote: string; name: string; role: string }[]
  packagesEyebrow: string
  packagesTitle: string
  packagesSubtitle: string
  tiers: BundleTier[]
  faqs: { question: string; answer: string }[]
  finalLead: string
  finalAccent: string
  finalSub: string
  stickyCta: string
  eventType: string
  source: string
  pricingContext: PricingContext
}

const privateTwoSame: BundleCombo = {
  id: 'private-two-robots',
  label: '2 Robot Photobooths',
  detail: 'The same product, twice. Both sides of the party stay covered.',
  packageId: 'bronze',
}

const privateTwoDifferent: BundleCombo = {
  id: 'private-robot-aerial',
  label: 'Robot Photobooth + Aerial Booth',
  detail: 'Two different products. The robot comes to the table. Aerial shoots the group from above.',
  packageId: 'bronze',
}

const privateThree: BundleCombo = {
  id: 'private-robot-aerial-360',
  label: 'Robot + Aerial + 360',
  detail: 'Three different products. Roaming photos, overhead shots, and a clip they post.',
  packageId: 'gold',
}

const privateThreeAlt: BundleCombo = {
  id: 'private-robot-vogue-360',
  label: 'Robot + Vogue + 360',
  detail: 'Three different products. Editorial portraits instead of overhead shots.',
  packageId: 'gold',
}

const privateFour: BundleCombo = {
  id: 'private-four',
  label: 'Robot + Aerial + 360 + Vogue',
  detail: 'Four different products. A station for every kind of guest.',
  packageId: 'platinum',
}

const privateFourPlus: BundleCombo = {
  id: 'private-four-plus',
  label: 'Four booths + Premium or Video Guestbook',
  detail: 'Add a Premium Photobooth or the Robot Video Guestbook for the extra room or the messages.',
  packageId: 'platinum',
}

const corporateTwoSame: BundleCombo = {
  id: 'corp-two-robots',
  label: '2 Robot Photobooths',
  detail: 'The same product, twice. Double the throughput on a busy floor.',
  packageId: 'bronze',
}

const corporateTwoDifferent: BundleCombo = {
  id: 'corp-robot-360',
  label: 'Robot Photobooth + 360 Booth',
  detail: 'Two different products. Live engagement plus content people share.',
  packageId: 'bronze',
}

const corporateThree: BundleCombo = {
  id: 'corp-robot-aerial-360',
  label: 'Robot + Aerial + 360',
  detail: 'Three different products. Roaming photos, overhead shots, and social video.',
  packageId: 'gold',
}

const corporateThreeAlt: BundleCombo = {
  id: 'corp-robot-vogue-360',
  label: 'Robot + Vogue + 360',
  detail: 'Three different products. Editorial portraits for a sharper brand look.',
  packageId: 'gold',
}

const corporateFour: BundleCombo = {
  id: 'corp-four',
  label: 'Robot + Aerial + 360 + Vogue',
  detail: 'Four different products. A multi-touchpoint activation, one team.',
  packageId: 'platinum',
}

const corporateFourPlus: BundleCombo = {
  id: 'corp-four-plus',
  label: 'Four booths + Premium Photobooth',
  detail: 'Park a Premium Photobooth in a second room, lobby, or overflow space.',
  packageId: 'platinum',
}

export const privateBundleCopy: BundleLandingCopy = {
  path: '/private-bundle',
  seoTitle: 'Private Event Photo Booth Bundles Toronto | Weddings & Birthdays | RoboBooth',
  seoDescription:
    'Bundle 2, 3, or 4+ photo booths for a Toronto wedding or milestone party. Pair two robots, or mix the Robot Photobooth, Aerial Booth, 360 Booth, and Vogue Booth. We run every station.',
  seoKeywords:
    'wedding photo booth bundle Toronto, private event photo booth package, robot and aerial booth wedding, 360 booth wedding GTA, multi booth party package',
  ogTitle: 'Private Event Booth Bundles | 2, 3, or 4+ Stations | RoboBooth',
  urgency: 'Peak wedding weekends are filling — lock the mix before the date goes',
  eyebrow: '5.0 on Google · Weddings, birthdays, and milestones',
  headlineLead: 'Give the party more than one way',
  headlineAccent: 'to be in the photo.',
  subheadline:
    'Some guests want the robot to come to them. Others want the overhead shot, the slow-motion clip, or the magazine portrait. You choose the mix. We run every station.',
  primaryCta: 'Check Your Date',
  microCopy: 'We reply in under 15 minutes. No payment to check the date.',
  heroVideo: '/videos/private-bundle.mp4',
  heroPoster: '/images/robot-photobooth.jpg',
  marqueeLabel: 'Booked for celebrations across Toronto and the GTA',
  stories: [
    {
      eyebrow: 'Bronze · 2 booths · same product',
      title: 'Two of the same product',
      accent: 'means nobody waits.',
      body: 'Two Robot Photobooths split a wedding or a full birthday. One works the head table. One works the dance floor. Guests get the booth they came for without a line that stalls the night.',
      points: [
        'Same experience, double the capacity',
        'Both sides of the venue covered at the same time',
        'One crew coordinates both robots',
      ],
      cta: 'Book 2 Robot Photobooths',
      combo: privateTwoSame,
      media: [
        { src: '/images/robot-photobooth.jpg', alt: 'Two Robot Photobooths side by side at an event' },
      ],
    },
    {
      eyebrow: 'Bronze · 2 booths · different products',
      title: 'Or two different products',
      accent: 'for two kinds of memories.',
      body: 'A Robot Photobooth keeps the room moving and comes to the table. An Aerial Booth steps guests inside for an overhead shot of the group, the table, and the room. Both can print. The difference is where the camera is.',
      points: [
        'Robot for the party, Aerial for the view from above',
        'The overhead frame shows the people and the setting together',
        'Guests pick the moment they actually want',
      ],
      cta: 'Book Robot + Aerial',
      combo: privateTwoDifferent,
      media: [
        { src: '/images/robot-photobooth.jpg', alt: 'Robot Photobooth with guests' },
        { src: '/images/aerial2.jpg', alt: 'Aerial Booth enclosure' },
      ],
    },
    {
      eyebrow: 'Gold · 3 booths · three different products',
      title: 'Three different products',
      accent: 'give the night a rhythm.',
      body: 'The robot finds people. The Aerial Booth captures the group from above. The 360 Booth makes the slow-motion clip they send before dessert. Three stations, three jobs, no single line for the whole guest list.',
      points: [
        'Roaming photos, overhead shots, and shareable video',
        'The mix most weddings and big birthdays book',
        'Swap Aerial for Vogue if you want magazine portraits',
      ],
      cta: 'Book the 3-booth mix',
      combo: privateThree,
      media: [
        { src: '/images/robot-photobooth.jpg', alt: 'Robot Photobooth' },
        { src: '/images/aerial2.jpg', alt: 'Aerial Booth' },
        { src: '/images/360-booth.jpg', alt: '360 Booth platform' },
      ],
    },
    {
      eyebrow: 'Platinum · 4 booths and up',
      title: 'Four different products',
      accent: 'and the room is the experience.',
      body: 'Robot, Aerial, 360, and Vogue. Four stations, four reasons to move through the party. Add a Premium Photobooth for a second room, or the Robot Video Guestbook when guests should leave a message, not just a photo.',
      points: [
        'Large weddings stay covered from cocktail hour through the dance',
        'Every guest finds the station that fits them',
        'One team runs setup, hosting, and teardown',
      ],
      cta: 'Book the 4-booth takeover',
      combo: privateFour,
      media: [
        { src: '/images/robot-photobooth.jpg', alt: 'Robot Photobooth' },
        { src: '/images/aerial2.jpg', alt: 'Aerial Booth' },
        { src: '/images/360-booth.jpg', alt: '360 Booth' },
        { src: '/images/vogue-booth.jpg', alt: 'Branded Vogue Booth exterior' },
      ],
    },
  ],
  proof: [
    {
      quote: 'The video messages were the most emotional gift we received. Guests recorded at their tables — the room is in the background of every clip.',
      name: 'Priya S.',
      role: 'Wedding host, Toronto',
    },
    {
      quote: 'The booth felt so premium and the prints were stunning. Our wedding guests could not stop talking about it.',
      name: 'Emma D.',
      role: 'Bride · Google review',
    },
  ],
  packagesEyebrow: 'Choose the coverage',
  packagesTitle: 'Pick 2, 3, or 4+ booths.',
  packagesSubtitle: 'Every button books that exact mix. We confirm the date, then lock the stations.',
  tiers: [
    {
      id: 'bronze',
      count: '2 booths',
      badge: 'Bronze',
      title: 'Cover the room',
      outcome: 'Two of the same when lines are the problem. Two different when you want two kinds of photos.',
      combos: [privateTwoSame, privateTwoDifferent],
    },
    {
      id: 'gold',
      count: '3 booths',
      badge: 'Most booked · Gold',
      title: 'Three experiences',
      outcome: 'Three different products so roaming photos, overhead shots, and video happen at once.',
      highlight: true,
      combos: [privateThree, privateThreeAlt],
    },
    {
      id: 'platinum',
      count: '4 booths +',
      badge: 'Platinum',
      title: 'The full party',
      outcome: 'Four different products across the venue, with room to add one more station.',
      combos: [privateFour, privateFourPlus],
    },
  ],
  faqs: [
    {
      question: 'Can Bronze be two of the same booth, or does it have to be two different ones?',
      answer: 'Either. Two Robot Photobooths are the right call when the guest list is large and you want the same experience everywhere. Robot plus Aerial is the right call when you want a roaming booth and overhead shots of the group. Both are Bronze.',
    },
    {
      question: 'Do we have to use the combinations listed?',
      answer: 'Those mixes are the ones that work hardest. If you want Premium instead of Vogue, or the Robot Video Guestbook in the fourth spot, say so in the form and we will price that set.',
    },
    {
      question: 'How much space and power do four booths need?',
      answer: 'The robots roam and run on battery. Aerial, 360, Vogue, and Premium each need a footprint and a standard outlet. We map the floor with you before the event so stations do not collide with dinner, the dance floor, or a speech.',
    },
    {
      question: 'Who runs the booths during the party?',
      answer: 'Our attendants do. Setup, guest flow, and teardown stay with us. You host. We keep every station moving.',
    },
  ],
  finalLead: 'Tell us the date.',
  finalAccent: 'We will hold the mix.',
  finalSub: 'Weddings, birthdays, and milestone parties. Pick a combination above or send the date and we will recommend 2, 3, or 4 booths.',
  stickyCta: 'Reserve Your Mix',
  eventType: 'Private Event Bundle',
  source: 'Private Bundle Page',
  pricingContext: 'private-bundle',
}

export const corporateBundleCopy: BundleLandingCopy = {
  path: '/corporate-bundle',
  seoTitle: 'Corporate Photo Booth Bundles Toronto | Multi-Booth Brand Activations | RoboBooth',
  seoDescription:
    'Corporate booth bundles for Toronto galas, summits, and brand activations. Book 2, 3, or 4+ stations — two robots for throughput, or Robot, Aerial, 360, and Vogue together. Fully staffed.',
  seoKeywords:
    'corporate photo booth package Toronto, multi booth brand activation, robot photo booth corporate event, 360 booth trade show, aerial booth gala Toronto',
  ogTitle: 'Corporate Booth Bundles | 2, 3, or 4+ Activations | RoboBooth',
  urgency: 'Summit and gala dates book out — confirm the floor plan early',
  eyebrow: '5.0 on Google · Galas, summits, and brand activations',
  headlineLead: 'Put more than one activation',
  headlineAccent: 'on the floor.',
  subheadline:
    'Bronze is 2 booths. Gold is 3. Platinum is 4 or more. Double the Robot Photobooth when traffic is the problem, or mix Aerial, 360, and Vogue when the brand needs more than one kind of content.',
  primaryCta: 'Check Availability',
  microCopy: 'A coordinator replies in under 15 minutes. No payment to check the date.',
  heroPoster: '/images/robot-photobooth.jpg',
  marqueeLabel: 'Trusted by teams booking events across the GTA',
  stories: [
    {
      eyebrow: 'Bronze · 2 booths · same product',
      title: 'Two of the same product',
      accent: 'clears a busy floor.',
      body: 'Two Robot Photobooths cover a summit, gala, or activation where one robot creates a line. Same branded experience, twice the impressions, both ends of the room working at once.',
      points: [
        'Double the guest throughput',
        'Consistent overlays on every photo',
        'One crew, two roaming stations',
      ],
      cta: 'Book 2 Robot Photobooths',
      combo: corporateTwoSame,
      media: [
        { src: '/images/robot-photobooth.jpg', alt: 'Two Robot Photobooths ready for a corporate floor' },
      ],
    },
    {
      eyebrow: 'Bronze · 2 booths · different products',
      title: 'Or two different products',
      accent: 'for engagement and content.',
      body: 'The Robot Photobooth pulls people in on the floor. The 360 Booth hands them a slow-motion clip they post with your brand still on it. Two products, two outcomes: dwell time and distribution.',
      points: [
        'Robot for live traffic, 360 for social content',
        'Branded overlays on photos and video',
        'Guests leave with something they actually share',
      ],
      cta: 'Book Robot + 360',
      combo: corporateTwoDifferent,
      media: [
        { src: '/images/robot-photobooth.jpg', alt: 'Robot Photobooth' },
        { src: '/images/360-booth.jpg', alt: '360 Booth with red carpet and platform' },
      ],
    },
    {
      eyebrow: 'Gold · 3 booths · three different products',
      title: 'Three different products',
      accent: 'cover three jobs at once.',
      body: 'Robot for the crowd. Aerial for the overhead shot of the group and the room. 360 for the video that travels after the event. Three stations means the activation does not depend on a single line.',
      points: [
        'Overhead shots, roaming photos, and shareable video',
        'Built for galas and mid-size conferences',
        'Swap Aerial for Vogue when you want an editorial set',
      ],
      cta: 'Book the 3-booth activation',
      combo: corporateThree,
      media: [
        { src: '/images/robot-photobooth.jpg', alt: 'Robot Photobooth' },
        { src: '/images/aerial-corporate-poster.png', alt: 'Aerial Booth at a corporate event' },
        { src: '/images/360-booth.jpg', alt: '360 Booth' },
      ],
    },
    {
      eyebrow: 'Platinum · 4 booths and up',
      title: 'Four different products',
      accent: 'turn the venue into the activation.',
      body: 'Robot, Aerial, 360, and Vogue give a large program four branded touchpoints. Add a Premium Photobooth in a breakout room, lobby, or sponsor lounge when one floor is not the whole event.',
      points: [
        'Multiple impressions without stacking guests on one booth',
        'Editorial, overhead, roaming, and video content from one night',
        'White-glove crew on every station',
      ],
      cta: 'Book the 4-booth takeover',
      combo: corporateFour,
      media: [
        { src: '/images/robot-photobooth.jpg', alt: 'Robot Photobooth' },
        { src: '/images/aerial2.jpg', alt: 'Aerial Booth' },
        { src: '/images/360-booth.jpg', alt: '360 Booth' },
        { src: '/images/vogue-booth.jpg', alt: 'Branded Vogue Booth exterior' },
      ],
    },
  ],
  proof: [
    {
      quote: 'The photo booths were very popular among TechCon attendees. You and your team were accommodating, patient and friendly from beginning to end.',
      name: 'Rosanna',
      role: 'Project manager, TD Canada Trust',
    },
    {
      quote: 'We’ve done a lot of activations. Guests loved it, the setup was seamless, and the branded content was on point.',
      name: 'Priya S.',
      role: 'Corporate events manager',
    },
  ],
  packagesEyebrow: 'Choose the footprint',
  packagesTitle: 'Pick 2, 3, or 4+ booths.',
  packagesSubtitle: 'Book the mix that matches the floor. We confirm availability and send the plan.',
  tiers: [
    {
      id: 'bronze',
      count: '2 booths',
      badge: 'Bronze',
      title: 'Two stations',
      outcome: 'Two of the same when volume is the problem. Two different when you need engagement and content.',
      combos: [corporateTwoSame, corporateTwoDifferent],
    },
    {
      id: 'gold',
      count: '3 booths',
      badge: 'Most booked · Gold',
      title: 'Three touchpoints',
      outcome: 'Three different products so the floor, the overhead shot, and the video all run together.',
      highlight: true,
      combos: [corporateThree, corporateThreeAlt],
    },
    {
      id: 'platinum',
      count: '4 booths +',
      badge: 'Platinum',
      title: 'Full-floor takeover',
      outcome: 'Four different products, with a Premium Photobooth ready for a second space.',
      combos: [corporateFour, corporateFourPlus],
    },
  ],
  faqs: [
    {
      question: 'Should we book two robots or two different booths?',
      answer: 'Two robots when the goal is volume and one consistent branded photo. Robot plus 360 when you also need video people will post. Both sit in Bronze.',
    },
    {
      question: 'Can the overlays and prints carry our brand?',
      answer: 'Yes. Logos, colors, and campaign lines go on digital overlays and prints. Tell us the brand rules when you book and we build them before setup.',
    },
    {
      question: 'Can you cover a main room and a second space?',
      answer: 'That is the Platinum add-on. Four stations on the main floor, plus a Premium Photobooth in a lobby, breakout, or sponsor area.',
    },
    {
      question: 'What do we need to provide?',
      answer: 'A floor plan, load-in time, and standard power for the enclosed booths. Robots run on battery. Our team handles delivery, hosting, and teardown.',
    },
  ],
  finalLead: 'Send the date and the room.',
  finalAccent: 'We will match the mix.',
  finalSub: 'Galas, summits, and brand activations. Pick a combination above or tell us the headcount and we will recommend 2, 3, or 4 booths.',
  stickyCta: 'Check Availability',
  eventType: 'Corporate Event Bundle',
  source: 'Corporate Bundle Page',
  pricingContext: 'aerial-corporate',
}
