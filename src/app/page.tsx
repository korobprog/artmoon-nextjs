import './globals.css';
import HomePage from '@/components/HomePage';
import Gallery from '@/components/Gallery';
import AuthorSignature from '@/components/AuthorSignature';
import FooterPage from '@/components/FooterPage';

export default function Home() {
  return (
    <>
      <HomePage />
      <Gallery />
      <AuthorSignature />
      <FooterPage />
    </>
  );
}
