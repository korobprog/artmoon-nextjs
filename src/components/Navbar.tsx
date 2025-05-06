'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

// Выносим хуки за пределы компонента в соответствии с правилами хуков React
const useWindowSize = () => {
  // Получаем сохраненные размеры из localStorage, если они есть
  const getInitialSize = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedSize = localStorage.getItem('windowSize');
        if (savedSize) {
          const parsed = JSON.parse(savedSize);
          return {
            width: parsed.width || 0,
            height: parsed.height || 0,
            isMobile: parsed.width <= 900,
            isSmallMobile: parsed.width < 515,
            isClient: true,
          };
        }
      } catch (e) {
        console.error('Error reading from localStorage:', e);
      }
    }
    return {
      width: 0,
      height: 0,
      isMobile: false,
      isSmallMobile: false,
      isClient: false,
    };
  };

  // Используем сохраненные значения как начальные
  const [windowSize, setWindowSize] = useState(getInitialSize);

  useEffect(() => {
    // Этот код выполняется только на клиенте
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newIsSmallMobile = width < 515;
      const isMobile = width <= 900;

      const newSize = {
        width: width,
        height: height,
        isMobile: isMobile,
        isSmallMobile: newIsSmallMobile,
        isClient: true,
      };

      console.log(
        'Window resized:',
        width,
        'isSmallMobile:',
        newIsSmallMobile,
        'isMobile:',
        isMobile
      );

      // Сохраняем размеры в localStorage
      try {
        localStorage.setItem('windowSize', JSON.stringify({ width, height }));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }

      setWindowSize(newSize);
    };

    // Вызываем сразу при монтировании
    handleResize();
    console.log(
      'useWindowSize effect executed, initial width:',
      window.innerWidth
    );

    window.addEventListener('resize', handleResize);
    return () => {
      console.log('useWindowSize cleanup, removing resize listener');
      window.removeEventListener('resize', handleResize);
    };
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
  const [mounted, setMounted] = useState(false);

  // Получаем размеры окна и позицию прокрутки
  const { isMobile, width, isClient } = useWindowSize();
  const { isScrolled, scrollY } = useScrollPosition();

  // Устанавливаем флаг mounted после первого рендера
  useEffect(() => {
    setMounted(true);
    console.log(
      'Navbar mounted, width:',
      width,
      'isMobile:',
      isMobile,
      'isClient:',
      isClient
    );
  }, []);

  // Логируем изменения ширины экрана
  useEffect(() => {
    if (mounted) {
      console.log('Width changed:', width, 'isMobile:', isMobile);
    }
  }, [width, isMobile, mounted]);

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
        {/* Основной контейнер с flex-структурой */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col relative">
          {/* Верхняя часть с логотипом и меню */}
          <div className="flex flex-col h-full">
            {/* Логотип - виден только когда не прокручено */}
            <div
              className="flex-grow flex relative transition-all duration-500 ease-in-out"
              style={{
                opacity: isScrolled ? 0 : 1,
                maxHeight: isScrolled ? '0' : '230px',
                overflow: 'hidden',
              }}
            >
              {mounted && width > 0 && (
                <Link href="/" className="block">
                  <div
                    className="flex justify-center absolute w-full"
                    style={{
                      bottom: '1px',
                      transform:
                        width <= 516 ? 'translateY(-10px)' : 'translateY(10px)', // Поднимаем логотип для мобильного вида
                    }}
                    ref={(el) => {
                      if (el && mounted) {
                        console.log(
                          'Logo container (flex): width:',
                          width,
                          'isMobile:',
                          width <= 516
                        );
                      }
                    }}
                  >
                    <Image
                      key={width <= 516 ? 'mobile-logo' : 'desktop-logo'}
                      src={
                        width <= 516
                          ? '/styles/logo-mob.png'
                          : '/styles/logo.png'
                      }
                      alt="Art Moon Logo"
                      width={logoSize.width}
                      height={logoSize.height}
                      className="object-contain will-change-contents"
                      style={{
                        maxWidth: width <= 516 ? '430px' : '450px',
                      }}
                      priority
                      onLoad={() => {
                        console.log(
                          'Logo image loaded (flex):',
                          'type:',
                          width <= 516 ? 'mobile' : 'desktop',
                          'maxWidth:',
                          width <= 516 ? '380px' : '400px'
                        );
                      }}
                    />
                  </div>
                </Link>
              )}
            </div>

            {/* Текст, который появляется при прокрутке */}
            <div
              className="absolute left-0 w-full flex justify-center items-center transition-all duration-500 ease-in-out"
              style={{
                opacity: isScrolled ? 1 : 0,
                transform: isScrolled ? 'translateY(-50%)' : 'translateY(20px)',
                pointerEvents: isScrolled ? 'auto' : 'none',
                zIndex: 5,
                top: '50%',
              }}
            >
              <h1 className="text-white text-2xl md:text-3xl font-serif italic tracking-wider">
                Art<span className="font-normal">«MOON»</span>
              </h1>
            </div>

            {/* Меню на одном уровне с полосой меню - с улучшенной видимостью */}
            <div className="flex justify-between items-center w-full h-full z-10 absolute bottom-0 left-0 px-4">
              {/* Левая группа кнопок */}
              <div className="flex space-x-8">
                {(!isMobile || width === 0) &&
                  menuItems.slice(0, 2).map((item) => (
                    <Link
                      href={item.href}
                      key={item.text}
                      className="text-white hover:text-purple-300 transition-colors duration-300 font-geist-sans text-xl font-bold py-2"
                    >
                      {item.text}
                    </Link>
                  ))}
              </div>

              {/* Пустой центральный элемент для сохранения структуры flex */}
              <div className="flex-grow"></div>

              {/* Правая группа кнопок */}
              <div className="flex space-x-8">
                {(!isMobile || width === 0) &&
                  menuItems.slice(2).map((item) => (
                    <Link
                      href={item.href}
                      key={item.text}
                      className="text-white hover:text-purple-300 transition-colors duration-300 font-geist-sans text-xl font-bold py-2"
                    >
                      {item.text}
                    </Link>
                  ))}
              </div>

              {/* Кнопка бургера - отображаем только после монтирования и на мобильных */}
              {mounted && isMobile && (
                <button
                  onClick={toggleDrawer}
                  aria-label="Toggle menu"
                  className="text-white hover:text-purple-300 focus:outline-none ml-4"
                >
                  {openDrawer ? (
                    <X className="h-10 w-10" />
                  ) : (
                    <Menu className="h-10 w-10" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Мобильное меню - отображаем только после монтирования, на мобильных и когда открыто */}
      {mounted && isMobile && openDrawer && (
        <div
          className="fixed inset-0 bg-opacity-10 backdrop-blur-md z-40"
          onClick={() => setOpenDrawer(false)} // Close menu when clicking on the black overlay
        >
          <div
            ref={drawerRef}
            className={`fixed right-0 w-full z-50 transition-all duration-500 ease-in-out ${
              isScrolled ? 'top-[80px]' : 'top-[230px]'
            }`}
            style={{
              // Добавляем логирование позиции мобильного меню
              top: isScrolled ? '80px' : '230px',
            }}
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
      )}

      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled ? 'h-[80px]' : 'h-[230px]'
        }`}
      ></div>
    </>
  );
}
