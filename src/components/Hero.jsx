import { useNavigate } from 'react-router-dom';
import '../css/Hero.css';
import heroImage from '../assets/images/hero-img.png';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleWatchDemo = () => {
    // You can update this later to show a demo modal or navigate to a demo page
    console.log('Watch demo clicked');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          {/* Main Heading */}
          <h1 className="hero-title">
            Simplify Your Minutes with
            <pre><span className="hero-title-highlight">Minutor</span></pre>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            The modern solution for meeting management, note-taking, and team collaboration. 
            Transform your meetings into actionable insights with our intelligent platform.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <button 
              className="hero-btn hero-btn-primary"
              onClick={handleGetStarted}
            >
              Get Started Free
            </button>
            <button 
              className="hero-btn hero-btn-secondary"
              onClick={handleWatchDemo}
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Visual/Image */}
        <div className="hero-visual">
          <div className="hero-image-container">
            <img 
              src={heroImage} 
              alt="Minutor App Interface" 
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
