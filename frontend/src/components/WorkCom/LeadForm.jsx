import React, { useState } from "react";

const steps = ["Basic Details", "Experience", "Curriculum Design", "Digital Learning", "Commitment"];

export const LeadForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    qualification: "", year: "", status: "", institutionalExperience: "",
    curriculumDesigned: "", educationFramework: "", digitalExperience: "",
    competencyMapping: "", explorationMethodology: "", certificationDesign: "",
    researchComfort: "", publicationLink: "",
    whyReact: "", institutionalThinking: "", joiningTime: ""
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

  const getErrors = () => {
    const errors = {};
    if (step === 0) {
      if (!formData.fullName.trim()) errors.fullName = "Full name is required";
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format";
      if (formData.phone.length < 10) errors.phone = "Provide a valid phone number";
      if (!formData.status) errors.status = "Please select your status";
    }
    if (step === 1) {
      if (formData.institutionalExperience.length < 150) errors.institutionalExperience = "Minimum 150 characters required";
      if (!formData.curriculumDesigned.trim()) errors.curriculumDesigned = "Field required";
    }
    if (step === 2) {
      if (!formData.educationFramework.trim()) errors.educationFramework = "Field required";
      if (formData.competencyMapping.length < 150) errors.competencyMapping = "Detail required (min 150 chars)";
      if (!formData.explorationMethodology.trim()) errors.explorationMethodology = "Field required";
    }
    if (step === 3) {
      if (!formData.digitalExperience.trim()) errors.digitalExperience = "Field required";
      if (!formData.certificationDesign.trim()) errors.certificationDesign = "Field required";
    }
    if (step === 4) {
      if (!formData.whyReact.trim()) errors.whyReact = "Motivation is required";
      if (!formData.institutionalThinking.trim()) errors.institutionalThinking = "Required";
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

  const submitForm = async () => {
    if (!isValid) {
      setShowErrors(true);
      return;
    }
    setLoading(true);

    try {
      // Ensure this URL is your latest 'Deployed' Web App URL
      await fetch("https://script.google.com/macros/s/AKfycbw0z-h2KPyhgPezWkcFH13-IcqTncijM9L04v9LgE3j_EbNH3O6zRsdKLGI2k4vkXE-HA/exec", {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ ...formData, resume: resumeFile }),
      });

      alert("Application Submitted Successfully!");
      window.location.reload();
    } catch (err) {
      alert("Submission failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const ErrorMsg = ({ field }) => (
    showErrors && currentErrors[field] ? <p className="text-red-500 text-xs mt-1 font-medium">{currentErrors[field]}</p> : null
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-6 md:p-10 border border-gray-100">
        
        {/* Stepper Header */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center min-w-[80px]">
              <div className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold transition-all ${i <= step ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-[10px] uppercase mt-2 font-bold tracking-wider ${i <= step ? "text-purple-600" : "text-gray-400"}`}>{label}</span>
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
                { name: "qualification", label: "Highest Qualification (Postgraduate)", type: "text" },
                { name: "year", label: "Year of Completion", type: "number" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label} *</label>
                  <input 
                    {...f} 
                    onChange={handleChange} 
                    value={formData[f.name]} 
                    className={`w-full border p-3 rounded-lg outline-none transition-all ${showErrors && currentErrors[f.name] ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-purple-500"}`} 
                  />
                  <ErrorMsg field={f.name} />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Status *</label>
                <select name="status" onChange={handleChange} value={formData.status} className={`w-full border p-3 rounded-lg outline-none bg-white ${showErrors && currentErrors.status ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-purple-500"}`}>
                    <option value="">Select Status</option>
                    <option>Academic professional</option>
                    <option>Education consultant</option>
                    <option>Curriculum designer</option>
                    <option>Digital learning specialist</option>
                    <option>Other education professional</option>
                </select>
                <ErrorMsg field="status" />
              </div>
            </div>
          )}

          {/* STEP 1: EXPERIENCE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Institutional & Educational Systems Experience *</label>
                <p className="text-xs text-gray-500 mb-2">Describe your experience designing or contributing to educational systems, curriculum frameworks, or institutional programs (minimum 150 characters)</p>
                <textarea name="institutionalExperience" onChange={handleChange} value={formData.institutionalExperience} placeholder="Minimum 150 characters..." className="w-full border p-3 rounded-lg h-32 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="institutionalExperience" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Curriculum Design Portfolio *</label>
                <p className="text-xs text-gray-500 mb-2">Describe specific curriculum, course modules, or educational frameworks you have designed. Include the context, outcomes, and your role.</p>
                <textarea name="curriculumDesigned" onChange={handleChange} value={formData.curriculumDesigned} className="w-full border p-3 rounded-lg h-32 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="curriculumDesigned" />
              </div>
            </div>
          )}

          {/* STEP 2: CURRICULUM DESIGN */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">REACT operates through Living, Skilling, Solving, and Implementing phases. How would you approach designing a curriculum architecture that integrates social validation, STEM intervention, and business establishment into a coherent educational framework? *</label>
                <textarea name="educationFramework" onChange={handleChange} value={formData.educationFramework} className="w-full border p-3 rounded-lg h-32 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="educationFramework" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">How would you design competency frameworks and learning outcomes for students working on real humanitarian problems? (min 150 chars) *</label>
                <textarea name="competencyMapping" onChange={handleChange} value={formData.competencyMapping} className="w-full border p-3 rounded-lg h-40 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="competencyMapping" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">How would you develop exploration methodologies that integrate qualitative and quantitative research tools while maintaining ethical and contextual rigor? *</label>
                <textarea name="explorationMethodology" onChange={handleChange} value={formData.explorationMethodology} className="w-full border p-3 rounded-lg h-32 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="explorationMethodology" />
              </div>
            </div>
          )}

          {/* STEP 3: DIGITAL LEARNING */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Digital Learning & Online Course Design Experience *</label>
                <p className="text-xs text-gray-500 mb-2">Describe your experience designing digital learning programs, online courses, or platform-ready educational content.</p>
                <textarea name="digitalExperience" onChange={handleChange} value={formData.digitalExperience} className="w-full border p-3 rounded-lg h-32 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="digitalExperience" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Certification Design Framework *</label>
                <p className="text-xs text-gray-500 mb-2">How would you design a tiered certification framework that links competency to progression pathways?</p>
                <textarea name="certificationDesign" onChange={handleChange} value={formData.certificationDesign} className="w-full border p-3 rounded-lg h-32 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="certificationDesign" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Are you comfortable with extensive research methodology? *</label>
                <select name="researchComfort" onChange={handleChange} value={formData.researchComfort} className="w-full border p-3 rounded-lg bg-white outline-none border-gray-300 focus:ring-2 focus:ring-purple-500">
                    <option value="">Select</option>
                    <option>Yes, extensively</option>
                    <option>Yes, moderately</option>
                    <option>Somewhat</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 4: COMMITMENT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Why REACT specifically? *</label>
                <textarea name="whyReact" onChange={handleChange} value={formData.whyReact} className="w-full border p-3 rounded-lg h-32 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="whyReact" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Evidence of Institutional Thinking *</label>
                <p className="text-xs text-gray-500 mb-2">Describe a situation where you demonstrated analytical rigor in building scalable educational systems.</p>
                <textarea name="institutionalThinking" onChange={handleChange} value={formData.institutionalThinking} className="w-full border p-3 rounded-lg h-32 outline-none border-gray-300 focus:ring-2 focus:ring-purple-500" />
                <ErrorMsg field="institutionalThinking" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Availability to Join *</label>
                <select name="joiningTime" onChange={handleChange} value={formData.joiningTime} className="w-full border p-3 rounded-lg bg-white border-gray-300 focus:ring-2 focus:ring-purple-500">
                  <option value="">Select</option>
                  <option>Immediately</option>
                  <option>Within 1 month</option>
                  <option>Within 2 months</option>
                </select>
                <ErrorMsg field="joiningTime" />
              </div>
              <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                <label className="block text-sm font-bold text-purple-800 mb-2">Upload Resume (PDF only) *</label>
                <input type="file" accept=".pdf" onChange={handleFile} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer" />
                {resumeFile && <p className="text-purple-600 text-xs mt-2 font-bold">✓ {resumeFile.name} uploaded</p>}
                <ErrorMsg field="resume" />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 pt-6 border-t">
          <button 
            onClick={() => setStep(step - 1)} 
            disabled={step === 0} 
            className={`px-8 py-2.5 rounded-lg font-bold transition-all ${step === 0 ? "invisible" : "text-gray-600 bg-gray-100 hover:bg-gray-200"}`}
          >
            Back
          </button>
          
          {step < steps.length - 1 ? (
            <button 
                onClick={next} 
                className="px-10 py-2.5 bg-purple-600 text-white rounded-lg font-bold shadow-md hover:bg-purple-700 transition-all"
            >
                Next Step
            </button>
          ) : (
            <button 
                onClick={submitForm} 
                disabled={loading} 
                className={`px-10 py-2.5 bg-green-600 text-white rounded-lg font-bold shadow-md hover:bg-green-700 transition-all ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};