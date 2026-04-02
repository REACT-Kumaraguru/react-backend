import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Loader2, CheckCircle2 } from 'lucide-react';

const MIN_MEMBERS = 1;  // team lead + 1 member = 2 total
const MAX_MEMBERS = 3;  // team lead + 3 members = 4 total

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzgZg3Fnts_0co3q9F3j5wxDFQ3Uk5YKi4EPmwLEVJIaMBQLtPM4OZ5fpgkKc7SdXsVoA/exec';

const Solve4PurposeForm = () => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [submitError, setSubmitError] = useState('');
  const [stepErrors, setStepErrors] = useState({ step1: [], step2: [], step3: [] });
  const [formData, setFormData] = useState({
    teamName: '',
    teamLead: { name: '', rollNo: '', phone: '', year: '', dept: '' },
    members: [{ name: '', rollNo: '', phone: '', year: '', dept: '' }],
    theme: '',
    themeOther: '',
    problemStatementSelection: '',
    problemUnderstanding: '',
    proposedSolution: '',
    expectedImpact: '',
    motivationToParticipate: '',
    priorExperience: 'No',
    previousWorkDetails: ''
  });
 
  const themes = [
    "Agriculture", "Dairy & Animal Health", "Water", "Health",
    "Waste Management", "Mobility & Transportation",
    "Environment", "Food Processing", "Energy Access", "Other"
  ];

  const addMember = () => {
    if (formData.members.length < MAX_MEMBERS) {
      setFormData({
        ...formData,
        members: [...formData.members, { name: '', rollNo: '', phone: '', year: '', dept: '' }]
      });
    }
  };

  const removeMember = (idx) => {
    if (formData.members.length > MIN_MEMBERS) {
      setFormData({
        ...formData,
        members: formData.members.filter((_, i) => i !== idx)
      });
    }
  };

  const updateMember = (idx, field, value) => {
    const next = [...formData.members];
    next[idx] = { ...next[idx], [field]: value };
    setFormData({ ...formData, members: next });
  };

  // ─── VALIDATIONS (unchanged, still tied to their original screen's fields) ───

  // NEW Step 1 = OLD Step 3 fields
  const validateStep1 = () => {
    const errs = [];
    if (!formData.problemUnderstanding?.trim()) errs.push('Problem Understanding is required.');
    if (!formData.proposedSolution?.trim()) errs.push('Root Cause Analysis Overview is required.');
    if (!formData.expectedImpact?.trim()) errs.push('Expected Impact is required.');
    if (!formData.motivationToParticipate?.trim()) errs.push('Motivation to Participate is required.');
    if (!formData.priorExperience) errs.push('Prior Experience (Yes/No) is required.');
    if (formData.priorExperience === 'Yes' && !formData.previousWorkDetails?.trim()) errs.push('Previous Work Details is required when Prior Experience is Yes.');
    setStepErrors((e) => ({ ...e, step1: errs }));
    return errs.length === 0;
  };

  // NEW Step 2 = OLD Step 2 fields
  const validateStep2 = () => {
    const errs = [];
    if (!formData.theme) errs.push('Theme of the Project is required.');
    if (formData.theme === 'Other' && !formData.themeOther?.trim()) errs.push('Specify Theme (Other) is required when Theme is Other.');
    if (!formData.problemStatementSelection?.trim()) errs.push('Problem Statement Selection is required.');
    setStepErrors((e) => ({ ...e, step2: errs }));
    return errs.length === 0;
  };

  // NEW Step 3 = OLD Step 1 fields
  const validateStep3 = () => {
    const errs = [];
    if (!formData.teamName?.trim()) errs.push('Team Name is required.');
    const lead = formData.teamLead;
    if (!lead?.name?.trim()) errs.push('Team Lead Name is required.');
    if (!lead?.rollNo?.trim()) errs.push('Team Lead Roll No is required.');
    if (!lead?.phone?.trim()) errs.push('Team Lead Phone is required.');
    if (!lead?.year?.trim()) errs.push('Team Lead Year is required.');
    if (!lead?.dept?.trim()) errs.push('Team Lead Dept is required.');
    formData.members.forEach((m, i) => {
      if (!m?.name?.trim()) errs.push(`Member ${i + 1} Name is required.`);
      if (!m?.rollNo?.trim()) errs.push(`Member ${i + 1} Roll No is required.`);
      if (!m?.phone?.trim()) errs.push(`Member ${i + 1} Phone is required.`);
      if (!m?.year?.trim()) errs.push(`Member ${i + 1} Year is required.`);
      if (!m?.dept?.trim()) errs.push(`Member ${i + 1} Dept is required.`);
    });
    setStepErrors((e) => ({ ...e, step3: errs }));
    return errs.length === 0;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStepErrors({ step1: [], step2: [], step3: [] });
    setStep((s) => Math.min(s + 1, 3));
  };
  const prevStep = () => {
    setStepErrors({ step1: [], step2: [], step3: [] });
    setStep((s) => Math.max(s - 1, 1));
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setSubmitting(true);
    setSubmitStatus(null);
    setSubmitError('');
    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData),
      });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      setSubmitError(error?.message || 'Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const boxStyle = "border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:ring-2 focus:ring-red-500 transition-all";
  const labelStyle = "block font-black text-xl mb-2 uppercase tracking-tight";

  return (
    <div className="min-h-screen bg-[#FDF2F8] pt-24 pb-6 px-6 font-sans text-black relative">
      {/* Submit loader overlay */}
      <AnimatePresence>
        {submitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4"
            >
              <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
              <p className="font-black text-xl uppercase">Submitting...</p>
              <p className="text-sm text-slate-600">Please wait while we save your registration.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <iframe id="gs-submit-iframe" name="gs-submit-iframe" title="Form submit" className="hidden" />
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-start gap-2 mb-12">
          <div className="bg-white border-4 border-black px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-5xl font-black">SOLVE</h1>
          </div>
          <div className="flex gap-2">
            <div className="bg-pink-100 border-4 border-black px-8 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black italic">4</h2>
            </div>
            <div className="bg-white border-4 border-black px-10 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase">Purpose</h2>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-between mb-8 gap-4 font-black">
          {[1, 2, 3].map((num) => (
            <div key={num} className={`flex-1 text-center py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${step === num ? 'bg-red-500 text-white' : 'bg-white'}`}>
              STEP {num}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <form className="relative" onSubmit={handleSubmit}>
          <div className="min-h-[600px]">
            <AnimatePresence mode="wait">

              {/* ── NEW STEP 1: Problem Understanding, Solution, Impact, Motivation, Prior Experience (was old Step 3) ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  {stepErrors.step1.length > 0 && (
                    <div className="bg-red-100 border-4 border-red-600 p-4 text-red-800 font-bold">
                      <ul className="list-disc list-inside space-y-1">
                        {stepErrors.step1.map((msg, i) => <li key={i}>{msg}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <label className={labelStyle}>1. Problem Understanding <span className="text-red-600">*</span></label>
                    <p className="text-sm text-slate-600 mb-2">Describe your understanding of the selected problem statement. What key challenges or gaps have you identified?</p>
                    <textarea
                      required
                      rows="4"
                      className={`w-full ${boxStyle}`}
                      placeholder="Share your analysis and key challenges identified"
                      value={formData.problemUnderstanding}
                      onChange={(e) => setFormData({ ...formData, problemUnderstanding: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>2. Root Cause Analysis Overview <span className="text-red-600">*</span></label>
                    <p className="text-sm text-slate-600 mb-2">What are the root causes of this problem, and who are the primary stakeholders affected?</p>
                    <textarea
                      required
                      rows="4"
                      className={`w-full ${boxStyle}`}
                      placeholder="Describe your solution or approach"
                      value={formData.proposedSolution}
                      onChange={(e) => setFormData({ ...formData, proposedSolution: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>3. Expected Impact <span className="text-red-600">*</span></label>
                    <p className="text-sm text-slate-600 mb-2">What measurable or meaningful impact will your solution create? Who will benefit and how?</p>
                    <textarea
                      required
                      rows="4"
                      className={`w-full ${boxStyle}`}
                      placeholder="Describe the impact and beneficiaries"
                      value={formData.expectedImpact}
                      onChange={(e) => setFormData({ ...formData, expectedImpact: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>4. Motivation to Participate <span className="text-red-600">*</span></label>
                    <p className="text-sm text-slate-600 mb-2">Why do you want to participate in Solve4Purpose Ideathon?</p>
                    <textarea
                      required
                      rows="3"
                      className={`w-full ${boxStyle}`}
                      placeholder="Share your motivation"
                      value={formData.motivationToParticipate}
                      onChange={(e) => setFormData({ ...formData, motivationToParticipate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>5. Prior Experience in This Domain <span className="text-red-600">*</span></label>
                    <p className="text-sm text-slate-600 mb-2">Have you previously worked on a similar problem or domain?</p>
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priorExperience"
                          value="Yes"
                          checked={formData.priorExperience === 'Yes'}
                          onChange={(e) => setFormData({ ...formData, priorExperience: e.target.value })}
                          className="w-5 h-5 accent-black"
                        />
                        <span className="font-bold">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priorExperience"
                          value="No"
                          checked={formData.priorExperience === 'No'}
                          onChange={(e) => setFormData({ ...formData, priorExperience: e.target.value })}
                          className="w-5 h-5 accent-black"
                        />
                        <span className="font-bold">No</span>
                      </label>
                    </div>
                  </div>
                  {formData.priorExperience === 'Yes' && (
                    <div>
                      <label className={labelStyle}>6. If Yes – Previous Work Details <span className="text-red-600">*</span></label>
                      <p className="text-sm text-slate-600 mb-2">Briefly describe your earlier solution, prototype, or experience.</p>
                      <textarea
                        required={formData.priorExperience === 'Yes'}
                        rows="4"
                        className={`w-full ${boxStyle}`}
                        placeholder="Describe your previous work, solution, or prototype"
                        value={formData.previousWorkDetails}
                        onChange={(e) => setFormData({ ...formData, previousWorkDetails: e.target.value })}
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── NEW STEP 2: Theme & Problem Statement (was old Step 2) ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  {stepErrors.step2.length > 0 && (
                    <div className="bg-red-100 border-4 border-red-600 p-4 text-red-800 font-bold">
                      <ul className="list-disc list-inside space-y-1">
                        {stepErrors.step2.map((msg, i) => <li key={i}>{msg}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <label className={labelStyle}>7. Theme of the Project <span className="text-red-600">*</span></label>
                    <select required className={`w-full ${boxStyle}`} value={formData.theme} onChange={(e) => setFormData({ ...formData, theme: e.target.value })}>
                      <option value="">Select a Theme</option>
                      {themes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  {formData.theme === 'Other' && (
                    <div>
                      <label className={labelStyle}>Specify Theme (Other) <span className="text-red-600">*</span></label>
                      <input
                        type="text"
                        required
                        className={`w-full ${boxStyle}`}
                        placeholder="Enter your theme"
                        value={formData.themeOther}
                        onChange={(e) => setFormData({ ...formData, themeOther: e.target.value })}
                      />
                    </div>
                  )}
                  <div>
                    <label className={labelStyle}>8. Problem Statement Selection <span className="text-red-600">*</span></label>
                    <p className="text-sm text-slate-600 mb-2">Which problem statement are you applying to solve?</p>
                    <textarea
                      required
                      rows="3"
                      className={`w-full ${boxStyle}`}
                      placeholder="Enter or paste the problem statement you wish to address"
                      value={formData.problemStatementSelection}
                      onChange={(e) => setFormData({ ...formData, problemStatementSelection: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}

              {/* ── NEW STEP 3: Team Info (was old Step 1) ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  {stepErrors.step3.length > 0 && (
                    <div className="bg-red-100 border-4 border-red-600 p-4 text-red-800 font-bold">
                      <ul className="list-disc list-inside space-y-1">
                        {stepErrors.step3.map((msg, i) => <li key={i}>{msg}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <label className={labelStyle}>Team Name <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      required
                      className={`w-full ${boxStyle}`}
                      placeholder="Your unique team name"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    />
                  </div>

                  {/* Team Lead */}
                  <div className="border-4 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black text-lg uppercase mb-4">Team Lead <span className="text-red-600">*</span></h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-sm mb-1">Name</label>
                        <input
                          type="text"
                          required
                          className={`w-full ${boxStyle}`}
                          placeholder="Full Name"
                          value={formData.teamLead.name}
                          onChange={(e) => setFormData({ ...formData, teamLead: { ...formData.teamLead, name: e.target.value } })}
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-sm mb-1">Roll No</label>
                        <input
                          type="text"
                          required
                          className={`w-full ${boxStyle}`}
                          placeholder="Roll No."
                          value={formData.teamLead.rollNo}
                          onChange={(e) => setFormData({ ...formData, teamLead: { ...formData.teamLead, rollNo: e.target.value } })}
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-sm mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          className={`w-full ${boxStyle}`}
                          placeholder="Phone Number"
                          value={formData.teamLead.phone}
                          onChange={(e) => setFormData({ ...formData, teamLead: { ...formData.teamLead, phone: e.target.value } })}
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-sm mb-1">Year of Studying</label>
                        <select
                          required
                          className={`w-full ${boxStyle}`}
                          value={formData.teamLead.year}
                          onChange={(e) => setFormData({ ...formData, teamLead: { ...formData.teamLead, year: e.target.value } })}
                        >
                          <option value="">Select Year</option>
                          {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-sm mb-1">Dept</label>
                        <input
                          type="text"
                          required
                          className={`w-full ${boxStyle}`}
                          placeholder="Department"
                          value={formData.teamLead.dept}
                          onChange={(e) => setFormData({ ...formData, teamLead: { ...formData.teamLead, dept: e.target.value } })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Team Members */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className={labelStyle}>Team Members (min 1, max 3)</label>
                      <button
                        type="button"
                        onClick={addMember}
                        disabled={formData.members.length >= MAX_MEMBERS}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
                      >
                        <Plus className="w-5 h-5" /> Add Member
                      </button>
                    </div>
                    {formData.members.map((member, idx) => (
                      <div key={idx} className="relative border-4 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                        {formData.members.length > MIN_MEMBERS && (
                          <button
                            type="button"
                            onClick={() => removeMember(idx)}
                            className="absolute top-3 right-3 p-1 rounded border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
                            aria-label="Remove member"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                        <h4 className="font-bold text-sm uppercase mb-3">Member {idx + 1}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-sm mb-1">Name</label>
                            <input
                              type="text"
                              required
                              className={`w-full ${boxStyle}`}
                              placeholder="Full Name"
                              value={member.name}
                              onChange={(e) => updateMember(idx, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-sm mb-1">Roll No</label>
                            <input
                              type="text"
                              required
                              className={`w-full ${boxStyle}`}
                              placeholder="Roll No."
                              value={member.rollNo}
                              onChange={(e) => updateMember(idx, 'rollNo', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-sm mb-1">Phone</label>
                            <input
                              type="tel"
                              required
                              className={`w-full ${boxStyle}`}
                              placeholder="Phone Number"
                              value={member.phone}
                              onChange={(e) => updateMember(idx, 'phone', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block font-bold text-sm mb-1">Year of Studying</label>
                            <select
                              required
                              className={`w-full ${boxStyle}`}
                              value={member.year}
                              onChange={(e) => updateMember(idx, 'year', e.target.value)}
                            >
                              <option value="">Select Year</option>
                              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block font-bold text-sm mb-1">Dept</label>
                            <input
                              type="text"
                              required
                              className={`w-full ${boxStyle}`}
                              placeholder="Department"
                              value={member.dept}
                              onChange={(e) => updateMember(idx, 'dept', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className={`px-8 py-3 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none ${step === 1 ? 'opacity-30' : 'bg-white'}`}
            >
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-[#006428] text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase hover:bg-green-700 transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-red-500 text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase hover:bg-red-600 transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Project'}
              </button>
            )}
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-8 bg-white border-4 border-green-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center"
            >
              <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-black text-2xl uppercase text-green-800 mb-2">Submitted successfully!</h3>
              <p className="text-slate-700">Thank you for registering for Solve 4 Purpose – Ideathon 2026. We have received your application.</p>
            </motion.div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-6 text-center max-w-md mx-auto space-y-2">
              <p className="text-red-600 font-bold">{submitError}</p>
              <p className="text-sm text-gray-600">
                If the browser loaded <code className="bg-gray-200 px-1 rounded">script.googleusercontent.com/.../echo</code> (403), use the Web App URL from <strong>Deploy → New deployment → Web app</strong>, not the Test deployment URL.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Solve4PurposeForm;