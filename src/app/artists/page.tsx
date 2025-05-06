import React from 'react';
import ClientNavbar from '@/components/ClientNavbar';
import FooterPage from '@/components/FooterPage';

export default function ArtistsPage() {
  return (
    <>
      <ClientNavbar />
      <div className="container mx-auto px-4 py-16 mt-[230px]">
        <h1 className="text-3xl font-bold mb-8 text-center">Художники</h1>
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <p className="mb-4 text-lg">
            Мы гордимся сотрудничеством с талантливыми художниками со всего
            мира. Наша галерея представляет работы как признанных мастеров, так
            и восходящих звезд современного искусства.
          </p>
          <p className="mb-4 text-lg">
            Каждый художник, представленный в нашей коллекции, обладает
            уникальным стилем и видением, что делает нашу галерею разнообразной
            и интересной для ценителей искусства.
          </p>
          <p className="mb-4 text-lg">
            Среди наших художников вы найдете мастеров различных жанров и
            техник: от классической живописи до авангардных экспериментов, от
            реализма до абстракции.
          </p>
          <p className="text-lg">
            Мы регулярно проводим выставки и встречи с художниками, где вы
            можете лично познакомиться с авторами и узнать больше об их
            творческом пути и вдохновении.
          </p>
        </div>
      </div>
      <FooterPage />
    </>
  );
}
