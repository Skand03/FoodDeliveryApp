import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [recentRestaurants, setRecentRestaurants] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Check if user is actually a customer
      if (parsedUser.role !== 'CUSTOMER') {
        navigate('/');
        return;
      }
    } else {
      navigate('/login');
      return;
    }
    
    // Load customer data
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = () => {
    // Mock data - replace with actual API calls
    setTimeout(() => {
      setOrders([
        {
          id: 1,
          restaurant: 'Campus Canteen',
          restaurantImage: '🏪',
          items: ['Burger', 'Fries', 'Coke'],
          total: 15.99,
          status: 'Delivered',
          date: '2024-01-15',
          time: '12:30 PM',
          rating: 4.5
        },
        {
          id: 2,
          restaurant: 'Pizza Corner',
          restaurantImage: '🍕',
          items: ['Margherita Pizza', 'Garlic Bread'],
          total: 22.50,
          status: 'In Progress',
          date: '2024-01-16',
          time: '1:15 PM',
          estimatedDelivery: '30 mins'
        },
        {
          id: 3,
          restaurant: 'Healthy Bites',
          restaurantImage: '🥗',
          items: ['Caesar Salad', 'Green Smoothie'],
          total: 18.75,
          status: 'Preparing',
          date: '2024-01-16',
          time: '2:00 PM',
          estimatedDelivery: '25 mins'
        }
      ]);

      setFavoriteRestaurants([
        { id: 1, name: 'Campus Canteen', image: '🏪', cuisine: 'Multi-cuisine', rating: 4.2, orders: 12 },
        { id: 2, name: 'Pizza Corner', image: '🍕', cuisine: 'Italian', rating: 4.5, orders: 8 },
        { id: 3, name: 'Healthy Bites', image: '🥗', cuisine: 'Healthy', rating: 4.3, orders: 5 }
      ]);

      setRecentRestaurants([
        { id: 4, name: 'Burger Junction', image: '🍔', cuisine: 'Fast Food', rating: 4.1 },
        { id: 5, name: 'Noodle House', image: '🍜', cuisine: 'Asian', rating: 4.4 },
        { id: 6, name: 'Coffee Central', image: '☕', cuisine: 'Beverages', rating: 4.6 }
      ]);

      setStats({
        totalOrders: 25,
        totalSpent: 487.50,
        avgOrderValue: 19.50,
        favoriteRestaurants: 3,
        thisMonthOrders: 8,
        thisMonthSpent: 156.25
      });

      setLoading(false);
    }, 1000);
  };

  const handleBrowseRestaurants = () => {
    navigate('/restaurants');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };

  const handleOrderAgain = (restaurant) => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  const handleReorderItems = (order) => {
    // Add items to cart and navigate to checkout
    console.log('Reordering:', order.items);
    navigate('/cart');
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#28a745';
      case 'in progress': return '#ffc107';
      case 'preparing': return '#17a2b8';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container customer-dashboard-v2">
      {/* Header Section */}
      <div className="dashboard-header-v2">
        <div className="welcome-section-v2">
          <div className="user-avatar">
            <span>{user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}</span>
          </div>
          <div className="welcome-text">
            <h1>Welcome back, {user?.firstName}! 👋</h1>
            <p>Ready to satisfy your cravings?</p>
          </div>
        </div>
        
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>{user?.loyaltyPoints || 0}</h3>
              <p>Loyalty Points</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>{stats.thisMonthOrders}</h3>
              <p>This Month</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>${stats.thisMonthSpent}</h3>
              <p>Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          Favorites
        </button>
      </div>

      {/* Content based on active tab */}
      <div className="dashboard-content-v2">
        {activeTab === 'overview' && (
          <>
            {/* Quick Actions */}
            <div className="section quick-actions-v2">
              <h2>Quick Actions</h2>
              <div className="action-grid">
                <button className="action-card" onClick={handleBrowseRestaurants}>
                  <div className="action-icon">🍽️</div>
                  <h3>Browse Restaurants</h3>
                  <p>Explore food options</p>
                </button>
                
                <button className="action-card" onClick={() => navigate('/orders')}>
                  <div className="action-icon">📋</div>
                  <h3>Track Orders</h3>
                  <p>Check order status</p>
                </button>
                
                <button className="action-card" onClick={handleViewProfile}>
                  <div className="action-icon">👤</div>
                  <h3>My Profile</h3>
                  <p>Update information</p>
                </button>
                
                <button className="action-card" onClick={() => navigate('/cart')}>
                  <div className="action-icon">🛒</div>
                  <h3>My Cart</h3>
                  <p>View saved items</p>
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="section recent-orders-v2">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <button className="view-all-btn" onClick={() => setActiveTab('orders')}>
                  View All
                </button>
              </div>
              
              {orders.slice(0, 2).map(order => (
                <div key={order.id} className="order-card-v2">
                  <div className="order-restaurant">
                    <div className="restaurant-image">{order.restaurantImage}</div>
                    <div className="restaurant-info">
                      <h3>{order.restaurant}</h3>
                      <p>{order.date} • {order.time}</p>
                    </div>
                  </div>
                  
                  <div className="order-details-v2">
                    <div className="order-items">
                      <p>{order.items.join(', ')}</p>
                      <span className="order-total">${order.total}</span>
                    </div>
                    
                    <div className="order-status-actions">
                      <span 
                        className="status-badge" 
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </span>
                      
                      <div className="order-actions">
                        {order.status === 'Delivered' ? (
                          <button 
                            className="btn-secondary"
                            onClick={() => handleReorderItems(order)}
                          >
                            Reorder
                          </button>
                        ) : (
                          <button 
                            className="btn-primary"
                            onClick={() => handleTrackOrder(order.id)}
                          >
                            Track
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Restaurants */}
            <div className="section recent-restaurants">
              <h2>Recently Visited</h2>
              <div className="restaurant-grid">
                {recentRestaurants.map(restaurant => (
                  <div key={restaurant.id} className="restaurant-card-mini">
                    <div className="restaurant-image-mini">{restaurant.image}</div>
                    <div className="restaurant-info-mini">
                      <h4>{restaurant.name}</h4>
                      <p>{restaurant.cuisine}</p>
                      <div className="rating">⭐ {restaurant.rating}</div>
                    </div>
                    <button 
                      className="order-again-btn"
                      onClick={() => handleOrderAgain(restaurant)}
                    >
                      Order Again
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="section all-orders">
            <h2>All Orders</h2>
            <div className="orders-list-v2">
              {orders.map(order => (
                <div key={order.id} className="order-card-detailed">
                  <div className="order-header-detailed">
                    <div className="restaurant-info-detailed">
                      <span className="restaurant-image-detailed">{order.restaurantImage}</span>
                      <div>
                        <h3>{order.restaurant}</h3>
                        <p>Order #{order.id} • {order.date} at {order.time}</p>
                      </div>
                    </div>
                    <span 
                      className="status-badge-detailed" 
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="order-items-detailed">
                    <h4>Items:</h4>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="order-footer-detailed">
                    <div className="order-total-detailed">
                      <strong>Total: ${order.total}</strong>
                    </div>
                    <div className="order-actions-detailed">
                      {order.status === 'Delivered' ? (
                        <>
                          <button className="btn-outline">Rate Order</button>
                          <button 
                            className="btn-primary"
                            onClick={() => handleReorderItems(order)}
                          >
                            Reorder
                          </button>
                        </>
                      ) : (
                        <button 
                          className="btn-primary"
                          onClick={() => handleTrackOrder(order.id)}
                        >
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {order.estimatedDelivery && (
                    <div className="estimated-delivery">
                      <span>🕒 Estimated delivery: {order.estimatedDelivery}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="section favorites">
            <h2>Your Favorite Restaurants</h2>
            <div className="favorites-grid">
              {favoriteRestaurants.map(restaurant => (
                <div key={restaurant.id} className="favorite-card">
                  <div className="favorite-header">
                    <span className="favorite-image">{restaurant.image}</span>
                    <button className="favorite-btn active">❤️</button>
                  </div>
                  <div className="favorite-info">
                    <h3>{restaurant.name}</h3>
                    <p>{restaurant.cuisine}</p>
                    <div className="favorite-stats">
                      <span>⭐ {restaurant.rating}</span>
                      <span>📦 {restaurant.orders} orders</span>
                    </div>
                  </div>
                  <button 
                    className="order-now-btn"
                    onClick={() => handleOrderAgain(restaurant)}
                  >
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;