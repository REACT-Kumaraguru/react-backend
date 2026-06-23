import TiltedCard from "./TiltedCard";
import { motion } from "framer-motion";

const ReasonsSection = () => {
  const reasons = [
    {
      title: "Seeking a Fresh Start",
      text: "You’ve always wanted a chance — but didn’t have the space, the support, or the spark.",
    },
    {
      title: "Untapped Curiosity",
      text: "You’re smart, curious, and eager — but you haven’t found your thing yet.",
    },
    {
      title: "Looking Beyond the Degree",
      text: "You graduated. But you still don’t feel like an engineer.",
    },
    {
      title: "Ready to Give Back",
      text: "You’ve been here before. You want more — to lead, to guide, to rebuild.",
    },
    {
      title: "Needing Clarity & Space",
      text: "Life’s been heavy. You need more than a program — you need peace, clarity, and growth.",
    },
    {
      title: "Upgrading My Skills",
      text: "You want to rebuild your skillset — not just add certificates, but master something real.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-16">
          Everyone Has a Reason. What’s Yours?
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.15, // 👈 one-by-one effect
              }}
            >
              <TiltedCard
                containerHeight="260px"
                containerWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="h-full w-full bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 flex flex-col justify-between">
                    
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-black mb-6">
                      {reason.title}
                    </h3>

                    {/* Quote */}
                    <div className="relative text-center px-4">
                      <span className="absolute -left-2 -top-4 text-3xl text-gray-300 font-serif">
                        “
                      </span>

                      <p className="italic text-gray-700 text-sm leading-relaxed">
                        {reason.text}
                      </p>

                      <span className="absolute -right-2 -bottom-4 text-3xl text-gray-300 font-serif">
                        ”
                      </span>
                    </div>

                  </div>
                }
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReasonsSection;