import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiHeart, FiMusic } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Robot Photobooth for Milestone Celebrations | Robo Booth Toronto',
  seoDescription: 'Celebrate birthdays, anniversaries, and retirements with a roaming Robot Photobooth. Personalized overlays, table visits, and physical prints guests keep forever — Toronto & GTA.',
  canonicalPath: '/events/milestone-celebration',
  emoji: '🎉',
  heroTagline: 'MILESTONE CELEBRATION ACTIVATION',
  heroHeadline: <>Make Your Milestone <span className="text-[#fce4a6]">Truly Unforgettable</span></>,
  heroSub: 'Whether it\'s a 50th birthday, a 25th anniversary, or a well-earned retirement — this is a moment that deserves more than a slideshow. Our roaming robot visits every table, captures the full room, and prints a keepsake every guest takes home.',
  heroCTALabel: 'Get a Milestone Quote',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Weekend milestone dates fill up quickly — check yours now',

  steps: [
    {
      title: 'We Personalize Everything',
      desc: 'Share the honoree\'s name, milestone, and any special details — age, years married, career highlights. We design a print overlay that celebrates them specifically, not generically.',
    },
    {
      title: 'The Robot Visits Every Table',
      desc: 'Our operator navigates every corner of the room — from the head table to the cousins in the back. No table gets skipped. No guest gets left out of the celebration.',
    },
    {
      title: 'Everyone Leaves with a Print',
      desc: 'Physical prints in hand before they leave. Plus a QR code for instant digital delivery. Guests from out of town have a photo to keep the memory alive wherever they go.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'Perfect for intimate milestone celebrations where the photobooth experience is the star attraction.',
  bronzeBenefits: [
    '2-hour roaming robot photobooth with operator',
    'Custom overlay with honoree\'s name, milestone, and date',
    'Instant physical prints — every guest takes one home',
    'QR-code digital delivery for all guests',
    'Unlimited captures during the session',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Every table moment AND every milestone toast captured. The complete celebration package for the day the honoree will treasure forever.',
  goldBenefits: [
    'Everything in Bronze, plus:',
    '3-hour professional event photography coverage',
    'Candid guest moments and group family photos included',
    'Edited gallery delivered within the week — perfect for a memory book',
    'High-resolution files great for framing or printing large-format',
    'Dedicated photographer and robot operator team on site',
  ],

  platinumDesc: 'For larger milestone parties with multiple venue spaces — two photobooth activations plus full photography, so every moment is captured.',
  platinumBenefits: [
    'Everything in Gold, plus:',
    'Second photobooth station for overflow or second room coverage',
    '4-hour extended coverage window',
    'Priority table visits for the honoree\'s immediate family',
    'Custom voice message from a loved one programmed into the robot',
    'Branded backdrop for formal portrait moments',
  ],

  whySectionTitle: 'Why Families Choose Us',
  whySectionSub: 'A milestone celebration is once-in-a-lifetime. We treat it that way — from first consultation to the last print.',
  whyCards: [
    {
      icon: <FiHeart className="w-5 h-5" />,
      title: 'Deeply Personalized',
      desc: 'The honoree\'s name, photo, milestone, and a personal message are woven into every print. It\'s not generic — it\'s a tribute to a specific, irreplaceable person.',
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Every Generation Loves It',
      desc: 'From the 8-year-old grandkids to the 80-year-old grandparents, the robot captivates every age. It brings the whole room together in a way nothing else can.',
    },
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Physical Prints That Last',
      desc: 'Digital photos get buried in a camera roll. A physical print goes on the fridge, the mantle, or the office wall — a lasting reminder of a special day.',
    },
    {
      icon: <FiMusic className="w-5 h-5" />,
      title: 'Custom Voice from a Loved One',
      desc: 'Record a message from the honoree\'s spouse, child, or best friend and program it into the robot. The first words it speaks at every table are something truly personal.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Works in Any Venue',
      desc: 'Banquet halls, restaurant private rooms, backyards with a tent, or a rented community space — we\'ve activated in all of them. If guests can be there, we can be there.',
    },
    {
      icon: <FiShield className="w-5 h-5" />,
      title: 'Stress-Free for the Planner',
      desc: 'You have enough to manage. Our team arrives early, sets up, runs the experience, and tears down without requiring anything from you on the day of the event.',
    },
  ],

  customTitle: 'A Tribute Built Around the Honoree',
  customSub: 'Every element of the robot experience is designed to celebrate a specific person and a specific moment in time.',
  customCards: [
    {
      icon: <FiImage className="w-6 h-6" />,
      title: 'Name & Milestone Overlays',
      desc: 'The print features the honoree\'s name, the milestone ("50 Years of Living Fully," "30 Years Together," "35 Years of Excellence"), and the date. Guests feel like they\'re holding a piece of history.',
    },
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: 'Personal Voice Message',
      desc: 'We can program the robot to speak a personalized message from the honoree, their spouse, or their children. The robot introduces itself to each table with a voice they know and love.',
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      title: 'Digital Gallery for Sharing',
      desc: 'All photos are accessible via QR code and compiled into a private digital gallery. Perfect for family members who traveled in from out of town to share with people who couldn\'t make it.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Linda K.',
      role: 'Daughter of the Guest of Honor, 70th Birthday Party',
      text: 'My mom\'s 70th was everything we hoped for, and the robot was the highlight. Every single guest has that print on their fridge. My mom still talks about how the robot said her name when it rolled up to her table.',
    },
    {
      name: 'Robert & Carol S.',
      role: 'Celebrating 40th Wedding Anniversary',
      text: 'We wanted something different for our anniversary party. The Robo Booth was perfect — it had our names and wedding date on every print, and our grandkids were absolutely obsessed with it all night.',
    },
    {
      name: 'Teresa A.',
      role: 'Event Planner, Corporate Retirement Party (150 guests)',
      text: 'We booked the Gold package for a retirement party and the combination of robot photos plus professional photography gave us everything we needed for the tribute video and the send-off. Couldn\'t have asked for more.',
    },
  ],

  faqs: [
    {
      question: 'Can we feature the honoree\'s photo or a specific milestone message on the prints?',
      answer: 'Yes. We can incorporate a photo of the honoree, a milestone quote, their name, and the date into a custom-designed print overlay. We share a proof before the event and refine it until it\'s perfect.',
    },
    {
      question: 'What kinds of milestone events do you typically cover?',
      answer: 'We cover all major personal milestones: milestone birthdays (40th, 50th, 60th, 70th, 80th), wedding anniversaries, retirement parties, and combined celebration events. If it\'s a milestone worth marking, we\'re the right fit.',
    },
    {
      question: 'Can the robot say something personal when it arrives at a table?',
      answer: 'Absolutely. We can program a custom voice message into the robot — a greeting from the honoree, a message from a family member, or a fun inside reference that only the guests would understand. It\'s always a crowd-pleaser.',
    },
    {
      question: 'Will the robot work in a backyard or outdoor venue?',
      answer: 'Yes, with some weather considerations. Covered outdoor spaces (tents, patios with overhang) work well. We\'ll discuss your specific venue setup during the planning call to ensure everything runs smoothly.',
    },
    {
      question: 'How many guests can the robot capture in a 2-hour window?',
      answer: 'In a 2-hour session, we typically visit 15–25 tables and capture 60–120 individual photos. For parties over 100 guests, we recommend a 3-hour session or the Gold/Platinum package with extended time.',
    },
    {
      question: 'Can we get a digital gallery to share with family who couldn\'t attend?',
      answer: 'Yes — all photos are captured digitally and accessible via QR code immediately. We also compile a private digital gallery link you can share with anyone, including family members who attended remotely.',
    },
  ],

  finalHeadline: <>Make This Milestone <span className="text-[#fce4a6]">One for the Ages.</span></>,
  finalSub: 'A milestone this significant deserves an experience as big as the moment. Let\'s build something the honoree will talk about for years.',
  quoteCTALabel: 'Get a Milestone Quote',
  modalTitle: 'Get a Milestone Celebration Quote',
  eventTypeName: 'Milestone Celebration',
}

export default function MilestoneCelebrationPage() {
  return <EventPageLayout {...props} />
}
