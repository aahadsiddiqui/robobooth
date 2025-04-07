import Head from 'next/head'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24">
      <Head>
        <title>Privacy Policy - Robo Booth</title>
        <meta name="description" content="Privacy Policy for Robo Booth photo booth services" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-600">
              Robo Booth ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our photo booth services or visit our website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Name and contact information</li>
              <li>Event details and preferences</li>
              <li>Photos and videos taken during events</li>
              <li>Payment information</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide and improve our photo booth services</li>
              <li>Process your bookings and payments</li>
              <li>Send you event-related communications</li>
              <li>Share photos and videos as requested</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Service providers who assist in our operations</li>
              <li>Event organizers as necessary</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to improve your browsing experience on our website. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p className="text-gray-600">
              We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this privacy policy or our practices, please contact us at:
            </p>
            <div className="mt-4 text-gray-600">
              <p>Email: info@robobooth.ca</p>
              <p>Phone: 647-877-7699</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
} 