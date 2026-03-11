import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiHeart, FiMusic } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Robot Photobooth for Bar & Bat Mitzvahs | Robo Booth Toronto',
  seoDescription: 'Make your Bar or Bat Mitzvah reception unforgettable with a roaming Robot Photobooth. Honoree name overlays, custom voice messages, and instant prints for every guest — Toronto & GTA.',
  canonicalPath: '/events/bar-bat-mitzvah',
  emoji: '✡️',
  heroTagline: 'BAR & BAT MITZVAH ACTIVATION',
  heroHeadline: <>The Bar/Bat Mitzvah Moment <span className="text-[#fce4a6]">Everyone Will Remember</span></>,
  heroSub: 'The kids will swarm it. The grandparents will love it. And the honoree will never forget the night a robot roamed their reception saying their name to every single table. This is the Bar/Bat Mitzvah activation your guests talk about for years.',
  heroCTALabel: 'Get a Mitzvah Quote',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Bar/Bat Mitzvah dates are booking months ahead — check availability now',

  steps: [
    {
      title: 'We Celebrate the Honoree',
      desc: 'Share the honoree\'s name, date, and any theme details — sports, music, art, travel. We build a custom print overlay and program a personal voice message that makes the honoree feel truly celebrated.',
    },
    {
      title: 'Robot Works Every Table',
      desc: 'From the kids\' table to the grandparents\' table to the family friends from out of town, our operator navigates every corner. Every guest, every age group, every table gets their moment.',
    },
    {
      title: 'Prints for Everyone, Instantly',
      desc: 'Physical prints with the honoree\'s name and date are in guests\' hands within seconds. QR code delivery means the photo is in the family group chat before dessert.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'Perfect for Mitzvah receptions where the photobooth activation is the standout entertainment element of the evening.',
  bronzeBenefits: [
    '2-hour roaming robot photobooth with operator',
    'Custom overlay with honoree\'s name, date, and theme details',
    'Instant physical prints — every guest takes one home',
    'QR-code digital delivery for family sharing',
    'Unlimited captures throughout the session',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Every table visit, every hora moment, and every heartfelt speech documented alongside the robot\'s roaming magic.',
  goldBenefits: [
    'Everything in Bronze, plus:',
    '3-hour professional event photography coverage',
    'Candid portraits, dance floor moments, and family group photos',
    'Edited gallery delivered within the week for the family album',
    'High-resolution files for framing, albums, and social sharing',
    'Dedicated photographer and robot operator working as a coordinated team',
  ],

  platinumDesc: 'For larger Mitzvah receptions with multiple spaces — two photobooth activations plus full photography so every guest in every room is covered.',
  platinumBenefits: [
    'Everything in Gold, plus:',
    'Second photobooth station for kids\' room or overflow coverage',
    '4-hour extended coverage for longer receptions',
    'Priority visits for the honoree\'s immediate family and closest friends',
    'Custom voice message from the honoree or their parents programmed in',
    'Branded backdrop for formal family portrait moments',
  ],

  whySectionTitle: 'Why Families Choose Us',
  whySectionSub: 'A Bar or Bat Mitzvah is one of the most significant celebrations a family hosts. We make sure the reception matches the moment.',
  whyCards: [
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Every Age Group Loves It',
      desc: 'The kids will literally run toward it. The teenagers will want to recreate their photos. The adults will be surprised. The grandparents will be delighted. The robot works for every generation at your table.',
    },
    {
      icon: <FiHeart className="w-5 h-5" />,
      title: 'Honoree\'s Name on Every Print',
      desc: 'Every guest leaves holding a print that says the honoree\'s name and date. It\'s a keepsake that captures the weight of the moment — a physical reminder of an extraordinary day.',
    },
    {
      icon: <FiMusic className="w-5 h-5" />,
      title: 'Personal Voice Message',
      desc: 'Program the robot with a message from the honoree, their parents, or even the Rabbi. When it rolls up to each table, it speaks something personal — and the room completely lights up.',
    },
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Theme-Matched Design',
      desc: 'Whether the theme is basketball, Broadway, travel, or modern minimalist, we match the print overlay to the existing decor and theme aesthetic. It feels like part of the event, not an add-on.',
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      title: 'A Centerpiece Memory Moment',
      desc: 'Among the candle lighting, the hora, and the speeches, the robot becomes one of the core memories of the night. Guests mention it in cards, in calls, in photos for years afterward.',
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      title: 'Safe Around Kids & Seniors',
      desc: 'Our operator is experienced in mixed-age environments. The robot operates slowly and carefully, with our team managing crowd flow to make sure every interaction is joyful and stress-free.',
    },
  ],

  customTitle: 'Built Around the Honoree\'s Big Day',
  customSub: 'From the print design to the robot\'s voice, every element is tailored to celebrate a specific person and their milestone.',
  customCards: [
    {
      icon: <FiImage className="w-6 h-6" />,
      title: 'Theme-Matched Print Overlay',
      desc: 'The honoree\'s name, the date, and design elements from the Mitzvah theme — sports motifs, musical notes, travel stamps, or elegant script. We build a proof and refine until it\'s perfect.',
    },
    {
      icon: <FiMusic className="w-6 h-6" />,
      title: 'Honoree\'s Voice or Parents\' Message',
      desc: 'Record the honoree saying something funny, heartfelt, or signature to them. Or have their parents record a message of pride and love. The robot delivers it at every table — every time.',
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      title: 'Family Digital Gallery',
      desc: 'All photos from the night collected in a private digital gallery, accessible via QR code. Perfect for extended family who attended from out of town or for building the official Mitzvah photo album.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Rachel & Howard B.',
      role: 'Parents of the Bar Mitzvah Boy',
      text: 'Our son literally grabbed the robot\'s arm to show it to his friends the second it arrived. The grandparents were equally smitten. Every print has his name and the date — people are still sending us photos of it on their fridges.',
    },
    {
      name: 'Miriam K.',
      role: 'Bat Mitzvah Honoree\'s Aunt and Event Coordinator',
      text: 'I\'ve been to dozens of B\'nai Mitzvah parties. This was the first time the photobooth matched the energy of the dance floor. The robot visited every table and the kids actually lined up for it — twice.',
    },
    {
      name: 'Jonathan S.',
      role: 'Father of the Bat Mitzvah Girl, Gold Package',
      text: 'The photography and robot package was the smartest decision we made. The robot gave us hilarious, joyful images while the photographer captured the formal moments. Between the two, we have a complete record of the most important night of our daughter\'s life.',
    },
  ],

  faqs: [
    {
      question: 'Is the robot safe around kids and mixed-age groups?',
      answer: 'Absolutely. Our operators are experienced in environments with children and elderly guests. The robot moves slowly and deliberately, and our team manages interactions to ensure everyone — from toddlers to grandparents — has a comfortable and joyful experience.',
    },
    {
      question: 'Can we match the robot\'s print to our Mitzvah theme?',
      answer: 'Yes — that\'s our favorite kind of brief. Share your theme, color palette, and any design inspiration, and we\'ll build a custom print overlay that feels like part of the event design, not an afterthought.',
    },
    {
      question: 'Can the honoree\'s voice be programmed into the robot?',
      answer: 'Yes. We can record the honoree, their parents, or even a combination of both — a message that the robot delivers when it arrives at each table. It\'s consistently one of the biggest surprises and most emotional moments of the night.',
    },
    {
      question: 'Can the robot visit both the kids\' room and the main reception hall?',
      answer: 'With the Platinum package, yes — two stations means simultaneous coverage in multiple spaces. Alternatively, our operator can rotate between rooms during the session, though we\'ll discuss timing to make sure the coverage makes sense for your layout.',
    },
    {
      question: 'How many tables can the robot visit in a typical session?',
      answer: 'In 2 hours, we typically visit 15–25 tables. Larger receptions over 150 guests benefit from a 3–4 hour extended session or the Platinum package with a second station.',
    },
    {
      question: 'Do you have experience at Jewish events and traditional venues?',
      answer: 'Yes. We\'ve worked at numerous Bar and Bat Mitzvahs at banquet halls, synagogue reception rooms, hotel ballrooms, and private venues across the GTA. We\'re familiar with the typical reception flow — cocktail hour, dinner, hora, candle lighting, dancing — and we schedule the robot to complement it.',
    },
    {
      question: 'Can the prints be used in a Mitzvah memory book or scrapbook?',
      answer: 'Absolutely. The prints are high-quality photo prints designed to be kept. Many families include robot photos alongside professional photos in the official Mitzvah memory book — they add personality and humor to balance the formal portraits.',
    },
  ],

  finalHeadline: <>Give the Honoree a Celebration <span className="text-[#fce4a6]">They&apos;ll Never Forget.</span></>,
  finalSub: 'This is one of the most important nights of your child\'s life. Make the reception match the magnitude of the moment.',
  quoteCTALabel: 'Get a Mitzvah Quote',
  modalTitle: 'Get a Bar/Bat Mitzvah Quote',
  eventTypeName: 'Bar/Bat Mitzvah',
}

export default function BarBatMitzvahPage() {
  return <EventPageLayout {...props} />
}
