'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Ленивая загрузка компонента ArtistPhotos
const ArtistPhotos = dynamic(() => import('../ArtistPhotos'), {
  loading: () => <ArtistPhotosPlaceholder />,
  ssr: false, // Отключаем SSR для этого компонента
});

// Компонент-заглушка, который отображается во время загрузки
const ArtistPhotosPlaceholder = () => {
  return (
    <div className="mt-10 mb-20">
      <div className="w-full">
        <h2 className="text-2xl font-georgia-bold text-center mb-8 text-[#8a5d9e]">
          Фото с художниками и с некоторых наших выставок
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="photo-item relative">
              <div className="frame relative">
                <div
                  className="frame-border absolute top-0 left-0 w-full h-full z-10"
                  style={{
                    backgroundImage: 'url(/styles/artists-gallery-frame.png)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
                <div
                  className="image-container relative pt-[100%]"
                  style={{
                    backgroundColor: '#f5f5f5',
                  }}
                ></div>
              </div>
              <div className="photo-title text-center mt-2 mb-6 px-2 text-sm font-georgia">
                Загрузка...
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Обертка для ленивой загрузки компонента ArtistPhotos
 */
export default function LazyArtistPhotos() {
  return (
    <Suspense fallback={<ArtistPhotosPlaceholder />}>
      <ArtistPhotos />
    </Suspense>
  );
}
