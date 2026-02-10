import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from '../services/api';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    fetchOrders(parsedUser.id);
  }, [navigate]);

  const fetchOrders = async (userId) => {
    try {
      const response = await orderAPI.getUserOrders(userId);
      setOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#FFA500',
      CONFIRMED: '#4CAF50',
      PREPARING: '#2196F3',
      OUT_FOR_DELIVERY: '#9C27B0',
      DELIVERED: '#4CAF50',
      CANCELLED: '#F44336'
    };
    return colors[status] || '#666';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
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
                    <h3>{order.restaurant.name}</h3>
                    <p className="order-date">{formatDate(order.orderTime)}</p>
                  </div>
                  <div 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status.replace('_', ' ')}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.orderItems.map(item => (
                    <div key={item.id} className="order-item">
                      <span>{item.quantity}x {item.menuItem.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="delivery-address">
                    <strong>Delivery to:</strong> {order.deliveryAddress}
                  </div>
                  <div className="order-total">
                    <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
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
