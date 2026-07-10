import { Link } from 'react-router-dom';
import { FiCheckCircle, FiTrendingUp, FiTarget, FiArrowRight, FiCpu, FiAward, FiZap, FiPlus, FiLayout, FiDownload, FiBookOpen, FiUserCheck } from 'react-icons/fi';
import '../index.css';
const Home = () => {
  return (
    <div className="home-container fade-in">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge fade-in-up">
          <span className="badge-glow"></span>
          <span className="badge-content"><FiZap style={{ marginRight: '0.25rem' }} /> AI-Powered Resume Scoring</span>
        </div>
        
        <h1 className="hero-title fade-in-up delay-1">
          Supercharge Your Career with <span className="highlight-text">AI Insights</span>
        </h1>
        
        <p className="hero-subtitle fade-in-up delay-2">
          Intelligently evaluate your resume, compare it directly against actual job descriptions, 
          and identify critical skill gaps before you even apply.
        </p>

        <div className="hero-actions fade-in-up delay-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/create-resume" className="btn btn-primary cta-button">
            Create My Resume <FiPlus style={{ marginLeft: '0.5rem' }} />
          </Link>
          <Link to="/mock-tests" className="btn btn-primary cta-button" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)' }}>
            Start Mock Test <FiAward style={{ marginLeft: '0.5rem' }} />
          </Link>
          <Link to="/analyze" className="btn btn-secondary cta-button-sec" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            Start Analyzing Now <FiArrowRight style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>

        {/* Visual Interactive Dashboard Preview */}
        <div className="mock-dashboard-wrapper fade-in-up delay-4">
          <div className="mock-dashboard glass-panel">
            <div className="mock-dashboard-header">
              <div className="mock-window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="mock-title">Interactive Analysis Preview</div>
            </div>
            
            <div className="mock-dashboard-body">
              <div className="mock-sidebar">
                <div className="mock-item active"><FiCpu /> Resume Analysis</div>
                <div className="mock-item"><FiAward /> Scored Match</div>
              </div>
              
              <div className="mock-content">
                <div className="mock-resume-info">
                  <div>
                    <span className="mock-label">Selected Resume</span>
                    <h4>Rupesh_Udayagiri_Resume.pdf</h4>
                  </div>
                  <span className="mock-badge">Full Stack Engineer Role</span>
                </div>

                <div className="mock-analysis-grid">
                  <div className="mock-score-card">
                    <h5>Compatibility Score</h5>
                    <div className="mock-radial-progress">
                      <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                          strokeDasharray="85, 100"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span className="mock-percentage">85%</span>
                    </div>
                  </div>

                  <div className="mock-details-card">
                    <h5>Matched Keywords</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                      <span className="mock-skill">React</span>
                      <span className="mock-skill">TypeScript</span>
                      <span className="mock-skill">Node.js</span>
                    </div>
                    <h5 style={{ marginTop: '1rem' }}>Missing Keywords</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                      <span className="mock-skill missing">Docker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row fade-in-up delay-4">
          <div className="stat-item">
            <h3>&lt; 1.2s</h3>
            <p>Analysis Speed</p>
          </div>
          <div className="stat-item">
            <h3>98.5%</h3>
            <p>Alignment Accuracy</p>
          </div>
          <div className="stat-item">
            <h3>15k+</h3>
            <p>Resumes Scanned</p>
          </div>
        </div>
      </section>

      {/* Resume Builder Section */}
      <section className="builder-highlight-section" style={{ padding: '5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h2 className="section-title">Industrial Resume Builder</h2>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-muted)' }}>
          Create an ATS-friendly, professional resume using our interactive builder. Answer quick questions, pick a layout, and export your industrial-standard format instantly.
        </p>

        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiCheckCircle className="feature-icon" style={{ color: '#10b981' }} />
            </div>
            <h3>ATS-Optimized Formats</h3>
            <p>Built matching industry-standard schemas. Resumes pass formatting parses of major applicant tracking software seamlessly.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiLayout className="feature-icon" style={{ color: '#3b82f6' }} />
            </div>
            <h3>Multiple Visual Templates</h3>
            <p>Switch between Classic Executive, Modern Tech, or Minimalist Academic templates in one click with live previews.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiDownload className="feature-icon" style={{ color: '#c084fc' }} />
            </div>
            <h3>Instant PDF Export</h3>
            <p>Print directly or download a clean A4 PDF file of your resume with correct spacing, styles, and page layouts.</p>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div className="specifications-checklist" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', margin: '0.5rem 0' }}>
            <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
              <FiCheckCircle /> ATS Friendly Standard
            </span>
            <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
              <FiCheckCircle /> Print-Ready A4 Format
            </span>
            <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
              <FiCheckCircle /> Real-Time Style Preview
            </span>
          </div>
          
          <Link to="/create-resume" className="btn btn-primary cta-button" style={{ padding: '0.85rem 2.5rem', fontSize: '1.1rem' }}>
            Launch Resume Builder <FiArrowRight style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>
      </section>

      {/* Mock Tests Highlight Section */}
      <section className="builder-highlight-section" style={{ padding: '5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <h2 className="section-title">Aptitude & Technical Mock Tests</h2>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 3rem', color: 'var(--text-muted)' }}>
          Test your preparation using actual recruitment exams. Assess your logical aptitude, programming fundamentals, and behavioral logic directly on the practice dashboard.
        </p>

        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiBookOpen className="feature-icon" style={{ color: '#c084fc' }} />
            </div>
            <h3>Aptitude & Reasoning Mocks</h3>
            <p>Practice logic and reasoning exams. Sourced from repeated questions asked at Google, Wipro, Amazon, TCS, Cognizant, CGI, Capgemini, and Accenture.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiCpu className="feature-icon" style={{ color: '#10b981' }} />
            </div>
            <h3>Language-Specific Mocks</h3>
            <p>Unlock structured MCQ exams for Python, JavaScript, Java, C, and C++ covering concepts, debugging, and OOP structure rules.</p>
          </div>

          <div className="feature-card glass-panel">
            <div className="feature-icon-wrapper">
              <FiUserCheck className="feature-icon" style={{ color: '#3b82f6' }} />
            </div>
            <h3>HR Interview Practice</h3>
            <p>Answer top behavioral questions asked in high-profile HR rounds. Learn structured STAR methodology answers with detailed logic explanations.</p>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div className="specifications-checklist" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', margin: '0.5rem 0' }}>
            <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
              <FiCheckCircle /> Top-Company Interview Pool
            </span>
            <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
              <FiCheckCircle /> Active Proctoring Lock
            </span>
            <span style={{ color: '#c084fc', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: '600' }}>
              <FiCheckCircle /> Multi-stage Learning Paths
            </span>
          </div>
          
          <Link to="/mock-tests" className="btn btn-primary cta-button" style={{ padding: '0.85rem 2.5rem', fontSize: '1.1rem', background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)' }}>
            Start Mock Test <FiArrowRight style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="features-section">
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
        <div className="cta-glow"></div>
        <h2>Ready to land your dream job?</h2>
        <p>Don't guess what recruiters want. Build a clean resume or check your compliance instantly.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/create-resume" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '1.1rem' }}>
            Build My Resume
          </Link>
          <Link to="/analyze" className="btn btn-secondary" style={{ padding: '0.85rem 2.5rem', fontSize: '1.1rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            Analyze Compatibility
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
