import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useSavings } from '../state/SavingsContext';
import { DEFAULT_GOAL_NAME, DEFAULT_GOAL_TARGET } from '../data/mockSavings';

export function WelcomeGoalPage() {
  const navigate = useNavigate();
  const { setGoal } = useSavings();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const parsedTarget = Number(target);
    setGoal(
      name.trim() || DEFAULT_GOAL_NAME,
      Number.isFinite(parsedTarget) && parsedTarget > 0 ? parsedTarget : DEFAULT_GOAL_TARGET,
    );
    navigate('/how-it-works');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: 'auto', px: 3, py: { xs: 6, sm: 10 } }}
    >
      <Stack spacing={4}>
        <Stack spacing={1.5}>
          <Typography variant="h4">What are you saving for?</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Give it a name and a target. You can change this anytime.
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          <TextField
            label="Goal name"
            placeholder={DEFAULT_GOAL_NAME}
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <TextField
            label="Target amount"
            placeholder={String(DEFAULT_GOAL_TARGET)}
            value={target}
            onChange={(event) => setTarget(event.target.value.replace(/[^0-9.]/g, ''))}
            slotProps={{ input: { startAdornment: <Typography sx={{ mr: 0.5, color: 'text.secondary' }}>$</Typography> } }}
            fullWidth
          />
        </Stack>

        <Button type="submit" variant="contained" size="large" fullWidth>
          Continue
        </Button>
      </Stack>
    </Box>
  );
}
