'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Ленивая загрузка компонента CertificateInfo
const CertificateInfo = dynamic(() => import('../CertificateInfo'), {
  loading: () => <CertificateInfoPlaceholder />,
  ssr: false, // Отключаем SSR для этого компонента
});

// Компонент-заглушка, который отображается во время загрузки
const CertificateInfoPlaceholder = () => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md"
      style={{ minHeight: '80px' }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-black">
        <div className="h-8 w-48 bg-amber-100 rounded-lg animate-pulse"></div>
        <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-8 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

/**
 * Обертка для ленивой загрузки компонента CertificateInfo
 */
export default function LazyCertificateInfo() {
  return (
    <Suspense fallback={<CertificateInfoPlaceholder />}>
      <CertificateInfo />
    </Suspense>
  );
}
