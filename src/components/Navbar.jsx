import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import '../css/Navbar.css';
import logo from '../assets/images/logo-white-bg.png';
import api from '../api/axios';
import { logout } from '../store/authSlice';
import { setLoading } from '../store/authSlice';
import { LuLogOut } from 'react-icons/lu';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();

  // Accessing user state from Redux store
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close profile dropdown when authentication state changes
  useEffect(() => {
    setIsProfileDropdownOpen(false);
  }, [isAuthenticated]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    try {

      dispatch(setLoading(true)); // Set loading state
      
      await api.post('/auth/logout'); // token should be attached automatically
      
      // Clear stored authentication data
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      
      // Dispatch logout action to Redux store
      dispatch(logout());

       dispatch(setLoading(false)); // Reset loading state
      
      toast.info('Logout successful!');// Show success message
  
      navigate('/'); // Redirect to home page

      setIsProfileDropdownOpen(false); // Close dropdown on logout
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleProfile = () => {
    console.log('Navigate to profile');
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <div className="navbar-logo-icon">
              {/* Logo icon placeholder - you can replace this with your actual logo */}
              <img src={logo} alt="Minutor Logo" className="navbar-logo-image" />
            </div>
            <span className="navbar-logo-text">Minutor</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/features" className="navbar-link">
              Features
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link">
              Contact
            </Link>
          </li>
          {/* Mobile CTA Button */}
          {isMenuOpen && (
            <li className="navbar-item navbar-mobile-btn">
              {isAuthenticated ? (
                <div className="profile-container-mobile">
                  <button
                    className="profile-icon-btn-mobile"
                    onClick={toggleProfileDropdown}
                  >
                    <div className="profile-icon-mobile">
                      {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                    </div>
                    <span className="profile-text-mobile">Profile</span>
                  </button>
                  
                  {isProfileDropdownOpen && (
                    <div className="profile-dropdown-mobile">
                      <div className="profile-dropdown-header">
                        <div className="profile-avatar">
                          {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                        </div>
                        <div className="profile-info">
                          <div className="profile-name">{user?.name || 'User'}</div>
                          <div className="profile-email">{user?.email || 'user@example.com'}</div>
                        </div>
                      </div>
                      <div className="profile-dropdown-divider"></div>
                      <button
                        className="profile-dropdown-item"
                        onClick={handleProfile}
                      >
                        👤 Profile
                      </button>
                      <button
                        className="profile-dropdown-item logout"
                        onClick={() => handleLogout()}
                      >
                        <LuLogOut/> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className="navbar-btn navbar-btn-primary navbar-mobile-signin"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              )}
            </li>
          )}
        </ul>

        {/* CTA Button */}
        <div className="navbar-cta">
          {isAuthenticated ? (
            <div className="profile-container" ref={profileDropdownRef}>
              <button
                className="profile-icon-btn"
                onClick={toggleProfileDropdown}
              >
                <div className="profile-icon">
                  {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                </div>
              </button>
              
              {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="profile-avatar">
                      {user?.name ? user.name.charAt(0).toUpperCase() : '👤'}
                    </div>
                    <div className="profile-info">
                      <div className="profile-name">{user?.name || 'User'}</div>
                      <div className="profile-email">{user?.email || 'user@example.com'}</div>
                    </div>
                  </div>
                  <div className="profile-dropdown-divider"></div>
                  <button
                    className="profile-dropdown-item"
                    onClick={handleProfile}
                  >
                    👤 Profile
                  </button>
                  <button
                    className="profile-dropdown-item logout"
                    onClick={handleLogout}
                  >
                   <LuLogOut/> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="navbar-btn navbar-btn-primary"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
          <span className={`bar ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
