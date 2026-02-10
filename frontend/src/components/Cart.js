import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI } from '../services/api';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setDeliveryAddress(parsedUser.address);
    fetchCart(parsedUser.id);
  }, [navigate]);

  const fetchCart = async (userId) => {
    try {
      const response = await cartAPI.getCart(userId);
      setCartItems(response.data.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      await cartAPI.updateItem(cartItemId, newQuantity);
      fetchCart(user.id);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      await cartAPI.removeItem(cartItemId);
      fetchCart(user.id);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.menuItem.price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    try {
      const restaurantId = cartItems[0].restaurant.id;
      await orderAPI.create({
        userId: user.id,
        restaurantId: restaurantId,
        deliveryAddress: deliveryAddress
      });
      
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
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
                    <h3>{item.menuItem.name}</h3>
                    <p className="item-restaurant">{item.restaurant.name}</p>
                    <p className="item-price">${item.menuItem.price.toFixed(2)}</p>
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
                    ${(item.menuItem.price * item.quantity).toFixed(2)}
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
