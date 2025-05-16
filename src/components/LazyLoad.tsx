'use client';

import { ReactNode, useState, useEffect } from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  onVisible?: () => void;
}

/**
 * Компонент для ленивой загрузки любого контента
 * Контент загружается только когда он попадает в область видимости
 */
export default function LazyLoad({
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '200px',
  className = '',
  onVisible,
}: LazyLoadProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  // Загружаем контент, когда он попадает в область видимости
  useEffect(() => {
    if (isIntersecting && !shouldRender) {
      setShouldRender(true);
      onVisible?.();
    }
  }, [isIntersecting, shouldRender, onVisible]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {shouldRender
        ? children
        : placeholder || (
            <div className="animate-pulse bg-gray-200 h-full w-full rounded-md" />
          )}
    </div>
  );
}
