'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт компонента превью для клиентской стороны
const PreviewPage = dynamic(() => import('@/components/PreviewPage'), {
  ssr: false,
  loading: () => null,
});

interface ClientPreviewWrapperProps {
  children?: React.ReactNode;
}

export default function ClientPreviewWrapper({
  children,
}: ClientPreviewWrapperProps) {
  // Состояние для блокировки рендеринга основного контента
  const [isPreviewChecked, setIsPreviewChecked] = useState(false);
  // Состояние для отслеживания среды Vercel
  const [isVercelEnv, setIsVercelEnv] = useState(false);
  // Состояние для отслеживания завершения показа превью
  const [isPreviewClosed, setIsPreviewClosed] = useState(false);
  // Состояние для отслеживания первого посещения
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Эффект для установки флага проверки превью и определения среды Vercel
  useEffect(() => {
    // Проверяем, находимся ли мы в среде Vercel
    const isVercel =
      typeof window !== 'undefined' &&
      window.location.hostname.includes('vercel.app');

    setIsVercelEnv(isVercel);

    // Проверяем localStorage для определения первого посещения
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
          setIsFirstVisit(true);
        } else {
          setIsFirstVisit(false);
        }
      } catch (error) {
        console.error('Error checking localStorage:', error);
        setIsFirstVisit(false);
      }

      // Устанавливаем флаг, что проверка превью выполнена
      setIsPreviewChecked(true);
    };

    checkLocalStorage();

    // Для Vercel устанавливаем таймер безопасности, чтобы гарантировать снятие блокировки прокрутки
    let safetyTimer: NodeJS.Timeout | null = null;

    if (isVercel) {
      safetyTimer = setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        setIsPreviewClosed(true);
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

  // Обработчик закрытия превью
  const handlePreviewClosed = () => {
    document.body.classList.remove('overflow-hidden');
    setIsPreviewClosed(true);
  };

  // Если проверка не выполнена, не отображаем ничего
  if (!isPreviewChecked) {
    return null;
  }

  // Если это первое посещение и превью еще не закрыто, показываем только превью
  if (isFirstVisit && !isPreviewClosed) {
    return (
      <PreviewPage
        onPreviewClosed={handlePreviewClosed}
        isVercelEnvironment={isVercelEnv}
      />
    );
  }

  // В противном случае показываем основной контент
  return <>{children}</>;
}
