import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import hackathonThemes from '../data/hackathonProblemsData';
import { ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';

function ProblemCard({ problem }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = problem.context || problem.nationalContext || problem.engineeringGap || problem.affectedPopulation || problem.hardwareDesign || problem.successIndicators;

  return (
    <motion.div
      layout
      className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        type="button"
        onClick={() => hasDetails && setExpanded((e) => !e)}
        className="w-full text-left p-5 flex items-start gap-3"
      >
        <span className="shrink-0 mt-0.5">
          {expanded ? (
            <ChevronDown className="w-5 h-5 text-[#F57C00]" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{problem.title}</h3>
          <p className="text-slate-600 text-sm line-clamp-2">{problem.context}</p>
        </div>
      </button>

      <AnimatePresence>
        {expanded && hasDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 pl-12 space-y-4 border-t border-slate-100">
              {problem.context && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Context</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{problem.context}</p>
                </div>
              )}
              {problem.nationalContext && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">National Context</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{problem.nationalContext}</p>
                </div>
              )}
              {problem.engineeringGap && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Engineering Gap</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{problem.engineeringGap}</p>
                </div>
              )}
              {problem.affectedPopulation && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Affected Population</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">{problem.affectedPopulation}</p>
                </div>
              )}
              {problem.policy && problem.policy.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Policy References</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {problem.policy.map((p, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">{p}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Solve4PurposeProblems() {
  return (
    <div className="min-h-screen bg-slate-100 pt-20 md:pt-24">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/solve4purpose"
            className="flex items-center gap-2 text-slate-600 hover:text-[#F57C00] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Solve4Purpose</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-[#F57C00] font-semibold text-sm uppercase tracking-wider mb-2">
            Problem Statements
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#F57C00] mb-3">
            Tackle real-world challenges
          </h1>
          <p className="text-slate-700 text-lg">
            {hackathonThemes.reduce((acc, t) => acc + t.problems.length, 0)} problem statements across {hackathonThemes.length} themes.
          </p>
        </motion.div>

        <div className="space-y-12">
          {hackathonThemes.map((theme) => (
            <section key={theme.id}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl" aria-hidden>{theme.icon}</span>
                <h2 className="text-xl font-bold text-slate-900">{theme.name}</h2>
              </div>
              <p className="text-slate-600 text-sm mb-6">{theme.tagline}</p>

              <div className="space-y-3">
                {theme.problems.map((problem) => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            </section>
          ))}
        </div>


      </main>
    </div>
  );
}
