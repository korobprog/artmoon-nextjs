'use client';

import React from 'react';
import FooterPage from '@/components/FooterPage';
import YandexMap from '@/components/YandexMap';
import ContactInfo from '@/components/ContactInfo';
import ImageSlider from '@/components/ImageSlider';

export default function ContactsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center text-[#8a5d9e]">
        Контакты
      </h1>
      <div className="mt-8 mb-8">
        <ImageSlider />
      </div>
      <div className="container mx-auto px-4 py-16 mt-[1px]">
        <div
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg"
          style={{
            backgroundImage: 'url(/styles/pattern.png)',
            backgroundRepeat: 'repeat',
            color: '#5c4f3d',
            fontFamily: 'Georgia, serif',
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center italic">
            Уважаемые дамы и господа,
          </h2>

          <p className="mb-8 text-lg text-center">
            Мы можем доставить понравившиеся Вам работы в любое удобное для Вас
            время и место, чтобы Вы могли окончательно убедиться в своем выборе,
            наглядно посмотрев, как картины дополняют Ваш интерьер и принять
            окончательное решение о покупке.
          </p>

          <p className="mb-8 text-lg text-center">
            Данная услуга бесплатная и предоставляется для Вашего удобства и
            экономии времени.
          </p>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">НАШ АДРЕС:</h2>
            <p className="text-lg">
              • Открытая выставочная экспозиция находится в Центре Международной
              Торговли, Краснопресненская набережная 12, вход №1, (через
              гостиницу Plaza Garden), улица Молл (доступ ежедневно и
              круглосуточно, продавец-консультант находится ежедневно с 10:00 до
              18:00).
            </p>
          </div>

          <ContactInfo />

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Как нас найти:</h2>
            <YandexMap
              height="400px"
              className="w-full rounded-lg shadow-md mt-2"
            />
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}
