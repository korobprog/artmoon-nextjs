'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

import useFirstVisit from '@/hooks/useFirstVisit';
import useStylesLoaded from '@/hooks/useStylesLoaded';

// Список изображений для случайного выбора
const imagesList = [
  '/images/568-1500x1144.webp',
  '/images/Армандо-Романо-Италия-2262-95х75см-1-1500x1186.webp',
  '/images/Армандо-Романо-Италия-2265-115х85см-1500x1112.webp',
  '/images/Мартина-Йона-Испания-2259-98х85см-1500x1301.webp',
  '/images/Мартина-Йона-Испания-2304-98х84см-1500x1294.webp',
  '/images/Хавьер-Мулио-Испания-2273-106х85см-1500x1204.webp',
  '/images/Наварро-Монтллор-Испания-2282-145х115см.webp',
];

interface PreviewPageProps {
  onPreviewClosed?: () => void;
  isVercelEnvironment?: boolean;
}

export default function PreviewPage({
  onPreviewClosed,
  isVercelEnvironment = false,
}: PreviewPageProps) {
  const { isFirstVisit, setHasVisited, resetVisitState } = useFirstVisit();
  const [showPreview, setShowPreview] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { stylesLoaded } = useStylesLoaded();

  // Проверяем, находимся ли мы на странице /artists
  const isArtistsPage =
    typeof window !== 'undefined' &&
    window.location.pathname.includes('/artists');

  // Выбираем случайное изображение при монтировании компонента
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * imagesList.length);
    return imagesList[randomIndex];
  }, []);

  // Эффект для установки флага монтирования
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Эффект для управления прогрессом и закрытием превью
  useEffect(() => {
    if (!isMounted || !isFirstVisit) return;

    // Используем переданный параметр isVercelEnvironment вместо определения его здесь

    // Для страницы artists или Vercel используем фиксированное время
    const isFixedTime = isArtistsPage || isVercelEnvironment;
    const maxPreviewTime = isArtistsPage ? 3000 : 5000;

    // Вычисляем интервал для достижения 100% за maxPreviewTime
    const totalSteps = 20; // Общее количество шагов
    const stepInterval = maxPreviewTime / totalSteps;
    const progressIncrement = 100 / totalSteps;

    // Интервал для плавного увеличения прогресса
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressIncrement;
        return Math.min(newProgress, 100);
      });
    }, stepInterval);

    // Функция закрытия превью
    const closePreview = () => {
      setProgress(100);

      // Небольшая задержка перед закрытием, чтобы показать 100%
      setTimeout(() => {
        setShowPreview(false);
        setHasVisited();
        console.log('Closing preview');
        // Вызываем callback при закрытии превью, если он предоставлен
        if (onPreviewClosed) {
          onPreviewClosed();
        }
      }, 500);
    };

    let closePreviewTimer: NodeJS.Timeout | null = null;

    // Устанавливаем таймер закрытия для всех случаев
    closePreviewTimer = setTimeout(closePreview, maxPreviewTime);

    // Дополнительно проверяем загрузку стилей, если не фиксированное время
    if (!isFixedTime && stylesLoaded) {
      closePreview();
    }

    // Добавляем запасной таймер для гарантированного закрытия превью
    const safetyTimer = setTimeout(() => {
      console.log('Safety timer triggered');
      closePreview();
    }, 10000); // 10 секунд максимум

    return () => {
      clearInterval(progressInterval);
      if (closePreviewTimer) {
        clearTimeout(closePreviewTimer);
      }
      clearTimeout(safetyTimer);
    };
  }, [
    isMounted,
    isFirstVisit,
    setHasVisited,
    isArtistsPage,
    stylesLoaded,
    isVercelEnvironment,
  ]);

  // Если компонент не смонтирован, не первое посещение или превью уже скрыто, не отображаем компонент
  if (!isMounted || !isFirstVisit || !showPreview) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        {/* Кнопка для сброса состояния (только для разработки) */}
        {process.env.NODE_ENV === 'development' && (
          <button
            onClick={() => {
              resetVisitState();
              window.location.reload();
            }}
            className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs"
          >
            Сбросить превью
          </button>
        )}
        <div className="mb-8 relative">
          <div className="w-full h-80 relative overflow-hidden rounded-lg">
            <Image
              src={randomImage}
              alt="Картина из галереи Art Moon"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>

        <h2 className="text-white text-2xl font-georgia-bold mb-6">
          Пожалуйста подождите
        </h2>

        <p className="text-gray-300 text-lg mb-8">
          Идет загрузка сайта, галереи, видео...
        </p>

        <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
          <div
            className="bg-amber-500 h-4 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-400">{progress}% загружено</p>
      </div>
    </div>
  );
}
