import React from 'react';
import { motion } from 'framer-motion';
import { FiCamera, FiShare2, FiCpu, FiZap, FiPrinter } from 'react-icons/fi';

const features = [
    {
        icon: <FiCpu className="w-8 h-8" />,
        title: "Smart Navigation",
        description: "Our robot intelligently navigates your event, finding the perfect angles and interacting with guests for a truly unique experience."
    },
    {
        icon: <FiCamera className="w-8 h-8" />,
        title: "DSLR Quality",
        description: "Professional-grade photography with studio lighting ensures every shot is crisp, clear, and ready for the 'gram."
    },
    {
        icon: <FiZap className="w-8 h-8" />,
        title: "Quick Setup",
        description: "We're up and running in under 30 minutes. Our team handles everything, so you can focus on your event."
    },
    {
        icon: <FiShare2 className="w-8 h-8" />,
        title: "Instant Sharing",
        description: "Guests can instantly share their photos via SMS, Email, or AirDrop directly from the robot's interface."
    },
    {
        icon: <FiPrinter className="w-8 h-8" />,
        title: "Instant Printing",
        description: "High-speed, lab-quality prints in seconds. Guests leave with a physical memory they can cherish forever."
    }
];

export const USPSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-5xl font-bold text-black mb-8"
                        >
                            Why Choose the <span className="text-[#fce4a6] bg-black px-2">Robot?</span>
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
                                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-[#fce4a6]">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Robot Image Animation */}
                    <div className="order-1 lg:order-2 relative">
                        <motion.div
                            initial={{ x: 200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 50, damping: 20, duration: 1 }}
                            className="relative z-10"
                        >
                            <img
                                src="/images/robo3.webp"
                                alt="Robot Photobooth"
                                className="w-full h-auto rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#fce4a6]/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-black/5 rounded-full blur-3xl -z-10" />
                    </div>

                </div>
            </div>
        </section>
    );
};
