import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';
import { getUserSession, clearUserSession } from '../utils/auth';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = getUserSession();
    if (userData) {
      setUser(userData);
    }
  }, [location]);

  const handleLogout = () => {
    authAPI.logout();
    clearUserSession();
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'VENDOR':
        return '/vendor-dashboard';
      case 'ADMIN':
        return '/admin-dashboard';
      case 'CUSTOMER':
        return '/customer-dashboard';
      default:
        return null;
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">Campus Eats</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-menu">
          {(!user || user.role !== 'VENDOR') && (
            <Link to="/" className="nav-link">Home</Link>
          )}
          {(!user || user.role !== 'VENDOR') && (
            <Link to="/restaurants" className="nav-link">Restaurants</Link>
          )}
          {user && user.role === 'CUSTOMER' && (
            <>
              <Link to="/cart" className="nav-link">🛒 Cart</Link>
              <Link to="/orders" className="nav-link">📦 Orders</Link>
            </>
          )}
          {user && getDashboardLink() && (
            <Link to={getDashboardLink()} className="nav-link">📊 Dashboard</Link>
          )}
        </div>

        {/* User Actions */}
        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user.firstName}!</span>
              <span className="user-role">{user.role === 'VENDOR' ? 'Vendor' : user.role}</span>
              <button onClick={handleLogout} className="nav-btn nav-btn-secondary">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-btn nav-btn-secondary">Login</Link>
              <Link to="/register" className="nav-btn nav-btn-primary">Sign Up</Link>
              <Link to="/vendor-register" className="nav-btn nav-btn-vendor">Join as Vendor</Link>
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
        {(!user || user.role !== 'VENDOR') && (
          <Link to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</Link>
        )}
        {(!user || user.role !== 'VENDOR') && (
          <Link to="/restaurants" className="mobile-nav-link" onClick={toggleMenu}>Restaurants</Link>
        )}
        {user && user.role === 'CUSTOMER' && (
          <>
            <Link to="/cart" className="mobile-nav-link" onClick={toggleMenu}>🛒 Cart</Link>
            <Link to="/orders" className="mobile-nav-link" onClick={toggleMenu}>📦 Orders</Link>
          </>
        )}
        {user && getDashboardLink() && (
          <Link to={getDashboardLink()} className="mobile-nav-link" onClick={toggleMenu}>📊 Dashboard</Link>
        )}
        {user ? (
          <>
            <button onClick={handleLogout} className="mobile-nav-link logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mobile-nav-link" onClick={toggleMenu}>Login</Link>
            <Link to="/register" className="mobile-nav-link" onClick={toggleMenu}>Sign Up</Link>
            <Link to="/vendor-register" className="mobile-nav-link" onClick={toggleMenu}>Join as Vendor</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;