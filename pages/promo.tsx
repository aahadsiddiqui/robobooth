import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AuroraHero } from '../components/AuroraHero';
import TerminalContact from '../components/TerminalContact';
import DragShuffleHero from '../components/DragShuffleHero';

export default function PromoLanding() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const gallery = [
    { type: 'video', src: "/videos/vid3.mp4", alt: "360 Photo Booth Video 3" },
    { type: 'video', src: "/videos/vid.mp4", alt: "360 Photo Booth Video 1" },
    { type: 'video', src: "/videos/vid2.mp4", alt: "360 Photo Booth Video 2" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <>
      <Head>
        <title>Special Offer - Robo Booth Photo Experience</title>
        <meta name="description" content="Transform your event with our AI-powered Robo Photo Booth and 360° Photo Experience" />
      </Head>

      <main className="bg-gray-950 overflow-x-hidden">
        <AuroraHero />

        {/* Photo Gallery Section */}
        <section id="gallery" className="py-12 md:py-16 w-full">
          <div className="max-w-[1400px] mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-8 text-white"
            >
              Our Gallery
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
            >
              {gallery.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedImage(index)}
                  className="relative aspect-[1/1] md:aspect-[16/9] cursor-pointer rounded-xl overflow-hidden bg-black shadow-lg"
                >
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="book-now" className="py-20 px-4 bg-gradient-to-r from-purple-900 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-20"></div>
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Book Your Experience</h2>
              <p className="text-xl text-gray-200">Get 20% off your first booking!</p>
            </motion.div>

            <TerminalContact />
          </div>
        </section>

        {/* Testimonials Section */}
        <DragShuffleHero />

        {/* Modal Section */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative w-full max-w-5xl aspect-[16/9]"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={gallery[selectedImage].src}
                  className="w-full h-full object-contain bg-black rounded-lg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-10 right-0 text-white text-xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/75"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

const testimonials = [
  {
    name: "Sarah Johnson",
    event: "Wedding Celebration",
    quote: "The 360° booth was the highlight of our wedding! Our guests couldn't stop talking about it."
  },
  {
    name: "Mike Chen",
    event: "Corporate Event",
    quote: "Professional service and amazing quality. The team went above and beyond."
  },
  {
    name: "Emma Davis",
    event: "Birthday Party",
    quote: "Best decision ever! The photos and videos were absolutely stunning."
  }
]; 