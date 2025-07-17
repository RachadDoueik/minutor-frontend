import { useState } from 'react';
import '../css/Auth.css';
import logo from '../assets/images/logo-white-bg.png';
import authBg from '../assets/images/auth-bg.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setCredentials } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const Auth = () => {

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: formData.email,
        password: formData.password
      });

      // Handle successful login, e.g., store token, redirect, etc.
      // Store in Redux
      if (response.data.user && response.data.token) {
        setCredentials({ user: response.data.user, token: response.data.token });
      }

      //store in localStorage if rememberMe is checked
      if (formData.rememberMe) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
      }
      else{
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        sessionStorage.setItem('token', response.data.token);
      }
      //show success message
      toast.success('Login successful!');

      if (response.data.user.is_admin == true) {
        // Redirect to admin dashboard if user is an admin
        navigate('/admin');
      }

    } catch (error) {
      //show error message
      if (!error.response) {
        // Network error / server unreachable
        toast.error('Unable to reach server. Check your connection.');
      } else if (error.response.status === 401) {
        // Invalid credentials
        toast.error('Invalid email or password.');
      } else if (error.response.status === 422) {
        // Validation error (e.g., missing email or password)
        const errors = error.response.data.errors;
        toast.error(`Validation error: ${JSON.stringify(errors)}`);
      } else if (error.response.status >= 500) {
        // Server error
        toast.error('Server error. Please try again later.');
      } else {
        // Other errors
        toast.error('An error occurred.');
      }
    }
  }

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
