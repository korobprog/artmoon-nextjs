'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import exhibitionsData from '../data/exhibitions.json';

interface Exhibition {
  id: number;
  title: string;
  url: string;
}

// Интерфейс для слайдов лайтбокса
interface LightboxSlide {
  src: string;
  alt: string;
  title?: string;
}

// Используем импортированные данные из JSON-файла с правильной типизацией
const exhibitions: Exhibition[] = exhibitionsData as Exhibition[];

export default function ExhibitionsGallery() {
  const [index, setIndex] = useState(-1);

  // Добавляем CSS для вертикального отображения информации о фотографии
  useEffect(() => {
    // Добавляем стили только когда лайтбокс открыт
    if (index >= 0) {
      // Создаем элемент стиля
      const style = document.createElement('style');
      style.id = 'lightbox-custom-styles';
      style.innerHTML = `
        .yarl__slide {
          flex-direction: column !important;
        }
        .yarl__slide_captions {
          position: relative !important;
          width: 100% !important;
          max-width: 100% !important;
          padding: 15px 0 !important;
          background-color: rgba(0, 0, 0, 0.5) !important;
          color: white !important;
          text-align: center !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Удаляем стили при закрытии лайтбокса
    return () => {
      const existingStyle = document.getElementById('lightbox-custom-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [index]);

  // Подготовка слайдов для лайтбокса
  const slides: LightboxSlide[] = exhibitions.map((exhibition) => ({
    src: exhibition.url,
    alt: exhibition.title,
    title: exhibition.title,
  }));

  const handleClickOpen = (exhibition: Exhibition) => {
    // Находим индекс выбранного изображения в массиве
    const exhibitionIndex = exhibitions.findIndex(
      (item) => item.id === exhibition.id
    );
    setIndex(exhibitionIndex);
  };

  const handleClose = () => {
    setIndex(-1);
  };

  return (
    <div className="exhibitions-gallery">
      <h2 className="text-center text-2xl font-georgia-bold mb-8 text-[#8a5d9e]">
        Фото с художниками и с некоторых наших выставок
      </h2>

      <div
        className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg mb-10"
        style={{
          backgroundImage: 'url(/styles/pattern.png)',
          backgroundRepeat: 'repeat',
          color: '#5c4f3d',
        }}
      >
        <h2 className="text-2xl font-georgia-bold-italic mb-6 text-center">
          Уважаемые дамы и господа,
        </h2>

        <p className="mb-8 text-lg text-center font-georgia">
          Мы можем доставить понравившиеся Вам работы в любое удобное для Вас
          время и место, чтобы Вы могли окончательно убедиться в своем выборе,
          наглядно посмотрев, как картины дополняют Ваш интерьер и принять
          окончательное решение о покупке.
        </p>
      </div>

      <div className="photos-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {exhibitions.map((exhibition) => (
          <div
            key={exhibition.id}
            className="photo-item relative cursor-pointer"
            onClick={() => handleClickOpen(exhibition)}
          >
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
                  src={exhibition.url}
                  alt={exhibition.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    padding: '15px',
                  }}
                  className="hover:opacity-90 transition-opacity"
                />
              </div>
            </div>

            {/* Подпись к фото */}
            <div
              className="photo-title text-center mt-2 mb-6 px-2 text-sm font-georgia"
              style={{ color: '#5c4f3d' }}
            >
              {exhibition.title}
            </div>
          </div>
        ))}
      </div>

      {/* Лайтбокс для просмотра изображений */}
      <Lightbox
        open={index >= 0}
        index={index}
        close={handleClose}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        carousel={{
          padding: '0px',
          spacing: '30px',
          imageFit: 'contain',
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
          slide: { justifyContent: 'center', alignItems: 'center' },
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
        }}
        thumbnails={{
          position: 'bottom',
          width: 120,
          height: 80,
          border: 1,
          borderRadius: 4,
          padding: 4,
          gap: 16,
        }}
        render={{
          iconPrev: () => (
            <span className="yarl__button yarl__button_prev">❮</span>
          ),
          iconNext: () => (
            <span className="yarl__button yarl__button_next">❯</span>
          ),
          iconClose: () => (
            <span className="yarl__button yarl__button_close">✕</span>
          ),
          slideHeader: () => null, // Убираем заголовок сверху
          slideFooter: (props) => {
            const slide = props.slide as LightboxSlide;
            return (
              <div
                className="yarl__slide_title text-center py-4"
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  padding: '15px 0',
                }}
              >
                <h3 className="text-xl font-georgia-bold">{slide.title}</h3>
              </div>
            );
          },
        }}
      />
    </div>
  );
}
