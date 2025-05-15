'use client';

import React from 'react';
import WhatsAppIcon from '@/components/icons/WhatsAppIcon';
import TelegramIcon from '@/components/icons/TelegramIcon';

export default function ContactInfo() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-georgia-bold mb-3">Контактная информация:</h2>
      <p className="text-lg font-georgia">
        Тел.:{' '}
        <a href="tel:+74956425335" className="hover:underline">
          +7 (495) 642-53-35
        </a>{' '}
        (
        <a
          href="https://wa.me/74956425335"
          className="underline font-georgia-italic inline-flex items-center"
        >
          <WhatsAppIcon className="w-4 h-4 mr-1" />
          WhatsApp
        </a>
        )
      </p>
      <p className="text-lg font-georgia">
        Тел.:{' '}
        <a href="tel:+79295908961" className="hover:underline">
          +7 (929) 590-89-61
        </a>{' '}
        (
        <a
          href="https://t.me/artmoongallery"
          className="underline font-georgia-italic inline-flex items-center"
        >
          <TelegramIcon className="w-4 h-4 mr-1" />
          Telegram
        </a>
        )
      </p>

      <p className="text-lg font-georgia">
        Сайт:{' '}
        <a href="https://www.art-moon.ru" className="underline">
          www.art-moon.ru
        </a>
      </p>
    </div>
  );
}
