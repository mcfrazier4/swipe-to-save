import { darken, lighten, rgbToHex } from '@mui/material/styles'

export interface ColorScale {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

function toHex(color: string) {
  return rgbToHex(color).toUpperCase()
}

/**
 * Reproduces the Figma "Lighten / Darken / Main" primitive scale: every step
 * is the 500 base blended toward white (50–400) or black (600–900) at fixed
 * coefficients, matching the design's white/black overlay percentages.
 *
 * Copied from the Design System repo (src/theme/colorPrimitives.ts) so this
 * app's theme is built the same way as the Default profile it pulls from.
 */
export function createColorScale(base: string): ColorScale {
  return {
    50: toHex(lighten(base, 0.95)),
    100: toHex(lighten(base, 0.85)),
    200: toHex(lighten(base, 0.7)),
    300: toHex(lighten(base, 0.55)),
    400: toHex(lighten(base, 0.3)),
    500: base.toUpperCase(),
    600: toHex(darken(base, 0.3)),
    700: toHex(darken(base, 0.5)),
    800: toHex(darken(base, 0.65)),
    900: toHex(darken(base, 0.75)),
  }
}

export const colorPrimitiveKeys = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'grey',
] as const

export type ColorPrimitiveKey = (typeof colorPrimitiveKeys)[number]

export const defaultPrimitiveBaseColors: Record<ColorPrimitiveKey, string> = {
  primary: '#2C64EF',
  secondary: '#808080',
  success: '#12875E',
  warning: '#FF7B00',
  error: '#E32727',
  info: '#2C64EF',
  grey: '#808080',
}
