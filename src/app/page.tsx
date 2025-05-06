import './globals.css';
import HomePage from '@/components/HomePage';
import Gallery from '@/components/Gallery';
import { CallbackForm } from '@/components/CallbackForm';
import AuthorSignature from '@/components/AuthorSignature';
import FooterPage from '@/components/FooterPage';
import ClientNavbar from '@/components/ClientNavbar';

export default function Home() {
  return (
    <>
      <ClientNavbar />
      <HomePage />
      <Gallery />
      <CallbackForm />
      <AuthorSignature />
      <FooterPage />
    </>
  );
}
