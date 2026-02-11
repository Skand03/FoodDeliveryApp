import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { vendorAPI } from '../services/api';

const VendorDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  // Form states
  const [showRestaurantForm, setShowRestaurantForm] = useState(false);
  const [showMenuForm, setShowMenuForm] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    cuisine: '',
    description: '',
    address: '',
    phone: '',
    deliveryTime: '30-45 mins',
    imageUrl: '🏪'
  });
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '🍽️',
    available: true,
    vegetarian: false
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.role !== 'VENDOR') {
          navigate('/');
          return;
        }
        setUser(parsedUser);
        fetchVendorData(parsedUser.id);
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchVendorData = async (userId) => {
    try {
      console.log('Fetching vendor data for user ID:', userId);
      const restaurantRes = await vendorAPI.getVendorRestaurant(userId);
      console.log('Restaurant response:', restaurantRes);
      
      if (restaurantRes.data.success && restaurantRes.data.data) {
        setRestaurant(restaurantRes.data.data);
        fetchMenuItems(restaurantRes.data.data.id, userId);
      } else {
        console.log('No restaurant found for vendor');
        setRestaurant(null);
      }
    } catch (error) {
      console.error('Error fetching vendor data:', error);
      setRestaurant(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async (restaurantId, userId) => {
    try {
      console.log('Fetching menu items for restaurant ID:', restaurantId, 'user ID:', userId);
      const menuRes = await vendorAPI.getMenuItems(restaurantId, userId);
      console.log('Menu response:', menuRes);
      
      if (menuRes.data.success) {
        setMenuItems(menuRes.data.data || []);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setMenuItems([]);
    }
  };

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleRestaurantSubmit = async (e) => {
    e.preventDefault();
    try {
      if (restaurant) {
        await vendorAPI.updateRestaurant(restaurant.id, restaurantForm, user.id);
        showMessage('Restaurant updated successfully!', 'success');
      } else {
        const response = await vendorAPI.createRestaurant(restaurantForm, user.id);
        setRestaurant(response.data.data);
        showMessage('Restaurant created successfully!', 'success');
      }
      setShowRestaurantForm(false);
      fetchVendorData(user.id);
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to save restaurant', 'error');
    }
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMenuItem) {
        await vendorAPI.updateMenuItem(editingMenuItem.id, menuForm, user.id);
        showMessage('Menu item updated successfully!', 'success');
      } else {
        await vendorAPI.addMenuItem(restaurant.id, menuForm, user.id);
        showMessage('Menu item added successfully!', 'success');
      }
      setShowMenuForm(false);
      setEditingMenuItem(null);
      resetMenuForm();
      fetchMenuItems(restaurant.id, user.id);
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to save menu item', 'error');
    }
  };

  const handleDeleteMenuItem = async (menuItemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await vendorAPI.deleteMenuItem(menuItemId, user.id);
        showMessage('Menu item deleted successfully!', 'success');
        fetchMenuItems(restaurant.id, user.id);
      } catch (error) {
        showMessage(error.response?.data?.message || 'Failed to delete menu item', 'error');
      }
    }
  };

  const handleToggleRestaurantStatus = async () => {
    try {
      await vendorAPI.toggleRestaurantStatus(restaurant.id, user.id);
      showMessage(`Restaurant ${restaurant.active ? 'deactivated' : 'activated'} successfully!`, 'success');
      fetchVendorData(user.id);
    } catch (error) {
      showMessage(error.response?.data?.message || 'Failed to update restaurant status', 'error');
    }
  };

  const resetMenuForm = () => {
    setMenuForm({
      name: '',
      description: '',
      price: '',
      category: '',
      imageUrl: '🍽️',
      available: true,
      vegetarian: false
    });
  };

  const startEditMenuItem = (item) => {
    setEditingMenuItem(item);
    setMenuForm({
      name: item.name,
      description: item.description || '',
      price: item.price.toString(),
      category: item.category || '',
      imageUrl: item.imageUrl || '🍽️',
      available: item.available,
      vegetarian: item.vegetarian
    });
    setShowMenuForm(true);
  };

  const startEditRestaurant = () => {
    if (restaurant) {
      setRestaurantForm({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        description: restaurant.description || '',
        address: restaurant.address,
        phone: restaurant.phone || '',
        deliveryTime: restaurant.deliveryTime,
        imageUrl: restaurant.imageUrl
      });
    }
    setShowRestaurantForm(true);
  };

  if (loading) {
    return <div className="loading">Loading vendor dashboard...</div>;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const renderOverview = () => (
    <div className="tab-content">
      {!restaurant ? (
        <div className="no-restaurant">
          <div className="no-restaurant-icon">🏪</div>
          <h3>Welcome to Campus Eats!</h3>
          <p>Start by creating your restaurant profile to begin selling on our platform.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowRestaurantForm(true)}
          >
            Create Restaurant
          </button>
        </div>
      ) : (
        <>
          <div className="restaurant-overview">
            <div className="restaurant-card-dashboard">
              <div className="restaurant-header-dashboard">
                <span className="restaurant-emoji-large">{restaurant.imageUrl}</span>
                <div className="restaurant-info-dashboard">
                  <h3>{restaurant.name}</h3>
                  <p>{restaurant.cuisine} • {restaurant.deliveryTime}</p>
                  <div className="restaurant-status">
                    <span className={`status-badge ${restaurant.active ? 'active' : 'inactive'}`}>
                      {restaurant.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div className="restaurant-actions">
                  <button className="btn btn-secondary" onClick={startEditRestaurant}>
                    Edit
                  </button>
                  <button 
                    className={`btn ${restaurant.active ? 'btn-warning' : 'btn-success'}`}
                    onClick={handleToggleRestaurantStatus}
                  >
                    {restaurant.active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>Menu Items</h3>
                <p className="stat-number">{menuItems.length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-info">
                <h3>Rating</h3>
                <p className="stat-number">{restaurant.rating || 'N/A'}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🍽️</div>
              <div className="stat-info">
                <h3>Available Items</h3>
                <p className="stat-number">{menuItems.filter(item => item.available).length}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📍</div>
              <div className="stat-info">
                <h3>Status</h3>
                <p className="stat-number">{restaurant.active ? 'Open' : 'Closed'}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderMenuManagement = () => (
    <div className="tab-content">
      {!restaurant ? (
        <div className="no-restaurant">
          <h3>Create Restaurant First</h3>
          <p>You need to create a restaurant before managing menu items.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setActiveTab('overview')}
          >
            Go to Overview
          </button>
        </div>
      ) : (
        <>
          <div className="section-header">
            <h3>Menu Management</h3>
            <button 
              className="btn btn-primary"
              onClick={() => {
                resetMenuForm();
                setEditingMenuItem(null);
                setShowMenuForm(true);
              }}
            >
              Add Menu Item
            </button>
          </div>

          {menuItems.length === 0 ? (
            <div className="no-menu-items">
              <div className="no-items-icon">🍽️</div>
              <h3>No Menu Items Yet</h3>
              <p>Start building your menu by adding your first item.</p>
            </div>
          ) : (
            <div className="menu-items-grid">
              {menuItems.map(item => (
                <div key={item.id} className="menu-item-card-dashboard">
                  <div className="menu-item-header">
                    <span className="menu-item-emoji">{item.imageUrl}</span>
                    <div className="menu-item-info">
                      <h4>{item.name}</h4>
                      <p className="menu-item-category">{item.category}</p>
                      <p className="menu-item-price">${item.price}</p>
                    </div>
                    <div className="menu-item-badges">
                      {item.vegetarian && <span className="veg-badge">🌱</span>}
                      <span className={`availability-badge ${item.available ? 'available' : 'unavailable'}`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                  <div className="menu-item-actions">
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={() => startEditMenuItem(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteMenuItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  return (
    <div className="dashboard vendor-dashboard">
      {/* Message Notification */}
      {message && (
        <div className={`page-message ${messageType}`}>
          <span>{message}</span>
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}

      <div className="container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Vendor Dashboard</h1>
            <p>Welcome back, {user.firstName}! Manage your campus food business.</p>
          </div>
          <div className="vendor-info">
            <div className="vendor-avatar">🏪</div>
            <div className="vendor-details">
              <h3>{restaurant ? restaurant.name : `${user.firstName}'s Restaurant`}</h3>
              <p>Campus Vendor</p>
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <nav className="dashboard-nav">
              <button 
                className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <span className="nav-icon">📊</span>
                Overview
              </button>
              <button 
                className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                <span className="nav-icon">🍽️</span>
                Menu
              </button>
            </nav>
          </div>

          <div className="dashboard-main">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'menu' && renderMenuManagement()}
          </div>
        </div>
      </div>

      {/* Restaurant Form Modal */}
      {showRestaurantForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{restaurant ? 'Edit Restaurant' : 'Create Restaurant'}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowRestaurantForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleRestaurantSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Restaurant Name</label>
                  <input
                    type="text"
                    value={restaurantForm.name}
                    onChange={(e) => setRestaurantForm({...restaurantForm, name: e.target.value})}
                    required
                    placeholder="Enter restaurant name"
                  />
                </div>
                <div className="form-group">
                  <label>Cuisine Type</label>
                  <input
                    type="text"
                    value={restaurantForm.cuisine}
                    onChange={(e) => setRestaurantForm({...restaurantForm, cuisine: e.target.value})}
                    required
                    placeholder="e.g., Indian, Chinese, Fast Food"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={restaurantForm.description}
                  onChange={(e) => setRestaurantForm({...restaurantForm, description: e.target.value})}
                  placeholder="Describe your restaurant"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={restaurantForm.address}
                  onChange={(e) => setRestaurantForm({...restaurantForm, address: e.target.value})}
                  required
                  placeholder="Restaurant address"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={restaurantForm.phone}
                    onChange={(e) => setRestaurantForm({...restaurantForm, phone: e.target.value})}
                    placeholder="Phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Time</label>
                  <input
                    type="text"
                    value={restaurantForm.deliveryTime}
                    onChange={(e) => setRestaurantForm({...restaurantForm, deliveryTime: e.target.value})}
                    placeholder="e.g., 30-45 mins"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Restaurant Icon (Emoji)</label>
                <input
                  type="text"
                  value={restaurantForm.imageUrl}
                  onChange={(e) => setRestaurantForm({...restaurantForm, imageUrl: e.target.value})}
                  placeholder="🏪"
                  maxLength="10"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowRestaurantForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {restaurant ? 'Update Restaurant' : 'Create Restaurant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Item Form Modal */}
      {showMenuForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingMenuItem ? 'Edit Menu Item' : 'Add Menu Item'}</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowMenuForm(false);
                  setEditingMenuItem(null);
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleMenuSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Item Name</label>
                  <input
                    type="text"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({...menuForm, name: e.target.value})}
                    required
                    placeholder="Enter item name"
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({...menuForm, price: e.target.value})}
                    required
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={menuForm.description}
                  onChange={(e) => setMenuForm({...menuForm, description: e.target.value})}
                  placeholder="Describe the item"
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({...menuForm, category: e.target.value})}
                    placeholder="e.g., Main Course, Beverages"
                  />
                </div>
                <div className="form-group">
                  <label>Item Icon (Emoji)</label>
                  <input
                    type="text"
                    value={menuForm.imageUrl}
                    onChange={(e) => setMenuForm({...menuForm, imageUrl: e.target.value})}
                    placeholder="🍽️"
                    maxLength="10"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={menuForm.available}
                      onChange={(e) => setMenuForm({...menuForm, available: e.target.checked})}
                    />
                    Available
                  </label>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={menuForm.vegetarian}
                      onChange={(e) => setMenuForm({...menuForm, vegetarian: e.target.checked})}
                    />
                    Vegetarian
                  </label>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowMenuForm(false);
                    setEditingMenuItem(null);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMenuItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;