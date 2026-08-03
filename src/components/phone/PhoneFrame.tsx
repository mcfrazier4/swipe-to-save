import type { ReactNode } from 'react';
import { SignalGlyph, WifiGlyph, BatteryGlyph } from '../icons';

function StatusBar() {
  return (
    <div className="statusbar" aria-hidden>
      <span>9:41</span>
      <span className="statusbar__icons">
        <SignalGlyph width={18} height={12} />
        <WifiGlyph width={16} height={12} />
        <BatteryGlyph width={25} height={12} />
      </span>
    </div>
  );
}

export function PhoneFrame({
  theme,
  children,
}: {
  theme: 'light' | 'dark';
  children: ReactNode;
}) {
  return (
    <div className="phone">
      <div className="phone__screen" data-theme={theme}>
        <StatusBar />
        {children}
      </div>
      <div className="phone__island" aria-hidden />
    </div>
  );
}
