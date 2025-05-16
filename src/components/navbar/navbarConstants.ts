/**
 * Константы для компонентов навигационной панели
 */

// Элементы меню
export const MENU_ITEMS = [
  { text: 'Главная', href: '/' },
  { text: 'Художники', href: '/artists' },
  { text: 'Галерея', href: '/gallery' },
  { text: 'Контакты', href: '/contacts' },
];

// Размеры логотипа
export const LOGO_SIZE = {
  width: 814,
  height: 414,
};

// Пороговые значения для мобильных устройств
export const MOBILE_BREAKPOINT = 900;
export const SMALL_MOBILE_BREAKPOINT = 515;

// Высота навигационной панели
export const NAVBAR_HEIGHT = {
  scrolled: '80px',
  notScrolled: '230px',
};

// Порог прокрутки для изменения состояния навигационной панели
export const SCROLL_THRESHOLD = 50;
