import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EarthScene from "./EarthScene";

gsap.registerPlugin(ScrollTrigger);

export default function EarthScrollContainer() {
  const scrollRef = useRef();
  const [rotationY, setRotationY] = useState(0);

  useLayoutEffect(() => {
    const sections = gsap.utils.toArray(".scroll-section");

    sections.forEach((section, index) => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setRotationY(index * Math.PI / 2),
          onEnterBack: () => setRotationY(index * Math.PI / 2),
        },
      });
    });
  }, []);

  return (
    <div ref={scrollRef}>
      <div className="fixed inset-0 z-10">
        <EarthScene rotationY={rotationY} />
      </div>

      {/* Scroll Sections */}
      <div className="space-y-96 pb-96">
        <div className="scroll-section h-screen flex items-center justify-center text-4xl">
          India Focus
        </div>
        <div className="scroll-section h-screen flex items-center justify-center text-4xl">
          Europe Focus
        </div>
        <div className="scroll-section h-screen flex items-center justify-center text-4xl">
          America Focus
        </div>
        <div className="scroll-section h-screen flex items-center justify-center text-4xl">
          Asia Focus
        </div>
      </div>
    </div>
  );
}
