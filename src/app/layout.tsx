import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/ui/provider';
import CurtainsContent from '@/components/CurtainsContent';
import ClientNavbar from '@/components/ClientNavbar';
import YandexMetrika from '@/components/YandexMetrika';
import FontOptimizer from '@/components/FontOptimizer';
import ImageOptimizer from '@/components/ImageOptimizer';
import ScriptOptimizer from '@/components/ScriptOptimizer';
import ClientPreviewWrapper from '@/components/ClientPreviewWrapper';

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
        className="font-georgia antialiased bg-[url('/styles/pattern.png')] bg-cover bg-center min-h-screen opacity-0 transition-opacity duration-300"
        style={{ opacity: 1 }}
      >
        <FontOptimizer />
        <ImageOptimizer />
        <ScriptOptimizer />
        <Providers>
          <ClientPreviewWrapper />
          <ClientNavbar />
          <CurtainsContent>{children}</CurtainsContent>
        </Providers>
        <YandexMetrika />
      </body>
    </html>
  );
}
