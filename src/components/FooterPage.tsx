'use client';

import Link from 'next/link';

export default function FooterPage() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-4 w-screen relative -mx-[10vw] -mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
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
              Художники
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
                Телефон и WhatsApp:
              </span>
              <span className="ml-2 inline-flex items-center">
                +7 (495) 642-53-35
              </span>
            </a>
            <a
              href="mailto:info@art-moon.ru"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-geist-sans text-sm sm:text-base"
            ></a>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-4 sm:mt-3 text-center text-gray-400 font-geist-sans text-xs sm:text-sm">
          © Art-moon.ru
        </div>
      </div>
    </footer>
  );
}
