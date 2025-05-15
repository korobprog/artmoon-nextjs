'use client';

import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import GalleryItem from './GalleryItem';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import artworksData from '../data/artworks.json';

interface Artwork {
  id: number;
  title: string;
  author: string;
  size: string;
  price: string;
  url: string;
}

// Интерфейс для слайдов лайтбокса
interface LightboxSlide {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

// Используем импортированные данные из JSON-файла с правильной типизацией
const artworks: Artwork[] = artworksData as Artwork[];

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  // Добавляем CSS для вертикального отображения информации о картине
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
  const slides: LightboxSlide[] = artworks.map((artwork) => ({
    src: artwork.url,
    alt: artwork.title,
    title: artwork.title,
    description: `${artwork.author}, ${artwork.size}, ${artwork.price} ₽`,
  }));

  const handleClickOpen = (artwork: Artwork) => {
    // Находим индекс выбранного изображения в массиве
    const artworkIndex = artworks.findIndex((item) => item.id === artwork.id);
    setIndex(artworkIndex);
  };

  const handleClose = () => {
    setIndex(-1);
  };

  return (
    <div
      style={{
        overflowX: 'hidden',
        marginTop: '80px',
        paddingTop: '40px',
        marginBottom: '80px',
        paddingBottom: '40px',
      }}
    >
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
          <Grid key={artwork.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <GalleryItem artwork={artwork} onClick={handleClickOpen} />
          </Grid>
        ))}
      </Grid>

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
          // Удаляем свойство slideContainer, так как оно не существует в типе SlotStyles
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
                <h3 className="text-xl font-georgia-bold mb-2">
                  {slide.title}
                </h3>
                <p className="font-georgia">{slide.description}</p>
              </div>
            );
          },
        }}
      />
    </div>
  );
}
