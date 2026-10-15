import React from 'react';
import { CloudRain } from 'lucide-react';
import type { WeatherData } from '../../types/weather';
import { formatDayOfWeek, isToday } from '../../utils/date';

interface RainfallWidgetProps {
  data: WeatherData;
}

const RainfallWidget: React.FC<RainfallWidgetProps> = ({ data }) => {
  const { daily, current } = data;
  if (!daily || !daily.time) return null;

  const totalTodayRain = daily.precipitation_sum?.[0] ?? current.precipitation ?? 0;
  const maxRainProb = daily.precipitation_probability_max?.[0] ?? 15;

  return (
    <div className="widget-card rainfall-card fade-in" role="region" aria-label="Biểu đồ lượng mưa">
      <div className="widget-header">
        <div className="header-title-flex">
          <CloudRain size={16} className="text-primary" />
          <span className="widget-title">Lượng mưa & Xác suất</span>
        </div>
        <div className="rainfall-legend">
          <span className="legend-dot rain"></span> Mưa (mm)
          <span className="legend-dot sun"></span> Nắng / Xác suất (%)
        </div>
      </div>

      <div className="rainfall-summary-row">
        <div>
          <span className="rain-sum-label">Hôm nay</span>
          <div className="rain-sum-val">
            {totalTodayRain} <span className="rain-sum-unit">mm</span>
          </div>
        </div>
        <div>
          <span className="rain-sum-label">Khả năng mưa</span>
          <div className="rain-sum-val">
            {maxRainProb}<span className="rain-sum-unit">%</span>
          </div>
        </div>
      </div>

      {/* 7-Day Dual Pill Bar Chart */}
      <div className="rainfall-chart-container" aria-hidden="true">
        {daily.time.slice(0, 7).map((dateStr, idx) => {
          const day = isToday(dateStr) ? 'H.nay' : formatDayOfWeek(dateStr);
          const rainMm = daily.precipitation_sum?.[idx] ?? 0;
          const prob = daily.precipitation_probability_max?.[idx] ?? 10;

          const rainHeight = Math.max(12, Math.min(90, (rainMm / 10) * 80));
          const probHeight = Math.max(18, Math.min(95, prob));

          return (
            <div key={dateStr} className="rainfall-bar-col">
              <div className="dual-bar-track">
                {/* Yellow / Sun bar */}
                <div
                  className="bar-pill bar-sun"
                  style={{ height: `${probHeight}%` }}
                  title={`Xác suất mưa: ${prob}%`}
                />
                {/* Blue / Rain bar */}
                <div
                  className="bar-pill bar-rain"
                  style={{ height: `${rainHeight}%` }}
                  title={`Lượng mưa: ${rainMm} mm`}
                />
              </div>
              <span className="chart-day-label">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RainfallWidget;
