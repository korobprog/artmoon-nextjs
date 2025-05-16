'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Ленивая загрузка компонента HomeImage
const HomeImage = dynamic(() => import('./HomeImage'), {
  loading: () => <HomeImagePlaceholder />,
  ssr: false, // Отключаем SSR для этого компонента
});

// Компонент-заглушка, который отображается во время загрузки
const HomeImagePlaceholder = () => {
  return (
    <div
      className="relative w-full max-w-4xl mx-auto mb-0 mt-1 overflow-hidden rounded-lg shadow-2xl"
      style={{
        height: '600px',
        backgroundColor: '#1a1a1a',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2), 0 0 15px rgba(0,0,0,0.1)',
      }}
    />
  );
};

/**
 * Обертка для ленивой загрузки компонента HomeImage
 */
export default function LazyHomeImage() {
  return (
    <Suspense fallback={<HomeImagePlaceholder />}>
      <HomeImage />
    </Suspense>
  );
}
