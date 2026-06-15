// src/spinnerFrames.ts

export const SPINNER_FRAMES = {
  dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  line: ['-', '\\', '|', '/'],
  arc: ['◜', '◠', '◝', '◞', '◡', '◟'],
  circle: ['◐', '◓', '◑', '◒'],
  bounce: ['⠁', '⠂', '⠄', '⠂'],
  pulse: ['█', '▓', '▒', '░'],
  arrows: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
} as const

export type SpinnerVariant = keyof typeof SPINNER_FRAMES