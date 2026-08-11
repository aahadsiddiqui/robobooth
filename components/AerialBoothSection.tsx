import React from 'react';
import { motion } from 'framer-motion';
import { FiCamera, FiShare2, FiZap, FiPrinter, FiBox } from 'react-icons/fi';

const features = [
    {
        icon: <FiBox className="w-8 h-8" />,
        title: "Enclosed Experience",
        description: "Step into our stunning aerial booth with a vibrant, customizable interior. Perfect for creating an immersive photo experience that matches your event theme."
    },
    {
        icon: <FiCamera className="w-8 h-8" />,
        title: "DSLR Photos, Videos & GIFs",
        description: "Create professional DSLR-quality photos, stunning videos, and shareable GIFs all in one booth. High-end cameras and studio lighting ensure crisp, professional results."
    },
    {
        icon: <FiZap className="w-8 h-8" />,
        title: "Quick Setup",
        description: "Our team sets up the aerial booth in under 30 minutes. We handle all technical aspects so you can focus on enjoying your event."
    },
    {
        icon: <FiShare2 className="w-8 h-8" />,
        title: "Instant Sharing",
        description: "Guests can instantly share their photos via SMS, Email, or AirDrop directly from the booth's interface."
    },
    {
        icon: <FiPrinter className="w-8 h-8" />,
        title: "Instant Printing",
        description: "High-speed, lab-quality prints in seconds. Guests leave with a physical memory they can cherish forever."
    }
];

export const AerialBoothSection = () => {
    return (
        <section className="py-24 bg-black text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Aerial Booth Image Animation */}
                    <div className="order-1 lg:order-1 relative">
                        <motion.div
                            initial={{ x: -200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1 }}
                            className="relative z-10"
                        >
                            <img
                                src="/images/aerial-booth-1.png"
                                alt="Aerial Booth"
                                className="w-full h-auto rounded-3xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#fce4a6]/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-10" />
                    </div>

                    {/* Text Content */}
                    <div className="order-2 lg:order-2">
                        <motion.h2
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-bold mb-8"
                        >
                            Why Choose the <span className="text-[#fce4a6] bg-white/10 px-2">Aerial Booth?</span>
                        </motion.h2>

                        <div className="space-y-12">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="flex gap-6"
                                >
                                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-[#fce4a6] border border-[#fce4a6]/20">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                        <p className="text-white/70 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

