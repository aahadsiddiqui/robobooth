import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiHeart, FiMusic } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Robot Photobooth for Engagement Parties | Robo Booth Toronto',
  seoDescription: 'Celebrate your engagement with a roaming Robot Photobooth. Couple name overlays, table visits, physical prints for every guest, and a personal voice message from the couple — Toronto & GTA.',
  canonicalPath: '/events/engagement',
  emoji: '💍',
  heroTagline: 'ENGAGEMENT PARTY ACTIVATION',
  heroHeadline: <>Celebrate Your Engagement <span className="text-[#fce4a6]">in the Most Unforgettable Way</span></>,
  heroSub: 'Your guests flew in, dressed up, and showed up for you. Give them an experience as special as the occasion — a roaming Robot Photobooth that visits every table, captures the whole room, and prints a keepsake everyone takes home.',
  heroCTALabel: 'Get an Engagement Quote',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Spring and fall engagement party dates are booking up fast',

  steps: [
    {
      title: 'We Celebrate Your Story',
      desc: 'Share your names, engagement date, and any personal details — how you met, your proposal story, your aesthetic. We design a print that feels like the two of you, not a template.',
    },
    {
      title: 'Robot Visits Every Table',
      desc: 'From the parents\' table to the college friends in the corner, our operator navigates the entire room. Every guest gets their moment with the robot — no one misses out on the fun.',
    },
    {
      title: 'Prints & Memories, Instantly',
      desc: 'Branded prints are in guests\' hands within seconds. They scan a QR code for digital delivery, and walk away holding a piece of your love story to keep on their mantle.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'Perfect for intimate engagement celebrations where the photobooth experience is the centerpiece activity.',
  bronzeBenefits: [
    '2-hour roaming robot photobooth with operator',
    'Custom overlay with couple\'s names, engagement date, and a personal detail',
    'Instant physical prints — every guest takes one home',
    'QR-code digital delivery for sharing',
    'Unlimited captures throughout the session',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Every table visit AND every heartfelt toast documented. The full engagement party package for a love story this big.',
  goldBenefits: [
    'Everything in Bronze, plus:',
    '3-hour professional event photography coverage',
    'Candid guest moments and couple portraits captured all night',
    'Edited gallery delivered within the week — perfect preview before wedding planning',
    'High-resolution files great for save-the-dates or engagement announcements',
    'Dedicated photographer and robot operator as one coordinated team',
  ],

  platinumDesc: 'For larger engagement celebrations — two photobooth activations plus full photography, ensuring every moment of your love story is captured.',
  platinumBenefits: [
    'Everything in Gold, plus:',
    'Second photobooth station for simultaneous coverage in multiple spaces',
    '4-hour extended coverage for longer celebrations',
    'Priority table visits for immediate family and closest friends',
    'Custom voice message from the couple programmed into the robot',
    'Branded backdrop available for formal couple portraits',
  ],

  whySectionTitle: 'Why Couples Choose Us',
  whySectionSub: 'Your engagement party sets the tone for the wedding. We help you start that chapter with something genuinely memorable.',
  whyCards: [
    {
      icon: <FiHeart className="w-5 h-5" />,
      title: 'Your Names on Every Print',
      desc: 'Every guest leaves holding a print that says your names and your date. It\'s a keepsake that signals the start of something beautiful — and it\'ll be on their fridge before they get home.',
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      title: 'Brings Both Families Together',
      desc: 'The robot is the one thing both sides of the family gather around. It\'s an instant icebreaker that dissolves any first-meeting awkwardness and gets everyone in the same frame.',
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      title: 'Sets the Tone for the Wedding',
      desc: 'Guests who experience the robot at your engagement party arrive at your wedding already excited about what you have planned. It builds anticipation and elevates expectations.',
    },
    {
      icon: <FiMusic className="w-5 h-5" />,
      title: 'Personal Voice from the Couple',
      desc: 'Record a message together — a joke, a heartfelt thank-you, or the story of your proposal — and have the robot deliver it to every table. It\'s the most personal icebreaker imaginable.',
    },
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Physical Prints That Outlast Social Posts',
      desc: 'Instagram stories disappear. Prints don\'t. Guests frame them, put them on desks, and share them with family who couldn\'t attend. Your engagement moment lives on in their home.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Works at Any Venue',
      desc: 'Restaurant buyout, backyard celebration, family home, or event hall — our robot navigates any space. If your guests can gather there, we can make it special.',
    },
  ],

  customTitle: 'A Celebration as Unique as Your Love Story',
  customSub: 'Every detail of the experience is built around the two of you — your names, your story, your style.',
  customCards: [
    {
      icon: <FiHeart className="w-6 h-6" />,
      title: 'Couple\'s Name Overlay',
      desc: 'Your names, the engagement date, and a custom design element — floral, modern minimalist, romantic script, or bold and playful — match your engagement aesthetic perfectly. We send a proof before the event.',
    },
    {
      icon: <FiMusic className="w-6 h-6" />,
      title: 'Personal Voice Message',
      desc: 'Record something together that the robot says to each table — a thank-you, a story, a laugh. It\'s the kind of personal touch guests talk about all the way home.',
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      title: 'Digital Gallery for Everyone',
      desc: 'All photos collected into a private digital gallery guests access via QR code. Perfect for relatives who came from out of town to share forward, or for you to use in your engagement announcements.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Sophie & Marcus T.',
      role: 'Newly Engaged Couple, 90-guest Engagement Party',
      text: 'Our parents have never laughed together like that before. The robot rolled up to their table, said our names, and suddenly both families were crowding around it together. We cried a little. It was perfect.',
    },
    {
      name: 'Fatima R.',
      role: 'Maid of Honor, Planning a Surprise Engagement Party',
      text: 'I booked this as a surprise element and the couple completely lost it when the robot showed up. Every print has their names and engagement date — they\'re framing them all. Best decision I made for the party.',
    },
    {
      name: 'David & Ana L.',
      role: 'Engaged Couple, Gold Package',
      text: 'We used the photos from the engagement party for our save-the-dates. The professional photography captured everything beautifully and the robot photos are hilarious and heartwarming in equal measure. We\'re booking them for the wedding too.',
    },
  ],

  faqs: [
    {
      question: 'Can the print feature both our names and the engagement date?',
      answer: 'Yes — that\'s exactly what we design. Both names, the engagement date, and any additional personal touch you want (a short phrase, a heart motif, your wedding hashtag if you have one). We provide a design proof before the event.',
    },
    {
      question: 'Can we use the engagement party photos for our save-the-dates or announcements?',
      answer: 'Absolutely. The Gold and Platinum packages include professional photography with high-resolution files licensed for personal use, including save-the-dates, social announcements, and engagement photo albums.',
    },
    {
      question: 'Can both families interact with the robot even if they\'ve never met before?',
      answer: 'That\'s actually one of our favorite outcomes. The robot is a natural icebreaker — it removes any awkwardness and gives two families who are meeting for the first time something fun to share immediately.',
    },
    {
      question: 'What happens if our engagement party is in a private home?',
      answer: 'We\'ve activated in private homes and residential settings many times. We assess the layout during our planning call and our operator navigates the space thoughtfully, avoiding any tight areas or fragile spots.',
    },
    {
      question: 'Can we book the same team for our wedding later?',
      answer: 'Yes, and many couples do. Booking your wedding with us after an engagement party activation secures your date and means your guests already know what to expect — which always builds anticipation.',
    },
    {
      question: 'How long in advance should we book?',
      answer: 'We recommend at least 3 weeks for design turnaround. Peak engagement season (spring and fall) books up quickly, so earlier is always better. Contact us with your date and we\'ll confirm availability immediately.',
    },
  ],

  finalHeadline: <>Celebrate Your Love Story <span className="text-[#fce4a6]">in the Most Memorable Way.</span></>,
  finalSub: 'Your engagement is the beginning of the best chapter. Start it with something extraordinary — a night your guests will genuinely remember.',
  quoteCTALabel: 'Get an Engagement Quote',
  modalTitle: 'Get an Engagement Party Quote',
  eventTypeName: 'Engagement',
}

export default function EngagementPage() {
  return <EventPageLayout {...props} />
}
