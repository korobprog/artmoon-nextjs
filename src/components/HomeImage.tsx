'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function HomeImage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Определяем мобильное устройство при монтировании компонента
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };

    // Проверяем при первой загрузке
    checkMobile();

    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Обработчик движения мыши
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    // Вычисляем относительное положение мыши внутри контейнера (от -1 до 1)
    const x = ((e.clientX - left) / width - 0.5) * 2;
    const y = ((e.clientY - top) / height - 0.5) * 2;

    // Плавное обновление позиции
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto mb-0 mt-1 overflow-hidden rounded-lg shadow-2xl"
      style={{
        height: '600px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2), 0 0 15px rgba(0,0,0,0.1)',
        zIndex: -1,
        position: 'relative',
        willChange: 'transform, opacity, z-index',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          transform:
            isHovering && !isMobile
              ? `translate(${mousePosition.x * -20}px, ${
                  mousePosition.y * -20
                }px) scale(1.08)`
              : 'translate(0, 0) scale(1)',
          transformOrigin: 'center',
          transition: isHovering
            ? 'transform 0.2s ease-out'
            : 'transform 0.5s ease-in-out',
        }}
      >
        {/* Основное изображение */}
        <Image
          src="/styles/home-image.jpg"
          alt="Эксклюзивные картины"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: -1,
          }}
          className="transition-all duration-300"
        />
      </div>
    </div>
  );
}
