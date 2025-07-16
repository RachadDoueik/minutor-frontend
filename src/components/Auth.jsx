import { useState } from 'react';
import '../css/Auth.css';
import logo from '../assets/images/logo-white-bg.png';
import authBg from '../assets/images/auth-bg.jpg';

const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in submitted:', formData);
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
            <h2 className="auth-branding-title">
              Welcome Back!
            </h2>
            <p className="auth-branding-subtitle">
              Sign in to continue managing your meetings efficiently and collaborate with your team.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2 className="auth-form-title">
                Sign In
              </h2>
              <p className="auth-form-subtitle">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
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

              <div className="auth-form-options">
                <label className="auth-checkbox">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <span className="auth-checkbox-text">Remember me</span>
                </label>
                <a href="#" className="auth-forgot-password">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="auth-submit-btn">
                Sign In
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-footer-text">
                Need an account? Contact your administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
