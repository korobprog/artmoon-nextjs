'use client';

import Image from 'next/image';
import { artists } from '@/data/artists';

export default function ArtistsList() {
  return (
    <div className="mb-8 pb-6 border-b border-gray-700">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
        {artists.map((artist, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-20 h-20 mb-2 overflow-hidden rounded-full border-2 border-yellow-400 shadow-lg">
              <Image
                src={artist.image}
                alt={artist.name}
                width={80}
                height={80}
                className="object-cover"
                priority={index < 2} // Приоритетная загрузка для первых двух художников
              />
            </div>
            <p className="text-center text-sm font-georgia text-black">
              {artist.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
