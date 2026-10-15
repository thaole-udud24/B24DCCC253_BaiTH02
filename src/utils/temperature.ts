import type { TemperatureUnit } from '../types/weather';

export function toFahrenheit(celsius: number): number {
  return celsius * 9 / 5 + 32;
}

export function formatTemperature(celsius: number, unit: TemperatureUnit): string {
  if (unit === 'F') {
    return `${Math.round(toFahrenheit(celsius))}°F`;
  }
  return `${Math.round(celsius)}°C`;
}

export function formatTemperatureValue(celsius: number, unit: TemperatureUnit): number {
  if (unit === 'F') {
    return Math.round(toFahrenheit(celsius));
  }
  return Math.round(celsius);
}
