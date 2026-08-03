import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TOTAL_STEPS, formatDeadline, formatMoney, useSavings } from '../../state/SavingsContext';
import { PiggyBank } from './PiggyBank';
import { Stepper } from './Stepper';
import { SwipePill } from './SwipePill';
import { ConfettiBurst } from '../fx/ConfettiBurst';
import { Fireworks } from '../fx/Fireworks';
import { CoinExplosion } from '../fx/CoinExplosion';
import { BottomSheet } from '../sheets/BottomSheet';
import { GoalSheet } from '../sheets/GoalSheet';
import { CalendarIcon, ChevronRightIcon, SlidersIcon } from '../icons';
import '../../styles/widget.css';

type Celebration = { kind: 'save' | 'finale'; amount: number } | null;

/**
 * The Swipe to Save card. Every state renders through the same fixed
 * grid — header row, explainer row, hero, stepper slot, action slot —
 * so text, steppers, and the swipe pill never move between states.
 */
export function SaveWidget() {
  const savings = useSavings();
  const reduce = useReducedMotion();
  const [sheet, setSheet] = useState<'none' | 'setup' | 'edit'>('none');
  const [celebration, setCelebration] = useState<Celebration>(null);
  const [announcement, setAnnouncement] = useState('');

  const { goal, perSwipe, saved, steps, chainDone } = savings;

  useEffect(() => {
    if (!celebration) return;
    const hold = celebration.kind === 'finale' ? (reduce ? 2000 : 5800) : reduce ? 1500 : 2400;
    const t = setTimeout(() => setCelebration(null), hold);
    return () => clearTimeout(t);
  }, [celebration, reduce]);

  const handleSwipe = () => {
    const next = steps + 1;
    savings.recordSave();
    setCelebration({ kind: next >= TOTAL_STEPS ? 'finale' : 'save', amount: perSwipe });
    setAnnouncement(
      next >= TOTAL_STEPS
        ? `Saved ${formatMoney(perSwipe)}. Chain complete — all ${TOTAL_STEPS} swipes done!`
        : `Saved ${formatMoney(perSwipe)}. ${next} of ${TOTAL_STEPS} swipes complete.`,
    );
  };

  const variant = !goal
    ? 'intro'
    : chainDone
      ? 'chainDone'
      : steps === 0
        ? 'fresh'
        : steps === TOTAL_STEPS - 1
          ? 'almost'
          : 'streak';

  const heading = {
    intro: 'Swipe to Save',
    fresh: 'Swipe to Save',
    streak: 'Keep the chain alive',
    almost: "You're almost there!",
    chainDone: 'Chain complete!',
  }[variant];

  const explainer = {
    intro: 'Stack cash for the stuff you actually want.',
    fresh: `Every swipe stashes ${formatMoney(perSwipe)}. Five swipes starts your chain.`,
    streak: `Swipe ${steps + 1} of ${TOTAL_STEPS}. Don't break it now.`,
    almost: 'One more swipe locks in your first chain.',
    chainDone: "Five for five. That's how it's done.",
  }[variant];

  const editable = goal !== null && !chainDone;

  return (
    <>
      <div className="widgetwrap">
        <section className="savecard" aria-label="Swipe to Save">
          <div className="savecard__head">
            <h2 className="savecard__title">{heading}</h2>
            {editable && (
              <button type="button" className="savecard__edit" onClick={() => setSheet('edit')}>
                <SlidersIcon width={14} height={14} />
                Edit
              </button>
            )}
          </div>

          <p className="savecard__sub">{explainer}</p>

          <div className="savecard__hero">
            {variant === 'intro' ? (
              <PiggyBank size={192} coinLoop stacks />
            ) : variant === 'chainDone' ? (
              <div className="savecard__wrapup">
                <PiggyBank size={118} stacks />
                <p className="savecard__amount">
                  <strong>{formatMoney(saved)}</strong> stacked
                </p>
                <p className="savecard__meta">
                  {goal!.emoji} {goal!.name} · {formatMoney(goal!.target)} goal
                </p>
              </div>
            ) : (
              <div className="savecard__goal">
                <span className="savecard__emoji" aria-hidden>
                  {goal!.emoji}
                </span>
                <h3 className="savecard__goalname">{goal!.name}</h3>
                <p className="savecard__amount">
                  <strong>{formatMoney(saved)}</strong> of {formatMoney(goal!.target)}
                </p>
                <p className="savecard__meta">
                  <CalendarIcon width={14} height={14} />
                  {formatDeadline(goal!.deadline)}
                </p>
              </div>
            )}
          </div>

          <div className="savecard__steps">
            <Stepper total={TOTAL_STEPS} completed={goal ? steps : 0} ghost={variant === 'intro'} />
          </div>

          <div className="savecard__foot">
            {variant === 'intro' ? (
              <button type="button" className="cta-pill" onClick={() => setSheet('setup')}>
                Start a goal
                <ChevronRightIcon width={18} height={18} />
              </button>
            ) : variant === 'chainDone' ? (
              <button type="button" className="cta-pill" onClick={savings.startNewChain}>
                Start tomorrow's chain
                <ChevronRightIcon width={18} height={18} />
              </button>
            ) : (
              <SwipePill
                key={`${steps}-${perSwipe}`}
                label={`Swipe to save ${formatMoney(perSwipe)}`}
                onComplete={handleSwipe}
                disabled={celebration !== null}
              />
            )}
          </div>

          <AnimatePresence>
            {celebration?.kind === 'save' && (
              <motion.div
                className="celebration"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {!reduce && <ConfettiBurst />}
                <motion.div
                  className="celebration__body"
                  initial={reduce ? false : { scale: 0.7, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.05 }}
                >
                  <h3 className="celebration__title">
                    You saved {formatMoney(celebration.amount)}!
                  </h3>
                  <p className="celebration__copy">Keep up the good work.</p>
                </motion.div>
              </motion.div>
            )}
            {celebration?.kind === 'finale' && (
              <motion.div
                className="celebration celebration--finale"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {!reduce && <ConfettiBurst duration={2600} />}
                <div className="celebration__body">
                  <PiggyBank size={168} pop explode />
                  <motion.h3
                    className="celebration__title"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0.3 : 2.2, duration: 0.35, ease: 'easeOut' }}
                  >
                    Five for five!
                  </motion.h3>
                  <motion.p
                    className="celebration__copy"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: reduce ? 0.4 : 2.45, duration: 0.3 }}
                  >
                    Your first chain is in the bank.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {celebration?.kind === 'finale' && !reduce && (
          <>
            <Fireworks />
            {/* piggy splits open at ~1.5s; the coins erupt with it */}
            <CoinExplosion delay={1500} />
          </>
        )}
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>

      <BottomSheet open={sheet !== 'none'} onClose={() => setSheet('none')}>
        {sheet === 'setup' && (
          <GoalSheet
            mode="setup"
            onDone={(g, per) => {
              savings.startGoal(g, per);
              setSheet('none');
            }}
            onClose={() => setSheet('none')}
          />
        )}
        {sheet === 'edit' && goal && (
          <GoalSheet
            mode="edit"
            initialGoal={goal}
            initialPerSwipe={perSwipe}
            onDone={(g, per) => {
              savings.updateGoal(g, per);
              setSheet('none');
            }}
            onDelete={() => {
              savings.deleteGoal();
              setSheet('none');
            }}
            onClose={() => setSheet('none')}
          />
        )}
      </BottomSheet>
    </>
  );
}
