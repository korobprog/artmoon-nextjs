// components/provider.tsx
'use client';
import { CacheProvider } from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useState, useEffect } from 'react';
import createEmotionCache from '@/utils/createEmotionCache';
import { CallbackForm } from '@/components/CallbackForm';

// Создаем тему
const theme = createTheme({
  palette: {
    mode: 'light', // или 'dark'
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  // Создаем кэш только на клиенте после монтирования
  const [emotionCache, setEmotionCache] = useState<EmotionCache | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Создаем кэш только на клиенте
    setEmotionCache(createEmotionCache());
    setMounted(true);
  }, []);

  // Если компонент не смонтирован, возвращаем только детей без стилизации
  // Это предотвращает несоответствие между сервером и клиентом
  if (!mounted || !emotionCache) {
    return <>{children}</>;
  }

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <CallbackForm />
      </ThemeProvider>
    </CacheProvider>
  );
}
