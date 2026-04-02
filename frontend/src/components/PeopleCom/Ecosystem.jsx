import React from "react";
import { motion } from "framer-motion";
import ecosystemImg from "../../assets/images/ecosystem.svg"; 
import ShinyText from "../FooterCom/ShinyText";

const Ecosystem = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* 📝 Text Content (Left Column) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}   // 🔥 Runs immediately
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            The People of{" "}
            <span className="text-blue-600">
              <ShinyText
                text="React"
                speed={3}
                color="#5227ff"
                shineColor="#ffffff"
                spread={120}
              />
            </span>
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            REACT is a living ecosystem — not a stand-alone program. It connects
            students, fellows, alumni, mentors, partners, and communities in a
            circular flow:
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Every cycle, new learners build on problems uncovered by earlier
            cohorts, creating an ever-growing network of experience and impact.
          </p>
        </motion.div>

        {/* 🖼 Rotating Image with Center Text */}
        <div className="relative flex justify-center items-center">

          {/* 🔁 Rotating Ecosystem Image */}
          <motion.img
            src={ecosystemImg}
            alt="REACT Ecosystem"
            className="w-full max-w-md object-contain"
            initial={{ rotate: 0 }}       // 🔥 Starts immediately
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
          />

          {/* 🟦 Center Text (Optional) */}
          <div className="absolute flex items-center justify-center">
            <h2 className="text-3xl md:text-7xl font-bold tracking-widest">
              {/* CENTER TEXT IF NEEDED */}
            </h2>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Ecosystem;
