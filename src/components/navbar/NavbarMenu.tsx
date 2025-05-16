'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { MENU_ITEMS } from './navbarConstants';

interface NavbarMenuProps {
  isMobile: boolean;
  width: number;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  openDrawer: boolean;
}

/**
 * Компонент меню навигации
 * Отображает десктопное меню или кнопку бургера для мобильного меню
 */
const NavbarMenu: React.FC<NavbarMenuProps> = ({
  isMobile,
  width,
  toggleDrawer,
  closeDrawer,
  openDrawer,
}) => {
  return (
    <div className="flex justify-between items-center w-full h-full z-10 absolute bottom-0 left-0 px-4">
      {/* Левая группа кнопок */}
      <div className="flex space-x-8">
        {(!isMobile || width === 0) &&
          MENU_ITEMS.slice(0, 2).map((item) => (
            <Link
              href={item.href}
              key={item.text}
              className="text-white hover:text-purple-300 transition-colors duration-300 font-georgia-bold text-xl py-2"
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
          MENU_ITEMS.slice(2).map((item) => (
            <Link
              href={item.href}
              key={item.text}
              className="text-white hover:text-purple-300 transition-colors duration-300 font-georgia-bold text-xl py-2"
            >
              {item.text}
            </Link>
          ))}
      </div>

      {/* Кнопка бургера - отображаем только на мобильных */}
      {isMobile && (
        <button
          onClick={openDrawer ? closeDrawer : toggleDrawer}
          aria-label="Toggle menu"
          className="text-fuchsia-700 hover:text-purple-300 focus:outline-none ml-4"
        >
          {openDrawer ? (
            <X className="h-10 w-10" />
          ) : (
            <Menu className="h-10 w-10" />
          )}
        </button>
      )}
    </div>
  );
};

// Экспортируем меню с мемоизацией для предотвращения ненужных перерендеров
export default memo(NavbarMenu);
