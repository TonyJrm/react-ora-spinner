# react-ora-spinner

A React spinner component inspired by [ora](https://github.com/sindresorhus/ora), with TypeScript support, custom colors, frame variants, and multi-spinner management.

[![npm version](https://img.shields.io/npm/v/react-ora-spinner)](https://www.npmjs.com/package/react-ora-spinner)
[![license](https://img.shields.io/npm/l/react-ora-spinner)](./LICENSE)

```tsx
const [state, spinner] = useSpinner({ text: 'Loading…', color: 'purple', variant: 'arc' })

spinner.start()
await fetchData()
spinner.succeed('Done!')

return <Spinner {...state} />
```

## Installation

```bash
npm install react-ora-spinner
```

React 17 or later is required as a peer dependency.

## Usage

### Basic

```tsx
import { useSpinner, Spinner } from 'react-ora-spinner'

function App() {
  const [state, spinner] = useSpinner({ text: 'Loading…' })

  async function handleFetch() {
    spinner.start()
    try {
      await fetchData()
      spinner.succeed('Data loaded!')
    } catch {
      spinner.fail('Something went wrong.')
    }
  }

  return (
    <>
      <Spinner {...state} />
      <button onClick={handleFetch}>Fetch</button>
    </>
  )
}
```

### With a custom color

```tsx
// Predefined color name
const [state, spinner] = useSpinner({ text: 'Uploading…', color: 'purple' })

// Any hex value
const [state, spinner] = useSpinner({ color: '#FF6B6B' })
```

### With a frame variant

```tsx
const [state, spinner] = useSpinner({ variant: 'arc' })
const [state, spinner] = useSpinner({ variant: 'pulse', interval: 200 })
```

### With a custom interval

```tsx
// Slow, dramatic effect
const [state, spinner] = useSpinner({ variant: 'pulse', interval: 300 })

// Fast
const [state, spinner] = useSpinner({ variant: 'arc', interval: 50 })

// Override interval at start time
spinner.start({ text: 'Retrying…', interval: 150 })
```

### Changing color or text at runtime

```tsx
spinner.start({ text: 'Retrying…', color: 'yellow' })
spinner.setColor('#00BFFF')
spinner.setText('Almost there…')
```

### Wrapping a promise

```tsx
spinner.start('Uploading…')
await uploadFile()
  .then(() => spinner.succeed('Uploaded!'))
  .catch(() => spinner.fail('Upload failed.'))
```

### Multiple simultaneous spinners

```tsx
import { useSpinners, Spinner } from 'react-ora-spinner'

function App() {
  const [spinners, controls] = useSpinners(['download', 'upload', 'parse'])

  async function handleAll() {
    controls.start('download', { text: 'Downloading…', color: 'blue' })
    controls.start('upload',   { text: 'Uploading…',   color: 'purple' })
    controls.start('parse',    { text: 'Parsing…',     color: 'cyan', variant: 'arc' })

    await Promise.all([
      download().then(() => controls.succeed('download', 'Downloaded!')),
      upload().then(()   => controls.succeed('upload',   'Uploaded!')),
      parse().then(()    => controls.succeed('parse',    'Parsed!')),
    ])
  }

  return (
    <div>
      {Object.entries(spinners).map(([key, state]) => (
        <Spinner key={key} {...state} />
      ))}
      <button onClick={handleAll}>Run all</button>
    </div>
  )
}
```

## API

### `useSpinner(options?)`

```ts
const [state, controls] = useSpinner({
  text?:     string
  color?:    SpinnerColor
  variant?:  SpinnerVariant
  interval?: number
})
```

Returns a tuple of `[SpinnerState, SpinnerControls]`.

#### `SpinnerControls`

| Method | Description |
|---|---|
| `start(opts?)` | Start spinning. Accepts `{ text?, color?, variant?, interval? }`. |
| `succeed(text?)` | Stop with a ✔ success indicator. |
| `fail(text?)` | Stop with a ✖ error indicator. |
| `warn(text?)` | Stop with a ⚠ warning indicator. |
| `info(text?)` | Stop with a ℹ info indicator. |
| `stop()` | Stop without a status indicator. |
| `setText(text)` | Update the label while spinning. |
| `setColor(color)` | Update the spinner color while spinning. |

#### `SpinnerState`

| Field | Type | Description |
|---|---|---|
| `frame` | `string` | Current spinner character or status icon. |
| `text` | `string` | Current label. |
| `status` | `SpinnerStatus` | `'spinning'` \| `'succeed'` \| `'fail'` \| `'warn'` \| `'info'` \| `'idle'` |
| `color` | `string` | Resolved hex color for the spinner frame. |

---

### `useSpinners(keys)`

```ts
const [spinners, controls] = useSpinners(['download', 'upload', 'parse'])
```

Manages a collection of independent spinners by key. Returns a tuple of `[Record<key, SpinnerState>, SpinnersControls]`.

#### `SpinnersControls`

| Method | Description |
|---|---|
| `start(key, opts?)` | Start the spinner for the given key. |
| `succeed(key, text?)` | Stop with a ✔ success indicator. |
| `fail(key, text?)` | Stop with a ✖ error indicator. |
| `warn(key, text?)` | Stop with a ⚠ warning indicator. |
| `info(key, text?)` | Stop with a ℹ info indicator. |
| `stop(key)` | Stop without a status indicator. |
| `setText(key, text)` | Update the label while spinning. |

---

### `<Spinner />`

A stateless presentational component. Pass the `SpinnerState` object directly via spread:

```tsx
<Spinner {...state} />
```

---

### `SpinnerColor`

Accepts either a predefined color name or any valid hex string:

```ts
type SpinnerColor = SpinnerColorName | `#${string}`
```

#### Predefined colors

| Name | Hex |
|---|---|
| `green` | `#1D9E75` |
| `blue` | `#378ADD` |
| `purple` | `#7F77DD` |
| `cyan` | `#5DCAA5` |
| `yellow` | `#EF9F27` |
| `red` | `#E24B4A` |
| `white` | `#FFFFFF` |

---

### `SpinnerVariant`

```ts
type SpinnerVariant = 'dots' | 'line' | 'arc' | 'circle' | 'bounce' | 'pulse' | 'arrows'
```

| Variant | Frames |
|---|---|
| `dots` | ⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏ |
| `line` | - \ \| / |
| `arc` | ◜ ◠ ◝ ◞ ◡ ◟ |
| `circle` | ◐ ◓ ◑ ◒ |
| `bounce` | ⠁ ⠂ ⠄ ⠂ |
| `pulse` | █ ▓ ▒ ░ |
| `arrows` | ← ↖ ↑ ↗ → ↘ ↓ ↙ |

## License

MIT