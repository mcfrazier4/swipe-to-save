import { useState } from 'react';
import { Dialog, Snackbar, Stack, Switch, TextField } from '@mui/material';
import EventRepeatRoundedIcon from '@mui/icons-material/EventRepeatRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { MobileDialogHeader } from './MobileDialogHeader';
import { UtilityRow } from './UtilityRow';
import { useSavings } from '../state/SavingsContext';
import { MOCK_FIXED_SCHEDULE } from '../data/mockSavings';

interface SetupModalProps {
  open: boolean;
  onClose: () => void;
}

export function SetupModal({ open, onClose }: SetupModalProps) {
  const { goalName, goalTarget, perSwipeAmount, roundUpsEnabled, setGoal, setPerSwipeAmount, setRoundUpsEnabled, completeSetup } =
    useSavings();
  const [scheduleNoticeOpen, setScheduleNoticeOpen] = useState(false);

  const handleClose = () => {
    completeSetup();
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        sx={{ '& .MuiDialog-container': { alignItems: 'flex-end' } }}
        slotProps={{ paper: { sx: { borderRadius: '20px 20px 0 0', m: 0, width: '100%' } } }}
      >
        <MobileDialogHeader title="Setup Quick Save" onClose={handleClose} />
        <Stack spacing={3} sx={{ px: 2.5, py: 4 }}>
          <TextField
            label="Savings Goal"
            value={goalName}
            onChange={(event) => setGoal(event.target.value, goalTarget)}
            fullWidth
          />
          <TextField
            label="Total Cost"
            value={goalTarget}
            onChange={(event) => setGoal(goalName, Number(event.target.value.replace(/[^0-9.]/g, '')) || 0)}
            slotProps={{ input: { startAdornment: '$' } }}
            fullWidth
          />
          <TextField
            label="Per Swipe"
            value={perSwipeAmount}
            onChange={(event) => setPerSwipeAmount(Number(event.target.value.replace(/[^0-9.]/g, '')) || 0)}
            slotProps={{ input: { startAdornment: '$' } }}
            fullWidth
          />

          <Stack sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
            <UtilityRow
              icon={<EventRepeatRoundedIcon fontSize="small" />}
              title="Fixed Schedule"
              subtitle={`${MOCK_FIXED_SCHEDULE.frequency} / ${MOCK_FIXED_SCHEDULE.nextDate}`}
              right={<ChevronRightRoundedIcon sx={{ color: 'text.secondary' }} />}
              onClick={() => setScheduleNoticeOpen(true)}
            />
          </Stack>

          <Stack sx={{ border: 1, borderColor: 'divider', borderRadius: 2, overflow: 'hidden' }}>
            <UtilityRow
              icon={<PaidRoundedIcon fontSize="small" />}
              title="Round-ups"
              subtitle="From recent purchases"
              right={
                <Switch
                  checked={roundUpsEnabled}
                  onChange={(event) => setRoundUpsEnabled(event.target.checked)}
                  color="success"
                />
              }
            />
          </Stack>
        </Stack>
      </Dialog>

      <Snackbar
        open={scheduleNoticeOpen}
        autoHideDuration={2500}
        onClose={() => setScheduleNoticeOpen(false)}
        message="Fixed schedule setup is coming soon"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
