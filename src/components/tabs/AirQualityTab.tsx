import React from 'react';
import { Wind, Compass, Sparkles, ShieldCheck, Gauge } from 'lucide-react';
import type { WeatherData } from '../../types/weather';
import AirQualityWidget from '../weather/AirQualityWidget';

interface AirQualityTabProps {
  data: WeatherData;
}

const AirQualityTab: React.FC<AirQualityTabProps> = ({ data }) => {
  const { city, current } = data;

  // Wind direction text
  const deg = current.wind_direction_10m ?? 0;
  const directions = ['Bắc', 'Đông Bắc', 'Đông', 'Đông Nam', 'Nam', 'Tây Nam', 'Tây', 'Tây Bắc'];
  const dirIndex = Math.round(deg / 45) % 8;
  const dirName = directions[dirIndex];

  const pressure = current.surface_pressure ? Math.round(current.surface_pressure) : 1010;

  return (
    <div className="tab-view-container fade-in">
      <div className="tab-view-header">
        <div className="tab-title-group">
          <div className="tab-icon-badge">
            <Wind size={20} />
          </div>
          <div>
            <h2 className="tab-main-title">Chất lượng không khí & Gió • {city.name}</h2>
            <p className="tab-sub-title">Chỉ số ô nhiễm không khí AQI, khuyến nghị sức khỏe và hướng gió</p>
          </div>
        </div>
      </div>

      {/* Main AQI Graphic Widget */}
      <AirQualityWidget data={data} />

      {/* Health Recommendations Card */}
      <div className="health-advice-card">
        <div className="advice-header">
          <ShieldCheck size={20} className="text-mint" />
          <h3 className="section-title-sm">Khuyến nghị sức khỏe</h3>
        </div>
        <div className="advice-grid">
          <div className="advice-item">
            <span className="advice-bullet">🏃</span>
            <div>
              <strong>Tập thể dục ngoài trời:</strong> Chất lượng không khí tốt, an toàn cho chạy bộ, đạp xe và thể thao.
            </div>
          </div>
          <div className="advice-item">
            <span className="advice-bullet">🪟</span>
            <div>
              <strong>Thông gió trong nhà:</strong> Thích hợp mở cửa sổ để đón không khí tự nhiên tươi mới.
            </div>
          </div>
          <div className="advice-item">
            <span className="advice-bullet">😷</span>
            <div>
              <strong>Đeo khẩu trang:</strong> Không bắt buộc với người khỏe mạnh trong điều kiện không khí hiện tại.
            </div>
          </div>
        </div>
      </div>

      {/* Wind & Pressure Grid */}
      <div className="tab-stats-grid" style={{ marginTop: '16px' }}>
        <div className="tab-stat-box">
          <div className="tab-stat-icon-wrap prob">
            <Wind size={20} />
          </div>
          <div>
            <span className="stat-label-dim">Tốc độ gió</span>
            <div className="stat-value-big">{current.wind_speed_10m} <span className="stat-unit">km/h</span></div>
          </div>
        </div>

        <div className="tab-stat-box">
          <div className="tab-stat-icon-wrap rain">
            <Compass size={20} style={{ transform: `rotate(${deg}deg)` }} />
          </div>
          <div>
            <span className="stat-label-dim">Hướng gió ({deg}°)</span>
            <div className="stat-value-big">{dirName}</div>
          </div>
        </div>

        <div className="tab-stat-box">
          <div className="tab-stat-icon-wrap dew">
            <Gauge size={20} />
          </div>
          <div>
            <span className="stat-label-dim">Áp suất khí quyển</span>
            <div className="stat-value-big">{pressure} <span className="stat-unit">hPa</span></div>
          </div>
        </div>

        <div className="tab-stat-box">
          <div className="tab-stat-icon-wrap hum">
            <Sparkles size={20} />
          </div>
          <div>
            <span className="stat-label-dim">Đánh giá chung</span>
            <div className="stat-value-big" style={{ fontSize: '18px', color: '#1A7F54' }}>Trong lành</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityTab;
