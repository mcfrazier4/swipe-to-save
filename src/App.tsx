import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { theme } from './theme/theme';
import { SavingsProvider } from './state/SavingsContext';
import { SaveAppPage } from './pages/SaveAppPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SavingsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SaveAppPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SavingsProvider>
    </ThemeProvider>
  );
}

export default App;
