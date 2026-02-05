import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <div className="home">
      {/* Welcome Message for Logged-in Users */}
      {user && (
        <section className="welcome-section">
          <div className="container">
            <div className="welcome-message">
              <h2>Welcome back, {user.firstName}! 👋</h2>
              <p>Ready to order some delicious food?</p>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Delicious Food <span className="highlight">Delivered Fast</span>
            </h1>
            <p className="hero-subtitle">
              Order from your favorite restaurants and get fresh, hot meals delivered to your doorstep in minutes.
            </p>
            <div className="hero-buttons">
              <Link to="/restaurants" className="btn btn-primary btn-large">
                Order Now
              </Link>
              {!user && (
                <Link to="/register" className="btn btn-outline btn-large">
                  Sign Up Free
                </Link>
              )}
            </div>
          </div>
          <div className="hero-image">
            <div className="food-illustration">
              <span className="food-emoji">🍔</span>
              <span className="food-emoji">🍕</span>
              <span className="food-emoji">🍜</span>
              <span className="food-emoji">🥗</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose FoodieExpress?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast Delivery</h3>
              <p>Get your food delivered in 30 minutes or less</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Quality Food</h3>
              <p>Fresh ingredients from top-rated restaurants</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Ordering</h3>
              <p>Simple and intuitive ordering process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Secure Payment</h3>
              <p>Safe and secure payment options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Popular Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">🍕</div>
              <h3>Pizza</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">🍔</div>
              <h3>Burgers</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">🍜</div>
              <h3>Asian</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">🥗</div>
              <h3>Healthy</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">🌮</div>
              <h3>Mexican</h3>
            </div>
            <div className="category-card">
              <div className="category-icon">🍰</div>
              <h3>Desserts</h3>
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
                <p>Browse our amazing restaurant partners and get your favorite food delivered!</p>
                <Link to="/restaurants" className="btn btn-primary btn-large">
                  Browse Restaurants
                </Link>
              </>
            ) : (
              <>
                <h2>Ready to Order?</h2>
                <p>Join thousands of satisfied customers and get your favorite food delivered today!</p>
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