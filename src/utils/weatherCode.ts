import type { WeatherCodeInfo, WeatherIconType } from '../types/weather';

interface WeatherCodeEntry {
  description: string;
  iconType: WeatherIconType;
  gradientClass: string;
}

const WEATHER_CODE_MAP: Record<number, WeatherCodeEntry> = {
  0: { description: 'Trời quang', iconType: 'sunny', gradientClass: 'gradient-sunny' },
  1: { description: 'Chủ yếu quang đãng', iconType: 'mostly-clear', gradientClass: 'gradient-sunny' },
  2: { description: 'Có mây rải rác', iconType: 'partly-cloudy', gradientClass: 'gradient-partly-cloudy' },
  3: { description: 'Nhiều mây', iconType: 'cloudy', gradientClass: 'gradient-cloudy' },
  45: { description: 'Sương mù', iconType: 'foggy', gradientClass: 'gradient-foggy' },
  48: { description: 'Sương mù dày', iconType: 'foggy', gradientClass: 'gradient-foggy' },
  51: { description: 'Mưa phùn nhẹ', iconType: 'drizzle', gradientClass: 'gradient-rainy' },
  53: { description: 'Mưa phùn vừa', iconType: 'drizzle', gradientClass: 'gradient-rainy' },
  55: { description: 'Mưa phùn dày', iconType: 'drizzle', gradientClass: 'gradient-rainy' },
  56: { description: 'Mưa phùn đóng băng nhẹ', iconType: 'freezing-drizzle', gradientClass: 'gradient-rainy' },
  57: { description: 'Mưa phùn đóng băng dày', iconType: 'freezing-drizzle', gradientClass: 'gradient-rainy' },
  61: { description: 'Mưa nhỏ', iconType: 'rain-light', gradientClass: 'gradient-rainy' },
  63: { description: 'Mưa vừa', iconType: 'rain-moderate', gradientClass: 'gradient-rainy' },
  65: { description: 'Mưa to', iconType: 'rain-heavy', gradientClass: 'gradient-rainy' },
  66: { description: 'Mưa đóng băng nhẹ', iconType: 'freezing-rain', gradientClass: 'gradient-rainy' },
  67: { description: 'Mưa đóng băng nặng', iconType: 'freezing-rain', gradientClass: 'gradient-rainy' },
  71: { description: 'Tuyết rơi nhẹ', iconType: 'snow', gradientClass: 'gradient-cloudy' },
  73: { description: 'Tuyết rơi vừa', iconType: 'snow', gradientClass: 'gradient-cloudy' },
  75: { description: 'Tuyết rơi dày', iconType: 'snow', gradientClass: 'gradient-cloudy' },
  77: { description: 'Hạt tuyết', iconType: 'snow-grains', gradientClass: 'gradient-cloudy' },
  80: { description: 'Mưa rào nhẹ', iconType: 'showers', gradientClass: 'gradient-rainy' },
  81: { description: 'Mưa rào vừa', iconType: 'showers', gradientClass: 'gradient-rainy' },
  82: { description: 'Mưa rào mạnh', iconType: 'showers', gradientClass: 'gradient-rainy' },
  85: { description: 'Mưa tuyết rào nhẹ', iconType: 'snow-showers', gradientClass: 'gradient-cloudy' },
  86: { description: 'Mưa tuyết rào nặng', iconType: 'snow-showers', gradientClass: 'gradient-cloudy' },
  95: { description: 'Dông', iconType: 'thunderstorm', gradientClass: 'gradient-stormy' },
  96: { description: 'Dông kèm mưa đá nhẹ', iconType: 'thunderstorm-hail', gradientClass: 'gradient-stormy' },
  99: { description: 'Dông kèm mưa đá nặng', iconType: 'thunderstorm-hail', gradientClass: 'gradient-stormy' },
};

const DEFAULT_ENTRY: WeatherCodeEntry = {
  description: 'Không xác định',
  iconType: 'unknown',
  gradientClass: 'gradient-partly-cloudy',
};

export function getWeatherInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODE_MAP[code] ?? DEFAULT_ENTRY;
}

export function getWeatherDescription(code: number): string {
  return getWeatherInfo(code).description;
}

export function getWeatherIconType(code: number): WeatherIconType {
  return getWeatherInfo(code).iconType;
}

export function getWeatherGradientClass(code: number): string {
  return getWeatherInfo(code).gradientClass;
}
