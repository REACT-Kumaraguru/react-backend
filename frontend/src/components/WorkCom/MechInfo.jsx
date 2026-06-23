import React from "react";
import { Link } from "react-router-dom";

export const MechInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-6 mb-6 tracking-tight">
                    Mechanical Engineer – <br className="hidden md:block" /> Development & Fabrication
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Lead the technical core of the KCT REACT. Guide interdisciplinary innovation, 
                    master rapid prototyping, and empower the next generation of hands-on engineers.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-mech-form"
                        className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
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
                        KCT is establishing an <strong>REACT</strong> to enable interdisciplinary innovation, product development, and hands-on engineering capability. 
                        <br /><br />
                        As the Mechanical Engineer, you will serve as a core technical leader responsible for guiding projects, operating high-end machinery, and enabling high-quality fabrication support for student teams and faculty researchers.
                    </p>
                </div>
            </section>

            {/* ================= QUALIFICATIONS ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-10 text-center">Educational & Experience Profile</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-[#2563eb] font-bold uppercase tracking-wider text-sm mb-4">Required Qualifications</h3>
                            <p className="text-xl font-bold text-gray-800 mb-2">B.E / M.E Mechanical or Production</p>
                            <p className="text-gray-600 leading-relaxed">
                                Strong hands-on experience with fabrication tools, machining, and 3D modelling (SolidWorks, Fusion 360, or Creo).
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="text-[#2563eb] font-bold uppercase tracking-wider text-sm mb-4">Desirable Experience</h3>
                            <p className="text-xl font-bold text-gray-800 mb-2">Makerspace & Startup Background</p>
                            <p className="text-gray-600 leading-relaxed">
                                Experience in R&D labs, additive manufacturing, mechatronics, and troubleshooting mechanical systems.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CORE RESPONSIBILITIES ================= */}
            <section className="px-6 py-16 bg-slate-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Key Responsibilities</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Fabrication & Machining",
                                desc: "Operate and maintain 3D printers, CNCs, milling machines, lathes, and laser cutters."
                            },
                            {
                                title: "Design Guidance",
                                desc: "Guide teams in structural analysis, materials selection, and Design for Manufacturability (DFM)."
                            },
                            {
                                title: "Training & Safety",
                                desc: "Train students and faculty on machine usage, safety protocols, and fabrication workflows."
                            },
                            {
                                title: "Integrated Development",
                                desc: "Collaborate with EEE Engineers for mechatronics, IoT, and automation projects."
                            },
                            {
                                title: "Maintenance & Calibration",
                                desc: "Ensure lab equipment is calibrated and upgraded as per industry standards."
                            },
                            {
                                title: "Jigs & Fixtures",
                                desc: "Develop custom tools and in-house mechanisms required for specialized projects."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all">
                                <div className="w-10 h-10 bg-[#2563eb] rounded-lg mb-4 flex items-center justify-center font-bold">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= ESSENTIAL TRAITS ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-blue-50 border-l-4 border-[#2563eb] p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-[#1e40af] mb-4 uppercase tracking-tight">Essential Traits</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-md font-semibold text-gray-700">
                                    <span className="text-blue-600">✓</span> Hands-on engineering mindset
                                </li>
                                <li className="flex items-start gap-2 text-md font-semibold text-gray-700">
                                    <span className="text-blue-600">✓</span> Technical depth and curiosity
                                </li>
                            </ul>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-md font-semibold text-gray-700">
                                    <span className="text-blue-600">✓</span> Patient and clear student mentorship
                                </li>
                                <li className="flex items-start gap-2 text-md font-semibold text-gray-700">
                                    <span className="text-blue-600">✓</span> Commitment to lab safety & documentation
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                    Build the Future of Fabrication
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    If you are a builder who loves solving complex mechanical challenges and 
                    mentoring young innovators, we want to hear from you.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-mech-form"
                        className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Submit Application
                    </Link>
                </div>
            </section>

        </div>
    );
};