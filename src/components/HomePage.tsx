// components/Home.tsx
'use client';

export default function HomePage() {
  return (
    <section
      className="flex items-center justify-center min-h-screen bg-gray-100 py-10"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="max-w-4xl mx-auto text-center px-6 animate-fade-in">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-600 mb-6 font-playfair">
            Art Boutique «MOON»
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8"></div>
        </div>

        <div className="space-y-8">
          <div className="animate-slide-up">
            <p className="text-2xl md:text-3xl font-serif text-gray-900 leading-relaxed">
              Уважаемые дамы и господа!
            </p>
            <p className="text-xl md:text-2xl font-light text-gray-700 mt-4 italic">
              Art Boutique «MOON» предлагает Вашему вниманию авторские картины
              современных испанских и итальянских художников.
            </p>
          </div>

          <div className="animate-slide-up delay-100">
            <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed bg-gradient-to-r from-gray-50 to-amber-50 p-6 rounded-xl shadow-sm">
              Более 20 лет мы сотрудничаем напрямую с европейскими художниками и
              обладаем эксклюзивными правами представлять их работы в России.
            </p>
          </div>

          <div className="animate-slide-up delay-200">
            <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              Мы рады возможности предложить Вам картины художников с мировым
              именем:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <span className="px-4 py-2 bg-indigo-100 text-indigo-900 rounded-full font-medium">
                Ройо (Royo)
              </span>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-900 rounded-full font-medium">
                Соледад Фернандес
              </span>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-900 rounded-full font-medium">
                Хавьер Мулио
              </span>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-900 rounded-full font-medium">
                Наварро Монтллор
              </span>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-900 rounded-full font-medium">
                Голиа (G. Golia)
              </span>
            </div>
          </div>

          <div className="animate-slide-up delay-300">
            <p className="text-lg md:text-xl font-light text-gray-700 italic border-l-4 border-amber-500 pl-4 py-2">
              &quot;Наши выставки проходили в Московской Городской Думе, Мэрии
              Москвы, Крокус-Экспо и других престижных площадках.&quot;
            </p>
          </div>

          <div className="animate-slide-up delay-400 bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              Каждая картина имеет:
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
                <span className="text-lg font-medium">
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
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span className="text-lg font-medium">Испанский багет</span>
              </div>
            </div>
          </div>

          <div className="animate-slide-up delay-500">
            <p className="text-xl md:text-2xl font-medium text-gray-900 bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-xl">
              Мы предлагаем{' '}
              <span className="font-bold text-amber-700">
                эксклюзивные цены
              </span>{' '}
              ниже, чем в европейских и американских галереях.
            </p>
          </div>

          <div className="animate-slide-up delay-600">
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
