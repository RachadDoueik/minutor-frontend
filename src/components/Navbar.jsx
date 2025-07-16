import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../assets/images/logo-white-bg.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleGetStarted = () => {
    navigate('/auth');
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
          {/* Mobile CTA Buttons */}
          {isMenuOpen && (
            <>
              <li className="navbar-item navbar-mobile-btn">
                <button 
                  className="navbar-btn navbar-btn-signin navbar-mobile-signin"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </li>
              <li className="navbar-item navbar-mobile-btn">
                <button 
                  className="navbar-btn navbar-btn-primary navbar-mobile-primary"
                  onClick={handleGetStarted}
                >
                  Get Started
                </button>
              </li>
            </>
          )}
        </ul>

        {/* CTA Buttons */}
        <div className="navbar-cta">
          <button 
            className="navbar-btn navbar-btn-signin"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button 
            className="navbar-btn navbar-btn-primary"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
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
