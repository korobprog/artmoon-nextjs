'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavbarWrapper from '@/components/navbar/NavbarWrapper';

export default function ClientNavbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); // Получаем текущий путь для отладки

  // Эффект для сброса позиции прокрутки при обновлении страницы
  useEffect(() => {
    // Сбрасываем позицию прокрутки при монтировании компонента
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    // Проверяем сохраненные данные из localStorage
    try {
      localStorage.getItem('windowSize');
    } catch {
      // Ошибка чтения из localStorage
    }
  }, [pathname]);

  // Логируем при размонтировании
  useEffect(() => {
    return () => {
      // Очистка при размонтировании
    };
  }, [pathname]);

  // Рендерим NavbarWrapper только на клиенте после монтирования
  if (!mounted) {
    return null;
  }

  return <NavbarWrapper />;
}
