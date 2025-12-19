import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowDownCircle } from 'react-icons/fi';

export const VideoHero = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            >
                <source src="/videos/robobooth.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
                >
                    Canada's First <br />
                    <span className="text-[#fce4a6]">Robot</span> Photo Booth
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-white/90 max-w-2xl mb-10 font-light"
                >
                    Experience the future of event photography. Interactive, engaging, and unforgettable.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#fce4a6] text-black rounded-full font-bold text-lg tracking-wide overflow-hidden transition-transform hover:scale-105"
                    >
                        <span className="relative z-10">Get Started</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <FiArrowDownCircle className="text-4xl text-[#fce4a6] animate-bounce" />
                </motion.div>
            </div>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />
        </div>
    );
};
