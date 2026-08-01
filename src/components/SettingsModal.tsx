import { useState } from 'react';
import { Button, Dialog, IconButton, Snackbar, Stack, Switch, TextField, Typography } from '@mui/material';
import EventRepeatRoundedIcon from '@mui/icons-material/EventRepeatRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { MobileDialogHeader } from './MobileDialogHeader';
import { ProgressHeader } from './ProgressHeader';
import { UtilityRow, TransactionRow } from './UtilityRow';
import { useSavings } from '../state/SavingsContext';
import { MOCK_FIXED_SCHEDULE, MOCK_ROUND_UP_TRANSACTIONS, MOCK_ROUND_UP_TRANSACTIONS_MORE } from '../data/mockSavings';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { perSwipeAmount, roundUpsEnabled, setPerSwipeAmount, setRoundUpsEnabled } = useSavings();
  const [scheduleNoticeOpen, setScheduleNoticeOpen] = useState(false);
  const [showMoreTransactions, setShowMoreTransactions] = useState(false);

  const transactions = showMoreTransactions
    ? [...MOCK_ROUND_UP_TRANSACTIONS, ...MOCK_ROUND_UP_TRANSACTIONS_MORE]
    : MOCK_ROUND_UP_TRANSACTIONS;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        sx={{ '& .MuiDialog-container': { alignItems: 'flex-end' } }}
        slotProps={{ paper: { sx: { borderRadius: '20px 20px 0 0', m: 0, width: '100%' } } }}
      >
        <MobileDialogHeader title="Edit Quick Save" onClose={onClose} />
        <Stack spacing={3} sx={{ px: 2.5, py: 4 }}>
          <ProgressHeader
            action={
              <IconButton size="small" aria-label="Goal details">
                <ChevronRightRoundedIcon fontSize="small" />
              </IconButton>
            }
          />

          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Ways to save
          </Typography>

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
            {roundUpsEnabled && (
              <>
                {transactions.map((txn) => (
                  <TransactionRow key={txn.id} transaction={txn} showDivider />
                ))}
                {!showMoreTransactions && (
                  <Button fullWidth onClick={() => setShowMoreTransactions(true)} sx={{ py: 1.5, borderRadius: 0 }}>
                    View More Transactions
                  </Button>
                )}
              </>
            )}
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
