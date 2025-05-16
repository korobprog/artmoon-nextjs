/**
 * Константы стилей для компонентов навигационной панели
 */

// Стили для навигационной панели
export const NAVBAR_STYLES = {
  // Стили для основного контейнера
  container: {
    scrolled: {
      top: 0,
      transition: 'top 0.3s ease-in-out',
    },
    notScrolled: {
      top: '-21px',
      transition: 'top 0.3s ease-in-out',
    },
  },

  // Стили для логотипа
  logo: {
    visible: {
      opacity: 1,
      maxHeight: '230px',
      overflow: 'hidden',
    },
    hidden: {
      opacity: 0,
      maxHeight: '0',
      overflow: 'hidden',
    },
    position: {
      bottom: '1px',
    },
    transform: {
      mobile: 'translateY(-10px)',
      desktop: 'translateY(10px)',
    },
    size: {
      mobile: '430px',
      desktop: '450px',
    },
  },

  // Стили для заголовка
  title: {
    visible: {
      opacity: 1,
      transform: 'translateY(-50%)',
    },
    hidden: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    position: {
      zIndex: 5,
      top: '50%',
    },
    pointerEvents: {
      visible: 'auto' as const,
      hidden: 'none' as const,
    },
  },

  // Стили для мобильного меню
  mobileMenu: {
    backdrop: {
      background: 'rgba(0, 0, 0, 0.5)',
      boxShadow: 'inset 0 0 100px rgba(255, 255, 255, 0.1)',
    },
    container: {
      scrolled: {
        top: '80px',
      },
      notScrolled: {
        top: '200px',
      },
    },
    menu: {
      backgroundImage: "url('/styles/fon_burger.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      backgroundRepeat: 'no-repeat',
    },
  },

  // Стили для заглушки навигационной панели
  placeholder: {
    background: '#1a1a1a',
    height: '230px',
  },
};

// Анимации для мобильного меню
export const MOBILE_MENU_ANIMATIONS = {
  menu: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  },
  backdrop: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
};
