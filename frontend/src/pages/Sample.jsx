import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const testimonials = [
  {
    name: "Sangeetha",
    title: "Professor",
    quote:
      "For years, I’ve watched students struggle to connect theory with the reality outside. REACT filled that gap in the most profound way.",
    img: "Sangeetha.jpg",
    linkedin: "https://www.linkedin.com/in/dr-sangeetha-n-ab397258/",
  },
  {
    name: "Aparna",
    title: "Student",
    quote:
      "I had never walked through a village and asked, 'How can I help?' REACT changed how I see engineering forever.",
    img: "Aparna.jpg",
    linkedin: "https://www.linkedin.com/in/aparnarm2904/",
  },
  {
    name: "Nandeeswaran",
    title: "Student",
    quote:
      "We built a working prototype with farmers. Not for them, but with them.",
    img: "Nandeesh.jpg",
    linkedin: "https://www.linkedin.com/in/nandeeswaran-k/",
  },
  {
    name: "Jana",
    title: "Young Innovator (Tamil Nadu State Planning Commission)",
    quote:
      "REACT is the first program I’ve seen that truly embodies field-based education.",
    img: "Jana.jpg",
    linkedin: "https://www.linkedin.com/in/connectwithjana/",
  },
  {
    name: "Sivakeerthana",
    title: "R & D Engineer (Zoho Corp)",
    quote:
      "REACT connects students to the real world meaningfully. It’s a shift.",
    img: "Sivakeerthana.jpg",
    linkedin: "https://www.linkedin.com/in/sivakeerthana/",
  },
];

export default function Sample() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="bg-white py-16">
      {/* ✅ CENTERED CONTAINER */}
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ CENTERED HEADING */}
        <h2 className="text-3xl font-bold text-center mb-12">
          REACT Through Expert Eyes
        </h2>

        {/* ✅ HORIZONTAL SCROLL AREA */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            className="flex gap-6 w-max"
            animate={paused ? {} : { x: ["0%", "-50%"] }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="w-[320px] bg-slate-50 rounded-xl p-6 shadow-md flex-shrink-0"
              >
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`/images/${item.img}`}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.title}</p>
                  </div>
                  <a href={item.linkedin} target="_blank" rel="noreferrer">
                    <FaLinkedin className="text-blue-600 text-xl" />
                  </a>
                </div>

                {/* QUOTE */}
                <p className="text-sm italic text-gray-700">
                  “{item.quote}”
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}