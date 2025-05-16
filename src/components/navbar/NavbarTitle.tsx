'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { NAVBAR_STYLES } from './navbarStyles';

interface NavbarTitleProps {
  isScrolled: boolean;
}

/**
 * Компонент заголовка, который появляется при прокрутке
 */
const NavbarTitle: React.FC<NavbarTitleProps> = ({ isScrolled }) => {
  // Определяем стили в зависимости от состояния прокрутки
  const titleStyle = {
    ...(isScrolled ? NAVBAR_STYLES.title.visible : NAVBAR_STYLES.title.hidden),
    ...NAVBAR_STYLES.title.position,
    // Добавляем pointerEvents в объект стилей
    pointerEvents: isScrolled
      ? NAVBAR_STYLES.title.pointerEvents.visible
      : NAVBAR_STYLES.title.pointerEvents.hidden,
  };

  return (
    <div
      className="absolute left-0 w-full flex justify-center items-center transition-all duration-500 ease-in-out"
      style={titleStyle}
    >
      <Link
        href="/"
        className="cursor-pointer hover:text-purple-300 transition-colors duration-300"
      >
        <h1 className="text-white text-2xl md:text-3xl font-georgia-italic tracking-wider">
          Art<span className="font-georgia">«MOON»</span>
        </h1>
      </Link>
    </div>
  );
};

// Используем memo для предотвращения ненужных перерендеров
export default memo(NavbarTitle);
