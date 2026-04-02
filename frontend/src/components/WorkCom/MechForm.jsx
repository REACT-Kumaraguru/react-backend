import React, { useState } from "react";

const steps = ["Basic Details", "Technical Exposure", "Student & Labs", "Safety & Responsibility", "Ownership & Fit"];

export const MechForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    gender: "", // Added Gender
    qualification: "", year: "", status: "", 
    exposureDesc: "", machineTools: "", designToFabProject: "",
    studentSupportExp: "", handlingUnsafeDesign: "",
    safetyComfort: "", maintenanceExp: "",
    ideaLabVision: "", personalityFit: "", joiningTime: ""
  });

  const handleChange = (e) => {
    setShowErrors(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF file (Portfolio + Resume).");
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
      if (!formData.gender) errors.push("Gender selection is required"); // Validation for Gender
      if (!formData.status) errors.push("Current status is required");
    }
    if (step === 1) {
      if (!formData.exposureDesc || formData.exposureDesc.length < 100) errors.push("Provide more detail on technical exposure (min 100 chars)");
      if (!formData.machineTools) errors.push("Please mention the machines you have operated");
      if (!formData.designToFabProject) errors.push("Describe your design-to-fabrication project");
    }
    if (step === 2) {
      if (!formData.studentSupportExp) errors.push("Details on student support experience are required");
      if (!formData.handlingUnsafeDesign) errors.push("Explain how you handle unsafe designs");
    }
    if (step === 3) {
      if (!formData.safetyComfort) errors.push("Explain your comfort with safety protocols");
      if (!formData.maintenanceExp) errors.push("Details on maintenance/calibration are required");
    }
    if (step === 4) {
      if (!formData.ideaLabVision) errors.push("Please share your vision for the IDEA Lab");
      if (!formData.personalityFit) errors.push("Confirmation of personality fit is required");
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
      return;
    }
    setLoading(true);

    try {
      await fetch("https://script.google.com/macros/s/AKfycbxqWMgH78ucfsqVHfl3kTS1btozu98ylESpdCZBOI9qqX1Hw_pc_3W7V4gMZ_a3OJAI_w/exec", {
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

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-sm border border-blue-100 p-6 md:p-10">
        
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center min-w-[120px]">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${i <= step ? "bg-[#2563eb] text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-[9px] uppercase mt-2 font-bold tracking-tighter text-center ${i <= step ? "text-[#2563eb]" : "text-gray-400"}`}>{label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-blue-50 pb-4">{steps[step]}</h2>

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
                { name: 'qualification', label: 'Highest Qualification (Degree, Discipline, Institution)' },
                { name: 'year', label: 'Year of Completion' }
              ].map((field) => (
                <div key={field.name} className={field.name === 'qualification' ? "md:col-span-2" : ""}>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{field.label} *</label>
                  <input 
                    name={field.name} 
                    onChange={handleChange} 
                    value={formData[field.name]} 
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none transition-all ${showErrors && !formData[field.name] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-blue-500"}`} 
                  />
                </div>
              ))}

              {/* Gender Dropdown */}
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Gender *</label>
                <select 
                  name="gender" 
                  onChange={handleChange} 
                  value={formData.gender} 
                  className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none transition-all ${showErrors && !formData.gender ? "border-red-300 bg-red-50" : "border-gray-200"}`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Current Status *</label>
                <select name="status" onChange={handleChange} value={formData.status} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none border-gray-200">
                  <option value="">Select Status</option>
                  <option>Student</option>
                  <option>Recently graduated</option>
                  <option>Working professional</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: TECHNICAL EXPOSURE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Technical Exposure (Mechanical Design/Prototyping) *</label>
                <textarea 
                  name="exposureDesc" 
                  onChange={handleChange} 
                  value={formData.exposureDesc} 
                  placeholder="Briefly describe your hands-on experience (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && !formData.exposureDesc ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Machines or tools operated/supported? *</label>
                <textarea 
                  name="machineTools" 
                  onChange={handleChange} 
                  value={formData.machineTools} 
                  placeholder="3D Printers, CNC, Milling, Lathe, Laser Cutters, Hand tools, etc. (Mention all that apply)"
                  className={`w-full border p-4 rounded-xl h-24 outline-none transition-all ${showErrors && !formData.machineTools ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Design to Fabrication Project *</label>
                <textarea 
                  name="designToFabProject" 
                  onChange={handleChange} 
                  value={formData.designToFabProject} 
                  placeholder="Describe a project where you were involved from design to fabrication (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && !formData.designToFabProject ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-blue-500"}`} 
                />
              </div>
            </div>
          )}

          {/* STEP 3: STUDENT & LABS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Student Project/Workshop Support Experience? *</label>
                <textarea 
                  name="studentSupportExp" 
                  onChange={handleChange} 
                  value={formData.studentSupportExp} 
                  placeholder="If yes, describe your role and what you learned from working with teams (100-150 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none border-gray-200 focus:ring-2 focus:ring-blue-500`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How do you handle unmanufacturable or unsafe student designs? *</label>
                <textarea 
                  name="handlingUnsafeDesign" 
                  onChange={handleChange} 
                  value={formData.handlingUnsafeDesign} 
                  className={`w-full border p-4 rounded-xl h-32 outline-none border-gray-200 focus:ring-2 focus:ring-blue-500`} 
                />
              </div>
            </div>
          )}

          {/* STEP 4: SAFETY & RESPONSIBILITY */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Comfort with safety protocols and lab discipline? *</label>
                <textarea 
                  name="safetyComfort" 
                  onChange={handleChange} 
                  value={formData.safetyComfort} 
                  placeholder="Explain your approach to supervision and discipline in a workshop environment..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none border-gray-200 focus:ring-2 focus:ring-blue-500`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Experience in troubleshooting/calibrating lab equipment? *</label>
                <textarea 
                  name="maintenanceExp" 
                  onChange={handleChange} 
                  value={formData.maintenanceExp} 
                  placeholder="Briefly explain the equipment and your specific responsibility (100-150 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none border-gray-200 focus:ring-2 focus:ring-blue-500`} 
                />
              </div>
            </div>
          )}

          {/* STEP 5: OWNERSHIP & FIT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What should an IDEA Lab enable for students? *</label>
                <textarea name="ideaLabVision" onChange={handleChange} value={formData.ideaLabVision} className={`w-full border p-4 rounded-xl h-32 outline-none border-gray-200 focus:ring-2 focus:ring-blue-500`} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Comfortable with patience, hands-on work, and shared ownership? *</label>
                <select name="personalityFit" onChange={handleChange} value={formData.personalityFit} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                  <option value="">Select</option>
                  <option value="Yes">Yes</option><option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">When can you join? *</label>
                <select name="joiningTime" onChange={handleChange} value={formData.joiningTime} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-200">
                    <option value="">Select</option>
                    <option>Within 1 month</option>
                    <option>After 1 month</option>
                    <option>After 2 months</option>
                    <option>After 3 months</option>
                </select>
              </div>
              <div className={`p-6 rounded-2xl border transition-all ${!resumeFile && showErrors ? "bg-red-50 border-red-300" : "bg-blue-50 border-blue-100"}`}>
                <label className="block text-sm font-bold text-[#2563eb] mb-2 text-center uppercase tracking-widest leading-tight">
                    Upload Resume & Portfolio (PDF only) *<br/>
                    <span className="text-[10px] text-gray-500 lowercase font-normal">(Include photos of projects if available)</span>
                </label>
                <input type="file" accept=".pdf" onChange={handleFile} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2563eb] file:text-white cursor-pointer" />
                {resumeFile && <p className="text-center text-xs text-green-600 mt-2 font-bold font-mono">✓ {resumeFile.name} attached</p>}
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-between mt-10 pt-6 border-t border-blue-50">
          <button onClick={back} disabled={step === 0} className={`px-8 py-2.5 rounded-lg font-bold transition-all ${step === 0 ? "opacity-0 invisible" : "text-gray-500 hover:bg-gray-100 border"}`}>
            Back
          </button>
          
          {step < steps.length - 1 ? (
            <button 
                onClick={next} 
                className={`px-10 py-2.5 rounded-lg font-bold transition-all ${isValid ? "bg-[#2563eb] text-white hover:shadow-lg" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
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