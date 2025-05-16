'use client';

import React, { memo, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MENU_ITEMS } from './navbarConstants';
import { NAVBAR_STYLES, MOBILE_MENU_ANIMATIONS } from './navbarStyles';

interface MobileMenuProps {
  isOpen: boolean;
  isScrolled: boolean;
  onClose: () => void;
}

/**
 * Компонент мобильного меню
 * Отображается при нажатии на кнопку бургера на мобильных устройствах
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  isScrolled,
  onClose,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90]"
          style={NAVBAR_STYLES.mobileMenu.backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={MOBILE_MENU_ANIMATIONS.backdrop}
          onClick={onClose}
        >
          <div
            ref={drawerRef}
            className="fixed right-0 w-full z-[95]"
            style={
              isScrolled
                ? NAVBAR_STYLES.mobileMenu.container.scrolled
                : NAVBAR_STYLES.mobileMenu.container.notScrolled
            }
          >
            <div className="flex justify-end pr-4">
              <motion.div
                className="flex flex-col space-y-4 rounded-lg p-6 shadow-xl min-w-[280px]"
                style={NAVBAR_STYLES.mobileMenu.menu}
                onClick={(e) => e.stopPropagation()}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={MOBILE_MENU_ANIMATIONS.menu}
              >
                {MENU_ITEMS.map((item) => (
                  <Link
                    href={item.href}
                    key={item.text}
                    className="text-white hover:text-purple-300 px-4 py-3 text-lg font-georgia transition-colors duration-300"
                    onClick={onClose}
                  >
                    {item.text}
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Экспортируем с мемоизацией для предотвращения ненужных перерендеров
export default memo(MobileMenu);
