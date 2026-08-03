import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Authored Sundollar piggy: side view, facing right.
 *
 * The coin genuinely enters the slot: it is drawn in front of the
 * body but clipped just below the slot line, and the slot mouth is
 * painted on top — so the coin sinks in instead of falling behind.
 *
 * `stacks` surrounds the piggy with coin stacks of varied heights
 * plus one face-up ¢ coin leaning against it. `explode` splits the
 * piggy open after a shake and lets the finale's coin fountain out.
 */

function PiggyArt({ withSlot }: { withSlot: boolean }) {
  return (
    <>
      {/* tail */}
      <path
        d="M31 84c-7-1-10 6-5 9s11-1 8-6"
        stroke="var(--guava)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* body */}
      <ellipse cx="94" cy="92" rx="62" ry="47" fill="var(--guava)" />
      <ellipse cx="76" cy="66" rx="34" ry="16" fill="#fff" opacity="0.26" />

      {withSlot && <rect x="76" y="48" width="30" height="6" rx="3" fill="#3d0f22" opacity="0.6" />}

      {/* ear */}
      <path d="M118 50c8-9 20-9 24-6-2 8-8 15-15 17" fill="var(--guava)" />
      <path d="M121 53c5-6 13-7 16-5-1 5-5 9-10 11" fill="#fff" opacity="0.25" />

      {/* snout */}
      <rect x="146" y="78" width="22" height="27" rx="10" fill="var(--tang)" />
      <circle cx="153.5" cy="88" r="2.6" fill="#3d0f22" opacity="0.75" />
      <circle cx="161" cy="88" r="2.6" fill="#3d0f22" opacity="0.75" />

      {/* eye + cheek */}
      <circle cx="130" cy="74" r="4" fill="#2a0a18" />
      <circle cx="134" cy="92" r="7" fill="var(--tang)" opacity="0.55" />

      {/* legs */}
      <rect x="62" y="128" width="15" height="16" rx="7" fill="var(--guava)" />
      <rect x="108" y="128" width="15" height="16" rx="7" fill="var(--guava)" />
      <rect x="62" y="136" width="15" height="8" rx="4" fill="#3d0f22" opacity="0.35" />
      <rect x="108" y="136" width="15" height="8" rx="4" fill="#3d0f22" opacity="0.35" />
    </>
  );
}

function StackCoin({ cx, cy, rx }: { cx: number; cy: number; rx: number }) {
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={3.6} fill="var(--sun)" stroke="var(--tang)" strokeWidth="1.6" />
  );
}

function CoinStacks() {
  return (
    <>
      {/* left tall stack */}
      {[143, 138.2, 133.4, 128.6].map((cy) => (
        <StackCoin key={`a${cy}`} cx={18} cy={cy} rx={10} />
      ))}
      <ellipse cx="18" cy="127.4" rx="6" ry="1.8" fill="#fff" opacity="0.35" />

      {/* left short stack */}
      {[143, 138.2].map((cy) => (
        <StackCoin key={`b${cy}`} cx={41} cy={cy} rx={9} />
      ))}
      <ellipse cx="41" cy="137" rx="5.4" ry="1.6" fill="#fff" opacity="0.35" />

      {/* right medium stack */}
      {[143, 138.2, 133.4].map((cy) => (
        <StackCoin key={`c${cy}`} cx={169} cy={cy} rx={9} />
      ))}
      <ellipse cx="169" cy="132.2" rx="5.4" ry="1.6" fill="#fff" opacity="0.35" />

      {/* face-up cent coin leaning against the piggy, footed on the ground line */}
      <g transform="translate(144 132.5) rotate(-16)">
        <circle r="12.5" fill="var(--sun)" stroke="var(--tang)" strokeWidth="2.4" />
        <circle r="8.6" fill="none" stroke="var(--tang)" strokeWidth="1.2" opacity="0.4" />
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="13"
          fontWeight="700"
          fontFamily="'Rubik Variable', sans-serif"
          fill="var(--tang)"
        >
          ¢
        </text>
      </g>
    </>
  );
}

