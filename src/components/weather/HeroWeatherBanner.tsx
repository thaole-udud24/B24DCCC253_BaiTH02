import React from 'react';
import { Droplets, Wind, Umbrella, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '../../types/weather';
import { getWeatherDescription, getWeatherIconType } from '../../utils/weatherCode';
import { formatTemperatureValue } from '../../utils/temperature';
import WeatherIcon from '../common/WeatherIcon';

interface HeroWeatherBannerProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const HeroWeatherBanner: React.FC<HeroWeatherBannerProps> = ({ data, unit }) => {
  const { city, current, daily } = data;
  const description = getWeatherDescription(current.weather_code);
  const iconType = getWeatherIconType(current.weather_code);
  const tempValue = formatTemperatureValue(current.temperature_2m, unit);
  
  const feelsLike = current.apparent_temperature !== undefined
    ? formatTemperatureValue(current.apparent_temperature, unit)
    : tempValue;

  const maxTemp = daily?.temperature_2m_max?.[0] !== undefined
    ? formatTemperatureValue(daily.temperature_2m_max[0], unit)
    : null;

  const minTemp = daily?.temperature_2m_min?.[0] !== undefined
    ? formatTemperatureValue(daily.temperature_2m_min[0], unit)
    : null;

  const unitSymbol = unit === 'C' ? '°' : '°';

  return (
    <div className="hero-banner-card fade-in">
      {/* Decorative Pastel Hills Background SVG */}
      <div className="hero-scenery" aria-hidden="true">
        <svg viewBox="0 0 1000 320" preserveAspectRatio="none" className="scenery-svg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9E6FF" />
              <stop offset="60%" stopColor="#E2F1FF" />
              <stop offset="100%" stopColor="#F4F9FD" />
            </linearGradient>
            <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#81D1A6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#5EBA87" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A8E4C1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7CCF9E" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <rect width="1000" height="320" fill="url(#skyGrad)" />
          {/* Distant soft hill */}
          <path d="M0,220 C250,140 450,230 750,160 C880,130 960,170 1000,180 L1000,320 L0,320 Z" fill="url(#hill1)" />
          {/* Foreground rolling green hill */}
          <path d="M0,250 C180,210 380,260 620,195 C820,140 940,210 1000,200 L1000,320 L0,320 Z" fill="url(#hill2)" />
        </svg>

        {/* Floating Clouds */}
        <div className="scenery-cloud cloud-1" />
        <div className="scenery-cloud cloud-2" />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Left Side: Giant Temp + Mascot / Weather Icon */}
        <div className="hero-temp-block">
          <div className="hero-label-now">Hiện tại • {city.name}</div>
          <div className="hero-temp-row">
            <span className="hero-giant-temp">{tempValue}{unitSymbol}</span>
            <div className="hero-weather-icon-wrap" title={description}>
              <WeatherIcon iconType={iconType} size={72} />
            </div>
          </div>
        </div>

        {/* Right Side: Status details */}
        <div className="hero-status-block">
          <div className="hero-condition-text">
            {description} • Cảm nhận {feelsLike}{unitSymbol}
          </div>
          
          {maxTemp !== null && minTemp !== null && (
            <div className="hero-hi-low-row">
              <span className="hi-tag">
                <ArrowUpRight size={15} /> Cao: {maxTemp}{unitSymbol}
              </span>
              <span className="dot-sep">•</span>
              <span className="low-tag">
                <ArrowDownRight size={15} /> Thấp: {minTemp}{unitSymbol}
              </span>
            </div>
          )}

          {/* Mini pill badges */}
          <div className="hero-quick-badges">
            <div className="hero-badge">
              <Wind size={14} />
              <span>{current.wind_speed_10m} km/h</span>
            </div>
            <div className="hero-badge">
              <Droplets size={14} />
              <span>{current.relative_humidity_2m}%</span>
            </div>
            {current.precipitation !== undefined && (
              <div className="hero-badge">
                <Umbrella size={14} />
                <span>{current.precipitation} mm</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWeatherBanner;
