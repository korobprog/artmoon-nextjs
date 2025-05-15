'use client';

import React from 'react';
import Image from 'next/image';

interface Artwork {
  id: number;
  title: string;
  author: string;
  size: string;
  price: string;
  url: string;
}

interface GalleryItemProps {
  artwork: Artwork;
  onClick: (artwork: Artwork) => void;
}

export default function GalleryItem({ artwork, onClick }: GalleryItemProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      onClick={() => onClick(artwork)}
    >
      <div style={{ width: '100%' }}>
        <Image
          src={artwork.url}
          alt={artwork.title}
          width={500}
          height={500}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '4px',
          }}
        />
      </div>
      <div
        className="mt-1"
        style={{
          width: '100%',
          position: 'relative',
          height: '230px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Фон-доска - здесь можно регулировать ширину и высоту фона */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            /* Смещаем фон влево на 10% от ширины контейнера */
            left: '-10%',
            /* Делаем фон на 20% шире контейнера (120% от ширины) */
            width: '120%',
            height: '120%',
            backgroundImage:
              'url(/imagefon/background-of-the-picture-description.png)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1,
          }}
        />
        <div
          style={{
            textAlign: 'center',
            padding: '0 20px',
            fontSize: '1rem',
            lineHeight: '1.4',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            marginTop:
              '0px' /* Изменено с 15px на 0px, чтобы поднять текст выше */,
          }}
        >
          <div className="mb-1 text-center">
            <strong className="text-white font-georgia-bold">
              {artwork.title}
            </strong>
          </div>
          <div className="mb-0.5">
            <strong className="text-white font-georgia-bold">Автор:</strong>{' '}
            <span className="text-white font-georgia">{artwork.author}</span>
          </div>
          <div className="mb-0.5">
            <strong className="text-white font-georgia-bold">Размер:</strong>{' '}
            <span className="text-white font-georgia">{artwork.size}</span>
          </div>
          <div className="mb-0.5">
            <strong className="text-white font-georgia-bold">Цена:</strong>{' '}
            <span className="text-white font-georgia-bold">
              {artwork.price} ₽
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
