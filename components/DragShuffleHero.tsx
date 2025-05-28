import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const DragShuffleHero = () => {
  const [order, setOrder] = useState(["front", "middle", "back"]);

  const handleShuffle = () => {
    const orderCopy = [...order];
    orderCopy.unshift(orderCopy.pop());
    setOrder(orderCopy);
  };

  return (
    <section className="overflow-hidden px-8 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
        <div>
          <h3 className="text-4xl md:text-5xl font-bold leading-[1.25] text-white">
            What Our Clients Say
          </h3>
          <p className="mb-8 mt-4 text-lg text-gray-300">
            Don't just take our word for it. Hear from our amazing clients who have experienced 
            the magic of our photo booths at their events.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleShuffle()}
            className="rounded bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
          >
            See More Reviews
          </motion.button>
        </div>
        <div className="relative h-[450px] w-[350px] mx-auto">
          <Card
            imgUrl="/images/testimonial1.jpg"
            testimonial="The 360° booth was the highlight of our wedding! Our guests couldn't stop talking about it. The quality of photos and the experience was beyond amazing!"
            author="Sarah J. - Wedding Celebration"
            handleShuffle={handleShuffle}
            position={order[0]}
          />
          <Card
            imgUrl="/images/testimonial2.jpg"
            testimonial="Professional service and amazing quality. The team went above and beyond. Perfect addition to our corporate event!"
            author="Mike C. - Corporate Event"
            handleShuffle={handleShuffle}
            position={order[1]}
          />
          <Card
            imgUrl="/images/testimonial3.jpg"
            testimonial="Best decision ever! The photos and videos were absolutely stunning. Everyone at my party was obsessed with the booth!"
            author="Emma D. - Birthday Party"
            handleShuffle={handleShuffle}
            position={order[2]}
          />
        </div>
      </div>
    </section>
  );
};

const Card = ({ 
  handleShuffle, 
  testimonial, 
  position, 
  imgUrl, 
  author 
}: { 
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  imgUrl: string;
  author: string;
}) => {
  const mousePosRef = useRef(0);

  const onDragStart = (e: any) => {
    mousePosRef.current = e.clientX;
  };

  const onDragEnd = (e: any) => {
    const diff = mousePosRef.current - e.clientX;

    if (diff > 150) {
      handleShuffle();
    }

    mousePosRef.current = 0;
  };

  const x = position === "front" ? "0%" : position === "middle" ? "33%" : "66%";
  const rotateZ =
    position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg";
  const zIndex = position === "front" ? "2" : position === "middle" ? "1" : "0";

  const draggable = position === "front";

  return (
    <motion.div
      style={{
        zIndex,
      }}
      animate={{ rotate: rotateZ, x }}
      drag
      dragElastic={0.35}
      dragListener={draggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      transition={{
        duration: 0.35,
      }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-purple-500/20 bg-gray-900/50 p-6 shadow-xl backdrop-blur-md ${
        draggable ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <div className="relative pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-purple-500/20 bg-gray-800 overflow-hidden">
        <Image
          src={imgUrl}
          alt={`Image of ${author}`}
          fill
          className="object-cover"
        />
      </div>
      <span className="text-center text-lg italic text-gray-300">
        "{testimonial}"
      </span>
      <span className="text-center text-sm font-medium text-purple-400">
        {author}
      </span>
    </motion.div>
  );
};

export default DragShuffleHero; 