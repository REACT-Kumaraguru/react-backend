import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, MapPin, Calendar, Briefcase, X } from 'lucide-react';

const ProjectCard = ({
  title,
  tagline,
  who,
  duration,
  format,
  description,
  brief,
  briefIdea,
  ctaLabel = 'Read the idea',
  postedDate = 'LATEST OUTCOME',
  imageUrl: imageUrlProp,
  imgageUrl,
  preview = false,
}) => {
  const [ideaOpen, setIdeaOpen] = useState(false);
  const imageUrl = imageUrlProp || imgageUrl || '';
  const initial = String(title || '').trim().charAt(0) || '?';
  const headerClass =
    'relative flex min-h-[10rem] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600';
  const idea = String(briefIdea || '').trim();
  const label = String(ctaLabel || '').trim() || 'Read the idea';
  const canOpenIdea = idea.length > 0;

  useEffect(() => {
    if (!ideaOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIdeaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ideaOpen]);

  useEffect(() => {
    if (ideaOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ideaOpen]);

  const ideaModal =
    ideaOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-idea-title"
      >
        <button
          type="button"
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          aria-label="Close"
          onClick={() => setIdeaOpen(false)}
        />
        <div className="relative z-10 max-h-[min(85vh,640px)] w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 id="project-idea-title" className="pr-8 font-poppins text-lg font-bold leading-snug text-slate-900">
              {title?.trim() ? title : 'Project'}
            </h2>
            <button
              type="button"
              onClick={() => setIdeaOpen(false)}
              className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[calc(85vh-8rem)] overflow-y-auto px-5 py-4 sm:px-6">
            <p className="whitespace-pre-wrap font-poppins text-sm leading-relaxed text-slate-700">{idea}</p>
          </div>
        </div>
      </div>,
      document.body,
    );

  return (
    <div className="group relative mx-auto w-full max-w-[380px] font-poppins">
      {ideaModal}
      <div className="absolute -inset-1 -z-10 rounded-[2.5rem] bg-gradient-to-b from-blue-400 to-purple-400 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />

      <div className="w-full overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
        <div
          className={headerClass}
          style={
            imageUrl
              ? {
                  backgroundImage: `linear-gradient(to bottom, rgba(15,23,42,0.45), rgba(30,58,138,0.75)), url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          <div className="absolute top-4 h-1.5 w-12 rounded-full bg-white/30" />

          <div className="z-10 px-4 text-center">
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-md">
              <span className="text-3xl font-black text-white">{initial}</span>
            </div>
            <h3 className="text-lg font-bold leading-tight tracking-tight text-white drop-shadow-sm">
              {title?.trim() ? title : preview ? 'Title' : '\u00a0'}
            </h3>
          </div>
        </div>

        <div className="-mt-2 px-8 pb-8 pt-2">
          <div className="mb-6 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{postedDate}</p>
            {tagline ? <p className="mt-1 text-[11px] italic text-slate-400">{tagline}</p> : null}
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <MapPin size={16} className="shrink-0 text-blue-500" />
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Location / Who</p>
                <p className="text-xs font-bold text-slate-700">{who || (preview ? '—' : '\u00a0')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Calendar size={16} className="shrink-0 text-blue-500" />
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Duration</p>
                <p className="text-xs font-bold text-slate-700">{duration || (preview ? '—' : '\u00a0')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Briefcase size={16} className="shrink-0 text-blue-500" />
              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Focus / Format</p>
                <p className="text-xs font-bold text-slate-700">{format || (preview ? '—' : '\u00a0')}</p>
              </div>
            </div>
          </div>

          <div className="mb-5 border-t border-slate-100 pt-4">
            <p className="px-2 text-center text-[12px] italic leading-relaxed text-slate-500">
              {description ? `“${description}”` : preview ? '—' : '\u00a0'}
            </p>
          </div>

          {brief ? (
            <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">About</p>
              <p className="mt-1.5 text-left text-[12px] font-medium leading-relaxed text-slate-700">{brief}</p>
            </div>
          ) : null}

          {canOpenIdea ? (
            <button
              type="button"
              onClick={() => setIdeaOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-100 transition hover:bg-blue-600"
            >
              {label}
              <ArrowUpRight size={14} strokeWidth={2.5} aria-hidden />
            </button>
          ) : preview ? (
            <p className="text-center text-[11px] text-slate-400">Add &quot;Brief idea&quot; text to show the button.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
