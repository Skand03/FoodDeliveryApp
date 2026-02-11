import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI } from '../services/api';
import { getUserSession } from '../utils/auth';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const userData = getUserSession();
    if (!userData) {
      navigate('/login');
      return;
    }
    
    console.log('User data from session:', userData);
    setUser(userData);
    
    // Set delivery address from user data (handle both old and new structure)
    const address = userData.address || userData.deliveryAddress || '';
    setDeliveryAddress(address);
    
    fetchCart(userData.id);
  }, [navigate]);

  const fetchCart = async (userId) => {
    try {
      console.log('Fetching cart for user ID:', userId);
      const response = await cartAPI.getCart(userId);
      console.log('Cart response:', response);
      
      if (response.data && response.data.success) {
        setCartItems(response.data.data || []);
      } else {
        console.log('Cart fetch failed, checking for mock cart data');
        loadMockCartData();
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      
      if (error.response?.status === 404) {
        console.log('Cart not found - checking for mock cart data');
        loadMockCartData();
      } else {
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMockCartData = () => {
    try {
      const mockCartItems = JSON.parse(localStorage.getItem('mockCart') || '[]');
      console.log('Loaded mock cart items:', mockCartItems);
      setCartItems(mockCartItems);
    } catch (error) {
      console.error('Error loading mock cart data:', error);
      setCartItems([]);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }

    try {
      await cartAPI.updateItem(cartItemId, newQuantity);
      fetchCart(user.id);
    } catch (error) {
      console.error('Error updating quantity:', error);
      showMessage('Failed to update quantity', 'error');
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await cartAPI.removeItem(cartItemId);
      fetchCart(user.id);
    } catch (error) {
      console.error('Error removing item:', error);
      showMessage('Failed to remove item', 'error');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.menuItem?.price || item.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showMessage('Your cart is empty', 'error');
      return;
    }

    if (!deliveryAddress.trim()) {
      showMessage('Please enter a delivery address', 'error');
      return;
    }

    try {
      const restaurantId = cartItems[0].restaurant?.id || cartItems[0].menuItem?.restaurantId;
      console.log('Creating order:', {
        userId: user.id,
        restaurantId: restaurantId,
        deliveryAddress: deliveryAddress
      });

      const response = await orderAPI.create({
        userId: user.id,
        restaurantId: restaurantId,
        deliveryAddress: deliveryAddress
      });
      
      console.log('Order response:', response);
      showMessage('Order placed successfully!', 'success');
      
      // Clear cart and redirect
      setCartItems([]);
      localStorage.removeItem('mockCart');
      setTimeout(() => navigate('/customer-dashboard'), 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      showMessage('Failed to place order. Please try again.', 'error');
    }
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  const total = calculateTotal();
  const deliveryFee = 2.99;
  const tax = total * 0.08;
  const grandTotal = total + deliveryFee + tax;

  return (
    <div className="cart-page">
      {/* Message Notification */}
      {message && (
        <div className={`page-message ${messageType}`}>
          <span>{message}</span>
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}
      
      <div className="container">
        <h1>Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to get started!</p>
            <button className="btn btn-primary" onClick={() => navigate('/restaurants')}>
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h3>{item.menuItem?.name || item.name}</h3>
                    <p className="item-restaurant">{item.restaurant?.name || item.restaurantName}</p>
                    <p className="item-price">${(item.menuItem?.price || item.price || 0).toFixed(2)}</p>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >
                      🗑️
                    </button>
                  </div>
                  <div className="item-total">
                    ${((item.menuItem?.price || item.price || 0) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              
              <div className="delivery-address">
                <label>Delivery Address:</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter delivery address"
                  rows="3"
                />
              </div>

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
