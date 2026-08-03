import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronRightIcon } from '../icons';

const THUMB = 52;
const PAD = 6;

/**
 * The sacred gesture: a pill track with a radial sun-disc thumb the
 * user drags left to right. Completing the drag fires onComplete once.
 * Also operable by keyboard (Enter / Space) and announced via slider
 * semantics.
 */
export function SwipePill({
  label,
  onComplete,
  disabled = false,
}: {
  label: string;
  onComplete: () => void;
  disabled?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(1);
  const [done, setDone] = useState(false);
  const [percent, setPercent] = useState(0);
  const x = useMotionValue(0);
  const fillWidth = useTransform(x, (v) => v + THUMB + PAD * 2);
  const labelOpacity = useTransform(x, [0, maxX * 0.55], [1, 0]);

  useEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (el) setMaxX(Math.max(el.offsetWidth - THUMB - PAD * 2, 1));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => x.on('change', (v) => setPercent(Math.round((v / maxX) * 100))), [x, maxX]);

  const complete = () => {
    if (done || disabled) return;
    setDone(true);
    animate(x, maxX, { type: 'spring', stiffness: 420, damping: 34 });
    onComplete();
  };

  const handleDragEnd = () => {
    if (x.get() >= maxX * 0.82) {
      complete();
    } else {
      animate(x, 0, { type: 'spring', stiffness: 260, damping: 26 });
    }
  };

  return (
    <div
      ref={trackRef}
      className={`pill${disabled ? ' is-disabled' : ''}`}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.min(Math.max(percent, 0), 100)}
      aria-valuetext={done ? 'Saved' : 'Swipe right or press Enter to save'}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          complete();
        } else if (e.key === 'ArrowRight' && !done && !disabled) {
          e.preventDefault();
          const next = Math.min(x.get() + maxX * 0.2, maxX);
          if (next >= maxX) complete();
          else animate(x, next, { type: 'spring', stiffness: 300, damping: 28 });
        } else if (e.key === 'ArrowLeft' && !done && !disabled) {
          e.preventDefault();
          animate(x, Math.max(x.get() - maxX * 0.2, 0), {
            type: 'spring',
            stiffness: 300,
            damping: 28,
          });
        }
      }}
    >
      <motion.span className="pill__fill" style={{ width: fillWidth }} aria-hidden />
      <motion.span className="pill__label" style={{ opacity: labelOpacity }} aria-hidden>
        {label}
        <span className="pill__arrows">
          <ChevronRightIcon width={14} height={14} />
          <ChevronRightIcon width={14} height={14} />
          <ChevronRightIcon width={14} height={14} />
        </span>
      </motion.span>
      <motion.button
        type="button"
        className="pill__thumb"
        aria-hidden
        tabIndex={-1}
        drag={disabled || done ? false : 'x'}
        dragConstraints={{ left: 0, right: maxX }}
        dragElastic={0.04}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        whileTap={{ scale: 1.06 }}
      >
        {done ? (
          <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden>
            <path
              d="M3.2 8.6 6.4 11.8 12.8 4.6"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <ChevronRightIcon width={20} height={20} />
        )}
      </motion.button>
    </div>
  );
}
