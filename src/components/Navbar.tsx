'use client';

import React, { useState, useEffect, memo } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Импортируем кастомные хуки
import useWindowSize from '../hooks/useWindowSize';
import useScrollPosition from '../hooks/useScrollPosition';

// Импортируем компоненты навигационной панели
import NavbarLogo from './navbar/NavbarLogo';
import NavbarTitle from './navbar/NavbarTitle';
import NavbarMenu from './navbar/NavbarMenu';
import MobileMenu from './navbar/MobileMenu';
import { NAVBAR_STYLES } from './navbar/navbarStyles';

// Ленивая загрузка компонента HomeImage
const LazyHomeImage = dynamic(() => import('./LazyHomeImage'), {
  ssr: false,
  loading: () => null,
});

/**
 * Основной компонент навигационной панели
 * Объединяет все подкомпоненты и управляет их состоянием
 */
function Navbar() {
  // Состояние для мобильного меню
  const [openDrawer, setOpenDrawer] = useState(false);

  // Состояние для отслеживания монтирования компонента
  const [mounted, setMounted] = useState(false);

  // Получаем текущий путь
  const pathname = usePathname();

  // Получаем размеры окна и позицию прокрутки из кастомных хуков
  const { isMobile, width } = useWindowSize();
  const { isScrolled } = useScrollPosition();

  // Проверяем, находимся ли мы на домашней странице
  const isHomePage = pathname === '/';

  // Устанавливаем флаг mounted после первого рендера
  useEffect(() => {
    setMounted(true);
  }, []);

  // Закрываем меню при прокрутке
  useEffect(() => {
    if (openDrawer) {
      const handleScroll = () => {
        setOpenDrawer(false);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [openDrawer]);

  // Функция для переключения мобильного меню
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // Определяем стили в зависимости от состояния прокрутки
  const navbarStyle = isScrolled
    ? NAVBAR_STYLES.container.scrolled
    : NAVBAR_STYLES.container.notScrolled;

  return (
    <>
      <nav
        className={`fixed left-0 w-full bg-[url('/styles/menu-bg.png')] bg-repeat-x bg-center shadow-lg z-[100] transition-all duration-500 ease-in-out ${
          isScrolled ? 'h-[80px]' : 'h-[230px]'
        }`}
        style={navbarStyle}
      >
        {/* Основной контейнер с flex-структурой */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col relative">
          {/* Верхняя часть с логотипом и меню */}
          <div className="flex flex-col h-full">
            {/* Логотип - виден только когда не прокручено */}
            <NavbarLogo
              isScrolled={isScrolled}
              width={width}
              mounted={mounted}
            />

            {/* Текст, который появляется при прокрутке */}
            <NavbarTitle isScrolled={isScrolled} />

            {/* Меню навигации */}
            <NavbarMenu
              isMobile={isMobile}
              width={width}
              toggleDrawer={toggleDrawer}
              closeDrawer={() => setOpenDrawer(false)}
              openDrawer={openDrawer}
            />
          </div>
        </div>
      </nav>

      {/* Мобильное меню */}
      <MobileMenu
        isOpen={mounted && isMobile && openDrawer}
        isScrolled={isScrolled}
        onClose={() => setOpenDrawer(false)}
      />

      {/* Пространство под навигационной панелью */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isScrolled ? 'h-[80px]' : 'h-[230px]'
        }`}
      ></div>

      {/* Добавляем HomeImage компонент только на домашней странице и когда не прокручено */}
      {!isScrolled && isHomePage && (
        <div
          className="relative w-full max-w-4xl mx-auto"
          style={{ marginTop: '-80px', zIndex: -30 }}
        >
          <LazyHomeImage />
        </div>
      )}
    </>
  );
}

// Экспортируем с мемоизацией для предотвращения ненужных перерендеров
export default memo(Navbar);
