import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { useSavings } from '../state/SavingsContext';

export function ProgressHeader() {
  const { goalName, goalTarget, totalSaved } = useSavings();
  const percent = Math.min(100, Math.round((totalSaved / goalTarget) * 100));

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
          {goalName}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {percent}%
        </Typography>
      </Stack>

      <Typography variant="h3">
        ${totalSaved.toFixed(2)}
        <Typography component="span" variant="h5" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          {' '}
          / ${goalTarget.toFixed(0)}
        </Typography>
      </Typography>

      <Box>
        <LinearProgress variant="determinate" value={percent} />
      </Box>
    </Stack>
  );
}
