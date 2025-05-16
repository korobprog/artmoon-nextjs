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

    // Проверяем, загружен ли уже API
    if (typeof window !== 'undefined' && !window.ymaps) {
      const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

      // Создаем уникальный ID для скрипта, чтобы избежать дублирования
      const scriptId = 'yandex-maps-script';

      // Проверяем, существует ли уже скрипт с таким ID
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;
        script.onload = () => {
          console.log('Yandex Maps API loaded successfully');
          setIsLoaded(true);
        };
        script.onerror = (error) => {
          console.error('Error loading Yandex Maps API:', error);
        };
        document.body.appendChild(script);
      }
    } else if (typeof window !== 'undefined' && window.ymaps) {
      console.log('Yandex Maps API already loaded');
      setIsLoaded(true);
    }

    // Очистка при размонтировании
    return () => {
      // Не удаляем скрипт при размонтировании, чтобы избежать проблем с повторной загрузкой
    };
  }, []);

  // Инициализация карты после загрузки API
  useEffect(() => {
    if (
      isMounted &&
      isLoaded &&
      mapRef.current &&
      typeof window !== 'undefined' &&
      window.ymaps
    ) {
      try {
        // Дожидаемся полной загрузки API
        window.ymaps.ready(() => {
          try {
            // Создаем экземпляр карты
            // Проверяем, что mapRef.current не null
            if (!mapRef.current) return;

            // Проверяем, что Map является конструктором
            if (typeof window.ymaps.Map !== 'function') {
              console.error('window.ymaps.Map is not a constructor');
              return;
            }

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
          } catch (error) {
            console.error('Error initializing Yandex Map:', error);
          }
        });
      } catch (error) {
        console.error('Error in ymaps.ready():', error);
      }
    }

    // Очистка при размонтировании компонента
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (error) {
          console.error('Error destroying map instance:', error);
        }
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
