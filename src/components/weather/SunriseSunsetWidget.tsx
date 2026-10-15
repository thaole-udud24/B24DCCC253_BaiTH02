import React from 'react';
import { Sunrise, Sunset } from 'lucide-react';
import type { WeatherData } from '../../types/weather';
import { formatHourOnly } from '../../utils/date';

interface SunriseSunsetWidgetProps {
  data: WeatherData;
}

const SunriseSunsetWidget: React.FC<SunriseSunsetWidgetProps> = ({ data }) => {
  const { daily } = data;
  const sunriseStr = daily?.sunrise?.[0];
  const sunsetStr = daily?.sunset?.[0];

  const sunriseFormatted = sunriseStr ? formatHourOnly(sunriseStr) : '05:50';
  const sunsetFormatted = sunsetStr ? formatHourOnly(sunsetStr) : '17:35';

  let progress = 0.65;
  if (sunriseStr && sunsetStr) {
    const now = Date.now();
    const sunriseTime = new Date(sunriseStr).getTime();
    const sunsetTime = new Date(sunsetStr).getTime();
    if (now <= sunriseTime) {
      progress = 0;
    } else if (now >= sunsetTime) {
      progress = 1;
    } else {
      progress = (now - sunriseTime) / (sunsetTime - sunriseTime);
    }
  }

  const angle = Math.PI - progress * Math.PI;
  const radius = 70;
  const centerX = 100;
  const centerY = 85;
  const sunX = centerX + radius * Math.cos(angle);
  const sunY = centerY - radius * Math.sin(angle);

  const arcPath = `M 30 85 A 70 70 0 0 1 170 85`;

  return (
    <div className="widget-card sunrise-card fade-in" role="region" aria-label="Bình minh và hoàng hôn">
      <div className="widget-header">
        <span className="widget-title">Bình minh & Hoàng hôn</span>
      </div>

      {/* Sun Arc Graphic */}
      <div className="sun-arc-container">
        <svg viewBox="0 0 200 100" className="sun-arc-svg" aria-hidden="true">
          <defs>
            <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFBA60" />
              <stop offset="50%" stopColor="#58A8F4" />
              <stop offset="100%" stopColor="#FF8360" />
            </linearGradient>
            <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>

          {/* Dotted Horizon Base */}
          <line x1="15" y1="85" x2="185" y2="85" stroke="#E2EBF4" strokeWidth="2" strokeDasharray="4 4" />

          {/* Background Arc */}
          <path d={arcPath} fill="none" stroke="#E9F2FA" strokeWidth="5" strokeLinecap="round" />

          {/* Active Progress Arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="url(#arcGlow)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset={220 * (1 - progress)}
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />

          {/* Glowing Sun Position */}
          <circle cx={sunX} cy={sunY} r="9" fill="#FFBA60" opacity="0.3" filter="url(#sunGlow)" />
          <circle cx={sunX} cy={sunY} r="6" fill="#FFA938" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      </div>

      {/* Sunrise & Sunset times */}
      <div className="sun-times-row">
        <div className="sun-time-item">
          <div className="sun-time-icon sunrise">
            <Sunrise size={18} />
          </div>
          <div>
            <span className="sun-time-label">Bình minh</span>
            <span className="sun-time-val">{sunriseFormatted}</span>
          </div>
        </div>

        <div className="sun-time-item">
          <div className="sun-time-icon sunset">
            <Sunset size={18} />
          </div>
          <div>
            <span className="sun-time-label">Hoàng hôn</span>
            <span className="sun-time-val">{sunsetFormatted}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunriseSunsetWidget;
