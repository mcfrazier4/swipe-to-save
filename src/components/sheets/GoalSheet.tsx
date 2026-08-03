import { useRef, useState } from 'react';
import type { Goal } from '../../state/SavingsContext';
import { CloseIcon } from '../icons';

const PRESET_GOALS: { name: string; emoji: string }[] = [
  { name: 'Beach trip', emoji: '🏝️' },
  { name: 'Concert tix', emoji: '🎟️' },
  { name: 'First car', emoji: '🚗' },
  { name: 'Move-out fund', emoji: '🔑' },
  { name: 'New board', emoji: '🏄' },
];

const CUSTOM_EMOJIS = ['✈️', '🌊', '🎸', '📸', '🐶', '💍', '🎮', '👟'];
const TARGET_PRESETS = [250, 500, 1000];
const PER_SWIPE_PRESETS = [5, 10, 25];

interface GoalSheetProps {
  mode: 'setup' | 'edit';
  initialGoal?: Goal;
  initialPerSwipe?: number;
  onDone: (goal: Goal, perSwipe: number) => void;
  onDelete?: () => void;
  onClose: () => void;
}

/**
 * One full-screen sheet, two jobs: first-time goal setup and later
 * editing. Every option group is an edge-bleeding swipe row of chips,
 * left-aligned, with any "make your own" affordance as a link below
 * the row.
 */
