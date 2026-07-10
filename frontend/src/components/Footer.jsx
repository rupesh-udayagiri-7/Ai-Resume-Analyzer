import { Link } from 'react-router-dom';
import { FiCpu, FiSettings, FiGithub, FiLinkedin, FiHeart } from 'react-icons/fi';
import '../index.css';

const Footer = ({ show }) => {
  return (
    <footer className={`footer glass-panel ${show ? 'visible' : ''}`}>
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-row" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div className="footer-logo-wrapper">
              <FiCpu className="footer-logo" />
            </div>
            <h3 style={{ margin: 0 }}>Resume<span>AI</span></h3>
          </div>
          <p>Supercharging careers through intelligent, state-of-the-art resume scanning and skill matching.</p>
        </div>

        <div className="footer-links-group">
          <h4>Features</h4>
          <span className="footer-static-link">ATS Optimizer</span>
          <span className="footer-static-link">Compatibility Check</span>
          <span className="footer-static-link">Skill Gap Analysis</span>
        </div>

        <div className="footer-links-group">
          <h4>Resources</h4>
          <span className="footer-static-link">Documentation</span>
          <span className="footer-static-link">Help Center</span>
          <span className="footer-static-link">Security Standard</span>
        </div>

        <div className="footer-links-group">
          <h4>Connect</h4>
          <div className="footer-socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon"><FiGithub /></a>
            <a href="https://www.linkedin.com/in/udayagiri-rupesh-r7990" target="_blank" rel="noreferrer" className="social-icon"><FiLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ResumeAI. Designed and developed by <span className="developer-name" style={{ color: '#c084fc', fontWeight: '700', letterSpacing: '0.3px' }}>RUPESH UDAYAGIRI (23JK1A05H9)</span> with <FiHeart className="heart-icon" />.</p>
        
        <Link to="/admin" className="admin-special-btn">
          <FiSettings className="gear-icon" /> Admin Panel
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
