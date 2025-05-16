'use client';

import Link from 'next/link';

interface GalleryButtonProps {
  href: string;
  text: string;
  className?: string;
}

export default function GalleryButton({
  href,
  text,
  className = 'inline-flex items-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 border-2 border-amber-400',
}: GalleryButtonProps) {
  return (
    <div className="flex justify-center">
      <Link href={href} className={className}>
        <span>{text}</span>
        <svg
          className="w-6 h-6 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </Link>
    </div>
  );
}
