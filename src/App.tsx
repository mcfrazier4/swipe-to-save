import { useEffect, useState } from 'react';
import { SavingsProvider, useSavings } from './state/SavingsContext';
import { PhoneFrame } from './components/phone/PhoneFrame';
import { AppHome } from './components/app/AppHome';
import { SunIcon, MoonIcon, ResetIcon } from './components/icons';
import './styles/app.css';

type ThemeMode = 'light' | 'dark';

const THEME_KEY = 'sundollar.theme';

function loadTheme(): ThemeMode {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'dark' ? 'dark' : 'light';
}

function DemoControls({
  theme,
  onThemeChange,
}: {
  theme: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}) {
  const { resetDemo } = useSavings();
  return (
    <div className="controls">
      <div className="controls__group" role="group" aria-label="Color mode">
        <button
          type="button"
          className="controls__mode"
          aria-pressed={theme === 'light'}
          aria-label="Light mode"
          onClick={() => onThemeChange('light')}
        >
          <SunIcon width={20} height={20} />
        </button>
        <button
          type="button"
          className="controls__mode"
          aria-pressed={theme === 'dark'}
          aria-label="Dark mode"
          onClick={() => onThemeChange('dark')}
        >
          <MoonIcon width={20} height={20} />
        </button>
      </div>
      <button type="button" className="controls__reset" onClick={resetDemo}>
        <ResetIcon width={17} height={17} />
        Reset demo
      </button>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<ThemeMode>(loadTheme);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <SavingsProvider>
      <main className="stage">
        <PhoneFrame theme={theme}>
          <AppHome />
        </PhoneFrame>
        <DemoControls theme={theme} onThemeChange={setTheme} />
      </main>
    </SavingsProvider>
  );
}

export default App;
