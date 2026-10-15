import React from 'react';
import { Droplets, CloudRain, Umbrella, Sparkles } from 'lucide-react';
import type { WeatherData } from '../../types/weather';
import { formatHourOnly } from '../../utils/date';
import RainfallWidget from '../weather/RainfallWidget';

interface RainfallTabProps {
  data: WeatherData;
}

const RainfallTab: React.FC<RainfallTabProps> = ({ data }) => {
  const { city, current, daily, hourly } = data;

  const todayRain = daily?.precipitation_sum?.[0] ?? current.precipitation ?? 0;
  const maxProb = daily?.precipitation_probability_max?.[0] ?? 10;
  const humidity = current.relative_humidity_2m;
  const dewPoint = Math.round(current.temperature_2m - ((100 - humidity) / 5));

  // Hourly rain breakdown
  const next12Hours = hourly ? hourly.time.slice(0, 12) : [];

  return (
    <div className="tab-view-container fade-in">
      <div className="tab-view-header">
        <div className="tab-title-group">
          <div className="tab-icon-badge">
            <Droplets size={20} />
          </div>
          <div>
            <h2 className="tab-main-title">Lượng mưa & Độ ẩm • {city.name}</h2>
            <p className="tab-sub-title">Biểu đồ lượng mưa, xác suất mưa và độ ẩm chi tiết</p>
          </div>
        </div>
      </div>

      {/* 4 Stat Highlights */}
      <div className="tab-stats-grid">
        <div className="tab-stat-box">
          <div className="tab-stat-icon-wrap rain">
            <CloudRain size={20} />
          </div>
          <div>
            <span className="stat-label-dim">Lượng mưa hôm nay</span>
            <div className="stat-value-big">{todayRain} <span className="stat-unit">mm</span></div>
          </div>
        </div>

        <div className="tab-stat-box">
          <div className="tab-stat-icon-wrap prob">
            <Umbrella size={20} />
          </div>
          <div>
            <span className="stat-label-dim">Xác suất mưa cao nhất</span>
            <div className="stat-value-big">{maxProb}<span className="stat-unit">%</span></div>
          </div>
        </div>

        <div className="tab-stat-box">
          <div className="tab-stat-icon-wrap hum">
            <Droplets size={20} />
          </div>
          <div>
            <span className="stat-label-dim">Độ ẩm không khí</span>
            <div className="stat-value-big">{humidity}<span className="stat-unit">%</span></div>
          </div>
        </div>

        <div className="tab-stat-box">
          <div className="tab-stat-icon-wrap dew">
            <Sparkles size={20} />
          </div>
          <div>
            <span className="stat-label-dim">Điểm sương</span>
            <div className="stat-value-big">{dewPoint}°<span className="stat-unit">C</span></div>
          </div>
        </div>
      </div>

      {/* Main 7-Day Rainfall Chart */}
      <div className="rainfall-tab-chart-wrap">
        <RainfallWidget data={data} />
      </div>

      {/* Hourly Rain Chance Table */}
      {next12Hours.length > 0 && hourly && (
        <div className="rainfall-hourly-breakdown">
          <h3 className="section-title-sm" style={{ marginBottom: '14px' }}>
            Xác suất mưa 12 giờ tới
          </h3>
          <div className="hourly-rain-grid">
            {next12Hours.map((isoTime, idx) => {
              const prob = hourly.precipitation_probability[idx] ?? 0;
              const timeLabel = idx === 0 ? 'Hiện tại' : formatHourOnly(isoTime);

              return (
                <div key={isoTime} className="hourly-rain-col">
                  <span className="rain-col-time">{timeLabel}</span>
                  <div className="rain-col-bar-track">
                    <div
                      className="rain-col-bar-fill"
                      style={{ height: `${Math.max(8, prob)}%` }}
                    />
                  </div>
                  <span className="rain-col-percent">{prob}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RainfallTab;
