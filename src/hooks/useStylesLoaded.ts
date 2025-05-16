'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Хук для отслеживания загрузки стилей и ресурсов
 * @param resourceUrls - массив URL ресурсов для отслеживания (опционально)
 * @returns объект с флагом загрузки стилей
 */
export default function useStylesLoaded(resourceUrls: string[] = []) {
  const [stylesLoaded, setStylesLoaded] = useState(false);

  // Используем useRef вместо useState для отслеживания статуса ресурсов
  // Это позволяет избежать лишних ререндеров и бесконечных циклов
  const resourcesStatusRef = useRef<Record<string, boolean>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const loadingRef = useRef({
    initialized: false,
    checkInProgress: false,
    allLoaded: false,
  });

  useEffect(() => {
    // Предотвращаем повторную инициализацию
    if (loadingRef.current.initialized) return;
    loadingRef.current.initialized = true;

    // Инициализируем статус ресурсов
    if (resourceUrls.length > 0) {
      const initialStatus: Record<string, boolean> = {};
      resourceUrls.forEach((url) => {
        initialStatus[url] = false;
      });
      resourcesStatusRef.current = initialStatus;
    }

    // Проверяем, загружены ли все стили и ресурсы
    const checkAllLoaded = () => {
      // Если уже все загружено, не проверяем повторно
      if (loadingRef.current.allLoaded) return true;

      // Проверяем стили
      const stylesLoaded = document.styleSheets.length > 0;

      // Если нет ресурсов для проверки, возвращаем только статус стилей
      if (resourceUrls.length === 0) {
        return stylesLoaded;
      }

      // Проверяем ресурсы
      const allResourcesLoaded = Object.values(
        resourcesStatusRef.current
      ).every((status) => status === true);

      // Сохраняем результат проверки
      const result = stylesLoaded && allResourcesLoaded;

      return result;
    };

    // Функция для загрузки и отслеживания изображений
    const preloadImages = () => {
      resourceUrls.forEach((url) => {
        if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          // Пропускаем, если уже загружено
          if (resourcesStatusRef.current[url]) return;

          const img = new Image();

          img.onload = () => {
            resourcesStatusRef.current[url] = true;
            updateLoadedStatus();
          };

          img.onerror = () => {
            console.error(`Failed to load image: ${url}`);
            // Помечаем как загруженное, чтобы не блокировать UI
            resourcesStatusRef.current[url] = true;
            updateLoadedStatus();
          };

          img.src = url;

          // Если изображение уже в кеше и загружено
          if (img.complete) {
            resourcesStatusRef.current[url] = true;
            updateLoadedStatus();
          }
        }
      });
    };

    // Функция для проверки загрузки шрифтов
    const checkFonts = () => {
      resourceUrls.forEach((url) => {
        if (url.match(/\.(woff|woff2|ttf|otf)$/i)) {
          // Пропускаем, если уже загружено
          if (resourcesStatusRef.current[url]) return;

          // Проверяем доступность шрифта
          document.fonts.ready.then(() => {
            // Помечаем шрифт как загруженный
            resourcesStatusRef.current[url] = true;
            updateLoadedStatus();
          });
        }
      });
    };

    // Функция для установки флага загрузки
    const updateLoadedStatus = () => {
      if (checkAllLoaded() && !stylesLoaded) {
        loadingRef.current.allLoaded = true;
        setStylesLoaded(true);

        // Очищаем интервал, если он существует
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    // Проверяем загрузку при монтировании компонента
    if (typeof window !== 'undefined') {
      // Загружаем ресурсы
      preloadImages();
      checkFonts();

      // Если документ уже загружен
      if (document.readyState === 'complete') {
        updateLoadedStatus();
      } else {
        // Ждем загрузки документа
        window.addEventListener('load', updateLoadedStatus);
      }

      // Устанавливаем интервал для периодической проверки
      timerRef.current = setInterval(() => {
        updateLoadedStatus();
      }, 200);

      // Устанавливаем таймаут безопасности - если ресурсы не загрузились за 3 секунды,
      // все равно считаем их загруженными (уменьшено с 5 до 3 секунд для Vercel)
      const safetyTimeout = setTimeout(() => {
        if (!stylesLoaded) {
          console.warn(
            'Resource loading timeout exceeded. Forcing loaded state.'
          );
          setStylesLoaded(true);
          loadingRef.current.allLoaded = true;

          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        }
      }, 3000);

      // Дополнительный таймаут для Vercel - принудительно устанавливаем загрузку
      const isVercel =
        typeof window !== 'undefined' &&
        window.location.hostname.includes('vercel.app');

      if (isVercel) {
        const vercelSafetyTimeout = setTimeout(() => {
          if (!stylesLoaded) {
            console.warn('Vercel environment detected. Forcing loaded state.');
            setStylesLoaded(true);
            loadingRef.current.allLoaded = true;

            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }
          }
        }, 2000); // Более короткий таймаут для Vercel

        // Очистка Vercel таймаута
        return () => {
          window.removeEventListener('load', updateLoadedStatus);

          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          clearTimeout(safetyTimeout);
          clearTimeout(vercelSafetyTimeout);
        };
      }

      return () => {
        window.removeEventListener('load', updateLoadedStatus);

        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }

        clearTimeout(safetyTimeout);
      };
    }

    // Для SSR
    return undefined;
  }, [resourceUrls, stylesLoaded]); // Убрали resourcesStatus из зависимостей

  return { stylesLoaded };
}
