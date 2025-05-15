'use client';

import React from 'react';

export default function ContactInfo() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-3">Контактная информация:</h2>
      <p className="text-lg">
        Тел.:{' '}
        <a href="tel:+74956425335" className="hover:underline">
          +7 (495) 642-53-35
        </a>{' '}
        (
        <a href="https://wa.me/74956425335" className="underline italic">
          WhatsApp
        </a>
        )
      </p>
      <p className="text-lg">
        Тел.:{' '}
        <a href="tel:+79295908961" className="hover:underline">
          +7 (929) 590-89-61
        </a>{' '}
        (
        <a href="https://t.me/artmoongallery" className="underline italic">
          Telegram
        </a>
        )
      </p>
      <p className="text-lg">
        Email:{' '}
        <a href="mailto:info@art-moon.ru" className="underline">
          info@art-moon.ru
        </a>
      </p>
      <p className="text-lg">
        Сайт:{' '}
        <a href="https://www.art-moon.ru" className="underline">
          www.art-moon.ru
        </a>
      </p>
    </div>
  );
}
