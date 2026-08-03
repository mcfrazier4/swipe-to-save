import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export const TOTAL_STEPS = 5;

export interface Goal {
  name: string;
  emoji: string;
  target: number;
  /** ISO date string, or null when the goal is open-ended */
  deadline: string | null;
}

interface StoredState {
  goal: Goal | null;
  perSwipe: number;
  saved: number;
  /** completed swipes in the current chain, 0..TOTAL_STEPS */
  steps: number;
  chainDone: boolean;
}

interface SavingsContextValue extends StoredState {
  startGoal: (goal: Goal, perSwipe: number) => void;
  updateGoal: (goal: Goal, perSwipe: number) => void;
  recordSave: () => void;
  startNewChain: () => void;
  deleteGoal: () => void;
  resetDemo: () => void;
}

const STORAGE_KEY = 'sundollar.demo.v1';

const INITIAL: StoredState = {
  goal: null,
  perSwipe: 10,
  saved: 0,
  steps: 0,
  chainDone: false,
};

function loadStoredState(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...INITIAL, ...(JSON.parse(raw) as StoredState) };
  } catch {
    // malformed storage falls back to a fresh demo
  }
  return INITIAL;
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
      startGoal: (goal, perSwipe) =>
        setState({ goal, perSwipe, saved: 0, steps: 0, chainDone: false }),
      updateGoal: (goal, perSwipe) => setState((prev) => ({ ...prev, goal, perSwipe })),
      recordSave: () =>
        setState((prev) => {
          const steps = Math.min(prev.steps + 1, TOTAL_STEPS);
          return {
            ...prev,
            steps,
            saved: prev.saved + prev.perSwipe,
            chainDone: steps >= TOTAL_STEPS,
          };
        }),
      startNewChain: () => setState((prev) => ({ ...prev, steps: 0, chainDone: false })),
      deleteGoal: () => setState(INITIAL),
      resetDemo: () => setState(INITIAL),
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

export function formatMoney(amount: number): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  });
}

export function formatDeadline(deadline: string | null): string {
  if (!deadline) return 'Open-ended';
  const date = new Date(`${deadline}T00:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
