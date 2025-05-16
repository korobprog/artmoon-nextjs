/**
 * Утилиты для оптимизации загрузки скриптов
 */

/**
 * Опции для загрузки скрипта
 */
interface LoadScriptOptions {
  async?: boolean;
  defer?: boolean;
  id?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Динамически загружает скрипт
 * @param src URL скрипта
 * @param options Опции загрузки
 * @returns Promise, который разрешается, когда скрипт загружен
 */
export function loadScript(
  src: string,
  options: LoadScriptOptions = {}
): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('loadScript can only be used in browser environment'));
      return;
    }

    // Проверяем, существует ли уже скрипт с таким ID или src
    const existingScript = options.id
      ? document.getElementById(options.id)
      : document.querySelector(`script[src="${src}"]`);

    if (existingScript) {
      resolve(existingScript as HTMLScriptElement);
      return;
    }

    // Создаем новый элемент script
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';

    // Применяем опции
    if (options.async) script.async = true;
    if (options.defer) script.defer = true;
    if (options.id) script.id = options.id;

    // Обработчики событий
    script.onload = () => {
      if (options.onLoad) options.onLoad();
      resolve(script);
    };

    script.onerror = (error) => {
      if (options.onError) options.onError(error as unknown as Error);
      reject(new Error(`Failed to load script: ${src}`));
    };

    // Добавляем скрипт в DOM
    document.head.appendChild(script);
  });
}

/**
 * Загружает несколько скриптов последовательно
 * @param scripts Массив URL скриптов
 * @param options Опции загрузки
 * @returns Promise, который разрешается, когда все скрипты загружены
 */
export function loadScriptsSequentially(
  scripts: string[],
  options: LoadScriptOptions = {}
): Promise<HTMLScriptElement[]> {
  return scripts.reduce(
    (promise, src) =>
      promise.then((loadedScripts) =>
        loadScript(src, options).then((script) => [...loadedScripts, script])
      ),
    Promise.resolve([] as HTMLScriptElement[])
  );
}

/**
 * Загружает несколько скриптов параллельно
 * @param scripts Массив URL скриптов
 * @param options Опции загрузки
 * @returns Promise, который разрешается, когда все скрипты загружены
 */
export function loadScriptsParallel(
  scripts: string[],
  options: LoadScriptOptions = {}
): Promise<HTMLScriptElement[]> {
  return Promise.all(scripts.map((src) => loadScript(src, options)));
}

/**
 * Загружает скрипт только когда он нужен (по требованию)
 * @param src URL скрипта
 * @param options Опции загрузки
 * @returns Функция, которая загружает скрипт при вызове
 */
export function createLazyScriptLoader(
  src: string,
  options: LoadScriptOptions = {}
): () => Promise<HTMLScriptElement> {
  let scriptPromise: Promise<HTMLScriptElement> | null = null;

  return () => {
    if (!scriptPromise) {
      scriptPromise = loadScript(src, options);
    }
    return scriptPromise;
  };
}
