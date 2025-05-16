'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Ленивая загрузка компонента ArtistsList
const ArtistsList = dynamic(() => import('../ArtistsList'), {
  loading: () => <ArtistsListPlaceholder />,
  ssr: false, // Отключаем SSR для этого компонента
});

// Компонент-заглушка, который отображается во время загрузки
const ArtistsListPlaceholder = () => {
  return (
    <div className="mb-8 pb-6 border-b border-gray-700">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex flex-col items-center">
            <div
              className="relative w-20 h-20 mb-2 overflow-hidden rounded-full border-2 border-yellow-400 shadow-lg"
              style={{ backgroundColor: '#f5f5f5' }}
            />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Обертка для ленивой загрузки компонента ArtistsList
 */
export default function LazyArtistsList() {
  return (
    <Suspense fallback={<ArtistsListPlaceholder />}>
      <ArtistsList />
    </Suspense>
  );
}
