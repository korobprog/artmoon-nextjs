import Navbar from '@/components/Navbar';
import './globals.css';
import HomePage from '@/components/HomePage';
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Gallery />
    </>
  );
}
