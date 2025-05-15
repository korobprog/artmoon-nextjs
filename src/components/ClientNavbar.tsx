'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Динамический импорт Navbar с отключенным SSR и кэшированием
const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false,
  loading: () => null,
});

// Создаем компонент с мемоизацией для предотвращения перемонтирования
const MemoizedNavbar = () => {
  return (
    <Suspense fallback={null}>
      <Navbar />
    </Suspense>
  );
};

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

  // Рендерим Navbar только на клиенте после монтирования
  if (!mounted) {
    return null;
  }

  return <MemoizedNavbar />;
}
