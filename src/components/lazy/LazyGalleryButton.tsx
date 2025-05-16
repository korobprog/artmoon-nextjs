'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Ленивая загрузка компонента GalleryButton
const GalleryButton = dynamic(() => import('../GalleryButton'), {
  loading: () => <GalleryButtonPlaceholder />,
  ssr: false, // Отключаем SSR для этого компонента
});

// Компонент-заглушка, который отображается во время загрузки
const GalleryButtonPlaceholder = () => {
  return (
    <div className="flex justify-center">
      <div
        className="inline-flex items-center px-8 py-4 rounded-lg"
        style={{
          width: '220px',
          height: '56px',
          backgroundColor: '#9333ea',
          opacity: 0.7,
        }}
      />
    </div>
  );
};

/**
 * Обертка для ленивой загрузки компонента GalleryButton
 */
export default function LazyGalleryButton({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className?: string;
}) {
  return (
    <Suspense fallback={<GalleryButtonPlaceholder />}>
      <GalleryButton href={href} text={text} className={className} />
    </Suspense>
  );
}
