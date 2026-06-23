import React, { useState } from "react";

const steps = ["Basic Details", "Experience", "Alignment", "Representation", "Commitment"];

export const MarketForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    qualification: "", year: "", status: "", 
    exposure: "", workedOnResearch: "", researchExp: "",
    reactMeaning: "", successFailureAnalysis: "", alignmentDecision: "",
    researchComfort: "", representedExternal: "", representationExp: "",
    workLink: "", whyReactSpecific: "", comfortAmbiguity: "", joiningTime: ""
  });

  const handleChange = (e) => {
    setShowErrors(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
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

  // MASTER VALIDATION LOGIC
  const getStepErrors = () => {
    const errors = [];
    if (step === 0) {
      if (!formData.fullName) errors.push("Full Name is required");
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.push("Valid email is required");
      if (!formData.phone || formData.phone.length < 10) errors.push("Valid phone number is required");
      if (!formData.status) errors.push("Current status is required");
    }
    if (step === 1) {
      if (!formData.exposure || formData.exposure.length < 20) errors.push("Please provide more detail about your exposure");
      if (!formData.workedOnResearch) errors.push("Please select if you have worked on research");
      if (formData.workedOnResearch === "Yes" && !formData.researchExp) errors.push("Please describe your research experience");
    }
    if (step === 2) {
      if (!formData.reactMeaning) errors.push("REACT's way of working explanation is required");
      if (!formData.successFailureAnalysis) errors.push("Success/Failure analysis is required");
      if (!formData.alignmentDecision) errors.push("Alignment decision explanation is required");
    }
    if (step === 3) {
      if (!formData.researchComfort) errors.push("Research comfort level is required");
      if (!formData.representedExternal) errors.push("External representation status is required");
      if (formData.representedExternal === "Yes" && !formData.representationExp) errors.push("Representation experience detail is required");
    }
    if (step === 4) {
      if (!formData.whyReactSpecific) errors.push("Please explain why REACT specifically");
      if (!formData.comfortAmbiguity) errors.push("Ambiguity comfort must be selected");
      if (!formData.joiningTime) errors.push("Joining time is required");
      if (!resumeFile) errors.push("Resume PDF is required");
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
      await fetch("https://script.google.com/macros/s/AKfycbx9b1O9wtUFX3tBANiBhWmST4OlYZTZDz1q2C8eL1jYj-mqZHeVFegKRIYO8PffLIxz/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ ...formData, resume: resumeFile }),
      });
      alert("Application Submitted Successfully!");
      window.location.reload(); 
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8 font-sans">
      <div className="h-20 w-full" />

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-sm border border-pink-100 p-6 md:p-10">
        
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center min-w-[100px]">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${i <= step ? "bg-[#be185d] text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-[10px] uppercase mt-2 font-bold tracking-tighter ${i <= step ? "text-[#be185d]" : "text-gray-400"}`}>{label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-pink-50 pb-4">{steps[step]}</h2>

        {/* ERROR SUMMARY */}
        {showErrors && errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <p className="text-sm font-bold text-red-700 mb-1">Please fix the following:</p>
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
                { name: 'email', label: 'Email ID' },
                { name: 'phone', label: 'Phone Number' },
                { name: 'location', label: 'Current Location' },
                { name: 'qualification', label: 'Highest Qualification' },
                { name: 'year', label: 'Year of Completion' }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{field.label} *</label>
                  <input 
                    name={field.name} 
                    onChange={handleChange} 
                    value={formData[field.name]} 
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none transition-all ${showErrors && !formData[field.name] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-pink-500"}`} 
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Status *</label>
                <select name="status" onChange={handleChange} value={formData.status} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-pink-500 bg-white outline-none border-gray-200">
                  <option value="">Select Status</option>
                  <option>Student</option>
                  <option>Recently graduated</option>
                  <option>Working professional</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: EXPERIENCE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Exposure to Market Research/Partnerships *</label>
                <textarea 
                  name="exposure" 
                  onChange={handleChange} 
                  value={formData.exposure} 
                  placeholder="Describe your experience with grants, CSR, or applied research..."
                  className={`w-full border p-4 rounded-xl h-40 outline-none transition-all ${showErrors && !formData.exposure ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-pink-500"}`} 
                />
              </div>

              {/* RESEARCH VALIDATION BOX */}
              <div className={`p-5 rounded-xl border transition-all ${showErrors && !formData.workedOnResearch ? "border-red-400 bg-red-50" : "border-gray-100 bg-gray-50"}`}>
                <label className="block text-sm font-bold text-gray-700 mb-3 underline">
                  Have you worked on research related to institutions/social initiatives? *
                </label>
                <select name="workedOnResearch" onChange={handleChange} value={formData.workedOnResearch} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                  <option value="">-- Select Option --</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {showErrors && !formData.workedOnResearch && (
                    <p className="text-red-600 text-xs font-bold mt-2 italic">⚠️ Selection Required: Please choose an option above.</p>
                )}
              </div>

              {formData.workedOnResearch === "Yes" && (
                <div className="pt-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Describe one research experience & learning *</label>
                  <textarea 
                    name="researchExp" 
                    onChange={handleChange} 
                    value={formData.researchExp} 
                    className={`w-full border p-4 rounded-xl h-40 outline-none transition-all ${showErrors && !formData.researchExp ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-pink-500"}`} 
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 3: ALIGNMENT */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-pink-50 p-4 rounded-lg text-xs text-[#be185d] font-bold uppercase mb-4 tracking-widest">Alignment Assessment</div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What does REACT’s way of working mean to you? *</label>
                <textarea name="reactMeaning" onChange={handleChange} value={formData.reactMeaning} className={`w-full border p-4 rounded-xl h-32 outline-none ${showErrors && !formData.reactMeaning ? "border-red-300" : "border-gray-200"}`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Analysis of a program's success/failure in gaining support *</label>
                <textarea name="successFailureAnalysis" onChange={handleChange} value={formData.successFailureAnalysis} className={`w-full border p-4 rounded-xl h-48 outline-none ${showErrors && !formData.successFailureAnalysis ? "border-red-300" : "border-gray-200"}`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Alignment based decision history *</label>
                <textarea name="alignmentDecision" onChange={handleChange} value={formData.alignmentDecision} className={`w-full border p-4 rounded-xl h-32 outline-none ${showErrors && !formData.alignmentDecision ? "border-red-300" : "border-gray-200"}`} />
              </div>
            </div>
          )}

          {/* STEP 4: REPRESENTATION */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Comfortable with research documentation tasks? *</label>
                <select name="researchComfort" onChange={handleChange} value={formData.researchComfort} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                  <option value="">Select</option>
                  <option>Yes</option><option>Somewhat</option><option>No</option>
                </select>
              </div>
              <div className={`p-4 rounded-xl border ${showErrors && !formData.representedExternal ? "border-red-300 bg-red-50" : "border-transparent"}`}>
                <label className="block text-sm font-bold text-gray-700 mb-2">Ever represented an institution to external stakeholders? *</label>
                <select name="representedExternal" onChange={handleChange} value={formData.representedExternal} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option><option value="No">No</option>
                </select>
              </div>
              {formData.representedExternal === "Yes" && (
                <textarea name="representationExp" onChange={handleChange} value={formData.representationExp} placeholder="Describe the experience..." className="w-full border p-4 rounded-xl h-32 outline-none border-gray-200" />
              )}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Work Link (Optional)</label>
                <input name="workLink" onChange={handleChange} value={formData.workLink} className="w-full border p-3 rounded-lg outline-none border-gray-200" />
              </div>
            </div>
          )}

          {/* STEP 5: COMMITMENT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Why REACT specifically? *</label>
                <textarea name="whyReactSpecific" onChange={handleChange} value={formData.whyReactSpecific} className={`w-full border p-4 rounded-xl h-32 outline-none ${showErrors && !formData.whyReactSpecific ? "border-red-300" : "border-gray-200"}`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Comfortable with ambiguity? *</label>
                <select name="comfortAmbiguity" onChange={handleChange} value={formData.comfortAmbiguity} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option><option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">When can you join? *</label>
                <select name="joiningTime" onChange={handleChange} value={formData.joiningTime} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                    <option value="">Select</option>
                    <option>Within 1 month</option><option>1 month</option><option>2 month</option><option>Later</option>
                </select>
              </div>
              <div className={`p-6 rounded-2xl border transition-all ${!resumeFile && showErrors ? "bg-red-50 border-red-300" : "bg-pink-50 border-pink-100"}`}>
                <label className="block text-sm font-bold text-[#be185d] mb-2 text-center uppercase tracking-widest">Upload Resume (PDF only) *</label>
                <input type="file" accept=".pdf" onChange={handleFile} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#be185d] file:text-white cursor-pointer" />
                {resumeFile && <p className="text-center text-xs text-green-600 mt-2 font-bold font-mono">✓ {resumeFile.name} attached</p>}
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-between mt-10 pt-6 border-t border-pink-50">
          <button onClick={back} disabled={step === 0} className={`px-8 py-2.5 rounded-lg font-bold transition-all ${step === 0 ? "opacity-0 invisible" : "text-gray-500 hover:bg-gray-100 border"}`}>
            Back
          </button>
          
          {step < steps.length - 1 ? (
            <button 
                onClick={next} 
                className={`px-10 py-2.5 rounded-lg font-bold transition-all ${isValid ? "bg-[#be185d] text-white hover:shadow-lg" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
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