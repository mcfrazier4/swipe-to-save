import { motion, useReducedMotion } from 'framer-motion';

/**
 * Save-chain step bar following the reactbits.dev Stepper grammar:
 * inactive = numbered ring, active = filled pulse, complete = check
 * drawn with a pathLength animation; connectors fill with a spring.
 */
export function Stepper({
  total,
  completed,
  ghost = false,
}: {
  total: number;
  completed: number;
  /** faded preview shown before a goal exists */
  ghost?: boolean;
}) {
  const reduce = useReducedMotion();
  const activeStep = ghost ? 0 : completed + 1;

  return (
    <div
      className={`stepper${ghost ? ' stepper--ghost' : ''}`}
      role="img"
      aria-label={
        ghost
          ? `A save chain has ${total} swipes`
          : `Save chain: ${completed} of ${total} swipes complete`
      }
    >
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const done = !ghost && step <= completed;
        const active = step === activeStep;
        return (
          <span className="stepper__cell" key={step}>
            {step > 1 && (
              <span className="stepper__line">
                <motion.span
                  className="stepper__line-fill"
                  initial={false}
                  animate={{ width: !ghost && step <= completed + (active ? 1 : 0) ? '100%' : '0%' }}
                  transition={
                    reduce ? { duration: 0 } : { type: 'spring', stiffness: 210, damping: 28 }
                  }
                />
              </span>
            )}
            <motion.span
              className={`stepper__dot${done ? ' is-done' : active ? ' is-active' : ''}`}
              initial={false}
              animate={reduce ? undefined : { scale: active ? [1, 1.18, 1] : 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              {done ? (
                <svg viewBox="0 0 16 16" width="17" height="17" fill="none" aria-hidden>
                  <motion.path
                    d="M3.2 8.6 6.4 11.8 12.8 4.6"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                  />
                </svg>
              ) : active ? (
                <span className="stepper__pulse" aria-hidden />
              ) : (
                step
              )}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}
