import React from "react";
import { Link } from "react-router-dom"; // Recommended for React apps

export const SocialInfo = () => {
    return (
        <div className="bg-white text-gray-900">

            {/* ================= HERO SECTION ================= */}
            <section className="px-6 py-20 mt-10 text-center max-w-5xl mx-auto">
               
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4 mb-6">
                    Program Associate-Social Research and Outreach
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                    Are you a social science professional looking to drive meaningful change through solving real world problems? Kumaraguru Institutions is seeking driven, self-starting individuals to join us as Program Associates in Coimbatore.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-social-form"
                        className="inline-flex items-center justify-center bg-[#0f766e] hover:bg-[#115e59] text-white px-8 py-3 rounded-md text-sm md:text-base font-semibold transition shadow-md"
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
                        This role is the starting point of all REACT interventions. You will identify real social problems, 
                        validate them on the ground, and determine whether solutions lie in policy reform, STEM intervention, 
                        implementation gaps, or systemic failures. You should possess a strong analytical approach and a problem-solving mindset along with a go-getter attitude to social development, we want to meet you !
                        <br /><br />
                    </p>
                </div>
            </section>

            {/* ================= ELIGIBILITY ================= */}
            <section className="px-6 py-16">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-8 text-center">Eligibility & Requirements</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="text-[#0f766e]">01.</span> Educational Background
                            </h3>
                            <p className="text-gray-700 mb-4">
                                <strong> degree is Mandatory:</strong> 
                            </p>
                            <p className="text-sm text-red-600 font-medium italic">
                                * Candidates without a degree are not suitable for this role due to policy analysis requirements.
                            </p>
                        </div> */}
                        <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="text-[#0f766e]"></span> Eligibility & Who are we looking for?
                            </h3>
                            <p className="text-gray-700 mb-4 mt-4">
                                <strong> Education : </strong> Post-graduates in Master of Social Work, Social Entrepreneurship, or related postgraduate Social Science disciplines.  
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong>Experience : </strong> Open to both Freshers and professionals with 2–4 years of experience. 
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong> Core Skills : </strong> 
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li>Strong field exposure is non-negotiable</li>
                                <li>Comfort with ambiguity and complex social dynamics</li>
                                <li>Analytical mindset for policy validation</li>
                                <li> High proficiency in research & Problem Solving</li>
                            </ul>
                            <p className="text-gray-700 mb-4 mt-4">
                                <strong> Academic Pedigree : </strong> Graduates from top-tier social science institutions in India will be prioritized. 
                            </p>
                            <p className="text-gray-700 mb-4">
                                <strong> Role Details : </strong>
                            </p>
                            <ul className="list-disc pl-5 text-gray-700 space-y-2">
                                <li><strong>Type : </strong>FullTime</li>
                                <li><strong>Location : </strong>Onsite Coimbatore,Tamil Nadu</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= KEY RESPONSIBILITIES ================= */}
            <section className="px-6 py-16 bg-gray-900 text-white rounded-t-[3rem]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-12 text-center text-teal-400">Core Responsibilities</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Validation",
                                desc: "Engage with communities and NGOs to validate if problems are recurring and unresolved."
                            },
                            {
                                title: "Social Research",
                                desc: "Design baseline studies and research frameworks to document findings in structured reports."
                            },
                            {
                                title: "Policy Analysis",
                                desc: "Assess if failures are due to policy design, execution, or institutional capacity gaps."
                            },
                            {
                                title: "Outreach",
                                desc: "Build long-term relationships with CSR foundations, Government bodies, and grassroots organizations."
                            },
                            {
                                title: "Collaboration",
                                desc: "Work with STEM teams to translate validated problems into actionable engineering projects."
                            },
                            {
                                title: "Leadership",
                                desc: "Oversee social sensitivity and ethical standards across all REACT community initiatives."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-gray-800 p-6 rounded-2xl hover:bg-teal-900/30 transition-all border border-gray-700">
                                <h3 className="text-xl font-bold mb-3 text-teal-500">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= THE REACT PHILOSOPHY ================= */}
            <section className="px-6 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold mb-8 text-gray-800">Is This the Right Fit for You?</h2>
                    <div className="bg-teal-50 p-8 md:p-12 rounded-3xl border border-teal-100">
                        <p className="text-teal-900 text-lg md:text-xl italic font-medium mb-6">
                            "REACT works on real, unresolved social problems, not ideas invented in classrooms or offices. 
                            We do not start with solutions. We start by questioning why problems still exist."
                        </p>
                        <ul className="text-left space-y-4 inline-block mx-auto">
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-teal-600 font-bold">✓</span> You are comfortable saying “this will not work” when evidence points that way.
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-teal-600 font-bold">✓</span> You care more about field reality than quick visibility.
                            </li>
                            <li className="flex items-start gap-3 text-gray-700">
                                <span className="text-teal-600 font-bold">✓</span> You want a foundational role with high responsibility, not a routine NGO job.
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
                    If you are a curious, grounded researcher ready to lead the social front of 
                    meaningful interventions, we would like to hear from you.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/work-social-form"
                        className="inline-flex items-center justify-center bg-[#0f766e] hover:bg-[#115e59] text-white px-10 py-4 rounded-md text-base font-bold transition shadow-xl"
                    >
                        Submit Application
                    </Link>
                </div>
                <p className="mt-8 text-sm text-gray-500">
                    Visit <a href="https://react.kct.ac.in" target="_blank" rel="noreferrer" className="underline hover:text-teal-500 transition">react.kct.ac.in</a> for further information.
                </p>
            </section>

        </div>
    );
};