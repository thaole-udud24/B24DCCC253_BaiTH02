import React from 'react';
import type { City, WeatherData, TemperatureUnit } from '../../types/weather';
import { matchesSearch } from '../../utils/vietnameseSearch';
import CityCard from './CityCard';

interface CityListProps {
  cities: City[];
  selectedCityId: string | null;
  searchQuery: string;
  showFavoritesOnly: boolean;
  favorites: Set<string>;
  weatherCache: Map<string, WeatherData>;
  unit: TemperatureUnit;
  onSelectCity: (city: City) => void;
  onToggleFavorite: (cityId: string) => void;
}

const CityList: React.FC<CityListProps> = ({
  cities,
  selectedCityId,
  searchQuery,
  showFavoritesOnly,
  favorites,
  weatherCache,
  unit,
  onSelectCity,
  onToggleFavorite,
}) => {
  const filtered = cities.filter((city) => {
    const matchSearch = matchesSearch(city.name, searchQuery);
    const matchFav = !showFavoritesOnly || favorites.has(city.id);
    return matchSearch && matchFav;
  });

  if (filtered.length === 0) {
    return (
      <div className="city-empty-search" role="status">
        {showFavoritesOnly && favorites.size === 0
          ? 'Chưa có thành phố yêu thích nào.'
          : `Không tìm thấy thành phố phù hợp với "${searchQuery}".`}
      </div>
    );
  }

  return (
    <div className="city-list" role="list" aria-label="Danh sách thành phố">
      {filtered.map((city) => (
        <CityCard
          key={city.id}
          city={city}
          isSelected={selectedCityId === city.id}
          isFavorite={favorites.has(city.id)}
          weatherData={weatherCache.get(city.id)}
          unit={unit}
          onSelect={onSelectCity}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default CityList;
