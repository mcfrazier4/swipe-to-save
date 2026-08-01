import { defaultPrimitiveBaseColors, type ColorPrimitiveKey } from './colorPrimitives'

export interface TypographyVariantTokens {
  fontSize: string
  fontWeight: number
  lineHeight: string
}

export interface TypographyTokens {
  fontFamily: string
  h1: TypographyVariantTokens
  h2: TypographyVariantTokens
  h3: TypographyVariantTokens
  subtitle1: TypographyVariantTokens
  subtitle2: TypographyVariantTokens
  body1: TypographyVariantTokens
  body2: TypographyVariantTokens
  caption: TypographyVariantTokens
  tiny: TypographyVariantTokens
}

export interface SpacingTokens {
  unit: number
}

export interface ShadowTokens {
  color: string
  opacity: number
}

export interface BackgroundTokens {
  body: string
}

export interface ThemeTokenSet {
  colors: Record<ColorPrimitiveKey, string>
  typography: TypographyTokens
  spacing: SpacingTokens
  shadows: ShadowTokens
  background: BackgroundTokens
}

export type ThemeMode = 'light' | 'dark'

// This is a frozen snapshot of the Design System repo's "Default" theme
// profile (src/theme/themeProfiles.ts, createDefaultTokenSet('light')) —
// pulled in by copy (per project decision) rather than a shared package,
// since the two apps are separate repos. Re-copy this if that profile
// changes and you want the update to show up here too.
export const defaultTokenSet: ThemeTokenSet = {
  colors: { ...defaultPrimitiveBaseColors },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '1.9375rem', fontWeight: 700, lineHeight: '40px' },
    h2: { fontSize: '1.4375rem', fontWeight: 700, lineHeight: '32px' },
    h3: { fontSize: '1.125rem', fontWeight: 700, lineHeight: '24px' },
    subtitle1: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: '24px' },
    subtitle2: { fontSize: '0.8125rem', fontWeight: 500, lineHeight: '20px' },
    body1: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: '20px' },
    body2: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: '16px' },
    caption: { fontSize: '0.6875rem', fontWeight: 400, lineHeight: '16px' },
    tiny: { fontSize: '0.5625rem', fontWeight: 400, lineHeight: '12px' },
  },
  spacing: { unit: 8 },
  shadows: { color: '#000000', opacity: 0.2 },
  background: { body: '#FFFFFF' },
}
