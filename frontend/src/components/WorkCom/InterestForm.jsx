import React, { useMemo, useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2J7LbGxm0tCWFeISpJzOPcrqGNxvAk0zKrVkTFyQZ98_f-wld4RjTy_9pTsX8iWJY/exec"; 

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const InterestForm = () => {
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredDomains: "",
    whyPreferRole: "",
    pastExperience: "",
    currentStatus: "",
    workingDetails: "",
    fresherExperience: "",
    availability: ""
  });

  const errors = useMemo(() => {
    const e = {};

    if (!formData.fullName.trim()) e.fullName = "Full Name is required";
    if (!EMAIL_REGEX.test(formData.email)) e.email = "Valid Email Address is required";

    const digits = String(formData.phone || "").replace(/\D/g, "");
    if (!digits || digits.length < 10) e.phone = "Valid Phone Number is required";

    if (!resumeFile) e.resume = "Upload Resume (CV) PDF is mandatory";

    if (!formData.whyPreferRole.trim())
      e.whyPreferRole = "Please explain why you prefer this role";

    if (!formData.currentStatus) e.currentStatus = "Current Status is mandatory";

    if (formData.currentStatus === "Working Professional") {
      if (!formData.workingDetails.trim())
        e.workingDetails = "Please share your current organization & job role";
    }

    if (formData.currentStatus === "Fresher") {
      if (!formData.fresherExperience.trim())
        e.fresherExperience = "Please share internship / part-time / volunteer experience";
    }

    if (!formData.availability.trim())
      e.availability = "Availability / When can you join is mandatory";

    return e;
  }, [formData, resumeFile]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    setSubmitted(false);
    setShowErrors(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      alert("Please upload a valid PDF resume (CV).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setResumeFile({
        name: file.name,
        type: file.type || "application/pdf",
        data: String(reader.result).split(",")[1]
      });
    };
    reader.readAsDataURL(file);
  };

  const submitForm = async () => {
    setShowErrors(true);
    setSubmitted(false);

    if (!isValid) return;
    if (!SCRIPT_URL || SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      alert("Error: Google Apps Script URL not configured. Please contact the administrator.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        preferredDomains: formData.preferredDomains || "",
        resume: resumeFile
      };

      // Google Apps Script web apps reject CORS preflight on JSON (OPTIONS → 405).
      // text/plain avoids preflight; no-cors lets the POST complete (response is not readable).
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      const msg = "Thank you for submitting your interest. Our team will review and get back to you.";
      setConfirmation(msg);
      setSubmitted(true);
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8 font-sans">
      <div className="h-20 w-full" />

      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Expression of Interest – Work With Us (REACT)
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-4 leading-relaxed">
            Interested in working with REACT? Submit your expression of interest to collaborate, intern, or join our team. We are looking for passionate individuals across multiple domains.
          </p>
        </div>

        <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
              <p className="text-sm font-bold text-green-700">{confirmation}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                  showErrors && errors.fullName ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#0f766e]"
                }`}
                type="text"
              />
              {showErrors && errors.fullName && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                  showErrors && errors.email ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#0f766e]"
                }`}
                type="email"
              />
              {showErrors && errors.email && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg outline-none focus:ring-2 transition-all ${
                  showErrors && errors.phone ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#0f766e]"
                }`}
                type="number"
                inputMode="numeric"
              />
              {showErrors && errors.phone && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Preferred Role / Domain
              </label>
              <p className="text-xs text-gray-500 mb-2">
                Optional; describe the role or area you are interested in
              </p>
              <input
                type="text"
                name="preferredDomains"
                value={formData.preferredDomains}
                onChange={handleChange}
                placeholder="e.g., Research, Web development, Operations"
                className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#0f766e]"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Upload Resume (CV) <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 mb-2">(PDF preferred and mandatory)</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFile}
              className={`w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0f766e] file:text-white cursor-pointer ${
                showErrors && errors.resume ? "ring-2 ring-red-200 rounded-lg" : ""
              }`}
            />
            {resumeFile && (
              <p className="text-xs text-green-700 mt-2 font-bold font-mono">✓ {resumeFile.name} attached</p>
            )}
            {showErrors && errors.resume && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.resume}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Why do you prefer this role? <span className="text-red-500">*</span>
            </label>
            <textarea
              name="whyPreferRole"
              value={formData.whyPreferRole}
              onChange={handleChange}
              rows={5}
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 ${
                showErrors && errors.whyPreferRole
                  ? "border-red-400 bg-red-50 focus:ring-red-200"
                  : "border-gray-200 focus:ring-[#0f766e]"
              }`}
            />
            {showErrors && errors.whyPreferRole && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.whyPreferRole}</p>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Past Relevant Experience
            </label>
            <textarea
              name="pastExperience"
              value={formData.pastExperience}
              onChange={handleChange}
              rows={4}
              placeholder="Optional but recommended (internships, projects, volunteering, research, work you feel relevant)"
              className="w-full border p-3 rounded-lg outline-none focus:ring-2 border-gray-200 focus:ring-[#0f766e]"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Current Status <span className="text-red-500">*</span>
            </label>
            <select
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleChange}
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 ${
                showErrors && errors.currentStatus ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#0f766e]"
              }`}
            >
              <option value="">Select Status</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
              <option value="Fresher">Fresher</option>
            </select>
            {showErrors && errors.currentStatus && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.currentStatus}</p>
            )}
          </div>

          {formData.currentStatus === "Working Professional" && (
            <div className="mt-6">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                If Working – Details of Current Organization & Job Role <span className="text-red-500">*</span>
              </label>
              <textarea
                name="workingDetails"
                value={formData.workingDetails}
                onChange={handleChange}
                rows={4}
                className={`w-full border p-3 rounded-lg outline-none focus:ring-2 ${
                  showErrors && errors.workingDetails
                    ? "border-red-400 bg-red-50 focus:ring-red-200"
                    : "border-gray-200 focus:ring-[#0f766e]"
                }`}
              />
              {showErrors && errors.workingDetails && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.workingDetails}</p>
              )}
            </div>
          )}

          {formData.currentStatus === "Fresher" && (
            <div className="mt-6">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                If Fresher – Any Internship / Part-time / Volunteer Experience <span className="text-red-500">*</span>
              </label>
              <textarea
                name="fresherExperience"
                value={formData.fresherExperience}
                onChange={handleChange}
                rows={4}
                className={`w-full border p-3 rounded-lg outline-none focus:ring-2 ${
                  showErrors && errors.fresherExperience
                    ? "border-red-400 bg-red-50 focus:ring-red-200"
                    : "border-gray-200 focus:ring-[#0f766e]"
                }`}
              />
              {showErrors && errors.fresherExperience && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.fresherExperience}</p>
              )}
            </div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-bold text-gray-700 mb-1">
              Availability / When can you join? <span className="text-red-500">*</span>
            </label>
            <input
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g., From 10 May 2026 / Available immediately / Within 1 month"
              className={`w-full border p-3 rounded-lg outline-none focus:ring-2 ${
                showErrors && errors.availability ? "border-red-400 bg-red-50 focus:ring-red-200" : "border-gray-200 focus:ring-[#0f766e]"
              }`}
              type="text"
            />
            {showErrors && errors.availability && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.availability}</p>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={submitForm}
              disabled={loading || !isValid}
              className={`px-10 py-3 rounded-lg font-bold transition-all shadow-sm ${
                loading || !isValid
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#0f766e] text-white hover:bg-[#115e59]"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

