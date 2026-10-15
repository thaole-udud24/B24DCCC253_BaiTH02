import React from 'react';
import { Star } from 'lucide-react';
import type { City, WeatherData, TemperatureUnit } from '../../types/weather';
import { getWeatherIconType } from '../../utils/weatherCode';
import { formatTemperature } from '../../utils/temperature';
import WeatherIcon from '../common/WeatherIcon';

interface CityCardProps {
  city: City;
  isSelected: boolean;
  isFavorite: boolean;
  weatherData?: WeatherData;
  unit: TemperatureUnit;
  onSelect: (city: City) => void;
  onToggleFavorite: (cityId: string) => void;
}

const CityCard: React.FC<CityCardProps> = ({
  city,
  isSelected,
  isFavorite,
  weatherData,
  unit,
  onSelect,
  onToggleFavorite,
}) => {
  const currentCode = weatherData?.current.weather_code;
  const iconType = currentCode !== undefined ? getWeatherIconType(currentCode) : 'unknown';
  const temp = weatherData?.current.temperature_2m;

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(city.id);
  };

  return (
    <div
      className={`city-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(city)}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      aria-label={`Chọn thành phố ${city.name}`}
      id={`city-card-${city.id}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(city);
        }
      }}
    >
      <div className="city-card-icon">
        <WeatherIcon iconType={iconType} size={22} />
      </div>

      <div className="city-card-info">
        <div className="city-card-name">{city.name}</div>
        <div className={`city-card-temp ${temp !== undefined ? 'loaded' : ''}`}>
          {temp !== undefined
            ? formatTemperature(temp, unit)
            : '—'}
        </div>
      </div>

      <div className="city-card-actions">
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavClick}
          aria-label={isFavorite ? `Bỏ yêu thích ${city.name}` : `Thêm ${city.name} vào yêu thích`}
          id={`fav-btn-${city.id}`}
          title={isFavorite ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
        >
          <Star
            size={16}
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>
      </div>
    </div>
  );
};

export default CityCard;
