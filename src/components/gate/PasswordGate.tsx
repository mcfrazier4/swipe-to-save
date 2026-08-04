import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRightIcon, LockIcon } from '../icons';
import '../../styles/gate.css';

const PASSWORD = 'jupiter';
const SESSION_KEY = 'sundollar.gate.unlocked';

/**
 * Full-black entry screen shown before any app content. Client-side
 * only — a soft demo gate, not real access control.
 */
export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  if (unlocked) return <>{children}</>;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setUnlocked(true);
      return;
    }
    setError(true);
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className="gate">
      <motion.form
        className="gate__panel"
        onSubmit={submit}
        animate={error && !reduce ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : undefined}
        transition={{ duration: 0.45 }}
        onAnimationComplete={() => setError(false)}
      >
        <span className="gate__icon" aria-hidden>
          <LockIcon width={22} height={22} />
        </span>
        <h1 className="gate__title">sundollar</h1>
        <p className="gate__copy">This demo is password-protected.</p>

        <div className={`gate__field${error ? ' is-error' : ''}`}>
          <input
            ref={inputRef}
            type="password"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder="Enter password"
            aria-label="Password"
            aria-invalid={error}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            autoFocus
          />
          <button type="submit" aria-label="Unlock" disabled={value.length === 0}>
            <ArrowRightIcon width={18} height={18} />
          </button>
        </div>

        <p className={`gate__error${error ? ' is-visible' : ''}`} role="alert">
          {error ? 'Wrong password. Try again.' : ' '}
        </p>
      </motion.form>
    </div>
  );
}
