const Restaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "25-35 min",
      image: "🍕",
      featured: true
    },
    {
      id: 2,
      name: "Burger Barn",
      cuisine: "American",
      rating: 4.3,
      deliveryTime: "20-30 min",
      image: "🍔",
      featured: false
    },
    {
      id: 3,
      name: "Sushi Spot",
      cuisine: "Japanese",
      rating: 4.7,
      deliveryTime: "30-40 min",
      image: "🍣",
      featured: true
    },
    {
      id: 4,
      name: "Taco Town",
      cuisine: "Mexican",
      rating: 4.2,
      deliveryTime: "15-25 min",
      image: "🌮",
      featured: false
    },
    {
      id: 5,
      name: "Curry Corner",
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "25-35 min",
      image: "🍛",
      featured: true
    },
    {
      id: 6,
      name: "Salad Station",
      cuisine: "Healthy",
      rating: 4.4,
      deliveryTime: "15-20 min",
      image: "🥗",
      featured: false
    }
  ];

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
            />
            <button className="search-btn">🔍</button>
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
              <div key={restaurant.id} className="restaurant-card featured">
                <div className="restaurant-image">
                  <span className="restaurant-emoji">{restaurant.image}</span>
                  <div className="featured-badge">Featured</div>
                </div>
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p className="cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-meta">
                    <span className="rating">⭐ {restaurant.rating}</span>
                    <span className="delivery-time">🕒 {restaurant.deliveryTime}</span>
                  </div>
                  <button className="order-btn">Order Now</button>
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
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-image">
                  <span className="restaurant-emoji">{restaurant.image}</span>
                </div>
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p className="cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-meta">
                    <span className="rating">⭐ {restaurant.rating}</span>
                    <span className="delivery-time">🕒 {restaurant.deliveryTime}</span>
                  </div>
                  <button className="order-btn">Order Now</button>
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