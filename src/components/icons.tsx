import type { SVGProps } from 'react';

/* One icon system: 24-unit grid, 1.8 stroke, round caps. */
function base(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...props,
  };
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3 19 19M19 5l-1.7 1.7M6.7 17.3 5 19" />
    </svg>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M20 13.6A8.1 8.1 0 0 1 10.4 4a8.1 8.1 0 1 0 9.6 9.6Z" />
    </svg>
  );
}

export function ResetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4.3 9.2a8 8 0 1 1-.8 5" />
      <path d="M4 4.5v4.9h4.9" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function SlidersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M4 7.5h7M15.5 7.5H20M4 16.5h3M11.5 16.5H20" />
      <circle cx="13" cy="7.5" r="2.2" />
      <circle cx="9" cy="16.5" r="2.2" />
    </svg>
  );
}

export function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="m9 5.5 6.5 6.5L9 18.5" />
    </svg>
  );
}

export function CoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.8v8.4M14.6 9.4c-.5-.9-1.5-1.4-2.6-1.4-1.5 0-2.7.9-2.7 2.1 0 2.9 5.4 1.3 5.4 4 0 1.2-1.2 2.1-2.7 2.1-1.1 0-2.1-.5-2.6-1.4" />
    </svg>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v3M15.5 3.5v3" />
    </svg>
  );
}

/* Status-bar glyphs are filled, matching iOS weight. */
export function SignalGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 12" fill="currentColor" aria-hidden {...props}>
      <rect x="0" y="7.5" width="3" height="4.5" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

export function WifiGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 12" fill="currentColor" aria-hidden {...props}>
      <path d="M8 10.8a1.5 1.5 0 1 0 0 .01ZM8 6.6c1.5 0 2.9.6 3.9 1.6l-1.3 1.3A3.7 3.7 0 0 0 8 8.4c-1 0-2 .4-2.6 1.1L4.1 8.2c1-1 2.4-1.6 3.9-1.6ZM8 2.4c2.7 0 5.1 1.1 6.9 2.8l-1.3 1.3A7.7 7.7 0 0 0 8 4.4c-2.1 0-4.1.9-5.6 2.1L1.1 5.2A9.7 9.7 0 0 1 8 2.4Z" />
    </svg>
  );
}

export function BatteryGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 25 12" fill="none" aria-hidden {...props}>
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="15" height="8" rx="2" fill="currentColor" />
      <path d="M23.5 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
