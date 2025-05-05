'use client';

import Link from 'next/link';

export default function FooterPage() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
          {/* Навигационные ссылки */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
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
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base"
            >
              Контакты
            </Link>
          </div>

          {/* Контактная информация */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-right">
            <a
              href="tel:+74956425335"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base flex items-center justify-center sm:justify-end"
            >
              тел.: +7 (495) 642-53-35{' '}
              <span className="ml-2 inline-flex items-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.2 5.9l-8.2 8.2-4.2-4.2-1.4 1.4 5.6 5.6 9.6-9.6-1.4-1.4z" />
                </svg>
              </span>
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
        <div className="mt-4 text-center text-gray-400 font-geist-sans text-xs sm:text-sm">
          © Art-moon.ru
        </div>
      </div>
    </footer>
  );
}
