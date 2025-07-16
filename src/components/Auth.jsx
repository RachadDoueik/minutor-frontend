import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Auth.css';
import logo from '../assets/images/logo-white-bg.png';
import authBg from '../assets/images/auth-bg.jpg';

const Auth = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get('mode');
  
  const [isLogin, setIsLogin] = useState(mode !== 'signup');
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const toggleAuthMode = () => {
    setIsAnimating(true);
    
    // Start exit animation
    setTimeout(() => {
      setIsLogin(!isLogin);
      // Reset form data when switching modes
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
      });
      
      // End animation after content change
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 150);
  };

  return (
    <div className="auth" style={{ backgroundImage: `url(${authBg})` }}>
      <div className="auth-container">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="auth-logo">
              <img src={logo} alt="Minutor Logo" className="auth-logo-image" />
              <h1 className="auth-logo-text">Minutor</h1>
            </div>
            <h2 className={`auth-branding-title ${isAnimating ? 'animating' : ''}`}>
              {isLogin ? 'Welcome Back!' : 'Join Minutor Today'}
            </h2>
            <p className={`auth-branding-subtitle ${isAnimating ? 'animating' : ''}`}>
              {isLogin 
                ? 'Sign in to continue managing your meetings efficiently'
                : 'Start organizing your meetings and boost your productivity'
              }
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2 className={`auth-form-title ${isAnimating ? 'animating' : ''}`}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <p className={`auth-form-subtitle ${isAnimating ? 'animating' : ''}`}>
                {isLogin 
                  ? 'Enter your credentials to access your account'
                  : 'Fill in your details to get started'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="auth-form-row">
                  <div className="auth-form-group">
                    <label htmlFor="firstName" className="auth-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="auth-input"
                      placeholder="Enter your first name"
                      required={!isLogin}
                    />
                  </div>
                  <div className="auth-form-group">
                    <label htmlFor="lastName" className="auth-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="auth-input"
                      placeholder="Enter your last name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="auth-form-group">
                <label htmlFor="email" className="auth-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="auth-input"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label htmlFor="password" className="auth-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="auth-input"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {!isLogin && (
                <div className="auth-form-group">
                  <label htmlFor="confirmPassword" className="auth-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="auth-input"
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              )}

              {isLogin && (
                <div className="auth-form-options">
                  <label className="auth-checkbox">
                    <input type="checkbox" />
                    <span className="auth-checkbox-text">Remember me</span>
                  </label>
                  <a href="#" className="auth-forgot-password">
                    Forgot password?
                  </a>
                </div>
              )}

              <button type="submit" className="auth-submit-btn">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>

              {!isLogin && (
                <p className="auth-terms">
                  By creating an account, you agree to our{' '}
                  <a href="#" className="auth-link">Terms of Service</a> and{' '}
                  <a href="#" className="auth-link">Privacy Policy</a>
                </p>
              )}
            </form>

            <div className="auth-switch">
              <p className="auth-switch-text">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button" 
                  onClick={toggleAuthMode} 
                  className="auth-switch-btn"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
