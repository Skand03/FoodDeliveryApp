import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserSession } from '../utils/auth';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUserSession();
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleCategoryClick = (category) => {
    // Navigate to restaurants page with category filter
    navigate('/restaurants', { state: { filterType: category } });
  };

  return (
    <div className="home">
      {/* Welcome Message for Logged-in Users */}
      {user && (
        <section className="welcome-section">
          <div className="container">
            <div className="welcome-message">
              <h2>Welcome back, {user.firstName}! 🎓</h2>
              <p>Ready to order some delicious campus food?</p>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Campus Food <span className="highlight">Delivered Fresh</span>
            </h1>
            <p className="hero-subtitle">
              Order from your favorite campus restaurants, department canteens, and food stalls. Get fresh, hot meals delivered right to your dorm or department!
            </p>
            <div className="hero-buttons">
              <Link to="/restaurants" className="btn btn-primary btn-large">
                Order Now
              </Link>
              {!user && (
                <Link to="/register" className="btn btn-outline btn-large">
                  Join Campus Food
                </Link>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="food-illustration">
              <span className="food-emoji">🍔</span>
              <span className="food-emoji">🍕</span>
              <span className="food-emoji">☕</span>
              <span className="food-emoji">🥪</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Campus Eats?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Campus Exclusive</h3>
              <p>Only for students, faculty, and staff members</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Delivery</h3>
              <p>Fast delivery across all departments and dorms</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Student Friendly</h3>
              <p>Affordable prices with student discounts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Department Canteens</h3>
              <p>Order from all department canteens and cafeterias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Popular Campus Food</h2>
          <div className="categories-grid">
            <div className="category-card" onClick={() => handleCategoryClick('Coffee Shops')}>
              <div className="category-icon">☕</div>
              <h3>Coffee & Snacks</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('Canteens')}>
              <div className="category-icon">🍽️</div>
              <h3>Meals</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('Food Stalls')}>
              <div className="category-icon">🥪</div>
              <h3>Quick Bites</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('All')}>
              <div className="category-icon">🍜</div>
              <h3>Department Specials</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('Coffee Shops')}>
              <div className="category-icon">🧃</div>
              <h3>Beverages</h3>
            </div>
            <div className="category-card" onClick={() => handleCategoryClick('All')}>
              <div className="category-icon">🍰</div>
              <h3>Desserts</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor CTA Section */}
      <section className="vendor-cta">
        <div className="container">
          <div className="vendor-cta-content">
            <div className="vendor-text">
              <h2>Own a Campus Food Business?</h2>
              <p>Join our platform and reach thousands of hungry students and faculty members!</p>
              <Link to="/vendor-register" className="btn btn-secondary btn-large">
                Become a Vendor
              </Link>
            </div>
            <div className="vendor-icon">
              <span className="vendor-emoji">🏪</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            {user ? (
              <>
                <h2>Hungry? Let's Order!</h2>
                <p>Browse our amazing campus restaurant partners and get your favorite food delivered!</p>
                <Link to="/restaurants" className="btn btn-primary btn-large">
                  Browse Campus Restaurants
                </Link>
              </>
            ) : (
              <>
                <h2>Ready to Order?</h2>
                <p>Join thousands of satisfied students and faculty members. Get your favorite campus food delivered today!</p>
                <Link to="/register" className="btn btn-primary btn-large">
                  Get Started Now
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;