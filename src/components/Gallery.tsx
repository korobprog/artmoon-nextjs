'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Grid, Typography } from '@mui/material';
import GalleryItem from './GalleryItem';

interface Artwork {
  id: number;
  title: string;
  author: string;
  size: string;
  price: string;
  url: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: 'Картина №2275',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000  ',
    url: '/images/Армандо-Романо-Италия-2275-95х75см_-1500x1189.webp',
  },
  {
    id: 2,
    title: 'Картина №2276',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000  ',
    url: '/images/Армандо-Романо-Италия-2276-95х75см-1500x1194.webp',
  },
  {
    id: 3,
    title: 'Картина №2277',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000  ',
    url: '/images/Армандо-Романо-Италия-2277-95х75см-1500x1192.webp',
  },
  {
    id: 4,
    title: 'Картина №2279',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000  ',
    url: '/images/Армандо-Романо-Италия-2279-95х75см_-1500x1181.webp',
  },
  {
    id: 5,
    title: 'Картина №2280',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000  ',
    url: '/images/Армандо-Романо-Италия-2280-95х75см-1500x1180.webp',
  },
  {
    id: 6,
    title: 'Картина №2281',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000  ',
    url: '/images/Армандо-Романо-Италия-2281-95х75см-1500x1190.webp',
  },
  {
    id: 7,
    title: 'Картина №2262',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000  ',
    url: '/images/Армандо-Романо-Италия-2262-95х75см-1-1500x1186.webp',
  },
  {
    id: 8,
    title: 'Картина №2263',
    author: 'Армандо Романо (Италия)',
    size: '95х75см',
    price: '252 000  ',
    url: '/images/Армандо-Романо-Италия-2263-95х75см-1500x1184.webp',
  },
  {
    id: 9,
    title: 'Картина №2265',
    author: 'Армандо Романо (Италия)',
    size: '115х85см',
    price: '357 000  ',
    url: '/images/Армандо-Романо-Италия-2265-115х85см-1500x1112.webp',
  },
  {
    id: 10,
    title: 'Картина №2266',
    author: 'Армандо Романо (Италия)',
    size: '145х85см',
    price: '470 000  ',
    url: '/images/Армандо-Романо-Италия-2266-145х85см-1500x883.webp',
  },
  {
    id: 11,
    title: 'Картина №2282',
    author: 'Наварро Монтллор (Испания)',
    size: '145х115см',
    price: '2 190 000  ',
    url: '/images/Наварро-Монтллор-Испания-2282-145х115см.webp',
  },
  {
    id: 12,
    title: 'Картина №2305',
    author: 'Мартина Йона (Испания)',
    size: '86х75см',
    price: '270 000  ',
    url: '/images/Мартина-Йона-Испания-2305-86х75см-1500x1315.webp',
  },
  {
    id: 13,
    title: 'Картина №2304',
    author: 'Мартина Йона (Испания)',
    size: '98х84см',
    price: '380 000  ',
    url: '/images/Мартина-Йона-Испания-2304-98х84см-1500x1294.webp',
  },
  {
    id: 14,
    title: 'Картина №2302',
    author: 'Мартина Йона (Испания)',
    size: '80х70см',
    price: '270 000  ',
    url: '/images/Мартина-Йона-Испания-2302-80х70см-1500x1330.webp',
  },
  {
    id: 15,
    title: 'Картина №2300',
    author: 'Мартина Йона (Испания)',
    size: '71х80см',
    price: '270 000  ',
    url: '/images/Мартина-Йона-Испания-2300-71х80см-1323x1500.webp',
  },
  {
    id: 16,
    title: 'Картина №2259',
    author: 'Мартина Йона (Испания)',
    size: '98х85см',
    price: '390 000  ',
    url: '/images/Мартина-Йона-Испания-2259-98х85см-1500x1301.webp',
  },
  {
    id: 17,
    title: 'Картина №2260',
    author: 'Мартина Йона (Испания)',
    size: '98х85см',
    price: '390 000  ',
    url: '/images/Мартина-Йона-Испания-2260-98х85см-1500x1299.webp',
  },
  {
    id: 18,
    title: 'Картина №2309',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000  ',
    url: '/images/Хавьер-Мулио-Испания-2309-45х55см.webp',
  },
  {
    id: 19,
    title: 'Картина №2307',
    author: 'Хавьер Мулио (Испания)',
    size: '106х85см',
    price: '2 124 000  ',
    url: '/images/Хавьер-Мулио-Испания-____-106х85см.webp',
  },
  {
    id: 20,
    title: 'Картина №2288',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '567 000  ',
    url: '/images/Хавьер-Мулио-Испания-2288-45х55см.webp',
  },
  {
    id: 21,
    title: 'Картина №2285',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000  ',
    url: '/images/Хавьер-Мулио-Испания-2285-45х55см.webp',
  },
  {
    id: 22,
    title: 'Картина №2286',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '567 000  ',
    url: '/images/Хавьер-Мулио-Испания-2286-45х55см.webp',
  },
  {
    id: 23,
    title: 'Картина №2287',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000  ',
    url: '/images/Хавьер-Мулио-Испания-2287-45х55см.webp',
  },
  {
    id: 24,
    title: 'Картина №2289',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000  ',
    url: '/images/Хавьер-Мулио-Испания-2289-45х55см.webp',
  },
  {
    id: 25,
    title: 'Картина №2290',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '584 000  ',
    url: '/images/Хавьер-Мулио-Испания-2290-45х55см.webp',
  },
  {
    id: 26,
    title: 'Картина №2291',
    author: 'Хавьер Мулио (Испания)',
    size: '45х55см',
    price: '567 000  ',
    url: '/images/Хавьер-Мулио-Испания-2291-45х55см.webp',
  },
  {
    id: 27,
    title: 'Картина №2271',
    author: 'Хавьер Мулио (Испания)',
    size: '63х75см',
    price: '1 656 000  ',
    url: '/images/Хавьер-Мулио-Испания-2271-63х75см-1268x1500.webp',
  },
  {
    id: 28,
    title: 'Картина №2273',
    author: 'Хавьер Мулио (Испания)',
    size: '106х85см',
    price: '2 124 000  ',
    url: '/images/Хавьер-Мулио-Испания-2273-106х85см-1500x1204.webp',
  },
  {
    id: 29,
    title: 'Картина №568',
    author: 'Соледад Фернандез (Испания)',
    size: '122х92см',
    price: '1 759 000  ',
    url: '/images/568-1500x1144.webp',
  },
  {
    id: 30,
    title: 'Картина №2295',
    author: 'Маркос Эстеве (Испания)',
    size: '104х62см',
    price: '450 000  ',
    url: '/images/Маркос-Эстеве-Испания-2295-104х62см-1500x893.webp',
  },

  {
    id: 31,
    title: 'Картина №958',
    author: 'Герман Арасил (Испания)',
    size: '91х68см',
    price: '250 000  ',
    url: '/images/Герман-Арасил-Испания-958-91х68см.webp',
  },
  {
    id: 32,
    title: 'Картина №1526',
    author: 'Г.Голиа (Италия)',
    size: '95х75см',
    price: '264 000  ',
    url: '/images/Голиа-Италия-1526-95х75см.2745-евро-1500x1179.webp',
  },
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOpen = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setOpen(true);
    // Блокируем прокрутку страницы при открытии модального окна
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArtwork(null);
    // Возвращаем прокрутку страницы при закрытии модального окна
    document.body.style.overflow = 'auto';
  };

  // Закрытие модального окна при клике вне его содержимого
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Закрытие модального окна при нажатии клавиши Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open]);

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Галерея */}
      <Grid
        container
        spacing={2}
        sx={{
          padding: '16px',
          justifyContent: { xs: 'center', sm: 'flex-start' },
        }}
      >
        {artworks.map((artwork) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Grid item xs={12} sm={6} md={4} key={artwork.id} {...({} as any)}>
            <GalleryItem artwork={artwork} onClick={handleClickOpen} />
          </Grid>
        ))}
      </Grid>
      {/* Модальное окно для увеличенного изображения с использованием Tailwind */}
      {open && selectedArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center "
          style={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            backgroundImage: 'url(/styles/pattern.png)',
            backgroundBlendMode: 'overlay',
          }}
        >
          <div
            ref={modalRef}
            className="relative bg-white rounded-lg max-w-4xl w-full mx-4 my-6 max-h-[90vh] flex flex-col"
            style={{
              border: '8px solid #e0e0e0',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
              backgroundImage: 'url(/styles/pattern.png)',
              backgroundBlendMode: 'overlay',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Заголовок и кнопка закрытия */}
            <div className="flex justify-between items-center p-4 border-b border-purple-300">
              <h3 className="text-xl font-bold text-purple-800">
                {selectedArtwork.title}
              </h3>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center hover:bg-purple-800 focus:outline-none transition-colors duration-200 cursor-pointer"
                aria-label="close"
                style={{
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Содержимое модального окна */}
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Изображение */}
                <div className="md:w-2/3 relative">
                  <div
                    className="relative w-full h-[400px] md:h-[500px]"
                    style={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    <Image
                      src={selectedArtwork.url}
                      alt={selectedArtwork.title}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-md"
                    />
                  </div>
                </div>

                {/* Информация о картине */}
                <div
                  className="md:w-1/3 p-6"
                  style={{
                    backgroundImage:
                      'url(/imagefon/background-of-the-picture-description.png)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    color: 'white',
                  }}
                >
                  <Typography variant="body1" className="mb-4">
                    <strong className="text-white">Автор:</strong>{' '}
                    <span className="text-white font-medium">
                      {selectedArtwork.author}
                    </span>
                  </Typography>
                  <Typography variant="body1" className="mb-4">
                    <strong className="text-white">Размер:</strong>{' '}
                    <span className="text-white font-medium">
                      {selectedArtwork.size}
                    </span>
                  </Typography>
                  <Typography variant="body1" className="mb-4">
                    <strong className="text-white">Цена:</strong>{' '}
                    <span className="text-white font-medium">
                      {selectedArtwork.price} ₽
                    </span>
                  </Typography>
                </div>
              </div>
            </div>

            {/* Футер модального окна */}
            <div className="border-t border-purple-300 p-4 flex justify-end">
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 focus:outline-none transition-colors duration-200 cursor-pointer"
                style={{
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
