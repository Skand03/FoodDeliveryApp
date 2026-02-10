import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantAPI, menuAPI, cartAPI } from '../services/api';

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchRestaurantAndMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  const fetchRestaurantAndMenu = async () => {
    try {
      const [restaurantRes, menuRes] = await Promise.all([
        restaurantAPI.getById(restaurantId),
        menuAPI.getByRestaurant(restaurantId)
      ]);
      setRestaurant(restaurantRes.data.data);
      setMenuItems(menuRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (menuItem) => {
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await cartAPI.addToCart({
        userId: user.id,
        menuItemId: menuItem.id,
        restaurantId: parseInt(restaurantId),
        quantity: 1
      });
      setCartCount(cartCount + 1);
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      const category = item.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  if (!restaurant) {
    return <div className="error">Restaurant not found</div>;
  }

  const groupedMenu = groupByCategory(menuItems);

  return (
    <div className="menu-page">
      <div className="restaurant-header">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/restaurants')}>
            ← Back to Restaurants
          </button>
          <div className="restaurant-details">
            <div className="restaurant-icon">{restaurant.imageUrl}</div>
            <div>
              <h1>{restaurant.name}</h1>
              <p className="cuisine">{restaurant.cuisine} • {restaurant.deliveryTime}</p>
              <div className="rating">⭐ {restaurant.rating}</div>
            </div>
          </div>
          {user && (
            <button className="cart-btn" onClick={() => navigate('/cart')}>
              🛒 Cart {cartCount > 0 && `(${cartCount})`}
            </button>
          )}
        </div>
      </div>

      <div className="container">
        <div className="menu-content">
          {Object.keys(groupedMenu).map(category => (
            <section key={category} className="menu-category">
              <h2 className="category-title">{category}</h2>
              <div className="menu-items-grid">
                {groupedMenu[category].map(item => (
                  <div key={item.id} className="menu-item-card">
                    <div className="menu-item-info">
                      <div className="menu-item-header">
                        <h3>{item.name}</h3>
                        {item.vegetarian && <span className="veg-badge">🌱</span>}
                      </div>
                      <p className="menu-item-description">{item.description}</p>
                      <div className="menu-item-footer">
                        <span className="price">${item.price.toFixed(2)}</span>
                        <button 
                          className="add-btn"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.available}
                        >
                          {item.available ? 'Add +' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
