'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function AuthorSignature() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Определяем мобильное устройство и настройки при монтировании компонента
  useEffect(() => {
    const checkVideoSupport = () => {
      const video = document.createElement('video');
      return !!video.canPlayType;
    };

    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
      const shouldLoad =
        checkVideoSupport() && (!isMobileDevice || window.navigator.onLine);
      setShouldLoadVideo(shouldLoad);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('online', checkMobile);
    window.addEventListener('offline', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('online', checkMobile);
      window.removeEventListener('offline', checkMobile);
    };
  }, []);

  // Обработчик загрузки видео
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Автовоспроизведение видео не удалось:', error);
        setIsVideoError(true);
      });
    }
  };

  // Обработчик ошибки загрузки видео
  const handleVideoError = () => {
    console.error('Ошибка загрузки видео');
    setIsVideoError(true);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Фоновое видео */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Фоновое изображение (показывается до загрузки видео или при ошибке) */}
        <div
          className="absolute inset-0 bg-[url('/styles/pattern.png')] bg-cover bg-center bg-no-repeat"
          style={{
            opacity: isVideoLoaded && !isVideoError ? 0.15 : 0.5,
            transition: 'opacity 0.5s ease-in-out',
          }}
        ></div>

        {/* Видео фон */}
        {shouldLoadVideo && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/styles/pattern.png"
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity:
                isVideoLoaded && !isVideoError ? (isMobile ? 0.6 : 0.8) : 0,
              transition: 'opacity 0.5s ease-in-out',
              mixBlendMode: 'screen',
              filter: 'contrast(1.1) brightness(1.2)',
            }}
          >
            <source src="/video/fon.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Контент */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Блок с подписью и фото */}
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:items-start">
            {/* Левая часть с рамкой и подписью */}
            <div className="flex flex-col items-center md:order-2 md:self-center md:-mt-8 md:z-20 relative">
              {/* Рамка - скрыта на мобильных, прижата к левому краю на десктопе */}
            </div>
            <div className="text-center">
              <div className="font-serif text-gray-800 leading-relaxed relative">
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm -m-2 rounded-lg"></div>
                <div className="relative">
                  <p className="text-lg md:text-xl italic mb-6">С уважением,</p>
                  <p className="text-base md:text-lg mb-6">
                    руководитель арт-бутика
                  </p>
                  <p className="text-lg md:text-xl font-medium text-amber-800 mb-6">
                    «MOON»
                  </p>
                  <p className="text-xl md:text-2xl font-semibold border-b border-amber-700 inline-block pb-1">
                    Максим Милохов
                  </p>
                </div>
              </div>
            </div>
            {/* Правая часть с фото в рамке */}
            <div className="relative w-64 h-auto mt-6 md:mt-0 md:order-1">
              <div className="relative">
                <Image
                  src="/styles/author-frame.png"
                  alt="Frame"
                  className="w-full h-auto absolute top-0 left-0 z-10"
                  width={500}
                  height={500}
                  priority
                />
                <Image
                  src="/user/aiam.jpg"
                  alt="Максим Милохов"
                  className="w-full h-auto object-cover relative z-0 p-4"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
