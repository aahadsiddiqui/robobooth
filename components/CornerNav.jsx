import { SiInstagram } from "react-icons/si";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

const LINKS = [
  { title: "home", href: "/" },
  { title: "about", href: "/about" },
  { title: "packages", href: "/packages" },
  { title: "contact", href: "/contact" },
];

const SOCIAL_CTAS = [
  { Component: SiInstagram, href: "https://instagram.com/robobooth.ca" },
];

const UNDERLAY_VARIANTS = {
  open: {
    width: "calc(100% - 32px)",
    height: "calc(100vh - 32px)",
    transition: { type: "spring", mass: 3, stiffness: 400, damping: 50 },
  },
  closed: {
    width: "80px",
    height: "80px",
    transition: {
      delay: 0.75,
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  },
};

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};

function CornerNav({ active, setActive }) {
  return <Nav active={active} setActive={setActive} />;
}

function Nav({ active, setActive }) {
  return (
    <>
      {!active && <HamburgerButton active={active} setActive={setActive} />}
      <AnimatePresence>{active && <LinksOverlay setActive={setActive} />}</AnimatePresence>
    </>
  );
}

function LinksOverlay({ setActive }) {
  const overlay = (
    <nav className="fixed inset-0 z-[99999] pointer-events-auto bg-black flex flex-col items-start">
      <div className="flex w-full justify-between items-center p-4 md:p-8">
        <Logo />
        <button onClick={() => setActive(false)} className="text-[#fce4a6] text-4xl md:text-5xl focus:outline-none">
          <FiX />
        </button>
      </div>
      <LinksContainer />
      <FooterCTAs />
    </nav>
  );
  if (typeof window !== 'undefined') {
    return createPortal(overlay, document.body);
  }
  return null;
}

function LinksContainer() {
  return (
    <motion.div className="flex-1 flex flex-col justify-center items-start space-y-6 md:space-y-8 px-8 w-full">
      {LINKS.map((l, idx) => (
        <NavLink key={l.title} href={l.href} idx={idx}>
          {l.title}
        </NavLink>
      ))}
    </motion.div>
  );
}

function NavLink({ children, href, idx }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.75 + idx * 0.125,
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0, y: -8 }}
      href={href}
      className="block text-4xl md:text-6xl font-semibold text-[#fce4a6] transition-colors hover:text-white text-left"
    >
      {children}.
    </motion.a>
  );
}

function Logo() {
  return (
    <motion.a
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, y: -12 }}
      href="/"
      className="grid h-12 w-12 md:h-20 md:w-20 place-content-center rounded-br-xl rounded-tl-xl bg-white transition-colors hover:bg-[#fce4a6] overflow-hidden"
    >
      <img
        src="/images/logo.jpeg"
        alt="Robo Booth Logo"
        className="w-full h-full object-cover"
      />
    </motion.a>
  );
}

function HamburgerButton({ active, setActive }) {
  return (
    <>
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 8, right: 8 }}
        className="fixed z-10 bg-gradient-to-br from-[#fce4a6] to-[#fce4a6] shadow-lg h-12 w-12 md:h-20 md:w-20 rounded-xl"
      />

      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className={`group fixed right-2 top-2 z-50 h-12 w-12 md:h-20 md:w-20 bg-white/0 transition-all hover:bg-[#fce4a6]/20 ${active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl"
          }`}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-0.5 w-7 md:w-10 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-0.5 w-7 md:w-10 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block h-0.5 w-4 md:w-5 bg-white"
          style={{ x: "-50%", y: "50%" }}
        />
      </motion.button>
    </>
  );
}

function FooterCTAs() {
  return (
    <>
      <div className="absolute bottom-6 left-6 flex gap-4 md:flex-col">
        {SOCIAL_CTAS.map((l, idx) => {
          const Icon = l.Component;
          return (
            <motion.a
              key={idx}
              href={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1 + idx * 0.125,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{ opacity: 0, y: -8 }}
            >
              <Icon className="text-xl text-[#fce4a6] transition-colors hover:text-white" />
            </motion.a>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-[#fce4a6] px-3 py-3 text-2xl md:text-2xl font-semibold text-black transition-colors hover:bg-white hover:text-[#fce4a6] md:bottom-4 md:right-4 md:px-6"
        onClick={() => { window.location.href = '/contact'; }}
      >
        <span>Book Now</span> <FiArrowRight />
      </motion.button>
    </>
  );
}

export default CornerNav; 