import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  ArrowRight,
  MessageCircle,
  PhoneCall,
  Globe,
} from "lucide-react";

import ContactExtras from "../components/ContactExtras";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ContactUs = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    topic: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  /* ================= VALIDATION ================= */
  const validateForm = () => {
    let newErrors = {};

    if (!formState.firstName) newErrors.firstName = "First name is required";
    if (!formState.lastName) newErrors.lastName = "Last name is required";
    if (!formState.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!formState.phone) newErrors.phone = "Phone number is required";
    if (!formState.message) newErrors.message = "Message is required";
    if (!formState.topic) newErrors.topic = "Please select a topic";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyz_-zExXFS4NaHFI2pVwn1jOOqU0YRPbJLycOptNpov1luG6nbu8KfX4Tp2vBnYjn7/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
          mode: "no-cors",
        }
      );

      // Simulate loading for UX
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Message sent successfully!");

        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          topic: "",
        });
      }, 1200);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Error submitting form!");
    }
  };

  return (
    <>
      {/* MAIN CONTACT SECTION */}
      <section className="relative min-h-screen bg-gray-50 font-sans mt-26">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* LEFT COLUMN */}
            <div className="space-y-12">
              <motion.div variants={itemVariants} className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                  Let’s start a <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
                    conversation.
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Got questions about the product, fellowship, or partnerships? Our
                  team is here to help you leap forward.
                </p>
              </motion.div>

              {/* Contact Info Card */}
              <motion.div
                variants={itemVariants}
                className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm p-6 max-w-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Connect with REACT
                </h3>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-900" />
                    <a href="mailto:react@kct.ac.in" className="hover:underline">
                      react@kct.ac.in
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Linkedin size={18} className="text-gray-900" />
                    <a
                      href="https://www.linkedin.com/company/react-ki/posts/?feedView=all"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      LinkedIn / react-ki
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Instagram size={18} className="text-gray-900" />
                    <a
                      href="https://www.instagram.com/react.tribe/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      Instagram / @react.tribe
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: FORM */}
            <motion.div
              variants={itemVariants}
              className="w-full h-full rounded-3xl bg-white border border-gray-200 shadow-lg p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formState.firstName}
                      onChange={handleInputChange}
                      className="border p-3 rounded-lg w-full"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formState.lastName}
                      onChange={handleInputChange}
                      className="border p-3 rounded-lg w-full"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="border p-3 rounded-lg w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="border p-3 rounded-lg w-full"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="border p-3 rounded-lg w-full h-32"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Topic */}
                <div>
                  <select
                    name="topic"
                    value={formState.topic}
                    onChange={handleInputChange}
                    className="border p-3 rounded-lg w-full"
                  >
                    <option value="">Select Topic</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Media">Media</option>
<option value="work">Work with Us</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.topic && (
                    <p className="text-red-500 text-xs mt-1">{errors.topic}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 🌍 MAP + ☎️ KEY CONTACTS SECTION */}
      <ContactExtras />

      {/* ================= LOADER OVERLAY ================= */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <div className="bg-white px-6 py-4 rounded-xl shadow-lg flex flex-col items-center gap-3">
              <span className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></span>
              <p className="text-sm font-medium">Sending your message...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactUs;
