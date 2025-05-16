'use client';

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  text?: string;
  showText?: boolean;
}

/**
 * Компонент спиннера для отображения состояния загрузки
 * @param size - размер спиннера (sm, md, lg, xl)
 * @param color - цвет спиннера
 * @param text - текст, отображаемый под спиннером
 * @param showText - флаг для отображения текста
 */
const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = '#ffffff',
  text = 'Загрузка...',
  showText = false,
}) => {
  // Определяем размеры в зависимости от пропса size
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const sizeClass = sizeMap[size];

  // Определяем размер текста в зависимости от размера спиннера
  const textSizeMap = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  const textSizeClass = textSizeMap[size];

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`${sizeClass} animate-spin rounded-full border-4 border-solid border-t-transparent`}
        style={{
          borderColor: `${color} transparent transparent transparent`,
          boxShadow: `0 0 10px rgba(${parseInt(
            color.slice(1, 3),
            16
          )}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(
            color.slice(5, 7),
            16
          )}, 0.3)`,
        }}
        role="status"
        aria-label="loading"
      />

      {showText && (
        <div
          className={`mt-2 ${textSizeClass} font-medium text-center`}
          style={{ color }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Spinner;
