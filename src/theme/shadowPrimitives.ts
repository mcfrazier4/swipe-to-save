function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace('#', '')
  const full = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized
  const num = parseInt(full, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function rgba(rgb: [number, number, number], alpha: number) {
  const [r, g, b] = rgb
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha)).toFixed(2)})`
}

// MXUI defines exact, hand-tuned shadows only at these semantic elevation
// levels — not a formula, and always rgba(0,0,0,…) regardless of the
// theme's configurable shadow color. Every other index still falls back to
// the generated scale below.
//
// Copied from the Design System repo (src/theme/shadowPrimitives.ts) so this
// app's theme is built the same way as the Default profile it pulls from.
const MXUI_FIXED_SHADOWS: Record<number, string> = {
  1: '0px 2px 8px 0px rgba(0, 0, 0, 0.12)',
  8: '0px 6px 12px 0px rgba(0, 0, 0, 0.16), 0px 3px 8px 0px rgba(0, 0, 0, 0.06)',
  16: '0px 12px 20px 0px rgba(0, 0, 0, 0.22)',
}

/**
 * Generates a 25-entry MUI-shaped elevation scale (index 0 = 'none', 1–24 are
 * three-layer box-shadows) from a single base color + intensity, mirroring
 * the "single base → derived scale" approach used for color primitives.
 * Levels 1, 8, and 16 are overridden with MXUI's exact documented values.
 */
export function createShadowScale(color: string, opacity: number): string[] {
  const rgb = hexToRgb(color)
  const shadows: string[] = ['none']

  for (let level = 1; level <= 24; level++) {
    if (MXUI_FIXED_SHADOWS[level]) {
      shadows.push(MXUI_FIXED_SHADOWS[level])
      continue
    }

    const umbraY = Math.round(level * 0.6)
    const umbraBlur = Math.round(level * 1 + 1)
    const penumbraY = Math.round(level)
    const penumbraBlur = Math.round(level * 1.6 + 1)
    const ambientY = Math.round(level * 1.8)
    const ambientBlur = Math.round(level * 2.4 + 1)

    shadows.push(
      [
        `0px ${umbraY}px ${umbraBlur}px 0px ${rgba(rgb, opacity)}`,
        `0px ${penumbraY}px ${penumbraBlur}px 0px ${rgba(rgb, opacity * 0.7)}`,
        `0px ${ambientY}px ${ambientBlur}px 0px ${rgba(rgb, opacity * 0.6)}`,
      ].join(', '),
    )
  }

  return shadows
}
