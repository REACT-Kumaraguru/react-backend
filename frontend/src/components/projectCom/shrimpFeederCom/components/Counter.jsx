import { useCountUp } from '../hooks/useCountUp';
import { cn } from '../utils/cn';

/** Animated number that counts up when scrolled into view. */
export default function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}) {
  const [display, ref] = useCountUp(value, { decimals });
  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
