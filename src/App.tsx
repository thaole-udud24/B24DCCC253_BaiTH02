import React, { useState, useCallback, useRef, useEffect } from 'react';
import './styles/global.css';
import './styles/variables.css';
import './styles/layout.css';
import './styles/components.css';

import type { City, TemperatureUnit, WeatherData, CityRegion } from './types/weather';
import { CITIES, DEFAULT_CITY_ID } from './data/cities';
import { useWeather } from './hooks/useWeather';
import { useFavorites } from './hooks/useFavorites';
import { getGreeting, formatFullDateVietnamese } from './utils/date';
import { fetchWeather } from './services/weatherApi';

import SidebarNav from './components/layout/SidebarNav';

import HeroWeatherBanner from './components/weather/HeroWeatherBanner';
import WeeklyPillBar from './components/weather/WeeklyPillBar';
import HourlyForecastWidget from './components/weather/HourlyForecastWidget';
import SunriseSunsetWidget from './components/weather/SunriseSunsetWidget';
import AirQualityWidget from './components/weather/AirQualityWidget';
import RainfallWidget from './components/weather/RainfallWidget';
import CurrentConditionsGrid from './components/weather/CurrentConditionsGrid';

import HourlyTab from './components/tabs/HourlyTab';
import WeeklyTab from './components/tabs/WeeklyTab';
import RainfallTab from './components/tabs/RainfallTab';
import AirQualityTab from './components/tabs/AirQualityTab';

import FeaturedCityCard from './components/city/FeaturedCityCard';
import QuickCityList from './components/city/QuickCityList';

import LoadingState from './components/common/LoadingState';
import ErrorState from './components/common/ErrorState';
import { Search, X, Star } from 'lucide-react';

const REGION_OPTIONS: { id: CityRegion; label: string }[] = [
  { id: 'all', label: 'Tất cả' },
  { id: 'north', label: 'Miền Bắc' },
  { id: 'central', label: 'Miền Trung' },
  { id: 'south', label: 'Miền Nam' },
];

