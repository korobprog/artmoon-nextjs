'use client';

import { useEffect } from 'react';
import {
  preloadFonts,
  loadFontsWhenNeeded,
  projectFonts,
  projectFontFamilies,
} from '@/utils/fontOptimization';

/**
 * Компонент для оптимизации загрузки шрифтов
 * Предварительно загружает критические шрифты и лениво загружает остальные
 */
export default function FontOptimizer() {
  useEffect(() => {
    // Предварительно загружаем шрифты
    preloadFonts(projectFonts);

    // Загружаем шрифты, когда они нужны
    loadFontsWhenNeeded(projectFontFamilies);

    // Добавляем класс для отображения контента после загрузки шрифтов
    document.documentElement.classList.add('fonts-loaded');
  }, []);

  // Этот компонент не рендерит никакой UI
  return null;
}
