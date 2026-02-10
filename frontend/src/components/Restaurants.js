import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantAPI } from '../services/api';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchRestaurants();
      return;
    }
    try {
      const response = await restaurantAPI.search(searchQuery);
      setRestaurants(response.data.data);
    } catch (error) {
      console.error('Error searching restaurants:', error);
    }
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  return (
    <div className="restaurants-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Restaurant Partners</h1>
          <p>Discover amazing food from local restaurants</p>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search restaurants or cuisines..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch}>🔍</button>
          </div>
          <div className="filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Fast Delivery</button>
            <button className="filter-btn">Top Rated</button>
            <button className="filter-btn">New</button>
          </div>
        </div>

        {/* Featured Restaurants */}
        <section className="featured-section">
          <h2>Featured Restaurants</h2>
          <div className="restaurants-grid">
            {restaurants.filter(r => r.featured).map(restaurant => (
              <div key={restaurant.id} className="restaurant-card featured" onClick={() => handleRestaurantClick(restaurant.id)}>
                <div className="restaurant-image">
                  <span className="restaurant-emoji">{restaurant.imageUrl}</span>
                  <div className="featured-badge">Featured</div>
                </div>
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p className="cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-meta">
                    <span className="rating">⭐ {restaurant.rating}</span>
                    <span className="delivery-time">🕒 {restaurant.deliveryTime}</span>
                  </div>
                  <button className="order-btn">View Menu</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Restaurants */}
        <section className="all-restaurants">
          <h2>All Restaurants</h2>
          <div className="restaurants-grid">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="restaurant-card" onClick={() => handleRestaurantClick(restaurant.id)}>
                <div className="restaurant-image">
                  <span className="restaurant-emoji">{restaurant.imageUrl}</span>
                </div>
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p className="cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-meta">
                    <span className="rating">⭐ {restaurant.rating}</span>
                    <span className="delivery-time">🕒 {restaurant.deliveryTime}</span>
                  </div>
                  <button className="order-btn">View Menu</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Restaurants;