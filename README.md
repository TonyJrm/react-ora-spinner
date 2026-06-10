# react-ora-spinner

A React spinner component inspired by [ora](https://github.com/sindresorhus/ora), with TypeScript support and custom colors.

[![npm version](https://img.shields.io/npm/v/react-ora-spinner)](https://www.npmjs.com/package/react-ora-spinner)
[![license](https://img.shields.io/npm/l/react-ora-spinner)](./LICENSE)

```tsx
const [state, spinner] = useSpinner({ text: 'Loading…', color: 'purple' })

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

## API

### `useSpinner(options?)`

```ts
const [state, controls] = useSpinner({ text?: string, color?: SpinnerColor })
```

Returns a tuple of `[SpinnerState, SpinnerControls]`.

#### `SpinnerControls`

| Method | Description |
|---|---|
| `start(opts?)` | Start spinning. Accepts `{ text?, color? }`. |
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

### `<Spinner />`

A stateless presentational component. Pass the `SpinnerState` object directly via spread:

```tsx
<Spinner {...state} />
```

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

## License

MIT