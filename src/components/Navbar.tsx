'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

// Выносим хуки за пределы компонента в соответствии с правилами хуков React
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

// Хук для отслеживания прокрутки страницы
const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    isScrolled: false,
  });

  useEffect(() => {
    // Функция для обработки события прокрутки
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition({
        scrollY: currentScrollY,
        isScrolled: currentScrollY > 50, // Считаем, что прокрутка началась после 50px
      });
    };

    // Добавляем слушатель события прокрутки
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Вызываем сразу при монтировании
    handleScroll();

    // Удаляем слушатель при размонтировании
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
};

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Получаем размеры окна и позицию прокрутки
  const { isMobile, isClient } = useWindowSize();
  const { isScrolled, scrollY } = useScrollPosition();

  // Закрываем меню при прокрутке
  useEffect(() => {
    let lastScrollY = scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY && openDrawer) {
        setOpenDrawer(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openDrawer]);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const menuItems = [
    { text: 'Главная', href: '/' },
    { text: 'Художники', href: '/artists' },
    { text: 'Галерея', href: '/gallery' },
    { text: 'Контакты', href: '/contacts' },
  ];

  // Фиксированный размер логотипа
  const logoSize = {
    width: 814,
    height: 414,
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full bg-[url('/styles/menu-bg.png')] bg-repeat-x bg-center shadow-lg z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? 'h-[80px]' : 'h-[230px]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative">
          {/* Текст, который появляется при прокрутке */}
          <div
            className="absolute left-0 w-full flex justify-center items-center transition-all duration-500 ease-in-out"
            style={{
              opacity: isScrolled ? 1 : 0,
              transform: isScrolled ? 'translateY(0)' : 'translateY(20px)',
              pointerEvents: isScrolled ? 'auto' : 'none',
            }}
          >
            <h1 className="text-white text-2xl md:text-3xl font-serif italic tracking-wider">
              Art Boutique <span className="font-normal">«MOON»</span>
            </h1>
          </div>
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

          {/* Логотип по центру - используем абсолютное позиционирование с расчетом положения */}
          <div
            className="absolute left-0 w-full transition-all duration-500 ease-in-out"
            style={{
              top: -140,
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? 'translateY(-20px)' : 'translateY(0)',
              pointerEvents: isScrolled ? 'none' : 'auto',
            }}
          >
            <div className="flex justify-center">
              <Link href="/">
                <div
                  className="relative"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    marginTop: '115px', // Половина высоты nav (230px / 2)
                  }}
                >
                  <Image
                    src="/styles/logo.png"
                    alt="Art Moon Logo"
                    width={logoSize.width}
                    height={logoSize.height}
                    className="object-contain w-auto"
                    priority
                  />
                </div>
              </Link>
            </div>
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
          className="fixed inset-0 bg-opacity-10 backdrop-blur-md z-40"
          onClick={() => setOpenDrawer(false)} // Close menu when clicking on the black overlay
        >
          <div
            ref={drawerRef}
            className={`fixed right-0 w-full z-50 transition-all duration-500 ease-in-out ${
              isScrolled ? 'top-[80px]' : 'top-[230px]'
            }`}
          >
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

      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled ? 'h-[80px]' : 'h-[230px]'
        }`}
      ></div>
    </>
  );
}
