export interface ExhibitionPhoto {
  id: number;
  url: string;
  title: string;
}

export const exhibitionPhotos: ExhibitionPhoto[] = [
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
];

export const artistPhotos: ExhibitionPhoto[] = [
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
];
