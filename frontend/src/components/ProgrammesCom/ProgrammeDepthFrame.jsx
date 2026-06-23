import React, { useEffect, useRef, useState } from 'react';

const canUseDepth = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ProgrammeDepthFrame = ({ children, className = '', delay = 0, lift = true }) => {
  const frameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event) {
    if (!lift || !canUseDepth()) return;

    const node = frameRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty('--programme-tilt-x', `${(-y * 3).toFixed(2)}deg`);
    node.style.setProperty('--programme-tilt-y', `${(x * 3).toFixed(2)}deg`);
  }

  function handlePointerLeave() {
    const node = frameRef.current;
    if (!node) return;

    node.style.setProperty('--programme-tilt-x', '0deg');
    node.style.setProperty('--programme-tilt-y', '0deg');
  }

  return (
    <div
      ref={frameRef}
      className={`programme-depth-frame ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--programme-depth-delay': `${delay}ms` }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="programme-depth-surface">{children}</div>
    </div>
  );
};

export default ProgrammeDepthFrame;
