'use client';

import { useEffect } from 'react';
import { loadScriptsParallel } from '@/utils/scriptOptimization';

/**
 * Компонент для оптимизации загрузки скриптов
 * Загружает критические скрипты сразу, а некритические - с задержкой
 */
export default function ScriptOptimizer() {
  useEffect(() => {
    // Функция для загрузки некритических скриптов с задержкой
    const loadNonCriticalScripts = () => {
      // Список некритических скриптов
      const nonCriticalScripts: string[] = [
        // Здесь можно добавить скрипты аналитики, чатов и т.д.
        // Например: '/scripts/analytics.js',
      ];

      // Загружаем некритические скрипты параллельно
      if (nonCriticalScripts.length > 0) {
        loadScriptsParallel(nonCriticalScripts, {
          async: true,
          defer: true,
        }).catch((error) => {
          console.error('Failed to load non-critical scripts:', error);
        });
      }
    };

    // Определяем, когда загружать некритические скрипты
    if (document.readyState === 'complete') {
      // Если страница уже загружена, загружаем скрипты сразу
      loadNonCriticalScripts();
    } else {
      // Иначе ждем загрузки страницы
      window.addEventListener('load', loadNonCriticalScripts);

      // Очистка слушателя событий
      return () => {
        window.removeEventListener('load', loadNonCriticalScripts);
      };
    }
  }, []);

  // Этот компонент не рендерит никакой UI
  return null;
}
