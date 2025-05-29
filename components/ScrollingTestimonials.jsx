import { motion } from "framer-motion";

const ScrollingTestimonials = () => {
  return (
    <div className="bg-slate-950 py-12 overflow-x-hidden box-border">
      <div className="mb-8 px-4 box-border">
        <h3 className="text-slate-50 text-4xl font-semibold text-center">
          Testimonials
        </h3>
        <p className="text-center text-slate-300 text-sm mt-2 max-w-lg mx-auto">
          Hear what our clients say about Robo Booth and their unforgettable event experiences!
        </p>
      </div>
      <div className="p-4 overflow-x-hidden relative box-border">
        <div className="flex flex-nowrap items-center mb-4 box-border">
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
          <TestimonialList list={testimonials.top} duration={125} />
        </div>
        <div className="flex flex-nowrap items-center mb-4 box-border">
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
          <TestimonialList list={testimonials.middle} duration={75} reverse />
        </div>
        <div className="flex flex-nowrap items-center box-border">
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
          <TestimonialList list={testimonials.bottom} duration={275} />
        </div>
      </div>
    </div>
  );
};

const TestimonialList = ({ list, reverse = false, duration = 50 }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      className="flex flex-nowrap px-2 box-border"
    >
      {list.map((t) => {
        return (
          <div
            key={t.id}
            className="shrink-0 w-full max-w-[95vw] sm:max-w-sm md:max-w-md bg-slate-900 text-slate-50 p-6 rounded-lg relative mx-1 box-border"
          >
            <div className="relative">
              <span className="block font-semibold text-lg mb-1">{t.name}</span>
              <span className="block mb-3 text-sm font-medium text-slate-300">{t.title}</span>
              <span className="block text-sm text-slate-300">{t.info}</span>
              <span className="text-5xl sm:text-7xl absolute -top-4 -right-2 text-slate-700">
                "
              </span>
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