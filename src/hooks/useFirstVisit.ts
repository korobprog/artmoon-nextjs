'use client';

import { useState, useEffect } from 'react';

// Ключ для localStorage
const VISIT_KEY = 'hasVisitedBefore';
// Ключ для sessionStorage (для определения текущей сессии)
const SESSION_KEY = 'currentSessionId';

/**
 * Хук для определения первого посещения сайта
 * @returns объект с флагом первого посещения и функцией для сброса состояния
 */
export default function useFirstVisit() {
  // Начальное состояние - true, но будет обновлено в useEffect
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Проверяем только на клиенте и только один раз
    if (typeof window === 'undefined' || isInitialized) return;

    try {
      // Генерируем уникальный ID сессии, если его еще нет
      if (!sessionStorage.getItem(SESSION_KEY)) {
        const sessionId = Date.now().toString();
        sessionStorage.setItem(SESSION_KEY, sessionId);
      }

      // Проверяем, есть ли запись в localStorage
      const hasVisited = localStorage.getItem(VISIT_KEY);

      // Проверяем время последнего посещения
      const lastVisitTime = localStorage.getItem('lastVisitTime');
      const currentTime = Date.now();

      // Если прошло более 24 часов или нет записи о последнем посещении,
      // считаем это "первым" посещением для показа превью
      const isExpired =
        lastVisitTime &&
        currentTime - parseInt(lastVisitTime) > 24 * 60 * 60 * 1000;

      // Обновляем время последнего посещения
      localStorage.setItem('lastVisitTime', currentTime.toString());

      if (!hasVisited || isExpired) {
        // Если это первое посещение или прошло много времени
        setIsFirstVisit(true);
      } else {
        setIsFirstVisit(false);
      }
    } catch (error) {
      // В случае ошибки с localStorage (например, в приватном режиме)
      console.error('Error accessing storage:', error);
      setIsFirstVisit(false);
    }

    setIsInitialized(true);
  }, [isInitialized]);

  // Функция для установки флага посещения
  const setHasVisited = () => {
    try {
      localStorage.setItem(VISIT_KEY, 'true');
      localStorage.setItem('lastVisitTime', Date.now().toString());
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
    setIsFirstVisit(false);
  };

  // Функция для принудительного сброса состояния (для тестирования)
  const resetVisitState = () => {
    try {
      localStorage.removeItem(VISIT_KEY);
      localStorage.removeItem('lastVisitTime');
      sessionStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error('Error resetting storage:', error);
    }
  };

  return { isFirstVisit, setHasVisited, resetVisitState };
}
