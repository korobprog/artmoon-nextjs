'use client';

import { useEffect } from 'react';
import {
  initLazyLoadImages,
  preloadCriticalImages,
  criticalImages,
} from '@/utils/imageOptimization';

/**
 * Компонент для оптимизации загрузки изображений
 * Предварительно загружает критические изображения и инициализирует ленивую загрузку для остальных
 */
export default function ImageOptimizer() {
  useEffect(() => {
    // Предварительно загружаем критические изображения
    preloadCriticalImages(criticalImages);

    // Инициализируем ленивую загрузку для всех изображений с атрибутом data-src
    initLazyLoadImages({
      rootMargin: '200px 0px', // Загружаем изображения за 200px до появления в области видимости
      threshold: 0.01, // Загружаем, когда хотя бы 1% изображения видим
    });

    // Добавляем класс для отображения контента после загрузки изображений
    document.documentElement.classList.add('images-loaded');
  }, []);

  // Этот компонент не рендерит никакой UI
  return null;
}
