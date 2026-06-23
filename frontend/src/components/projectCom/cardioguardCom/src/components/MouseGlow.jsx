import { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      style={{
        background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(34,184,207,0.12), transparent 44%)`
      }}
    />
  );
}
