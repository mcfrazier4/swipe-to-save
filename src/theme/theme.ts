import { buildTheme } from './buildTheme'
import { defaultTokenSet } from './themeTokens'

// Pulls the Design System's "Default" theme profile (colors, typography,
// spacing, shadows, and the Card/Dialog radius convention) instead of this
// app's own bespoke palette — see themeTokens.ts for provenance.
export const theme = buildTheme(defaultTokenSet, 'light')
