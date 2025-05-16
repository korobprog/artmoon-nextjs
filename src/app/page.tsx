import './globals.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import AuthorSignature from '@/components/AuthorSignature';
import FooterPage from '@/components/FooterPage';

// Ленивая загрузка компонента HomePage
const HomePage = dynamic(() => import('@/components/HomePage'), {
  loading: () => <HomePageLoading />,
  ssr: true, // Включаем SSR для основного контента
});

// Компонент-заглушка для HomePage
const HomePageLoading = () => {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-screen py-10 bg-[url('/styles/pattern.png')] bg-cover bg-center bg-no-repeat"
      style={{ position: 'relative', zIndex: 5 }}
    >
      <div className="top-20 max-w-4xl mx-auto text-center px-6 relative z-10 text-white">
        <div className="space-y-8">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
          <div className="h-8 bg-gray-200 rounded-lg animate-pulse mb-4 max-w-lg mx-auto"></div>
          <div className="h-24 bg-gray-100 rounded-lg animate-pulse mb-8"></div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <>
      <Suspense fallback={<HomePageLoading />}>
        <HomePage />
      </Suspense>
      <AuthorSignature />
      <FooterPage />
    </>
  );
}
