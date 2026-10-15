import React from 'react';
import { Clock, Umbrella } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '../../types/weather';
import { getWeatherIconType, getWeatherDescription } from '../../utils/weatherCode';
import { formatTemperatureValue } from '../../utils/temperature';
import { formatHourOnly } from '../../utils/date';
import WeatherIcon from '../common/WeatherIcon';

interface HourlyForecastWidgetProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const HourlyForecastWidget: React.FC<HourlyForecastWidgetProps> = ({ data, unit }) => {
  const { hourly } = data;
  if (!hourly || !hourly.time || hourly.time.length === 0) return null;

  const hoursToShow = hourly.time.slice(0, 16);

  return (
    <div className="hourly-widget-card fade-in" role="region" aria-label="Dự báo theo giờ">
      <div className="hourly-widget-header">
        <div className="header-title-flex">
          <Clock size={18} className="text-primary" />
          <h3 className="section-title-sm">Dự báo theo giờ (24h)</h3>
        </div>
        <span className="hourly-hint">Cuộn ngang để xem tiếp →</span>
      </div>

      <div className="hourly-scroll-track" tabIndex={0} aria-label="Danh sách dự báo theo giờ">
        {hoursToShow.map((isoTime, idx) => {
          const temp = formatTemperatureValue(hourly.temperature_2m[idx], unit);
          const weatherCode = hourly.weather_code[idx] ?? 0;
          const iconType = getWeatherIconType(weatherCode);
          const desc = getWeatherDescription(weatherCode);
          const rainChance = hourly.precipitation_probability[idx] ?? 0;
          const timeLabel = idx === 0 ? 'Hiện tại' : formatHourOnly(isoTime);

          return (
            <div key={isoTime} className="hourly-item-pill" title={`${timeLabel}: ${desc}`}>
              <span className={`hourly-time-label ${idx === 0 ? 'now-tag' : ''}`}>
                {timeLabel}
              </span>
              <div className="hourly-icon-wrap">
                <WeatherIcon iconType={iconType} size={32} />
              </div>
              <span className="hourly-temp-value">{temp}°</span>
              
              {rainChance > 0 ? (
                <div className="hourly-rain-badge" title={`Xác suất mưa: ${rainChance}%`}>
                  <Umbrella size={10} />
                  <span>{rainChance}%</span>
                </div>
              ) : (
                <div className="hourly-rain-spacer" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecastWidget;
