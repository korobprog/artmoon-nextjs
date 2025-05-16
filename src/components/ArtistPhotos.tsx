'use client';

import Image from 'next/image';
import Link from 'next/link';
import { artistPhotos } from '@/data/exhibitionPhotos';

export default function ArtistPhotos() {
  return (
    <div className="mt-10 mb-20">
      <div className="w-full">
        <h2 className="text-2xl font-georgia-bold text-center mb-8 text-[#8a5d9e]">
          Фото с художниками и с некоторых наших выставок
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {artistPhotos.map((photo) => (
            <div key={photo.id} className="photo-item relative cursor-pointer">
              <div className="frame relative">
                {/* Рамка */}
                <div
                  className="frame-border absolute top-0 left-0 w-full h-full z-10"
                  style={{
                    backgroundImage: 'url(/styles/artists-gallery-frame.png)',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>

                {/* Изображение */}
                <div className="image-container relative pt-[100%]">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                      padding: '15px',
                    }}
                    className="hover:opacity-90 transition-opacity"
                    loading={photo.id <= 2 ? 'eager' : 'lazy'} // Приоритетная загрузка для первых двух фото
                  />
                </div>
              </div>

              {/* Подпись к фото */}
              <div className="photo-title text-center mt-2 mb-6 px-2 text-sm font-georgia">
                {photo.title}
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка для перехода на страницу выставок */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/artists#exhibition"
            className="inline-flex items-center px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg shadow-lg hover:from-amber-700 hover:to-amber-900 transition-all duration-300 border-2 border-purple-400"
          >
            <span>Смотреть все фото</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
