import React from "react";
import { Link } from "react-router-dom";

export const EventManagerInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
                <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-purple-600 uppercase bg-purple-50 rounded-full">
                    We're Hiring
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
                    Event Manager – <br className="hidden md:block" /> Lead. Organize. Execute.
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Join REACT and create impact. We are looking for individuals who demonstrate 
                    leadership potential, responsibility, and effective communication skills to 
                    manage high-impact institutional events.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-event-form"
                        className="inline-flex items-center justify-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
                    >
                        Join the Team
                    </Link>
                </div>
            </section>

            {/* ================= ROLE PURPOSE ================= */}
            <section className="px-6 py-16 bg-gray-50 border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Why Join REACT?</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        As an Event Manager, you will lead and execute high-impact institutional events[cite: 11]. 
                        This role is designed for those ready to gain hands-on experience in <strong>planning, 
                        coordination, and operations</strong> within a transformative engineering environment[cite: 12].
                    </p>
                </div>
            </section>

            {/* ================= WHO CAN APPLY ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-10 text-center">Who Can Apply?</h2>
                    <div className="flex justify-center">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl text-center">
                            <h3 className="text-[#7c3aed] font-bold uppercase tracking-wider text-sm mb-4">Candidate Profile</h3>
                            <p className="text-xl font-bold text-gray-800 mb-4">Leadership & Communication</p>
                            <p className="text-gray-600 leading-relaxed">
                                We are looking for individuals who demonstrate leadership potential, 
                                strong sense of responsibility, and effective communication skills[cite: 9]. 
                                You should be capable of building networks and managing complex logistics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= KEY BENEFITS ================= */}
            <section className="px-6 py-16 bg-zinc-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">What You Will Gain</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Institutional Impact",
                                desc: "Directly lead and execute events that define the institutional culture."
                            },
                            {
                                title: "Operational Mastery",
                                desc: "Master the art of planning, coordination, and large-scale operations."
                            },
                            {
                                title: "Skill Building",
                                desc: "Rapidly develop your leadership, communication, and management professional skills."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-all">
                                <div className="w-10 h-10 bg-[#7c3aed] rounded-lg mb-4 flex items-center justify-center font-bold">
                                    {idx + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{item.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= REGISTRATION DETAILS ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-purple-50 border-l-4 border-[#7c3aed] p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-[#4c1d95] mb-4 uppercase tracking-tight">Registration Details</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-purple-600 font-bold">Last Date:</span> 25-02-2026 
                                </p>
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-purple-600 font-bold">Portal:</span> react.kct.ac.in 
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-purple-600 font-bold">Contact:</span> +91 9025656329 
                                </p>
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-purple-600 font-bold">Email:</span> react@kct.ac.in 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                    Create Lasting Impact
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Ready to take the lead? Apply now to join the REACT team as an Event Manager 
                    and build the future of institutional transformation.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-event-form"
                        className="inline-flex items-center justify-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Submit Application
                    </Link>
                </div>
            </section>

        </div>
    );
};