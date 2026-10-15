import React from 'react';
import { Wind, Droplets, SunMedium, Gauge, Compass } from 'lucide-react';
import type { WeatherData } from '../../types/weather';

interface CurrentConditionsGridProps {
  data: WeatherData;
}

const CurrentConditionsGrid: React.FC<CurrentConditionsGridProps> = ({ data }) => {
  const { current, daily } = data;

  const deg = current.wind_direction_10m ?? 0;
  const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
  const dirIndex = Math.round(deg / 45) % 8;
  const dirName = directions[dirIndex];

  const windStrength = current.wind_speed_10m < 12 ? 'Gió nhẹ' : current.wind_speed_10m < 28 ? 'Gió vừa' : 'Gió mạnh';

  const T = current.temperature_2m;
  const RH = current.relative_humidity_2m;
  const dewPoint = Math.round(T - ((100 - RH) / 5));

  const uvMax = daily?.uv_index_max?.[0] ?? 6.5;
  const uvLevel = uvMax < 3 ? 'Thấp' : uvMax < 6 ? 'Trung bình' : uvMax < 8 ? 'Cao' : 'Rất cao';
  const uvColorClass = uvMax < 3 ? 'uv-low' : uvMax < 6 ? 'uv-mod' : uvMax < 8 ? 'uv-high' : 'uv-extreme';

  const pressure = current.surface_pressure ? Math.round(current.surface_pressure) : 1010;

  return (
    <div className="current-conditions-section fade-in" role="region" aria-label="Chỉ số chi tiết môi trường">
      <div className="conditions-grid">
        <div className="condition-card">
          <div className="card-top-row">
            <span className="card-title-sm">Gió</span>
            <div className="card-mini-icon wind-icon">
              <Wind size={16} />
            </div>
          </div>
          <div className="card-main-val">
            {current.wind_speed_10m} <span className="card-unit">km/h</span>
          </div>
          <div className="card-bottom-info">
            <span className="card-badge">{windStrength}</span>
            <div className="compass-pill" title={`Hướng: ${deg}°`}>
              <Compass size={13} style={{ transform: `rotate(${deg}deg)` }} />
              <span>{dirName}</span>
            </div>
          </div>
        </div>

        {/* Humidity Card with Dew Point */}
        <div className="condition-card">
          <div className="card-top-row">
            <span className="card-title-sm">Độ ẩm</span>
            <div className="card-mini-icon humidity-icon">
              <Droplets size={16} />
            </div>
          </div>
          <div className="card-main-val">
            {current.relative_humidity_2m}<span className="card-unit">%</span>
          </div>
          <div className="card-bottom-info">
            <span className="info-text">Điểm sương: {dewPoint}°C</span>
            <div className="mini-progress-track">
              <div
                className="mini-progress-fill humidity-fill"
                style={{ width: `${current.relative_humidity_2m}%` }}
              />
            </div>
          </div>
        </div>

        {/* UV Index Card */}
        <div className="condition-card">
          <div className="card-top-row">
            <span className="card-title-sm">Chỉ số UV</span>
            <div className="card-mini-icon uv-icon">
              <SunMedium size={16} />
            </div>
          </div>
          <div className="card-main-val">
            {uvMax.toFixed(1)} <span className="card-unit">/ 11+</span>
          </div>
          <div className="card-bottom-info">
            <span className={`uv-badge ${uvColorClass}`}>{uvLevel}</span>
            <span className="info-text">Cần che chắn khi ra nắng</span>
          </div>
        </div>

        {/* Atmospheric Pressure Card */}
        <div className="condition-card">
          <div className="card-top-row">
            <span className="card-title-sm">Áp suất khí quyển</span>
            <div className="card-mini-icon pressure-icon">
              <Gauge size={16} />
            </div>
          </div>
          <div className="card-main-val">
            {pressure} <span className="card-unit">hPa</span>
          </div>
          <div className="card-bottom-info">
            <span className="info-text">Mức áp suất bình thường</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentConditionsGrid;
