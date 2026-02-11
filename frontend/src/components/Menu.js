import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantAPI, menuAPI, cartAPI } from '../services/api';
import { getUserSession } from '../utils/auth';

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    const userData = getUserSession();
    if (userData) {
      setUser(userData);
    }
    fetchRestaurantAndMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  const fetchRestaurantAndMenu = async () => {
    try {
      console.log('Fetching restaurant and menu for ID:', restaurantId);
      
      // Try to fetch from API first
      const [restaurantRes, menuRes] = await Promise.all([
        restaurantAPI.getById(restaurantId),
        menuAPI.getByRestaurant(restaurantId)
      ]);
      
      if (restaurantRes.data && restaurantRes.data.success && restaurantRes.data.data) {
        setRestaurant(restaurantRes.data.data);
      } else {
        console.log('Restaurant API failed, using mock data');
        loadMockRestaurant();
      }
      
      if (menuRes.data && menuRes.data.success && menuRes.data.data) {
        setMenuItems(menuRes.data.data);
      } else {
        console.log('Menu API failed, using mock data');
        loadMockMenu();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      console.log('APIs failed, loading mock data');
      loadMockRestaurant();
      loadMockMenu();
    } finally {
      setLoading(false);
    }
  };

  const loadMockRestaurant = () => {
    const mockRestaurants = {
      1: {
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
      2: {
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
      3: {
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
      4: {
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
      5: {
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
      6: {
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
      7: {
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
      8: {
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
    };
    
    const restaurant = mockRestaurants[restaurantId] || mockRestaurants[1];
    setRestaurant(restaurant);
    console.log('Mock restaurant loaded:', restaurant.name);
  };

  const loadMockMenu = () => {
    const mockMenus = {
      1: [ // Campus Canteen
        { id: 1, name: 'Chicken Burger', description: 'Juicy grilled chicken burger with fresh vegetables', price: 8.99, category: 'Main Course', vegetarian: false, available: true },
        { id: 2, name: 'Veggie Wrap', description: 'Fresh vegetables wrapped in soft tortilla', price: 6.99, category: 'Main Course', vegetarian: true, available: true },
        { id: 3, name: 'French Fries', description: 'Crispy golden french fries', price: 3.99, category: 'Sides', vegetarian: true, available: true },
        { id: 4, name: 'Chocolate Shake', description: 'Rich chocolate milkshake', price: 4.99, category: 'Beverages', vegetarian: true, available: true },
        { id: 5, name: 'Caesar Salad', description: 'Fresh romaine lettuce with caesar dressing', price: 7.99, category: 'Salads', vegetarian: true, available: true }
      ],
      2: [ // Pizza Corner
        { id: 6, name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella and basil', price: 12.99, category: 'Pizza', vegetarian: true, available: true },
        { id: 7, name: 'Pepperoni Pizza', description: 'Pepperoni with mozzarella cheese', price: 14.99, category: 'Pizza', vegetarian: false, available: true },
        { id: 8, name: 'Chicken Alfredo Pasta', description: 'Creamy alfredo pasta with grilled chicken', price: 13.99, category: 'Pasta', vegetarian: false, available: true },
        { id: 9, name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 4.99, category: 'Sides', vegetarian: true, available: true },
        { id: 10, name: 'Italian Soda', description: 'Refreshing Italian soda', price: 2.99, category: 'Beverages', vegetarian: true, available: true }
      ],
      3: [ // Healthy Bites
        { id: 11, name: 'Green Smoothie', description: 'Spinach, banana, apple and protein powder', price: 6.99, category: 'Smoothies', vegetarian: true, available: true },
        { id: 12, name: 'Quinoa Bowl', description: 'Quinoa with roasted vegetables and tahini dressing', price: 9.99, category: 'Bowls', vegetarian: true, available: true },
        { id: 13, name: 'Grilled Chicken Salad', description: 'Mixed greens with grilled chicken and vinaigrette', price: 11.99, category: 'Salads', vegetarian: false, available: true },
        { id: 14, name: 'Acai Bowl', description: 'Acai berries with granola and fresh fruits', price: 8.99, category: 'Bowls', vegetarian: true, available: true },
        { id: 15, name: 'Fresh Juice', description: 'Freshly squeezed orange juice', price: 3.99, category: 'Beverages', vegetarian: true, available: true }
      ],
      4: [ // Burger Junction
        { id: 16, name: 'Classic Beef Burger', description: 'Beef patty with lettuce, tomato, and special sauce', price: 9.99, category: 'Burgers', vegetarian: false, available: true },
        { id: 17, name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables', price: 8.99, category: 'Burgers', vegetarian: true, available: true },
        { id: 18, name: 'Chicken Wings', description: 'Spicy buffalo chicken wings', price: 7.99, category: 'Appetizers', vegetarian: false, available: true },
        { id: 19, name: 'Onion Rings', description: 'Crispy battered onion rings', price: 4.99, category: 'Sides', vegetarian: true, available: true },
        { id: 20, name: 'Milkshake', description: 'Vanilla milkshake', price: 4.99, category: 'Beverages', vegetarian: true, available: true }
      ],
      5: [ // Noodle House
        { id: 21, name: 'Pad Thai', description: 'Traditional Thai stir-fried noodles', price: 10.99, category: 'Noodles', vegetarian: false, available: true },
        { id: 22, name: 'Vegetable Ramen', description: 'Rich broth with vegetables and noodles', price: 9.99, category: 'Noodles', vegetarian: true, available: true },
        { id: 23, name: 'Chicken Fried Rice', description: 'Wok-fried rice with chicken and vegetables', price: 8.99, category: 'Rice', vegetarian: false, available: true },
        { id: 24, name: 'Spring Rolls', description: 'Fresh spring rolls with peanut sauce', price: 5.99, category: 'Appetizers', vegetarian: true, available: true },
        { id: 25, name: 'Thai Iced Tea', description: 'Sweet and creamy Thai tea', price: 3.99, category: 'Beverages', vegetarian: true, available: true }
      ],
      6: [ // Coffee Central
        { id: 26, name: 'Espresso', description: 'Rich and bold espresso shot', price: 2.99, category: 'Coffee', vegetarian: true, available: true },
        { id: 27, name: 'Cappuccino', description: 'Espresso with steamed milk and foam', price: 4.99, category: 'Coffee', vegetarian: true, available: true },
        { id: 28, name: 'Latte', description: 'Smooth espresso with steamed milk', price: 4.99, category: 'Coffee', vegetarian: true, available: true },
        { id: 29, name: 'Blueberry Muffin', description: 'Fresh baked muffin with blueberries', price: 3.99, category: 'Pastries', vegetarian: true, available: true },
        { id: 30, name: 'Croissant', description: 'Buttery flaky croissant', price: 2.99, category: 'Pastries', vegetarian: true, available: true }
      ],
      7: [ // Taco Fiesta
        { id: 31, name: 'Beef Tacos', description: 'Seasoned beef with fresh toppings', price: 7.99, category: 'Tacos', vegetarian: false, available: true },
        { id: 32, name: 'Chicken Quesadilla', description: 'Grilled chicken with cheese in tortilla', price: 8.99, category: 'Quesadillas', vegetarian: false, available: true },
        { id: 33, name: 'Veggie Burrito', description: 'Black beans, rice, and vegetables', price: 7.99, category: 'Burritos', vegetarian: true, available: true },
        { id: 34, name: 'Guacamole & Chips', description: 'Fresh guacamole with tortilla chips', price: 5.99, category: 'Appetizers', vegetarian: true, available: true },
        { id: 35, name: 'Horchata', description: 'Traditional Mexican rice drink', price: 3.99, category: 'Beverages', vegetarian: true, available: true }
      ],
      8: [ // Sweet Treats
        { id: 36, name: 'Chocolate Cake', description: 'Rich chocolate layer cake', price: 5.99, category: 'Cakes', vegetarian: true, available: true },
        { id: 37, name: 'Cheesecake', description: 'Creamy New York style cheesecake', price: 6.99, category: 'Cakes', vegetarian: true, available: true },
        { id: 38, name: 'Chocolate Chip Cookies', description: 'Fresh baked cookies', price: 2.99, category: 'Cookies', vegetarian: true, available: true },
        { id: 39, name: 'Ice Cream Sundae', description: 'Vanilla ice cream with toppings', price: 4.99, category: 'Ice Cream', vegetarian: true, available: true },
        { id: 40, name: 'Hot Chocolate', description: 'Rich hot chocolate with whipped cream', price: 3.99, category: 'Beverages', vegetarian: true, available: true }
      ]
    };
    
    const menu = mockMenus[restaurantId] || mockMenus[1];
    setMenuItems(menu);
    console.log('Mock menu loaded:', menu.length, 'items');
  };

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleAddToCart = async (menuItem) => {
    if (!user) {
      showMessage('Please login to add items to cart', 'error');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      console.log('Adding to cart:', {
        userId: user.id,
        menuItemId: menuItem.id,
        restaurantId: parseInt(restaurantId),
        quantity: 1
      });

      await cartAPI.addToCart({
        userId: user.id,
        menuItemId: menuItem.id,
        restaurantId: parseInt(restaurantId),
        quantity: 1
      });
      setCartCount(cartCount + 1);
      showMessage('Item added to cart!', 'success');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showMessage('Failed to add item to cart. Please try again.', 'error');
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
    return (
      <div className="loading-page">
        <div className="container">
          <div className="loading-content">
            <div className="spinner"></div>
            <p>Loading delicious menu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="error-page">
        <div className="container">
          <div className="error-content">
            <h1>Restaurant Not Found</h1>
            <p>Sorry, we couldn't find the restaurant you're looking for.</p>
            <button className="btn btn-primary" onClick={() => navigate('/restaurants')}>
              Back to Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  const groupedMenu = groupByCategory(menuItems);

  return (
    <div className="menu-page">
      {/* Message Notification */}
      {message && (
        <div className={`page-message ${messageType}`}>
          <span>{message}</span>
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}
      
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
