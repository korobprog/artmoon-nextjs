'use client';

import { useState, useEffect } from 'react';
import {
  MOBILE_BREAKPOINT,
  SMALL_MOBILE_BREAKPOINT,
} from '../components/navbar/navbarConstants';

// Интерфейс для размеров окна
export interface WindowSize {
  width: number;
  height: number;
  isMobile: boolean;
  isSmallMobile: boolean;
  isClient: boolean;
}

/**
 * Хук для отслеживания размеров окна браузера
 * Возвращает объект с шириной, высотой и флагами для мобильных устройств
 */
export const useWindowSize = (): WindowSize => {
  // Получаем сохраненные размеры из localStorage, если они есть
  const getInitialSize = (): WindowSize => {
    if (typeof window !== 'undefined') {
      try {
        const savedSize = localStorage.getItem('windowSize');
        if (savedSize) {
          const parsed = JSON.parse(savedSize);
          return {
            width: parsed.width || 0,
            height: parsed.height || 0,
            isMobile: parsed.width <= MOBILE_BREAKPOINT,
            isSmallMobile: parsed.width < SMALL_MOBILE_BREAKPOINT,
            isClient: true,
          };
        }
      } catch (e) {
        console.error('Error reading from localStorage:', e);
      }
    }
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isSmallMobile: false,
      isClient: false,
    };
  };

  // Используем сохраненные значения как начальные
  const [windowSize, setWindowSize] = useState<WindowSize>(getInitialSize);

  useEffect(() => {
    // Этот код выполняется только на клиенте
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newIsSmallMobile = width < SMALL_MOBILE_BREAKPOINT;
      const isMobile = width <= MOBILE_BREAKPOINT;

      const newSize = {
        width,
        height,
        isMobile,
        isSmallMobile: newIsSmallMobile,
        isClient: true,
      };

      // Сохраняем размеры в localStorage
      try {
        localStorage.setItem(
          'windowSize',
          JSON.stringify({
            width,
            height,
          })
        );
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }

      setWindowSize(newSize);
    };

    // Вызываем сразу при монтировании
    handleResize();

    // Используем throttle для оптимизации обработчика resize
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return windowSize;
};

export default useWindowSize;
