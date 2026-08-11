import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiHeart, FiMusic } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Robot Photobooth for Gala Dinners & Award Ceremonies | Robo Booth',
  seoDescription: 'Elevate your gala dinner or award ceremony with a roaming Robot Photobooth. Branded prints, table visits, and instant sharing — perfect for black-tie events across Toronto & the GTA.',
  canonicalPath: '/events/gala-dinner',
  emoji: '🏆',
  heroTagline: 'GALA & AWARD CEREMONY ACTIVATION',
  heroHeadline: <>Add a Touch of Magic to <span className="text-[#fce4a6]">Your Gala Night</span></>,
  heroSub: 'Our roaming Robot Photobooth visits every table, captures elegantly branded portraits, and prints a keepsake your guests carry home. The most talked-about addition to black-tie events in Toronto.',
  heroCTALabel: 'Get a Gala Quote',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Gala season books fast — limited weekend dates remaining',

  steps: [
    {
      title: 'We Customize for Your Night',
      desc: 'Share your gala theme, logo, and award categories. We design a branded print overlay that matches your formal aesthetic — think gold foil, elegant typography, and your event crest.',
    },
    {
      title: 'Robot Arrives & Roams',
      desc: 'Our operator arrives 45 minutes before doors open, sets up silently, and begins table visits during cocktail hour and dinner service — zero disruption to speeches or presentations.',
    },
    {
      title: 'Guests Leave with Keepsakes',
      desc: 'Every photo prints in seconds. Guests scan a QR code for instant digital delivery and walk away with a physical branded print — a tangible memory from the night of the award.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'Perfect for smaller galas, boardroom award nights, or events where a roaming photobooth experience is the priority.',
  bronzeBenefits: [
    '2-hour roaming robot photobooth with operator',
    'Custom branded print overlay with your gala logo and date',
    'Instant physical prints — guests keep them',
    'QR-code digital delivery for every photo',
    'Unlimited captures during the booking window',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'The complete gala package. Your award moments are captured by a professional photographer while the robot works the room.',
  goldBenefits: [
    'Everything in Bronze, plus:',
    '3-hour professional event photography coverage',
    'Award presentation and stage photography included',
    'Same-week edited gallery delivery via private link',
    'High-resolution images licensed for PR and press use',
    'Dedicated photographer + robot operator team',
  ],

  platinumDesc: 'The ultimate gala experience — two photobooth activations plus full photography, ideal for large award galas with 200+ guests.',
  platinumBenefits: [
    'Everything in Gold, plus:',
    'Second photobooth station (stationary or roaming) for overflow coverage',
    'Priority table visit scheduling for VIP and sponsor tables',
    '4-hour extended coverage window',
    'Branded backdrop available for formal portraits',
    'Dedicated on-site coordinator for seamless event flow',
  ],

  whySectionTitle: 'Why Galas Choose Us',
  whySectionSub: 'We understand that gala nights demand elegance, precision, and zero disruption. Here\'s how we deliver.',
  whyCards: [
    {
      icon: <FiStar className="w-5 h-5" />,
      title: 'Black-Tie Ready',
      desc: 'Our robot\'s aesthetic and our team\'s attire are calibrated for formal environments. We blend into your event, not on top of it.',
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Every Table Gets a Visit',
      desc: 'No one is left out. Our operator navigates the room strategically, ensuring every table — from board members to junior staff — gets their moment.',
    },
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Elegant Branded Prints',
      desc: 'Every print features your gala logo, event name, and year. Guests take home a keepsake that reinforces your brand long after the evening ends.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Prints in Under 30 Seconds',
      desc: 'No waiting, no queue-management headaches. Prints are in guests\' hands before they finish their dessert course.',
    },
    {
      icon: <FiShare2 className="w-5 h-5" />,
      title: 'Instant Digital Sharing',
      desc: 'Every photo is available via QR code immediately. Guests share to LinkedIn, Instagram, and team chats the same night — organic reach for your brand.',
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      title: 'Fully Managed & Insured',
      desc: 'Our team handles every detail from setup to teardown. We carry full liability insurance and operate quietly within your venue\'s guidelines.',
    },
  ],

  customTitle: 'Built for Your Gala\'s Brand',
  customSub: 'Every element of the experience is customized to your evening\'s theme and corporate identity.',
  customCards: [
    {
      icon: <FiImage className="w-6 h-6" />,
      title: 'Branded Print Overlays',
      desc: 'Your logo, gala name, award category, and year are beautifully integrated into every print. Choose from gold, silver, or bespoke color palettes that match your event design.',
    },
    {
      icon: <FiStar className="w-6 h-6" />,
      title: 'Award Winner Spotlights',
      desc: 'We can configure special frames for award winners — a unique print that commemorates the exact category they won, making each winner\'s keepsake genuinely personal.',
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      title: 'Sponsor Integration',
      desc: 'Include sponsor logos on print overlays and digital files. Give your sponsors photo activation visibility that lasts beyond the event night itself.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Sandra M.',
      role: 'VP of Events, Financial Services Firm',
      text: 'We had 280 guests at our annual awards gala and the robot was the highlight of the night. Every table got a visit, every print had our logo, and our CEO kept asking how we pulled it off. Absolutely seamless.',
    },
    {
      name: 'David L.',
      role: 'Event Director, Toronto Charity Gala',
      text: 'Our donors expect a premium experience. Robo Booth delivered exactly that — elegant, fast, and the branded prints became the most-shared items of the night on LinkedIn.',
    },
    {
      name: 'Priya K.',
      role: 'Corporate Events Manager',
      text: 'The Platinum package was worth every penny. The robot worked the cocktail hour while the photographer captured the award stage — we got everything covered without any coordination headaches.',
    },
  ],

  faqs: [
    {
      question: 'Will the robot disrupt speeches or award presentations?',
      answer: 'Never. Our operator is trained to pause table visits during speeches, presentations, and award announcements. We work around your program schedule — just share your run-of-show and we coordinate accordingly.',
    },
    {
      question: 'Can we customize the print design to match our gala\'s formal theme?',
      answer: 'Absolutely. We design a custom print overlay for every event — gold foil aesthetics, your corporate crest, award category text, whatever your brand guide requires. We share a proof before the event for your approval.',
    },
    {
      question: 'How does the robot handle large round tables?',
      answer: 'The robot is designed for social environments. Our operator positions it at each table and encourages the full table to gather for group photos. Most tables end up with 8–10 people in the frame — it becomes a shared moment.',
    },
    {
      question: 'Can award winners get a special print?',
      answer: 'Yes. We can set up a dedicated winner\'s frame so each award recipient gets a uniquely branded print noting their award category and the evening\'s date. It becomes a trophy in its own right.',
    },
    {
      question: 'What\'s your minimum booking window for a gala?',
      answer: 'We recommend booking at least 3–4 weeks in advance for galas so we have time to design and approve your print overlay. For large galas over 300 guests, 6 weeks is ideal. That said, contact us for last-minute availability — we occasionally have openings.',
    },
    {
      question: 'Do you work with hotel ballrooms and formal venues?',
      answer: 'Yes — Hilton, Marriott, Ritz, Four Seasons, and virtually every major Toronto-area banquet and hotel venue. We coordinate load-in with venue staff and operate within all noise and equipment policies.',
    },
  ],

  finalHeadline: <>Give Your Guests a Gala Night <span className="text-[#fce4a6]">They&apos;ll Never Forget.</span></>,
  finalSub: 'A robot photobooth at your gala isn\'t a novelty — it\'s the moment your guests talk about on the way home. Let\'s make it happen.',
  quoteCTALabel: 'Get a Gala Quote',
  modalTitle: 'Get a Gala Dinner Quote',
  eventTypeName: 'Gala Dinner & Award Ceremony',
}

export default function GalaDinnerPage() {
  return <EventPageLayout {...props} />
}
