'use client';
import Image from 'next/image';

export default function AuthorSignature() {
  return (
    <section className="py-12 bg-[url('/public/styles/pattern.png')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-4xl mx-auto px-6">
        {/* Блок с подписью и фото */}
        <div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:items-start">
            {/* Левая часть с рамкой и подписью */}
            <div className="flex flex-col items-center md:order-2 md:self-center md:-mt-8 md:z-20 relative">
              {/* Рамка - скрыта на мобильных, прижата к левому краю на десктопе */}
            </div>
            <div className="text-center">
              <div className="font-serif text-gray-800 leading-relaxed">
                <p className="text-lg md:text-xl italic mb-6">С уважением,</p>
                <p className="text-base md:text-lg mb-6">
                  руководитель арт-бутика
                </p>
                <p className="text-lg md:text-xl font-medium text-amber-800 mb-6">
                  «MOON»
                </p>
                <p className="text-xl md:text-2xl font-semibold border-b border-amber-700 inline-block pb-1">
                  Максим Милохов
                </p>
              </div>
            </div>
            {/* Правая часть с фото в рамке */}
            <div className="relative w-64 h-auto mt-6 md:mt-0 md:order-1">
              <div className="relative">
                <Image
                  src="/styles/author-frame.png"
                  alt="Frame"
                  className="w-full h-auto absolute top-0 left-0 z-10"
                  width={500}
                  height={500}
                  priority
                />
                <Image
                  src="/user/aiam.jpg"
                  alt="Максим Милохов"
                  className="w-full h-auto object-cover relative z-0 p-4"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
