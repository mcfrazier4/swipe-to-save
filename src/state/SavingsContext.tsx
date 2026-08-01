import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_GOAL_NAME, DEFAULT_GOAL_TARGET } from '../data/mockSavings';

const STORAGE_KEY = 'swipe2save.state.v1';

interface StoredState {
  goalName: string;
  goalTarget: number;
  totalSaved: number;
}

interface SavingsContextValue extends StoredState {
  setGoal: (goalName: string, goalTarget: number) => void;
  addSaving: (amount: number) => void;
}

function loadStoredState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch {
    // ignore malformed storage, fall back to defaults
  }
  return { goalName: DEFAULT_GOAL_NAME, goalTarget: DEFAULT_GOAL_TARGET, totalSaved: 0 };
}

const SavingsContext = createContext<SavingsContextValue | undefined>(undefined);

export function SavingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>(loadStoredState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<SavingsContextValue>(
    () => ({
      ...state,
      setGoal: (goalName, goalTarget) => setState((prev) => ({ ...prev, goalName, goalTarget })),
      addSaving: (amount) => setState((prev) => ({ ...prev, totalSaved: prev.totalSaved + amount })),
    }),
    [state],
  );

  return <SavingsContext.Provider value={value}>{children}</SavingsContext.Provider>;
}

export function useSavings() {
  const ctx = useContext(SavingsContext);
  if (!ctx) throw new Error('useSavings must be used within a SavingsProvider');
  return ctx;
}
