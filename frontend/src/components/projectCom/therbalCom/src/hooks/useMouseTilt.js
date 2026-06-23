import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export function useMouseTilt(strength = 12) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const smoothX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.4 })
  const smoothY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 })
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [strength, -strength])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-strength, strength])

  function onMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width - 0.5)
    y.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, onMouseMove, onMouseLeave }
}
