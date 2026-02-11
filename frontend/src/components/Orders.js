import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { getUserSession } from '../utils/auth';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUserSession();
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchOrders(userData.id);
  }, [navigate]);

  const fetchOrders = async (userId) => {
    try {
      console.log('Fetching orders for user ID:', userId);
      const response = await orderAPI.getUserOrders(userId);
      
      if (response.data && response.data.success) {
        setOrders(response.data.data || []);
      } else {
        console.log('Orders API failed, loading mock orders');
        loadMockOrders();
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      
      if (error.response?.status === 404) {
        console.log('Orders not found - loading mock orders');
        loadMockOrders();
      } else {
        setOrders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMockOrders = () => {
    try {
      const mockOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
      console.log('Loaded mock orders:', mockOrders);
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error loading mock orders:', error);
      setOrders([]);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#FFA500',
      CONFIRMED: '#4CAF50',
      PREPARING: '#2196F3',
      OUT_FOR_DELIVERY: '#9C27B0',
      DELIVERED: '#4CAF50',
      CANCELLED: '#F44336',
      'Preparing': '#2196F3',
      'Delivered': '#4CAF50',
      'Cancelled': '#F44336'
    };
    return colors[status] || '#666';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const formatMockDate = (date, time) => {
    if (date && time) {
      return `${date} ${time}`;
    }
    return 'N/A';
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📦</div>
            <h2>No orders yet</h2>
            <p>Start ordering from your favorite restaurants!</p>
            <button className="btn btn-primary" onClick={() => navigate('/restaurants')}>
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>{order.restaurant?.name || 'Restaurant'}</h3>
                    <p className="order-date">
                      {order.orderTime ? formatDate(order.orderTime) : formatMockDate(order.date, order.time)}
                    </p>
                  </div>
                  <div 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status.replace('_', ' ')}
                  </div>
                </div>
                
                <div className="order-items">
                  {/* Handle both real orders and mock orders */}
                  {order.orderItems ? (
                    // Real order structure
                    order.orderItems.map(item => (
                      <div key={item.id} className="order-item">
                        <span>{item.quantity}x {item.menuItem.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  ) : (
                    // Mock order structure
                    order.items?.map((item, index) => (
                      <div key={index} className="order-item">
                        <span>{item.quantity}x {item.menuItem?.name || item.name}</span>
                        <span>${((item.menuItem?.price || item.price || 0) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>

                <div className="order-footer">
                  <div className="delivery-address">
                    <strong>Delivery to:</strong> {order.deliveryAddress}
                  </div>
                  <div className="order-total">
                    <strong>Total:</strong> ${(order.totalAmount || order.total || 0).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
