import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiSettings, FiCamera, FiShare } from 'react-icons/fi';

const steps = [
    {
        icon: <FiCalendar className="w-8 h-8" />,
        title: "Book Your Aerial Booth",
        description: "Select your date and package. We serve Toronto and the entire GTA."
    },
    {
        icon: <FiSettings className="w-8 h-8" />,
        title: "We Handle Setup",
        description: "Our team arrives early to handle all technical setup and customization of your booth."
    },
    {
        icon: <FiCamera className="w-8 h-8" />,
        title: "Guests Step In & Create",
        description: "Guests enter the booth and create DSLR-quality photos, videos, and GIFs with customizable backgrounds."
    },
    {
        icon: <FiShare className="w-8 h-8" />,
        title: "Instant Sharing",
        description: "Guests get digital copies instantly via SMS, Email, or AirDrop. Print on the spot or share online."
    }
];

export const HowItWorksAerial = () => {
    return (
        <section className="py-24 bg-white text-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                        How the <span className="text-[#fce4a6] bg-black px-2">Aerial Booth</span> Works
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Creating stunning memories in 4 simple steps with DSLR-quality photos, videos, and GIFs.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative p-6 rounded-2xl bg-black/5 border border-black/10 hover:border-[#fce4a6]/50 transition-colors group"
                        >
                            <div className="absolute -top-6 left-6 w-12 h-12 bg-[#fce4a6] text-black rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                                {index + 1}
                            </div>
                            <div className="mt-8 mb-4 text-[#fce4a6] group-hover:text-black transition-colors">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-black">{step.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#fce4a6]/10 via-white to-white pointer-events-none" />
        </section>
    );
};


