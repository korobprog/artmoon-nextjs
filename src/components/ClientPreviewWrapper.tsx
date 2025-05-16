'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт компонента превью для клиентской стороны
const PreviewPage = dynamic(() => import('@/components/PreviewPage'), {
  ssr: false,
  loading: () => null,
});

export default function ClientPreviewWrapper() {
  // Состояние для блокировки рендеринга основного контента
  const [isPreviewChecked, setIsPreviewChecked] = useState(false);
  // Состояние для отслеживания среды Vercel
  const [isVercelEnv, setIsVercelEnv] = useState(false);

  // Эффект для установки флага проверки превью и определения среды Vercel
  useEffect(() => {
    // Проверяем, находимся ли мы в среде Vercel
    const isVercel =
      typeof window !== 'undefined' &&
      window.location.hostname.includes('vercel.app');

    setIsVercelEnv(isVercel);

    // Устанавливаем флаг, что проверка превью выполнена
    setIsPreviewChecked(true);

    // Добавляем класс к body для предотвращения прокрутки во время показа превью
    const checkLocalStorage = () => {
      try {
        // Проверяем localStorage и sessionStorage
        const hasVisited = localStorage.getItem('hasVisitedBefore');
        const lastVisitTime = localStorage.getItem('lastVisitTime');
        const currentTime = Date.now();

        // Если прошло более 24 часов или нет записи о последнем посещении,
        // считаем это "первым" посещением для показа превью
        const isExpired =
          lastVisitTime &&
          currentTime - parseInt(lastVisitTime) > 24 * 60 * 60 * 1000;

        if (!hasVisited || isExpired) {
          document.body.classList.add('overflow-hidden');
        }
      } catch (error) {
        console.error('Error checking localStorage:', error);
      }
    };

    checkLocalStorage();

    // Для Vercel устанавливаем таймер безопасности, чтобы гарантировать снятие блокировки прокрутки
    let safetyTimer: NodeJS.Timeout | null = null;

    if (isVercel) {
      safetyTimer = setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        console.log('Vercel safety timer: removed overflow-hidden');
      }, 15000); // 15 секунд максимум для Vercel
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
      if (safetyTimer) {
        clearTimeout(safetyTimer);
      }
    };
  }, []);

  // Добавляем класс для скрытия контента до проверки превью
  useEffect(() => {
    if (!isPreviewChecked) {
      document.body.classList.add('visibility-hidden');
    } else {
      document.body.classList.remove('visibility-hidden');
    }

    return () => {
      document.body.classList.remove('visibility-hidden');
    };
  }, [isPreviewChecked]);

  // Передаем информацию о среде Vercel в PreviewPage
  return (
    <PreviewPage
      onPreviewClosed={() => document.body.classList.remove('overflow-hidden')}
      isVercelEnvironment={isVercelEnv}
    />
  );
}
