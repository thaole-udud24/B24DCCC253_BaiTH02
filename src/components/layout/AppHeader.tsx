import React from 'react';
import { CloudSun, Search, X, Star } from 'lucide-react';
import type { TemperatureUnit } from '../../types/weather';

interface AppHeaderProps {
  searchQuery: string;
  unit: TemperatureUnit;
  showFavoritesOnly: boolean;
  favoritesCount: number;
  onSearchChange: (q: string) => void;
  onClearSearch: () => void;
  onUnitChange: (unit: TemperatureUnit) => void;
  onToggleFavoritesFilter: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  searchQuery,
  unit,
  showFavoritesOnly,
  favoritesCount,
  onSearchChange,
  onClearSearch,
  onUnitChange,
  onToggleFavoritesFilter,
}) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-brand">
        <div className="header-logo" aria-hidden="true">
          <CloudSun size={26} />
        </div>
        <div className="header-title">
          <span className="header-app-name">Mây Mùa</span>
          <span className="header-tagline">Thời tiết Việt Nam, trong tầm mắt</span>
        </div>
      </div>

      <div className="header-controls">
        {/* Search input */}
        <div className="search-wrapper" role="search">
          <Search
            size={15}
            className="search-icon"
            aria-hidden="true"
          />
          <input
            id="city-search-input"
            type="search"
            className="search-input"
            placeholder="Tìm thành phố..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Tìm kiếm thành phố"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={onClearSearch}
              aria-label="Xóa từ khóa tìm kiếm"
              id="search-clear-btn"
            >
              <X size={11} />
            </button>
          )}
        </div>

        {/* Favorites filter */}
        <button
          id="favorites-filter-btn"
          className={`fav-filter-btn ${showFavoritesOnly ? 'active' : ''}`}
          onClick={onToggleFavoritesFilter}
          aria-pressed={showFavoritesOnly}
          aria-label={showFavoritesOnly ? 'Hiển thị tất cả thành phố' : 'Chỉ hiển thị thành phố yêu thích'}
          title="Lọc yêu thích"
        >
          <Star
            size={14}
            fill={showFavoritesOnly ? 'currentColor' : 'none'}
          />
          Yêu thích {favoritesCount > 0 ? `(${favoritesCount})` : ''}
        </button>

        {/* Unit toggle */}
        <div
          className="unit-toggle"
          role="group"
          aria-label="Đơn vị nhiệt độ"
        >
          <button
            id="unit-celsius-btn"
            className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
            onClick={() => onUnitChange('C')}
            aria-pressed={unit === 'C'}
            aria-label="Hiển thị theo độ Celsius"
          >
            °C
          </button>
          <button
            id="unit-fahrenheit-btn"
            className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
            onClick={() => onUnitChange('F')}
            aria-pressed={unit === 'F'}
            aria-label="Hiển thị theo độ Fahrenheit"
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
