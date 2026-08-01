import type { ReactNode } from 'react';
import { Card, CardContent, Chip, Stack, Switch, Typography } from '@mui/material';

interface MechanicPreviewCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function MechanicPreviewCard({ icon, title, subtitle, children }: MechanicPreviewCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            {icon}
            <Stack spacing={0.25}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {subtitle}
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={0.5} sx={{ alignItems: 'flex-end' }}>
            <Chip label="Preview" size="small" variant="outlined" />
            <Switch disabled size="small" />
          </Stack>
        </Stack>

        <Stack spacing={1} sx={{ mt: 2, opacity: 0.75, pointerEvents: 'none' }}>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}
