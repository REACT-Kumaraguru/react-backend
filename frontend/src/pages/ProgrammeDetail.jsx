import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProgrammeCard from '../components/programmes/ProgrammeCard';
import ProgrammeDynamicForm from '../components/programmes/ProgrammeDynamicForm';
import { fetchProgrammeBySlug } from '../api/programmesApi';

export default function ProgrammeDetail() {
  const { slug } = useParams();
  const [programme, setProgramme] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProgrammeBySlug(slug);
        if (cancelled) return;
        if (!data) {
          setError('This programme was not found.');
          setProgramme(null);
        } else {
          setProgramme(data);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Could not load programme');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="mb-8 text-sm">
          <Link to="/programmes" className="font-medium text-orange-600 hover:underline">
            ← Programmes
          </Link>
        </nav>

        {loading ? (
          <p className="text-center text-slate-500">Loading…</p>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center text-red-800">
            {error}
          </div>
        ) : programme ? (
          <div className="space-y-10">
            <ProgrammeCard programme={programme} variant="detail" />
            {programme.formFields?.length > 0 && programme.slug ? (
              <section aria-label="Application form">
                <ProgrammeDynamicForm slug={programme.slug} fields={programme.formFields} />
              </section>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
  