import React from "react";
import { Link } from "react-router-dom";

export const ResearchInternInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
                <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
                    We're Hiring
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
                    Research Intern – <br className="hidden md:block" /> Explore. Analyze. Innovate.
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Passionate about research and innovation? Join the REACT team as a Research Intern! 
                    We are looking for curious minds who love exploring ideas, analyzing data, 
                    and contributing to impactful research initiatives.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-research-intern-form"
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
                    >
                        Apply Now
                    </Link>
                </div>
            </section>

            {/* ================= ROLE PURPOSE ================= */}
            <section className="px-6 py-16 bg-gray-50 border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Why Join REACT as a Research Intern?</h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        As a Research Intern at REACT, you will work on innovative projects, 
                        assist in literature reviews, conduct experiments or surveys, 
                        analyze findings, and contribute to research publications and reports. 
                        This role offers <strong>hands-on research exposure, mentorship, 
                        and academic growth opportunities</strong>.
                    </p>
                </div>
            </section>

            {/* ================= WHO CAN APPLY ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-10 text-center">Who Can Apply?</h2>
                    <div className="flex justify-center">
                        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl text-center">
                            <h3 className="text-blue-600 font-bold uppercase tracking-wider text-sm mb-4">
                                Open to All Departments
                            </h3>
                            <p className="text-xl font-bold text-gray-800 mb-4">
                                Strong Interest in Research & Innovation
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We welcome students from any department who are curious, 
                                analytical, and eager to learn. Whether you have prior research 
                                experience or are just starting out, if you are motivated to 
                                explore new ideas and contribute meaningfully, we encourage you to apply.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= KEY SKILLS REQUIRED ================= */}
            <section className="px-6 py-16 bg-gray-100">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Essential Skills</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {[
                            {
                                title: "Analytical Thinking",
                                desc: "Ability to critically analyze problems and interpret research findings."
                            },
                            {
                                title: "Literature Review Skills",
                                desc: "Capability to read and understand research papers and summarize insights."
                            },
                            {
                                title: "Data Handling",
                                desc: "Basic knowledge of data collection, organization, and analysis tools."
                            },
                            {
                                title: "Technical Knowledge",
                                desc: "Familiarity with tools like Excel, Python, or domain-specific software."
                            },
                            {
                                title: "Report Writing",
                                desc: "Ability to document research work clearly and professionally."
                            },
                            {
                                title: "Communication Skills",
                                desc: "Effective written and verbal communication for presentations and discussions."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-all">
                                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg mb-4 flex items-center justify-center font-bold">
                                    ✓
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ================= BENEFITS ================= */}
            <section className="px-6 py-16 bg-blue-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Benefits</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                title: "Research Exposure",
                                desc: "Work on real-world research problems and innovative ideas."
                            },
                            {
                                title: "Faculty Mentorship",
                                desc: "Learn under experienced mentors and researchers."
                            },
                            {
                                title: "Publication Opportunities",
                                desc: "Opportunity to contribute to papers, journals, or conferences."
                            },
                            {
                                title: "Skill Enhancement",
                                desc: "Strengthen analytical, technical, and communication skills."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 border border-blue-700 rounded-xl hover:bg-blue-800 transition-all">
                                <div className="w-10 h-10 bg-white text-blue-900 rounded-lg mb-4 flex items-center justify-center font-bold">
                                    ✓
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-300 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-blue-200 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= REGISTRATION DETAILS ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
                            Registration Details
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-blue-600 font-bold">Last Date:</span> 25th Feb 2026
                                </p>
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-blue-600 font-bold">Portal:</span> react.kct.ac.in
                                </p>
                            </div>
                            <div className="space-y-4">
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-blue-600 font-bold">Contact:</span> 9385695977
                                </p>
                                <p className="text-md font-semibold text-gray-700">
                                    <span className="text-blue-600 font-bold">Website:</span> react.kct.ac.in
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                    Ready to Start Your Research Journey?
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Apply now to join REACT as a Research Intern and 
                    contribute to meaningful research initiatives that create real impact.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-research-intern-form"
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Submit Application
                    </Link>
                </div>
            </section>

        </div>
    );
};
