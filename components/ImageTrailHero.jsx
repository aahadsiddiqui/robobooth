import { useAnimate } from "framer-motion";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import Link from "next/link";

export const ImageTrailHero = ({ overlayActive = false }) => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "/images/IMG_0955.JPEG",
        "/images/IMG_1019.JPG",
        "/images/IMG_1170.jpg",
      ]}
    >
      <section className={`h-screen bg-black ${overlayActive ? 'pointer-events-none opacity-50' : ''}`}>
        <NavBar />
        <Copy />
        <WatermarkWrapper />
      </section>
    </MouseImageTrail>
  );
};

const NavBar = () => {
  return (
    <nav className="absolute left-0 right-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 md:p-6">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#fce4a6] to-[#fce4a6] text-transparent bg-clip-text">
          </span>
        </Link>
      </div>
    </nav>
  );
};

const Copy = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      <div className="mx-auto flex flex-col md:flex-row max-w-7xl items-end justify-between p-4 md:p-8">
        <div>
          <h1 className="mb-6 max-w-4xl text-6xl font-black leading-[1.1] text-white md:text-8xl">
            Canada's First <span className="text-[#fce4a6]">Robot</span> Photo Booth
          </h1>
          <p className="max-w-xl text-white/80 md:text-lg">
            Experience the future of event photography with our DSLR robot photo booth. Perfect for weddings, corporate events, and special occasions.
          </p>
        </div>
        <FiArrowDownCircle className="hidden text-8xl text-[#fce4a6] md:block" />
      </div>
    </div>
  );
};

const WatermarkWrapper = () => {
  return (
    <>
      <Watermark text="AI-Powered" />
      <Watermark text="Interactive" reverse />
      <Watermark text="Innovative" />
      <Watermark text="Unique" reverse />
      <Watermark text="Memorable" />
      <Watermark text="Futuristic" reverse />
      <Watermark text="Smart" />
      <Watermark text="Revolutionary" reverse />
    </>
  );
};

const Watermark = ({ reverse, text }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[10vmax] sm:text-[20vmax] font-black uppercase leading-[0.75] text-[#fce4a6]/10">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[10vmax] sm:text-[20vmax] font-black uppercase leading-[0.75] text-[#fce4a6]/10">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};

const MouseImageTrail = ({
  children,
  images,
  renderImageBuffer,
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();
  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);
  const isTouching = useRef(false);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;
      renderNextImage();
    }
  };

  const handleTouchStart = (e) => {
    isTouching.current = true;
    const touch = e.touches[0];
    lastRenderPosition.current.x = touch.clientX;
    lastRenderPosition.current.y = touch.clientY;
    renderNextImage();
  };

  const handleTouchMove = (e) => {
    if (isTouching.current) {
      const touch = e.touches[0];
      const distance = calculateDistance(
        touch.clientX,
        touch.clientY,
        lastRenderPosition.current.x,
        lastRenderPosition.current.y
      );

      if (distance >= renderImageBuffer) {
        lastRenderPosition.current.x = touch.clientX;
        lastRenderPosition.current.y = touch.clientY;
        renderNextImage();
      }
    }
  };

  const handleTouchEnd = () => {
    isTouching.current = false;
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;
    const el = document.querySelector(selector);
    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = Math.min(imageRenderCount.current, 50).toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 1 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden overflow-x-hidden"
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-36 w-auto rounded-xl border-2 border-[#fce4a6] bg-black object-cover opacity-0"
          src={img}
          alt={`Robo Booth image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
}; 