'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useWindowSize from '../hooks/useWindowSize';

interface CurtainsProps {
  children: React.ReactNode;
}

export default function Curtains({ children }: CurtainsProps) {
  const { isMobile } = useWindowSize();
  const [windowHeight, setWindowHeight] = useState(0);
  // windowWidth используется только для расчетов в useEffect
  const [, setWindowWidth] = useState(0); // Убираем неиспользуемую переменную
  const [showTopCurtains, setShowTopCurtains] = useState(true);
  const [translateValue, setTranslateValue] = useState(35);
  // Добавляем состояние для трансформации боковых шторок
  const [curtainTranslateX, setCurtainTranslateX] = useState(0);

  // Обновляем высоту окна и положение прокрутки при монтировании и изменении размера
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setWindowHeight(window.innerHeight);
      setWindowWidth(width);

      // Динамически корректируем translateX в зависимости от ширины экрана

      // Динамически корректируем translateX в зависимости от ширины экрана
      if (width < 900) {
        // Уменьшаем смещение при узких экранах
        const newTranslate = Math.max(10, 35 - (900 - width) / 20);
        setTranslateValue(newTranslate);
      } else {
        setTranslateValue(35);
      }
    };

    const handleScroll = () => {
      // Скрываем верхние элементы, когда прокрутка превышает 100px
      const scrollY = window.scrollY;
      setShowTopCurtains(scrollY < 100);

      // Вычисляем значение трансформации для боковых шторок
      // Максимальное значение трансформации (когда шторки полностью уходят за края)
      const maxTranslate = 120; // Увеличиваем до 120%, чтобы шторки полностью уходили за края
      // Высота, на которой шторки должны полностью уйти за края
      const scrollThreshold = 1500; // Увеличиваем порог прокрутки для более медленного эффекта

      // Вычисляем процент прокрутки (от 0 до 1) с нелинейной функцией для более плавного начала
      const scrollPercent = Math.min(
        Math.pow(scrollY / scrollThreshold, 1.2),
        1
      );
      // Вычисляем значение трансформации (от 0 до maxTranslate)
      const newTranslateX = scrollPercent * maxTranslate;

      setCurtainTranslateX(newTranslateX);
    };

    // Устанавливаем начальные значения
    updateDimensions();
    handleScroll();

    // Добавляем слушатели событий
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', handleScroll);

    // Очищаем слушатели при размонтировании
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Верхние ажурные элементы */}
      <div
        className={`fixed top-0 left-0 w-full z-[11] pointer-events-none transition-opacity duration-300 ${
          showTopCurtains ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative w-full">
          {/* Левый верхний угол */}
          <div className="absolute top-0" style={{ left: '-90px' }}>
            <Image
              src="/styles/curtains-top-left.png"
              alt="Top Left Curtain"
              width={400}
              height={100}
              style={{
                width: 'auto',
                maxWidth: '65vw',
                transform: `translateX(${translateValue}%)`,
              }}
              priority
            />
          </div>
          {/* Правый верхний угол */}
          <div className="absolute top-0" style={{ right: '-90px' }}>
            <Image
              src="/styles/curtains-top-right.png"
              alt="Top Right Curtain"
              width={400}
              height={100}
              style={{
                width: 'auto',
                maxWidth: '65vw',
                transform: `translateX(-${translateValue}%)`,
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Левая занавеска - скрываем на мобильных устройствах */}
      {!isMobile && (
        <div className="fixed top-0 left-0 h-full z-[10] pointer-events-none">
          <div className="relative h-full">
            {/* Левая занавеска */}
            <div className="absolute top-0 left-0">
              <Image
                src="/styles/curt-left.png"
                alt="Left Curtain"
                width={300}
                height={windowHeight || 1000}
                style={{
                  height: '49vh',
                  width: 'auto', // Сохраняем автоматическую ширину для поддержания соотношения сторон
                  maxWidth: '25vw',
                  objectFit: 'contain', // Добавляем objectFit для сохранения соотношения сторон
                  transform: `translateX(-${curtainTranslateX}%)`,
                  transition: 'transform 0.5s ease-out', // Увеличиваем время перехода для большей плавности
                }}
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Правая занавеска - скрываем на мобильных устройствах */}
      {!isMobile && (
        <div className="fixed top-0 right-0 h-full z-[10] pointer-events-none">
          <div className="relative h-full">
            {/* Правая занавеска */}
            <div className="absolute top-0 right-0">
              <Image
                src="/styles/curt-right.png"
                alt="Right Curtain"
                width={300}
                height={windowHeight || 1000}
                style={{
                  height: '39vh',
                  width: 'auto', // Сохраняем автоматическую ширину для поддержания соотношения сторон
                  maxWidth: '25vw',
                  objectFit: 'contain', // Добавляем objectFit для сохранения соотношения сторон
                  transform: `translateX(${curtainTranslateX}%)`,
                  transition: 'transform 0.5s ease-out', // Увеличиваем время перехода для большей плавности
                }}
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Основное содержимое */}
      <div className="relative z-[5] mx-auto px-[1vw]">{children}</div>
    </div>
  );
}
