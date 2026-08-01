import { useState } from 'react';
import { Box, Button, Slider, Stack, Typography, alpha, useTheme } from '@mui/material';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { SwipeToSaveWidget } from './SwipeToSaveWidget';
import { SetupModal } from './SetupModal';
import { SettingsModal } from './SettingsModal';
import { useSavings } from '../state/SavingsContext';

export function SaveWidgetCard() {
  const theme = useTheme();
  const { hasCompletedSetup, goalName, goalTarget, perSwipeAmount, setPerSwipeAmount } = useSavings();
  const [setupOpen, setSetupOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          backdropFilter: 'blur(12px)',
          backgroundColor: alpha(theme.palette.background.paper, 0.85),
          border: 1,
          borderColor: 'divider',
          borderRadius: 3,
          p: 2,
          boxShadow: '0px 6px 6px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.06)',
        }}
      >
        {hasCompletedSetup ? (
          <Stack spacing={2.5}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <Typography variant="h2" sx={{ fontWeight: 700 }}>
                  It&rsquo;s time to save!
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  You are aiming to save ${goalTarget} for your {goalName}. Swipe and save...
                </Typography>
              </Stack>
              <Button
                onClick={() => setSettingsOpen(true)}
                endIcon={<ChevronRightRoundedIcon />}
                sx={{ flexShrink: 0 }}
              >
                Edit
              </Button>
            </Stack>

            <SwipeToSaveWidget />
          </Stack>
        ) : (
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>
                Save for something special
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Swipe to save can get you to your goal sooner with helpful reminders to save!
              </Typography>
            </Stack>

            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <Slider
                value={perSwipeAmount}
                onChange={(_event, value) => setPerSwipeAmount(value as number)}
                min={1}
                max={50}
                step={1}
                sx={{ width: '100%' }}
              />
              <Stack direction="row" spacing={0.75} sx={{ alignItems: 'baseline' }}>
                <Typography variant="h1" sx={{ fontWeight: 700 }}>
                  ${perSwipeAmount}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  / month
                </Typography>
              </Stack>
            </Stack>

            <Button variant="contained" size="large" fullWidth onClick={() => setSetupOpen(true)}>
              Start Saving Today!
            </Button>
          </Stack>
        )}
      </Box>

      <SetupModal open={setupOpen} onClose={() => setSetupOpen(false)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}
