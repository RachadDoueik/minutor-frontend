import '../css/Features.css';

const Features = () => {
  return (
    <section className="features">
      <div className="features-container">
        {/* Section Header */}
        <div className="features-header">
          <h2 className="features-title">
            Powerful <span className="features-title-highlight">Meeting Management</span> Features
          </h2>
          <p className="features-subtitle">
            Everything you need to capture, organize, and act on your meeting insights
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-emoji">✏️</span>
            </div>
            <h3 className="feature-title">Smart Meeting Minutes</h3>
            <p className="feature-description">
              Capture and organize meeting minutes with ease. 
              Never miss important details or action items again.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-emoji">👥</span>
            </div>
            <h3 className="feature-title">Real-time Collaboration</h3>
            <p className="feature-description">
              Collaborate with team members during meetings. Share notes, comments, and 
              updates in real-time for better team alignment.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-emoji">☑️</span>
            </div>
            <h3 className="feature-title">Action Item Tracking</h3>
            <p className="feature-description">
              Automatically extract and track action items from your meetings. Assign tasks, 
              set deadlines, and monitor progress effortlessly.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-emoji">📄</span>
            </div>
            <h3 className="feature-title">Document Generation</h3>
            <p className="feature-description">
              Automatically generate professional meeting summaries, reports, and documents. 
              Export to PDF, Word, or share directly with stakeholders in seconds.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-emoji">🏢</span>
            </div>
            <h3 className="feature-title">Meeting Room Booking</h3>
            <p className="feature-description">
              Reserve meeting rooms directly from the app. Check availability, book spaces, 
              and manage room resources all in one integrated platform.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div className="feature-icon">
              <span className="feature-icon-emoji">📅</span>
            </div>
            <h3 className="feature-title">Smart Room Scheduling</h3>
            <p className="feature-description">
              AI-powered room recommendations based on meeting size, equipment needs, and 
              availability. Optimize your workspace utilization effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
