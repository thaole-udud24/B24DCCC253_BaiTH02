import React from 'react';
import { MapPin } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="state-container fade-in" role="status" aria-label="Chưa chọn thành phố">
      <div className="empty-state-icon">
        <MapPin size={36} />
      </div>
      <h2 className="empty-state-title">Chọn một thành phố</h2>
      <p className="empty-state-desc">
        Chọn một trong 8 thành phố bên trái để xem thông tin thời tiết hiện tại và dự báo 7 ngày tới.
      </p>
    </div>
  );
};

export default EmptyState;
