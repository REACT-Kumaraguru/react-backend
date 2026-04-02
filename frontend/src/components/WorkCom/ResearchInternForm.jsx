import React, { useState } from "react";

const steps = [
  "Basic Details",
  "Research Background",
  "Analytical Thinking",
  "Research Orientation",
  "Commitment"
];

export const ResearchInternForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    rollNumber: "", degree: "", department: "", yearOfStudy: "",
    researchInterest: "", coursework: "",
    priorResearch: "", toolsUsed: "",
    dataAnalysisExample: "", criticalThinkingExample: "",
    researchComfort: "", writingLink: "",
    whyResearchIntern: "", fieldComfort: "", joiningTime: ""
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
      if (formData.phone.length < 10) errors.phone = "Valid phone required";
      if (!formData.rollNumber.trim()) errors.rollNumber = "Roll number required";
      if (!formData.degree.trim()) errors.degree = "Degree required";
    }

    if (step === 1) {
      if (formData.researchInterest.length < 50)
        errors.researchInterest = "Minimum 50 characters required";
      if (!formData.toolsUsed.trim())
        errors.toolsUsed = "Please list tools used";
      if (formData.priorResearch.length < 100)
        errors.priorResearch = "Explain research experience (min 100 chars)";
    }

    if (step === 2) {
      if (formData.dataAnalysisExample.length < 50)
        errors.dataAnalysisExample = "Provide detailed analysis example";
    }

    if (step === 3) {
      if (!formData.researchComfort)
        errors.researchComfort = "Research comfort selection required";
      if (!formData.fieldComfort)
        errors.fieldComfort = "Field work comfort selection required";
    }

    if (step === 4) {
      if (!formData.whyResearchIntern.trim())
        errors.whyResearchIntern = "Motivation required";
      // Removed duplicate fieldComfort check
      if (!formData.joiningTime)
        errors.joiningTime = "Joining time required";
      if (!resumeFile)
        errors.resume = "Resume PDF required";
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
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwvHfmuq4jEJ3JriAm5_T7L6Ih8pX5Y_KPmz097wJDA7-bJfNEgU4MPv-kD0bnGKSHz/exec",
      {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          resume: resumeFile,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      alert("Application submitted successfully!");
      window.location.reload();
    } else {
      alert("Submission failed: " + result.error);
    }

  } catch (err) {
    console.error(err);
    alert("Server error.");
  } finally {
    setLoading(false);
  }
};



  const ErrorMsg = ({ field }) =>
    showErrors && currentErrors[field] ? (
      <p className="text-red-500 text-xs mt-1 font-medium">
        {currentErrors[field]}
      </p>
    ) : null;

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
              <span className={`text-[10px] uppercase mt-2 font-bold tracking-wider ${i <= step ? "text-blue-600" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          {steps[step]}
        </h2>

        <div className="space-y-6">

          {/* STEP 0: BASIC DETAILS */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { name: "fullName", label: "Full Name" },
                { name: "email", label: "KCT Email ID" },
                { name: "phone", label: "Phone Number" },
                { name: "location", label: "Current Location" },
                { name: "rollNumber", label: "Roll Number" },
                { name: "degree", label: "Degree" },
                { name: "department", label: "Department / Branch" },
                { name: "yearOfStudy", label: "Year of Study" }
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {f.label} *
                  </label>
                  <input
                    name={f.name}
                    onChange={handleChange}
                    value={formData[f.name]}
                    className={`w-full border p-3 rounded-lg outline-none ${showErrors && currentErrors[f.name] ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}
                  />
                  <ErrorMsg field={f.name} />
                </div>
              ))}
            </div>
          )}

          {/* STEP 1: RESEARCH BACKGROUND */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Primary Research Interests *
                </label>
                <textarea
                  name="researchInterest"
                  onChange={handleChange}
                  value={formData.researchInterest}
                  className={`w-full border p-3 rounded-lg h-28 ${showErrors && currentErrors.researchInterest ? "border-red-500" : "border-gray-300"}`}
                />
                <ErrorMsg field="researchInterest" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Relevant Coursework (if any)
                </label>
                <input
                  name="coursework"
                  onChange={handleChange}
                  value={formData.coursework}
                  className="w-full border p-3 rounded-lg border-gray-300"
                  placeholder="e.g. Research Methodology, Data Mining..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Describe Your Prior Research / Academic Projects *
                </label>
                <textarea
                  name="priorResearch"
                  onChange={handleChange}
                  value={formData.priorResearch}
                  className={`w-full border p-3 rounded-lg h-32 ${showErrors && currentErrors.priorResearch ? "border-red-500" : "border-gray-300"}`}
                />
                <ErrorMsg field="priorResearch" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Tools & Technologies Used *
                </label>
                <input
                  name="toolsUsed"
                  onChange={handleChange}
                  value={formData.toolsUsed}
                  className={`w-full border p-3 rounded-lg ${showErrors && currentErrors.toolsUsed ? "border-red-500" : "border-gray-300"}`}
                  placeholder="e.g. Python, SPSS, MATLAB, Excel..."
                />
                <ErrorMsg field="toolsUsed" />
              </div>
            </>
          )}

          {/* STEP 2: ANALYTICAL THINKING */}
          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Example of Data Analysis or Problem Solving *
                </label>
                <textarea
                  name="dataAnalysisExample"
                  onChange={handleChange}
                  value={formData.dataAnalysisExample}
                  className={`w-full border p-3 rounded-lg h-32 ${showErrors && currentErrors.dataAnalysisExample ? "border-red-500" : "border-gray-300"}`}
                />
                <ErrorMsg field="dataAnalysisExample" />
              </div>
            </>
          )}

          {/* STEP 3: RESEARCH ORIENTATION */}
          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Comfortable with extensive research & documentation? *
                </label>
                <select
                  name="researchComfort"
                  onChange={handleChange}
                  value={formData.researchComfort}
                  className={`w-full border p-3 rounded-lg ${showErrors && currentErrors.researchComfort ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>Somewhat</option>
                  <option>No</option>
                </select>
                <ErrorMsg field="researchComfort" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Comfortable with Field Work / Data Collection? *
                </label>
                <select
                  name="fieldComfort"
                  onChange={handleChange}
                  value={formData.fieldComfort}
                  className={`w-full border p-3 rounded-lg ${showErrors && currentErrors.fieldComfort ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>Somewhat</option>
                  <option>No</option>
                </select>
                <ErrorMsg field="fieldComfort" />
              </div>
            </>
          )}

          {/* STEP 4: COMMITMENT */}
          {step === 4 && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Why do you want to join as Research Intern? *
                </label>
                <textarea
                  name="whyResearchIntern"
                  onChange={handleChange}
                  value={formData.whyResearchIntern}
                  className={`w-full border p-3 rounded-lg h-28 ${showErrors && currentErrors.whyResearchIntern ? "border-red-500" : "border-gray-300"}`}
                />
                <ErrorMsg field="whyResearchIntern" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Joining Time *
                </label>
                <select
                  name="joiningTime"
                  onChange={handleChange}
                  value={formData.joiningTime}
                  className={`w-full border p-3 rounded-lg ${showErrors && currentErrors.joiningTime ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select</option>
                  <option>Immediately</option>
                  <option>Within 1 month</option>
                  <option>Later</option>
                </select>
                <ErrorMsg field="joiningTime" />
              </div>

              <div className={`p-4 rounded-lg border ${showErrors && currentErrors.resume ? "bg-red-50 border-red-500" : "bg-blue-50 border-blue-100"}`}>
                <label className="block text-sm font-bold text-blue-800 mb-2">
                  Upload Resume (PDF only) *
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFile}
                  className="w-full"
                />
                {resumeFile && (
                  <p className="text-blue-600 text-xs mt-2 font-bold">
                    ✓ {resumeFile.name} uploaded
                  </p>
                )}
                <ErrorMsg field="resume" />
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10 pt-6 border-t">
          <button
            onClick={back}
            disabled={step === 0}
            className={`px-8 py-2.5 rounded-lg font-semibold ${step === 0 ? "opacity-0 invisible" : "text-gray-600 hover:bg-gray-100 border"}`}
          >
            Back
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={next}
              className={`px-10 py-2.5 rounded-lg font-semibold shadow-md ${isValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={submitForm}
              disabled={loading}
              className={`px-10 py-2.5 rounded-lg font-semibold shadow-md ${isValid && !loading ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
