import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiTarget, FiTrendingUp } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Retail Pop-Up Photobooth Toronto GTA | Robo Booth',
  seoDescription: 'Turn your retail pop-up into a viral destination with Canada\'s first Robot Photobooth. Drive foot traffic and branded content. Serving Toronto & GTA.',
  canonicalPath: '/events/retail-pop-up',

  emoji: '🏪',
  heroTagline: 'RETAIL POP-UP ACTIVATION',
  heroHeadline: <>Turn Your Pop-Up Into a <span className="text-[#fce4a6]">Destination</span></>,
  heroSub: 'Drive foot traffic, create shareable content, and leave every shopper with a branded memory. Canada\'s first Robot Photobooth makes your pop-up the place people have to visit.',
  heroCTALabel: 'Check Availability',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Pop-up dates are limited',

  steps: [
    {
      title: 'Share Your Store Concept',
      desc: 'Tell us your brand, collection, and pop-up dates. We design custom photo overlays that match your in-store aesthetic and create a shopper experience that feels native to your brand.',
    },
    {
      title: 'We Arrive & Set Up',
      desc: 'Our team sets up and fully brands the robot before your doors open. No floor space lost to a permanent booth — the robot roams freely through your space, drawing foot traffic naturally.',
    },
    {
      title: 'Shoppers Become Brand Ambassadors',
      desc: 'Every shopper who interacts with the robot gets a branded photo delivered instantly to their phone. They share it. Their followers see your store. New foot traffic walks through your door.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'The standalone in-store activation — roaming, branded, and fully managed.',
  bronzeBenefits: [
    'Branded photo overlay designed around your store aesthetic, collection, and seasonal campaign',
    'Roaming robot turns your entire pop-up floor into an interactive brand experience',
    'Instant digital delivery to shoppers\' phones — branded content in their camera roll in seconds',
    'Custom voice lines tie in your brand name, collection, or promotional messaging',
    'Dedicated on-site operator so your staff can focus entirely on sales and customer service',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Capture every pop-up moment from two unforgettable perspectives.',
  goldBenefits: [
    'Everything in the Bronze Package, tailored to your retail pop-up',
    'Professional photographer captures the energy of your store — product, space, and shoppers',
    'Hero lifestyle imagery of your collection in a real retail environment — no expensive studio needed',
    'Coordinated capture so robot content and photography create a consistent brand narrative',
    'Full-resolution gallery delivered within 48 hours — ready for e-commerce, social, and lookbooks',
    'Full usage rights included — use across your website, ads, and email campaigns without restriction',
  ],

  platinumDesc: 'The ultimate pop-up floor — add a 360 Booth or Premium Photobooth to make your store the most talked-about destination in the city.',
  platinumBenefits: [
    'Everything in the Gold Package scaled for a larger retail activation',
    'Second activation station — 360 Booth or Premium Photobooth — creating multiple content moments',
    'Multiple touchpoints keep shoppers exploring your store longer, increasing average dwell time',
    'Consistent brand identity across every activation station for a cohesive in-store experience',
    'Higher organic content volume multiplies your social reach without any additional ad spend',
    'White-glove coordination — we manage every activation so your team stays focused on sales',
  ],

  whySectionTitle: 'Why Pop-Ups Choose Us',
  whySectionSub: 'The activation that turns shoppers into brand ambassadors',
  whyCards: [
    {
      icon: <FiTrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Drives Organic Foot Traffic',
      desc: 'When shoppers post their branded photos, their followers see your pop-up. Organic reach from a single event can drive new foot traffic throughout your entire pop-up run.',
    },
    {
      icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Roaming In-Store Engagement',
      desc: 'The robot moves through your pop-up space, drawing attention and extending how long shoppers stay in your store — giving your team more time to convert browsers into buyers.',
    },
    {
      icon: <FiImage className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Branded Every Shot',
      desc: 'Every photo carries your store name, collection branding, or seasonal campaign artwork. Your brand travels home in every shopper\'s camera roll and lives on in their social posts.',
    },
    {
      icon: <FiShield className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'No Venue Requirements',
      desc: 'No power outlets, no WiFi needed, no heavy booth equipment eating up your precious floor space. The robot operates independently, leaving your store layout exactly as designed.',
    },
    {
      icon: <FiShare2 className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Shareable Content on the Spot',
      desc: 'Shoppers receive their branded photo instantly via SMS or QR code. The frictionless delivery means they\'re posting before they\'ve even left your store.',
    },
    {
      icon: <FiStar className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Fully Managed',
      desc: 'Our operator handles everything — from setup to shopper interactions to teardown. Your staff doesn\'t lift a finger, and the activation runs flawlessly from open to close.',
    },
  ],

  customTitle: 'Built Around Your Store',
  customSub: 'Every detail tailored to your brand and collection',
  customCards: [
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Collection Branding & Overlays',
      desc: 'Custom photo overlays designed around your current collection, seasonal campaign, or store aesthetic. Every photo looks like a polished marketing asset, not an event candid.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Custom Promotional Voice Messaging',
      desc: 'Program the robot to announce your store name, current promotion, or new collection drop with every photo. A talking brand touchpoint that shoppers remember and share.',
    },
    {
      icon: <FiTarget className="w-5 h-5" />,
      title: 'Multi-Day Pop-Up Programming',
      desc: 'Running a multi-day pop-up? We can refresh branding between days, swap overlays to promote different collections, or scale up with additional activation stations as traffic grows.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Chloe R.',
      role: 'Founder, Apparel Brand',
      text: 'Our pop-up had lineups out the door for the first time ever. People were coming specifically because they\'d seen the robot photos posted by their friends. The branded content from that one weekend is still generating saves and profile visits. Worth every penny.',
    },
    {
      name: 'Marcus T.',
      role: 'Head of Retail, Consumer Brand',
      text: 'We\'ve done influencer gifting, paid ads, everything — nothing drove foot traffic to our pop-up like this. Having a roaming robot in the store made the whole thing feel like an event rather than just a shop. Shoppers stayed longer and spent more.',
    },
    {
      name: 'Jasmine W.',
      role: 'Pop-Up Event Manager',
      text: 'The photo overlays matched our brand perfectly — I was honestly surprised how accurately they nailed our aesthetic from just the brand brief we sent. And the operator handled everything so my team could focus on selling. This is now our standard pop-up setup.',
    },
  ],

  faqs: [
    {
      question: 'Can the robot work in a small retail pop-up space?',
      answer: 'Yes. The robot is designed to navigate retail environments — it can work in compact spaces and naturally draws shoppers to it. Our team will assess your floor plan in advance to ensure the activation integrates seamlessly with your layout without blocking merchandise.',
    },
    {
      question: 'Will the photo overlay match my store\'s branding and current collection?',
      answer: 'Absolutely. Our design team creates overlays from your brand kit, seasonal campaign visuals, or product imagery. We share a proof for your approval before the event and will revise until it perfectly matches your aesthetic.',
    },
    {
      question: 'Can the robot promote a specific product or sale during the activation?',
      answer: 'Yes. The custom voice lines can promote any specific product, highlight a sale, announce a collection drop, or deliver any message you want shoppers to hear. You write the script, we program and test it before your doors open.',
    },
    {
      question: 'How do shoppers receive their photos?',
      answer: 'Photos are delivered instantly via SMS text message or QR code scan. There\'s no app to download and no delay — shoppers have their branded photo in hand within seconds of the capture, making it extremely easy for them to post immediately.',
    },
    {
      question: 'Can we book the robot for a multi-day pop-up run?',
      answer: 'Yes, we offer multi-day bookings for pop-up runs of any length. We can keep the same branding across all days or refresh overlays and messaging to promote different collections or promotions on different days. Contact us for multi-day pricing.',
    },
  ],

  finalHeadline: <>Make Your Pop-Up the <span className="text-[#fce4a6]">Most Talked-About in the City.</span></>,
  finalSub: 'Let\'s build a branded in-store experience that shoppers can\'t stop sharing.',
  quoteCTALabel: 'Check Availability & Get a Quote',
  modalTitle: 'Get a Retail Pop-Up Quote',
  eventTypeName: 'Retail Pop-Up',
}

export default function RetailPopUpPage() {
  return <EventPageLayout {...props} />
}
