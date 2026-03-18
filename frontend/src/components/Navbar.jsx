import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiCpu, FiSettings } from 'react-icons/fi';
import '../index.css'; // Make sure styles are available

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FiCpu className="navbar-logo" />
        <h2>AI Resume Analyzer</h2>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          <FiHome /> Home
        </Link>
        <Link to="/analyze" className={`nav-link ${isActive('/analyze') ? 'active' : ''}`}>
          <FiCpu /> Analyzer
        </Link>
        <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`}>
          <FiSettings /> Admin
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
