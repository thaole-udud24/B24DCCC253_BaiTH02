export type CityRegion = 'all' | 'north' | 'central' | 'south';

export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  region: 'north' | 'central' | 'south';
  regionName: string;
}

export interface CurrentWeatherData {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature?: number;
  is_day?: number;
  precipitation?: number;
  weather_code: number;
  surface_pressure?: number;
  wind_speed_10m: number;
  wind_direction_10m?: number;
  time: string;
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
  relative_humidity_2m?: number[];
  wind_speed_10m?: number[];
  wind_direction_10m?: number[];
  uv_index?: number[];
}

export interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise?: string[];
  sunset?: string[];
  uv_index_max?: number[];
  precipitation_sum?: number[];
  precipitation_probability_max?: number[];
}

export interface WeatherApiResponse {
  current: CurrentWeatherData;
  hourly?: HourlyWeatherData;
  daily: DailyWeatherData;
}

export interface WeatherData {
  city: City;
  current: CurrentWeatherData;
  hourly?: HourlyWeatherData;
  daily: DailyWeatherData;
  fetchedAt: number;
}

export interface ForecastDay {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
}

export type TemperatureUnit = 'C' | 'F';

export type WeatherState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: WeatherData }
  | { status: 'error'; error: string; cachedData?: WeatherData };

export interface WeatherCodeInfo {
  description: string;
  iconType: WeatherIconType;
  gradientClass: string;
}

export type WeatherIconType =
  | 'sunny'
  | 'mostly-clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'foggy'
  | 'drizzle'
  | 'freezing-drizzle'
  | 'rain-light'
  | 'rain-moderate'
  | 'rain-heavy'
  | 'freezing-rain'
  | 'snow'
  | 'snow-grains'
  | 'showers'
  | 'snow-showers'
  | 'thunderstorm'
  | 'thunderstorm-hail'
  | 'unknown';
