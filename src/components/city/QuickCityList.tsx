import React from 'react';
import { Wind, Droplets, MapPin, Star } from 'lucide-react';
import type { City, TemperatureUnit, WeatherData, CityRegion } from '../../types/weather';
import { formatTemperatureValue } from '../../utils/temperature';
import { matchesSearch } from '../../utils/vietnameseSearch';

interface QuickCityListProps {
  cities: City[];
  selectedCityId: string | null;
  searchQuery: string;
  selectedRegion: CityRegion;
  showFavoritesOnly: boolean;
  favorites: Set<string>;
  weatherCache: Map<string, WeatherData>;
  unit: TemperatureUnit;
  onSelectCity: (city: City) => void;
  onToggleFavorite: (cityId: string) => void;
}

const PASTEL_THEMES = ['card-pastel-blue', 'card-pastel-amber', 'card-pastel-mint', 'card-pastel-lavender'];

const QuickCityList: React.FC<QuickCityListProps> = ({
  cities,
  selectedCityId,
  searchQuery,
  selectedRegion,
  showFavoritesOnly,
  favorites,
  weatherCache,
  unit,
  onSelectCity,
  onToggleFavorite,
}) => {
  const filteredCities = cities.filter((city) => {
    if (searchQuery.trim()) {
      const matchCity = matchesSearch(city.name, searchQuery);
      const matchRegion = matchesSearch(city.regionName, searchQuery);
      if (!matchCity && !matchRegion) {
        return false;
      }
    }

    if (selectedRegion !== 'all' && city.region !== selectedRegion) {
      return false;
    }

    if (showFavoritesOnly && !favorites.has(city.id)) {
      return false;
    }

    return true;
  });

  return (
    <div className="quick-city-container">
      <div className="quick-city-list" role="list">
        {filteredCities.map((city, idx) => {
          const isSelected = city.id === selectedCityId;
          const isFav = favorites.has(city.id);
          const cachedData = weatherCache.get(city.id);
          const current = cachedData?.current;

          const temp = current
            ? formatTemperatureValue(current.temperature_2m, unit)
            : '--';
          const wind = current?.wind_speed_10m ?? '--';
          const hum = current?.relative_humidity_2m ?? '--';

          const themeClass = PASTEL_THEMES[idx % PASTEL_THEMES.length];

          return (
            <div
              key={city.id}
              role="listitem"
              className={`quick-city-item ${themeClass} ${isSelected ? 'is-active' : ''}`}
              onClick={() => onSelectCity(city)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCity(city);
                }
              }}
            >
              <div className="quick-city-metrics">
                <div className="metric-pill">
                  <Wind size={13} />
                  <span>{wind} km/h</span>
                </div>
                <span className="metric-divider">|</span>
                <div className="metric-pill">
                  <Droplets size={13} />
                  <span>{hum}%</span>
                </div>
              </div>

              <div className="quick-city-main-info">
                <div className="quick-city-title-row">
                  <MapPin size={14} className="city-pin-mini" />
                  <span className="quick-city-name">{city.name}</span>
                  <button
                    className={`quick-fav-star ${isFav ? 'starred' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(city.id);
                    }}
                    title={isFav ? 'Bỏ yêu thích' : 'Yêu thích'}
                    aria-label={isFav ? 'Bỏ yêu thích' : 'Yêu thích'}
                  >
                    <Star size={13} fill={isFav ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="quick-city-temp">{temp}°</div>
              </div>
            </div>
          );
        })}

        {filteredCities.length === 0 && (
          <div className="quick-empty-text">
            Không tìm thấy thành phố phù hợp.
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickCityList;
