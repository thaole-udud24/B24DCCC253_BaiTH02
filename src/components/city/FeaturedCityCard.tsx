import React from 'react';
import { MapPin, Wind, Droplets, Star } from 'lucide-react';
import type { WeatherData, TemperatureUnit } from '../../types/weather';
import { getWeatherDescription, getWeatherIconType } from '../../utils/weatherCode';
import { formatTemperatureValue } from '../../utils/temperature';
import { formatFullDateVietnamese } from '../../utils/date';
import WeatherIcon from '../common/WeatherIcon';

interface FeaturedCityCardProps {
  data: WeatherData;
  unit: TemperatureUnit;
  isFavorite: boolean;
  onToggleFavorite: (cityId: string) => void;
}

const FeaturedCityCard: React.FC<FeaturedCityCardProps> = ({
  data,
  unit,
  isFavorite,
  onToggleFavorite,
}) => {
  const { city, current } = data;
  const description = getWeatherDescription(current.weather_code);
  const iconType = getWeatherIconType(current.weather_code);
  const tempValue = formatTemperatureValue(current.temperature_2m, unit);
  const dateFormatted = formatFullDateVietnamese();

  return (
    <div className="featured-city-card fade-in" role="region" aria-label={`Thời tiết nổi bật tại ${city.name}`}>
      {/* Top row: City pin & Favorite button */}
      <div className="featured-card-header">
        <div className="featured-city-badge">
          <MapPin size={16} className="pin-icon" />
          <span className="featured-city-name">{city.name}</span>
          <span className="featured-region-tag">{city.regionName}</span>
        </div>

        <button
          className={`featured-fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(city.id);
          }}
          title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          aria-label={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Date */}
      <div className="featured-date-str">{dateFormatted}</div>

      {/* Center 3D Weather Icon */}
      <div className="featured-icon-container">
        <WeatherIcon iconType={iconType} size={110} />
      </div>

      {/* Temperature & Description */}
      <div className="featured-temp-block">
        <div className="featured-temp-number">
          {tempValue}<span className="featured-degree">°</span>
        </div>
        <div className="featured-desc-text">{description}</div>
      </div>

      {/* Bottom stats row: Wind & Humidity */}
      <div className="featured-stats-bar">
        <div className="featured-stat-item">
          <Wind size={15} />
          <span>Gió: {current.wind_speed_10m} km/h</span>
        </div>
        <div className="featured-stat-divider" />
        <div className="featured-stat-item">
          <Droplets size={15} />
          <span>Độ ẩm: {current.relative_humidity_2m}%</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCityCard;
