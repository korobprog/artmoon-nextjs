/**
 * Утилиты для оптимизации загрузки стилей
 */

/**
 * Опции для загрузки стилей
 */
interface LoadStyleOptions {
  id?: string;
  media?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Динамически загружает стили
 * @param href URL стилей
 * @param options Опции загрузки
 * @returns Promise, который разрешается, когда стили загружены
 */
export function loadStyle(
  href: string,
  options: LoadStyleOptions = {}
): Promise<HTMLLinkElement> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('loadStyle can only be used in browser environment'));
      return;
    }

    // Проверяем, существует ли уже ссылка с таким ID или href
    const existingLink = options.id
      ? document.getElementById(options.id)
      : document.querySelector(`link[href="${href}"]`);

    if (existingLink) {
      resolve(existingLink as HTMLLinkElement);
      return;
    }

    // Создаем новый элемент link
    const link = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    link.type = 'text/css';

    // Применяем опции
    if (options.id) link.id = options.id;
    if (options.media) link.media = options.media;

    // Обработчики событий
    link.onload = () => {
      if (options.onLoad) options.onLoad();
      resolve(link);
    };

    link.onerror = (error) => {
      if (options.onError) options.onError(error as unknown as Error);
      reject(new Error(`Failed to load style: ${href}`));
    };

    // Добавляем ссылку в DOM
    document.head.appendChild(link);
  });
}

/**
 * Предварительно загружает стили без их применения
 * @param href URL стилей
 * @returns Promise, который разрешается, когда стили предварительно загружены
 */
export function preloadStyle(href: string): Promise<HTMLLinkElement> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('preloadStyle can only be used in browser environment'));
      return;
    }

    // Проверяем, существует ли уже ссылка с таким href
    const existingLink = document.querySelector(
      `link[href="${href}"][rel="preload"]`
    );

    if (existingLink) {
      resolve(existingLink as HTMLLinkElement);
      return;
    }

    // Создаем новый элемент link для предварительной загрузки
    const link = document.createElement('link');
    link.href = href;
    link.rel = 'preload';
    link.as = 'style';

    // Обработчики событий
    link.onload = () => {
      resolve(link);
    };

    link.onerror = () => {
      reject(new Error(`Failed to preload style: ${href}`));
    };

    // Добавляем ссылку в DOM
    document.head.appendChild(link);
  });
}

/**
 * Загружает стили только для печати
 * @param href URL стилей
 * @param options Опции загрузки
 * @returns Promise, который разрешается, когда стили загружены
 */
export function loadPrintStyle(
  href: string,
  options: LoadStyleOptions = {}
): Promise<HTMLLinkElement> {
  return loadStyle(href, { ...options, media: 'print' });
}

/**
 * Загружает стили только для определенного размера экрана
 * @param href URL стилей
 * @param mediaQuery Медиа-запрос
 * @param options Опции загрузки
 * @returns Promise, который разрешается, когда стили загружены
 */
export function loadMediaStyle(
  href: string,
  mediaQuery: string,
  options: LoadStyleOptions = {}
): Promise<HTMLLinkElement> {
  return loadStyle(href, { ...options, media: mediaQuery });
}

/**
 * Критические стили проекта, которые нужно загрузить в первую очередь
 */
export const criticalStyles = [
  // Например: '/styles/critical.css',
];
