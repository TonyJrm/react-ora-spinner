# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-07-03
### Added
- `dots2` and `dots3` spinner frame variants (additional braille-based animations)

## [1.1.0] - 2026-06-15
### Added
- `variant` option in `useSpinner` to choose frame animation style (`dots`, `line`, `arc`, `circle`, `bounce`, `pulse`, `arrows`)
- `interval` option in `useSpinner` and `start()` to control animation speed in milliseconds
- `useSpinners` hook for managing multiple simultaneous spinners by key
- Exported `SPINNER_FRAMES` and `SpinnerVariant` types

## [1.0.1] - 2026-06-10
### Fixed
- Added missing LICENSE file

## [1.0.0] - 2026-06-05
### Added
- `useSpinner` hook with `start`, `succeed`, `fail`, `warn`, `info`, `stop`, `setText`, `setColor` controls
- `<Spinner />` presentational component
- Predefined color names (`green`, `blue`, `purple`, `cyan`, `yellow`, `red`, `white`)
- Hex color support via `#${string}` type
- Full TypeScript support with exported types