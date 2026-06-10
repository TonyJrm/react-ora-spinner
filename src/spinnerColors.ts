export const SPINNER_COLORS = {
  green: '#1D9E75',
  red: '#E24B4A',
  yellow: '#EF9F27',
  blue: '#378ADD',
  purple: '#7F77DD',
  cyan: '#5DCAA5',
  white: '#FFFFFF',
} as const

export type SpinnerColorName = keyof typeof SPINNER_COLORS

// Accept either a predefined color name or a custom hex color string
export type SpinnerColor = SpinnerColorName | `#${string}`

export function resolveColor(color: SpinnerColor): string {
  if (color in SPINNER_COLORS) {
    return SPINNER_COLORS[color as SpinnerColorName]
  }
  // Validate the hex format before using it
  if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) {
    return color
  }
  // Fallback if the value is neither a name nor a valid hex
  console.warn(`[Spinner] invalid color: "${color}". Use a predefined name or a #hex code.`)
  return SPINNER_COLORS.green
}