import Navbar from '@/components/Navbar';
import './globals.css';
import HomePage from '@/components/HomePage';
import Gallery from '@/components/Gallery';
import { CallbackForm } from '@/components/CallbackForm';
import AuthorSignature from '@/components/AuthorSignature';
import FooterPage from '@/components/FooterPage';

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Gallery />
      <CallbackForm />
      <AuthorSignature />
      <FooterPage />
    </>
  );
}
