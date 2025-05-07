import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/ui/provider';
import CurtainsContent from '@/components/CurtainsContent';
import ClientNavbar from '@/components/ClientNavbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Art Moon - Галерея искусств',
  description:
    'Авторские картины современных испанских и итальянских художников',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[url('/styles/pattern.png')] bg-cover bg-center min-h-screen`}
      >
        <Providers>
          <ClientNavbar />
          <CurtainsContent>{children}</CurtainsContent>
        </Providers>
      </body>
    </html>
  );
}
