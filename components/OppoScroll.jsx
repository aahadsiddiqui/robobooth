import { FiArrowDown, FiArrowUp } from "react-icons/fi";

const items = [
  {
    id: 1,
    title: "About Robo Booth",
    description:
      "Canada's first mobile robot photo booth, designed to roam your event, interact with guests, and capture unforgettable moments. Our robot features a professional DSLR camera, studio-quality lighting, and a fun, engaging personality that brings energy to any occasion.",
    img: "/images/IMG_0955.JPEG",
  },
  {
    id: 2,
    title: "What is Robo Booth?",
    description:
      "Unlike traditional photo booths, Robo Booth drives around your venue, encouraging guests to strike a pose, capturing candid and group shots, and delivering instant prints or digital photos via SMS, Email, QR Code, or Airdrop. It's the ultimate interactive experience for weddings, corporate events, parties, and more.",
    img: "/images/IMG_1019.JPG",
  },
  {
    id: 3,
    title: "How It Works",
    description:
      "Robo Booth navigates your event, engaging guests, snapping photos, and printing or sharing them instantly. The robot is fully mobile and can be customized for your event flow.",
    img: "/images/robo1.jpg",
  },
  {
    id: 4,
    title: "Key Features",
    description:
      "- Roaming robot brings the booth to your guests.\n- DSLR camera & pro lighting for studio-quality photos.\n- Instant prints & digital sharing (SMS, Email, QR, Airdrop).\n- Custom branding for events.\n- 360° video booth add-on for viral content.",
    img: "/images/robo2.jpg",
  },
  {
    id: 5,
    title: "Perfect For",
    description:
      "Weddings, corporate events, parties, graduations, festivals, and brand activations. Robo Booth is the perfect way to create and share memories at any event.",
    img: "/images/robo3.jpg",
  },
  {
    id: 6,
    title: "Why Choose Robo Booth?",
    description:
      "Canada's first roaming robot photo booth. Studio-quality DSLR photos and prints. Instant digital sharing. Engages and entertains guests of all ages. Custom branding. Optional 360° video booth add-on.",
    img: "/images/IMG_1019.JPG",
  },
];

const OppoScroll = () => {
  return (
    <>
      <div className="bg-white text-black p-4 grid place-items-center">
        <FiArrowDown className="text-xl" />
      </div>
      <div className="w-full">
        {items.map(({ id, title, description, img }, idx) => (
          <div
            key={id}
            className={`flex flex-col md:flex-row h-screen ${
              idx % 2 ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <div className="flex-1 flex flex-col justify-center p-8">
              <h3 className="text-3xl font-bold mb-4">{title}</h3>
              <p className="font-light w-full max-w-xl whitespace-pre-line">{description}</p>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <img
                src={img}
                alt={title}
                className="h-full w-full object-cover"
                style={{ maxHeight: '100vh' }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-black text-white p-4 grid place-items-center">
        <FiArrowUp className="text-xl" />
      </div>
    </>
  );
};

export default OppoScroll; 