import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiHeart, FiMusic } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Robot Photobooth for Holiday Parties | Robo Booth Toronto',
  seoDescription: 'Make your company holiday party unforgettable with a roaming Robot Photobooth. Festive branded prints, team keepsakes, and instant sharing — serving Toronto & the GTA.',
  canonicalPath: '/events/holiday-party',
  emoji: '🎄',
  heroTagline: 'HOLIDAY PARTY ACTIVATION',
  heroHeadline: <>The Holiday Party Upgrade <span className="text-[#fce4a6]">Everyone Will Talk About</span></>,
  heroSub: 'Most holiday parties have the same catering, the same playlist, the same everything. Our roaming Robot Photobooth is the one element your team will be talking about in January — and sharing all December long.',
  heroCTALabel: 'Get a Holiday Party Quote',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Holiday season dates are almost gone — book yours before they\'re taken',

  steps: [
    {
      title: 'We Match Your Festive Theme',
      desc: 'Share your company colors, holiday theme, and any inside jokes or department shoutouts. We build a custom print overlay — branded, festive, and uniquely yours.',
    },
    {
      title: 'Robot Works the Room',
      desc: 'Our operator roams through dinner, dancing, and cocktail hour. The robot finds every department cluster, every manager group, every table of colleagues — no one gets left out.',
    },
    {
      title: 'Team Keepsakes, Instantly',
      desc: 'Prints roll out in seconds. Your team walks away with branded holiday prints they\'ll pin to their desk or share in the group chat before the party ends.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'Ideal for smaller office parties, restaurant buyouts, or companies wanting a premium photobooth experience without the full photography bundle.',
  bronzeBenefits: [
    '2-hour roaming robot photobooth with operator',
    'Custom holiday-branded print overlay with company logo',
    'Instant physical prints — every team member keeps one',
    'QR-code digital delivery for instant sharing',
    'Unlimited captures throughout the session',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'The complete holiday party package — candid moments, group shots, and the robot all covered by one seamless team.',
  goldBenefits: [
    'Everything in Bronze, plus:',
    '3-hour professional event photography coverage',
    'Candid team photos and group department shots included',
    'Edited gallery delivered within the week for company newsletter use',
    'High-resolution files licensed for internal comms and LinkedIn',
    'Coordinated robot operator and photographer team',
  ],

  platinumDesc: 'For large company parties over 150 people — two photobooth activations plus full photography so no corner of the venue is missed.',
  platinumBenefits: [
    'Everything in Gold, plus:',
    'Second photobooth station to handle simultaneous demand',
    '4-hour extended coverage window for longer parties',
    'Priority visits for executive and leadership tables',
    'Branded backdrop available for formal team portraits',
    'Dedicated event coordinator for seamless multi-station management',
  ],

  whySectionTitle: 'Why Companies Choose Us',
  whySectionSub: 'We\'ve activated at holiday parties for Fortune 500 teams, startup studios, and everything in between. Here\'s what makes the difference.',
  whyCards: [
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Bridges Every Department',
      desc: 'The robot is the one thing accounting, sales, and engineering will all crowd around. It breaks the ice and creates cross-team moments that don\'t happen any other way.',
    },
    {
      icon: <FiHeart className="w-5 h-5" />,
      title: 'Branded Team Keepsakes',
      desc: 'Every print has your company logo and the year. These go on desks, fridges, and bulletin boards. It\'s passive brand reinforcement that lasts well into the new year.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Works in Any Venue',
      desc: 'Restaurant private room, hotel ballroom, rooftop terrace, or office space — our robot navigates any venue layout. We\'ve done them all.',
    },
    {
      icon: <FiShare2 className="w-5 h-5" />,
      title: 'Instant Team Sharing',
      desc: 'QR codes mean photos hit the company group chat before the dessert arrives. The engagement spills onto LinkedIn, creating authentic employer brand content at zero cost.',
    },
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Fully Managed — Zero Effort',
      desc: 'You planned the party. We run the activation. Our operator handles everything from setup to teardown so your events team can actually enjoy the night.',
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      title: 'Corporate-Approved & Insured',
      desc: 'Full liability insurance, professional operators, and a track record with recognized brands. Easy to approve through any corporate procurement process.',
    },
  ],

  customTitle: 'Make It Unmistakably Yours',
  customSub: 'Every element is customized to reflect your company culture, holiday theme, and brand identity.',
  customCards: [
    {
      icon: <FiImage className="w-6 h-6" />,
      title: 'Holiday-Branded Prints',
      desc: 'Your logo, team name, year, and a festive design motif on every print. We offer seasonal templates — classic, winter wonderland, cozy, or bold corporate — or we build from scratch to your brief.',
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: 'Custom Voice Messages',
      desc: 'Program the robot to deliver a personalized holiday message from the CEO or a funny team inside joke. It sets the tone the second it rolls up to a table.',
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: 'Department Shoutouts',
      desc: 'We can rotate branded overlays throughout the night — different departments get their own print frame. It\'s a small detail that makes every team feel seen.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Michelle T.',
      role: 'HR Director, Tech Company (320 employees)',
      text: 'We spent months planning this party and the robot was the thing everyone asked about afterward. It broke down every departmental silo in the room. We\'re booking it again next year without question.',
    },
    {
      name: 'James R.',
      role: 'Office Manager, Financial Services',
      text: 'Our team is pretty reserved at these things but within 10 minutes of the robot showing up, everyone was laughing and crowding around it. The prints are still on people\'s desks three months later.',
    },
    {
      name: 'Aisha B.',
      role: 'Events Coordinator, Marketing Agency',
      text: 'The Robo Booth team was completely self-sufficient. I didn\'t have to manage them at all — they knew the room, worked the crowd, and the photos were incredible. Makes my job so much easier.',
    },
  ],

  faqs: [
    {
      question: 'What size holiday party does this work for?',
      answer: 'We\'ve done parties from 20 people to 500+. For groups under 100, a single robot and 2-hour session is usually perfect. For larger parties or longer events, we recommend the Gold or Platinum package with extended hours and a second station.',
    },
    {
      question: 'Can you operate in a restaurant private dining room?',
      answer: 'Absolutely. Restaurant buyouts and private dining rooms are some of our most common venues. The robot is compact and maneuverable — it navigates through tables without disturbing service or other diners.',
    },
    {
      question: 'How far in advance should we book for December?',
      answer: 'December fills up faster than any other month. We strongly recommend booking by October. November bookings are possible but risky — we regularly turn away December requests after mid-November.',
    },
    {
      question: 'Can we include a message from our CEO on the prints?',
      answer: 'Yes — we can add a short thank-you message, a holiday greeting, or even a year-in-review tagline to the print overlay. Just share the copy and we\'ll integrate it into the design.',
    },
    {
      question: 'Will the robot work in a dim/ambient-lit venue?',
      answer: 'Yes. Our robot has its own lighting system built in, so ambient or low-light venues are not a problem. The photos come out crisp and well-lit regardless of the room\'s lighting setup.',
    },
    {
      question: 'Can the photos be used in company communications?',
      answer: 'Yes — with the Gold and Platinum packages, all images are licensed for internal use including newsletters, intranets, LinkedIn posts, and company social media.',
    },
  ],

  finalHeadline: <>Give Your Team a Holiday Party <span className="text-[#fce4a6]">Worth Celebrating.</span></>,
  finalSub: 'The robot photobooth is the one activation your team will actually remember. Let\'s lock in your date before December fills up.',
  quoteCTALabel: 'Get a Holiday Party Quote',
  modalTitle: 'Get a Holiday Party Quote',
  eventTypeName: 'Holiday Party',
}

export default function HolidayPartyPage() {
  return <EventPageLayout {...props} />
}