export function GoalSheet({
  mode,
  initialGoal,
  initialPerSwipe,
  onDone,
  onDelete,
  onClose,
}: GoalSheetProps) {
  const initialIsPreset = PRESET_GOALS.some(
    (p) => p.name === initialGoal?.name && p.emoji === initialGoal?.emoji,
  );
  const [preset, setPreset] = useState<string | 'custom'>(
    initialGoal ? (initialIsPreset ? initialGoal.name : 'custom') : PRESET_GOALS[0].name,
  );
  const [customName, setCustomName] = useState(initialIsPreset ? '' : (initialGoal?.name ?? ''));
  const [customEmoji, setCustomEmoji] = useState(
    initialIsPreset ? CUSTOM_EMOJIS[0] : (initialGoal?.emoji ?? CUSTOM_EMOJIS[0]),
  );
  const initialTarget = initialGoal?.target ?? 500;
  const [target, setTarget] = useState<number>(initialTarget);
  const [targetText, setTargetText] = useState(String(initialTarget));
  const [amountCustom, setAmountCustom] = useState(
    initialGoal ? !TARGET_PRESETS.includes(initialTarget) : false,
  );
  const [dated, setDated] = useState(Boolean(initialGoal?.deadline));
  const [deadline, setDeadline] = useState(initialGoal?.deadline ?? '');
  const [perSwipe, setPerSwipe] = useState(initialPerSwipe ?? 10);
  // remembers the chip choice while "Add my own" is open, so toggling back restores it
  const lastPresetRef = useRef<string>(initialIsPreset && initialGoal ? initialGoal.name : PRESET_GOALS[0].name);

  const isCustom = preset === 'custom';
  const name = isCustom ? customName.trim() : preset;
  const emoji = isCustom
    ? customEmoji
    : (PRESET_GOALS.find((p) => p.name === preset)?.emoji ?? '🏝️');
  const valid = name.length > 0 && target > 0 && (!dated || deadline.length > 0);

  const submit = () => {
    if (!valid) return;
    onDone({ name, emoji, target, deadline: dated ? deadline : null }, perSwipe);
  };

  return (
    <div className="goalsheet">
      <header className="goalsheet__head">
        <h2 className="goalsheet__title">
          {mode === 'setup' ? 'New Swipe to Save' : 'Saving settings'}
        </h2>
        <button type="button" className="goalsheet__close" aria-label="Close" onClick={onClose}>
          <CloseIcon width={18} height={18} />
        </button>
      </header>

      <div className="goalsheet__scroll">
        <fieldset className="goalsheet__section">
          <legend className="goalsheet__label">What are you saving for?</legend>
          <div className="chiprow">
            {PRESET_GOALS.map((g) => (
              <button
                key={g.name}
                type="button"
                className="chip"
                aria-pressed={preset === g.name}
                onClick={() => setPreset(g.name)}
              >
                <span aria-hidden>{g.emoji}</span> {g.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="linkbtn"
            aria-expanded={isCustom}
            onClick={() => {
              if (isCustom) {
                setPreset(lastPresetRef.current);
              } else {
                lastPresetRef.current = preset;
                setPreset('custom');
              }
            }}
          >
            Add my own
          </button>
          {isCustom && (
            <div className="goalsheet__custom">
              <input
                className="field"
                type="text"
                placeholder="Name your goal"
                maxLength={24}
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                aria-label="Custom goal name"
              />
              <div className="goalsheet__emojis" role="group" aria-label="Pick an emoji">
                {CUSTOM_EMOJIS.map((e) => (
                  <button
                    key={e}
                    type="button"
                    className="emojibtn"
                    aria-pressed={customEmoji === e}
                    onClick={() => setCustomEmoji(e)}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}
        </fieldset>

        <fieldset className="goalsheet__section">
          <legend className="goalsheet__label">How much to get there?</legend>
          <div className="chiprow">
            {TARGET_PRESETS.map((amt) => (
              <button
                key={amt}
                type="button"
                className="chip"
                aria-pressed={!amountCustom && target === amt}
                onClick={() => {
                  setAmountCustom(false);
                  setTarget(amt);
                  setTargetText(String(amt));
                }}
              >
                ${amt.toLocaleString('en-US')}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="linkbtn"
            aria-expanded={amountCustom}
            onClick={() => {
              if (amountCustom) {
                setAmountCustom(false);
                setTarget(TARGET_PRESETS[1]);
                setTargetText(String(TARGET_PRESETS[1]));
              } else {
                setAmountCustom(true);
              }
            }}
          >
            Enter my own amount
          </button>
          {amountCustom && (
            <div className="goalsheet__custom">
              <div className="field field--money">
                <span aria-hidden>$</span>
                <input
                  type="number"
                  min={1}
                  placeholder="Amount"
                  value={targetText}
                  onChange={(e) => {
                    setTargetText(e.target.value);
                    setTarget(Number(e.target.value) || 0);
                  }}
                  aria-label="Custom target amount in dollars"
                />
              </div>
            </div>
          )}
        </fieldset>

        <fieldset className="goalsheet__section">
          <legend className="goalsheet__label">Goal date</legend>
          <div className="chiprow">
            <button
              type="button"
              className="chip"
              aria-pressed={!dated}
              onClick={() => setDated(false)}
            >
              Open-ended
            </button>
            <button
              type="button"
              className="chip"
              aria-pressed={dated}
              onClick={() => setDated(true)}
            >
              Pick a date
            </button>
          </div>
          {dated && (
            <input
              className="field field--date"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              aria-label="Goal date"
            />
          )}
        </fieldset>

        <fieldset className="goalsheet__section">
          <legend className="goalsheet__label">Each swipe stashes</legend>
          <div className="chiprow">
            {PER_SWIPE_PRESETS.map((amt) => (
              <button
                key={amt}
                type="button"
                className="chip"
                aria-pressed={perSwipe === amt}
                onClick={() => setPerSwipe(amt)}
              >
                ${amt}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <footer className="goalsheet__foot">
        <button type="button" className="cta-pill" disabled={!valid} onClick={submit}>
          {mode === 'setup' ? 'Start my chain' : 'Save changes'}
        </button>
        {mode === 'edit' && onDelete && (
          <button type="button" className="goalsheet__delete" onClick={onDelete}>
            Delete this goal
          </button>
        )}
      </footer>
    </div>
  );
}
