'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Хук для отслеживания видимости элемента в области просмотра
 * @param options - Опции для IntersectionObserver
 * @returns [ref, isIntersecting] - Ссылка на элемент и флаг видимости
 */
export default function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [RefObject<HTMLElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Если элемент не существует или браузер не поддерживает IntersectionObserver, выходим
    if (!elementRef.current || typeof IntersectionObserver !== 'function') {
      return;
    }

    const element = elementRef.current;

    // Настройки по умолчанию
    const defaultOptions: IntersectionObserverOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0, // Как только хотя бы один пиксель элемента становится видимым
    };

    // Объединяем настройки по умолчанию с переданными опциями
    const observerOptions = { ...defaultOptions, ...options };

    // Создаем наблюдатель
    const observer = new IntersectionObserver(([entry]) => {
      // Обновляем состояние видимости
      setIsIntersecting(entry.isIntersecting);
    }, observerOptions);

    // Начинаем наблюдение за элементом
    observer.observe(element);

    // Очищаем наблюдатель при размонтировании компонента
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [options]);

  return [elementRef, isIntersecting];
}
