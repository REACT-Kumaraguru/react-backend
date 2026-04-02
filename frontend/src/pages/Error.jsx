import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">

      {/* Animated grain */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />

      {/* Moving white light */}
      <motion.div
        animate={{ x: ["-40%", "120%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        className="absolute top-0 h-full w-[40%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-2xl"
      />

      {/* Floating orbs */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-white/5 blur-[140px] animate-pulse" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-white/5 blur-[140px] animate-pulse" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* 404 */}
        <motion.h1
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="text-[10rem] font-black tracking-tight text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]"
        >
          404
        </motion.h1>

        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gray-400">
          Page Not Found
        </p>

        <p className="mt-6 max-w-md text-gray-500">
          This page slipped into the void. But your journey doesn’t end here.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex gap-6">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#fff", color: "#000" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="rounded-full border border-white px-10 py-4 text-sm font-semibold uppercase tracking-widest transition"
          >
            Go Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, borderColor: "#999" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="rounded-full border border-white/40 px-10 py-4 text-sm uppercase tracking-widest text-gray-400 transition"
          >
            Go Back
          </motion.button>
        </div>

        {/* Cursor hint */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-16 text-xs uppercase tracking-widest text-gray-600"
        >
          Move your mouse — feel the space
        </motion.div>
      </motion.div>
    </div>
  );
}