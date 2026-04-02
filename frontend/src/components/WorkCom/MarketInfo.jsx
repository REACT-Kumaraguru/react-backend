import React from "react";
import { Link } from "react-router-dom";

export const MarketInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
               
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-6 mb-6 tracking-tight">
                    Market Research and <br className="hidden md:block" /> Partnerships Lead
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Bridge the gap between deep research and institutional impact. 
                    Build the credibility, partnerships, and sustainability that allow 
                    REACT to solve real-world problems.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-market-form"
                        className="inline-flex items-center justify-center bg-[#be185d] hover:bg-[#9d174d] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
                    >
                        Apply for this Role
                    </Link>
                </div>
            </section>

            {/* ================= ROLE PURPOSE ================= */}
            <section className="px-6 py-16 bg-gray-50 border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">The Purpose of the Role</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        This role is central to REACT’s growth, credibility, and long-term sustainability. You are not a support function; you are a <strong>steward</strong> who connects research, partnerships, funding, and execution. 
                        <br /><br />
                        You will translate REACT’s vision into tangible outcomes across academic, industry, CSR, and public ecosystems. It requires someone who can hold <strong>research rigor</strong> and <strong>external engagement</strong> together.
                    </p>
                </div>
            </section>

            {/* ================= QUALIFICATIONS ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-10 text-center">Educational & Experience Profile</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-[#be185d] font-bold uppercase tracking-wider text-sm mb-4">Mandatory Qualification</h3>
                            <p className="text-xl font-bold text-gray-800 mb-2">Master’s Degree</p>
                            <p className="text-gray-600 leading-relaxed">
                                Management, Public Policy, Social Sciences, Development Studies, Marketing, or a closely related field.
                            </p>
                        </div> */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-[#be185d] font-bold uppercase tracking-wider text-sm mb-4">Experience Range</h3>
                            <p className="text-xl font-bold text-gray-800 mb-2">Freshers to 2 Years</p>
                            <p className="text-gray-600 leading-relaxed">
                                Strong field exposure and alignment with REACT’s grounded way of working are mandatory.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CORE RESPONSIBILITIES ================= */}
            <section className="px-6 py-16 bg-gray-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Core Responsibilities</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Market Research",
                                desc: "Lead stakeholder research across students, faculty, industry, and government to inform program design."
                            },
                            {
                                title: "Strategic Positioning",
                                desc: "Own the articulation of REACT's value proposition for diverse external stakeholder groups."
                            },
                            {
                                title: "Grant & CSR Funding",
                                desc: "Identify and pursue grants; build and manage institutional partnerships for project sustainability."
                            },
                            {
                                title: "Knowledge Creation",
                                desc: "Support development of white papers and case studies to strengthen REACT's credibility."
                            },
                            {
                                title: "External Representation",
                                desc: "Act as a primary representative of REACT in workshops, dialogues, and collaborative forums."
                            },
                            {
                                title: "Strategic Operations",
                                desc: "Coordinate across teams to ensure institutional alignment, follow-through, and accountability."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all">
                                <div className="w-10 h-10 bg-[#be185d] rounded-lg mb-4 flex items-center justify-center font-bold">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= NON-NEGOTIABLES ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-pink-50 border-l-4 border-[#be185d] p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-[#9d174d] mb-4 uppercase tracking-tight">Non-Negotiable Expectations</h2>
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                            REACT values evidence over opinion and long-term relevance over short-term visibility. 
                            This role is meant for someone who can hold <strong>rigor and representation</strong> together.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                                    <span className="text-pink-600">✕</span> Not a desk-based research role
                                </li>
                                <li className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                                    <span className="text-pink-600">✕</span> Not a transactional/admin role
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                                    <span className="text-pink-600">✕</span> No rigid boundaries or task-lists
                                </li>
                                <li className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                                    <span className="text-pink-600">✕</span> Not for those seeking limited engagement
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                    Ready to take ownership?
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    If you are a strategic thinker with high initiative and institutional commitment, 
                    we invite you to help build the future of REACT.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-market-form"
                        className="inline-flex items-center justify-center bg-[#be185d] hover:bg-[#9d174d] text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Submit Application
                    </Link>
                </div>
                <p className="mt-8 text-xs text-gray-500 tracking-widest uppercase">
                    react.kct.ac.in
                </p>
            </section>

        </div>
    );
};