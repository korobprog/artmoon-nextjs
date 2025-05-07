// components/Home.tsx
'use client';

import Image from 'next/image';

const artists = [
  { name: 'Ройо (Royo)', image: '/user/royo.jpg' },
  { name: 'Хавьер Мулио', image: '/user/javier.jpg' },
  { name: 'Соледад Фернандес', image: '/user/artist-image-2.jpg' },
  { name: 'Элиос Хисберт', image: '/user/elios.jpg' },
  { name: 'Наварро Монтллор', image: '/user/navarro1.jpg' },
];

export default function HomePage() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen py-10 bg-[url('/styles/pattern.png')] bg-cover bg-center bg-no-repeat"
      style={{ position: 'relative', zIndex: 5 }}
    >
      {/* Главное изображение с эффектом движения перенесено в Navbar */}

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10 text-white">
        <div className="space-y-8">
          <div>
            <p className="text-2xl md:text-3xl font-serif text-gray-900 leading-relaxed">
              Уважаемые дамы и господа!
            </p>
            <p className="text-xl md:text-2xl font-light text-gray-700 mt-4 italic">
              Art Boutique «MOON» предлагает Вашему вниманию авторские картины
              современных испанских и итальянских художников.
            </p>
          </div>
          <div className="mb-12">
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8"></div>
          </div>
          <div>
            <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed bg-gradient-to-r from-gray-50 to-amber-50 p-6 rounded-xl shadow-sm">
              Более 20 лет мы сотрудничаем напрямую с европейскими художниками и
              обладаем эксклюзивными правами представлять их работы в России.
            </p>
          </div>

          <div>
            <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              Мы рады возможности предложить Вам картины художников с мировым
              именем:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {/* Секция художников */}
              <div className="mb-8 pb-6 border-b border-gray-700">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
                  {artists.map((artist, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-20 h-20 mb-2 overflow-hidden rounded-full border-2 border-yellow-400 shadow-lg">
                        <Image
                          src={artist.image}
                          alt={artist.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <p className="text-center text-sm font-geist-sans text-black">
                        {artist.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-lg md:text-xl font-light text-gray-700 italic border-l-4 border-amber-500 pl-4 py-2">
              &quot;Наши выставки проходили в Московской Городской Думе, Мэрии
              Москвы, Крокус-Экспо и других престижных площадках.&quot;
            </p>

            {/* Галерея изображений с выставок */}
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 1,
                    url: '/imagesduma/01.jpg',
                    title: 'Выставка в Московской Городской Думе',
                  },
                  {
                    id: 2,
                    url: '/imagesduma/Untitled-1.jpg',
                    title: 'Выставка в Мэрии Москвы',
                  },
                ].map((image) => (
                  <div
                    key={image.id}
                    className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={image.url}
                        alt={image.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100">
                      <p className="text-center text-gray-800 font-medium">
                        {image.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-black">
              <span className="text-xl font-bold text-amber-700 bg-gradient-to-r from-amber-50 to-amber-100 px-4 py-2 rounded-lg shadow-sm">
                Каждая картина имеет
              </span>
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 text-amber-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-lg font-medium text-neutral-800">
                  Сертификаты подлинности
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-8 h-8 text-amber-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-lg font-medium text-neutral-800">
                  Испанский багет
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xl md:text-2xl font-medium text-gray-900 bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-xl">
              Мы предлагаем{' '}
              <span className="font-bold text-amber-700">
                эксклюзивные цены
              </span>{' '}
              ниже, чем в европейских и американских галереях.
            </p>
          </div>

          <div>
            <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed">
              Каждая картина в нашей коллекции — это уникальное произведение,
              которое станет драгоценным украшением вашего интерьера и будет
              радовать вас долгие годы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
