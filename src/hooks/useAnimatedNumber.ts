import { useState, useEffect, useRef } from 'react'

/**
 * Animates a number from 0 to target on mount/change.
 * Uses requestAnimationFrame with cubic deceleration.
 * Respects prefers-reduced-motion.
 */
export function useAnimatedNumber(target: number, duration = 400, decimals = 0): number {
  const [value, setValue] = useState(0)
  const prefersReduced = useRef(false)

  useEffect(() => {
    prefersReduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (prefersReduced.current) {
      setValue(target)
      return
    }

    const start = performance.now()
    const from = 0
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Cubic deceleration: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (target - from) * eased
      setValue(Number(current.toFixed(decimals)))

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, decimals])

  return value
}
