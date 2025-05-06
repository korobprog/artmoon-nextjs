'use client';

import Link from 'next/link';

export default function FooterPage() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0 sm:space-x-6">
          {/* Навигационные ссылки */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left w-full sm:w-auto">
            <Link
              href="/"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base"
            >
              Главная
            </Link>
            <Link
              href="/artists"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base"
            >
              Художнику
            </Link>
            <Link
              href="/gallery"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base"
            >
              Галерея
            </Link>
            <Link
              href="/contacts"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base whitespace-nowrap"
            >
              Контакты
            </Link>
          </div>

          {/* Контактная информация */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-right w-full sm:w-auto">
            <a
              href="tel:+74956425335"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base flex items-center justify-center sm:justify-end whitespace-nowrap"
            >
              <span className="ml-2 inline-flex items-center">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <span className="mr-2 inline-flex items-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 00-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z" />
                </svg>
              </span>
              +7 (495) 642-53-35{' '}
            </a>
            <a
              href="mailto:info@art-moon.ru"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base"
            >
              info@art-moon.ru
            </a>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-6 sm:mt-4 text-center text-gray-400 font-geist-sans text-xs sm:text-sm">
          © Art-moon.ru
        </div>
      </div>
    </footer>
  );
}
