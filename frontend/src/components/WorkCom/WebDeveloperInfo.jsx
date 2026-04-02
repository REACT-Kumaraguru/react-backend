import React from "react";
import { Link } from "react-router-dom";

export const WebDeveloperInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
                <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-yellow-600 uppercase bg-yellow-50 rounded-full">
                    We're Hiring
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
                    Web Developer – <br className="hidden md:block" /> Build. Create. Innovate.
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                    If you're interested in Web Development, Join the REACT team! 
                    We're looking for passionate developers who want to build impactful web solutions 
                    and grow their skills through hands-on projects.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-web-developer-form"
                        className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>

            {/* ================= ROLE PURPOSE ================= */}
            <section className="px-6 py-16 bg-gray-50 border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Why Join REACT as a Web Developer?</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        As a Web Developer at REACT, you will build and maintain web applications that serve 
                        our institutional needs. This role offers <strong>hands-on learning, real-world projects, 
                        and opportunities to grow</strong> your technical skills while contributing to meaningful 
                        digital solutions.
                    </p>
                </div>
            </section>

            {/* ================= WHO CAN APPLY ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-10 text-center">Who Can Apply?</h2>
                    <div className="flex justify-center">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl text-center">
                            <h3 className="text-yellow-600 font-bold uppercase tracking-wider text-sm mb-4">Open to All Departments</h3>
                            <p className="text-xl font-bold text-gray-800 mb-4">Passion for Web Development</p>
                            <p className="text-gray-600 leading-relaxed">
                                We welcome students from any department who have a genuine interest in web development. 
                                Whether you're self-taught, have completed online courses, or have built projects, 
                                if you're passionate about creating web experiences, we want to hear from you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= KEY BENEFITS ================= */}
            <section className="px-6 py-16 bg-zinc-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Benefits</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            {
                                title: "Skill Growth",
                                desc: "Develop your web development skills through mentorship and real projects."
                            },
                            {
                                title: "Projects to Work On",
                                desc: "Build real-world applications that serve institutional needs."
                            },
                            {
                                title: "Recognition & Network",
                                desc: "Gain recognition for your work and expand your professional network."
                            },
                            {
                                title: "Networking Opportunity",
                                desc: "Connect with peers, faculty, and industry professionals."
                            },
                            {
                                title: "Hands-on Learning",
                                desc: "Learn by doing with guidance from experienced developers."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 border border-zinc-700 rounded-xl hover:bg-zinc-800 transition-all">
                                <div className="w-10 h-10 bg-yellow-500 text-gray-900 rounded-lg mb-4 flex items-center justify-center font-bold">
                                    ✓
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">{item.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= REGISTRATION DETAILS ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">Registration Details</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-yellow-600 font-bold">Last Date:</span> 25th Feb 2026
                                </p>
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-yellow-600 font-bold">Portal:</span> react.kct.ac.in
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-yellow-600 font-bold">Contact:</span> 9385695977
                                </p>
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-yellow-600 font-bold">Website:</span> react.kct.ac.in
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                    Build the Future of Web
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Ready to code? Apply now to join the REACT team as a Web Developer 
                    and turn your passion into impactful projects.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-web-developer-form"
                        className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Submit Application
                    </Link>
                </div>
            </section>

        </div>
    );
};
