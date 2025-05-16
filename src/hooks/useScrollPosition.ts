'use client';

import { useState, useEffect } from 'react';
import { SCROLL_THRESHOLD } from '../components/navbar/navbarConstants';

// Интерфейс для позиции прокрутки
export interface ScrollPosition {
  scrollY: number;
  isScrolled: boolean;
}

/**
 * Хук для отслеживания позиции прокрутки страницы
 * Возвращает объект с текущей позицией прокрутки и флагом isScrolled
 */
export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    isScrolled: false,
  });

  useEffect(() => {
    // Функция для обработки события прокрутки с throttle
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollPosition({
            scrollY: currentScrollY,
            isScrolled: currentScrollY > SCROLL_THRESHOLD,
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    // Добавляем слушатель события прокрутки с опцией passive для улучшения производительности
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Вызываем сразу при монтировании
    handleScroll();

    // Удаляем слушатель при размонтировании
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
