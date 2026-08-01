import type { ReactNode } from 'react';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import type { RoundUpTransaction } from '../data/mockSavings';

interface UtilityRowProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  right?: ReactNode;
  onClick?: () => void;
  showDivider?: boolean;
}

export function UtilityRow({ icon, title, subtitle, right, onClick, showDivider }: UtilityRowProps) {
  return (
    <Box>
      {showDivider && <Divider />}
      <Stack
        direction="row"
        spacing={1.5}
        onClick={onClick}
        sx={{
          alignItems: 'center',
          px: 3,
          py: 1.75,
          cursor: onClick ? 'pointer' : 'default',
        }}
      >
        <Avatar variant="rounded" sx={{ bgcolor: 'action.hover', color: 'text.secondary', width: 32, height: 32 }}>
          {icon}
        </Avatar>
        <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {subtitle}
          </Typography>
        </Stack>
        {right}
      </Stack>
    </Box>
  );
}

interface TransactionRowProps {
  transaction: RoundUpTransaction;
  showDivider?: boolean;
}

export function TransactionRow({ transaction, showDivider }: TransactionRowProps) {
  return (
    <Box>
      {showDivider && <Divider />}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', px: 3, py: 1.75 }}>
        <Avatar variant="rounded" sx={{ bgcolor: 'action.hover', width: 32, height: 32 }}>
          {transaction.merchant.charAt(0)}
        </Avatar>
        <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {transaction.merchant}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {transaction.date}
          </Typography>
        </Stack>
        <Stack sx={{ alignItems: 'flex-end' }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            +${transaction.roundUp.toFixed(2)}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ${transaction.amount.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
