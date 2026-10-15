import React from 'react';
import type { WeatherData, TemperatureUnit } from '../../types/weather';
import { getWeatherIconType, getWeatherDescription } from '../../utils/weatherCode';
import { formatTemperatureValue } from '../../utils/temperature';
import { formatDayOfWeek, isToday } from '../../utils/date';
import WeatherIcon from '../common/WeatherIcon';

interface WeeklyPillBarProps {
  data: WeatherData;
  unit: TemperatureUnit;
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
}

const WeeklyPillBar: React.FC<WeeklyPillBarProps> = ({
  data,
  unit,
  selectedDayIndex,
  onSelectDay,
}) => {
  const { daily } = data;
  if (!daily || !daily.time || daily.time.length === 0) return null;

  return (
    <div className="weekly-pill-container" role="region" aria-label="Dự báo 7 ngày trong tuần">
      <div className="weekly-pill-header">
        <h3 className="section-title-sm">Dự báo 7 ngày tới</h3>
        <span className="section-subtitle-sm">Chọn ngày để xem chi tiết</span>
      </div>

      <div className="weekly-pills-row" role="tablist">
        {daily.time.slice(0, 7).map((dateStr, idx) => {
          const isSelected = selectedDayIndex === idx;
          const today = isToday(dateStr);
          const dayLabel = today ? 'H.nay' : formatDayOfWeek(dateStr);
          const weatherCode = daily.weather_code[idx] ?? 0;
          const iconType = getWeatherIconType(weatherCode);
          const desc = getWeatherDescription(weatherCode);
          const maxTemp = formatTemperatureValue(daily.temperature_2m_max[idx], unit);
          const minTemp = formatTemperatureValue(daily.temperature_2m_min[idx], unit);

          return (
            <button
              key={dateStr}
              role="tab"
              aria-selected={isSelected}
              className={`weekly-day-pill ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectDay(idx)}
              title={`${dayLabel}: ${desc}, ${maxTemp}° / ${minTemp}°`}
            >
              <span className="pill-day-name">{dayLabel}</span>
              <div className="pill-icon-wrap">
                <WeatherIcon iconType={iconType} size={30} />
              </div>
              <div className="pill-temp-range">
                <span className="pill-temp-max">{maxTemp}°</span>
                <span className="pill-temp-min">{minTemp}°</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyPillBar;
