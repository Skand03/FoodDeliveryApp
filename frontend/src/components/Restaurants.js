import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { restaurantAPI } from '../services/api';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    // Handle navigation from Home page with filter
    if (location.state?.filterType) {
      handleFilterClick(location.state.filterType);
    }
  }, [location.state, allRestaurants]);

  const fetchRestaurants = async () => {
    try {
      console.log('Fetching restaurants from API...');
      const response = await restaurantAPI.getAll();
      console.log('API Response:', response);
      
      if (response.data && response.data.success && response.data.data) {
        setRestaurants(response.data.data);
        setAllRestaurants(response.data.data);
        console.log('Restaurants loaded:', response.data.data.length);
      } else {
        console.log('No restaurants found in API response, using mock data');
        loadMockData();
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      console.log('API failed, loading mock data instead');
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockRestaurants = [
      {
        id: 1,
        name: 'Campus Canteen',
        cuisine: 'Multi-cuisine',
        description: 'Your favorite campus canteen with variety of food options',
        address: 'Main Campus Building',
        phone: '+1234567890',
        rating: 4.2,
        deliveryTime: '15-25 mins',
        imageUrl: '🏪',
        featured: true,
        active: true
      },
      {
        id: 2,
        name: 'Pizza Corner',
        cuisine: 'Italian',
        description: 'Authentic Italian pizzas and pasta',
        address: 'Student Center',
        phone: '+1234567891',
        rating: 4.5,
        deliveryTime: '20-30 mins',
        imageUrl: '🍕',
        featured: true,
        active: true
      },
      {
        id: 3,
        name: 'Healthy Bites',
        cuisine: 'Healthy',
        description: 'Fresh salads, smoothies and healthy options',
        address: 'Gym Complex',
        phone: '+1234567892',
        rating: 4.3,
        deliveryTime: '10-20 mins',
        imageUrl: '🥗',
        featured: false,
        active: true
      },
      {
        id: 4,
        name: 'Burger Junction',
        cuisine: 'Fast Food',
        description: 'Juicy burgers and crispy fries',
        address: 'Food Court',
        phone: '+1234567893',
        rating: 4.1,
        deliveryTime: '15-25 mins',
        imageUrl: '🍔',
        featured: false,
        active: true
      },
      {
        id: 5,
        name: 'Noodle House',
        cuisine: 'Asian',
        description: 'Authentic Asian noodles and rice dishes',
        address: 'International Wing',
        phone: '+1234567894',
        rating: 4.4,
        deliveryTime: '20-30 mins',
        imageUrl: '🍜',
        featured: true,
        active: true
      },
      {
        id: 6,
        name: 'Coffee Central',
        cuisine: 'Beverages',
        description: 'Premium coffee and light snacks',
        address: 'Library Building',
        phone: '+1234567895',
        rating: 4.6,
        deliveryTime: '5-15 mins',
        imageUrl: '☕',
        featured: false,
        active: true
      },
      {
        id: 7,
        name: 'Taco Fiesta',
        cuisine: 'Mexican',
        description: 'Spicy tacos and Mexican delights',
        address: 'Sports Complex',
        phone: '+1234567896',
        rating: 4.0,
        deliveryTime: '15-25 mins',
        imageUrl: '🌮',
        featured: false,
        active: true
      },
      {
        id: 8,
        name: 'Sweet Treats',
        cuisine: 'Desserts',
        description: 'Cakes, pastries and sweet delights',
        address: 'Arts Building',
        phone: '+1234567897',
        rating: 4.7,
        deliveryTime: '10-20 mins',
        imageUrl: '🧁',
        featured: true,
        active: true
      }
    ];
    
    setRestaurants(mockRestaurants);
    setAllRestaurants(mockRestaurants);
    console.log('Mock restaurants loaded:', mockRestaurants.length);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setRestaurants(allRestaurants);
      setActiveFilter('All');
      return;
    }
    
    try {
      console.log('Searching for:', searchQuery);
      const response = await restaurantAPI.search(searchQuery);
      
      if (response.data && response.data.success && response.data.data) {
        setRestaurants(response.data.data);
        setActiveFilter('All');
      } else {
        // Fallback to local search if API fails
        const filteredRestaurants = allRestaurants.filter(restaurant =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setRestaurants(filteredRestaurants);
        setActiveFilter('All');
      }
    } catch (error) {
      console.error('Error searching restaurants:', error);
      // Fallback to local search
      const filteredRestaurants = allRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRestaurants(filteredRestaurants);
      setActiveFilter('All');
    }
  };

  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    setSearchQuery('');
    
    let filteredRestaurants = [...allRestaurants];
    
    switch (filterType) {
      case 'All':
        setRestaurants(allRestaurants);
        break;
      case 'Canteens':
        filteredRestaurants = allRestaurants.filter(r => 
          r.cuisine?.toLowerCase().includes('canteen') || 
          r.name?.toLowerCase().includes('canteen') ||
          r.cuisine?.toLowerCase().includes('multi-cuisine')
        );
        setRestaurants(filteredRestaurants);
        break;
      case 'Food Stalls':
        filteredRestaurants = allRestaurants.filter(r => 
          r.cuisine?.toLowerCase().includes('stall') || 
          r.name?.toLowerCase().includes('stall') ||
          r.cuisine?.toLowerCase().includes('fast food')
        );
        setRestaurants(filteredRestaurants);
        break;
      case 'Coffee Shops':
        filteredRestaurants = allRestaurants.filter(r => 
          r.cuisine?.toLowerCase().includes('coffee') || 
          r.name?.toLowerCase().includes('coffee') ||
          r.cuisine?.toLowerCase().includes('cafe') ||
          r.cuisine?.toLowerCase().includes('beverages')
        );
        setRestaurants(filteredRestaurants);
        break;
      case 'Top Rated':
        filteredRestaurants = allRestaurants.filter(r => r.rating >= 4.0);
        setRestaurants(filteredRestaurants);
        break;
      default:
        setRestaurants(allRestaurants);
    }
    
    console.log(`Filter applied: ${filterType}, Results: ${filteredRestaurants.length}`);
  };

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  if (loading) {
    return <div className="loading">Loading campus restaurants...</div>;
  }

  return (
    <div className="restaurants-page">
      <div className="container">
        <div className="page-header">
          <h1>Campus Food Partners</h1>
          <p>Discover amazing food from campus canteens, cafeterias, and food stalls</p>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search canteens, food stalls, or cuisines..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-btn" onClick={handleSearch}>🔍</button>
            {(searchQuery || activeFilter !== 'All') && (
              <button 
                className="clear-btn"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('All');
                  setRestaurants(allRestaurants);
                }}
                title="Clear all filters"
              >
                ✕
              </button>
            )}
          </div>
          <div className="filters">
            <button 
              className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
              onClick={() => handleFilterClick('All')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Canteens' ? 'active' : ''}`}
              onClick={() => handleFilterClick('Canteens')}
            >
              Canteens
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Food Stalls' ? 'active' : ''}`}
              onClick={() => handleFilterClick('Food Stalls')}
            >
              Food Stalls
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Coffee Shops' ? 'active' : ''}`}
              onClick={() => handleFilterClick('Coffee Shops')}
            >
              Coffee Shops
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Top Rated' ? 'active' : ''}`}
              onClick={() => handleFilterClick('Top Rated')}
            >
              Top Rated
            </button>
          </div>
          {activeFilter !== 'All' && (
            <div className="active-filters">
              <span className="filter-label">Active filters:</span>
              <span className="active-filter-tag">
                {activeFilter}
                <button onClick={() => handleFilterClick('All')}>×</button>
              </span>
            </div>
          )}
        </div>

        {/* All Restaurants */}
        <section className="all-restaurants">
          <h2>
            {activeFilter !== 'All' ? `${activeFilter}` : 'All Campus Vendors'}
            {restaurants.length > 0 && (
              <span className="results-count"> ({restaurants.length} found)</span>
            )}
          </h2>
          {restaurants.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No vendors found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setActiveFilter('All');
                  setSearchQuery('');
                  setRestaurants(allRestaurants);
                }}
              >
                Show All Vendors
              </button>
            </div>
          ) : (
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
                    <div className="location-badge">
                      <span className="location-icon">📍</span>
                      <span>Campus Location</span>
                    </div>
                    <button className="order-btn">View Menu</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Restaurants;