'use client';

import { useState, FormEvent } from 'react';

export function CallbackForm() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const trimmedName = name.trim();
      const trimmedPhone = phone.trim();

      if (!trimmedName || !trimmedPhone) {
        throw new Error('Пожалуйста, заполните все поля');
      }

      if (!/^[\d\+][\d\s\-\(\)]{7,}$/.test(trimmedPhone)) {
        throw new Error('Введите корректный номер телефона');
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при отправке формы');
      }

      console.log('Форма успешно отправлена');
      setShowSuccess(true);
      setIsFormOpen(false);
      setName('');
      setPhone('');

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Ошибка отправки формы:', err);
      setError(
        err instanceof Error ? err.message : 'Произошла ошибка при отправке'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsFormOpen(!isFormOpen);
    setError('');
  };

  return (
    <>
      {/* Фиксированная кнопка вызова формы */}
      <button
        onClick={toggleForm}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 z-50 hover:cursor-pointer"
        aria-label="Открыть форму обратного звонка"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </button>

      {/* Модальное окно формы */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Размытый фон */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleForm}
          ></div>
          <div className="max-w-md w-full mx-4 p-6 bg-white rounded-lg shadow-xl relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Заказать обратный звонок
              </h2>
              <button
                onClick={toggleForm}
                className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                aria-label="Закрыть форму"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
                  placeholder="Введите ваше имя"
                  disabled={isLoading}
                  style={{ fontSize: '16px' }}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 placeholder-gray-400"
                  placeholder="+7 (___) ___-__-__"
                  disabled={isLoading}
                  style={{ fontSize: '16px' }}
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors hover:cursor-pointer ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  'Отправить'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно успешной отправки */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Заявка отправлена!
            </h3>
            <p className="text-gray-600 mb-4">
              Мы свяжемся с вами в ближайшее время.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
