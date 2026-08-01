import { IconButton, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface MobileDialogHeaderProps {
  title: string;
  onClose: () => void;
}

export function MobileDialogHeader({ title, onClose }: MobileDialogHeaderProps) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
      <Typography variant="h3" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <IconButton onClick={onClose} size="small" aria-label="Close">
        <CloseRoundedIcon />
      </IconButton>
    </Stack>
  );
}
