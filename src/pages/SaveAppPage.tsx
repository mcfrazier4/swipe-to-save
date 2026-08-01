import { Box } from '@mui/material';
import { SaveWidgetCard } from '../components/SaveWidgetCard';

export function SaveAppPage() {
  return (
    <Box sx={{ maxWidth: 440, mx: 'auto', px: 3, py: { xs: 8, sm: 12 } }}>
      <SaveWidgetCard />
    </Box>
  );
}
