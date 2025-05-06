import React from 'react';
import ClientNavbar from '@/components/ClientNavbar';
import FooterPage from '@/components/FooterPage';

export default function GalleryPage() {
  return (
    <>
      <ClientNavbar />
      <div className="container mx-auto px-4 py-16 mt-[230px]">
        <h1 className="text-3xl font-bold mb-8 text-center">Галерея</h1>
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <p className="mb-4 text-lg">
            Добро пожаловать в нашу галерею, где представлены уникальные
            произведения искусства от талантливых художников со всего мира.
          </p>
          <p className="mb-4 text-lg">
            Наша коллекция постоянно обновляется, предлагая вам возможность
            открыть для себя новые имена и работы в мире искусства.
          </p>
          <p className="mb-4 text-lg">
            Мы тщательно отбираем каждое произведение, чтобы обеспечить
            высочайшее качество и уникальность нашей коллекции.
          </p>
          <p className="text-lg">
            Посетите нашу физическую галерею, чтобы в полной мере оценить
            красоту и мастерство представленных работ. Наши эксперты всегда
            готовы помочь вам с выбором и ответить на любые вопросы.
          </p>
        </div>
      </div>
      <FooterPage />
    </>
  );
}
