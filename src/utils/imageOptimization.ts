/**
 * Утилиты для оптимизации загрузки изображений
 */

/**
 * Опции для ленивой загрузки изображений
 */
interface LazyLoadImageOptions {
  rootMargin?: string;
  threshold?: number;
  loadingClass?: string;
  loadedClass?: string;
  errorClass?: string;
}

/**
 * Инициализирует ленивую загрузку для всех изображений с атрибутом data-src
 * @param options Опции для ленивой загрузки
 */
export function initLazyLoadImages(options: LazyLoadImageOptions = {}): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // Если IntersectionObserver не поддерживается, загружаем все изображения сразу
    loadAllImages();
    return;
  }

  const {
    rootMargin = '200px 0px',
    threshold = 0.01,
    loadingClass = 'lazy-loading',
    loadedClass = 'lazy-loaded',
    errorClass = 'lazy-error',
  } = options;

  // Создаем наблюдатель
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          const sizes = img.dataset.sizes;

          if (src) {
            img.src = src;
          }

          if (srcset) {
            img.srcset = srcset;
          }

          if (sizes) {
            img.sizes = sizes;
          }

          img.classList.remove(loadingClass);
          img.classList.add(loadedClass);

          // Обработчик ошибки загрузки
          img.onerror = () => {
            img.classList.remove(loadingClass);
            img.classList.add(errorClass);
          };

          // Прекращаем наблюдение за этим изображением
          observer.unobserve(img);
        }
      });
    },
    { rootMargin, threshold }
  );

  // Находим все изображения с атрибутом data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach((img) => {
    img.classList.add(loadingClass);
    observer.observe(img);
  });
}

/**
 * Загружает все изображения с атрибутом data-src
 * Используется как запасной вариант, если IntersectionObserver не поддерживается
 */
function loadAllImages(): void {
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach((img) => {
    const imgElement = img as HTMLImageElement;
    if (imgElement.dataset.src) {
      imgElement.src = imgElement.dataset.src;
    }
    if (imgElement.dataset.srcset) {
      imgElement.srcset = imgElement.dataset.srcset;
    }
    if (imgElement.dataset.sizes) {
      imgElement.sizes = imgElement.dataset.sizes;
    }
  });
}

/**
 * Предварительно загружает критические изображения
 * @param imagePaths Массив путей к изображениям для предварительной загрузки
 */
export function preloadCriticalImages(imagePaths: string[]): void {
  if (typeof window === 'undefined') return;

  imagePaths.forEach((path) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });
}

/**
 * Критические изображения проекта, которые нужно загрузить в первую очередь
 */
export const criticalImages = [
  '/styles/home-image.jpg',
  '/styles/pattern.png',
  '/styles/logo.png',
  '/styles/curtains-left.png',
  '/styles/curtains-right.png',
];
