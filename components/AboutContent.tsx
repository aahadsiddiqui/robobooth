import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiStar, FiHeart } from 'react-icons/fi';

export const AboutContent = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Unique Animated Background Element */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                            x: [0, 50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fce4a6]/20 rounded-full blur-[120px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black z-10" />
                </div>

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block text-[#fce4a6] font-bold tracking-[0.3em] uppercase mb-6"
                    >
                        Our Story
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black mb-8 leading-tight"
                    >
                        Canada's First <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fce4a6] to-[#a49056]">
                            Robot Photobooth & Aerial Booth
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/70 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-10"
                    >
                        We're redefining event entertainment by bringing technology and human interaction together in a way that's never been seen before in Canada.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <a
                            href="/contact"
                            className="inline-block bg-[#fce4a6] text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors shadow-xl"
                        >
                            Book Your Experience
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* The Vision Section */}
            <section className="py-32 px-4 bg-white text-black">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                            More Than Just <br />A Photobooth.
                        </h2>
                        <p className="text-black/70 text-lg mb-6 leading-relaxed">
                            Founded in Toronto, Robo Booth was born from a simple idea: why should guests have to find the photobooth? Why can't the photobooth find the guests?
                        </p>
                        <p className="text-black/70 text-lg mb-10 leading-relaxed">
                            Our roaming robots are designed to break the ice, create laughter, and capture those spontaneous, candid moments that traditional stationary booths often miss.
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="block text-4xl font-black text-[#a49056] mb-2">1st</span>
                                <span className="text-sm text-black/50 uppercase tracking-widest font-bold">In Canada</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-black text-[#a49056] mb-2">100%</span>
                                <span className="text-sm text-black/50 uppercase tracking-widest font-bold">Interactive</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative grid grid-cols-2 gap-4"
                    >
                        <div className="space-y-4">
                            <img
                                src="/images/aerial-booth-1.png"
                                alt="Aerial Booth Experience"
                                className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                            />
                            <img
                                src="/images/robo-booth-1.jpg"
                                alt="Robot Photobooth Experience"
                                className="rounded-2xl shadow-2xl w-full h-48 object-cover"
                            />
                        </div>
                        <div className="space-y-4 pt-8">
                            <img
                                src="/images/robo-booth-2.jpg"
                                alt="Robot Photobooth Experience"
                                className="rounded-2xl shadow-2xl w-full h-48 object-cover"
                            />
                            <img
                                src="/images/aerial-booth-2.png"
                                alt="Aerial Booth Experience"
                                className="rounded-2xl shadow-2xl w-full h-64 object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 px-4 bg-black relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#fce4a6] rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a49056] rounded-full blur-[150px]" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">Our Core Values</h2>
                        <p className="text-white/50 text-xl max-w-2xl mx-auto">The principles that drive every event we attend.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FiStar className="w-8 h-8" />,
                                title: "Innovation",
                                desc: "We constantly push the boundaries of what's possible in event technology."
                            },
                            {
                                icon: <FiUsers className="w-8 h-8" />,
                                title: "Connection",
                                desc: "Our goal is to bring people together through shared, memorable experiences."
                            },
                            {
                                icon: <FiHeart className="w-8 h-8" />,
                                title: "Excellence",
                                desc: "From DSLR quality to professional service, we never compromise on quality."
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:border-[#fce4a6]/30 transition-all group"
                            >
                                <div className="w-16 h-16 bg-[#fce4a6]/10 rounded-2xl flex items-center justify-center text-[#fce4a6] mb-8 group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                                <p className="text-white/60 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden h-[400px]"
                        >
                            <img
                                src="/images/corporate1.JPG"
                                alt="Corporate Event Robot"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden h-[400px]"
                        >
                            <img
                                src="/images/wedding1.jpg"
                                alt="Wedding Event Robot"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-32 px-4 bg-[#fce4a6] text-black">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <FiTarget className="w-16 h-16 mx-auto mb-8 text-black/20" />
                        <h2 className="text-4xl md:text-6xl font-black mb-8">Our Mission</h2>
                        <p className="text-2xl md:text-4xl font-light leading-tight italic">
                            "To transform every event into an interactive journey, capturing the essence of joy through the lens of innovation."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-4 bg-black text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black mb-10 text-white">Ready to make history?</h2>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href="/contact"
                            className="inline-block bg-[#fce4a6] text-black px-12 py-6 rounded-full font-black text-xl shadow-2xl hover:bg-white transition-colors"
                        >
                            Book Your Robot Now
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
