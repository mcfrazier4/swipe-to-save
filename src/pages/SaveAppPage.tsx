import { Box, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import EventRepeatRoundedIcon from '@mui/icons-material/EventRepeatRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import { ProgressHeader } from '../components/ProgressHeader';
import { SwipeToSaveWidget } from '../components/SwipeToSaveWidget';
import { MechanicPreviewCard } from '../components/MechanicPreviewCard';
import { MOCK_FIXED_SCHEDULE, MOCK_ROUND_UP_TRANSACTIONS } from '../data/mockSavings';

export function SaveAppPage() {
  return (
    <Box sx={{ maxWidth: 440, mx: 'auto', px: 3, py: { xs: 5, sm: 8 } }}>
      <Stack spacing={4}>
        <ProgressHeader />

        <Card sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', border: 'none' }}>
          <CardContent>
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Swipe to save
              </Typography>
              <SwipeToSaveWidget />
            </Stack>
          </CardContent>
        </Card>

        <Stack spacing={1}>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
            Other ways to save
          </Typography>

          <MechanicPreviewCard
            icon={<EventRepeatRoundedIcon color="action" />}
            title="Fixed schedule"
            subtitle={`${MOCK_FIXED_SCHEDULE.frequency} • ${MOCK_FIXED_SCHEDULE.nextDate}`}
          >
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Auto-save amount
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                ${MOCK_FIXED_SCHEDULE.amount.toFixed(2)}
              </Typography>
            </Stack>
          </MechanicPreviewCard>

          <MechanicPreviewCard
            icon={<PaidRoundedIcon color="action" />}
            title="Round-ups"
            subtitle="From your recent purchases"
          >
            {MOCK_ROUND_UP_TRANSACTIONS.map((txn, index) => (
              <Box key={txn.id}>
                {index > 0 && <Divider sx={{ mb: 1 }} />}
                <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                  <Stack>
                    <Typography variant="body2">{txn.merchant}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {txn.date} • ${txn.amount.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    +${txn.roundUp.toFixed(2)}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </MechanicPreviewCard>
        </Stack>
      </Stack>
    </Box>
  );
}
