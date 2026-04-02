import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function FellowForm() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    age: "",
    bloodGroup: "",
    personalEmail: "",
    collegeEmail: "",
    contactNumber: "",
    linkedIn: "",
    parentName: "",
    parentRelation: "",
    parentContact: "",
    permanentAddress: "",
    communicationAddress: "",
    institution: "",
    reason: "",
    contribution: "",
    theme: "",
    scholarship: "",
    scholarshipJustification: "",
    fallbackConsent: "",
    fallbackPlan: "",
    gender: "",
    agreedToImmersion: false,
    discussedWithGuardian: false,
  });

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ================= STEP VALIDATION ================= */
  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!form.fullName) newErrors.fullName = "Full name is required";
      if (!form.dob) newErrors.dob = "Date of birth is required";
      if (!form.age) newErrors.age = "Age is required";
      if (!form.personalEmail) newErrors.personalEmail = "Personal email is required";
      if (!form.contactNumber) newErrors.contactNumber = "Contact number is required";
    }

    if (step === 2) {
      if (!form.permanentAddress) newErrors.permanentAddress = "Permanent address is required";
      if (!form.communicationAddress) newErrors.communicationAddress = "Communication address is required";
    }

    if (step === 3) {
      if (!form.agreedToImmersion)
        newErrors.agreedToImmersion = "You must agree to the 6-month commitment";
      if (!form.discussedWithGuardian)
        newErrors.discussedWithGuardian = "Please confirm discussion with guardian";
    }

    if (step === 4) {
      if (!form.reason) newErrors.reason = "This field is required";
      if (!form.contribution) newErrors.contribution = "This field is required";
    }

    if (step === 5) {
      if (!form.theme) newErrors.theme = "Please select a theme";
      if (!form.institution) newErrors.institution = "Please select your institution";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  /* ================= SUBMIT ================= */
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateStep()) return;

  setIsSubmitting(true); // 🔄 start loader

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwNke4o3ukKSS_k-eF_X6CRdla1_er_EiKfZdh6Iyuyuv7FQpXs-TFIeKViVKJZaIOM/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(form),
      }
    );

    // Simulate delay for better UX
    setTimeout(() => {
      setIsSubmitting(false); // ✅ stop loader
      setShowConfirmation(true);

      setForm({
        fullName: "",
        dob: "",
        age: "",
        bloodGroup: "",
        personalEmail: "",
        collegeEmail: "",
        contactNumber: "",
        linkedIn: "",
        parentName: "",
        parentRelation: "",
        parentContact: "",
        permanentAddress: "",
        communicationAddress: "",
        institution: "",
        reason: "",
        contribution: "",
        theme: "",
        scholarship: "",
        scholarshipJustification: "",
        fallbackConsent: "",
        fallbackPlan: "",
        gender: "",
        agreedToImmersion: false,
        discussedWithGuardian: false,
      });

      setStep(1);
    }, 1500); // ⏳ animation time

  } catch (error) {
    console.error("Google Sheet Error:", error);
    setIsSubmitting(false);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <main className="min-h-screen bg-white p-8 max-w-2xl mx-auto text-black">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Apply to REACT Fellowship
      </h1>

      {/* ================= STEPPER ================= */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300 -z-10"></div>
        {[1, 2, 3, 4, 5].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold
              ${step >= s ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-600"}`}
          >
            {step > s ? "✓" : s}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

            <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} />
            <Input type="date" label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} error={errors.dob} />
            <Input label="Age" name="age" value={form.age} onChange={handleChange} error={errors.age} />

            <Select label="Blood Group" name="bloodGroup" value={form.bloodGroup} onChange={handleChange}
              options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} />

            <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}
              options={["Male", "Female", "Prefer not to say"]} />

            <Input label="Personal Email" name="personalEmail" value={form.personalEmail} onChange={handleChange} error={errors.personalEmail} />
            <Input label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} error={errors.contactNumber} />
          </section>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Address</h2>
            <Textarea label="Permanent Address" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} error={errors.permanentAddress} />
            <Textarea label="Communication Address" name="communicationAddress" value={form.communicationAddress} onChange={handleChange} error={errors.communicationAddress} />
          </section>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Program Commitment</h2>

            <Checkbox label="I am okay with the 6-month commitment including field immersion."
              name="agreedToImmersion" checked={form.agreedToImmersion} onChange={handleChange} />
            {errors.agreedToImmersion && <p className="text-red-500 text-sm">{errors.agreedToImmersion}</p>}

            <Checkbox label="I have discussed this with my parents/guardians."
              name="discussedWithGuardian" checked={form.discussedWithGuardian} onChange={handleChange} />
            {errors.discussedWithGuardian && <p className="text-red-500 text-sm">{errors.discussedWithGuardian}</p>}
          </section>
        )}

        {/* ================= STEP 4 ================= */}
        {step === 4 && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Your REACT Story</h2>
            <Textarea label="Why do you want to join REACT?" name="reason" value={form.reason} onChange={handleChange} error={errors.reason} />
            <Textarea label="What do you hope to learn or contribute?" name="contribution" value={form.contribution} onChange={handleChange} error={errors.contribution} />
          </section>
        )}

        {/* ================= STEP 5 ================= */}
        {step === 5 && (
          <section>
            <Select label="Preferred Theme" name="theme" value={form.theme} onChange={handleChange}
              options={[
                "Tech for Forest",
                "Inclusive Infrastructure Lab",
                "Tech for Society",
                "Rural Innovation",
                "Tech for Farmers",
                "HealthTech for All",
                "Tech for Urban Sanitation"
              ]} error={errors.theme} />

            <Select label="Institution / Organization" name="institution" value={form.institution} onChange={handleChange}
              options={["KCT", "KCLAS", "KIA", "KSI", "KCT BS", "KBS", "Other"]} error={errors.institution} />
          </section>
        )}

        {/* ================= NAVIGATION ================= */}
<div className="flex justify-between mt-8">
  {step > 1 && (
    <button
      type="button"
      onClick={handleBack}
      disabled={isSubmitting}
      className="px-6 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
    >
      Back
    </button>
  )}

  {step < totalSteps ? (
    <button
      type="button"
      onClick={handleNext}
      disabled={isSubmitting}
      className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
    >
      Next
    </button>
  ) : (
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex items-center gap-2 disabled:opacity-60"
    >
      {isSubmitting ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Submitting...
        </>
      ) : (
        "Submit Application"
      )}
    </button>
  )}
</div>

      </form>

      {/* ================= CONFIRMATION ================= */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={() => {
              setShowConfirmation(false);
              navigate(-1);
            }}
          >
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-2 text-green-700">
                Application Submitted!
              </h2>
              <p className="text-sm">Thank you for applying. We’ll get back to you shortly.</p>
              <p className="mt-2 text-xs">Click anywhere to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input {...props} className="w-full mt-1 p-2 border rounded" />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, name, value, onChange, options, error }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <select name={name} value={value} onChange={onChange}
        className="w-full mt-1 p-2 border rounded">
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Textarea({ label, error, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <textarea {...props} rows={4} className="w-full mt-1 p-2 border rounded" />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Checkbox({ label, name, checked, onChange }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      <label className="text-sm">{label}</label>
    </div>
  );
}
