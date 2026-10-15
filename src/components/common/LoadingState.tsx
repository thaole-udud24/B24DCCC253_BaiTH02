import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="loading-state-inner" role="status" aria-label="Đang tải dữ liệu thời tiết">
      {/* Current weather skeleton */}
      <div className="sk-card">
        <div className="sk-row">
          <div className="sk-bar" style={{ height: 20, width: '40%' }} />
        </div>
        <div className="sk-bar" style={{ height: 72, width: '50%', marginTop: 4 }} />
        <div className="sk-bar" style={{ height: 18, width: '35%' }} />
        <div className="sk-row" style={{ marginTop: 16, gap: 32 }}>
          <div className="sk-bar" style={{ height: 44, width: 90 }} />
          <div className="sk-bar" style={{ height: 44, width: 90 }} />
        </div>
      </div>

      {/* Detail cards skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="sk-bar" style={{ height: 88, borderRadius: 18 }} />
        <div className="sk-bar" style={{ height: 88, borderRadius: 18 }} />
      </div>

      {/* Forecast skeleton */}
      <div className="sk-bar" style={{ height: 140, borderRadius: 24 }} />

      <span className="sr-only">Đang tải dữ liệu...</span>
    </div>
  );
};

export default LoadingState;
