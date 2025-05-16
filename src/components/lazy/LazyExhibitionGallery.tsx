'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Ленивая загрузка компонента ExhibitionGallery
const ExhibitionGallery = dynamic(() => import('../ExhibitionGallery'), {
  loading: () => <ExhibitionGalleryPlaceholder />,
  ssr: false, // Отключаем SSR для этого компонента
});

// Компонент-заглушка, который отображается во время загрузки
const ExhibitionGalleryPlaceholder = () => {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="relative overflow-hidden rounded-lg shadow-md"
            style={{
              backgroundColor: '#f5f5f5',
              border: '1px solid #e0e0e0',
              height: '300px',
            }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Обертка для ленивой загрузки компонента ExhibitionGallery
 */
export default function LazyExhibitionGallery() {
  return (
    <Suspense fallback={<ExhibitionGalleryPlaceholder />}>
      <ExhibitionGallery />
    </Suspense>
  );
}
