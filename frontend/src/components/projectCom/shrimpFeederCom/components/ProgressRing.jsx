import { motion } from 'framer-motion';
import Counter from './Counter';

const TONES = {
  aqua: '#22D3EE',
  teal: '#2DD4BF',
  cyanic: '#0EA5E9',
};

/** Circular progress dial that animates its stroke + counter in view. */
export default function ProgressRing({ value, label, suffix = '%', tone = 'aqua' }) {
  const size = 168;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = TONES[tone] || TONES.aqua;

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - (c * value) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl font-bold text-white">
            <Counter value={value} suffix={suffix} />
          </span>
        </div>
      </div>
      <p className="max-w-[14rem] text-sm font-medium text-white/60">{label}</p>
    </div>
  );
}