const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City>(
    () => CITIES.find(c => c.id === DEFAULT_CITY_ID) ?? CITIES[0]
  );
  const [unit, setUnit] = useState<TemperatureUnit>('C');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<CityRegion>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { state, retry } = useWeather(selectedCity);
  const { favorites, toggleFavorite } = useFavorites();

  const [cachedCitiesData, setCachedCitiesData] = useState<Map<string, WeatherData>>(new Map());
  const cacheRef = useRef<Map<string, WeatherData>>(new Map());

  useEffect(() => {
    if (state.status === 'success') {
      cacheRef.current.set(state.data.city.id, state.data);
      setCachedCitiesData(new Map(cacheRef.current));
    }
  }, [state]);

  useEffect(() => {
    const controller = new AbortController();
    const otherCities = CITIES.filter(c => c.id !== selectedCity.id);

    async function prefetchOthers() {
      await Promise.allSettled(
        otherCities.map(async (city) => {
          if (!cacheRef.current.has(city.id)) {
            try {
              const data = await fetchWeather(city, controller.signal);
              cacheRef.current.set(city.id, data);
            } catch {
              // ignore background fetch error
            }
          }
        })
      );
      setCachedCitiesData(new Map(cacheRef.current));
    }

    prefetchOthers();
    return () => controller.abort();
  }, [selectedCity.id]);

  const handleSelectCity = useCallback((city: City) => {
    setSelectedCity(city);
    setSelectedDayIndex(0);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    retry();
    setTimeout(() => setIsRefreshing(false), 800);
  }, [retry]);

  const greeting = getGreeting();
  const dateStr = formatFullDateVietnamese();

  const activeData: WeatherData | null =
    state.status === 'success'
      ? state.data
      : state.status === 'error' && state.cachedData
      ? state.cachedData
      : null;

  return (
    <div className="page-wrapper">
      <div className="dashboard-container">
        {/* COLUMN 1: Slim Icon Sidebar (like Image 2) */}
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          unit={unit}
          onUnitChange={setUnit}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        {/* COLUMN 2: Center Main Content (Rich Dashboard) */}
        <main className="dashboard-center" role="main">
          {/* Header Greeting & Real-time Indicator */}
          <div className="center-header">
            <div>
              <h1 className="center-greeting">{greeting}</h1>
              <div className="center-date-str">{dateStr}</div>
            </div>

            <div className="center-header-actions">
              <div className="live-badge" title="Dữ liệu thời gian thực từ trạm đo vệ tinh Open-Meteo">
                <span className="live-dot" />
                <span>Trực tiếp</span>
              </div>
            </div>
          </div>

          {/* Loading or Error Fallback */}
          {state.status === 'loading' && !activeData && <LoadingState />}
          {state.status === 'error' && !activeData && (
            <ErrorState message={state.error} onRetry={retry} />
          )}

          {activeData && (
            <>
              {activeTab === 'overview' && (
                <>
                  {/* 7-Day Weekly Pill Selector (Image 2 style) */}
                  <WeeklyPillBar
                    data={activeData}
                    unit={unit}
                    selectedDayIndex={selectedDayIndex}
                    onSelectDay={setSelectedDayIndex}
                  />

                  {/* Google Weather Landscape Hero Banner (Image 1 style) */}
                  <HeroWeatherBanner data={activeData} unit={unit} />

                  {/* 24-Hour Hourly Forecast Horizontal Track (Image 1 style) */}
                  <HourlyForecastWidget data={activeData} unit={unit} />

                  {/* Rich Widget Cards Grid (Images 1 & 2) */}
                  <div className="center-widgets-grid">
                    {/* Sunrise & Sunset Arc Graphic */}
                    <SunriseSunsetWidget data={activeData} />

                    {/* Air Quality Index (AQI) & Hourly Wind Direction */}
                    <AirQualityWidget data={activeData} />

                    {/* Rainfall & Probability Dual Bar Chart */}
                    <RainfallWidget data={activeData} />

                    {/* 4 Conditions: Wind Compass, Humidity & Dew Point, UV Index, Pressure */}
                    <CurrentConditionsGrid data={activeData} />
                  </div>
                </>
              )}

              {activeTab === 'hourly' && (
                <HourlyTab data={activeData} unit={unit} />
              )}

              {activeTab === 'weekly' && (
                <WeeklyTab data={activeData} unit={unit} />
              )}

              {activeTab === 'rainfall' && (
                <RainfallTab data={activeData} />
              )}

              {activeTab === 'airquality' && (
                <AirQualityTab data={activeData} />
              )}
            </>
          )}
        </main>

        {/* COLUMN 3: Right Sidebar (Featured City & City Switcher) */}
        <aside className="dashboard-right" aria-label="Lựa chọn thành phố">
          {/* Search bar with instant filter */}
          <div className="right-search-bar" role="search">
            <Search size={16} className="text-secondary" />
            <input
              type="text"
              className="search-input-field"
              placeholder="Tìm kiếm thành phố Việt Nam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Tìm kiếm thành phố"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Xóa tìm kiếm"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Region & Favorites Filters */}
          <div className="region-tabs-row" role="tablist" aria-label="Bộ lọc khu vực">
            {REGION_OPTIONS.map((r) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={selectedRegion === r.id && !showFavoritesOnly}
                className={`region-tab-chip ${
                  selectedRegion === r.id && !showFavoritesOnly ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedRegion(r.id);
                  setShowFavoritesOnly(false);
                }}
              >
                {r.label}
              </button>
            ))}

            <button
              role="tab"
              aria-selected={showFavoritesOnly}
              className={`region-tab-chip ${showFavoritesOnly ? 'active' : ''}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Star size={12} fill={showFavoritesOnly ? 'currentColor' : 'none'} />
              Yêu thích ({favorites.size})
            </button>
          </div>

          {/* Featured Active City Large Card (Image 2 right column) */}
          {activeData && (
            <FeaturedCityCard
              data={activeData}
              unit={unit}
              isFavorite={favorites.has(selectedCity.id)}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {/* Other Vietnamese Cities Stacked List (Image 2 bottom-right) */}
          <div className="quick-cities-section">
            <QuickCityList
              cities={CITIES}
              selectedCityId={selectedCity.id}
              searchQuery={searchQuery}
              selectedRegion={selectedRegion}
              showFavoritesOnly={showFavoritesOnly}
              favorites={favorites}
              weatherCache={cachedCitiesData}
              unit={unit}
              onSelectCity={handleSelectCity}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </aside>
      </div>

      <footer className="app-footer">
        Dữ liệu thời tiết theo thời gian thực được cung cấp bởi{' '}
        <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer">
          Open-Meteo
        </a>{' '}
        • Giao diện thiết kế Pastel Dashboard hiện đại
      </footer>
    </div>
  );
};

export default App;
