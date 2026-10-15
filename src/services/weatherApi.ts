import type { City, WeatherApiResponse, WeatherData } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

// In-memory cache
const weatherCache = new Map<string, WeatherData>();

function buildUrl(city: City): string {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m',
    hourly: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,precipitation_probability,uv_index',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max',
    timezone: 'Asia/Ho_Chi_Minh',
    forecast_days: '7',
    forecast_hours: '24',
  });
  return `${BASE_URL}?${params.toString()}`;
}

function isCacheValid(data: WeatherData): boolean {
  return Date.now() - data.fetchedAt < CACHE_DURATION_MS;
}

export function getCachedWeather(cityId: string): WeatherData | null {
  const cached = weatherCache.get(cityId);
  if (cached && isCacheValid(cached)) {
    return cached;
  }
  return null;
}

export function getStaleCache(cityId: string): WeatherData | undefined {
  return weatherCache.get(cityId);
}

export async function fetchWeather(
  city: City,
  signal: AbortSignal
): Promise<WeatherData> {
  // Return valid cache if available
  const cached = getCachedWeather(city.id);
  if (cached) return cached;

  const url = buildUrl(city);
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Lỗi kết nối API: ${response.status} ${response.statusText}`);
  }

  const raw: WeatherApiResponse = await response.json();

  // Validate response structure
  if (!raw.current || !raw.daily) {
    throw new Error('Dữ liệu thời tiết không hợp lệ từ máy chủ.');
  }

  const data: WeatherData = {
    city,
    current: raw.current,
    hourly: raw.hourly,
    daily: raw.daily,
    fetchedAt: Date.now(),
  };

  weatherCache.set(city.id, data);
  return data;
}

export function clearCityCache(cityId: string): void {
  weatherCache.delete(cityId);
}
