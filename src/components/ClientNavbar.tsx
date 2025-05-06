'use client';

import dynamic from 'next/dynamic';

// Динамический импорт Navbar с отключенным SSR
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });

export default function ClientNavbar() {
  return <Navbar />;
}
