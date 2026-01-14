import { SWRConfig } from 'swr';
import { AppRouter } from './router';
import { swrConfig } from './lib/swr';
import { initializeTheme } from './store/theme.store';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Initialize theme on app load
    initializeTheme();
  }, []);

  return (
    <SWRConfig value={swrConfig}>
      <AppRouter />
    </SWRConfig>
  );
}

export default App;