export function PiggyBank({
  size = 150,
  coinLoop = false,
  pop = false,
  explode = false,
  stacks = false,
}: {
  size?: number;
  /** replay the coin drop forever (intro card) */
  coinLoop?: boolean;
  /** one triumphant pop-in (finale) */
  pop?: boolean;
  /** after popping in: shake, split open, and vanish (finale) */
  explode?: boolean;
  /** coin stacks + leaning ¢ coin around the piggy */
  stacks?: boolean;
}) {
  const reduce = useReducedMotion();
  const uid = useId();
  const slotClip = `${uid}-slot`;
  const topClip = `${uid}-top`;
  const bottomClip = `${uid}-bottom`;
  const animateCoin = coinLoop && !reduce;
  const exploding = explode && !reduce;

  return (
    <motion.svg
      viewBox="0 0 180 150"
      width={size}
      height={(size * 150) / 180}
      fill="none"
      aria-hidden
      style={{ overflow: 'visible' }}
      initial={pop && !reduce ? { scale: 0, rotate: -8 } : false}
      animate={pop && !reduce ? { scale: [0, 1.18, 0.96, 1], rotate: [-8, 3, -1, 0] } : undefined}
      transition={pop ? { duration: 0.7, times: [0, 0.55, 0.8, 1], ease: 'easeOut' } : undefined}
    >
      <defs>
        {/* the coin only exists above the slot line — sinking past it reads as insertion */}
        <clipPath id={slotClip}>
          <rect x="64" y="-60" width="52" height="112" />
        </clipPath>
        {exploding && (
          <>
            <clipPath id={topClip}>
              <rect x="-8" y="-60" width="200" height="148" />
            </clipPath>
            <clipPath id={bottomClip}>
              <rect x="-8" y="88" width="200" height="72" />
            </clipPath>
          </>
        )}
      </defs>

      {exploding ? (
        <>
          {/* pre-burst shake, then the halves fly apart */}
          <motion.g
            animate={{ rotate: [0, -2.5, 2.5, -2.5, 2.5, 0] }}
            transition={{ delay: 1.05, duration: 0.42 }}
            style={{ originX: '90px', originY: '92px' }}
          >
            <g clipPath={`url(#${topClip})`}>
              <motion.g
                animate={{ y: [0, 0, -76], x: [0, 0, -9], rotate: [0, 0, -18], opacity: [1, 1, 0] }}
                transition={{ delay: 1.5, duration: 1.0, times: [0, 0.08, 1], ease: 'easeOut' }}
                style={{ originX: '90px', originY: '58px' }}
              >
                <PiggyArt withSlot />
              </motion.g>
            </g>
            <g clipPath={`url(#${bottomClip})`}>
              <motion.g
                animate={{ y: [0, 0, 30], rotate: [0, 0, 6], opacity: [1, 1, 0] }}
                transition={{ delay: 1.5, duration: 1.0, times: [0, 0.08, 1], ease: 'easeOut' }}
                style={{ originX: '90px', originY: '120px' }}
              >
                <PiggyArt withSlot />
              </motion.g>
            </g>
          </motion.g>

          {/* burst flash ring */}
          <motion.circle
            cx="90"
            cy="86"
            r="44"
            fill="none"
            stroke="var(--sun)"
            strokeWidth="10"
            initial={{ scale: 0.25, opacity: 0 }}
            animate={{ scale: [0.25, 1.7], opacity: [0, 0.9, 0] }}
            transition={{ delay: 1.48, duration: 0.55, times: [0, 0.2, 1], ease: 'easeOut' }}
            style={{ originX: '90px', originY: '86px' }}
          />
        </>
      ) : (
        <PiggyArt withSlot={false} />
      )}

      {stacks && !exploding && <CoinStacks />}

      {/* the falling coin — in front of the body, clipped at the slot line */}
      <g clipPath={`url(#${slotClip})`}>
        <motion.g
          initial={false}
          animate={
            animateCoin
              ? // fade in from behind the copy above, rest, then sink into the slot
                { y: [-34, 0, 0, 56], opacity: [0, 1, 1, 1] }
              : pop && !reduce
                ? { y: [-34, 0, 56], opacity: [0, 1, 1] }
                : undefined
          }
          transition={
            animateCoin
              ? {
                  duration: 3.2,
                  times: [0, 0.32, 0.55, 0.95],
                  ease: ['easeOut', 'linear', 'easeIn'],
                  repeat: Infinity,
                }
              : pop
                ? { duration: 1.0, delay: 0.35, times: [0, 0.45, 1], ease: ['easeOut', 'easeIn'] }
                : undefined
          }
        >
          <circle cx="90" cy="16" r="14" fill="var(--sun)" stroke="var(--tang)" strokeWidth="2.5" />
          <path
            d="M90 9.5v13M93.4 11.7c-.7-1-1.9-1.6-3.4-1.6-1.9 0-3.4 1.1-3.4 2.6 0 3.4 6.8 1.7 6.8 5 0 1.5-1.5 2.6-3.4 2.6-1.5 0-2.7-.6-3.4-1.6"
            stroke="var(--tang)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </motion.g>
      </g>

      {/* slot mouth painted over the coin so it swallows it */}
      {!exploding && <rect x="76" y="48" width="30" height="6" rx="3" fill="#3d0f22" opacity="0.6" />}
    </motion.svg>
  );
}
