import { SWRConfig } from 'swr';
import { AppRouter } from './router';
import { swrConfig } from './lib/swr';
import { initializeTheme } from './store/theme.store';
import { useEffect } from 'react';
import { ToastProvider } from '@/components/ui/use-toast';

function App() {
  useEffect(() => {
    // Initialize theme on app load
    initializeTheme();
  }, []);

  return (
    <ToastProvider>
      <SWRConfig value={swrConfig}>
        <AppRouter />
      </SWRConfig>
    </ToastProvider>
  );
}

export default App;