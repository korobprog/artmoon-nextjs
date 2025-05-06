import React from 'react';
import ClientNavbar from '@/components/ClientNavbar';
import FooterPage from '@/components/FooterPage';

export default function ContactsPage() {
  return (
    <>
      <ClientNavbar />
      <div className="container mx-auto px-4 py-16 mt-[230px]">
        <h1 className="text-3xl font-bold mb-8 text-center">Контакты</h1>
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <p className="mb-4 text-lg">
            Мы всегда рады общению с ценителями искусства и коллекционерами.
            Свяжитесь с нами любым удобным способом.
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Адрес галереи:</h2>
            <p className="text-lg">г. Москва, ул. Искусств, д. 123</p>
            <p className="text-lg">
              Часы работы: Вт-Вс с 11:00 до 20:00, Пн - выходной
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">
              Контактная информация:
            </h2>
            <p className="text-lg">Телефон: +7 (999) 123-45-67</p>
            <p className="text-lg">Email: info@artmoon.gallery</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Социальные сети:</h2>
            <p className="text-lg">
              Следите за нашими новостями и обновлениями в социальных сетях.
            </p>
            <div className="flex gap-4 mt-2">
              <span className="text-lg">Instagram: @artmoon.gallery</span>
              <span className="text-lg">Facebook: Art Moon Gallery</span>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}
