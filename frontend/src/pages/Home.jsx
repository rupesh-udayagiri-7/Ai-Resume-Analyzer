import { Link } from 'react-router-dom';
import { FiCheckCircle, FiTrendingUp, FiTarget } from 'react-icons/fi';
import '../index.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Supercharge Your Career with <span className="highlight-text">AI Insights</span>
        </h1>
        <p className="hero-subtitle">
          Intelligently evaluate your resume, compare it directly against actual job descriptions, 
          and identify critical skill gaps before you even apply.
        </p>
        <Link to="/analyze" className="btn btn-primary cta-button">
          Start Analyzing Now
        </Link>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">How It Works</h2>
        <div className="features-grid">
          
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiTarget className="feature-icon" />
            </div>
            <h3>1. Target The Job</h3>
            <p>Paste the exact Job Description you are aiming for. Our AI breaks down the core requirements instantly.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiCheckCircle className="feature-icon" />
            </div>
            <h3>2. Upload Your Resume</h3>
            <p>Securely upload your DOCX or PDF resume. We read and parse your experience, comparing it to the job.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiTrendingUp className="feature-icon" />
            </div>
            <h3>3. Get Actionable Feedback</h3>
            <p>Receive an exact Match Score, discover what missing skills to add, and get tailored suggestions for improvement.</p>
          </div>

        </div>
      </section>
      
      {/* CTA Footer Section */}
      <section className="cta-section glass-panel">
        <h2>Ready to land your dream job?</h2>
        <p>Don't guess what recruiters want. Know exactly what you're missing.</p>
        <Link to="/analyze" className="btn btn-primary" style={{ marginTop: '1rem', padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
          Analyze My Resume
        </Link>
      </section>
    </div>
  );
};

export default Home;
