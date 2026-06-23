import React, { useState } from "react";

const steps = ["Basic Details", "Leadership & Communication", "Event Planning Experience", "Organizational Skills", "Vision & Commitment"];

export const EventManagerForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    degree: "", department: "", departmentOther: "", yearOfStudy: "", rollNumber: "",
    degreeOther: "",
    leadershipExperience: "", communicationSkills: "", teamManagement: "",
    eventPlanningExperience: "", eventTypesOrganized: "", coordinationSkills: "",
    timeManagement: "", logisticsHandling: "", problemSolving: "",
    visionForReact: "", availability: "", joiningTime: ""
  });

  const handleChange = (e) => {
    setShowErrors(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file (Resume + Portfolio).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        type: file.type,
        data: reader.result.split(",")[1]
      });
    };
    reader.readAsDataURL(file);
  };

  const getStepErrors = () => {
    const errors = [];
    if (step === 0) {
      if (!formData.fullName) errors.push("Full Name is required");
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.push("Valid email is required");
      if (!formData.phone || formData.phone.length < 10) errors.push("Valid phone number is required");
      if (!formData.rollNumber || !formData.rollNumber.trim()) errors.push("Roll Number is required");
      if (!formData.degree) errors.push("Degree is required");
      if (formData.degree === "Other" && (!formData.degreeOther || !formData.degreeOther.trim())) errors.push("Please specify your degree");
      if (!formData.department) errors.push("Department/Branch is required");
      if (formData.department === "Other" && (!formData.departmentOther || !formData.departmentOther.trim())) errors.push("Please specify your department");
      if (!formData.yearOfStudy) errors.push("Year of Study is required");
    }
    if (step === 1) {
      if (!formData.leadershipExperience || formData.leadershipExperience.length < 50) errors.push("Provide more detail on leadership experience");
      if (!formData.communicationSkills || formData.communicationSkills.length < 50) errors.push("Describe your communication skills in detail");
      if (!formData.teamManagement) errors.push("Explain your team management experience");
    }
    if (step === 2) {
      if (!formData.eventPlanningExperience || formData.eventPlanningExperience.length < 50) errors.push("Details on event planning experience are required");
      if (!formData.eventTypesOrganized) errors.push("List the types of events you have organized");
      if (!formData.coordinationSkills || formData.coordinationSkills.length < 50) errors.push("Describe your coordination and organizational skills");
    }
    if (step === 3) {
      if (!formData.timeManagement || formData.timeManagement.length < 50) errors.push("Explain your approach to time management");
      if (!formData.logisticsHandling || formData.logisticsHandling.length < 50) errors.push("Describe your experience handling logistics");
      if (!formData.problemSolving || formData.problemSolving.length < 50) errors.push("Share examples of problem-solving in event contexts");
    }
    if (step === 4) {
      if (!formData.visionForReact || formData.visionForReact.length < 50) errors.push("Please share your vision for events at REACT");
      if (!formData.availability) errors.push("Availability confirmation is required");
      if (!formData.joiningTime) errors.push("Joining time is required");
      if (!resumeFile) errors.push("Resume & Portfolio PDF is required");
    }
    return errors;
  };

  const errors = getStepErrors();
  const isValid = errors.length === 0;

  const next = () => {
    if (isValid) {
      setStep((s) => s + 1);
      setShowErrors(false);
      window.scrollTo(0, 0);
    } else {
      setShowErrors(true);
    }
  };

  const back = () => {
    setStep((s) => s - 1);
    setShowErrors(false);
  };

  const submitForm = async () => {
    if (!isValid) {
      setShowErrors(true);
      console.log("Form validation errors:", errors);
      return;
    }
    setLoading(true);

    try {
      const payload = { ...formData, resume: resumeFile };
      console.log("Submitting form data:", payload);
      
      // Replace YOUR_GOOGLE_APPS_SCRIPT_URL_HERE with your deployed Google Apps Script Web App URL
      const scriptUrl = "https://script.google.com/macros/s/AKfycbxoxuobcIpkCZlU1aQMZ2tZA5Eg6fiX2IBzvHN86tg1pUKP5DsyJjzM1ra_tBNK8zc-/exec";
      
      if (scriptUrl === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
        alert("Error: Google Apps Script URL not configured. Please contact the administrator.");
        setLoading(false);
        return;
      }

      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
      
      alert("Event Manager Registration Submitted Successfully!");
      window.location.reload(); 
    } catch (err) {
      console.error("Form submission error:", err);
      alert("Submission failed. Please check your internet connection and try again. Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8 font-sans">
      <div className="h-20 w-full" />

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-sm border border-purple-100 p-6 md:p-10">
        <p className="text-sm text-gray-500 mb-2 text-center">Open to KCT students only</p>
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center min-w-[120px]">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${i <= step ? "bg-[#7c3aed] text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-[9px] uppercase mt-2 font-bold tracking-tighter text-center ${i <= step ? "text-[#7c3aed]" : "text-gray-400"}`}>{label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-purple-50 pb-4">{steps[step]}</h2>

        {/* ERROR SUMMARY */}
        {showErrors && errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-sm font-bold text-red-700 mb-1">Please complete the required details:</p>
            <ul className="list-disc list-inside text-xs text-red-600">
              {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
        )}

        <div className="space-y-6">
          {/* STEP 1: BASIC DETAILS */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: 'fullName', label: 'Full Name' },
                { name: 'email', label: 'KCT Email ID' },
                { name: 'phone', label: 'Phone Number' },
                { name: 'location', label: 'Current Location (e.g. Hostel / Coimbatore)' },
                { name: 'rollNumber', label: 'Roll Number' }
              ].map((field) => (
                <div key={field.name} className={field.name === 'location' || field.name === 'rollNumber' ? "md:col-span-2" : ""}>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{field.label} *</label>
                  <input 
                    name={field.name} 
                    onChange={handleChange} 
                    value={formData[field.name]} 
                    placeholder={field.name === 'email' ? 'e.g. name@students.kct.ac.in' : ''}
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none transition-all ${showErrors && !formData[field.name] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-purple-500"}`} 
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Degree *</label>
                <select name="degree" onChange={handleChange} value={formData.degree} className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white outline-none ${showErrors && !formData.degree ? "border-red-300 bg-red-50" : "border-gray-200"}`}>
                  <option value="">Select Degree</option>
                  <option>B.E. / B.Tech</option>
                  <option>B.Sc.</option>
                  <option>B.A.</option>
                  <option>B.Com</option>
                  <option>BBA</option>
                  <option>BCA</option>
                  <option>B.Des</option>
                  <option>MBA</option>
                  <option>MCA</option>
                  <option>M.Tech</option>
                  <option>Other</option>
                </select>
              </div>
              {formData.degree === "Other" && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Specify Degree *</label>
                  <input
                    name="degreeOther"
                    onChange={handleChange}
                    value={formData.degreeOther}
                    placeholder="Enter your degree"
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none ${showErrors && formData.degree === "Other" && !formData.degreeOther?.trim() ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-purple-500"}`}
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department / Branch *</label>
                <select name="department" onChange={handleChange} value={formData.department} className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white outline-none ${showErrors && !formData.department ? "border-red-300 bg-red-50" : "border-gray-200"}`}>
                  <option value="">Select Department</option>
                  <optgroup label="Engineering & Technology">
                    <option>Computer Science and Engineering (CSE)</option>
                    <option>Information Technology (IT)</option>
                    <option>Artificial Intelligence and Data Science (AI & DS)</option>
                    <option>Electronics and Communication Engineering (ECE)</option>
                    <option>Electrical and Electronics Engineering (EEE)</option>
                    <option>Mechanical Engineering</option>
                    <option>Civil Engineering</option>
                    <option>Mechatronics Engineering</option>
                    <option>Automobile Engineering</option>
                    <option>Textile Technology</option>
                    <option>Fashion Technology</option>
                    <option>Biotechnology</option>
                  </optgroup>
                  <optgroup label="Postgraduate">
                    <option>Master of Business Administration (MBA)</option>
                    <option>Master of Computer Applications (MCA)</option>
                  </optgroup>
                  <optgroup label="Computer Science & Technology">
                    <option>Computer Science & Technology</option>
                    <option>B.Sc. Computer Science</option>
                    <option>B.Sc. Information Technology</option>
                    <option>B.Sc. Artificial Intelligence and Data Science</option>
                    <option>BCA (Bachelor of Computer Applications)</option>
                  </optgroup>
                  <optgroup label="Commerce & Management">
                    <option>B.Com (General)</option>
                    <option>B.Com (Accounting and Finance)</option>
                    <option>B.Com (Business Analytics)</option>
                    <option>BBA (Bachelor of Business Administration)</option>
                  </optgroup>
                  <optgroup label="Media, Arts & Design">
                    <option>B.A. English Literature</option>
                    <option>B.A. Visual Communication</option>
                    <option>B.A. Professional English</option>
                    <option>B.Des (Communication Design)</option>
                  </optgroup>
                  <optgroup label="Psychology & Social Sciences">
                    <option>B.Sc. Psychology</option>
                    <option>B.A. Economics</option>
                  </optgroup>
                  <option value="Other">Other</option>
                </select>
              </div>
              {formData.department === "Other" && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Specify Department *</label>
                  <input
                    name="departmentOther"
                    onChange={handleChange}
                    value={formData.departmentOther}
                    placeholder="Enter your department / branch"
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none ${showErrors && formData.department === "Other" && !formData.departmentOther?.trim() ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-purple-500"}`}
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Year of Study *</label>
                <select name="yearOfStudy" onChange={handleChange} value={formData.yearOfStudy} className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white outline-none ${showErrors && !formData.yearOfStudy ? "border-red-300 bg-red-50" : "border-gray-200"}`}>
                  <option value="">Select Year</option>
                  <option>I Year</option>
                  <option>II Year</option>
                  <option>III Year</option>
                  <option>IV Year</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: LEADERSHIP & COMMUNICATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Leadership Experience (in college / school) *</label>
                <textarea 
                  name="leadershipExperience" 
                  onChange={handleChange} 
                  value={formData.leadershipExperience} 
                  placeholder="Describe your leadership roles in clubs, fests, committees, or class/council. Include examples of leading teams, taking initiative, or organising activities (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.leadershipExperience || formData.leadershipExperience.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Communication Skills *</label>
                <textarea 
                  name="communicationSkills" 
                  onChange={handleChange} 
                  value={formData.communicationSkills} 
                  placeholder="Describe your communication abilities—e.g. anchoring, presentations, coordinating with peers and faculty, written communication (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.communicationSkills || formData.communicationSkills.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Team / Group Coordination Experience *</label>
                <textarea 
                  name="teamManagement" 
                  onChange={handleChange} 
                  value={formData.teamManagement} 
                  placeholder="Explain how you have coordinated with classmates, club members, or faculty for events or projects. Any experience leading or working in a team (100-150 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && !formData.teamManagement ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
            </div>
          )}

          {/* STEP 3: EVENT PLANNING EXPERIENCE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event / Fest Experience (college or school) *</label>
                <textarea 
                  name="eventPlanningExperience" 
                  onChange={handleChange} 
                  value={formData.eventPlanningExperience} 
                  placeholder="Describe your role in organising fests, workshops, seminars, or any campus/school events. Include event type, size, and your responsibility (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.eventPlanningExperience || formData.eventPlanningExperience.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Types of Events You Have Been Part Of *</label>
                <textarea 
                  name="eventTypesOrganized" 
                  onChange={handleChange} 
                  value={formData.eventTypesOrganized} 
                  placeholder="List events you have organised or helped with (e.g. tech fests, workshops, cultural events, seminars, hackathons, club events, etc.)..."
                  className={`w-full border p-4 rounded-xl h-24 outline-none transition-all ${showErrors && !formData.eventTypesOrganized ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Coordination & Organisational Skills *</label>
                <textarea 
                  name="coordinationSkills" 
                  onChange={handleChange} 
                  value={formData.coordinationSkills} 
                  placeholder="Describe how you coordinate with peers, faculty, or external speakers/participants. How do you manage multiple tasks during an event? (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.coordinationSkills || formData.coordinationSkills.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
            </div>
          )}

          {/* STEP 4: ORGANIZATIONAL SKILLS */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Time Management & Planning *</label>
                <textarea 
                  name="timeManagement" 
                  onChange={handleChange} 
                  value={formData.timeManagement} 
                  placeholder="How do you balance academics with event work? How do you manage deadlines and plan ahead for events or assignments? (100-150 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.timeManagement || formData.timeManagement.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Logistics / Arrangements Experience *</label>
                <textarea 
                  name="logisticsHandling" 
                  onChange={handleChange} 
                  value={formData.logisticsHandling} 
                  placeholder="Describe your experience with venue, equipment, registration, or any arrangements for college/school events (100-150 words). If limited, describe how you would approach it..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.logisticsHandling || formData.logisticsHandling.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Problem-Solving During Events *</label>
                <textarea 
                  name="problemSolving" 
                  onChange={handleChange} 
                  value={formData.problemSolving} 
                  placeholder="Share examples of challenges during fests/events (last-minute changes, technical issues, coordination) and how you resolved them (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.problemSolving || formData.problemSolving.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
            </div>
          )}

          {/* STEP 5: VISION & COMMITMENT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to be an Event Manager at REACT? *</label>
                <textarea 
                  name="visionForReact" 
                  onChange={handleChange} 
                  value={formData.visionForReact} 
                  placeholder="Share your motivation and what you hope to contribute to REACT events. How do you want to create impact as a student event manager? (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.visionForReact || formData.visionForReact.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Can you commit to REACT alongside your studies? *</label>
                <select name="availability" onChange={handleChange} value={formData.availability} className={`w-full border p-3 rounded-lg bg-white outline-none border-gray-200 ${showErrors && !formData.availability ? "border-red-300 bg-red-50" : ""}`}>
                  <option value="">Select</option>
                  <option value="Yes">Yes, I can commit</option>
                  <option value="Part-time">I can contribute part-time alongside academics</option>
                  <option value="Need to discuss">I’d like to discuss workload</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">When can you start? *</label>
                <select name="joiningTime" onChange={handleChange} value={formData.joiningTime} className={`w-full border p-3 rounded-lg bg-white outline-none border-gray-200 ${showErrors && !formData.joiningTime ? "border-red-300 bg-red-50" : ""}`}>
                    <option value="">Select</option>
                    <option>Immediately / This semester</option>
                    <option>Within 1 month</option>
                    <option>After 1 month</option>
                    <option>Next semester</option>
                </select>
              </div>
              <div className={`p-6 rounded-2xl border transition-all ${!resumeFile && showErrors ? "bg-red-50 border-red-300" : "bg-purple-50 border-purple-100"}`}>
                <label className="block text-sm font-bold text-[#7c3aed] mb-2 text-center uppercase tracking-widest leading-tight">
                    Upload Resume / CV (PDF only) *<br/>
                    <span className="text-[10px] text-gray-500 lowercase font-normal">(Include participation in events, clubs, or any relevant experience. One-page CV is fine)</span>
                </label>
                <input type="file" accept=".pdf" onChange={handleFile} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7c3aed] file:text-white cursor-pointer" />
                {resumeFile && <p className="text-center text-xs text-green-600 mt-2 font-bold font-mono">✓ {resumeFile.name} attached</p>}
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-between mt-10 pt-6 border-t border-purple-50">
          <button onClick={back} disabled={step === 0} className={`px-8 py-2.5 rounded-lg font-bold transition-all ${step === 0 ? "opacity-0 invisible" : "text-gray-500 hover:bg-gray-100 border"}`}>
            Back
          </button>
          
          {step < steps.length - 1 ? (
            <button 
                onClick={next} 
                className={`px-10 py-2.5 rounded-lg font-bold transition-all ${isValid ? "bg-[#7c3aed] text-white hover:shadow-lg hover:bg-[#6d28d9]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Next Step
            </button>
          ) : (
            <button 
                onClick={submitForm} 
                disabled={loading || !isValid} 
                className={`px-10 py-2.5 rounded-lg font-bold transition-all ${isValid && !loading ? "bg-green-600 text-white hover:bg-green-700 shadow-md" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
