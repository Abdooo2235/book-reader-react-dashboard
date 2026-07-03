import { SWRConfig } from 'swr';
import { AppRouter } from './router';
import { swrConfig } from './lib/swr';
import { initializeTheme } from './store/theme.store';
import { useAuthStore } from './store/auth.store';
import { useEffect } from 'react';
import { ToastProvider } from '@/components/ui/use-toast';

function App() {
  useEffect(() => {
    // Initialize theme on app load
    initializeTheme();
    // Revalidate the persisted auth token against the backend (logs out on failure)
    useAuthStore.getState().checkAuth();
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