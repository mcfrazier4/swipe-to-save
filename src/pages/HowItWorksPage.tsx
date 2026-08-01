import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import EventRepeatRoundedIcon from '@mui/icons-material/EventRepeatRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';

const MECHANICS = [
  {
    icon: <TouchAppRoundedIcon fontSize="large" />,
    title: 'Swipe anytime',
    description: 'Feel like saving? Swipe the widget and a small amount moves to your goal, on the spot.',
    active: true,
  },
  {
    icon: <EventRepeatRoundedIcon fontSize="large" />,
    title: 'Fixed schedule',
    description: 'Set a daily or weekly amount and it saves itself, no swiping required.',
    active: false,
  },
  {
    icon: <PaidRoundedIcon fontSize="large" />,
    title: 'Round-ups',
    description: 'Every purchase rounds up to the nearest dollar, and the difference goes to your goal.',
    active: false,
  },
];

export function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ maxWidth: 440, mx: 'auto', px: 3, py: { xs: 6, sm: 10 } }}>
      <Stack spacing={4}>
        <Stack spacing={1.5}>
          <Typography variant="h4">Three ways to save</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            This demo focuses on swiping. The other two are shown so you get the full picture.
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          {MECHANICS.map((mechanic) => (
            <Stack key={mechanic.title} direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  flexShrink: 0,
                  color: mechanic.active ? 'primary.contrastText' : 'text.secondary',
                  bgcolor: mechanic.active ? 'primary.main' : 'action.hover',
                }}
              >
                {mechanic.icon}
              </Box>
              <Stack spacing={0.5} sx={{ pt: 0.5 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {mechanic.title}
                  </Typography>
                  {mechanic.active && <Chip label="This demo" size="small" color="primary" variant="outlined" />}
                </Stack>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {mechanic.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Button variant="contained" size="large" fullWidth onClick={() => navigate('/app')}>
          Start swiping
        </Button>
      </Stack>
    </Box>
  );
}
