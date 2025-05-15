'use client';

import React, { useState, useEffect } from 'react';

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  className?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  title,
  className,
}) => {
  const [loading, setLoading] = useState(true);
  const [showVpnWarning, setShowVpnWarning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверка на мобильное устройство
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Таймер для проверки загрузки видео
    const loadingTimer = setTimeout(() => {
      if (loading) {
        setShowVpnWarning(true);
      }
    }, 5000); // Показываем предупреждение, если видео не загрузилось за 5 секунд

    return () => {
      clearTimeout(loadingTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [loading]);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const getVideoHeight = () => {
    if (isMobile) {
      return '240px'; // Меньшая высота для мобильных устройств
    }
    return '480px'; // Стандартная высота для десктопов
  };

  const getVideoWidth = () => {
    if (isMobile) {
      return '100%'; // Полная ширина для мобильных устройств
    }
    return '100%'; // Максимальная ширина для десктопов
  };

  return (
    <div className={`youtube-video-container ${className || ''}`}>
      {title && <h3 className="text-xl font-georgia-bold mb-3">{title}</h3>}

      <div
        className="relative"
        style={{ width: getVideoWidth(), height: getVideoHeight() }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {showVpnWarning && (
          <div className="absolute top-0 left-0 right-0 bg-yellow-500 text-black p-2 text-center text-sm md:text-base font-georgia">
            Видео загружается медленно. Возможно, вам потребуется включить VPN
            для просмотра контента с YouTube.
          </div>
        )}

        <iframe
          width={getVideoWidth()}
          height={getVideoHeight()}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleIframeLoad}
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeVideo;
