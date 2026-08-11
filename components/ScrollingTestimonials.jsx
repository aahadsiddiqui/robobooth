import { motion } from "framer-motion";

const ScrollingTestimonials = () => {
  return (
    <div className="bg-black py-32 overflow-x-hidden box-border relative">
      <div className="mb-20 px-4 box-border text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-4xl md:text-6xl font-black mb-6 tracking-tight"
        >
          Trusted by <span className="text-[#fce4a6]">Hundreds</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
        >
          Don't just take our word for it. Here's what our clients have to say about their Robo Booth experience.
        </motion.p>
      </div>

      <div className="space-y-12 relative z-10">
        <div className="flex flex-nowrap items-center box-border">
          <TestimonialList list={testimonials.top} duration={180} />
          <TestimonialList list={testimonials.top} duration={180} />
        </div>
        <div className="flex flex-nowrap items-center box-border">
          <TestimonialList list={testimonials.middle} duration={140} reverse />
          <TestimonialList list={testimonials.middle} duration={140} reverse />
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fce4a6]/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
};

const TestimonialList = ({ list, reverse = false, duration = 50 }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex flex-nowrap px-8 box-border"
    >
      {list.map((t) => {
        return (
          <div
            key={t.id}
            className="shrink-0 w-[350px] md:w-[450px] bg-white/5 backdrop-blur-xl text-white p-10 rounded-[2rem] relative mx-8 box-border border border-white/10 hover:border-[#fce4a6]/30 transition-all duration-500 group shadow-2xl"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-6 text-[#fce4a6]/80">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/80 text-lg md:text-xl font-medium mb-8 leading-relaxed">
                "{t.info}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fce4a6] to-[#a49056] flex items-center justify-center text-black font-bold text-xl">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <span className="block font-bold text-white text-lg">{t.name}</span>
                  <span className="block text-sm text-white/40 uppercase tracking-widest">{t.title}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

const testimonials = {
  top: [
    {
      id: 1,
      name: "Sarah J.",
      title: "Bride, Toronto Wedding",
      info: "The Robo Booth was the highlight of our wedding! Our guests loved how the robot moved around and captured candid moments. The instant prints were a huge hit!"
    },
    {
      id: 2,
      name: "Mike C.",
      title: "Event Planner, Corporate Gala",
      info: "Our team was blown away by the interactive robot photobooth. Sharing photos via QR code and Airdrop made it so easy for everyone. Highly recommended!"
    },
    {
      id: 3,
      name: "Emma D.",
      title: "Birthday Host",
      info: "Such a fun and unique experience! The robot made everyone laugh and the quality of the photos was amazing."
    },
    {
      id: 4,
      name: "Danica W.",
      title: "Maid of Honor",
      info: "Guests couldn't stop talking about the Robo Booth. The prints and digital sharing options were perfect for our group."
    },
    {
      id: 5,
      name: "Peter H.",
      title: "Corporate Event Guest",
      info: "Loved the roaming robot! It made networking so much more fun and memorable."
    },
    {
      id: 6,
      name: "Lanny B.",
      title: "Festival Organizer",
      info: "The Robo Booth was a showstopper at our festival. The ability to print and share photos instantly was a game changer."
    },
  ],
  middle: [
    {
      id: 1,
      name: "Alex F.",
      title: "Corporate Event Planner",
      info: "Setup was seamless and the robot was a crowd favorite. The SMS and email sharing made it easy for everyone to get their photos."
    },
    {
      id: 2,
      name: "Claude O.",
      title: "Wedding Photographer",
      info: "As a photographer, I was impressed by the DSLR quality and the fun interactions the robot created."
    },
    {
      id: 3,
      name: "Max Q.",
      title: "Birthday Guest",
      info: "The robot photobooth made the party unforgettable. Everyone loved the instant prints and digital options."
    },
    {
      id: 4,
      name: "Jeff R.",
      title: "Festival Attendee",
      info: "Never seen anything like it! The Robo Booth was the talk of the event."
    },
    {
      id: 5,
      name: "Kevin K.",
      title: "Corporate Guest",
      info: "The robot made everyone smile and the photos were top notch."
    },
    {
      id: 6,
      name: "Andrea B.",
      title: "Bride",
      info: "Our guests loved the Robo Booth! The prints were beautiful and sharing via Airdrop was so convenient."
    },
  ],
  bottom: [
    {
      id: 1,
      name: "Danny G.",
      title: "Birthday Host",
      info: "The Robo Booth made my birthday party so much fun. The robot's movement kept everyone entertained!"
    },
    {
      id: 2,
      name: "Ian D.",
      title: "Corporate Organizer",
      info: "A must-have for any event. The robot photobooth was a unique addition and the sharing options were fantastic."
    },
    {
      id: 3,
      name: "Ben S.",
      title: "Wedding Guest",
      info: "The Robo Booth captured so many great moments. Loved the instant prints!"
    },
    {
      id: 4,
      name: "Matthew I.",
      title: "Festival Guest",
      info: "The robot was a huge hit. Everyone wanted a photo!"
    },
    {
      id: 5,
      name: "Garrett P.",
      title: "Corporate Attendee",
      info: "The Robo Booth made our event stand out. The prints and digital sharing were a great touch."
    },
    {
      id: 6,
      name: "Xavier C.",
      title: "Groom",
      info: "Our guests are still talking about the Robo Booth! The robot made our wedding so much more memorable."
    },
  ],
};

export default ScrollingTestimonials; 