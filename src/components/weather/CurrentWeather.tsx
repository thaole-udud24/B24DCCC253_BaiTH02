import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '../../types/weather';
import { getWeatherGradientClass, getWeatherDescription, getWeatherIconType } from '../../utils/weatherCode';
import { formatTemperatureValue } from '../../utils/temperature';
import { formatUpdateTime } from '../../utils/date';
import WeatherIcon from '../common/WeatherIcon';

interface CurrentWeatherProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
  const { city, current } = data;
  const gradientClass = getWeatherGradientClass(current.weather_code);
  const description = getWeatherDescription(current.weather_code);
  const iconType = getWeatherIconType(current.weather_code);
  const updateTime = formatUpdateTime(current.time);
  const tempValue = formatTemperatureValue(current.temperature_2m, unit);
  const unitSymbol = unit === 'C' ? '°C' : '°F';

  return (
    <div
      className={`current-weather-card ${gradientClass} fade-in`}
      role="region"
      aria-label={`Thời tiết hiện tại tại ${city.name}`}
    >
      <div className="current-weather-inner">
        <div className="current-weather-left">
          <div className="current-city-name">{city.name}</div>
          <div className="current-update-time" aria-label={`Cập nhật lúc ${updateTime}`}>
            Cập nhật lúc {updateTime}
          </div>
          <div
            className="current-temp-value"
            aria-label={`Nhiệt độ hiện tại: ${tempValue}${unitSymbol}`}
          >
            {tempValue}{unitSymbol}
          </div>
          <div className="current-weather-desc">{description}</div>

          <div className="current-weather-stats">
            <div className="current-stat">
              <div className="current-stat-icon">
                <Droplets size={16} />
              </div>
              <div className="current-stat-info">
                <span className="current-stat-label">Độ ẩm</span>
                <span className="current-stat-value">{current.relative_humidity_2m}%</span>
              </div>
            </div>

            <div className="current-stat">
              <div className="current-stat-icon">
                <Wind size={16} />
              </div>
              <div className="current-stat-info">
                <span className="current-stat-label">Tốc độ gió</span>
                <span className="current-stat-value">{current.wind_speed_10m} km/h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="current-weather-icon-large" aria-hidden="true">
          <WeatherIcon iconType={iconType} size={100} />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
