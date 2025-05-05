'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

// Выносим хук за пределы компонента в соответствии с правилами хуков React
const useWindowSize = () => {
  // Значения по умолчанию для серверного рендеринга
  const [windowSize, setWindowSize] = useState({
    width: 1200,
    height: 800,
    isMobile: false,
    isClient: false,
  });

  useEffect(() => {
    // Этот код выполняется только на клиенте
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 768,
        isClient: true,
      });
    };

    // Вызываем сразу при монтировании
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Получаем размеры окна
  const { width, height, isMobile, isClient } = useWindowSize();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const menuItems = [
    { text: 'Главная', href: '/' },
    { text: 'Художники', href: '/artists' },
    { text: 'Галерея', href: '/gallery' },
    { text: 'Контакты', href: '/contacts' },
  ];

  // Определяем размер логотипа
  const logoSize = {
    width: width >= 1090 && height >= 850 ? 350 : 300,
    height: width >= 1090 && height >= 850 ? 120 : 100,
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-32 bg-[url('/styles/menu-bg.png')] bg-cover bg-center shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          {/* Левая группа кнопок - отображаем только на клиенте и не на мобильных */}
          {isClient && !isMobile ? (
            <div className="flex space-x-6 mr-auto">
              {menuItems.slice(0, 2).map((item) => (
                <Link
                  href={item.href}
                  key={item.text}
                  className="text-white hover:text-purple-300 transition-colors duration-300 font-geist-sans text-lg font-medium"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          ) : (
            <div className="mr-auto"></div> // Пустой div для сохранения структуры при серверном рендеринге
          )}

          {/* Логотип по центру */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center top-4">
            <Link href="/">
              <Image
                src="/styles/logo.png"
                alt="Art Moon Logo"
                width={logoSize.width}
                height={logoSize.height}
                className={`object-contain ${
                  isClient && width >= 1090 ? 'max-h-32' : 'max-h-28'
                } w-auto mt-1`}
                priority
              />
            </Link>
          </div>

          {/* Правая группа кнопок - отображаем только на клиенте и не на мобильных */}
          {isClient && !isMobile ? (
            <div className="flex space-x-6 ml-auto">
              {menuItems.slice(2).map((item) => (
                <Link
                  href={item.href}
                  key={item.text}
                  className="text-white hover:text-purple-300 transition-colors duration-300 font-geist-sans text-lg font-medium"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          ) : (
            <div className="ml-auto"></div> // Пустой div для сохранения структуры при серверном рендеринге
          )}

          {/* Кнопка бургера - отображаем только на клиенте и на мобильных */}
          {isClient && isMobile ? (
            <button
              onClick={toggleDrawer}
              aria-label="Toggle menu"
              className="ml-auto mr-4 text-white hover:text-purple-300 focus:outline-none z-60"
            >
              {openDrawer ? (
                <X className="h-10 w-10" />
              ) : (
                <Menu className="h-10 w-10" />
              )}
            </button>
          ) : null}
        </div>
      </nav>

      {/* Мобильное меню - отображаем только на клиенте, на мобильных и когда открыто */}
      {isClient && isMobile && openDrawer ? (
        <div
          className="fixed inset-0 bg-opacity-30 z-40"
          onClick={() => setOpenDrawer(false)} // Close menu when clicking on the black overlay
        >
          <div ref={drawerRef} className="fixed top-32 right-0 w-full z-50">
            <div className="flex justify-end pr-4">
              <div
                className="flex flex-col space-y-4 rounded-lg p-6 shadow-xl min-w-[280px]"
                style={{
                  backgroundImage: "url('/styles/fon_burger.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на меню
              >
                {menuItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.text}
                    className="text-white hover:text-purple-300 px-4 py-3 text-lg font-geist-sans font-medium transition-colors duration-300"
                    onClick={() => setOpenDrawer(false)} // Close menu when clicking on a link
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="h-32"></div>
    </>
  );
}
