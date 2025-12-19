import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiZap, FiAward } from 'react-icons/fi';

const reasons = [
    {
        icon: <FiUsers className="w-10 h-10" />,
        title: "Guest-to-Guest Interaction",
        description: "Unlike stationary booths, our robot comes to you. It roams the dance floor and tables, ensuring no one misses out on the fun."
    },
    {
        icon: <FiZap className="w-10 h-10" />,
        title: "Instant Engagement",
        description: "The novelty of a robot photographer creates an immediate buzz, encouraging guests to interact, pose, and share."
    },
    {
        icon: <FiAward className="w-10 h-10" />,
        title: "Professional Studio Quality",
        description: "Equipped with high-end DSLR cameras and professional lighting, we deliver studio-quality photos in any environment."
    }
];

export const WhyChooseUs = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-black mb-6"
                    >
                        Why Choose <span className="text-[#fce4a6] bg-black px-2">Robo Booth?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 text-lg max-w-3xl mx-auto"
                    >
                        We're not just a photobooth; we're an experience. Elevate your event with the latest in interactive entertainment.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center text-[#fce4a6] mb-8 shadow-xl group-hover:scale-110 transition-transform duration-300">
                                {reason.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-4">{reason.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
