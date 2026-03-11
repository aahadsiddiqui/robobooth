import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiTarget, FiTrendingUp } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Conference & Summit Photobooth Toronto GTA | Robo Booth',
  seoDescription: 'Keep conference attendees engaged and generating content with Canada\'s first Robot Photobooth. Branded networking photos shared instantly. Serving Toronto & GTA.',
  canonicalPath: '/events/conference-summit',

  emoji: '🎤',
  heroTagline: 'CONFERENCE & SUMMIT ACTIVATION',
  heroHeadline: <>The Conference Activation <span className="text-[#fce4a6]">Everyone&apos;s Talking About</span></>,
  heroSub: 'Keep attendees engaged between sessions with Canada\'s first Robot Photobooth. Branded networking photos delivered instantly — your conference name on every shot shared across LinkedIn before the day is done.',
  heroCTALabel: 'Check Availability',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Conference dates are filling fast',

  steps: [
    {
      title: 'Share the Agenda',
      desc: 'Send us your conference schedule, sponsor logos, and branding. We design custom overlays, program delegate-specific voice welcomes, and plan the activation around your session flow.',
    },
    {
      title: 'We Handle Setup',
      desc: 'Our team arrives during load-in, coordinates with your venue, and has the robot fully operational before your first delegate badge is scanned. Zero burden on your event staff.',
    },
    {
      title: 'Attendees Generate Content',
      desc: 'Between sessions and during networking breaks, the robot roams your conference floor. Delegates get branded photos delivered to their phones — and post them to LinkedIn before lunch.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'The standalone conference activation — branded, roaming, and fully managed.',
  bronzeBenefits: [
    'Conference and sponsor logos integrated into every photo overlay for maximum brand exposure',
    'Roaming robot fills the dead time between sessions — delegates engage on their own terms',
    'Instant photo delivery to attendee phones via SMS or QR — no app, no friction, no delay',
    'Custom delegate welcome voice lines tailored to your conference theme and keynote speakers',
    'Dedicated on-site operator manages the activation so your event team stays focused',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Capture every conference moment from two unforgettable perspectives.',
  goldBenefits: [
    'Everything in the Bronze Package, fully tailored to your conference agenda',
    'Professional event photographer documents keynotes, panels, networking, and awards moments',
    'Candid shots of delegates engaging with content — authentic imagery for post-event reports',
    'Coordinated content strategy so robot photos and event photography complement each other',
    'Full-resolution gallery delivered within 48 hours — ready for sponsor reports and press releases',
    'Full usage rights included — deploy across your website, LinkedIn, and future conference marketing',
  ],

  platinumDesc: 'The ultimate conference floor — add a 360 Booth or Premium Photobooth to activate multiple zones across your venue.',
  platinumBenefits: [
    'Everything in the Gold Package, scaled for a multi-zone conference environment',
    'Second activation station — 360 Booth or Premium Photobooth — positioned in your networking hub',
    'Multiple branded touchpoints across the venue keep delegates engaged throughout the full day',
    'Sponsor logo placement available across all activation stations for additional sponsor value',
    'Higher content volume gives you more authentic delegate-generated assets for post-event use',
    'White-glove on-site coordination — one contact manages every activation across your entire floor',
  ],

  whySectionTitle: 'Why Conferences Choose Us',
  whySectionSub: 'The activation that keeps delegates engaged and generating content',
  whyCards: [
    {
      icon: <FiShare2 className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'LinkedIn-Ready Content',
      desc: 'Conference delegates are LinkedIn-active professionals. Every branded photo they receive is sized and designed to post immediately — your conference name in front of thousands of industry contacts.',
    },
    {
      icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Networking Catalyst',
      desc: 'The robot breaks the ice. Delegates who might hesitate to introduce themselves find a natural conversation starter when a roaming robot approaches. It energises your networking sessions.',
    },
    {
      icon: <FiTrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Sponsor Logo Integration',
      desc: 'Include all your event sponsors in the photo overlay — every branded photo shared is organic sponsor exposure. Offer it as a premium sponsorship deliverable and add real value to your packages.',
    },
    {
      icon: <FiShield className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'No Venue Requirements',
      desc: 'No power cable runs across your conference floor, no WiFi credential requests, no fixed booth taking up real estate. The robot is completely self-contained and works in any conference environment.',
    },
    {
      icon: <FiZap className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Instant Photo Delivery',
      desc: 'Photos land in delegate phones within seconds of capture. No waiting, no app download, no barriers. The speed of delivery is what makes delegates share immediately rather than intending to later.',
    },
    {
      icon: <FiStar className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Fully Managed On-Site',
      desc: 'Our operator runs the entire activation from start to finish. They handle delegate interactions, content delivery, and any technical needs — your AV and event team has nothing extra to manage.',
    },
  ],

  customTitle: 'Built Around Your Conference',
  customSub: 'Sponsor logos, delegate branding, and custom messaging all included',
  customCards: [
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Conference Branding & Sponsor Overlays',
      desc: 'Every photo features your conference name, edition year, and sponsor logos — arranged exactly as your sponsor agreements specify. A premium deliverable you can promise sponsors at the point of sale.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Custom Delegate Voice Welcome',
      desc: 'Program the robot to welcome delegates by conference name, announce keynote speakers, or deliver sponsor messaging. A surprising, high-energy moment that sets the tone for the entire event.',
    },
    {
      icon: <FiTarget className="w-5 h-5" />,
      title: 'Multi-Day & Multi-Booth Activations',
      desc: 'Running a two-day summit or a large multi-track conference? We scale accordingly — refreshing content between days, adding activation stations for breakout zones, and coordinating across your full venue.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Ryan C.',
      role: 'Conference Director, Industry Association',
      text: 'Our delegates were posting LinkedIn content during the networking break — before we even announced the afternoon sessions. Our conference hashtag trended organically for the first time in the event\'s history. The robot was the single most talked-about element of the day.',
    },
    {
      name: 'Anika S.',
      role: 'Head of Events, Financial Services Firm',
      text: 'We used the photo overlay to feature our two headline sponsors. Both sponsors noted it in their post-event reports as a standout deliverable. It\'s now a premium item in our sponsorship packages — and it actually sells. Our attendees love it too.',
    },
    {
      name: 'Thomas B.',
      role: 'Summit Organiser, Tech Industry',
      text: 'I was worried the robot would feel gimmicky for a professional audience. The opposite happened — senior executives and C-suite attendees were the most engaged. The networking energy it created in the break zones was something we\'ve never achieved before with any other activation.',
    },
  ],

  faqs: [
    {
      question: 'Can the photo overlay include all of our event sponsors?',
      answer: 'Yes. We can include all sponsor logos in the overlay, arranged by tier if needed. Many conference organisers offer "branded photo sponsor" as a premium package item to their sponsors — it\'s a tangible, measurable deliverable that sponsors genuinely value.',
    },
    {
      question: 'Will the robot work for a formal or professional conference environment?',
      answer: 'Absolutely. The robot\'s branding, voice lines, and overall aesthetic are fully customisable to match the tone of your event — whether that\'s a high-energy tech summit or a formal financial services conference. We calibrate the activation to your audience.',
    },
    {
      question: 'How does the robot handle high-density networking sessions with hundreds of delegates?',
      answer: 'The robot is designed for high-traffic environments. Our operator guides it to maximise engagement throughout your networking zones, ensuring it reaches as many delegates as possible. For very large conferences, additional activation stations in the Platinum Package extend coverage across your full venue.',
    },
    {
      question: 'Can we use the activation across a two-day or multi-day summit?',
      answer: 'Yes. Multi-day bookings are available. We can maintain consistent branding across all days, or refresh the overlay and voice messaging between days to reflect different themes, speakers, or sponsors. Contact us for multi-day pricing.',
    },
    {
      question: 'What happens if we need to reschedule due to low registration or venue changes?',
      answer: 'We understand that conference logistics can change. Reach out to us as early as possible if you need to reschedule and we\'ll do our best to accommodate your new date. Our team works with you throughout the planning process to ensure flexibility wherever possible.',
    },
  ],

  finalHeadline: <>Make Your Conference <span className="text-[#fce4a6]">The One They Remember.</span></>,
  finalSub: 'Add a branded, engaging activation your delegates will talk about at next year\'s event too.',
  quoteCTALabel: 'Check Availability & Get a Quote',
  modalTitle: 'Get a Conference Quote',
  eventTypeName: 'Conference & Summit',
}

export default function ConferenceSummitPage() {
  return <EventPageLayout {...props} />
}
