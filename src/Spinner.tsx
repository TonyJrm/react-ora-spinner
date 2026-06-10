import { FC } from 'react'
import { SpinnerState } from './useSpinner'

export const Spinner: FC<SpinnerState> = ({ frame, text, status, color }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: '8px',
    fontFamily: 'monospace', fontSize: '14px'
  }}>
    <span
      aria-hidden
      style={{
        width: '1ch',
        // The color is only applied when spinning, otherwise it inherits the text color (e.g. red for errors)
        color: status === 'spinning' ? color : 'inherit',
      }}
    >
      {frame}
    </span>
    <span role="status" aria-live="polite">{text}</span>
  </div>
)

// Usage :
// const [state, spinner] = useSpinner({ text: 'Upload…', color: 'purple' })
// const [state, spinner] = useSpinner({ color: '#FF6B6B' })
// spinner.start({ text: 'Retry…', color: '#00BFFF' })