import React from 'react';
import type { TemperatureUnit } from '../../types/weather';
import { getWeatherIconType } from '../../utils/weatherCode';
import { formatTemperatureValue } from '../../utils/temperature';
import { formatDayOfWeek, formatShortDate, isToday } from '../../utils/date';
import WeatherIcon from '../common/WeatherIcon';

interface ForecastCardProps {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  unit: TemperatureUnit;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  date,
  weatherCode,
  tempMax,
  tempMin,
  unit,
}) => {
  const today = isToday(date);
  const iconType = getWeatherIconType(weatherCode);
  const dayName = today ? 'Hôm nay' : formatDayOfWeek(date);
  const shortDate = formatShortDate(date);
  const maxTemp = formatTemperatureValue(tempMax, unit);
  const minTemp = formatTemperatureValue(tempMin, unit);
  const unitSymbol = unit === 'C' ? '°' : '°';

  return (
    <div
      className={`forecast-day-card ${today ? 'is-today' : ''}`}
      role="listitem"
      aria-label={`${dayName}: cao nhất ${maxTemp}${unitSymbol}, thấp nhất ${minTemp}${unitSymbol}`}
    >
      <span className="forecast-day-name">{dayName}</span>
      <span className="forecast-date">{shortDate}</span>
      <div className="forecast-icon">
        <WeatherIcon iconType={iconType} size={28} />
      </div>
      <div className="forecast-temps">
        <span className="forecast-temp-max">{maxTemp}{unitSymbol}</span>
        <span className="forecast-temp-min">{minTemp}{unitSymbol}</span>
      </div>
    </div>
  );
};

export default ForecastCard;
