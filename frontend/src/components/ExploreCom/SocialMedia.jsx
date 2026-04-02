import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

// Import your screenshot image
import LinkedInPreview from "../../assets/images/linkedin-preview.png"; // change path as needed

const SocialMedia = () => {
  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Social Media
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Follow our latest updates on LinkedIn and Instagram.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* ================= LINKEDIN (SCREENSHOT CLICKABLE) ================= */}
          <a
            href="https://www.linkedin.com/company/react-ki/"
            target="_blank"
            rel="noreferrer"
            className="group bg-white rounded-xl shadow border border-slate-200 p-4 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-white">
                <FaLinkedin size={14} />
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                LinkedIn
              </h3>
            </div>

            {/* Screenshot Preview */}
            <div className="w-full rounded-lg overflow-hidden border">
              <img
                src={LinkedInPreview}
                alt="REACT LinkedIn Page"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            <div className="mt-2 text-center">
              <span className="inline-block text-xs font-medium text-blue-600 group-hover:underline">
                View on LinkedIn →
              </span>
            </div>
          </a>

          {/* ================= INSTAGRAM ================= */}
          <div className="bg-white rounded-xl shadow border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400 flex items-center justify-center text-white">
                <FaInstagram size={14} />
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Instagram
              </h3>
            </div>

            {/* Instagram Embed */}
            <div className="w-full rounded-lg overflow-hidden border">
              <iframe
                src="https://www.instagram.com/react.tribe/embed"
                className="w-full min-h-[500px]"
                
                allowFullScreen
                title="Instagram Post"
              />
            </div>

            <div className="mt-3 text-center">
              <a
                href="https://www.instagram.com/react.tribe/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs font-medium text-pink-600 hover:underline"
              >
                View more on Instagram →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SocialMedia;
