'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import artworksData from '../data/artworks.json';

// Импортируем стили Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';

interface Artwork {
  id: number;
  title: string;
  author: string;
  size: string;
  price: string;
  url: string;
}

export default function ImageSlider() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Выбираем случайные 5-7 картин для слайдера
  useEffect(() => {
    const allArtworks = artworksData as Artwork[];
    const shuffled = [...allArtworks].sort(() => 0.5 - Math.random());
    const selectedArtworks = shuffled.slice(0, 7);
    setArtworks(selectedArtworks);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div className="h-[400px] bg-gray-100 animate-pulse"></div>;
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        slidesPerView={1}
        navigation={false}
        pagination={false}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-[450px] sm:h-[550px] md:h-[650px]"
      >
        {artworks.map((artwork) => (
          <SwiperSlide key={artwork.id} className="relative">
            <div className="relative w-full h-full flex justify-center items-center">
              <Image
                src={artwork.url}
                alt={artwork.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 70vw"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                priority={artwork.id === artworks[0].id}
                className="transition-opacity duration-500"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
