import React from 'react'
import { EventPageProps } from '../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiTarget, FiTrendingUp } from 'react-icons/fi'

export function getTradeShowExpoPageProps(overrides: Partial<EventPageProps> = {}): EventPageProps {
  return {
    seoTitle: 'Trade Show & Expo Photobooth Toronto GTA | Robo Booth',
    seoDescription: 'Draw the biggest crowd at your next trade show with Canada\'s first Roaming Robot Activation. Branded photos and lead generation built in. Serving Toronto & GTA.',
    canonicalPath: '/events/trade-show-expo',

    emoji: '🏢',
    heroTagline: 'TRADE SHOW & EXPO ACTIVATION',
    heroHeadline: <>The Trade Show Activation That <span className="text-[#fce4a6]">Draws the Biggest Crowd</span></>,
    heroSub: 'Stop competing for floor traffic. Combine Canada\'s first Roaming Robot Activation with our Aerial Booth to turn your booth into the event\'s most-visited destination — with branded photos putting your company name in every attendee\'s pocket. Built-in lead capture ensures every interaction becomes a qualified contact.',
    heroCTALabel: 'Check Availability',
    heroVideo: '/videos/robotaerialhero.mov',
    heroPoster: '/images/robot1.jpg',
    bronzePackageVideo: '/videos/robotherotradeshow.mov',
    bronzePackageVideoPoster: '/images/robot1.jpg',
    goldPackageVideo: '/videos/robotaerialhero.mov',
    goldPackageVideoPoster: '/images/robot1.jpg',
    platinumPackageVideo: null,
    urgencyText: 'Trade show dates are booking up',

    steps: [
      {
        title: 'Reserve Your Spot',
        desc: 'We start with a discovery call on your trade-show goals. Our team mentions what package would suit your tradeshow the best. Once booking is confirmed, our design team will reach out to you & begin the customization process to go hand in hand with your brand & ensure the products are as branded as they can be including the customized overlay filter on pictures.',
      },
      {
        title: 'We Set Up In Your Booth',
        desc: 'Our team arrives during exhibitor load-in, integrates the roaming robot and Aerial Booth into your booth layout, and has everything running before the show floor opens. The roaming robot needs no power hookup from the venue.',
      },
      {
        title: 'The Floor Comes to You',
        desc: 'Attendees from across the expo floor are drawn to your booth by the roaming robot and Aerial Booth. Every interaction is a qualified lead moment — and every branded photo keeps your company name alive in their phone after they leave.',
      },
    ],

    bronzePackageDisplayName: 'Robot Only',

    bronzeTitle: 'Robot Only',
    bronzeDesc: 'The standalone trade show activation — the fastest way to make your booth the busiest on the floor.',
    bronzeBenefits: [
      'Company branding and product imagery integrated into every photo overlay for instant brand recall',
      'Robot draws attendees to your booth from across the show floor — no passive waiting for walk-bys',
      'Instant photo delivery to attendee phones via SMS or Email — your brand in their pocket before they leave your booth. Attendees can scan a QR code and fill out a survey for lead capturing, which can later be imported as a .csv for your internal database records.',
      'Program custom voice to say a special message about the event or your brand before & after it takes a photo.',
      'Dedicated on-site operator runs the activation so your sales team can stay focused on conversations',
    ],

    goldPackageDisplayName: 'Robot and Aerial',
    goldTitle: 'Robot and Aerial',
    goldDesc: 'Pair the roaming robot with the Aerial Booth so your booth has movement on the floor and a branded photo destination inside the stand.',
    goldBenefits: [
      'Everything in Robot Only and Aerial Only, coordinated as one booth activation',
      'Roaming robot draws attention from the aisle while the Aerial Booth gives attendees a polished overhead photo moment',
      'Company branding, product imagery, and show messaging carried across both photo experiences',
      'Instant photo delivery via SMS or Email from both activations, with QR-led survey flows available for lead capture',
      'Two distinct content moments increase dwell time, share volume, and the number of qualified conversations at your booth',
      'Dedicated on-site operators manage both activations so your sales team can stay focused on conversations',
    ],

    platinumPackageDisplayName: 'Robot and Aerial + Photography',
    platinumTitle: 'Robot and Aerial + Photography',
    platinumDesc: 'Add professional event photography to the full robot and Aerial Booth activation so you leave with both attendee content and marketing assets.',
    platinumBenefits: [
      'Everything in Robot and Aerial, fully customised to your trade show booth',
      'Professional photographer documents your booth traffic, product demonstrations, and team in action',
      'High-quality imagery of your booth at peak crowd density — proof of attendance and engagement for stakeholders',
      'Coordinated content capture so robot activations, Aerial Booth portraits, and photography tell a unified brand story',
      'Full-resolution gallery delivered within ~1 week — ready for post-show email campaigns and follow-ups',
      'Full usage rights included — use in sales decks, case studies, and next year\'s show marketing materials',
    ],

    extraPackageColumn: {
      badge: 'Aerial Only',
      packageDisplayName: 'Aerial Only',
      title: 'Aerial Only',
      desc: 'The standalone trade show Aerial Booth — a full enclosed booth with overhead camera and pro lighting, styled to feel like part of your brand story on the floor.',
      benefits: [
        'Full Aerial Booth experience: guests step inside a real booth with interior wall panel colours customised to match your brand and booth design.',
        'Company branding integrated into every photo overlay for instant recall when attendees share their shots.',
        'Instant photo delivery to attendee phones via SMS or Email — the same fast handoff as our Roaming Robot Activation, included with this Aerial Booth-only package.',
        'Attendees can scan a QR code and fill out a survey for lead capturing, which can later be imported as a .csv for your internal database records.',
        'Dedicated on-site operator runs the activation so your team can stay focused on floor conversations.',
        'No custom voice lines — a clean, photo-first activation built around shareable aerial portraits.',
      ],
      packageVideo: '/videos/aerialtradeshow.mov',
      packageVideoPoster: '/images/tradeshow-gallery-1.png',
    },

    whySectionTitle: 'Why Exhibitors Choose Us',
    whySectionSub: 'The booth activation that draws the entire floor',
    whyCards: [
      {
        icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />,
        title: 'Biggest Crowd on the Floor',
        desc: 'A roaming robot and a trade-show Aerial Booth are two of the most visually distinctive draws on the floor. Attendees cross the hall to interact with the robot or step inside the booth for an overhead shot — and they bring colleagues. Your stand becomes the must-visit destination of the show.',
      },
      {
        icon: <FiShare2 className="w-5 h-5 md:w-6 md:h-6" />,
        title: 'Instant Brand Distribution',
        desc: 'Every attendee who gets a photo — from the roaming robot line or inside your Aerial Booth — leaves with your company name on their phone. They share it. Their industry contacts see it. Your brand reaches well beyond the show floor without any additional media spend.',
      },
      {
        icon: <FiTarget className="w-5 h-5 md:w-6 md:h-6" />,
        title: 'Lead Generation Built In',
        desc: 'Photo delivery via SMS and QR-led survey flows create natural moments to capture contact information across both activations. Every interaction is a warm lead — attendees who\'ve already engaged with your brand and have a positive memory attached to it.',
      },
      {
        icon: <FiShield className="w-5 h-5 md:w-6 md:h-6" />,
        title: 'No Venue Power Needed',
        desc: 'Trade show power drops are expensive and limiting. The roaming robot operates completely independently — no power outlets, no venue fees, no cables from that activation crossing your booth floor. Layer in an Aerial Booth when you want a second attention magnet attendees spot from across the expo hall.',
      },
      {
        icon: <FiImage className="w-5 h-5 md:w-6 md:h-6" />,
        title: 'Physical Branded Prints',
        desc: 'Offer physical printed photos at your booth — from the robot handoff or the Aerial Booth exit — branded with your company name and contact details. Attendees take them home. Your brand sits on their desk, not buried in a swag bag.',
      },
      {
        icon: <FiStar className="w-5 h-5 md:w-6 md:h-6" />,
        title: 'Fully Managed Activation',
        desc: 'Our operators manage every aspect of the roaming robot and Aerial Booth activations. Your sales team doesn\'t run the tech — they simply benefit from the steady stream of attendees both experiences deliver to your booth all day long.',
      },
    ],

    customTitle: 'Built Around Your Trade Show Booth & Company',
    customSub: 'Company branding, lead capture, roaming floor mode, and Aerial Booth custom finishes — all available',
    customCards: [
      {
        icon: <FiImage className="w-5 h-5" />,
        title: 'Company Branding & Product Overlays',
        desc: 'Custom photo overlays featuring your company logo and show-specific messaging — consistent on roaming robot captures and every Aerial Booth shot. Every image looks like a professional marketing asset, not an event snapshot. Attendees share it because it looks great.',
      },
      {
        icon: <FiZap className="w-5 h-5" />,
        title: 'Custom Voice Before & After Photos',
        desc: 'On the roaming robot, we program custom voice lines so it speaks a short message about your event or brand before the photo — and a second line right after the capture. Your Aerial Booth stays photo-first with no custom voice, so overhead portraits stay clean and fast-moving.',
      },
      {
        icon: <FiTrendingUp className="w-5 h-5" />,
        title: 'Roaming Expo Floor Mode',
        desc: 'Need to reach attendees beyond your booth perimeter? The robot can roam the broader show floor directing traffic back to your stand, while your Aerial Booth stays a bright anchor people spot from across the hall. Pre-approved by show organisers where required — the most proactive one-two on the floor.',
      },
    ],

    img1: '/images/tradeshow-gallery-1.png',
    img2: '/images/tradeshow-gallery-2.png',
    img3: '/images/tradeshow-gallery-3.png',
    img4: '/images/tradeshow-gallery-4.png',

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

    testimonialHighlights: [
      'Best for lead capture — built so every booth interaction from the Roaming Robot Activation or Aerial Booth can turn into a qualified contact for your sales team.',
      'We can roam the trade show or expo floor with our attendant on the robot, while your Aerial Booth anchors the stand — drawing far more leads than a static display alone.',
      'After the event we export every captured lead to CSV and send the full file to you so follow-up is immediate and organised.',
      'Completely brandable: your company branding on the Roaming Robot Activation and Aerial Booth, overlays, and digital delivery.',
      'We can dress and style the Roaming Robot Activation and customise your Aerial Booth wall panels to match your event\'s brand elements so every activation feels like part of your booth story.',
    ],

    videoTestimonials: [
      {
        src: '/videos/aerialtradeshow.mov',
        poster: '/images/tradeshow-gallery-1.png',
        caption: 'Aerial Booth at the show — overhead portraits, branded overlays, and a booth guests spot from across the floor.',
      },
      {
        src: '/videos/tradeshowtest2.mov',
        poster: '/images/robot1.jpg',
        caption: 'Real exhibitor activation: roaming engagement, branded moments, and leads you can export after the show.',
      },
    ],

    faqs: [
      {
        question: 'Do I need to get approval from the show organiser before booking?',
        answer: 'This depends on the specific show and venue. Many trade shows welcome interactive activations: the roaming robot is entirely self-contained with no power or WiFi requirements, and we can supply footprint, load-in, and safety notes for your Aerial Booth on request. We recommend checking with your show organiser early so both activations are cleared before build week.',
      },
      {
        question: 'Can the robot operate outside of our assigned booth footprint?',
        answer: 'In some shows, yes — the roaming floor mode allows the robot to move beyond your booth perimeter and direct floor traffic back to your stand. This requires prior approval from show management. Your Aerial Booth typically stays within the contracted footprint as the anchor people see from the aisle. Our team can advise on how to request roaming approval and what parameters are typically permitted.',
      },
      {
        question: 'How does the photo lead capture work?',
        answer: 'When attendees receive their photo via SMS from the roaming robot, their phone number is logged. Aerial Booth guests can use the same QR-led survey path for lead capture you run on the robot line. That creates a contact list of everyone who engaged with your booth activation. After the show we export those contacts to CSV and send the file to your team for CRM import and follow-up. Depending on your configuration and local privacy laws, you can incorporate opt-in messaging for follow-up marketing — we advise on compliant implementation.',
      },
      {
        question: 'Can the robot\'s messaging be updated between show days?',
        answer: 'Yes. If your show runs multiple days, we can update voice lines or overlay messaging between days to promote different products, announce a daily show special, or refresh the experience for repeat visitors. Aerial Booth overlay artwork and on-set messaging can be refreshed on the same cadence. This is particularly effective for longer expo runs.',
      },
      {
        question: 'What\'s the minimum booth size required for the robot to operate effectively?',
        answer: 'The robot can work in booths as small as a standard 10x10 inline space. For smaller booths, it can operate primarily within your booth footprint. For larger island or peninsula booths, it roams the perimeter and draws attention from a wider area. The Aerial Booth is planned against the same drawings — we confirm camera swing, wall panels, and guest flow so both experiences fit comfortably. Our team will assess your specific booth layout during the planning process.',
      },
      {
        question: 'How is the Aerial Booth planned for load-in and on-floor traffic?',
        answer: 'We map the Aerial Booth to your stand plan during booking: interior wall panel colours, branded overlays, lighting, and guest queueing so attendees move smoothly from the aisle into the set. Dedicated operators manage capture and delivery just like the roaming robot line. If you run both activations, we coordinate timing so neither queue blocks your sales conversations.',
      },
    ],

    finalHeadline: <>Have the Most Visited Booth <span className="text-[#fce4a6]">at Your Next Expo.</span></>,
    finalSub: 'Stop blending in. Roaming Robot Activation and Aerial Booth builds make your booth the one everyone\'s talking about.',
    quoteCTALabel: 'Check Availability & Get a Quote',
    modalTitle: 'Get a Trade Show Quote',
    eventTypeName: 'Trade Show & Expo',
    ...overrides,
  }
}
