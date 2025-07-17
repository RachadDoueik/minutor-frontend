import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RequireAdmin = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isLoading) {
      if (!isAuthenticated || !user?.is_admin) {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '18px'
      }}>
        Checking admin access...
      </div>
    );
  }

  return children;
};

export default RequireAdmin;