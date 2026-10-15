import React from 'react';
import { CalendarDays, Sunrise, Sunset, Umbrella, SunMedium, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '../../types/weather';
import { getWeatherDescription, getWeatherIconType } from '../../utils/weatherCode';
import { formatTemperatureValue } from '../../utils/temperature';
import { formatDayOfWeek, formatShortDate, formatHourOnly, isToday } from '../../utils/date';
import WeatherIcon from '../common/WeatherIcon';

interface WeeklyTabProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const WeeklyTab: React.FC<WeeklyTabProps> = ({ data, unit }) => {
  const { city, daily } = data;
  if (!daily || !daily.time) return null;

  return (
    <div className="tab-view-container fade-in">
      <div className="tab-view-header">
        <div className="tab-title-group">
          <div className="tab-icon-badge">
            <CalendarDays size={20} />
          </div>
          <div>
            <h2 className="tab-main-title">Dự báo 7 ngày tới • {city.name}</h2>
            <p className="tab-sub-title">Xu hướng thời tiết trong tuần và thông số chi tiết mỗi ngày</p>
          </div>
        </div>
      </div>

      <div className="weekly-detail-list">
        {daily.time.slice(0, 7).map((dateStr, idx) => {
          const today = isToday(dateStr);
          const dayName = today ? 'Hôm nay' : formatDayOfWeek(dateStr);
          const shortDate = formatShortDate(dateStr);
          const code = daily.weather_code[idx] ?? 0;
          const iconType = getWeatherIconType(code);
          const desc = getWeatherDescription(code);
          const maxTemp = formatTemperatureValue(daily.temperature_2m_max[idx], unit);
          const minTemp = formatTemperatureValue(daily.temperature_2m_min[idx], unit);
          const rainMm = daily.precipitation_sum?.[idx] ?? 0;
          const rainProb = daily.precipitation_probability_max?.[idx] ?? 0;
          const uv = daily.uv_index_max?.[idx] ?? 6;
          const sunrise = daily.sunrise?.[idx] ? formatHourOnly(daily.sunrise[idx]) : '05:51';
          const sunset = daily.sunset?.[idx] ? formatHourOnly(daily.sunset[idx]) : '17:32';

          return (
            <div key={dateStr} className={`weekly-detail-row-card ${today ? 'today-highlight' : ''}`}>
              {/* Day & Date */}
              <div className="row-date-col">
                <span className="row-day-name">{dayName}</span>
                <span className="row-short-date">{shortDate}</span>
              </div>

              {/* Weather icon & status */}
              <div className="row-weather-col">
                <WeatherIcon iconType={iconType} size={42} />
                <div>
                  <span className="row-desc-text">{desc}</span>
                  <div className="row-rain-info">
                    <Umbrella size={13} className="text-primary" />
                    <span>{rainProb}% ({rainMm} mm)</span>
                  </div>
                </div>
              </div>

              {/* Sun times */}
              <div className="row-sun-col">
                <div className="sun-item-mini">
                  <Sunrise size={14} className="text-amber" />
                  <span>{sunrise}</span>
                </div>
                <div className="sun-item-mini">
                  <Sunset size={14} className="text-peach" />
                  <span>{sunset}</span>
                </div>
              </div>

              {/* UV */}
              <div className="row-uv-col">
                <SunMedium size={14} className="text-amber" />
                <span>UV {uv.toFixed(1)}</span>
              </div>

              {/* Temperature High / Low */}
              <div className="row-temp-col">
                <div className="temp-hi-low-box">
                  <span className="temp-hi">
                    <ArrowUpRight size={14} /> {maxTemp}°
                  </span>
                  <span className="temp-lo">
                    <ArrowDownRight size={14} /> {minTemp}°
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyTab;
