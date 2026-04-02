import React from "react";
import { Link } from "react-router-dom";

export const ElecInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-6 mb-6 tracking-tight">
                    Electronics / EEE Engineer – <br className="hidden md:block" /> Embedded Systems & Automation
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Power the intelligence of REACT. Lead embedded development, IoT innovation, 
                    and automation to turn student concepts into functional mechatronic prototypes.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-elec-form"
                        className="inline-flex items-center justify-center bg-[#ea580c] hover:bg-[#c2410c] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
                    >
                        Apply for this Role
                    </Link>
                </div>
            </section>

            {/* ================= ROLE PURPOSE ================= */}
            <section className="px-6 py-16 bg-gray-50 border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Role Overview</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        The Electronics/EEE Engineer provides technical leadership in <strong>embedded systems, IoT, power electronics, and automation</strong>. 
                        <br /><br />
                        You will be the hands-on bridge between a student's circuit diagram and a working real-world product, supporting interdisciplinary projects that merge hardware, software, and mechanical systems.
                    </p>
                </div>
            </section>

            {/* ================= QUALIFICATIONS ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-10 text-center">Educational & Experience Profile</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-[#ea580c] font-bold uppercase tracking-wider text-sm mb-4">Required Qualifications</h3>
                            <p className="text-xl font-bold text-gray-800 mb-2">B.E / M.E in EEE, ECE, or Electronics</p>
                            <p className="text-gray-600 leading-relaxed">
                                Strong experience in embedded programming (C/C++), circuit design, PCB tools, and sensor integration.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-[#ea580c] font-bold uppercase tracking-wider text-sm mb-4">Desirable Experience</h3>
                            <p className="text-xl font-bold text-gray-800 mb-2">IoT & Industrial Automation</p>
                            <p className="text-gray-600 leading-relaxed">
                                Proficiency in KiCad/Altium and hands-on experience with PLCs, motor drives, and electronic test instrumentation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CORE RESPONSIBILITIES ================= */}
            <section className="px-6 py-16 bg-zinc-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Key Responsibilities</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Embedded Development",
                                desc: "Guide students in Arduino, Raspberry Pi, ESP32, and ARM-based control systems."
                            },
                            {
                                title: "PCB & Circuit Design",
                                desc: "Support electronics prototyping from schematic capture to multi-layer PCB fabrication."
                            },
                            {
                                title: "IoT & Instrumentation",
                                desc: "Implement sensor networks, wireless protocols, and data acquisition for field projects."
                            },
                            {
                                title: "Mechatronics Integration",
                                desc: "Co-develop robotics and automation systems in collaboration with the Mechanical team."
                            },
                            {
                                title: "Lab Management",
                                desc: "Maintain oscilloscopes, soldering stations, and advanced electrical testing equipment."
                            },
                            {
                                title: "Technical Mentorship",
                                desc: "Train students in electronics safety, soldering best practices, and troubleshooting."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-all">
                                <div className="w-10 h-10 bg-[#ea580c] rounded-lg mb-4 flex items-center justify-center font-bold">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">{item.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= ESSENTIAL TRAITS ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-orange-50 border-l-4 border-[#ea580c] p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-[#9a3412] mb-4 uppercase tracking-tight">Essential Traits</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-md font-semibold text-gray-700">
                                    <span className="text-orange-600">✓</span> Practical, hands-on mindset
                                </li>
                                <li className="flex items-start gap-2 text-md font-semibold text-gray-700">
                                    <span className="text-orange-600">✓</span> Eagerness to learn new hardware
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-md font-semibold text-gray-700">
                                    <span className="text-orange-600">✓</span> Strong troubleshooting skills
                                </li>
                                <li className="flex items-start gap-2 text-md font-semibold text-gray-700">
                                    <span className="text-orange-600">✓</span> Mentorship-driven approach
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                    Spark the Next Innovation
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Join the REACT team and help students bridge the gap between 
                    complex electronics and real-world application.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-elec-form"
                        className="inline-flex items-center justify-center bg-[#ea580c] hover:bg-[#c2410c] text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Submit Application
                    </Link>
                </div>
            </section>

        </div>
    );
};