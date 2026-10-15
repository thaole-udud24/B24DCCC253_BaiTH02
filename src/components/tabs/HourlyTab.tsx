import React from 'react';
import { Clock, Umbrella, Wind, Droplets, SunMedium } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '../../types/weather';
import { getWeatherDescription, getWeatherIconType } from '../../utils/weatherCode';
import { formatTemperatureValue } from '../../utils/temperature';
import { formatHourOnly } from '../../utils/date';
import WeatherIcon from '../common/WeatherIcon';

interface HourlyTabProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const HourlyTab: React.FC<HourlyTabProps> = ({ data, unit }) => {
  const { city, hourly } = data;
  if (!hourly || !hourly.time) return null;

  const times = hourly.time.slice(0, 24);

  // Quick stats
  const maxTemp = Math.max(...hourly.temperature_2m.slice(0, 24));
  const minTemp = Math.min(...hourly.temperature_2m.slice(0, 24));
  const maxRain = Math.max(...hourly.precipitation_probability.slice(0, 24));

  return (
    <div className="tab-view-container fade-in">
      <div className="tab-view-header">
        <div className="tab-title-group">
          <div className="tab-icon-badge">
            <Clock size={20} />
          </div>
          <div>
            <h2 className="tab-main-title">Dự báo 24 giờ tới • {city.name}</h2>
            <p className="tab-sub-title">Biến động nhiệt độ, thời tiết và xác suất mưa theo từng giờ</p>
          </div>
        </div>

        {/* Quick summary chips */}
        <div className="tab-summary-chips">
          <div className="tab-chip">
            <span className="chip-label">Cao nhất / Thấp nhất:</span>
            <span className="chip-val">{formatTemperatureValue(maxTemp, unit)}° / {formatTemperatureValue(minTemp, unit)}°</span>
          </div>
          <div className="tab-chip">
            <span className="chip-label">Mưa cao nhất:</span>
            <span className="chip-val text-primary">{maxRain}%</span>
          </div>
        </div>
      </div>

      {/* Full 24-hour detailed grid */}
      <div className="hourly-full-grid">
        {times.map((isoTime, idx) => {
          const temp = formatTemperatureValue(hourly.temperature_2m[idx], unit);
          const code = hourly.weather_code[idx] ?? 0;
          const iconType = getWeatherIconType(code);
          const desc = getWeatherDescription(code);
          const rain = hourly.precipitation_probability[idx] ?? 0;
          const hum = hourly.relative_humidity_2m?.[idx] ?? 60;
          const wind = hourly.wind_speed_10m?.[idx] ?? 10;
          const uv = hourly.uv_index?.[idx] ?? 0;
          const timeLabel = idx === 0 ? 'Hiện tại' : formatHourOnly(isoTime);

          return (
            <div key={isoTime} className="hourly-detail-card">
              <div className="card-hour-badge">
                <span className={`hour-time ${idx === 0 ? 'is-now' : ''}`}>{timeLabel}</span>
              </div>

              <div className="hour-weather-center">
                <WeatherIcon iconType={iconType} size={36} />
                <span className="hour-temp-txt">{temp}°</span>
              </div>

              <div className="hour-desc-line">{desc}</div>

              <div className="hour-metrics-row">
                <div className="hour-metric" title="Khả năng mưa">
                  <Umbrella size={13} className="text-primary" />
                  <span>{rain}%</span>
                </div>
                <div className="hour-metric" title="Độ ẩm">
                  <Droplets size={13} className="text-mint" />
                  <span>{hum}%</span>
                </div>
                <div className="hour-metric" title="Tốc độ gió">
                  <Wind size={13} />
                  <span>{wind} km/h</span>
                </div>
                {uv > 0 && (
                  <div className="hour-metric" title="Chỉ số UV">
                    <SunMedium size={13} className="text-amber" />
                    <span>UV {uv.toFixed(1)}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyTab;
