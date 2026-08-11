import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const sections = [
  {
    title: '1. Introduction',
    body: 'Robo Booth ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our photo booth services or visit our website.',
  },
  {
    title: '2. Information We Collect',
    body: 'We collect information that you provide directly to us, including:',
    list: [
      'Name and contact information',
      'Event details and preferences',
      'Photos and videos taken during events',
      'Payment information',
      'Communication preferences',
    ],
  },
  {
    title: '3. How We Use Your Information',
    body: 'We use the collected information to:',
    list: [
      'Provide and improve our photo booth services',
      'Process your bookings and payments',
      'Send you event-related communications',
      'Share photos and videos as requested',
      'Improve our website and services',
      'Comply with legal obligations',
    ],
  },
  {
    title: '4. Data Sharing and Disclosure',
    body: 'We do not sell your personal information. We may share your information with:',
    list: [
      'Service providers who assist in our operations',
      'Event organizers as necessary',
      'Legal authorities when required by law',
    ],
  },
  {
    title: '5. Your Rights',
    body: 'You have the right to:',
    list: [
      'Access your personal data',
      'Correct inaccurate data',
      'Request deletion of your data',
      'Object to data processing',
      'Request data portability',
    ],
  },
  {
    title: '6. Data Security',
    body: 'We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.',
  },
  {
    title: '7. Cookies and Tracking',
    body: 'We use cookies and similar tracking technologies to improve your browsing experience on our website. You can control cookie settings through your browser preferences.',
  },
  {
    title: '8. Children\'s Privacy',
    body: 'We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.',
  },
  {
    title: '9. Changes to This Policy',
    body: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.',
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Head>
        <title>Privacy Policy - Robo Booth</title>
        <meta name="description" content="Privacy Policy for Robo Booth photo booth services in Toronto and the GTA." />
        <meta property="og:title" content="Privacy Policy - Robo Booth" />
        <meta property="og:description" content="How Robo Booth collects, uses, and protects your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://robobooth.ca/privacy-policy" />
        <link rel="canonical" href="https://robobooth.ca/privacy-policy" />
      </Head>

      <Navbar />

      <section className="relative pt-24 md:pt-28 pb-12 md:pb-16 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#fce4a618_0%,_transparent_55%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-10"
          >
            <p className="text-[#fce4a6]/70 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Legal
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3">
              Privacy <span className="text-[#fce4a6]">Policy</span>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
              How we handle your information when you book with us or use our website.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/[0.04] border border-[#fce4a6]/20 rounded-3xl p-6 md:p-10 shadow-xl shadow-black/40"
          >
            <p className="text-white/40 text-xs md:text-sm mb-8 pb-6 border-b border-white/10">
              Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <motion.div className="space-y-10 md:space-y-12">
              {sections.map((section, i) => (
                <section key={section.title}>
                  <h2 className="text-lg md:text-xl font-bold text-[#fce4a6] mb-3">{section.title}</h2>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">{section.body}</p>
                  {section.list && (
                    <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-[#fce4a6]/60">
                      {section.list.map((item) => (
                        <li key={item} className="text-white/70 text-sm md:text-base leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <section>
                <h2 className="text-lg md:text-xl font-bold text-[#fce4a6] mb-3">10. Contact Us</h2>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                  If you have any questions about this privacy policy or our practices, please contact us:
                </p>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2 text-sm md:text-base">
                  <p>
                    <span className="text-white/50">Email: </span>
                    <a href="mailto:info@robobooth.ca" className="text-[#fce4a6] hover:text-white transition-colors">
                      info@robobooth.ca
                    </a>
                  </p>
                  <p>
                    <span className="text-white/50">Phone: </span>
                    <a href="tel:289-301-4039" className="text-[#fce4a6] hover:text-white transition-colors">
                      289-301-4039
                    </a>
                  </p>
                </div>
              </section>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-8 text-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#fce4a6] hover:text-white transition-colors"
            >
              Questions? Get in touch →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
