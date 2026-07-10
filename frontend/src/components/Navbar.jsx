import { useLocation, useNavigate } from 'react-router-dom';
import { FiCpu } from 'react-icons/fi';
import '../index.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBrandClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="navbar-brand" onClick={handleBrandClick} role="button" tabIndex={0} style={{ outline: 'none' }}>
        <div className="navbar-logo-wrapper">
          <FiCpu className="navbar-logo" />
        </div>
        <h2>Resume<span>AI</span></h2>
      </div>

      <div className="navbar-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button 
          className={`nav-link-btn ${location.pathname === '/create-resume' ? 'active' : ''}`}
          onClick={() => navigate('/create-resume')}
        >
          Resume Builder
        </button>
        <button 
          className={`nav-link-btn ${location.pathname === '/analyze' ? 'active' : ''}`}
          onClick={() => navigate('/analyze')}
        >
          Resume Analyzer
        </button>
        <button 
          className={`nav-link-btn ${location.pathname === '/mock-tests' ? 'active' : ''}`}
          onClick={() => navigate('/mock-tests')}
        >
          Mock Tests
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
