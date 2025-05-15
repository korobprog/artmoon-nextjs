import './globals.css';
import HomePage from '@/components/HomePage';
import AuthorSignature from '@/components/AuthorSignature';
import FooterPage from '@/components/FooterPage';

export default function Home() {
  return (
    <>
      <HomePage />
      <AuthorSignature />
      <FooterPage />
    </>
  );
}
