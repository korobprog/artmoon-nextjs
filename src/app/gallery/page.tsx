import React from 'react';
import ClientNavbar from '@/components/ClientNavbar';
import FooterPage from '@/components/FooterPage';
import Gallery from '@/components/Gallery';
import ImageSlider from '@/components/ImageSlider';

export default function GalleryPage() {
  return (
    <>
      <ClientNavbar />

      {/* Слайдер изображений - размещен выше основного контента */}
      <div className="w-full mt-[-150px] mb-8 relative z-0">
        <h1 className="text-3xl font-georgia-bold mb-8 text-center text-[#8a5d9e]">
          Галерея
        </h1>
        <div className="container mx-auto px-4">
          <ImageSlider />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* <div className="max-w-4xl mx-auto bg-[#8a5d9e]/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <p className="mb-4 text-lg text-black font-georgia">
            Добро пожаловать в нашу галерею Art Moon художников - Ройо (Royo)
            Хавьер Мулио Хавьер Мулио Соледад Фернандес Соледад Фернандес Элиос
            Хисберт Элиос Хисберт Наварро Монтллор Наварро Монтллор
          </p>
        </div> */}

        {/* Галерея изображений */}
        <Gallery />
      </div>
      <FooterPage />
    </>
  );
}
