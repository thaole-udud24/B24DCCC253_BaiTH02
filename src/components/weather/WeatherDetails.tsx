import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import type { WeatherData } from '../../types/weather';

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  const { current } = data;

  return (
    <div className="detail-cards fade-in">
      <div
        className="detail-card"
        role="region"
        aria-label="Độ ẩm"
        id="detail-humidity"
      >
        <div className="detail-card-icon-wrap humidity">
          <Droplets size={24} />
        </div>
        <div>
          <div className="detail-card-label">Độ ẩm</div>
          <div className="detail-card-value">
            {current.relative_humidity_2m}
            <span className="detail-card-unit">%</span>
          </div>
        </div>
      </div>

      <div
        className="detail-card"
        role="region"
        aria-label="Tốc độ gió"
        id="detail-wind"
      >
        <div className="detail-card-icon-wrap wind">
          <Wind size={24} />
        </div>
        <div>
          <div className="detail-card-label">Tốc độ gió</div>
          <div className="detail-card-value">
            {current.wind_speed_10m}
            <span className="detail-card-unit"> km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
