import { useState } from 'react';
import '../css/Navbar.css';
import logo from '../assets/images/logo-white-bg.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="/" className="navbar-logo-link">
            <div className="navbar-logo-icon">
              {/* Logo icon placeholder - you can replace this with your actual logo */}
              <img src={logo} alt="Minutor Logo" className="navbar-logo-image" />
            </div>
            <span className="navbar-logo-text">Minutor</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <a href="/" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="/about" className="navbar-link">
              About
            </a>
          </li>
          <li className="navbar-item">
            <a href="/features" className="navbar-link">
              Features
            </a>
          </li>
          <li className="navbar-item">
            <a href="/contact" className="navbar-link">
              Contact
            </a>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="navbar-cta">
          <button className="navbar-btn">
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
