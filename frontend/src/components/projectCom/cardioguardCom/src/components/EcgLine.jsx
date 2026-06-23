export default function EcgLine({ className = '' }) {
  return (
    <svg className={`ecg-line ${className}`} viewBox="0 0 720 120" fill="none" aria-hidden="true">
      <path
        className="ecg-path"
        d="M0 64 H94 L112 64 L128 32 L150 92 L174 64 H284 L306 64 L322 44 L340 78 L358 64 H462 L480 64 L500 20 L526 104 L550 64 H720"
      />
      <path
        className="ecg-path ecg-path-soft"
        d="M0 64 H94 L112 64 L128 32 L150 92 L174 64 H284 L306 64 L322 44 L340 78 L358 64 H462 L480 64 L500 20 L526 104 L550 64 H720"
      />
    </svg>
  );
}
