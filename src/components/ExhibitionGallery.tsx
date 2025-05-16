'use client';

import Image from 'next/image';
import { exhibitionPhotos } from '@/data/exhibitionPhotos';

export default function ExhibitionGallery() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exhibitionPhotos.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            <div className="relative h-64 w-full">
              <Image
                src={image.url}
                alt={image.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className="rounded-t-lg"
                priority={image.id === 1} // Приоритетная загрузка для первого изображения
              />
            </div>
            <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100">
              <p className="text-center text-gray-800 font-georgia">
                {image.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
