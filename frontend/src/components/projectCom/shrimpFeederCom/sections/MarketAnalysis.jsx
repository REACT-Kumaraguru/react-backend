import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import SectionHeading from '../components/SectionHeading';
import GlassCard from '../components/GlassCard';
import Counter from '../components/Counter';
import { SEAFOOD_PRODUCTION, MARKET_STATS } from '../utils/constants';
import { fadeUp, scaleIn, staggerParent, viewportOnce } from '../animations/variants';

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl glass-strong px-4 py-2 text-sm">
      <p className="font-semibold text-white">{label}</p>
      <p className="text-aqua">{payload[0].value} M tonnes</p>
    </div>
  );
}

export default function MarketAnalysis() {
  return (
    <section id="market" className="section-pad">
      <SectionHeading
        eyebrow="Market Analysis"
        title="A fast-growing global opportunity"
        subtitle="Seafood and shrimp production keep rising, and feed remains the dominant operational cost — making efficient feeding a high-value market."
      />

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <GlassCard tilt={false} className="h-full">
            <h3 className="mb-6 font-display text-lg font-bold">
              Global Seafood Production{' '}
              <span className="text-white/40">(2020–2025, M tonnes)</span>
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SEAFOOD_PRODUCTION}>
                  <defs>
                    <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22D3EE" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.06)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="year"
                    stroke="rgba(255,255,255,0.4)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[150, 205]}
                    stroke="rgba(255,255,255,0.4)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: 'rgba(34,211,238,0.06)' }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={42}>
                    {SEAFOOD_PRODUCTION.map((_, i) => (
                      <Cell key={i} fill="url(#barG)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-4"
        >
          {MARKET_STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <GlassCard className="flex h-full flex-col justify-center" tilt={false}>
                <div className="font-display text-3xl font-extrabold text-gradient">
                  <Counter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals || 0}
                  />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  {s.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
