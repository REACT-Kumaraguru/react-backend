import React, { useState } from "react";

const steps = ["Profile", "Expertise", "Contribution", "Alignment", "Expression"];

export const AdviForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    currentRole: "", organization: "", 
    advisorProfile: "", // From the "Ideal Advisor Profiles" list
    expertiseAreas: "", // Multi-select or text
    primaryContribution: "", // The 5 Core Areas
    strategicVision: "", 
    timeCommitment: "",
    whyReactAdvisor: "", 
    linkedInProfile: ""
  });

  const handleChange = (e) => {
    setShowErrors(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file (Profile/CV).");
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
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.push("Valid professional email is required");
      if (!formData.currentRole) errors.push("Current Designation is required");
      if (!formData.organization) errors.push("Organization name is required");
    }
    if (step === 1) {
      if (!formData.advisorProfile) errors.push("Please select your primary professional profile");
      if (!formData.expertiseAreas || formData.expertiseAreas.length < 20) errors.push("Please describe your areas of expertise");
    }
    if (step === 2) {
      if (!formData.primaryContribution) errors.push("Please select a primary area of contribution");
      if (!formData.strategicVision || formData.strategicVision.length < 50) errors.push("Please share your strategic thoughts for REACT");
    }
    if (step === 3) {
      if (!formData.whyReactAdvisor) errors.push("Please explain your resonance with the REACT mission");
      if (!formData.timeCommitment) errors.push("Please select a preferred engagement model");
    }
    if (step === 4) {
      if (!resumeFile) errors.push("Professional Profile / CV PDF is required");
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
      return;
    }
    setLoading(true);

    try {
      // Use your specific Advisor Script URL here
      await fetch("https://script.google.com/macros/s/AKfycby0Z5APuDkY1wW5zHMp3Jqe6zN_4NxQiRMqWmXrNxElV2kwIURlB1AVeidNslPFyDai/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ ...formData, resume: resumeFile }),
      });
      alert("Expression of Interest Submitted Successfully. Our leadership team will reach out to you.");
      window.location.reload(); 
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8 font-sans">
      <div className="h-20 w-full" />

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-sm border border-indigo-100 p-6 md:p-10">
        
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center min-w-[110px]">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${i <= step ? "bg-[#4f46e5] text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-[10px] uppercase mt-2 font-bold tracking-tighter ${i <= step ? "text-[#4f46e5]" : "text-gray-400"}`}>{label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-indigo-50 pb-4">{steps[step]}</h2>

        {/* ERROR SUMMARY */}
        {showErrors && errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-sm font-bold text-red-700 mb-1">Please complete the following details:</p>
            <ul className="list-disc list-inside text-xs text-red-600">
              {errors.map((err, idx) => <li key={idx}>{err}</li>)}
            </ul>
          </div>
        )}

        <div className="space-y-6">
          {/* STEP 1: PROFESSIONAL PROFILE */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: 'fullName', label: 'Full Name' },
                { name: 'email', label: 'Professional Email' },
                { name: 'phone', label: 'Contact Number' },
                { name: 'location', label: 'Location (City, Country)' },
                { name: 'currentRole', label: 'Current Designation' },
                { name: 'organization', label: 'Organization / Institution' }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{field.label} *</label>
                  <input 
                    name={field.name} 
                    onChange={handleChange} 
                    value={formData[field.name]} 
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none transition-all ${showErrors && !formData[field.name] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-indigo-500"}`} 
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">LinkedIn Profile Link</label>
                <input name="linkedInProfile" onChange={handleChange} value={formData.linkedInProfile} placeholder="https://linkedin.com/in/..." className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
          )}

          {/* STEP 2: EXPERTISE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Which profile best describes you? *</label>
                <select name="advisorProfile" onChange={handleChange} value={formData.advisorProfile} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200 focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select Profile</option>
                  <option>UN Systems / International Development / Policy</option>
                  <option>Senior Academic / Researcher</option>
                  <option>Industry Leader / Corporate Executive</option>
                  <option>Startup Founder / Venture Builder</option>
                  <option>Philanthropy / Impact Finance</option>
                  <option>Social Innovation / Community Reform</option>
                  <option>Sustainability / Youth Development</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Key Areas of Expertise *</label>
                <textarea 
                  name="expertiseAreas" 
                  onChange={handleChange} 
                  value={formData.expertiseAreas} 
                  placeholder="Briefly describe your core domains of leadership and experience..."
                  className={`w-full border p-4 rounded-xl h-40 outline-none transition-all ${showErrors && !formData.expertiseAreas ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-indigo-500"}`} 
                />
              </div>
            </div>
          )}

          {/* STEP 3: CONTRIBUTION */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Primary Area of Advisor Contribution *</label>
                <select name="primaryContribution" onChange={handleChange} value={formData.primaryContribution} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                  <option value="">Select Contribution Area</option>
                  <option>Global Partnerships & International Ecosystems</option>
                  <option>Institutional Funding & Resource Mobilization</option>
                  <option>Government & Policy Engagement</option>
                  <option>Innovation, Engineering & Entrepreneurship</option>
                  <option>Thought Leadership & Global Communications</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Strategic Vision for REACT *</label>
                <textarea 
                  name="strategicVision" 
                  onChange={handleChange} 
                  value={formData.strategicVision} 
                  placeholder="How do you see REACT evolving into a global ecosystem by 2050?"
                  className={`w-full border p-4 rounded-xl h-48 outline-none ${showErrors && !formData.strategicVision ? "border-red-300" : "border-gray-200"}`} 
                />
              </div>
            </div>
          )}

          {/* STEP 4: ALIGNMENT */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Why do you resonate with the REACT mission? *</label>
                <textarea name="whyReactAdvisor" onChange={handleChange} value={formData.whyReactAdvisor} className={`w-full border p-4 rounded-xl h-40 outline-none ${showErrors && !formData.whyReactAdvisor ? "border-red-300" : "border-gray-200"}`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Engagement Model *</label>
                <select name="timeCommitment" onChange={handleChange} value={formData.timeCommitment} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                  <option value="">Select Model</option>
                  <option>Quarterly Strategy Inputs</option>
                  <option>Annual Strategy Conversations</option>
                  <option>Mentoring Specific Initiatives</option>
                  <option>Targeted Intervention / Introductions</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL EXPRESSION */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 text-center">
                <p className="text-indigo-900 text-sm italic mb-4">
                  "Advisors are the architects of possibility, helping REACT evolve into a global innovation ecosystem."
                </p>
                <label className="block text-sm font-bold text-[#4f46e5] mb-2 uppercase tracking-widest">
                    Upload Professional Profile / CV (PDF) *
                </label>
                <input type="file" accept=".pdf" onChange={handleFile} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4f46e5] file:text-white cursor-pointer" />
                {resumeFile && <p className="text-center text-xs text-green-600 mt-2 font-bold">✓ Profile Attached: {resumeFile.name}</p>}
              </div>
              <p className="text-xs text-gray-500 text-center leading-relaxed px-4">
                By submitting this form, you express your preliminary interest in joining the REACT Global Advisory Council. 
                Our leadership team will review your profile and reach out for an introductory conversation.
              </p>
            </div>
          )}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-between mt-10 pt-6 border-t border-indigo-50">
          <button onClick={back} disabled={step === 0} className={`px-8 py-2.5 rounded-lg font-bold transition-all ${step === 0 ? "opacity-0 invisible" : "text-gray-500 hover:bg-gray-100 border"}`}>
            Back
          </button>
          
          {step < steps.length - 1 ? (
            <button 
                onClick={next} 
                className={`px-10 py-2.5 rounded-lg font-bold transition-all ${isValid ? "bg-[#4f46e5] text-white hover:shadow-lg" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Next Step
            </button>
          ) : (
            <button 
                onClick={submitForm} 
                disabled={loading || !isValid} 
                className={`px-10 py-2.5 rounded-lg font-bold transition-all ${isValid && !loading ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              {loading ? "Processing..." : "Submit Expression of Interest"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};