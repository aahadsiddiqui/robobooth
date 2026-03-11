import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiTarget, FiTrendingUp } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Trade Show & Expo Photobooth Toronto GTA | Robo Booth',
  seoDescription: 'Draw the biggest crowd at your next trade show with Canada\'s first Robot Photobooth. Branded photos and lead generation built in. Serving Toronto & GTA.',
  canonicalPath: '/events/trade-show-expo',

  emoji: '🏢',
  heroTagline: 'TRADE SHOW & EXPO ACTIVATION',
  heroHeadline: <>The Trade Show Booth That <span className="text-[#fce4a6]">Draws the Biggest Crowd</span></>,
  heroSub: 'Stop competing for floor traffic. Canada\'s first Robot Photobooth turns your booth into the event\'s most-visited destination — with branded photos putting your company name in every attendee\'s pocket. Built-in lead capture ensures every interaction becomes a qualified contact.',
  heroCTALabel: 'Check Availability',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Trade show dates are booking up',

  steps: [
    {
      title: 'Reserve Your Spot',
      desc: 'Share your booth number, show dates, and brand assets. We design branded photo overlays and program custom sales voice messaging tailored to your products, services, and target buyer.',
    },
    {
      title: 'We Set Up In Your Booth',
      desc: 'Our team arrives during exhibitor load-in, integrates the robot into your booth layout, and has everything running before the show floor opens. No power hookup required from the venue.',
    },
    {
      title: 'The Floor Comes to You',
      desc: 'Attendees from across the expo floor are drawn to your booth by the robot. Every interaction is a qualified lead moment — and every branded photo keeps your company name alive in their phone after they leave.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'The standalone trade show activation — the fastest way to make your booth the busiest on the floor.',
  bronzeBenefits: [
    'Company branding and product imagery integrated into every photo overlay for instant brand recall',
    'Robot draws attendees to your booth from across the show floor — no passive waiting for walk-bys',
    'Instant photo delivery to attendee phones via SMS — your brand in their pocket before they leave your booth',
    'Custom sales voice messaging introduces your company, product line, or key value proposition',
    'Dedicated on-site operator runs the activation so your sales team can stay focused on conversations',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Capture every trade show moment — the crowds, the energy, and the product — for post-show marketing.',
  goldBenefits: [
    'Everything in the Bronze Package, fully customised to your trade show booth',
    'Professional photographer documents your booth traffic, product demonstrations, and team in action',
    'High-quality imagery of your booth at peak crowd density — proof of attendance and engagement for stakeholders',
    'Coordinated content capture to ensure robot activations and photography tell a unified brand story',
    'Full-resolution gallery delivered within 48 hours — ready for post-show email campaigns and follow-ups',
    'Full usage rights included — use in sales decks, case studies, and next year\'s show marketing materials',
  ],

  platinumDesc: 'The ultimate booth presence — add a 360 Booth or Premium Photobooth to dominate the show floor from multiple angles.',
  platinumBenefits: [
    'Everything in the Gold Package, scaled for maximum booth impact',
    'Second activation station — 360 Booth or Premium Photobooth — positioned strategically within your booth',
    'Multiple content moments within a single booth visit increases dwell time and deepens brand engagement',
    'Different activations attract different attendee personas — broader floor reach with a single booth footprint',
    'Higher branded content volume amplifies your post-show social presence and organic reach',
    'Dedicated coordination team manages all activations so your booth staff can focus entirely on selling',
  ],

  whySectionTitle: 'Why Exhibitors Choose Us',
  whySectionSub: 'The booth activation that draws the entire floor',
  whyCards: [
    {
      icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Biggest Crowd on the Floor',
      desc: 'A roaming robot is the most visually distinctive thing at any trade show. Attendees cross the floor specifically to interact with it — and they bring their colleagues. Your booth becomes the must-visit destination of the show.',
    },
    {
      icon: <FiShare2 className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Instant Brand Distribution',
      desc: 'Every attendee who gets a photo leaves with your company name on their phone. They share it. Their industry contacts see it. Your brand reaches well beyond the show floor without any additional media spend.',
    },
    {
      icon: <FiTarget className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Lead Generation Built In',
      desc: 'Photo delivery via SMS creates a natural moment to capture contact information. Every interaction is a warm lead — attendees who\'ve already engaged with your brand and have a positive memory attached to it.',
    },
    {
      icon: <FiShield className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'No Venue Power Needed',
      desc: 'Trade show power drops are expensive and limiting. The robot operates completely independently — no power outlets, no venue fees, no cables crossing your booth floor. Just show up and activate.',
    },
    {
      icon: <FiImage className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Physical Branded Prints',
      desc: 'Offer physical printed photos at your booth — branded with your company name and contact details. Attendees take them home. Your brand sits on their desk, not buried in a swag bag.',
    },
    {
      icon: <FiStar className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Fully Managed Activation',
      desc: 'Our operator manages every aspect of the robot activation. Your sales team doesn\'t operate anything — they simply benefit from the steady stream of attendees the robot delivers to your booth all day long.',
    },
  ],

  customTitle: 'Built Around Your Booth',
  customSub: 'Company branding, lead capture, and roaming floor mode all available',
  customCards: [
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Company Branding & Product Overlays',
      desc: 'Custom photo overlays featuring your company logo, product imagery, and show-specific messaging. Every photo looks like a professional marketing asset — not an event photo. Attendees share it because it looks great.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Custom Sales Voice Messaging',
      desc: 'Script the robot to introduce your company, announce a show special, highlight your flagship product, or drive attendees to a demo station. A roaming sales tool that works the floor while your team handles one-on-one conversations.',
    },
    {
      icon: <FiTrendingUp className="w-5 h-5" />,
      title: 'Roaming Expo Floor Mode',
      desc: 'Need to reach attendees beyond your booth perimeter? The robot can roam the broader show floor, directing traffic back to your booth. Pre-approved by show organisers, it\'s the most proactive lead generation tool on the market.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Greg F.',
      role: 'VP Sales, B2B Technology Company',
      text: 'We\'ve exhibited at the same show for six years and always had to chase foot traffic. This year we had more visitors in the first hour than we normally get in an entire day. The robot drew a crowd that naturally converted into real sales conversations. Pipeline impact was significant.',
    },
    {
      name: 'Leila A.',
      role: 'Marketing Director, Manufacturing Firm',
      text: 'The branded photos gave us something tangible to follow up on. We knew every person who received a photo had been to our booth and had a positive brand interaction. Our post-show email open rates were the highest we\'ve ever seen — the photo created a memorable connection.',
    },
    {
      name: 'Carlos M.',
      role: 'Head of Partnerships, SaaS Company',
      text: 'Our booth neighbours asked us afterward how we generated so much traffic. The robot is genuinely the most effective trade show booth investment I\'ve made in 12 years of exhibiting. It pays for itself before lunch on day one.',
    },
  ],

  faqs: [
    {
      question: 'Do I need to get approval from the show organiser before booking?',
      answer: 'This depends on the specific show and venue. Many trade shows welcome interactive activations and the robot is entirely self-contained with no power or WiFi requirements. We recommend checking with your show organiser early — and we can provide documentation about the activation on request to support your approval process.',
    },
    {
      question: 'Can the robot operate outside of our assigned booth footprint?',
      answer: 'In some shows, yes — the roaming floor mode allows the robot to move beyond your booth perimeter and direct floor traffic back to your stand. This requires prior approval from show management. Our team can advise on how to request this and what parameters are typically permitted.',
    },
    {
      question: 'How does the photo lead capture work?',
      answer: 'When attendees receive their photo via SMS, their phone number is logged. This creates a contact list of everyone who engaged with your booth activation. Depending on your configuration and local privacy laws, you can incorporate opt-in messaging for follow-up marketing. We advise on compliant implementation.',
    },
    {
      question: 'Can the robot\'s messaging be updated between show days?',
      answer: 'Yes. If your show runs multiple days, we can update voice lines or overlay messaging between days to promote different products, announce a daily show special, or refresh the experience for repeat visitors. This is particularly effective for longer expo runs.',
    },
    {
      question: 'What\'s the minimum booth size required for the robot to operate effectively?',
      answer: 'The robot can work in booths as small as a standard 10x10 inline space. For smaller booths, it can operate primarily within your booth footprint. For larger island or peninsula booths, it roams the perimeter and draws attention from a wider area. Our team will assess your specific booth layout during the planning process.',
    },
  ],

  finalHeadline: <>Have the Most Visited Booth <span className="text-[#fce4a6]">at Your Next Expo.</span></>,
  finalSub: 'Stop blending in. The Robot Photobooth guarantees your booth is the one everyone\'s talking about.',
  quoteCTALabel: 'Check Availability & Get a Quote',
  modalTitle: 'Get a Trade Show Quote',
  eventTypeName: 'Trade Show & Expo',
}

export default function TradeShowExpoPage() {
  return <EventPageLayout {...props} />
}
