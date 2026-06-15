import { useState, useRef, useCallback, useEffect } from 'react'
import { SpinnerColor, resolveColor } from './spinnerColors'
import { SPINNER_FRAMES, SpinnerVariant } from './spinnerFrames'
import { SpinnerStatus, SpinnerState } from './useSpinner'

type SpinnerKey = string

interface SpinnerEntry extends SpinnerState {
  intervalRef: ReturnType<typeof setInterval> | null
  frameIdx: number
  frames: readonly string[]
}

type SpinnersMap = Record<SpinnerKey, SpinnerEntry>

interface StartOpts {
  text?: string
  color?: SpinnerColor
  variant?: SpinnerVariant
  interval?: number
}

export function useSpinners(keys: SpinnerKey[]) {
  const initEntry = (key: SpinnerKey): SpinnerEntry => ({
    frame: SPINNER_FRAMES.dots[0],
    text: key,
    status: 'idle',
    color: resolveColor('green'),
    intervalRef: null,
    frameIdx: 0,
    frames: SPINNER_FRAMES.dots,
  })

  const [states, setStates] = useState<Record<SpinnerKey, SpinnerState>>(() =>
    Object.fromEntries(keys.map(k => [k, {
      frame: SPINNER_FRAMES.dots[0],
      text: k,
      status: 'idle' as SpinnerStatus,
      color: resolveColor('green'),
    }]))
  )

  const entries = useRef<SpinnersMap>(
    Object.fromEntries(keys.map(k => [k, initEntry(k)]))
  )

  const clearSpin = useCallback((key: SpinnerKey) => {
    const entry = entries.current[key]
    if (!entry) return
    if (entry.intervalRef) clearInterval(entry.intervalRef)
    entry.intervalRef = null
  }, [])

  const syncState = useCallback((key: SpinnerKey) => {
    const e = entries.current[key]
    if (!e) return
    setStates(s => ({
      ...s,
      [key]: { frame: e.frame, text: e.text, status: e.status, color: e.color }
    }))
  }, [])

  const start = useCallback((key: SpinnerKey, opts?: StartOpts) => {
    clearSpin(key)
    const frames = SPINNER_FRAMES[opts?.variant ?? 'dots']
    const e = entries.current[key]
    if (!e) return
    e.frames = frames
    e.frameIdx = 0
    e.frame = frames[0]
    e.status = 'spinning'
    if (opts?.text) e.text = opts.text
    if (opts?.color) e.color = resolveColor(opts.color)
    syncState(key)
    e.intervalRef = setInterval(() => {
      e.frameIdx = (e.frameIdx + 1) % e.frames.length
      e.frame = e.frames[e.frameIdx]
      syncState(key)
    }, opts?.interval ?? 80)
  }, [clearSpin, syncState])

  const resolve = useCallback((
    key: SpinnerKey,
    status: SpinnerStatus,
    char: string,
    text?: string
  ) => {
    clearSpin(key)
    const e = entries.current[key]
    if (!e) return
    e.status = status
    e.frame = char
    if (text) e.text = text
    syncState(key)
  }, [clearSpin, syncState])

  useEffect(() => {
    return () => keys.forEach(k => clearSpin(k))
  }, [])

  const controls = {
    start,
    succeed: (k: SpinnerKey, t?: string) => resolve(k, 'succeed', '✔', t),
    fail: (k: SpinnerKey, t?: string) => resolve(k, 'fail', '✖', t),
    warn: (k: SpinnerKey, t?: string) => resolve(k, 'warn', '⚠', t),
    info: (k: SpinnerKey, t?: string) => resolve(k, 'info', 'ℹ', t),
    stop: (k: SpinnerKey) => resolve(k, 'idle', SPINNER_FRAMES.dots[0]),
    setText: (k: SpinnerKey, t: string) => {
      const e = entries.current[k]
      if (e) { e.text = t; syncState(k) }
    },
  }

  return [states, controls] as const
}