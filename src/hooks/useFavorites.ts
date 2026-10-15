import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'maymua_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const arr: string[] = JSON.parse(stored);
        return new Set(arr);
      }
    } catch {
      // ignore parse errors
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = useCallback((cityId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(cityId)) {
        next.delete(cityId);
      } else {
        next.add(cityId);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((cityId: string) => favorites.has(cityId), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
