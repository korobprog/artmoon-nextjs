'use client';

import React, { useState, useEffect } from 'react';
import useStylesLoaded from '@/hooks/useStylesLoaded';
import Navbar from '@/components/Navbar';

// Ресурсы, которые нужно отслеживать для загрузки
const CRITICAL_RESOURCES = [
  '/styles/menu-bg.png',
  '/styles/logo.png',
  '/styles/logo-mob.png',
  '/font/georgia.ttf',
];

/**
 * Компонент-обертка для навигационной панели
 * Отображает спиннер во время загрузки стилей и ресурсов
 */
const NavbarWrapper: React.FC = () => {
  // Используем хук для отслеживания загрузки стилей
  const { stylesLoaded } = useStylesLoaded(CRITICAL_RESOURCES);

  // Состояние для отслеживания готовности компонента к отображению
  const [isReady, setIsReady] = useState(false);

  // Состояние для отслеживания времени загрузки
  const [loadStartTime] = useState(Date.now());

  // Устанавливаем флаг готовности после загрузки стилей
  // с небольшой задержкой для плавности
  useEffect(() => {
    if (stylesLoaded) {
      // Сразу устанавливаем готовность без задержки
      setIsReady(true);
      return () => {};
    }

    // Устанавливаем таймаут безопасности - если стили не загрузились за 5 секунд,
    // все равно показываем основной компонент
    const safetyTimer = setTimeout(() => {
      if (!isReady) {
        console.warn(
          'Styles loading timeout exceeded. Forcing navigation display.'
        );
        setIsReady(true);
      }
    }, 5000);

    return () => clearTimeout(safetyTimer);
  }, [stylesLoaded, loadStartTime, isReady]);

  // Если стили не загружены, отображаем пустой контейнер с высотой навигации
  if (!isReady) {
    return <div className="h-[230px]"></div>;
  }

  // Если стили загружены, отображаем основной компонент
  return <Navbar />;
};

export default NavbarWrapper;
