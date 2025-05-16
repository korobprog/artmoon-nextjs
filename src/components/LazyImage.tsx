'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface LazyImageProps extends Omit<ImageProps, 'src' | 'onLoad'> {
  src: string;
  placeholderSrc?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Компонент для ленивой загрузки изображений
 * Изображение загружается только когда оно попадает в область видимости
 */
export default function LazyImage({
  src,
  placeholderSrc = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', // Прозрачный 1x1 GIF
  alt,
  threshold = 0.1,
  rootMargin = '200px',
  ...props
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  // Загружаем изображение, когда оно попадает в область видимости
  useEffect(() => {
    if (isIntersecting && !imageLoaded) {
      setImageSrc(src);
      setImageLoaded(true);
    }
  }, [isIntersecting, src, imageLoaded]);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`lazy-image-container ${props.className || ''}`}
    >
      <Image
        {...props}
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } ${props.className || ''}`}
        onLoad={() => {
          if (imageSrc !== placeholderSrc) {
            setImageLoaded(true);
          }
        }}
      />
    </div>
  );
}
