import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api/projectsApi';
import ProjectCard from '../components/ProgrammesCom/ProjectCard';

export const Projects = () => {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setError('');
      try {
        const data = await fetchProjects();
        if (!cancelled) setRows(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Could not load projects');
          setRows([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-6 pb-20 pt-32 font-poppins text-slate-900">
      <div className="pointer-events-none absolute left-[-10%] top-[5%] h-[800px] w-[800px] rounded-full border border-slate-100" />
      <div className="pointer-events-none absolute right-[-10%] top-[40%] h-[600px] w-[600px] rounded-full border border-blue-50" />
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-50/40 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-50/40 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="mb-6 h-3 w-3 animate-pulse rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h1 className="mb-8 text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">Field Projects</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Explore our <span className="font-semibold text-blue-600">field projects</span> where innovation meets
            real-world challenges. From agriculture to health and inclusion, discover how REACT is making a tangible
            difference.
          </p>
          <div className="mt-12 h-1 w-24 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </div>

        {error ? (
          <p className="text-center text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        {rows === null ? (
          <p className="text-center text-slate-500">Loading…</p>
        ) : rows.length === 0 ? (
          <p className="mx-auto max-w-lg text-center text-slate-600">
            Projects will appear here once they are published from the workplace admin.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {rows.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                tagline={project.tagline}
                who={project.who}
                duration={project.duration}
                format={project.format}
                description={project.description}
                brief={project.brief}
                briefIdea={project.briefIdea}
                ctaLabel={project.ctaLabel}
                postedDate={project.postedDate}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
