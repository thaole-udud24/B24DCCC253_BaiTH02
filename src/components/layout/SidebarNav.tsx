import React from 'react';
import {
  CloudSun,
  LayoutDashboard,
  Clock,
  CalendarDays,
  Droplets,
  Wind,
  RotateCw,
} from 'lucide-react';
import type { TemperatureUnit } from '../../types/weather';

interface SidebarNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onSelectTab,
  unit,
  onUnitChange,
  onRefresh,
  isRefreshing,
}) => {
  const navItems = [
    { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
    { id: 'hourly', label: 'Dự báo giờ', icon: Clock },
    { id: 'weekly', label: 'Dự báo tuần', icon: CalendarDays },
    { id: 'rainfall', label: 'Lượng mưa', icon: Droplets },
    { id: 'airquality', label: 'Chất lượng KK', icon: Wind },
  ];

  return (
    <aside className="sidebar-nav" aria-label="Thanh điều hướng">
      {/* Brand Icon */}
      <div className="sidebar-brand">
        <button
          className="sidebar-brand-icon"
          onClick={() => onSelectTab('overview')}
          title="Mây Mùa - Về trang Tổng quan"
          aria-label="Về trang Tổng quan"
        >
          <CloudSun size={24} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="sidebar-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(item.id)}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div className="sidebar-footer">
        {/* Refresh button */}
        <button
          className={`sidebar-action-btn ${isRefreshing ? 'spinning' : ''}`}
          onClick={onRefresh}
          title="Làm mới dữ liệu thời tiết"
          aria-label="Làm mới dữ liệu"
        >
          <RotateCw size={18} />
        </button>

        {/* Unit switch */}
        <div className="sidebar-unit-switch" role="group" aria-label="Đơn vị nhiệt độ">
          <button
            className={`unit-pill-btn ${unit === 'C' ? 'active' : ''}`}
            onClick={() => onUnitChange('C')}
            aria-label="Độ C"
          >
            °C
          </button>
          <button
            className={`unit-pill-btn ${unit === 'F' ? 'active' : ''}`}
            onClick={() => onUnitChange('F')}
            aria-label="Độ F"
          >
            °F
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
