import { useState, useEffect, useRef, useCallback } from 'react'
import { resolveColor, SpinnerColor } from './spinnerColors'
import { SPINNER_FRAMES, SpinnerVariant } from './spinnerFrames'

export type SpinnerStatus = 'spinning' | 'succeed' | 'fail' | 'warn' | 'info' | 'idle'

export interface SpinnerState {
  frame: string
  text: string
  status: SpinnerStatus
  color: string // Resolved color string (e.g. '#FF6B6B')
}

export interface UseSpinnerOptions {
  text?: string
  color?: SpinnerColor // 'green' | 'blue' | '#FF6B6B' | …
  variant?: SpinnerVariant
  interval?: number // Interval in milliseconds for frame updates (default: 80ms)
}

export function useSpinner({ text = '', color = 'green', variant = 'dots', interval }: UseSpinnerOptions = {}) {
  const frames = SPINNER_FRAMES[variant ?? 'dots']
  const [state, setState] = useState<SpinnerState>({
    frame: frames[0], text,
    status: 'idle',
    color: resolveColor(color),
  })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frameIdx = useRef(0)

  const clearSpin = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  const start = useCallback((opts?: { text?: string; color?: SpinnerColor; interval?: number }) => {
    clearSpin()
    frameIdx.current = 0
    setState(s => ({
      frame: frames[0], status: 'spinning',
      text: opts?.text ?? s.text,
      color: opts?.color ? resolveColor(opts.color) : s.color,
    }))
    intervalRef.current = setInterval(() => {
      frameIdx.current = (frameIdx.current + 1) % frames.length
      setState(s => ({ ...s, frame: frames[frameIdx.current] }))
    }, opts?.interval ?? interval ?? 80)
  }, [clearSpin])

  const resolve = useCallback(
    (status: SpinnerStatus, char: string, text?: string) => {
      clearSpin()
      setState(s => ({ ...s, frame: char, status, ...(text && { text }) }))
    }, [clearSpin])

  useEffect(() => () => clearSpin(), [clearSpin])

  return [state, {
    start,
    succeed: (t?: string) => resolve('succeed', '✔', t),
    fail: (t?: string) => resolve('fail', '✖', t),
    warn: (t?: string) => resolve('warn', '⚠', t),
    info: (t?: string) => resolve('info', 'ℹ', t),
    stop: () => resolve('idle', frames[0]),
    setText: (t: string) => setState(s => ({ ...s, text: t })),
    setColor: (c: SpinnerColor) =>
      setState(s => ({ ...s, color: resolveColor(c) })),
  }] as const
}