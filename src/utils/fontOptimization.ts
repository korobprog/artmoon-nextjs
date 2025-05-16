/**
 * Утилиты для оптимизации загрузки шрифтов
 */

/**
 * Предварительно загружает шрифты для ускорения отображения контента
 * @param fontUrls Массив URL-адресов шрифтов для предварительной загрузки
 */
export function preloadFonts(fontUrls: string[]): void {
  if (typeof window === 'undefined') return;

  fontUrls.forEach((url) => {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/ttf'; // или другой тип в зависимости от формата шрифта
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Загружает шрифты только когда они нужны
 * @param fontFamilies Массив названий семейств шрифтов для загрузки
 */
export function loadFontsWhenNeeded(fontFamilies: string[]): void {
  if (typeof window === 'undefined' || !('FontFace' in window)) return;

  // Проверяем поддержку Intersection Observer
  if (!('IntersectionObserver' in window)) {
    // Если не поддерживается, просто загружаем шрифты
    fontFamilies.forEach((family) => {
      document.documentElement.classList.add(`font-${family.toLowerCase()}`);
    });
    return;
  }

  // Создаем наблюдатель
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Когда элемент становится видимым, загружаем шрифты
          fontFamilies.forEach((family) => {
            document.documentElement.classList.add(
              `font-${family.toLowerCase()}`
            );
          });
          // Прекращаем наблюдение
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  // Начинаем наблюдение за body
  observer.observe(document.body);
}

/**
 * Шрифты проекта
 */
export const projectFonts = [
  '/font/georgia.ttf',
  '/font/georgiab.ttf',
  '/font/georgiai.ttf',
  '/font/georgiaz.ttf',
];

/**
 * Семейства шрифтов проекта
 */
export const projectFontFamilies = [
  'Georgia',
  'Georgia-Bold',
  'Georgia-Italic',
];
