import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [location]);

  const handleLogout = () => {
    authAPI.logout();
    setUser(null);
    navigate('/register');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🍕</span>
          <span className="logo-text">FoodieExpress</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/restaurants" className="nav-link">Restaurants</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* User Actions */}
        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user.firstName}!</span>
              <button onClick={handleLogout} className="nav-btn nav-btn-secondary">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-btn nav-btn-secondary">Login</Link>
              <Link to="/register" className="nav-btn nav-btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
        <Link to="/restaurants" className="mobile-nav-link" onClick={toggleMenu}>Restaurants</Link>
        <Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>About</Link>
        <Link to="/contact" className="mobile-nav-link" onClick={toggleMenu}>Contact</Link>
        {user ? (
          <>
            <button onClick={handleLogout} className="mobile-nav-link logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>Login</Link>
            <Link to="/register" className="mobile-nav-link" onClick={toggleMenu}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;