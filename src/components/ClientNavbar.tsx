'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Динамический импорт Navbar с отключенным SSR
const Navbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false,
  loading: () => null,
});

export default function ClientNavbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Рендерим Navbar только на клиенте после монтирования
  if (!mounted) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Navbar />
    </Suspense>
  );
}
