import '../css/Hero.css';
import heroImage from '../assets/images/hero-img.png';

const Hero = () => {
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
            <button className="hero-btn hero-btn-primary">
              Get Started Free
            </button>
            <button className="hero-btn hero-btn-secondary">
              Watch Demo
            </button>
          </div>

          {/* Feature Highlights */}
          <div className="hero-features">
            <div className="hero-feature">
              <span className="hero-feature-icon">⚡</span>
              <span className="hero-feature-text">Lightning Fast</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">🤝</span>
              <span className="hero-feature-text">Team Collaboration</span>
            </div>
            <div className="hero-feature">
              <span className="hero-feature-icon">🔒</span>
              <span className="hero-feature-text">Secure & Private</span>
            </div>
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
