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
            className="shrink-0 w-full max-w-[95vw] sm:max-w-sm md:max-w-md grid grid-cols-[5rem,_1fr] rounded-lg overflow-hidden relative mx-1 box-border"
          >
            <img src={t.img} className="w-full h-32 sm:h-44 object-cover box-border" />
            <div className="bg-slate-900 text-slate-50 p-4 box-border">
              <span className="block font-semibold text-lg mb-1">{t.name}</span>
              <span className="block mb-3 text-sm font-medium">{t.title}</span>
              <span className="block text-sm text-slate-300">{t.info}</span>
            </div>
            <span className="text-5xl sm:text-7xl absolute top-2 right-2 text-slate-700">
              "
            </span>
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
      img: "/images/Danica.png",
      name: "Sarah J.",
      title: "Bride, Toronto Wedding",
      info: "The Robo Booth was the highlight of our wedding! Our guests loved how the robot moved around and captured candid moments. The instant prints were a huge hit!"
    },
    {
      id: 2,
      img: "/images/Mike.png",
      name: "Mike C.",
      title: "Event Planner, Corporate Gala",
      info: "Our team was blown away by the interactive robot photobooth. Sharing photos via QR code and Airdrop made it so easy for everyone. Highly recommended!"
    },
    {
      id: 3,
      img: "/images/Emma.png",
      name: "Emma D.",
      title: "Birthday Host",
      info: "Such a fun and unique experience! The robot made everyone laugh and the quality of the photos was amazing."
    },
    {
      id: 4,
      img: "/images/Danica.png",
      name: "Danica W.",
      title: "Maid of Honor",
      info: "Guests couldn't stop talking about the Robo Booth. The prints and digital sharing options were perfect for our group."
    },
    {
      id: 5,
      img: "/images/Garrett.png",
      name: "Peter H.",
      title: "Corporate Event Guest",
      info: "Loved the roaming robot! It made networking so much more fun and memorable."
    },
    {
      id: 6,
      img: "/images/Lanny.png",
      name: "Lanny B.",
      title: "Festival Organizer",
      info: "The Robo Booth was a showstopper at our festival. The ability to print and share photos instantly was a game changer."
    },
  ],
  middle: [
    {
      id: 1,
      img: "/images/Alex.png",
      name: "Alex F.",
      title: "Corporate Event Planner",
      info: "Setup was seamless and the robot was a crowd favorite. The SMS and email sharing made it easy for everyone to get their photos."
    },
    {
      id: 2,
      img: "/images/Andrea.png",
      name: "Claude O.",
      title: "Wedding Photographer",
      info: "As a photographer, I was impressed by the DSLR quality and the fun interactions the robot created."
    },
    {
      id: 3,
      img: "/images/Emma.png",
      name: "Max Q.",
      title: "Birthday Guest",
      info: "The robot photobooth made the party unforgettable. Everyone loved the instant prints and digital options."
    },
    {
      id: 4,
      img: "/images/Jeff.png",
      name: "Jeff R.",
      title: "Festival Attendee",
      info: "Never seen anything like it! The Robo Booth was the talk of the event."
    },
    {
      id: 5,
      img: "/images/Kevin.png",
      name: "Kevin K.",
      title: "Corporate Guest",
      info: "The robot made everyone smile and the photos were top notch."
    },
    {
      id: 6,
      img: "/images/Andrea.png",
      name: "Andrea B.",
      title: "Bride",
      info: "Our guests loved the Robo Booth! The prints were beautiful and sharing via Airdrop was so convenient."
    },
  ],
  bottom: [
    {
      id: 1,
      img: "/images/Danny.png",
      name: "Danny G.",
      title: "Birthday Host",
      info: "The Robo Booth made my birthday party so much fun. The robot's movement kept everyone entertained!"
    },
    {
      id: 2,
      img: "/images/Garrett.png",
      name: "Ian D.",
      title: "Corporate Organizer",
      info: "A must-have for any event. The robot photobooth was a unique addition and the sharing options were fantastic."
    },
    {
      id: 3,
      img: "/images/Ben.png",
      name: "Ben S.",
      title: "Wedding Guest",
      info: "The Robo Booth captured so many great moments. Loved the instant prints!"
    },
    {
      id: 4,
      img: "/images/Matthew.png",
      name: "Matthew I.",
      title: "Festival Guest",
      info: "The robot was a huge hit. Everyone wanted a photo!"
    },
    {
      id: 5,
      img: "/images/Garrett.png",
      name: "Garrett P.",
      title: "Corporate Attendee",
      info: "The Robo Booth made our event stand out. The prints and digital sharing were a great touch."
    },
    {
      id: 6,
      img: "/images/Xavier.png",
      name: "Xavier C.",
      title: "Groom",
      info: "Our guests are still talking about the Robo Booth! The robot made our wedding so much more memorable."
    },
  ],
};

export default ScrollingTestimonials; 