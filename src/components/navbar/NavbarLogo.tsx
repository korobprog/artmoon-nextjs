'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LOGO_SIZE, SMALL_MOBILE_BREAKPOINT } from './navbarConstants';
import { NAVBAR_STYLES } from './navbarStyles';

interface NavbarLogoProps {
  isScrolled: boolean;
  width: number;
  mounted: boolean;
}

/**
 * Компонент логотипа для навигационной панели
 * Отображает разные версии логотипа в зависимости от размера экрана и прокрутки
 */
const NavbarLogo: React.FC<NavbarLogoProps> = ({
  isScrolled,
  width,
  mounted,
}) => {
  // Если компонент не смонтирован или ширина не определена, не рендерим
  if (!mounted || width === 0) {
    return null;
  }

  // Определяем стили в зависимости от состояния прокрутки и размера экрана
  const logoContainerStyle = {
    opacity: isScrolled ? 0 : 1,
    maxHeight: isScrolled ? '0' : '230px',
    overflow: 'hidden',
  };

  const logoPositionStyle = {
    bottom: NAVBAR_STYLES.logo.position.bottom,
    transform:
      width <= SMALL_MOBILE_BREAKPOINT
        ? NAVBAR_STYLES.logo.transform.mobile
        : NAVBAR_STYLES.logo.transform.desktop,
  };

  const logoImageStyle = {
    maxWidth:
      width <= SMALL_MOBILE_BREAKPOINT
        ? NAVBAR_STYLES.logo.size.mobile
        : NAVBAR_STYLES.logo.size.desktop,
  };

  // Логотип, который отображается до прокрутки
  return (
    <div
      className="flex-grow flex relative transition-all duration-500 ease-in-out"
      style={logoContainerStyle}
    >
      <Link href="/" className="block">
        <div
          className="flex justify-center absolute w-full"
          style={logoPositionStyle}
        >
          <Image
            key={
              width <= SMALL_MOBILE_BREAKPOINT ? 'mobile-logo' : 'desktop-logo'
            }
            src={
              width <= SMALL_MOBILE_BREAKPOINT
                ? '/styles/logo-mob.png'
                : '/styles/logo.png'
            }
            alt="Art Moon Logo"
            width={LOGO_SIZE.width}
            height={LOGO_SIZE.height}
            className="object-contain will-change-contents"
            style={logoImageStyle}
            priority
            loading="eager"
          />
        </div>
      </Link>
    </div>
  );
};

// Используем memo для предотвращения ненужных перерендеров
export default memo(NavbarLogo);
