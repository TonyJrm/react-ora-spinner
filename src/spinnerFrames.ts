export const SPINNER_FRAMES = {
  dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  dots2: ['⠿', '⠟', '⠛', '⠋', '⠉', '⠁', '⠉', '⠋', '⠛', '⠟'],
  dots3: ['⠿', '⠾', '⠶', '⠴', '⠤', '⠠', '⠤', '⠴', '⠶', '⠾'],
  line: ['-', '\\', '|', '/'],
  arc: ['◜', '◠', '◝', '◞', '◡', '◟'],
  circle: ['◐', '◓', '◑', '◒'],
  bounce: ['⠁', '⠂', '⠄', '⠂'],
  pulse: ['█', '▓', '▒', '░'],
  arrows: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
} as const

export type SpinnerVariant = keyof typeof SPINNER_FRAMES