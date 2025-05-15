'use client';

import React, { useState, useEffect } from 'react';
import ClientNavbar from '@/components/ClientNavbar';
import FooterPage from '@/components/FooterPage';
import YouTubeVideo from '@/components/YouTubeVideo';
import Image from 'next/image';
import ImageSlider from '@/components/ImageSlider';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// Интерфейс для слайдов лайтбокса
interface LightboxSlide {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export default function ArtistsPage() {
  // Состояние для отслеживания, какие тексты развернуты
  const [expandedArtists, setExpandedArtists] = useState<number[]>([]);
  // Состояние для лайтбокса
  const [index, setIndex] = useState(-1);

  // Функция для переключения состояния развернутого текста
  const toggleArtistText = (artistId: number) => {
    if (expandedArtists.includes(artistId)) {
      setExpandedArtists(expandedArtists.filter((id) => id !== artistId));
    } else {
      setExpandedArtists([...expandedArtists, artistId]);
    }
  };

  // Обработка якорных ссылок
  useEffect(() => {
    // Проверяем, есть ли якорь в URL
    if (window.location.hash) {
      // Даем странице время полностью загрузиться
      setTimeout(() => {
        const id = window.location.hash.substring(1); // Убираем символ # из начала
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Увеличиваем задержку до 500мс для надежности
    }
  }, []);

  // Добавляем CSS для вертикального отображения информации о фотографии
  useEffect(() => {
    // Добавляем стили только когда лайтбокс открыт
    if (index >= 0) {
      // Создаем элемент стиля
      const style = document.createElement('style');
      style.id = 'lightbox-custom-styles';
      style.innerHTML = `
        .yarl__slide {
          flex-direction: column !important;
        }
        .yarl__slide_captions {
          position: relative !important;
          width: 100% !important;
          max-width: 100% !important;
          padding: 15px 0 !important;
          background-color: rgba(0, 0, 0, 0.5) !important;
          color: white !important;
          text-align: center !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Удаляем стили при закрытии лайтбокса
    return () => {
      const existingStyle = document.getElementById('lightbox-custom-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [index]);

  // Данные о художниках с полными текстами
  const artists = [
    {
      id: 1,
      name: 'Хавьер Мулио',
      country: 'Испания',
      image: '/user/javier.jpg',
      description:
        'Этот художник является мастером мирового уровня в стиле гиперреализм.',
      fullDescription: `Этот художник является мастером мирового уровня в стиле гиперреализм.
Хавьер с фотографической точностью передаёт изображения стеклянной и керамической посуды в своих натюрмортах. Его работы представлены во многих галереях США и Англии, таких как Art Galleries (Вашингтон), Hanson Gallery (Сан-Франциско), Burlington Paintings (Лондон), The Davie Gallery (Лондон).
Родился в Испании в 1957 г. Начал курс обучения живописи в Школе Милы Гомес, выдающейся художницы с 1973 по 1976 гг. Свои первые живописные изображения создал в возрасте 14 лет. То, что подтолкнуло этого художника начать заниматься живописью, – это большое количество художников, проживающих в городе, и дружеские отношения с некоторыми из них. С 21 года Хавьер начал писать картины профессионально, выбрав технику гиперреализма, к которой и относятся его "Натюрморты". Этим жанром он владеет легко и естественно, что можно достичь, лишь овладев техникой и мастерством живописца.

Многие искуствоведы говорят о нем,как об одном из лучших художников в мире, в своем жанре.А также,что его невозможно скопировать из-за его безупречной техники.

Его работы находятся в частных коллекциях у очень известных людей, например у арабских шейхов, архитекторов разных стран, и среди известных людей мира бизнеса.

А также он устраивал различные выставки, как в Испании, так и за рубежом. Среди прочих стран можно отметить Англию, Россию и Соединенные Штаты, где работы Хавьера очень известны, ценятся и выставляются в самых престижных галереях. Кроме того, с 1997г. он выставляет свои картины в "Artexpo", Нью-Йорк.

В Америке его картины выставляют такие известные галереи,как:
P&C Art Galleries,Washington D.C./Hanson Gallery,San Francisco,CA./
Cutter & Cutter Fine Art Galleries,St,Augustine,Fl./Robert Paul Galleries,
Stowe,VT./Simic Galleries,La Jolla,CA.
В Англии:Burlington Paintings,London./TheDavie Gallery.`,
    },
    {
      id: 2,
      name: 'Наварро Монтллор',
      country: 'Испания',
      image: '/user/navarro1.jpg',
      description:
        'Данный автор является одним из лучших современных художников-маринистов в мире в стиле гиперреализм.',
      fullDescription: `Данный автор является одним из лучших современных художников-маринистов в мире в стиле гиперреализм. Его морские пейзажи воспринимаются как реальные, где чувствуется дыхание моря и слышен плеск волн. Его работы также представлены в галереях США и Англии, таких как Art Galleries (Вашингтон), Hanson Gallery (Сан-Франциско), Burlington Paintings (Лондон), The Davie Gallery (Лондон).
Наварро Монтллор – испанский художник, родился в Испании в 1965. Свой первый курс изучения живописи он прошел в Школе Изящных Искусств своего родного города. Затем он продолжил учебу в Высшей Школе Сан Карлос. Возвратившись, он начал работать над совершенствованием своей техники рядом со своим отцом, который, в свою очередь, был учеником испанского художника Сельеса. Хотя к тому времени он уже владеет всеми стилями, отдает предпочтение  сюжетам, на которые его вдохновляет море, и именно на этой теме он на самом деле  специализируется и умеет извлечь всю спектр  красок  и  блеск из своей палитры. Он принимает участие в различных коллективных выставках в Кальпе  и  Бенидорме. Свои основные персональные выставки он устраивает  в Галерее EMECE, в1995 и 1996 гг. Кроме того, начиная с 2001 г., его картины  ежегодно выставляются в "Artexpo", Нью-Йорк, а также можно отметить его участие в различных  коллективных выставках в США, России, Великобритании.`,
    },
    {
      id: 3,
      name: 'Соледад Фернандес',
      country: 'Испания',
      image: '/user/artist-image-2.jpg',
      description:
        'Известная испанская художница, картины которой представлены во многих музеях.',
      fullDescription: `Известная испанская художница, картины которой представлены во многих музеях, таких как Quentovie (ле Туке, Франция), Музей Королевской Академии Изобразительных Искусств San Fernando (Мадрид, Испания), Национальный Музей Изобразительных Искусств (Ла-Валетта, Мальта) и других. Она награждена различными премиями и наградами: Первая Премия Иностранной Живописи на XXIX Международном конкурсе Grolla d'oro de Treviso (Венеция), Первая Премия на VI Конкурсе Живописи Duran (Мадрид), Премия Germinal на Конкурсе las Bellas Artes (Мадрид). Её работы изображены даже на национальных марках Испании.
Я родилась в Мадриде в 1949 г. Работала я недалеко от Мадрида, в Кольядо Вильальба. Сколько я себя помню, вижу себя с карандашом в руках, именно таким образом мне хотелось выражать себя. Я постоянно рисовала; это было почти болезнью. Самым лучшим подарком, который я помню, была коробка с акварелью, ее подарил мне мой отец, когда я болела, чтобы приободрить меня. Для меня живопись была и является сейчас одним из самых важных занятий в моей жизни. В 1965, когда я еще была студенткой и заканчивала учебу, я посещала мастерскую художника Хосе Гутьерреса Валье, где провела почти восемь лет, изучая различные грани ремесла, например, как смотреть на предмет, как готовить холст, и даже, как рисовать
тело. Я работала во всех техниках: рисунок, акварель, пастель, масло… Я очень горжусь этими годами обучения: тем, что я художник из «мастерской».`,
    },
    {
      id: 4,
      name: 'Ройо',
      country: 'Испания',
      image: '/user/royo.jpg',
      description:
        'Работы данного автора находятся в постоянной экспозиции в десятках музеев Америки и Европы.',
      fullDescription: `Ройо (Royo), 73 года, Испания
Работы данного автора находятся в постоянной экспозиции в десятках музеев Америки и Европы, таких как Haggin (Стоктон, Калифорния), Almodí (Валенсия), Diocesà (Барселона), а также продаются в одном из самых фешенебельных торговых центров мира Harrods (Лондон).
Галеристы говорят о нём, как о самом быстрорастущем в цене современном художнике.
Высокопоставленные лица и бизнес-элита разных стран мира посещают персональные выставки художника и приобретают его картины.
Ройо родился в Испании 1941г., в г. Валенсии, и очень рано проявил свой талант художника. Когда ему было 9 лет, его отец, выдающийся врач и энтузиаст искусства, нанял частных преподавателей, чтобы они обучали его сына рисованию, живописи и скульптуре. В возрасте 14 лет он поступил в Королевскую Академию Изящных Искусств Сан-Карлос в Валенсии. В 18 лет юноша продолжил свою учебу в качестве ученика Адольфо Феррера Амблата, Председателя Художественных Мастерских Академии Сан-Карлос.  Кроме того, в это же время  он посещал основные европейские музеи для того, чтобы изучать работы знаменитых художников  –  мастеров живописи  –  Веласкеса, Гойи, Ренуара, Моне и, в числе других,  –  Сорольи.`,
    },
    {
      id: 5,
      name: 'Элиос Хисберт',
      country: 'Испания',
      image: '/user/elios.jpg',
      description:
        'Как критики, так и современная публика считают его одним из самых талантливых художников в стиле импрессионизм.',
      fullDescription: `Элиос Хисберт (Elios Gisbert), Испания
Как критики, так и современная публика считают его одним из самых талантливых художников в стиле импрессионизм. Он получил более 38 престижных наград и выставлялся на 100 персональных выставках, проходивших по всей Испании и Португалии.
Картины этого художника находятся в коллекциях городских муниципальных советов Барселоны и Мадрида. Его имя упомянуто в «Большой Энциклопедии Валенсии» и «Словаре валенсианских художников ХХ века».
Элиос Хисберт – испанский художник, родился в Испании, в 1948 г.

От своего отца, тоже художника, он унаследовал страсть к искусству и свои первые представления о рисунке и живописи. Позже он поступил учиться в муниципальную Школу Изящных Искусств, подготовительную для учебы в Высшей Школе Изящных Искусств.

С 1970 г. он полностью посвятил себя живописи, как профессиональной деятельности.`,
    },
  ];

  // YouTube видео о художниках
  const artistVideos = [
    { id: 'gootBr5_04o', title: 'Интервью с художниками нашей галереи' },
    { id: 'UhRt4sIwSS8', title: 'Интервью с художниками' },
    { id: 'ka0NIX_h_9M', title: 'Интервью с художниками' },
    { id: '8mKeCl9nPRk', title: 'Интервью с художниками' },
    { id: 'yYx_48YBIpo', title: 'Интервью с художниками' },
    { id: '-1I6Rp6hiIc', title: 'Интервью с художниками' },
    { id: 'MB-54WURuAk', title: 'Интервью с художниками' },
    { id: '6610f4prfjc', title: 'Интервью с художниками' },
    { id: 'Fp8wcbNf9lU', title: 'Интервью с художниками' },
    { id: 'mLpiScc_ft4', title: 'Интервью с художниками' },
    { id: 'eXs8hLE6Bxc', title: 'Интервью с художниками' },
    { id: 'lgDMHa7d4R0', title: 'Интервью с художниками' },
    { id: 'fcIgcFHQbUs', title: 'Интервью с художниками' },
    { id: 'jo8IAxD27Lw', title: 'Интервью с художниками' },
    { id: 'uiKLhnq83So', title: 'Интервью с художниками' },
  ];

  return (
    <>
      <ClientNavbar />
      <div className="container mx-auto px-4 py-8 md:py-16 mt-[150px] md:mt-[-300px]">
        <h1 className="text-3xl font-georgia-bold mb-8 text-center text-[#8a5d9e]">
          Художники
        </h1>
        <div className="container mx-auto px-4">
          <ImageSlider />
        </div>

        {/* Основная информация */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-lg mb-8 mt-8 md:mb-12">
          <p className="mb-3 md:mb-4 text-base md:text-lg font-georgia">
            Мы гордимся сотрудничеством с талантливыми художниками со всего
            мира. Наша галерея представляет работы как признанных мастеров, так
            и восходящих звезд современного искусства.
          </p>
          <p className="mb-3 md:mb-4 text-base md:text-lg font-georgia">
            Каждый художник, представленный в нашей коллекции, обладает
            уникальным стилем и видением, что делает нашу галерею разнообразной
            и интересной для ценителей искусства.
          </p>
          <p className="mb-3 md:mb-4 text-base md:text-lg font-georgia">
            Среди наших художников вы найдете мастеров различных жанров и
            техник: от классической живописи до авангардных экспериментов, от
            реализма до абстракции.
          </p>
          <p className="text-base md:text-lg font-georgia">
            Мы регулярно проводим выставки и встречи с художниками, где вы
            можете лично познакомиться с авторами и узнать больше об их
            творческом пути и вдохновении.
          </p>
        </div>

        {/* Видео о художниках */}
        <div className="max-w-6xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-georgia-bold mb-4 md:mb-6 text-center text-[#8a5d9e]">
            Видео с Художниками
          </h2>
          <p className="text-center mb-6 font-georgia">
            Видео интервью с художниками, директора галереи Art Boutique «MOON»
            Максима Милохова
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {artistVideos.map((video, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg"
              >
                <YouTubeVideo videoId={video.id} className="w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Профили художников */}
        <div className="max-w-6xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-georgia-bold mb-4 md:mb-6 text-center text-[#8a5d9e]">
            Наши художники
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg flex flex-col items-center"
              >
                <div className="relative w-full h-[200px] md:h-[250px] mb-3 overflow-hidden rounded-lg">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-georgia-bold">
                  {artist.name}
                </h3>
                <p className="text-sm md:text-base text-shadow-gray-800 mb-2 font-georgia-italic text-[rgb(92,79,61)]">
                  {artist.country}
                </p>
                <div className="text-sm md:text-base text-center font-georgia text-[rgb(92,79,61)]">
                  <p>{artist.description}</p>

                  {expandedArtists.includes(artist.id) ? (
                    <>
                      <div className="mt-4 whitespace-pre-line font-georgia">
                        {artist.fullDescription}
                      </div>
                      <button
                        onClick={() => toggleArtistText(artist.id)}
                        className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Скрыть текст
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => toggleArtistText(artist.id)}
                      className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Читать далее
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Фото с художниками и выставок */}
        <div className="max-w-6xl mx-auto" id="exhibition">
          <h2 className="text-xl md:text-2xl font-georgia-bold mb-4 md:mb-6 text-center text-[#8a5d9e]">
            Фото с художниками и с некоторых наших выставок
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {[
              {
                id: 1,
                url: '/image-exhibitions/034.jpg',
                title: 'Выставка в Мэрии 2006 г. С Никасом Сафроновым',
              },
              {
                id: 2,
                url: '/image-exhibitions/Untitled-3.jpg',
                title: 'С Ройо (слева)',
              },
              {
                id: 3,
                url: '/image-exhibitions/Untitled-4.jpg',
                title: 'С Хавьером Мулио (справа)',
              },
              {
                id: 4,
                url: '/image-exhibitions/Untitled-5.jpg',
                title: 'С Соледад Фернандез',
              },
              {
                id: 5,
                url: '/image-exhibitions/Untitled-6.jpg',
                title: 'С Наварро Монтллор (справа)',
              },
              {
                id: 6,
                url: '/image-exhibitions/Untitled-11.jpg',
                title: 'С Маркосом Эстеве (слева)',
              },
              {
                id: 7,
                url: '/image-exhibitions/Untitled-21.jpg',
                title: 'С Хесусом Наварро (справа)',
              },
              {
                id: 8,
                url: '/image-exhibitions/Untitled-31.jpg',
                title: 'С Элиосом Хисберт (справа)',
              },
              {
                id: 9,
                url: '/image-exhibitions/Untitled-12.jpg',
                title: 'С Франческо Санчесом (слева)',
              },
              {
                id: 10,
                url: '/image-exhibitions/Untitled-22.jpg',
                title: 'С Альфредо Наварро (слева)',
              },
              {
                id: 11,
                url: '/image-exhibitions/Untitled-32.jpg',
                title: 'С Висентэ Эспарса (слева)',
              },
              {
                id: 12,
                url: '/image-exhibitions/С-Амедео-Борсоне_.jpg',
                title: 'С Амедео Борсоне',
              },
            ].map((photo) => (
              <div
                key={photo.id}
                className="photo-item relative cursor-pointer"
                onClick={() => setIndex(photo.id - 1)}
              >
                <div className="frame relative">
                  {/* Рамка */}
                  <div
                    className="frame-border absolute top-0 left-0 w-full h-full z-10"
                    style={{
                      backgroundImage: 'url(/styles/artists-gallery-frame.png)',
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  ></div>

                  {/* Изображение */}
                  <div className="image-container relative pt-[100%]">
                    <Image
                      src={photo.url}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        padding: '15px',
                      }}
                      className="hover:opacity-90 transition-opacity"
                    />
                  </div>
                </div>

                {/* Подпись к фото */}
                <div className="photo-title text-center mt-2 mb-6 px-2 text-sm font-georgia text-[rgb(92,79,61)]">
                  {photo.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterPage />

      {/* Массив фотографий для лайтбокса */}
      {(() => {
        const exhibitionPhotos = [
          {
            id: 1,
            url: '/image-exhibitions/034.jpg',
            title: 'Выставка в Мэрии 2006 г. С Никасом Сафроновым',
          },
          {
            id: 2,
            url: '/image-exhibitions/Untitled-3.jpg',
            title: 'С Ройо (слева)',
          },
          {
            id: 3,
            url: '/image-exhibitions/Untitled-4.jpg',
            title: 'С Хавьером Мулио (справа)',
          },
          {
            id: 4,
            url: '/image-exhibitions/Untitled-5.jpg',
            title: 'С Соледад Фернандез',
          },
          {
            id: 5,
            url: '/image-exhibitions/Untitled-6.jpg',
            title: 'С Наварро Монтллор (справа)',
          },
          {
            id: 6,
            url: '/image-exhibitions/Untitled-11.jpg',
            title: 'С Маркосом Эстеве (слева)',
          },
          {
            id: 7,
            url: '/image-exhibitions/Untitled-21.jpg',
            title: 'С Хесусом Наварро (справа)',
          },
          {
            id: 8,
            url: '/image-exhibitions/Untitled-31.jpg',
            title: 'С Элиосом Хисберт (справа)',
          },
          {
            id: 9,
            url: '/image-exhibitions/Untitled-12.jpg',
            title: 'С Франческо Санчесом (слева)',
          },
          {
            id: 10,
            url: '/image-exhibitions/Untitled-22.jpg',
            title: 'С Альфредо Наварро (слева)',
          },
          {
            id: 11,
            url: '/image-exhibitions/Untitled-32.jpg',
            title: 'С Висентэ Эспарса (слева)',
          },
          {
            id: 12,
            url: '/image-exhibitions/С-Амедео-Борсоне_.jpg',
            title: 'С Амедео Борсоне',
          },
        ];

        // Подготовка слайдов для лайтбокса
        const slides: LightboxSlide[] = exhibitionPhotos.map((photo) => ({
          src: photo.url,
          alt: photo.title,
          title: photo.title,
        }));

        return (
          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={slides}
            plugins={[Zoom, Thumbnails]}
            carousel={{
              padding: '0px',
              spacing: '30px',
              imageFit: 'contain',
            }}
            styles={{
              container: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
              slide: { justifyContent: 'center', alignItems: 'center' },
            }}
            zoom={{
              maxZoomPixelRatio: 3,
              zoomInMultiplier: 2,
              doubleTapDelay: 300,
              doubleClickDelay: 300,
              keyboardMoveDistance: 50,
              wheelZoomDistanceFactor: 100,
              pinchZoomDistanceFactor: 100,
            }}
            thumbnails={{
              position: 'bottom',
              width: 120,
              height: 80,
              border: 1,
              borderRadius: 4,
              padding: 4,
              gap: 16,
            }}
            render={{
              iconPrev: () => (
                <span className="yarl__button yarl__button_prev">❮</span>
              ),
              iconNext: () => (
                <span className="yarl__button yarl__button_next">❯</span>
              ),
              iconClose: () => (
                <span className="yarl__button yarl__button_close">✕</span>
              ),
              slideHeader: () => null, // Убираем заголовок сверху
              slideFooter: (props) => {
                const slide = props.slide as LightboxSlide;
                return (
                  <div
                    className="yarl__slide_title text-center py-4"
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      padding: '15px 0',
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                  </div>
                );
              },
            }}
          />
        );
      })()}
    </>
  );
}
