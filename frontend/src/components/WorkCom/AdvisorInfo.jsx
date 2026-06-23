import React from "react";
import { Link } from "react-router-dom";

export const AdvisorInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
                
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4 mb-6 tracking-tight">
                    Global Advisor – <br className="hidden md:block" /> Strategy and Partnerships
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Serve as a strategic architect for REACT’s 2050 vision. 
                    Bridge the gap between local field innovation and global institutional impact.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-advisor-form"
                        className="inline-flex items-center justify-center bg-[#4f46e5] hover:bg-[#4338ca] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
                    >
                        Express Interest
                    </Link>
                </div>
            </section>

            {/* ================= MISSION OVERVIEW ================= */}
            <section className="px-6 py-16 bg-gray-50 border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">The Vision</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        REACT (Real-world Experience & Application through Collaborative Transformation) is building the foundations for a global, scalable 2050 vision. We aim to become a world reference for experiential engineering and community-driven social innovation.
                        <br /><br />
                        <strong>Advisors are not operational managers; they are architects of possibility.</strong> You will serve as a strategic thought partner to REACT’s leadership, contributing to long-term visioning, global engagement, and ecosystem expansion across UN-aligned youth development pipelines.
                    </p>
                </div>
            </section>

            {/* ================= ENGAGEMENT MODEL ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Engagement & Profile</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
                                Flexible Commitment
                            </h3>
                            <p className="text-gray-700 mb-4">
                                This is a strategic partnership, not an operational role. Engagement is advisor-driven and high-impact.
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
                                <li>Remote / Hybrid flexibility</li>
                                <li>Quarterly strategy interventions</li>
                                <li>Annual vision conversations</li>
                                <li>Targeted mentorship for specific initiatives</li>
                            </ul>
                        </div>
                        <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
                                Ideal Profile
                            </h3>
                            <p className="text-gray-700 mb-4">
                                We value diversity across leadership domains. Any one of the following is sufficient:
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
                                <li>Global experts in UN systems or Public Policy</li>
                                <li>Senior Academics from leading global institutions</li>
                                <li>CSR Strategists or Industry Leaders</li>
                                <li>Philanthropy and Impact-Finance practitioners</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CORE AREAS OF CONTRIBUTION ================= */}
            <section className="px-6 py-16 bg-slate-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center text-indigo-400">Areas of Contribution</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Global Partnerships",
                                desc: "Connect REACT with international organizations, UN agencies, and global innovation alliances."
                            },
                            {
                                title: "Resource Mobilization",
                                desc: "Guide pathways to philanthropic funding, global grants, and multi-year impact-driven models."
                            },
                            {
                                title: "Policy Engagement",
                                desc: "Facilitate integration into national/state innovation ecosystems and ministerial dialogues."
                            },
                            {
                                title: "Innovation Leadership",
                                desc: "Strengthen pipelines across climate tech and sustainability with international incubators."
                            },
                            {
                                title: "Thought Leadership",
                                desc: "Position REACT as a world-class experiment in conferences and global summits."
                            },
                            {
                                title: "Strategic Operations",
                                desc: "Mentor the team on fundraising negotiations and global positioning strategies."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-slate-800 p-6 rounded-2xl hover:bg-indigo-900/30 transition-all border border-slate-700">
                                <h3 className="text-xl font-bold mb-3 text-indigo-400">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= VALUE EXCHANGE ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-800">The Advisor's Journey</h2>
                    <div className="bg-indigo-50 p-8 md:p-12 rounded-3xl border border-indigo-100">
                        <p className="text-indigo-900 text-lg md:text-xl italic font-medium mb-6">
                            "Advisors gain a deep affiliation with a mission-driven ecosystem at the frontier of real-world transformation, playing a founding role in a movement projected for 2050 impact."
                        </p>
                        <div className="text-left space-y-4 max-w-md mx-auto">
                            <div className="flex items-start gap-3 text-gray-700">
                                <span className="text-indigo-600 font-bold">✓</span> Shape a globally ambitious education model.
                            </div>
                            <div className="flex items-start gap-3 text-gray-700">
                                <span className="text-indigo-600 font-bold">✓</span> Redefine engineering and community learning.
                            </div>
                            <div className="flex items-start gap-3 text-gray-700">
                                <span className="text-indigo-600 font-bold">✓</span> Work with high-initiative interdisciplinary teams.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 uppercase tracking-tight">
                    Shape the Next Decade
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                    Distinguished leaders who resonate with the mission of REACT are invited to 
                    submit a brief note of interest to begin the conversation.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-advisor-form"
                        className="inline-flex items-center justify-center bg-[#4f46e5] hover:bg-[#4338ca] text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Express Interest
                    </Link>
                </div>
                <p className="mt-8 text-sm text-gray-400">
                    Global Inquiries: <a href="mailto:react@kct.ac.in" className="underline hover:text-indigo-400 transition">react@kct.ac.in</a>
                </p>
            </section>

        </div>
    );
};