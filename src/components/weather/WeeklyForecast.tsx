import React from 'react';
import { CalendarDays } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '../../types/weather';
import ForecastCard from './ForecastCard';

interface WeeklyForecastProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data, unit }) => {
  const { daily } = data;
  const days = daily.time.slice(0, 7);

  return (
    <div
      className="weekly-forecast fade-in"
      role="region"
      aria-label="Dự báo 7 ngày tới"
    >
      <div className="weekly-forecast-header">
        <CalendarDays size={18} />
        Dự báo 7 ngày
      </div>
      <div className="forecast-scroll" role="list">
        {days.map((date, index) => (
          <ForecastCard
            key={date}
            date={date}
            weatherCode={daily.weather_code[index]}
            tempMax={daily.temperature_2m_max[index]}
            tempMin={daily.temperature_2m_min[index]}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
