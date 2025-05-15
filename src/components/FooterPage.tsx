'use client';

import Link from 'next/link';

export default function FooterPage() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-4 w-[102vw] relative -mt-4 -mx-[1vw] overflow-x-hidden">
      <div className="w-full mx-auto px-0">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-12 px-4 sm:px-6 lg:px-8">
          {/* Навигационные ссылки */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 text-center w-full sm:w-auto items-center">
            <Link
              href="/"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-georgia text-sm sm:text-base"
            >
              Главная
            </Link>
            <Link
              href="/artists"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-georgia text-sm sm:text-base"
            >
              Художники
            </Link>
            <Link
              href="/gallery"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-georgia text-sm sm:text-base"
            >
              Галерея
            </Link>
            <Link
              href="/contacts"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-georgia text-sm sm:text-base whitespace-nowrap"
            >
              Контакты
            </Link>
          </div>

          {/* Контактная информация */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 text-center w-full sm:w-auto items-center">
            <a
              href="tel:+74956425335"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-georgia text-sm sm:text-base flex items-center justify-center whitespace-nowrap"
            >
              <span className="inline-flex items-center">
                Телефон и WhatsApp:
              </span>
              <span className="ml-2 inline-flex items-center">
                +7 (495) 642-53-35
              </span>
            </a>
            <a
              href="mailto:info@art-moon.ru"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-georgia text-sm sm:text-base"
            ></a>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-4 sm:mt-3 text-center text-gray-400 font-georgia text-xs sm:text-sm w-full px-4">
          © Art-moon.ru
        </div>
      </div>
    </footer>
  );
}
