import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiHeart, FiMusic } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Robot Photobooth for Concerts & Festivals | Robo Booth Toronto',
  seoDescription: 'Activate your concert or festival crowd with a roaming Robot Photobooth. Real-time social sharing, sponsor branding, QR code delivery, and high-volume captures — Toronto & across Canada.',
  canonicalPath: '/events/concert-festival',
  emoji: '🎵',
  heroTagline: 'CONCERT & FESTIVAL ACTIVATION',
  heroHeadline: <>The Activation That Keeps <span className="text-[#fce4a6]">the Crowd Buzzing</span></>,
  heroSub: 'Thousands of people, one robot, and a content engine that runs all day. Our roaming Robot Photobooth delivers real-time social sharing, sponsor logo visibility, and branded photos guests are posting before the headliner even hits the stage.',
  heroCTALabel: 'Get a Festival Quote',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Festival and concert season books months out — secure your activation now',

  steps: [
    {
      title: 'We Build Your Activation Strategy',
      desc: 'Share your festival layout, expected attendance, sponsor requirements, and content goals. We design a branded capture experience — overlay, QR flow, and social hashtag integration — that turns your crowd into a content machine.',
    },
    {
      title: 'Robot Roams the Crowd',
      desc: 'Our operator navigates the festival grounds, activating crowd clusters, sponsor zones, and high-traffic areas. The robot draws a crowd naturally — creating organic lines of people who want their photo moment.',
    },
    {
      title: 'Instant QR Delivery, Real-Time Sharing',
      desc: 'No prints required — every photo is delivered instantly via QR code. Guests share to Instagram, TikTok, and Twitter seconds after the capture, carrying your branding and sponsor logos into every feed.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'Ideal for smaller concerts, club nights, or boutique festivals where a roaming photobooth creates an experiential moment without the full package.',
  bronzeBenefits: [
    '3-hour roaming robot photobooth with operator',
    'Custom branded overlay with event name, sponsor logo, and hashtag',
    'QR-code digital delivery for every guest — instant social sharing',
    'High-volume capture mode optimized for crowd throughput',
    'Unlimited captures throughout the activation window',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Crowd energy and stage moments captured simultaneously. The complete concert documentation and activation package.',
  goldBenefits: [
    'Everything in Bronze, plus:',
    '4-hour professional event photography coverage',
    'Stage photography, crowd energy shots, and artist moments included',
    'Edited gallery delivered within the week for press and social use',
    'High-resolution files licensed for festival marketing and PR',
    'Dedicated photographer and robot operator — coordinated for maximum coverage',
  ],

  platinumDesc: 'For large-scale festivals with multiple stages or activation zones — two robot stations plus full photography for blanket coverage across your entire event footprint.',
  platinumBenefits: [
    'Everything in Gold, plus:',
    'Second robot photobooth station for simultaneous zone coverage',
    '6-hour extended activation window for all-day festivals',
    'Priority placement in sponsor activation zones for branded impressions',
    'Real-time social wall integration — photos feed directly to your festival screens',
    'Dedicated activation coordinator managing both stations and content flow',
  ],

  whySectionTitle: 'Why Events Choose Us',
  whySectionSub: 'At scale, the robot doesn\'t just entertain — it works as a marketing engine. Here\'s how we drive results for festivals and concerts.',
  whyCards: [
    {
      icon: <FiShare2 className="w-5 h-5" />,
      title: 'Real-Time Social Trending',
      desc: 'Every photo shared carries your festival hashtag and sponsor branding into the guest\'s feed. At high attendance events, this creates a content wave that trends while the event is still live.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'High-Volume Capture Mode',
      desc: 'Optimized for speed and throughput. Our robot captures and delivers photos fast enough to keep up with festival-scale crowds — no bottlenecks, no waiting lines that kill the energy.',
    },
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Sponsor Logo Built Into Every Photo',
      desc: 'Every photo includes your sponsor logos in the branded overlay. Guests share the photo — sponsor gets thousands of impressions from a single activation. It\'s the most efficient sponsor ROI on your entire footprint.',
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Crowd Roaming Mode',
      desc: 'Unlike a stationary booth, our robot navigates the crowd. It finds where the energy is — the mosh pit exit, the food truck queue, the VIP lounge — and activates fans exactly where they\'re primed to engage.',
    },
    {
      icon: <FiMusic className="w-5 h-5" />,
      title: 'Built for Outdoor & Large Venues',
      desc: 'Designed and tested for outdoor environments, festival grounds, arena concourses, and warehouse venues. We operate in noise, heat, and crowd conditions that would stop a traditional photobooth cold.',
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      title: 'Content That Outlasts the Event',
      desc: 'Post-event, your branded photos continue circulating on social media. Guests revisit, re-share, and tag friends — extending your festival\'s reach and building anticipation for next year.',
    },
  ],

  customTitle: 'A Content Engine for Your Festival Brand',
  customSub: 'Every element of the activation is built to maximize reach, sponsor value, and crowd engagement for your specific event.',
  customCards: [
    {
      icon: <FiImage className="w-6 h-6" />,
      title: 'Sponsor Logo Integration',
      desc: 'Multiple sponsor tiers can be incorporated into the print overlay and digital delivery screen. Give sponsors trackable, shareable impressions that far exceed traditional festival signage.',
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      title: 'Social Wall Feed',
      desc: 'With our Platinum package, robot photos feed directly to a real-time social wall displayed on festival screens. Guests see their photo on the big screen and share immediately — compounding reach.',
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: 'Hashtag & QR Campaign Integration',
      desc: 'Every photo delivery screen prompts the guest to use your festival hashtag before downloading. This drives measurable social engagement you can report to sponsors and stakeholders post-event.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Marcus V.',
      role: 'Festival Director, Outdoor Music Festival (4,000 attendees)',
      text: 'We tracked over 2,000 social shares in 6 hours. Every photo had our festival logo and two sponsor logos. The robot became a destination on the grounds — people were actively seeking it out. Our sponsors noticed.',
    },
    {
      name: 'Tanya M.',
      role: 'Brand Activation Manager, Beverage Sponsor',
      text: 'We activated at three festivals this summer and the robot was the only activation that gave us trackable social reach. Every photo shared was a branded impression. The ROI on this versus a standard sponsor tent was not even close.',
    },
    {
      name: 'Kevin A.',
      role: 'Concert Promoter, Mid-Size Venue (800 capacity)',
      text: 'The robot created a line at the show before the opener finished their set. People were going back multiple times. Photos ended up everywhere on Instagram that night — organic reach we couldn\'t have paid for.',
    },
  ],

  faqs: [
    {
      question: 'Can the robot operate in an outdoor festival environment?',
      answer: 'Yes. The robot is designed for outdoor and mixed-environment use. We operate in warm temperatures, on grass and gravel surfaces, and in ambient festival noise. We assess your specific venue setup during the planning call to confirm operational feasibility.',
    },
    {
      question: 'How many photos can the robot capture in a 3-hour festival session?',
      answer: 'In high-volume mode at a festival, we typically capture 150–300+ photos per hour. Our throughput scales with crowd density — we optimize the activation flow to keep lines moving and energy high.',
    },
    {
      question: 'Can sponsor logos be included in every photo?',
      answer: 'Yes — that\'s one of the primary value propositions for festival use. We integrate sponsor logos into the branded overlay on every photo. Multi-tier sponsor logo placement is available for Platinum activations.',
    },
    {
      question: 'Can the photos be displayed on a live social wall at the festival?',
      answer: 'Yes, with our Platinum package. Photos captured by the robot feed to a real-time social wall integrated with your festival screens. It creates a live loop of guest content that drives even more engagement and sharing.',
    },
    {
      question: 'Do you provide printed photos at festivals or just digital delivery?',
      answer: 'At festival scale, digital QR delivery is standard — it\'s faster, generates more sharing, and produces no physical waste. Printed outputs are available for smaller concerts or VIP activation zones where a premium physical keepsake adds value.',
    },
    {
      question: 'Can we track the social reach from the activation post-event?',
      answer: 'Yes. We can integrate a specific hashtag prompt into the QR delivery flow, making every share trackable by hashtag volume. We provide a post-event summary of captures, QR scans, and available social data for your sponsor reporting.',
    },
    {
      question: 'What\'s your minimum lead time for a festival booking?',
      answer: 'We recommend 4–6 weeks minimum for festival activations to allow for branded overlay design, sponsor logo integration, and logistics coordination. For large-scale multi-day festivals, 8+ weeks is ideal.',
    },
  ],

  finalHeadline: <>Make Your Festival or Concert <span className="text-[#fce4a6]">Trend While It&apos;s Live.</span></>,
  finalSub: 'A crowd this size is a content machine waiting to happen. The robot turns every guest into a brand ambassador from the moment they take their photo.',
  quoteCTALabel: 'Get a Festival Quote',
  modalTitle: 'Get a Concert & Festival Quote',
  eventTypeName: 'Concert & Festival',
}

export default function ConcertFestivalPage() {
  return <EventPageLayout {...props} />
}
