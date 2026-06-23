import React, { useState } from "react";

const steps = ["Basic Details", "Technical Skills", "Web Development Experience", "Problem Solving & Learning", "Vision & Commitment"];

export const WebDeveloperForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", location: "",
    degree: "", department: "", departmentOther: "", yearOfStudy: "", rollNumber: "",
    degreeOther: "",
    programmingLanguages: "", frameworks: "", tools: "", webTechnologies: "",
    projectExperience: "", portfolioUrl: "", githubUrl: "", projectDetails: "",
    debuggingExperience: "", learningApproach: "", problemSolving: "",
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
    }
    if (step === 1) {
      if (!formData.programmingLanguages || formData.programmingLanguages.length < 20) errors.push("List the programming languages you know");
      if (!formData.frameworks || formData.frameworks.length < 20) errors.push("List frameworks/libraries you've worked with");
      if (!formData.webTechnologies || formData.webTechnologies.length < 20) errors.push("Describe your experience with web technologies");
    }
    if (step === 2) {
      if (!formData.projectExperience || formData.projectExperience.length < 50) errors.push("Describe your web development projects in detail");
      if (!formData.projectDetails || formData.projectDetails.length < 50) errors.push("Provide details about your best project");
    }
    if (step === 3) {
      if (!formData.debuggingExperience || formData.debuggingExperience.length < 50) errors.push("Describe your debugging and problem-solving approach");
      if (!formData.learningApproach || formData.learningApproach.length < 50) errors.push("Explain how you learn new technologies");
    }
    if (step === 4) {
      if (!formData.visionForReact || formData.visionForReact.length < 50) errors.push("Please share your vision for web development at REACT");
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
      const scriptUrl = "https://script.google.com/macros/s/AKfycbxb-5KDpd-DCAN3dC6_HPFviUTDQiEgua0LCQaGSv_99eRLfUFqQ1Ztd5b1012g0YTk/exec";
      
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
      
      alert("Web Developer Application Submitted Successfully!");
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

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-sm border border-yellow-100 p-6 md:p-10">
        <p className="text-sm text-gray-500 mb-2 text-center">Open to All Departments</p>
        
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10 overflow-x-auto pb-4">
          {steps.map((label, i) => (
            <div key={i} className="flex flex-col items-center min-w-[120px]">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${i <= step ? "bg-yellow-500 text-gray-900" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-[9px] uppercase mt-2 font-bold tracking-tighter text-center ${i <= step ? "text-yellow-600" : "text-gray-400"}`}>{label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-yellow-50 pb-4">{steps[step]}</h2>

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
                { name: 'email', label: 'Email ID' },
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
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none transition-all ${showErrors && !formData[field.name] ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-yellow-500"}`} 
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Degree *</label>
                <select name="degree" onChange={handleChange} value={formData.degree} className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white outline-none ${showErrors && !formData.degree ? "border-red-300 bg-red-50" : "border-gray-200"}`}>
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
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none ${showErrors && formData.degree === "Other" && !formData.degreeOther?.trim() ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-yellow-500"}`}
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department / Branch (Open to All Departments) *</label>
                <select name="department" onChange={handleChange} value={formData.department} className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white outline-none ${showErrors && !formData.department ? "border-red-300 bg-red-50" : "border-gray-200"}`}>
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
                    className={`w-full border p-3 rounded-lg focus:ring-2 outline-none ${showErrors && formData.department === "Other" && (!formData.departmentOther || !formData.departmentOther.trim()) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-yellow-500"}`}
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Year of Study *</label>
                <select name="yearOfStudy" onChange={handleChange} value={formData.yearOfStudy} className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 bg-white outline-none ${showErrors && !formData.yearOfStudy ? "border-red-300 bg-red-50" : "border-gray-200"}`}>
                  <option value="">Select Year</option>
                  <option>I Year</option>
                  <option>II Year</option>
                  <option>III Year</option>
                  <option>IV Year</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: TECHNICAL SKILLS */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Programming Languages You Know *</label>
                <textarea 
                  name="programmingLanguages" 
                  onChange={handleChange} 
                  value={formData.programmingLanguages} 
                  placeholder="List programming languages you're familiar with (e.g. JavaScript, Python, Java, C++, HTML, CSS, etc.)..."
                  className={`w-full border p-4 rounded-xl h-24 outline-none transition-all ${showErrors && (!formData.programmingLanguages || formData.programmingLanguages.length < 20) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-yellow-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Frameworks & Libraries *</label>
                <textarea 
                  name="frameworks" 
                  onChange={handleChange} 
                  value={formData.frameworks} 
                  placeholder="List frameworks and libraries you've worked with (e.g. React, Vue, Angular, Node.js, Express, Django, Flask, Bootstrap, Tailwind CSS, etc.)..."
                  className={`w-full border p-4 rounded-xl h-24 outline-none transition-all ${showErrors && (!formData.frameworks || formData.frameworks.length < 20) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-yellow-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Web Technologies & Tools *</label>
                <textarea 
                  name="webTechnologies" 
                  onChange={handleChange} 
                  value={formData.webTechnologies} 
                  placeholder="Describe your experience with web technologies (APIs, databases, version control like Git, deployment, etc.)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.webTechnologies || formData.webTechnologies.length < 20) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-yellow-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Tools & Platforms (Optional)</label>
                <textarea 
                  name="tools" 
                  onChange={handleChange} 
                  value={formData.tools} 
                  placeholder="Any other tools, platforms, or technologies you've used (e.g. Firebase, AWS, Docker, Figma, etc.)..."
                  className="w-full border p-4 rounded-xl h-24 outline-none border-gray-200 focus:ring-2 focus:ring-yellow-500" 
                />
              </div>
            </div>
          )}

          {/* STEP 3: WEB DEVELOPMENT EXPERIENCE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Web Development Projects Experience *</label>
                <textarea 
                  name="projectExperience" 
                  onChange={handleChange} 
                  value={formData.projectExperience} 
                  placeholder="Describe the web development projects you've worked on. Include details about what you built, technologies used, and your role (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.projectExperience || formData.projectExperience.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-yellow-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Best Project Details *</label>
                <textarea 
                  name="projectDetails" 
                  onChange={handleChange} 
                  value={formData.projectDetails} 
                  placeholder="Describe your best/most impressive web project in detail. What problem did it solve? What challenges did you face? What did you learn? (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.projectDetails || formData.projectDetails.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-yellow-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Portfolio URL (Optional)</label>
                <input
                  name="portfolioUrl"
                  onChange={handleChange}
                  value={formData.portfolioUrl}
                  placeholder="https://yourportfolio.com or https://yourname.github.io"
                  className="w-full border p-3 rounded-lg outline-none border-gray-200 focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">GitHub Profile URL (Optional)</label>
                <input
                  name="githubUrl"
                  onChange={handleChange}
                  value={formData.githubUrl}
                  placeholder="https://github.com/yourusername"
                  className="w-full border p-3 rounded-lg outline-none border-gray-200 focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          )}

          {/* STEP 4: PROBLEM SOLVING & LEARNING */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Debugging & Problem-Solving Approach *</label>
                <textarea 
                  name="debuggingExperience" 
                  onChange={handleChange} 
                  value={formData.debuggingExperience} 
                  placeholder="Describe how you approach debugging and solving technical problems. Share an example of a challenging bug you fixed or a problem you solved (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.debuggingExperience || formData.debuggingExperience.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-yellow-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Learning Approach *</label>
                <textarea 
                  name="learningApproach" 
                  onChange={handleChange} 
                  value={formData.learningApproach} 
                  placeholder="How do you learn new web technologies or frameworks? Do you prefer tutorials, documentation, building projects, or a combination? Give an example (100-150 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.learningApproach || formData.learningApproach.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-yellow-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Problem-Solving in Web Development (Optional)</label>
                <textarea 
                  name="problemSolving" 
                  onChange={handleChange} 
                  value={formData.problemSolving} 
                  placeholder="Share any additional examples of problem-solving in web development contexts..."
                  className="w-full border p-4 rounded-xl h-24 outline-none border-gray-200 focus:ring-2 focus:ring-yellow-500" 
                />
              </div>
            </div>
          )}

          {/* STEP 5: VISION & COMMITMENT */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to be a Web Developer at REACT? *</label>
                <textarea 
                  name="visionForReact" 
                  onChange={handleChange} 
                  value={formData.visionForReact} 
                  placeholder="Share your motivation and what you hope to contribute to REACT's web development projects. How do you want to grow as a developer? (150-200 words)..."
                  className={`w-full border p-4 rounded-xl h-32 outline-none transition-all ${showErrors && (!formData.visionForReact || formData.visionForReact.length < 50) ? "border-red-300 bg-red-50" : "border-gray-200 focus:ring-2 focus:ring-yellow-500"}`} 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Can you commit to REACT alongside your studies? *</label>
                <select name="availability" onChange={handleChange} value={formData.availability} className={`w-full border p-3 rounded-lg bg-white outline-none border-gray-200 ${showErrors && !formData.availability ? "border-red-300 bg-red-50" : ""}`}>
                  <option value="">Select</option>
                  <option value="Yes">Yes, I can commit</option>
                  <option value="Part-time">I can contribute part-time alongside academics</option>
                  <option value="Need to discuss">I'd like to discuss workload</option>
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
              <div className={`p-6 rounded-2xl border transition-all ${!resumeFile && showErrors ? "bg-red-50 border-red-300" : "bg-yellow-50 border-yellow-100"}`}>
                <label className="block text-sm font-bold text-yellow-600 mb-2 text-center uppercase tracking-widest leading-tight">
                    Upload Resume & Portfolio (PDF only) *<br/>
                    <span className="text-[10px] text-gray-500 lowercase font-normal">(Include your projects, GitHub links, or any relevant web development experience)</span>
                </label>
                <input type="file" accept=".pdf" onChange={handleFile} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-gray-900 cursor-pointer" />
                {resumeFile && <p className="text-center text-xs text-green-600 mt-2 font-bold font-mono">✓ {resumeFile.name} attached</p>}
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex justify-between mt-10 pt-6 border-t border-yellow-50">
          <button onClick={back} disabled={step === 0} className={`px-8 py-2.5 rounded-lg font-bold transition-all ${step === 0 ? "opacity-0 invisible" : "text-gray-500 hover:bg-gray-100 border"}`}>
            Back
          </button>
          
          {step < steps.length - 1 ? (
            <button 
                onClick={next} 
                className={`px-10 py-2.5 rounded-lg font-bold transition-all ${isValid ? "bg-yellow-500 text-gray-900 hover:shadow-lg hover:bg-yellow-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
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
