import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0F6E5C',
      light: '#3D8F80',
      dark: '#0A4F42',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#F4A340',
      light: '#F7B968',
      dark: '#D3872B',
      contrastText: '#1A1A1A',
    },
    success: {
      main: '#2FBF71',
      light: '#5ED396',
      dark: '#1F8C51',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAF7F2',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A2420',
      secondary: '#5B6B65',
    },
    divider: '#E4E0D8',
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 16,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 24,
          paddingBlock: 12,
        },
        sizeLarge: {
          paddingInline: 32,
          paddingBlock: 14,
          fontSize: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          border: '1px solid #E4E0D8',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          height: 10,
        },
      },
    },
  },
});
