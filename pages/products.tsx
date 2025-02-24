import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Head from 'next/head';

interface Product {
  id: number;
  name: string;
  description: string;
  media: Array<{
    type: 'image' | 'video';
    src: string;
    thumbnail?: string;
    isComingSoon?: boolean;
  }>;
  features: string[];
  details: {
    description: string[];
    specs: Array<{ label: string; value: string }>;
    highlights: Array<{ icon: string; title: string; description: string }>;
  };
}

const products: Product[] = [
  {
    id: 1,
    name: "Robo Photo Booth",
    description: "An innovative, AI-powered photo booth that creates unforgettable moments with automated positioning and perfect shots every time.",
    media: [
      { 
        type: 'video',
        src: "/videos/Robobooth.mp4",
        isComingSoon: true 
      }
    ],
    features: [
      "AI-powered automatic positioning",
      "Professional lighting system",
      "Instant social media sharing",
      "Customizable filters and effects",
      "Touch-screen interface"
    ],
    details: {
      description: [
        "Experience the future of photo booths with our AI-powered Robo Photo Booth.",
        "Perfect for any event, from weddings to corporate gatherings.",
        "Automated positioning ensures everyone looks their best in every shot."
      ],
      specs: [
        { label: "Dimensions", value: "6ft x 4ft x 8ft" },
        { label: "Setup Time", value: "30 minutes" },
        { label: "Power Requirements", value: "Standard 110V outlet" }
      ],
      highlights: [
        { 
          icon: "🤖",
          title: "AI-Powered",
          description: "Smart positioning and automatic adjustments for perfect shots"
        },
        {
          icon: "💡",
          title: "Pro Lighting",
          description: "Studio-quality lighting system that adapts to the environment"
        },
        {
          icon: "🎨",
          title: "Custom Themes",
          description: "Fully customizable themes and branding options"
        }
      ]
    }
  },
  {
    id: 2,
    name: "360 Photo Booth",
    description: "Create stunning 360-degree videos and photos with our state-of-the-art rotating platform and professional-grade camera system.",
    media: [
      { type: 'video', src: "/videos/IMG_1162.mp4", thumbnail: "/images/IMG_1167.jpg" },
      { type: 'video', src: "/videos/IMG_1202.mp4", thumbnail: "/images/IMG_1170.jpg" },
      { type: 'image', src: "/images/IMG_1167.jpg" },
      { type: 'image', src: "/images/IMG_1170.jpg" },
      { type: 'image', src: "/images/IMG_1188.jpg" },
    ],
    features: [
      "Smooth 360° rotation",
      "High-speed camera capture",
      "Customizable lighting effects",
      "Instant video rendering",
      "Social media integration"
    ],
    details: {
      description: [
        "Transform any event into a viral sensation with our 360° Photo Booth experience.",
        "Capture stunning slow-motion moments from every angle.",
        "Perfect for red carpet events, weddings, and brand activations."
      ],
      specs: [
        { label: "Platform Size", value: "4ft diameter" },
        { label: "Max Weight", value: "400 lbs" },
        { label: "Video Quality", value: "4K 60fps" }
      ],
      highlights: [
        {
          icon: "🎥",
          title: "Cinematic Quality",
          description: "Professional-grade cameras and smooth motion control"
        },
        {
          icon: "⚡",
          title: "Instant Share",
          description: "Immediate social media sharing with custom branding"
        },
        {
          icon: "✨",
          title: "Special Effects",
          description: "Add slow-motion, music, and visual effects to your videos"
        }
      ]
    }
  }
];

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroHovered, setHeroHovered] = useState(false);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => 
      prev === selectedProduct.media.length - 1 ? 0 : prev + 1
    );
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => 
      prev === 0 ? selectedProduct.media.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [selectedProduct]);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: Event) => {
      touchStartX = (e as TouchEvent).touches[0].clientX;
    };

    const handleTouchEnd = (e: Event) => {
      touchEndX = (e as TouchEvent).changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
          prevMedia();
        } else {
          nextMedia();
        }
      }
    };

    const element = document.querySelector('.media-gallery');
    if (element) {
      element.addEventListener('touchstart', handleTouchStart as EventListener);
      element.addEventListener('touchend', handleTouchEnd as EventListener);

      return () => {
        element.removeEventListener('touchstart', handleTouchStart as EventListener);
        element.removeEventListener('touchend', handleTouchEnd as EventListener);
      };
    }
  }, [prevMedia, nextMedia]);

  return (
    <>
      <Head>
        <title>Our Products - Photo Booth</title>
        <meta name="description" content="Explore our innovative photo booth solutions" />
      </Head>

      <div className="min-h-screen bg-white pt-24">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text"
          >
            Our Products
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                {products.map((product) => (
                  <motion.button
                    key={product.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full p-4 mb-4 rounded-lg transition-all ${
                      selectedProduct.id === product.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentMediaIndex(0);
                    }}
                  >
                    {product.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Display */}
            <div className="lg:w-3/4">
              <motion.div
                key={selectedProduct.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              >
                <h2 className="text-3xl font-bold mb-6 text-gray-800">{selectedProduct.name}</h2>
                
                {/* Media Gallery */}
                <div className="relative aspect-video mb-8 rounded-lg overflow-hidden shadow-lg bg-gray-100">
                  <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentMediaIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                      >
                        {selectedProduct.media[currentMediaIndex].type === 'video' ? (
                          <video
                            ref={videoRef}
                            src={selectedProduct.media[currentMediaIndex].src}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <Image
                            src={selectedProduct.media[currentMediaIndex].src}
                            alt={`${selectedProduct.name} preview`}
                            fill
                            className="object-cover"
                          />
                        )}

                        {/* Coming Soon Overlay */}
                        {selectedProduct.media[currentMediaIndex].isComingSoon && (
                          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                              <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="text-4xl md:text-6xl font-bold mb-4"
                              >
                                Coming Soon
                              </motion.div>
                              <p className="text-center px-4">
                                Preview our revolutionary Robo Photo Booth
                                <br />
                                <span className="text-purple-300">Available for booking soon!</span>
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {selectedProduct.media.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentMediaIndex 
                              ? 'bg-white w-6' 
                              : 'bg-white/50 hover:bg-white'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Touch-friendly Navigation Arrows */}
                    {selectedProduct.media.length > 1 && (
                      <>
                        <button
                          onClick={prevMedia}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-4 text-white/75 hover:text-white"
                          aria-label="Previous"
                        >
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextMedia}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-4 text-white/75 hover:text-white"
                          aria-label="Next"
                        >
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-12">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Overview</h3>
                    <div className="space-y-4">
                      {selectedProduct.details.description.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-600">{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {selectedProduct.details.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                      >
                        <div className="text-4xl mb-4">{highlight.icon}</div>
                        <h4 className="text-xl font-semibold mb-2 text-gray-800">{highlight.title}</h4>
                        <p className="text-gray-600">{highlight.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Specifications */}
                  <div className="my-16">
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl font-semibold mb-8 text-gray-800 border-b pb-4"
                    >
                      Technical Specifications
                    </motion.h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      {selectedProduct.details.specs.map((spec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                          }}
                          className="bg-white p-6 rounded-xl border border-gray-100 transition-all cursor-pointer"
                        >
                          <motion.div 
                            initial={{ scale: 0.9 }}
                            whileHover={{ scale: 1.1 }}
                            className="text-sm text-purple-600 font-medium mb-2"
                          >
                            {spec.label}
                          </motion.div>
                          <motion.div 
                            className="text-2xl font-bold text-gray-800"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {spec.value}
                          </motion.div>
                          <div className="mt-2 h-1 w-12 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedProduct.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <span className="text-purple-600">✓</span>{' '}
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 