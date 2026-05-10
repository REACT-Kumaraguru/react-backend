import React from "react";
import { Link } from "react-router-dom";

export const InternshipInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
                <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 rounded-full">
                    Innovation Lab Internships
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4 mb-6">
                    Build Beyond the Classroom
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                    Join REACT's innovation ecosystem and gain real-world exposure in operations, marketing, and business development. We are looking for motivated students to help drive our mission forward.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-intern-form"
                        className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
                    >
                        Apply for Internship
                    </Link>
                </div>
            </section>

            {/* ================= ROLE PURPOSE ================= */}
            <section className="px-6 py-16 bg-gray-50 border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Why Join REACT?</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        Transform your experience with opportunities that matter. Work on actual projects that drive REACT's mission and impact. Gain interdisciplinary exposure across operations, marketing, and business development while connecting with industry leaders, mentors, and peers.
                        <br /><br />
                        Our internship program is designed to bridge the gap between theory and practical implementation in a fast-paced startup ecosystem.
                    </p>
                </div>
            </section>

            {/* ================= INTERNSHIP ROLES ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Internship Tracks</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Operations */}
                        <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                                ⚙️
                            </div>
                            <h3 className="text-xl font-bold mb-4">Operations</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Support internal coordination, workflow management, documentation systems, and execution tracking across REACT initiatives.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-500">✓</span> Process coordination
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-500">✓</span> Event execution
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-blue-500">✓</span> Documentation
                                </li>
                            </ul>
                        </div>

                        {/* Marketing */}
                        <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                                📱
                            </div>
                            <h3 className="text-xl font-bold mb-4">Marketing & Branding</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Work on branding strategy, social media campaigns, digital storytelling, and audience engagement.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-500">✓</span> Social media planning
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-500">✓</span> Content strategy
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-purple-500">✓</span> Brand communication
                                </li>
                            </ul>
                        </div>

                        {/* PR & Networking */}
                        <div className="p-8 border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
                            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-2xl mb-6">
                                🤝
                            </div>
                            <h3 className="text-xl font-bold mb-4">PR & Networking</h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Build professional relationships, support partnerships, and coordinate outreach activities.
                            </p>
                            <ul className="text-sm text-gray-500 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500">✓</span> Stakeholder engagement
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500">✓</span> Partnership coordination
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500">✓</span> Networking initiatives
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= ELIGIBILITY ================= */}
            <section className="px-6 py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Eligibility & Who are we looking for?</h2>
                    <div className="max-w-3xl mx-auto p-8 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                        <div className="space-y-6">
                            <div>
                                <p className="text-gray-700">
                                    <strong>Education : </strong> Open to students from all departments of Kumaraguru Institutions (KCT, KCLAS, KIA).
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-700">
                                    <strong>Core Skills : </strong>
                                </p>
                                <ul className="list-disc pl-5 text-gray-700 space-y-2 mt-2">
                                    <li>Strong communication and interpersonal skills</li>
                                    <li>Proactive and self-motivated attitude</li>
                                    <li>Eagerness to learn and adapt in a dynamic environment</li>
                                    <li>Commitment to REACT's mission of social innovation</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-gray-700">
                                    <strong>Role Details : </strong>
                                </p>
                                <ul className="list-disc pl-5 text-gray-700 space-y-2 mt-2">
                                    <li><strong>Type : </strong>Internship (Student Role)</li>
                                    <li><strong>Location : </strong>Onsite Coimbatore, Tamil Nadu</li>
                                    <li><strong>Duration : </strong>Flexible (based on academic requirements)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= PROCESS ================= */}
            <section className="px-6 py-20 bg-gray-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center text-blue-400">Application Process</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "1", title: "Apply", desc: "Submit your application and motivation." },
                            { step: "2", title: "Review", desc: "Our team reviews your application fit." },
                            { step: "3", title: "Interact", desc: "Connect with us to discuss your goals." },
                            { step: "4", title: "Onboard", desc: "Join the team and start making impact." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold mx-auto mb-4">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 uppercase tracking-tight">
                    Ready to Start?
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                    Join a community focused on innovation, execution, and real-world impact. Your journey starts here.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-intern-form"
                        className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>

        </div>
    );
};
