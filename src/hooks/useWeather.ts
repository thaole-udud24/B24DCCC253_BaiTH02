import { useState, useEffect, useRef, useCallback } from 'react';
import type { City, WeatherState } from '../types/weather';
import { fetchWeather, getStaleCache, clearCityCache } from '../services/weatherApi';

export function useWeather(selectedCity: City | null) {
  const [state, setState] = useState<WeatherState>({ status: 'idle' });
  const abortControllerRef = useRef<AbortController | null>(null);
  const loadWeather = useCallback(async (city: City, forceRefresh = false) => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (forceRefresh) {
      clearCityCache(city.id);
    }

    const stale = getStaleCache(city.id);
    setState({ status: 'loading' });

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const data = await fetchWeather(city, controller.signal);
      if (!controller.signal.aborted) {
        setState({ status: 'success', data });
      }
    } catch (err: unknown) {
      if (controller.signal.aborted) return;

      const error = err instanceof Error ? err.message : 'Không thể tải dữ liệu thời tiết.';
      setState({ status: 'error', error, cachedData: stale });
    }
  }, []);

  useEffect(() => {
    if (!selectedCity) {
      setState({ status: 'idle' });
      return;
    }
    loadWeather(selectedCity);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [selectedCity, loadWeather]);

  const retry = useCallback(() => {
    if (selectedCity) {
      loadWeather(selectedCity, true);
    }
  }, [selectedCity, loadWeather]);

  return { state, retry };
}
