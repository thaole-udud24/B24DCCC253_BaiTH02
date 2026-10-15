import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="state-container fade-in" role="alert">
      <div className="error-state-icon">
        <AlertCircle size={36} />
      </div>
      <h2 className="error-state-title">Không thể tải dữ liệu</h2>
      <p className="error-state-desc">{message}</p>
      <button
        id="retry-button"
        className="retry-btn"
        onClick={onRetry}
        aria-label="Thử tải lại dữ liệu thời tiết"
      >
        <RefreshCw size={16} />
        Thử lại
      </button>
    </div>
  );
};

export default ErrorState;
