'use client';

import LazyArtistsList from './lazy/LazyArtistsList';
import LazyExhibitionGallery from './lazy/LazyExhibitionGallery';
import LazyArtistPhotos from './lazy/LazyArtistPhotos';
import LazyCertificateInfo from './lazy/LazyCertificateInfo';
import LazyGalleryButton from './lazy/LazyGalleryButton';

export default function HomePage() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen py-10 bg-[url('/styles/pattern.png')] bg-cover bg-center bg-no-repeat"
      style={{ position: 'relative', zIndex: 5 }}
    >
      <div className="top-20 max-w-4xl mx-auto text-center px-6 relative z-10 text-white">
        <div className="space-y-8">
          {/* Приветственный блок */}
          <div>
            <p className="text-2xl md:text-3xl font-georgia-bold text-gray-900 leading-relaxed">
              Уважаемые дамы и господа!
            </p>
            <p className="text-xl md:text-2xl font-georgia-italic text-gray-700 mt-4">
              Art Boutique «MOON» предлагает Вашему вниманию авторские картины
              современных испанских и итальянских художников.
            </p>
          </div>

          {/* Разделитель */}
          <div className="mb-12">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8"></div>
          </div>

          {/* Информация о галерее */}
          <div>
            <p className="text-xl md:text-2xl font-georgia text-gray-800 leading-relaxed bg-gradient-to-r from-gray-50 to-amber-50 p-6 rounded-xl shadow-sm">
              Более 20 лет мы сотрудничаем напрямую с европейскими художниками и
              обладаем эксклюзивными правами представлять их работы в России.
            </p>
          </div>

          {/* Секция художников */}
          <div>
            <p className="text-xl md:text-2xl font-georgia-bold text-gray-800 mb-2">
              Мы рады возможности предложить Вам картины художников с мировым
              именем:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <LazyArtistsList />
            </div>
          </div>

          {/* Информация о выставках */}
          <div>
            <p className="text-lg md:text-xl font-georgia-italic text-gray-700 border-l-4 border-amber-500 pl-4 py-2">
              &quot;Наши выставки проходили в Московской Городской Думе, Мэрии
              Москвы, Крокус-Экспо и других престижных площадках.&quot;
            </p>

            {/* Галерея изображений с выставок */}
            <LazyExhibitionGallery />
          </div>

          {/* Информация о сертификатах */}
          <LazyCertificateInfo />

          {/* Информация о ценах */}
          <div>
            <p className="text-xl md:text-2xl font-georgia text-gray-900 bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-xl">
              Мы предлагаем{' '}
              <span className="font-georgia-bold text-amber-700">
                эксклюзивные цены
              </span>{' '}
              ниже, чем в европейских и американских х.
            </p>
          </div>

          {/* Заключительная информация */}
          <div className="mb-1 pb-1">
            <p className="text-xl md:text-2xl font-georgia text-gray-700 leading-relaxed">
              Каждая картина в нашей коллекции — это уникальное произведение,
              которое станет драгоценным украшением вашего интерьера и будет
              радовать вас долгие годы.
            </p>
          </div>

          {/* Кнопка для перехода на страницу галереи */}
          <div className="mt-20 mb-20">
            <LazyGalleryButton href="/gallery" text="Перейти в галерею" />
          </div>

          {/* Галерея фотографий с художниками и выставками */}
          <LazyArtistPhotos />
        </div>
      </div>
    </section>
  );
}
