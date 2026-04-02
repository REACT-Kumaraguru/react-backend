const ContentCard = ({ image, tag, title, desc, author, date, link }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-100">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {tag && (
          <span className="absolute top-4 left-4 text-xs px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 font-medium shadow-sm">
            {tag}
          </span>
        )}
      </div>

      <div className="p-6">
        {/* Date */}
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{date}</p>

        {/* Title */}
        <h3 className="font-bold text-lg text-slate-900 mb-3 leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-4">
          {desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          {author && (
            <span className="text-xs text-slate-500 font-medium">{author}</span>
          )}
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors group/link"
            >
              Read on LinkedIn
              <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          ) : (
            <span className="text-xs text-slate-400">{!author && date}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;

