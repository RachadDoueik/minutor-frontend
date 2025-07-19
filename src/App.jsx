import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import RequireAdmin from './components/guards/RequireAdmin';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './components/Auth';
import Admin from './pages/Admin';

import { setUser, setLoading } from './store/authSlice';
import NotFound from './pages/NotFound';

const AUTH_PATHS = ['/auth', '/admin'];

//Layout component to conditionally show navbar
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = AUTH_PATHS.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main style={{ paddingTop: hideNavbar ? '0' : '70px' }}>
        {children}
      </main>
    </>
  );
};

//Extract auth logic to reusable function
const useAuthInit = (dispatch, setIsAuthChecking) => {
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const userString = localStorage.getItem('user') || sessionStorage.getItem('user');

        if (token && userString) {
          const user = JSON.parse(userString);

          if (user && user.email && user.name) {
            dispatch(setUser({
              user,
              token,
              isAuthenticated: true,
            }));
            toast.success(`Welcome back, ${user.name}!`);
          } else {
            throw new Error('Invalid user data');
          }
        } else {
          console.log('ℹ️ No auth data found');
        }
      } catch (error) {
        console.error('❌ Auth error:', error);

        // Clean local/session storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        dispatch(setUser({
          user: null,
          token: null,
          isAuthenticated: false,
        }));
      } finally {
        dispatch(setLoading(false)); // Reset loading state
        setIsAuthChecking(false); // Auth check complete
      }
    };

    checkAuthStatus();
  }, [dispatch, setIsAuthChecking]);
};

function App() {
  const dispatch = useDispatch();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  // Initialize auth state
  useAuthInit(dispatch, setIsAuthChecking);

  if (isAuthChecking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Checking authentication...
      </div>
    );
  }

  return (
    <Router>
      <Layout>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={
            <RequireAdmin>
              <Admin />
            </RequireAdmin>
          } />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
