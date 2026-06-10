import { useState, useEffect, useRef, useCallback } from 'react'
import { SpinnerColor, resolveColor } from './spinnerColors'

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export type SpinnerStatus = 'spinning' | 'succeed' | 'fail' | 'warn' | 'info' | 'idle'

export interface SpinnerState {
  frame: string
  text: string
  status: SpinnerStatus
  color: string // couleur résolue (toujours un hex)
}

export interface UseSpinnerOptions {
  text?: string
  color?: SpinnerColor // 'green' | 'blue' | '#FF6B6B' | …
}

export function useSpinner({ text = '', color = 'green' }: UseSpinnerOptions = {}) {
  const [state, setState] = useState<SpinnerState>({
    frame: FRAMES[0], text,
    status: 'idle',
    color: resolveColor(color),
  })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frameIdx = useRef(0)

  const clearSpin = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  const start = useCallback((opts?: { text?: string; color?: SpinnerColor }) => {
    clearSpin()
    frameIdx.current = 0
    setState(s => ({
      frame: FRAMES[0], status: 'spinning',
      text: opts?.text ?? s.text,
      color: opts?.color ? resolveColor(opts.color) : s.color,
    }))
    intervalRef.current = setInterval(() => {
      frameIdx.current = (frameIdx.current + 1) % FRAMES.length
      setState(s => ({ ...s, frame: FRAMES[frameIdx.current] }))
    }, 80)
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
    stop: () => resolve('idle', FRAMES[0]),
    setText: (t: string) => setState(s => ({ ...s, text: t })),
    setColor: (c: SpinnerColor) =>
      setState(s => ({ ...s, color: resolveColor(c) })),
  }] as const
}