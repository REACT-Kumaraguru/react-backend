import React, { useState } from "react";
import { submitInternshipForm } from "../../api/googleFormApi";

const steps = ["Personal Details", "Academic Info", "Position Interest", "Skills & Availability", "Documents"];

export const InternshipForm = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", location: "",
    university: "", degree: "", yearOfStudy: "",
    preferredRole: "", roleInterest: "", relevantExperience: "",
    skills: [], availability: "", duration: "",
    referral: "", additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShowErrors(false);
    
    if (type === "checkbox" && name === "skills") {
      const updatedSkills = checked 
        ? [...formData.skills, value]
        : formData.skills.filter(s => s !== value);
      setFormData({ ...formData, skills: updatedSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFile = (e, fileType) => {
    const file = e.target.files[0];
    if (!file || (file.type !== "application/pdf" && !file.type.includes("word"))) {
        alert("Please upload a valid PDF or Word document.");
        return;
    }
    if (fileType === "resume") setResumeFile(file);
    if (fileType === "coverLetter") setCoverLetterFile(file);
  };

  const getErrors = () => {
    const errors = {};
    if (step === 0) {
      if (!formData.firstName.trim()) errors.firstName = "First name is required";
      if (!formData.lastName.trim()) errors.lastName = "Last name is required";
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format";
      if (formData.phone.length < 10) errors.phone = "Provide a valid phone number";
    }
    if (step === 1) {
      if (!formData.university.trim()) errors.university = "University name is required";
      if (!formData.degree) errors.degree = "Degree selection is required";
      if (!formData.yearOfStudy) errors.yearOfStudy = "Year of study is required";
    }
    if (step === 2) {
      if (!formData.preferredRole) errors.preferredRole = "Please select a preferred role";
      if (formData.roleInterest.length < 50) errors.roleInterest = "Please provide more detail (min 50 chars)";
      if (!formData.relevantExperience.trim()) errors.relevantExperience = "Please describe your experience";
    }
    if (step === 3) {
      if (formData.skills.length === 0) errors.skills = "Please select at least one skill";
      if (!formData.availability) errors.availability = "Availability selection is required";
      if (!formData.duration) errors.duration = "Preferred duration is required";
    }
    if (step === 4) {
      if (!resumeFile) errors.resume = "Resume is mandatory";
      if (!formData.referral) errors.referral = "Please tell us how you heard about us";
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
      const submissionData = {
        ...formData,
        resume: resumeFile,
        coverLetter: coverLetterFile
      };

      const result = await submitInternshipForm(submissionData);
      console.log(result);

      if (result.success) {
        alert("Application submitted successfully!");
        window.location.reload();
      } else {
        alert("Submission failed: " + (result.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <div key={i} className="flex flex-col items-center min-w-[100px]">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${i <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              <span className={`text-[10px] uppercase mt-2 font-bold tracking-wider text-center ${i <= step ? "text-blue-600" : "text-gray-400"}`}>{label}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">{steps[step]}</h2>

        <div className="space-y-6">
          {/* STEP 0: PERSONAL DETAILS */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">First Name *</label>
                <input name="firstName" onChange={handleChange} value={formData.firstName} className={`w-full border p-3 rounded-lg outline-none ${showErrors && currentErrors.firstName ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} />
                <ErrorMsg field="firstName" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Last Name *</label>
                <input name="lastName" onChange={handleChange} value={formData.lastName} className={`w-full border p-3 rounded-lg outline-none ${showErrors && currentErrors.lastName ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} />
                <ErrorMsg field="lastName" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email ID *</label>
                <input name="email" type="email" onChange={handleChange} value={formData.email} className={`w-full border p-3 rounded-lg outline-none ${showErrors && currentErrors.email ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} />
                <ErrorMsg field="email" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                <input name="phone" type="tel" onChange={handleChange} value={formData.phone} className={`w-full border p-3 rounded-lg outline-none ${showErrors && currentErrors.phone ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} />
                <ErrorMsg field="phone" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Location</label>
                <input name="location" onChange={handleChange} value={formData.location} className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          )}

          {/* STEP 1: ACADEMIC INFO */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">University / College *</label>
                <input name="university" onChange={handleChange} value={formData.university} placeholder="Your Institution Name" className={`w-full border p-3 rounded-lg outline-none ${showErrors && currentErrors.university ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} />
                <ErrorMsg field="university" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Degree / Program *</label>
                <input name="degree" onChange={handleChange} value={formData.degree} placeholder="e.g. B.Tech Mechanical" className={`w-full border p-3 rounded-lg outline-none ${showErrors && currentErrors.degree ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} />
                <ErrorMsg field="degree" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Year of Study *</label>
                <select name="yearOfStudy" onChange={handleChange} value={formData.yearOfStudy} className={`w-full border p-3 rounded-lg outline-none bg-white ${showErrors && currentErrors.yearOfStudy ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}>
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                  <option value="postgrad">Post Graduate</option>
                </select>
                <ErrorMsg field="yearOfStudy" />
              </div>
            </div>
          )}

          {/* STEP 2: POSITION INTEREST */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Internship Track *</label>
                <div className="grid grid-cols-1 gap-3 mt-2">
                  {[
                    { id: "Operations", label: "Operations", desc: "Process coordination, event execution, documentation" },
                    { id: "Marketing", label: "Marketing & Branding", desc: "Social media, brand communication, campaigns" },
                    { id: "PR", label: "PR & Networking", desc: "Stakeholder engagement, partnerships, events" },
                  ].map((role) => (
                    <label key={role.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.preferredRole === role.label ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}>
                      <input type="radio" name="preferredRole" value={role.label} checked={formData.preferredRole === role.label} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-bold text-gray-800">{role.label}</p>
                        <p className="text-xs text-gray-500">{role.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <ErrorMsg field="preferredRole" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Why do you want to join REACT? *</label>
                <p className="text-[10px] text-gray-500 mb-2">(Minimum 50 characters required)</p>
                <textarea 
                  name="roleInterest" 
                  onChange={handleChange} 
                  value={formData.roleInterest}
                  placeholder="Tell us what excites you about REACT..."
                  className={`w-full border p-3 rounded-lg h-32 outline-none ${showErrors && currentErrors.roleInterest ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} 
                />
                <ErrorMsg field="roleInterest" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Relevant Experience *</label>
                <textarea 
                  name="relevantExperience" 
                  onChange={handleChange} 
                  value={formData.relevantExperience}
                  placeholder="Describe projects, internships or experiences..."
                  className={`w-full border p-3 rounded-lg h-32 outline-none ${showErrors && currentErrors.relevantExperience ? "border-red-500 bg-red-50" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`} 
                />
                <ErrorMsg field="relevantExperience" />
              </div>
            </div>
          )}

          {/* STEP 3: SKILLS & AVAILABILITY */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What are your key skills? *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["Communication", "Leadership", "Organization", "Creativity", "Data Analysis", "Technical Skills", "Marketing", "Other"].map(skill => (
                    <label key={skill} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${formData.skills.includes(skill) ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}>
                      <input type="checkbox" name="skills" value={skill} checked={formData.skills.includes(skill)} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
                      <span className="ml-2 text-xs font-medium text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
                <ErrorMsg field="skills" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Availability *</label>
                  <select name="availability" onChange={handleChange} value={formData.availability} className={`w-full border p-3 rounded-lg outline-none bg-white ${showErrors && currentErrors.availability ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}>
                    <option value="">Select Availability</option>
                    <option value="immediately">Immediately Available</option>
                    <option value="1-month">Within 1 Month</option>
                    <option value="2-month">Within 2 Months</option>
                    <option value="3-month">Within 3 Months</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                  <ErrorMsg field="availability" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Duration *</label>
                  <select name="duration" onChange={handleChange} value={formData.duration} className={`w-full border p-3 rounded-lg outline-none bg-white ${showErrors && currentErrors.duration ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}>
                    <option value="">Select Duration</option>
                    <option value="1-month">1 Month</option>
                    <option value="2-month">2 Months</option>
                    <option value="3-month">3 Months</option>
                    <option value="4-6-month">4-6 Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                  <ErrorMsg field="duration" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DOCUMENTS */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className={`p-4 rounded-xl border transition-all ${showErrors && currentErrors.resume ? "bg-red-50 border-red-500" : "bg-blue-50 border-blue-100"}`}>
                  <label className="block text-sm font-bold text-blue-800 mb-1">Resume/CV *</label>
                  <p className="text-[10px] text-blue-600 mb-3">PDF or Word (Max 5MB)</p>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFile(e, "resume")} className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
                  {resumeFile && <p className="text-green-600 text-[10px] mt-2 font-bold">✓ {resumeFile.name}</p>}
                  <ErrorMsg field="resume" />
                </div>
                <div className="p-4 rounded-xl border border-blue-100 bg-blue-50 transition-all">
                  <label className="block text-sm font-bold text-blue-800 mb-1">Cover Letter (Optional)</label>
                  <p className="text-[10px] text-blue-600 mb-3">PDF or Word (Max 5MB)</p>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleFile(e, "coverLetter")} className="w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer" />
                  {coverLetterFile && <p className="text-green-600 text-[10px] mt-2 font-bold">✓ {coverLetterFile.name}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">How did you hear about us? *</label>
                <select name="referral" onChange={handleChange} value={formData.referral} className={`w-full border p-3 rounded-lg outline-none bg-white ${showErrors && currentErrors.referral ? "border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500"}`}>
                  <option value="">Select Option</option>
                  <option value="college-portal">College Portal</option>
                  <option value="social-media">Social Media</option>
                  <option value="friend">Friend Referral</option>
                  <option value="website">REACT Website</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="event">Event/Seminar</option>
                  <option value="other">Other</option>
                </select>
                <ErrorMsg field="referral" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Information (Optional)</label>
                <textarea 
                  name="additionalInfo" 
                  onChange={handleChange} 
                  value={formData.additionalInfo}
                  placeholder="Anything else you'd like us to know?"
                  className="w-full border border-gray-300 p-3 rounded-lg h-24 outline-none focus:ring-2 focus:ring-blue-500" 
                />
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
