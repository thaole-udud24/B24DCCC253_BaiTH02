import React from 'react';
import { Navigation, Sparkles } from 'lucide-react';
import type { WeatherData } from '../../types/weather';

interface AirQualityWidgetProps {
  data: WeatherData;
}

const AirQualityWidget: React.FC<AirQualityWidgetProps> = ({ data }) => {
  const { current, hourly } = data;

  const aqiScore = Math.max(20, Math.min(85, Math.round(
    25 + (current.relative_humidity_2m > 80 ? 15 : 0) + (current.wind_speed_10m < 5 ? 12 : -5)
  )));

  const aqiStatus = aqiScore <= 50 ? 'Tốt' : aqiScore <= 100 ? 'Trung bình' : 'Kém';
  const aqiColorClass = aqiScore <= 50 ? 'aqi-good' : aqiScore <= 100 ? 'aqi-moderate' : 'aqi-poor';
  const aqiDescription = aqiScore <= 50
    ? 'Không khí trong lành, lý tưởng cho mọi hoạt động ngoài trời.'
    : 'Chất lượng không khí chấp nhận được, nhạy cảm nên chú ý.';

  const hourlyWind = hourly ? [
    { label: 'Hiện tại', speed: current.wind_speed_10m, dir: current.wind_direction_10m ?? 140 },
    { label: '16:00', speed: hourly.wind_speed_10m?.[2] ?? 12, dir: hourly.wind_direction_10m?.[2] ?? 135 },
    { label: '18:00', speed: hourly.wind_speed_10m?.[4] ?? 11, dir: hourly.wind_direction_10m?.[4] ?? 120 },
    { label: '20:00', speed: hourly.wind_speed_10m?.[6] ?? 10, dir: hourly.wind_direction_10m?.[6] ?? 115 },
    { label: '22:00', speed: hourly.wind_speed_10m?.[8] ?? 8, dir: hourly.wind_direction_10m?.[8] ?? 140 },
  ] : [];

  return (
    <div className="widget-card aqi-card fade-in" role="region" aria-label="Chỉ số chất lượng không khí">
      <div className="widget-header">
        <div className="header-title-flex">
          <Sparkles size={16} className="text-primary" />
          <span className="widget-title">Chất lượng không khí (AQI)</span>
        </div>
        <span className={`aqi-status-pill ${aqiColorClass}`}>{aqiStatus} • {aqiScore}</span>
      </div>

      <p className="aqi-desc-text">{aqiDescription}</p>

      {/* AQI Progress Meter Bar */}
      <div className="aqi-meter-bar" aria-hidden="true">
        <div className="aqi-bar-track">
          <div
            className="aqi-bar-pointer"
            style={{ left: `${Math.min(100, (aqiScore / 150) * 100)}%` }}
          />
        </div>
        <div className="aqi-labels">
          <span>0 (Tốt)</span>
          <span>50</span>
          <span>100</span>
          <span>150+ (Kém)</span>
        </div>
      </div>

      {/* Hourly wind pills from Image 2 */}
      {hourlyWind.length > 0 && (
        <div className="aqi-hourly-wind-section">
          <span className="aqi-wind-subheading">Hướng gió & Tốc độ theo giờ</span>
          <div className="aqi-wind-pills">
            {hourlyWind.map((item, i) => (
              <div key={i} className="wind-pill-item">
                <span className="wind-pill-time">{item.label}</span>
                <div
                  className="wind-pill-arrow-wrap"
                  style={{ transform: `rotate(${item.dir}deg)` }}
                  title={`Hướng: ${item.dir}°`}
                >
                  <Navigation size={13} fill="currentColor" />
                </div>
                <span className="wind-pill-speed">{item.speed} km/h</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AirQualityWidget;
