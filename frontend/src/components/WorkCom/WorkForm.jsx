import React, { useState } from "react";

const steps = ["Basic Details", "Experience", "Alignment", "Research", "Commitment"];

export const WorkForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false); // New state for validation visibility

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    qualification: "", year: "", status: "", exposure: "",
    problemWorked: "", reactMeaning: "", socialProblem: "",
    nonIntervention: "", researchComfort: "", writingLink: "",
    whyReact: "", comfortField: "", joiningTime: ""
  });

  const handleChange = (e) => {
    setShowErrors(false); // Reset errors when user starts typing
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
  const getErrors = () => {
    const errors = {};
    if (step === 0) {
      if (!formData.fullName.trim()) errors.fullName = "Full name is required";
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format";
      if (formData.phone.length < 10) errors.phone = "Provide a valid phone number";
      if (!formData.status) errors.status = "Please select your status";
    }
    if (step === 1) {
      if (formData.exposure.length < 100) errors.exposure = "Minimum 100 words/characters required for exposure";
      if (!formData.problemWorked.trim()) errors.problemWorked = "Please describe a problem you worked on";
    }
    if (step === 2) {
      if (!formData.reactMeaning.trim()) errors.reactMeaning = "Please explain your understanding of REACT";
      if (formData.socialProblem.length < 150) errors.socialProblem = "Please provide a deeper analysis (min 150 chars)";
      if (!formData.nonIntervention.trim()) errors.nonIntervention = "This critical field is required";
    }
    if (step === 3) {
      if (!formData.researchComfort) errors.researchComfort = "Research comfort selection is required";
    }
    if (step === 4) {
      if (!formData.whyReact.trim()) errors.whyReact = "Please explain your motivation";
      if (!formData.comfortField) errors.comfortField = "Field work comfort is required";
      if (!formData.joiningTime) errors.joiningTime = "Joining time is required";
      if (!resumeFile) errors.resume = "Resume PDF is mandatory";
    }
    return errors;
  };

  const currentErrors = getErrors();
  const isValid = Object.keys(currentErrors).length === 0;

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
      await fetch("https://script.google.com/macros/s/AKfycbwxMCV2lMjGi4JeaCjI7Pwjc7tZzNi1ZQ8uvk7XyKPdYfts1P-ZimuoWAgc56Yt0bPZ/exec", {
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

  // Helper to render error text
  const ErrorMsg = ({ field }) => (
    showErrors && currentErrors[field] ? <p className="text-red-500 text-xs mt-1 font-medium">{currentErrors[field]}</p> : null
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <div className="h-20 w-full" /> 

      <div className="bg-white w-full max-w-3xl rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
        
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center min-w-[80px]">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${i <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-[10px] uppercase mt-2 font-bold tracking-wider ${i <= step ? "text-blue-600" : "text-gray-400"}`}>{label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">{steps[step]}</h2>

        <div className="space-y-6">
          {/* STEP 0: BASIC DETAILS */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "fullName", label: "Full Name", type: "text" },
                { name: "email", label: "Email ID", type: "email" },
                { name: "phone", label: "Phone Number", type: "tel" },
                { name: "location", label: "Current Location", type: "text" },
                { name: "qualification", label: "Highest Qualification", type: "text" },
                { name: "year", label: "Year of Completion", type: "number" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label} *</label>
                  <input 
                    {...f} 
                    onChange={handleChange} 
                    value={formData[f.name]} 
                    className={`w-full border p-3 rounded-lg outline-none transition-all ${showErrors && currentErrors[f.name] ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} 
                  />
                  <ErrorMsg field={f.name} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status *</label>
                <select name="status" onChange={handleChange} value={formData.status} className={`w-full border p-3 rounded-lg outline-none bg-white ${showErrors && currentErrors.status ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}>
                  <option value="">Select Status</option>
                  <option>Student</option>
                  <option>Recently graduated</option>
                  <option>Working professional</option>
                </select>
                <ErrorMsg field="status" />
              </div>
            </div>
          )}

          {/* STEP 1: EXPERIENCE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
<label className="block text-sm font-semibold text-gray-700 mb-1">
  Field Exposure *
</label>
<p className="text-xs text-gray-500 mb-2">
  Describe your fieldwork experience (minimum 100 characters)
</p>
                <textarea 
                  name="exposure" 
                  onChange={handleChange} 
                  value={formData.exposure}
                  placeholder="Minimum 100 characters..."
                  className={`w-full border p-3 rounded-lg h-32 outline-none ${showErrors && currentErrors.exposure ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} 
                />
                <ErrorMsg field="exposure" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Problems Worked and the lessons learned(What are your key learnings)</label>
                <textarea 
                  name="problemWorked" 
                  onChange={handleChange} 
                  value={formData.problemWorked}
                  className={`w-full border p-3 rounded-lg h-32 outline-none ${showErrors && currentErrors.problemWorked ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} 
                />
                <ErrorMsg field="problemWorked" />
              </div>
            </div>
          )}

          {/* STEP 2: ALIGNMENT */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Think about a street, a market, or a community space you visit often. What is one small, 'invisible' problem people face there that you’ve often thought, 'Why hasn't anyone tried to fix this yet? *</label>
                <textarea name="reactMeaning" onChange={handleChange} value={formData.reactMeaning} className={`w-full border p-3 rounded-lg h-28 outline-none ${showErrors && currentErrors.reactMeaning ? "border-red-500" : "border-gray-300"}`} />
                <ErrorMsg field="reactMeaning" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Based on your observations, what are the first 3 specific problems—big or small—that you would be most eager to dive into and solve? Briefly tell us why these three. *</label>
                <textarea name="socialProblem" onChange={handleChange} value={formData.socialProblem} className={`w-full border p-3 rounded-lg h-36 outline-none ${showErrors && currentErrors.socialProblem ? "border-red-500" : "border-gray-300"}`} />
                <ErrorMsg field="socialProblem" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">REACT believes in the intersection of Research, Technology, and Social Change. If you had an unlimited budget to bring ONE piece of modern technology to a rural or urban community in Tamil Nadu, which one would you pick and why? *</label>
                <textarea name="nonIntervention" onChange={handleChange} value={formData.nonIntervention} className={`w-full border p-3 rounded-lg h-28 outline-none ${showErrors && currentErrors.nonIntervention ? "border-red-500" : "border-gray-300"}`} />
                <ErrorMsg field="nonIntervention" />
              </div>
            </div>
          )}

          {/* STEP 3: RESEARCH */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Are you comfortable with extensive secondary research and documentation? *</label>
                <select name="researchComfort" onChange={handleChange} value={formData.researchComfort} className={`w-full border p-3 rounded-lg outline-none bg-white ${showErrors && currentErrors.researchComfort ? "border-red-500" : "border-gray-300"}`}>
                  <option value="">Select</option>
                  <option>Yes</option><option>Somewhat</option><option>No</option>
                </select>
                <ErrorMsg field="researchComfort" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 text-gray-500">Writing / Research Link (Optional)</label>
                <input name="writingLink" placeholder="https://..." onChange={handleChange} value={formData.writingLink} className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          )}

          {/* STEP 4: COMMITMENT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Why specifically REACT and not any other institution? *</label>
                <textarea name="whyReact" onChange={handleChange} value={formData.whyReact} className={`w-full border p-3 rounded-lg h-28 outline-none ${showErrors && currentErrors.whyReact ? "border-red-500" : "border-gray-300"}`} />
                <ErrorMsg field="whyReact" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Comfortable with field work? *</label>
                    <select name="comfortField" onChange={handleChange} value={formData.comfortField} className={`w-full border p-3 rounded-lg bg-white outline-none ${showErrors && currentErrors.comfortField ? "border-red-500" : "border-gray-300"}`}>
                        <option value="">Select</option>
                        <option>Yes</option><option>No</option>
                    </select>
                    <ErrorMsg field="comfortField" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Joining time *</label>
                    <select name="joiningTime" onChange={handleChange} value={formData.joiningTime} className={`w-full border p-3 rounded-lg bg-white outline-none ${showErrors && currentErrors.joiningTime ? "border-red-500" : "border-gray-300"}`}>
                        <option value="">Select</option>
                        <option>Immediately</option><option>Within 1 month</option><option>Later</option>
                    </select>
                    <ErrorMsg field="joiningTime" />
                </div>
              </div>
              <div className={`p-4 rounded-lg border transition-all ${showErrors && currentErrors.resume ? "bg-red-50 border-red-500" : "bg-blue-50 border-blue-100"}`}>
                <label className="block text-sm font-bold text-blue-800 mb-2">Upload Resume (PDF only) *</label>
                <input type="file" accept=".pdf" onChange={handleFile} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
                {resumeFile && <p className="text-blue-600 text-xs mt-2 font-bold">✓ {resumeFile.name} uploaded</p>}
                <ErrorMsg field="resume" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10 pt-6 border-t">
          <button onClick={back} disabled={step === 0} className={`px-8 py-2.5 rounded-lg font-semibold transition-all ${step === 0 ? "opacity-0 invisible" : "text-gray-600 hover:bg-gray-100 border"}`}>
            Back
          </button>

          {step < steps.length - 1 ? (
            <button 
                onClick={next} 
                className={`px-10 py-2.5 rounded-lg font-semibold shadow-md transition-all ${isValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Next Step
            </button>
          ) : (
            <button 
                onClick={submitForm} 
                disabled={loading} 
                className={`px-10 py-2.5 rounded-lg font-semibold shadow-md transition-all ${isValid && !loading ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};