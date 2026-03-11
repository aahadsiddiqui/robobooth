import React from 'react'
import EventPageLayout, { EventPageProps } from '../../components/EventPageLayout'
import { FiImage, FiShare2, FiStar, FiUsers, FiZap, FiShield, FiTarget, FiTrendingUp } from 'react-icons/fi'

const props: EventPageProps = {
  seoTitle: 'Product Launch Photobooth Toronto GTA | Robo Booth',
  seoDescription: 'Make your product launch unforgettable with Canada\'s first Robot Photobooth. Branded content delivered to every guest in real-time. Serving Toronto & GTA.',
  canonicalPath: '/events/product-launch',

  emoji: '🚀',
  heroTagline: 'PRODUCT LAUNCH ACTIVATION',
  heroHeadline: <>Make Your Product Launch <span className="text-[#fce4a6]">Impossible to Ignore</span></>,
  heroSub: 'Canada\'s first Robot Photobooth turns your launch into a live, shareable moment. Your product name and logo on every photo — in every guest\'s hand before the night ends.',
  heroCTALabel: 'Check Availability',
  heroVideo: '/videos/equifaxrobot.mov',
  heroPoster: '/images/robot1.jpg',
  urgencyText: 'Launch dates are filling fast',

  steps: [
    {
      title: 'Brief Us',
      desc: 'Share your product, brand guidelines, and event date. We build a fully custom activation — overlays, voice lines, and branded print templates — around your launch.',
    },
    {
      title: 'We Set Up Fully Branded',
      desc: 'Our team arrives early, styles the robot to match your campaign, and has everything operational before your first guest walks in. No venue power or WiFi required.',
    },
    {
      title: 'Your Product Trends in Real-Time',
      desc: 'The robot roams your launch floor, engaging guests and delivering branded photos instantly to every phone. Your product is in hundreds of feeds before the night is done.',
    },
  ],

  bronzeTitle: 'Robot Photobooth Only',
  bronzeDesc: 'The standalone product launch activation — branded, roaming, and fully managed.',
  bronzeBenefits: [
    'Fully branded photo overlay featuring your product name and campaign artwork',
    'Roaming robot engages every corner of your launch floor — no fixed booth footprint',
    'Instant digital delivery to every guest\'s phone via SMS or QR code',
    'Custom branded voice lines announce your product with every capture',
    'Dedicated on-site operator manages the activation start to finish',
  ],

  goldTitle: 'Robot Photobooth + Event Photography',
  goldDesc: 'Capture every launch moment from two unforgettable perspectives.',
  goldBenefits: [
    'Everything in the Bronze Package, fully customized to your launch',
    'Professional event photographer documents your product reveal and crowd reaction',
    'Hero shots of your product in use — ready for press releases and campaign assets',
    'Coordinated shooting so robot content and photography tell a cohesive brand story',
    'Full-resolution image gallery delivered within 48 hours of your event',
    'Usage rights included — deploy across social, paid ads, and PR with no restrictions',
  ],

  platinumDesc: 'The ultimate launch floor — add a 360 Booth, Aerial Booth, or Premium Photobooth for maximum brand saturation.',
  platinumBenefits: [
    'Everything in the Gold Package at scale',
    'Second activation station — 360 Booth, Aerial Booth, or Premium Photobooth — your choice',
    'Multiple touchpoints keep guests engaged across every zone of your launch venue',
    'Consistent branding across all booths creates a seamless, campaign-wide visual identity',
    'Higher content volume means more organic posts and a longer social media tail',
    'White-glove concierge coordination — one point of contact manages the entire floor',
  ],

  whySectionTitle: 'Why Brands Choose Us',
  whySectionSub: 'The activation that makes your launch the most talked-about in the room',
  whyCards: [
    {
      icon: <FiShare2 className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Instant Brand Reach',
      desc: 'Every photo is branded and delivered to guest phones in seconds. Your product name is in hundreds of social feeds before your launch event wraps.',
    },
    {
      icon: <FiUsers className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Roaming Guest Engagement',
      desc: 'The robot moves through your crowd rather than waiting for guests to come to it — ensuring maximum interaction and brand impressions across your entire event floor.',
    },
    {
      icon: <FiZap className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Custom Product Voice Lines',
      desc: 'We script and program voice lines that announce your product name and key messages with every photo capture — turning each interaction into a brand moment.',
    },
    {
      icon: <FiShield className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Zero Venue Requirements',
      desc: 'No power hookup. No WiFi. No floor space for a permanent booth. The robot operates completely independently, so your venue layout stays exactly as planned.',
    },
    {
      icon: <FiImage className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'Campaign-Ready Content',
      desc: 'Every branded photo doubles as marketing collateral. Collect a library of authentic launch-day content you can repurpose in ads, press kits, and post-launch campaigns.',
    },
    {
      icon: <FiStar className="w-5 h-5 md:w-6 md:h-6" />,
      title: 'White-Glove Service',
      desc: 'From pre-event briefing to on-site operation to post-event content handoff, our team handles every detail so your team can focus on the launch itself.',
    },
  ],

  customTitle: 'Built Around Your Launch',
  customSub: 'Every detail tailored to your product and campaign',
  customCards: [
    {
      icon: <FiImage className="w-5 h-5" />,
      title: 'Product Branding & Overlays',
      desc: 'Custom photo overlays designed around your product packaging, campaign colours, and launch theme. Every photo looks like it was produced by your marketing team.',
    },
    {
      icon: <FiZap className="w-5 h-5" />,
      title: 'Custom Voice Campaign Messaging',
      desc: 'Script your own voice lines — product taglines, launch date countdowns, campaign slogans — delivered by the robot at every interaction. A speaking brand activation.',
    },
    {
      icon: <FiTarget className="w-5 h-5" />,
      title: 'Multi-Booth Launch Floor',
      desc: 'Running a large launch event? Stack multiple activation stations across your venue. We coordinate branding, timing, and staffing across every booth so the experience is seamless.',
    },
  ],

  img1: '/images/robotbell.jpg',
  img2: '/images/robottd.jpg',
  img3: '/images/robot1.jpg',
  img4: '/images/robothalloween.JPG',

  testimonials: [
    {
      name: 'Priya M.',
      role: 'Brand Marketing Manager, CPG Company',
      text: 'We needed something that would make our product launch feel different from every other launch event guests had attended. The Robo Booth did exactly that — people were posting photos before we even got to the keynote. Our product name was everywhere online that night.',
    },
    {
      name: 'Daniel K.',
      role: 'VP Marketing, Tech Startup',
      text: 'The branded overlays were on-point and the custom voice lines were a genuine crowd moment. Our guests loved hearing the product name announced every time the robot captured a photo. The content we collected from that night is still running in our paid campaigns three months later.',
    },
    {
      name: 'Sandra L.',
      role: 'Events Director, Consumer Brand',
      text: 'I\'ve managed over 50 product launch events and this was the first activation that made the robot the most photographed thing in the room — more than the product itself. And every one of those photos had our brand all over it. Couldn\'t ask for more.',
    },
  ],

  faqs: [
    {
      question: 'How far in advance should I book for a product launch?',
      answer: 'We recommend booking at least 4–6 weeks in advance to allow enough time for custom overlay design, voice line scripting, and brand approval. For major launches, 8+ weeks is ideal. That said, if your launch date is sooner, contact us — we may be able to accommodate rush bookings.',
    },
    {
      question: 'Can the photo overlay match our exact campaign artwork and brand guidelines?',
      answer: 'Absolutely. Our design team works from your brand kit, campaign assets, and product packaging to create overlays that look like they came straight from your marketing department. We share a proof before the event and make revisions until it\'s exactly right.',
    },
    {
      question: 'What are the custom voice lines and how do they work?',
      answer: 'The robot announces a scripted message with every photo capture — your product name, a campaign slogan, or a launch tagline. You provide the script, we program and test it before the event. It\'s one of the biggest crowd moments of the night.',
    },
    {
      question: 'Does the robot need WiFi or a power outlet to operate?',
      answer: 'No. The robot is fully self-contained — it operates on battery and delivers photos to guest phones via its own data connection. Your venue doesn\'t need to provide anything. This also means it can roam freely without being tethered to any location.',
    },
    {
      question: 'Can we use the photos from the event in our marketing campaigns?',
      answer: 'Yes. All photos captured during your event belong to you with full usage rights. Many of our clients repurpose launch-night content in social media ads, email campaigns, press releases, and sales decks. The Gold and Platinum packages also include professional photography for even more campaign-ready assets.',
    },
  ],

  finalHeadline: <>Your Product Launch Should <span className="text-[#fce4a6]">Go Viral.</span></>,
  finalSub: 'Join Toronto\'s top brands that use Robo Booth to make their launches the talk of the industry.',
  quoteCTALabel: 'Check Availability & Get a Quote',
  modalTitle: 'Get a Product Launch Quote',
  eventTypeName: 'Product Launch',
}

export default function ProductLaunchPage() {
  return <EventPageLayout {...props} />
}
