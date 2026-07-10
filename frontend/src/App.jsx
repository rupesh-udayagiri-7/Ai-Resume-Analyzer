import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import CreateResume from './pages/CreateResume';
import MockTest from './pages/MockTest';
import AdminDashboard from './pages/AdminDashboard';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import './index.css';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Show scroll-to-top if scrolled down more than 300px
      setShowScrollTop(scrolled > 300);
      
      // Show scroll-to-bottom if we are not near the bottom (less than 100px from bottom)
      setShowScrollBottom(scrolled < maxScroll - 100);

      // Show footer if scrolled near the bottom of the page (within 50px)
      setShowFooter(scrolled >= maxScroll - 50);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  return (
    <Router>
      <div className="app-container">
        {/* Parallax Background Stars */}
        <div className="stars-container">
          <div className="stars-layer-1"></div>
          <div className="stars-layer-2"></div>
          <div className="stars-layer-3"></div>
        </div>

        {/* Animated Background Blobs */}
        <div className="glowing-blob blob-1"></div>
        <div className="glowing-blob blob-2"></div>
        <div className="glowing-blob blob-3"></div>
        
        <Navbar />
        
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyzer />} />
            <Route path="/create-resume" element={<CreateResume />} />
            <Route path="/mock-tests" element={<MockTest />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>

        <Footer show={showFooter} />

        {/* Floating Scroll Controls */}
        <div className="scroll-controls">
          <button 
            className={`scroll-btn scroll-top ${showScrollTop ? 'visible' : ''}`} 
            onClick={scrollToTop}
            aria-label="Scroll to Top"
          >
            <FiArrowUp />
          </button>
          <button 
            className={`scroll-btn scroll-bottom ${showScrollBottom ? 'visible' : ''}`} 
            onClick={scrollToBottom}
            aria-label="Scroll to Bottom"
          >
            <FiArrowDown />
          </button>
        </div>
      </div>
    </Router>
  );
}

export default App;
