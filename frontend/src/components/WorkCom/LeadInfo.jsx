import React from "react";
import { Link } from "react-router-dom"; // Recommended for React apps

export const LeadInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
               
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4 mb-6">
                    Lead – Education Architecture, Exploration and Digital Programs
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                    Are you an education systems professional ready to design scalable learning architectures that transform social innovation into rigorous academic frameworks? Kumaraguru Institutions is seeking a visionary leader to join us as a founding leadership role in Coimbatore.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-lead-form"
                        className="inline-flex items-center justify-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
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
                        This role will design and institutionalize the full academic and digital framework of REACT. 
                        You will convert live humanitarian problem solving, interdisciplinary collaboration, and startup 
                        establishment into a coherent curriculum architecture, structured exploration systems, digitally 
                        deliverable course modules, and defined certification pathways. You hold domain authority over 
                        pedagogy, exploration design, certification systems, and digital learning architecture within REACT.
                        <br /><br />
                    </p>
                </div>
            </section>

            {/* ================= ELIGIBILITY ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Eligibility & Requirements</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="text-[#7c3aed]"></span> Eligibility & Who are we looking for?
                            </h3>
                            <p className="text-gray-700 mb-4 mt-4">
                                <strong> Education : </strong> Postgraduate training in Education, Comparative Education, Development Studies, Public Policy, or a related discipline.
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Experience : </strong> Demonstrated experience designing structured curriculum or educational systems.
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong> Core Skills : </strong> 
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li>Strong grounding in research methodology and evidence-based program design</li>
                                <li>Experience contributing to or developing digital learning programs</li>
                                <li>Ability to translate complex social and technical systems into scalable learning architecture</li>
                                <li>High standards of documentation, analytical rigor, and institutional thinking</li>
                            </ul>
                            <p className="text-gray-700 mb-4 mt-4">
                                <strong> Role Details : </strong>
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li><strong>Type : </strong>Full Time | Founding Leadership Role</li>
                                <li><strong>Location : </strong>In-Person, Coimbatore, Tamil Nadu</li>
                                <li><strong>Reports to : </strong>Head, REACT</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= KEY RESPONSIBILITIES ================= */}
            <section className="px-6 py-16 bg-gray-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center text-purple-400">Core Responsibilities</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Curriculum Architecture",
                                desc: "Design integrated curriculum framework covering social, technical, and enterprise dimensions with defined learning outcomes and competency maps."
                            },
                            {
                                title: "Exploration Systems",
                                desc: "Develop structured field inquiry methodologies integrating qualitative and quantitative research tools for social validation."
                            },
                            {
                                title: "Digital Programs",
                                desc: "Design modular, platform-ready courses suitable for online delivery with established certification pathways."
                            },
                            {
                                title: "Interdisciplinary Integration",
                                desc: "Ensure coherence across social research, STEM development, and enterprise creation tracks with unified documentation systems."
                            },
                            {
                                title: "Quality Assurance",
                                desc: "Establish quality assurance framework ensuring rigor across cohorts and digital programs with measurable learning effectiveness indicators."
                            },
                            {
                                title: "Scalability",
                                desc: "Develop structured toolkits for partner institutions, design train-the-trainer frameworks, and contribute to REACT positioning."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800 p-6 rounded-2xl hover:bg-purple-900/30 transition-all border border-gray-700">
                                <h3 className="text-xl font-bold mb-3 text-purple-400">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= STRATEGIC OBJECTIVES ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">Strategic Objectives</h2>
                    <div className="bg-purple-50 p-8 md:p-12 rounded-3xl border border-purple-100">
                        <p className="text-gray-700 text-lg mb-6">
                            Build REACT as a rigorous, scalable education to enterprise pipeline:
                        </p>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600 font-bold text-xl">1.</span>
                                <span>A rigorous field-based social innovation model</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600 font-bold text-xl">2.</span>
                                <span>A structured academic framework integrating social, technical, and enterprise competencies</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600 font-bold text-xl">3.</span>
                                <span>A digital certification ecosystem comparable in quality to leading global online learning platforms</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-purple-600 font-bold text-xl">4.</span>
                                <span>A scalable education to enterprise pipeline that produces self-sustaining impact</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ================= KEY OUTCOMES ================= */}
            <section className="px-6 py-16 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Key Outcomes (12 to 24 Months)</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            "Documented curriculum architecture across Living, Skilling, Solving, and Implementing phases",
                            "Competency frameworks covering social validation, STEM intervention, and business establishment",
                            "Structured exploration and problem validation methodologies grounded in research practice",
                            "Modular course design adaptable for online, hybrid, and field delivery",
                            "Tiered certification framework with defined assessment and progression criteria",
                            "Digital learning blueprint including instructional design standards and evaluation systems",
                            "Quality assurance framework ensuring rigor across cohorts and digital programs",
                            "Structured implementation and facilitator manual enabling institutional adoption"
                        ].map((outcome, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-purple-500 transition-all">
                                <div className="flex items-start gap-3">
                                    <span className="text-purple-600 font-bold text-lg flex-shrink-0">✓</span>
                                    <p className="text-gray-700">{outcome}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= THE REACT PHILOSOPHY ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-800">Is This the Right Fit for You?</h2>
                    <div className="bg-purple-50 p-8 md:p-12 rounded-3xl border border-purple-100">
                        <p className="text-purple-900 text-lg md:text-xl italic font-medium mb-6">
                            "This is a founding leadership role with domain authority over pedagogy, exploration design, 
                            certification systems, and digital learning architecture within REACT."
                        </p>
                        <ul className="text-left space-y-4 inline-block mx-auto">
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-purple-600 font-bold">✓</span> You can translate complex interdisciplinary work into structured, scalable learning systems.
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-purple-600 font-bold">✓</span> You value documentation, rigor, and institutional thinking over ad-hoc execution.
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-purple-600 font-bold">✓</span> You want to build something from the ground up with long-term impact potential.
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ================= CALL TO ACTION ================= */}
            <section className="px-6 py-20 bg-black text-white text-center">
                <h2 className="text-3xl md:text-4xl font-semibold mb-6 uppercase tracking-tight">
                    Join the Mission
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                    If you are a systems thinker ready to design the educational architecture that transforms 
                    social innovation into scalable, rigorous learning, we would like to hear from you.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-lead-form"
                        className="inline-flex items-center justify-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Submit Application
                    </Link>
                </div>
                <p className="mt-8 text-sm text-gray-500">
                    Visit <a href="https://react.kct.ac.in" target="_blank" rel="noreferrer" className="underline hover:text-purple-500 transition">react.kct.ac.in</a> for further information.
                </p>
            </section>

        </div>
    );
};