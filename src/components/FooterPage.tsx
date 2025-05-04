'use client';

import Link from 'next/link';

export default function FooterPage() {
  return (
    <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600 font-serif">
      <div className="flex justify-center space-x-4 mb-2">
        <Link
          href="/"
          className="hover:text-gray-800 hover:underline cursor-pointer"
        >
          Главная
        </Link>
        <Link
          href="/gallery"
          className="hover:text-gray-800 hover:underline cursor-pointer"
        >
          Художнику
        </Link>
        <Link
          href="/gallery"
          className="hover:text-gray-800 hover:underline cursor-pointer"
        >
          Галерея
        </Link>
        <Link
          href="/contacts"
          className="hover:text-gray-800 hover:underline cursor-pointer"
        >
          Контакты
        </Link>
        <a
          href="tel:+74956425335"
          className="hover:text-gray-800 hover:underline cursor-pointer"
        >
          тел.: +7 (495) 642-53-35
        </a>
        <a
          href="mailto:info@art-moon.ru"
          className="hover:text-gray-800 hover:underline cursor-pointer"
        >
          info@art-moon.ru
        </a>
      </div>
      <div className="text-gray-500">© Art-moon.ru</div>
    </footer>
  );
}
