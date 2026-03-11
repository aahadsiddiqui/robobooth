import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiHeart } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Robot Photobooth for Graduation Ceremonies | Robo Booth Toronto',
  seoDescription: 'Give your graduating class an experience they\'ll never forget. Canada\'s first Robot Photobooth roams the crowd, delivers school-branded prints, and captures every moment — Toronto & GTA.',
  canonicalPath: '/events/graduation',
  emoji: '🎓',
  heroTagline: 'GRADUATION CEREMONY ACTIVATION',
  heroHeadline: <>Give Your Graduating Class <span className="text-[#fce4a6]">a Night They'll Never Forget</span></>,
  heroSub: 'Your students worked for years to reach this moment. Our roaming Robot Photobooth captures the entire class — every group, every friend circle, every milestone moment — and puts a school-branded print in every hand before the night is over.',
  heroCTALabel: 'Check Availability for Your School',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Spring & June ceremony dates are filling up fast — secure yours now',

  steps: [
    {
      title: 'We Brand It to Your School',
      desc: 'Share your school name, crest, class year, and any theme details. We design a custom print overlay that reflects your institution and celebrates your graduating cohort — not a generic template.',
    },
    {
      title: 'Robot Covers the Entire Room',
      desc: 'From the graduating class to faculty, staff, and guests, our operator navigates the full venue. The robot works every section — dinner tables, cocktail areas, and dance floors — so no one misses out.',
    },
    {
      title: 'Every Graduate Leaves with a Print',
      desc: 'Branded physical prints with your school name, class year, and event details are in every guest\'s hands on the night. These end up on dorm walls, in memory boxes, and in yearbooks for years to come.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'The standalone graduation activation — perfect for ceremonies, banquets, and prom-style events of any size.',
  bronzeBenefits: [
    '2-hour roaming robot photobooth with operator',
    'Custom overlay branded with school name, crest, and class year',
    'Instant physical prints — every student keeps a keepsake',
    'QR-code digital delivery for instant sharing',
    'Unlimited captures throughout the session',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Full candid coverage of the class plus professional photography of the ceremony highlights — the complete graduation documentation package.',
  goldBenefits: [
    'Everything in Bronze, plus:',
    '3-hour professional event photography coverage',
    'Candid class moments, group photos, and faculty portraits',
    'Edited gallery delivered within the week — perfect for school archives and social media',
    'High-resolution files ready for yearbooks, newsletters, and framing',
    'Coordinated photographer and robot operator on site together',
  ],

  platinumDesc: 'For larger ceremonies and multi-room venues — two photobooth activations plus full photography so every corner of the celebration is covered.',
  platinumBenefits: [
    'Everything in Gold, plus:',
    'Second photobooth station for overflow rooms or outdoor spaces',
    '4-hour extended coverage for longer ceremonies and receptions',
    'Custom voice message from faculty, administration, or student council',
    'Branded backdrop for formal class portrait moments',
    'Priority activation during peak ceremony and reception moments',
  ],

  whySectionTitle: 'Why Schools Choose Us',
  whySectionSub: 'Graduation happens once. The activation should be as memorable as the achievement — here\'s how we deliver that for the entire class.',
  whyCards: [
    {
      icon: <FiStar className="w-5 h-5" />,
      title: 'School Branding on Every Print',
      desc: 'Every student and guest leaves holding a print branded with your school name, crest, and class year. A tangible keepsake that celebrates the cohort — not a generic photo strip.',
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Covers the Entire Class',
      desc: 'The robot doesn\'t sit in a corner waiting for a queue. Our operator roams the full venue — capturing every friend group, every table, and every corner of the celebration.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Works in Any Venue',
      desc: 'Banquet halls, hotel ballrooms, school gymnasiums, outdoor tents — we\'ve activated graduation events in every setting across the GTA. No power or WiFi requirements.',
    },
    {
      icon: <FiHeart className="w-5 h-5" />,
      title: 'Physical Prints That Last',
      desc: 'Digital photos disappear in feeds. The branded print ends up on a dorm wall, in a memory box, or in a yearbook — a lasting reminder of the class that earned it.',
    },
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'School Crest & Class Year Recognition',
      desc: 'We incorporate your school crest, institutional colors, program name, and class year into a professionally designed overlay — a print the graduating class would be proud to display.',
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      title: 'Fully Managed — Zero Work for Staff',
      desc: 'Your team organized the ceremony. We handle the activation end-to-end — setup, operation, and teardown — so faculty and staff can enjoy the celebration alongside the class.',
    },
  ],

  customTitle: 'Built Around Your School & Class',
  customSub: 'Every element of the experience is tailored to your institution, your graduating cohort, and the milestone they\'ve earned.',
  customCards: [
    {
      icon: <FiImage className="w-6 h-6" />,
      title: 'School Name, Crest & Class Year',
      desc: 'The print overlay features your school name, crest or logo, program or faculty, and graduation year — designed specifically for your institution. We provide a proof before the event for approval.',
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: 'Custom Voice Message',
      desc: 'Program the robot to deliver a congratulatory message from the principal, dean, or student council president. Formal, inspiring, or even humorous — whatever tone fits your school culture.',
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      title: 'Digital Gallery for the Whole Class',
      desc: 'All captures compiled into a private gallery accessible via QR code. Perfect for sharing with the graduating class, posting to school social media, and archiving in the school\'s records.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Sandra M.',
      role: 'Events Coordinator, Secondary School (GTA)',
      text: 'We booked this for our Grade 12 graduation banquet and the entire class went wild for it. The robot worked every table during dinner — even the quiet students who normally wouldn\'t go near a photo booth were lining up. The prints with our school name looked incredible.',
    },
    {
      name: 'James K.',
      role: 'Student Council President, Class of 2024',
      text: 'The robot was hands down the best part of our grad night. It was everywhere — dance floor, dinner tables, even the hallway. Everyone in the class has that print. Some people already have it framed.',
    },
    {
      name: 'Maria T.',
      role: 'Event Planner, Graduation Banquet (200+ students)',
      text: 'I wasn\'t sure how a robot would handle a venue this size but the Robo Booth team had it covered completely. Every section of the room got visited, the prints came out beautifully branded, and the school was thrilled with how professional everything looked.',
    },
  ],

  faqs: [
    {
      question: 'Can the print be branded with our school name and crest?',
      answer: 'Yes — the print overlay is designed specifically for your institution. We include your school name, crest or logo, program or faculty name, and class year. We can also match your school colors. A design proof is sent before the event for your approval.',
    },
    {
      question: 'How large of a graduating class can you cover?',
      answer: 'We\'ve activated events ranging from intimate ceremonies of 50 students to large banquets of 300+. For larger classes, the Gold and Platinum packages include extended coverage time and additional photobooth stations to ensure the entire class is captured.',
    },
    {
      question: 'Does the robot work in a school gymnasium or banquet hall?',
      answer: 'Absolutely — both are among our most common graduation venues. The robot is fully self-contained with no venue power or WiFi requirements. Our operator assesses the layout on arrival and maps an efficient path to cover the full room.',
    },
    {
      question: 'Can the robot deliver a message from the principal or student council?',
      answer: 'Yes. We can record a congratulatory message from whoever you choose — principal, dean, student council president, or faculty advisor — and program it into the robot. When it addresses the class directly, the reaction is always memorable.',
    },
    {
      question: 'Can the photos be used in the school yearbook or on social media?',
      answer: 'Yes — and we encourage it. All photos are compiled into a digital gallery accessible via QR code. High-resolution files from the Gold and Platinum packages are print-ready for yearbooks, newsletters, and framing. Social-ready versions are included for school accounts.',
    },
    {
      question: 'How far in advance should we book for a June graduation?',
      answer: 'June is our busiest month for graduation events. We strongly recommend booking by March or April. Once exam season ends, June weekend dates fill within days — contact us as soon as your ceremony date is confirmed.',
    },
    {
      question: 'Do you work with post-secondary institutions as well as secondary schools?',
      answer: 'Yes — we work with universities, colleges, private schools, and secondary schools across the GTA and surrounding areas. Whether it\'s a faculty convocation or a high school grad night, we tailor the activation to your institution and cohort.',
    },
  ],

  finalHeadline: <>Give Your Class a Graduation Night <span className="text-[#fce4a6]">They'll Talk About for Years.</span></>,
  finalSub: 'Your students earned this moment. Let\'s make sure every single one of them leaves with a memory they\'ll hold onto long after the ceremony ends.',
  quoteCTALabel: 'Check Availability for Your School',
  modalTitle: 'Get a Graduation Event Quote',
  eventTypeName: 'Graduation',
}

export default function GraduationPage() {
  return <EventPageLayout {...props} />
}
