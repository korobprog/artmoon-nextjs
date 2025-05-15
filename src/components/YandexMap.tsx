'use client';

import React, { useEffect, useRef, useState } from 'react';

type YandexMapProps = {
  width?: string;
  height?: string;
  className?: string;
};

// Отключаем правило ESLint для использования unknown
/* eslint-disable @typescript-eslint/no-explicit-any */

// Объявляем типы для Яндекс Карт API
// Используем упрощенный подход с типом Record для API Яндекс Карт
type YandexMap = Record<string, any>;

// Объявляем глобальные типы для Яндекс Карт API
declare global {
  interface Window {
    ymaps: {
      Map: new (element: HTMLElement, options: any) => YandexMap;
      Placemark: new (
        coordinates: number[],
        properties: any,
        options: any
      ) => any;
      control: {
        ZoomControl: new (options: any) => any;
        // Убрали SearchControl, так как он больше не используется
      };
      ready: (callback: () => void) => void;
    };
  }
}

const YandexMap: React.FC<YandexMapProps> = ({
  width = '100%',
  height = '400px',
  className = '',
}) => {
  // Координаты галереи - Центр Международной Торговли, Краснопресненская набережная 12
  const coordinates = [55.754167, 37.556389]; // ЦМТ, Москва
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YandexMap | null>(null);

  // Загрузка API Яндекс Карт
  useEffect(() => {
    setIsMounted(true);

    if (!window.ymaps) {
      const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
      script.async = true;
      script.onload = () => setIsLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    } else {
      setIsLoaded(true);
    }
  }, []);

  // Инициализация карты после загрузки API
  useEffect(() => {
    if (isMounted && isLoaded && mapRef.current && window.ymaps) {
      // Дожидаемся полной загрузки API
      window.ymaps.ready(() => {
        // Создаем экземпляр карты
        // Проверяем, что mapRef.current не null
        if (!mapRef.current) return;

        // Создаем экземпляр карты с минимальным интерфейсом
        const map = new window.ymaps.Map(mapRef.current, {
          center: coordinates,
          zoom: 15,
          controls: ['zoomControl', 'fullscreenControl'], // Только необходимые элементы управления
          suppressMapOpenBlock: true, // Убираем кнопку "Создать свою карту"
          copyrightLogoVisible: true, // Скрываем логотип Яндекса
          copyrightProvidersVisible: true, // Скрываем информацию о провайдерах данных
          copyrightUaVisible: false, // Скрываем ссылку на пользовательское соглашение
        });

        mapInstanceRef.current = map;

        // Настраиваем элементы управления
        const zoomControl = new window.ymaps.control.ZoomControl({
          options: {
            position: {
              right: 10,
              top: 10,
            },
          },
        });

        map.controls.add(zoomControl);
        // Убрали создание и добавление searchControl

        // Создаем метку
        const placemark = new window.ymaps.Placemark(
          coordinates,
          {
            iconCaption: 'Галерея Art Moon',
            balloonContentHeader: 'Галерея Art Moon',
            balloonContentBody: `
            <div style="color: #5c4f3d; font-family: 'Georgia', serif; font-weight: normal;">
              <p>Центр Международной Торговли</p>
              <p>Краснопресненская набережная 12, вход №1</p>
              <p>(через гостиницу Plaza Garden), улица Молл</p>
              <p>Ежедневно с 10:00 до 18:00</p>
            </div>
          `,
            hintContent: 'Галерея Art Moon',
          },
          {
            // Используем собственное SVG-изображение
            iconLayout: 'default#image',
            iconImageHref:
              '/location-pin-navigation-destination-maps-svgrepo-com.svg',
            iconImageSize: [40, 40], // Размер иконки в пикселях
            iconImageOffset: [-20, -40], // Смещение иконки относительно точки привязки
            draggable: false, // Запрещаем перетаскивание метки
          }
        );

        // Добавляем метку на карту
        map.geoObjects.add(placemark);
      });
    }

    // Очистка при размонтировании компонента
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted, isLoaded, coordinates]);

  // Рендерим контейнер для карты
  return (
    <div className={className} style={{ width, height }}>
      {!isMounted || !isLoaded ? (
        // Заглушка до загрузки карты
        <div
          style={{
            width,
            height,
            background: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span className="font-georgia">Загрузка карты...</span>
        </div>
      ) : (
        // Контейнер для карты
        <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      )}
    </div>
  );
};

export default YandexMap;
