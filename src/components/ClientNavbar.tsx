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

  useEffect(() => {
    setMounted(true);
    console.log('ClientNavbar mounted, pathname:', pathname);
  }, [pathname]);

  // Логируем при размонтировании
  useEffect(() => {
    return () => {
      console.log('ClientNavbar unmounting, pathname:', pathname);
    };
  }, [pathname]);

  // Рендерим Navbar только на клиенте после монтирования
  if (!mounted) {
    return null;
  }

  return <MemoizedNavbar />;
}
