import React from 'react';
import type { WeatherIconType } from '../../types/weather';
import {
  Sun, Cloud, CloudSun, CloudRain, CloudDrizzle, CloudSnow,
  CloudLightning, Wind, CloudFog, Snowflake
} from 'lucide-react';

interface WeatherIconProps {
  iconType: WeatherIconType;
  size?: number;
  className?: string;
}

const ICON_MAP: Record<WeatherIconType, React.ElementType> = {
  'sunny': Sun,
  'mostly-clear': Sun,
  'partly-cloudy': CloudSun,
  'cloudy': Cloud,
  'foggy': CloudFog,
  'drizzle': CloudDrizzle,
  'freezing-drizzle': CloudDrizzle,
  'rain-light': CloudDrizzle,
  'rain-moderate': CloudRain,
  'rain-heavy': CloudRain,
  'freezing-rain': CloudRain,
  'snow': CloudSnow,
  'snow-grains': Snowflake,
  'showers': CloudRain,
  'snow-showers': CloudSnow,
  'thunderstorm': CloudLightning,
  'thunderstorm-hail': CloudLightning,
  'unknown': Wind,
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconType, size = 24, className }) => {
  const Icon = ICON_MAP[iconType] ?? Wind;
  return <Icon size={size} className={className} aria-hidden="true" />;
};

export default WeatherIcon;
