import React from "react";
import { Link } from "react-router-dom";

export const InterestInfo = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* ================= HERO SECTION ================= */}
      <section className="px-6 py-16 md:py-20 mt-10 text-center max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
          Expression of Interest – Work With Us (REACT)
        </h1>

        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Interested in working with REACT? Submit your expression of interest to collaborate, intern, or join our team. We are looking for passionate individuals across multiple domains.
        </p>

        <div className="flex justify-center gap-4 mt-10">
          <Link
            to="/work-interest-form"
            className="inline-flex items-center justify-center bg-[#0f766e] hover:bg-[#115e59] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
          >
            Submit Expression of Interest
          </Link>
        </div>
      </section>

      {/* ================= QUICK CONTEXT ================= */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              What this form is for
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Use this form to share your profile so our team can review your fit for future collaborations, internships, and team openings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

