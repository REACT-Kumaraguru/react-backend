import React, { useState } from "react";
import {
  entrepreneurIndexIntro,
  entrepreneurQuestions,
  entrepreneurSwingQuestion,
} from "../data/entrepreneurIndexData";

const STORAGE_KEY = "entrepreneurIndexAccess";

function readUnlockedFromSession() {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function EntrepreneurIndex() {
  const [unlocked, setUnlocked] = useState(() => readUnlockedFromSession());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [swingAnswer, setSwingAnswer] = useState("");
  const [finished, setFinished] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      linkedin: linkedin.trim(),
      submittedAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
      sessionStorage.setItem("entrepreneurIndexLead", JSON.stringify(payload));
    } catch {
      /* ignore */
    }
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalSteps = entrepreneurQuestions.length + 1;
  const isSwingStep = currentIdx === entrepreneurQuestions.length;
  const progress = Math.round((currentIdx / totalSteps) * 100);

  const currentQuestion = !isSwingStep
    ? entrepreneurQuestions[currentIdx]
    : entrepreneurSwingQuestion;

  const currentValue = !isSwingStep ? answers[currentQuestion.id] || "" : swingAnswer;

  const chooseOption = (value) => {
    if (isSwingStep) {
      setSwingAnswer(value);
      return;
    }
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const goNext = () => {
    if (!currentValue) return;
    if (isSwingStep) {
      setFinished(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCurrentIdx((v) => v + 1);
  };

  const goPrev = () => {
    if (currentIdx === 0) return;
    setCurrentIdx((v) => v - 1);
  };

  const restart = () => {
    setCurrentIdx(0);
    setAnswers({});
    setSwingAnswer("");
    setFinished(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scoreMap = entrepreneurQuestions.reduce(
    (acc, q) => {
      const pick = answers[q.id];
      if (pick === "A") acc[q.a.score] += 1;
      if (pick === "B") acc[q.b.score] += 1;
      return acc;
    },
    { OS: 0, SO: 0, ED: 0, IB: 0, UT: 0 }
  );

  const sortedScores = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
  const dimensionLabels = {
    OS: "Opportunity Sensitivity",
    SO: "Systems Orientation",
    ED: "Empathy Depth",
    IB: "Initiative Bias",
    UT: "Uncertainty Tolerance",
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-[#F4F6F8] px-4 pb-16 pt-28 text-slate-900 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700/80">
            Entrepreneur Index
          </p>
          <h1 className="mt-3 text-center font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
            Before you begin
          </h1>
          <p className="mt-3 text-center text-sm text-slate-600">
            Enter your details to access the locked 30-question instrument and
            swing question.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Full name
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Phone number
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600"
                autoComplete="tel"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700">
                LinkedIn profile URL
              </label>
              <input
                required
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cyan-600"
                autoComplete="url"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#2C3240] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#202531]"
            >
              Continue to the Index →
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F6F8] px-4 pb-12 pt-28 text-slate-900 sm:px-6 sm:pb-16 sm:pt-32">
      <article className="mx-auto max-w-3xl">
        <header className="border-b border-slate-200 pb-8">
          <h1 className="font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
            {entrepreneurIndexIntro.title}
          </h1>
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/80">
              Note
            </p>
            <p className="mt-1 text-sm leading-relaxed text-amber-900/90">
              Each question is a forced-choice pair — two options of equal
              social desirability. The taker must choose based on genuine
              preference, not on what sounds &apos;more entrepreneurial.&apos;
              This is by design and is the core mechanism that makes the
              instrument honest.
            </p>
          </div>
        </header>

        {!finished ? (
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-5">
              <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-cyan-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs font-medium text-slate-500">
                Question {currentIdx + 1} of {totalSteps}
              </p>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Q{isSwingStep ? 31 : currentQuestion.id} — Type: {currentQuestion.type}
            </p>
            <p className="mt-2 text-lg font-medium text-slate-900">
              {currentQuestion.prompt}
            </p>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={() => chooseOption("A")}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm leading-relaxed transition ${
                  currentValue === "A"
                    ? "border-cyan-600 bg-cyan-50 text-slate-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <span className="font-semibold text-slate-900">A.</span>{" "}
                {!isSwingStep ? currentQuestion.a.text : currentQuestion.a.text}
              </button>
              <button
                type="button"
                onClick={() => chooseOption("B")}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm leading-relaxed transition ${
                  currentValue === "B"
                    ? "border-cyan-600 bg-cyan-50 text-slate-900"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                <span className="font-semibold text-slate-900">B.</span>{" "}
                {!isSwingStep ? currentQuestion.b.text : currentQuestion.b.text}
              </button>
            </div>

            {isSwingStep ? (
              <p className="mt-4 text-xs text-slate-500">
                Swing question: result tone only (does not affect dimension scores).
              </p>
            ) : null}

            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentIdx === 0}
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={!currentValue}
                className="rounded-full bg-[#2C3240] px-6 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSwingStep ? "See My Combination →" : "Next →"}
              </button>
            </div>
          </section>
        ) : (
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Your combination</h2>
            <p className="mt-2 text-sm text-slate-600">
              Based on your choices, your strongest orientation is:
            </p>
            <p className="mt-4 text-xl font-semibold text-cyan-700">
              {dimensionLabels[sortedScores[0][0]]} + {dimensionLabels[sortedScores[1][0]]}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sortedScores.map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {key}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {dimensionLabels[key]} — {value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-slate-600">
              Processing style:{" "}
              <span className="font-medium text-slate-900">
                {swingAnswer === "A"
                  ? entrepreneurSwingQuestion.a.label
                  : entrepreneurSwingQuestion.b.label}
              </span>
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={restart}
                className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700"
              >
                Retake Index
              </button>
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
