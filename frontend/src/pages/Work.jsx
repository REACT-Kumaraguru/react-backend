import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { InterestInfo } from '../components/WorkCom/InterestInfo';

export const Work = () => {
  const location = useLocation();
  const interestSubmitted = location.state?.interestSubmitted === true;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Spacer for Navbar */}
      <div className="h-24 w-full" />

      {interestSubmitted && (
        <div className="max-w-4xl w-full mb-6 p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
          <p className="text-sm font-bold text-green-800 text-center">
            Thank you for submitting your interest. Our team will review and get back to you.
          </p>
        </div>
      )}

      {/* Page Header */}
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Work With Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join a team that values field reality over assumptions and evidence over opinions. 
          We are looking for grounded leaders to join our mission.
        </p>
      </div>

      {/* Role Card Container */}
      <div className="max-w-4xl w-full flex flex-col gap-8">
        
        {/* CARD 1: Social Research & Outreach Lead */}
        {/* <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-3 bg-[#0f766e]"></div>
          <div className="p-8 flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#0f766e] uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  Full-Time Role
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
                  Social Research and Outreach Lead
                </h2>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
                <p className="text-sm font-semibold text-gray-700 uppercase">Coimbatore</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
              Identify real social problems, validate them on the ground, and analyze why they persist. 
              A foundational leadership role requiring strong field alignment.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              
              <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">0-2 Years Exp.</span>
              <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">Master's Degree Required</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/work-social-info" className="inline-flex items-center justify-center border-2 border-[#0f766e] text-[#0f766e] hover:bg-teal-50 px-6 py-2 rounded-lg font-bold transition-all text-sm">
                View Details
              </Link>
              <Link to="/work-social-form" className="inline-flex items-center justify-center bg-[#0f766e] hover:bg-[#115e59] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
                Apply Now
              </Link>
            </div>
          </div>
        </div> */}

       
    {/* <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
      
      <div className="w-full md:w-3 bg-purple-600"></div> 
      
      <div className="p-8 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
              FULL-TIME ROLE
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
              Lead – Curriculum Design & Educational Architecture
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
            <p className="text-sm font-semibold text-gray-700 uppercase">COIMBATORE</p>
          </div>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
          Design the foundational curriculum architecture for REACT. Lead the integration of 
          social validation, STEM intervention, and competency-based certification into 
          a scalable global educational system.
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">
            Postgraduate Required
          </span>
          <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">
            Exp. in Systems Design
          </span>
          <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">
            Remote / Hybrid Possible
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          
          <Link 
            to="/work-lead-info" 
            className="inline-flex items-center justify-center border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-2 rounded-lg font-bold transition-all text-sm"
          >
            View Role Details
          </Link>
          
          <Link 
            to="/work-lead-form" 
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm"
          >
            Apply NOW
          </Link>
        </div>
      </div>
    </div> */}


        {/* CARD 2: Market Research & Partnerships Lead */}
        {/* <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
          <div className="w-full md:w-3 bg-[#be185d]"></div> 
          <div className="p-8 flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#be185d] uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  Full-Time Role
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
                  Market Research and Partnerships Lead
                </h2>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
                <p className="text-sm font-semibold text-gray-700 uppercase">Coimbatore</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
              Drive institutional legitimacy through stakeholder research, CSR partnerships, 
              and strategic grants. Bridging the gap between social research and external resources.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">0-2 Years Exp.</span>
              <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">Master's Degree Required</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/work-market-info" className="inline-flex items-center justify-center border-2 border-[#be185d] text-[#be185d] hover:bg-pink-50 px-6 py-2 rounded-lg font-bold transition-all text-sm">
                View Details
              </Link>
              <Link to="/work-market-form" className="inline-flex items-center justify-center bg-[#be185d] hover:bg-[#9d174d] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
                Apply Now
              </Link>
            </div>
          </div>
        </div> */}

        {/* CARD 3: Mechanical Engineer – Development & Fabrication */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-3 bg-[#2563eb]"></div> 
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#2563eb] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Full-Time role
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
                Mechanical Engineer – Development & Fabrication
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
              <p className="text-sm font-semibold text-gray-700 uppercase">Coimbatore</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
            Core technical leader for the REACT. Responsible for rapid prototyping, 
            operating advanced machinery, and guiding interdisciplinary teams from design to high-quality fabrication.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">0-2 Years Exp.</span>
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">bachelor's or Master's Degree Required</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/work-mech-info" className="inline-flex items-center justify-center border-2 border-[#2563eb] text-[#2563eb] hover:bg-blue-50 px-6 py-2 rounded-lg font-bold transition-all text-sm">
              View Details
            </Link>
            <Link to="/work-mech-form" className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
      

            {/* CARD 4: Electronics / EEE Engineer – Embedded Systems & Automation */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-3 bg-[#ea580c]"></div> {/* Orange Accent for Electronics */}
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#ea580c] uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                full-time role
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
                Electronics / EEE Engineer – Embedded & Automation
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
              <p className="text-sm font-semibold text-gray-700 uppercase">Coimbatore</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
            Lead embedded systems development and automation at REACT. 
            Help students integrate sensors, PCBs, and control logic into real-world mechatronic prototypes.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">0-2 years Exp.</span>
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">bachelor's or Master's Degree Required</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/work-elec-info" className="inline-flex items-center justify-center border-2 border-[#ea580c] text-[#ea580c] hover:bg-orange-50 px-6 py-2 rounded-lg font-bold transition-all text-sm">
              View Details
            </Link>
            <Link to="/work-elec-form" className="inline-flex items-center justify-center bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
              Apply Now
            </Link>
          </div>
        </div>
      </div>
      
    {/* CARD 5: Global Advisor – Strategy and Partnerships */}
{/* <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
  <div className="w-full md:w-3 bg-[#4f46e5]"></div>
  <div className="p-8 flex-1">
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="text-[10px] font-bold text-[#4f46e5] uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
          Strategic Partnership
        </span>
        <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
          Global Advisor – Strategy and Partnerships
        </h2>
      </div>
      <div className="hidden md:block text-right">
        <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
        <p className="text-sm font-semibold text-gray-700 uppercase">Global (Remote)</p>
      </div>
    </div>
    <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
      Act as a strategic thought partner to REACT’s leadership. Help architect our 2050 vision by guiding 
      international partnerships, institutional funding pathways, and global ecosystem expansion.
    </p>
    <div className="flex flex-wrap gap-2 mb-8">
      <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">Strategic Visioning</span>
      <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">UN & Global Policy</span>
      <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">Philanthropy & Grants</span>
    </div>
    <div className="flex flex-col sm:flex-row gap-3">
      <Link to="/work-advisor-info" className="inline-flex items-center justify-center border-2 border-[#4f46e5] text-[#4f46e5] hover:bg-indigo-50 px-6 py-2 rounded-lg font-bold transition-all text-sm">
        View Vision
      </Link>
      <Link to="/work-advisor-form" className="inline-flex items-center justify-center bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
        Express Interest
      </Link>
    </div>
  </div>
</div> */}

      {/* CARD 6: Web Developer – Student Role */}
      {/* <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-3 bg-yellow-500"></div> 
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                Student Role
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
                Web Developer Intern
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
              <p className="text-sm font-semibold text-gray-700 uppercase">Coimbatore</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
            Build impactful web solutions and grow your skills through hands-on projects. 
            Open to all departments. Work on real-world applications that serve institutional needs.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">Open to All Departments</span>
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">KCT Students</span>
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">Hands-on Learning</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/work-web-developer-info" className="inline-flex items-center justify-center border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-6 py-2 rounded-lg font-bold transition-all text-sm">
              View Details
            </Link>
            <Link to="/work-web-developer-form" className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
              Apply Now
            </Link>
          </div>
        </div>
      </div> */}

      {/* CARD 7: Event Manager – Student Role */}
      {/* <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-3 bg-[#7c3aed]"></div> 
        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#7c3aed] uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                Student Role
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
                Event Manager
              </h2>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Location</p>
              <p className="text-sm font-semibold text-gray-700 uppercase">Coimbatore</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
            Lead and execute high-impact institutional events. Gain hands-on experience in planning, 
            coordination, and operations. Build leadership and management skills.
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">KCT Students</span>
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">Leadership Skills</span>
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">Event Planning</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/work-event-info" className="inline-flex items-center justify-center border-2 border-[#7c3aed] text-[#7c3aed] hover:bg-purple-50 px-6 py-2 rounded-lg font-bold transition-all text-sm">
              View Details
            </Link>
            <Link to="/work-event-form" className="inline-flex items-center justify-center bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm">
              Apply Now
            </Link>
          </div>
        </div>
      </div> */}

      {/* CARD 8: Research Intern – Student Role */}
      {/* <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
        
        
        <div className="w-full md:w-3 bg-[#2563eb]"></div>

        <div className="p-8 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-bold text-[#2563eb] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Student Role
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
                Research Intern
              </h2>
            </div>

            <div className="hidden md:block text-right">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
                Location
              </p>
              <p className="text-sm font-semibold text-gray-700 uppercase">
                Coimbatore
              </p>
            </div>
          </div>

          <p className="text-gray-600 mb-6 line-clamp-2 text-sm leading-relaxed">
            Contribute to innovative research initiatives and academic projects. 
            Gain hands-on experience in data analysis, literature review, and 
            research documentation while working with mentors.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">
              KCT Students
            </span>
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">
              Analytical Skills
            </span>
            <span className="text-[11px] bg-gray-50 text-gray-500 border px-2 py-1 rounded font-medium">
              Research & Innovation
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/work-research-intern-info"
              className="inline-flex items-center justify-center border-2 border-[#2563eb] text-[#2563eb] hover:bg-blue-50 px-6 py-2 rounded-lg font-bold transition-all text-sm"
            >
              View Details
            </Link>

            <Link
              to="/work-research-intern-form"
              className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-2 rounded-lg font-bold transition-all shadow-sm text-sm"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div> */}

      <InterestInfo />

      
      </div>

      {/* Footer Note */}
      <div className="mt-20 text-center pb-10">
        <p className="text-gray-400 text-sm">
          Don't see a role that fits? Visit <a href="https://react.kct.ac.in" className="underline hover:text-gray-600 transition-colors">our website</a> to learn more about our mission.
        </p>
      </div>
    </div>
  );
};