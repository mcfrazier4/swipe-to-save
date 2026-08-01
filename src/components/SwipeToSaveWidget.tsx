import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import { Box, Typography, useTheme, alpha } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useSavings } from '../state/SavingsContext';

const HANDLE_SIZE = 44;
const TRACK_PADDING = 8;
const COMMIT_RATIO = 0.62;

export function SwipeToSaveWidget() {
  const theme = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const { perSwipeAmount, addSaving } = useSavings();
  const [trackWidth, setTrackWidth] = useState(0);
  const [justSaved, setJustSaved] = useState(false);
  const x = useMotionValue(0);

  const maxDrag = Math.max(trackWidth - HANDLE_SIZE - TRACK_PADDING * 2, 1);
  const fillWidth = useTransform(x, (latest) => latest + HANDLE_SIZE + TRACK_PADDING * 2);
  const labelOpacity = useTransform(x, [0, maxDrag * 0.5], [1, 0]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setTrackWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    setTrackWidth(el.offsetWidth);
    return () => observer.disconnect();
  }, []);

  const springBack = () => animate(x, 0, { type: 'spring', stiffness: 420, damping: 32 });

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x >= maxDrag * COMMIT_RATIO) {
      addSaving(perSwipeAmount);
      setJustSaved(true);
      window.setTimeout(() => setJustSaved(false), 1500);
    }
    springBack();
  };

  return (
    <Box>
      <Box
        ref={trackRef}
        sx={{
          position: 'relative',
          height: 60,
          borderRadius: 999,
          background: theme.palette.background.paper,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            width: fillWidth,
            borderRadius: 999,
            background: alpha(theme.palette.primary.main, 0.12),
          }}
        />

        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: labelOpacity,
            pointerEvents: 'none',
          }}
        >
          <Typography variant="button" sx={{ color: theme.palette.primary.main, letterSpacing: 0.4 }}>
            Slide to Transfer
          </Typography>
        </motion.div>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{
            x,
            position: 'absolute',
            left: TRACK_PADDING,
            top: TRACK_PADDING,
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            borderRadius: '50%',
            background: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            touchAction: 'pan-y',
          }}
          whileTap={{ cursor: 'grabbing', scale: 1.05 }}
        >
          <ArrowForwardRoundedIcon sx={{ color: theme.palette.primary.contrastText }} />
        </motion.div>
      </Box>

      <Box sx={{ position: 'relative', height: 32, mt: 1 }}>
        <AnimatePresence>
          {justSaved && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <CheckRoundedIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
              <Typography variant="body2" sx={{ color: theme.palette.success.dark, fontWeight: 600 }}>
                Saved ${perSwipeAmount}
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
