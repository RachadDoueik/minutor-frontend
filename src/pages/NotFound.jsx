import { useNavigate } from 'react-router-dom';
import '../css/NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="not-found">
      <div className="not-found-container">
        <div className="not-found-content">
          {/* 404 Number */}
          <div className="not-found-number">
            <span className="digit">4</span>
            <span className="digit">0</span>
            <span className="digit">4</span>
          </div>

          {/* Error Message */}
          <div className="not-found-message">
            <h1 className="not-found-title">Page Not Found</h1>
            <p className="not-found-subtitle">
              The page you're looking for doesn't exist.
            </p>
          </div>

          {/* Home Button */}
          <div className="not-found-actions">
            <button 
              className="not-found-btn"
              onClick={handleGoHome}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
