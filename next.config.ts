/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  // Настройки для оптимизации производительности
  images: {
    domains: [],
    // Оптимизация изображений
    formats: ['image/webp'],
    // Отключаем размытие при загрузке для Vercel
    minimumCacheTTL: 60,
  },
  // Настройки для Vercel
  distDir: '.next',
  // Оптимизация загрузки страниц
  poweredByHeader: false,
  // Настройки для кэширования
  onDemandEntries: {
    // Период, в течение которого страница должна оставаться в памяти
    maxInactiveAge: 25 * 1000,
    // Количество страниц, которые должны оставаться в памяти
    pagesBufferLength: 2,
  },
  // Настройки для сжатия
  compress: true,
  // Настройки для производительности
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
