'use client';

export default function CertificateInfo() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-black">
        <span className="text-xl font-georgia-bold text-amber-700 bg-gradient-to-r from-amber-50 to-amber-100 px-4 py-2 rounded-lg shadow-sm">
          Каждая картина имеет
        </span>
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-amber-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span className="text-lg font-georgia text-neutral-800">
            Сертификаты подлинности
          </span>
        </div>
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-amber-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span className="text-lg font-georgia text-neutral-800">
            Испанский багет
          </span>
        </div>
      </div>
    </div>
  );
}
