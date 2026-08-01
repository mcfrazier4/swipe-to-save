import type { CSSProperties } from 'react'
import { createTheme, type Theme } from '@mui/material/styles'
import { colorPrimitiveKeys, createColorScale, type ColorPrimitiveKey, type ColorScale } from './colorPrimitives'
import { createShadowScale } from './shadowPrimitives'
import type { ThemeMode, ThemeTokenSet } from './themeTokens'

declare module '@mui/material/styles' {
  interface Theme {
    colorPrimitives: Record<ColorPrimitiveKey, ColorScale>
  }
  interface ThemeOptions {
    colorPrimitives?: Record<ColorPrimitiveKey, ColorScale>
  }
  interface TypographyVariants {
    tiny: CSSProperties
  }
  interface TypographyVariantsOptions {
    tiny?: CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tiny: true
    h4: false
    h5: false
    h6: false
  }
}

// Builds a full MUI theme from a token set — copied from the Design System
// repo (src/theme/buildTheme.ts) so this app's theme is constructed exactly
// the way the Default profile it pulls from is built there.
export function buildTheme(tokens: ThemeTokenSet, mode: ThemeMode = 'light'): Theme {
  const colorScales = Object.fromEntries(
    colorPrimitiveKeys.map((key) => [key, createColorScale(tokens.colors[key])]),
  ) as Record<ColorPrimitiveKey, ColorScale>

  const { typography, spacing, shadows } = tokens
  const { fontFamily } = typography

  // The page background and the card/paper surface must read in the right
  // relative order: the card should be the brighter, "raised" surface.
  // Light: page dips to the Grey primitive's 50 step, paper is pure white.
  const pageBackground = mode === 'light' ? colorScales.grey[50] : tokens.background.body
  const cardBackground = mode === 'light' ? tokens.background.body : colorScales.grey[900]

  return createTheme({
    palette: {
      mode,
      primary: { main: tokens.colors.primary },
      secondary: { main: tokens.colors.secondary },
      success: { main: tokens.colors.success },
      warning: { main: tokens.colors.warning },
      error: { main: tokens.colors.error },
      info: { main: tokens.colors.info },
      grey: colorScales.grey,
      background: { default: pageBackground, paper: cardBackground },
    },
    colorPrimitives: colorScales,
    spacing: spacing.unit,
    shadows: createShadowScale(shadows.color, shadows.opacity) as unknown as Theme['shadows'],
    typography: {
      fontFamily,
      h1: { ...typography.h1, letterSpacing: 0 },
      h2: { ...typography.h2, letterSpacing: 0 },
      h3: { ...typography.h3, letterSpacing: 0 },
      h4: undefined,
      h5: undefined,
      h6: undefined,
      subtitle1: { ...typography.subtitle1, letterSpacing: 0 },
      subtitle2: { ...typography.subtitle2, letterSpacing: 0 },
      body1: { ...typography.body1, letterSpacing: 0 },
      body2: { ...typography.body2, letterSpacing: 0 },
      caption: { ...typography.caption, letterSpacing: 0 },
      // MUI's default `button` variant carries its own uppercase transform,
      // separate from the MuiButton component override below — this covers
      // standalone `<Typography variant="button">` usage too.
      button: { fontWeight: 600, textTransform: 'none' },
      tiny: {
        fontFamily,
        ...typography.tiny,
        letterSpacing: 0,
      },
    },
    components: {
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            tiny: 'span',
          },
        },
      },
      // MXUI Button: font weight 600, no text-transform (both explicitly
      // documented — MUI's own defaults are 500/uppercase).
      MuiButton: {
        styleOverrides: {
          root: { fontWeight: 600, textTransform: 'none' },
        },
      },
      // MXUI uses the base 4px radius everywhere except large containers
      // (cards, modals), which step up to 8px.
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 8 },
        },
      },
    },
  })
}
