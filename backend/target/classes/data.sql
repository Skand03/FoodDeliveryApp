-- Insert Restaurants
INSERT INTO restaurants (name, cuisine, description, address, phone, rating, delivery_time, image_url, featured) VALUES
('Pizza Palace', 'Italian', 'Authentic Italian pizzas with fresh ingredients', '123 Main St, Downtown', '555-0101', 4.5, '25-35 min', '🍕', true),
('Burger Barn', 'American', 'Juicy burgers and crispy fries', '456 Oak Ave, Midtown', '555-0102', 4.3, '20-30 min', '🍔', false),
('Sushi Spot', 'Japanese', 'Fresh sushi and authentic Japanese cuisine', '789 Pine Rd, Uptown', '555-0103', 4.7, '30-40 min', '🍣', true),
('Taco Town', 'Mexican', 'Delicious tacos and burritos', '321 Elm St, Downtown', '555-0104', 4.2, '15-25 min', '🌮', false),
('Curry Corner', 'Indian', 'Spicy and flavorful Indian dishes', '654 Maple Dr, Westside', '555-0105', 4.6, '25-35 min', '🍛', true),
('Salad Station', 'Healthy', 'Fresh salads and healthy bowls', '987 Cedar Ln, Eastside', '555-0106', 4.4, '15-20 min', '🥗', false);

-- Insert Menu Items for Pizza Palace (Restaurant ID: 1)
INSERT INTO menu_items (name, description, price, category, image_url, available, vegetarian, restaurant_id) VALUES
('Margherita Pizza', 'Classic pizza with tomato, mozzarella, and basil', 12.99, 'Pizza', '🍕', true, true, 1),
('Pepperoni Pizza', 'Loaded with pepperoni and cheese', 14.99, 'Pizza', '🍕', true, false, 1),
('Veggie Supreme', 'Loaded with fresh vegetables', 13.99, 'Pizza', '🍕', true, true, 1),
('BBQ Chicken Pizza', 'BBQ sauce, chicken, and red onions', 15.99, 'Pizza', '🍕', true, false, 1),
('Garlic Bread', 'Toasted bread with garlic butter', 5.99, 'Sides', '🥖', true, true, 1),
('Caesar Salad', 'Fresh romaine with caesar dressing', 7.99, 'Salads', '🥗', true, true, 1);

-- Insert Menu Items for Burger Barn (Restaurant ID: 2)
INSERT INTO menu_items (name, description, price, category, image_url, available, vegetarian, restaurant_id) VALUES
('Classic Burger', 'Beef patty with lettuce, tomato, and cheese', 10.99, 'Burgers', '🍔', true, false, 2),
('Bacon Cheeseburger', 'Double patty with bacon and cheese', 13.99, 'Burgers', '🍔', true, false, 2),
('Veggie Burger', 'Plant-based patty with fresh veggies', 11.99, 'Burgers', '🍔', true, true, 2),
('Chicken Burger', 'Crispy chicken with special sauce', 12.49, 'Burgers', '🍔', true, false, 2),
('French Fries', 'Crispy golden fries', 4.99, 'Sides', '🍟', true, true, 2),
('Onion Rings', 'Crispy battered onion rings', 5.99, 'Sides', '🧅', true, true, 2),
('Chocolate Shake', 'Thick and creamy chocolate milkshake', 5.49, 'Drinks', '🥤', true, true, 2);

-- Insert Menu Items for Sushi Spot (Restaurant ID: 3)
INSERT INTO menu_items (name, description, price, category, image_url, available, vegetarian, restaurant_id) VALUES
('California Roll', 'Crab, avocado, and cucumber', 9.99, 'Rolls', '🍣', true, false, 3),
('Spicy Tuna Roll', 'Fresh tuna with spicy mayo', 11.99, 'Rolls', '🍣', true, false, 3),
('Vegetable Roll', 'Assorted fresh vegetables', 8.99, 'Rolls', '🍣', true, true, 3),
('Salmon Nigiri', 'Fresh salmon over rice (2 pieces)', 7.99, 'Nigiri', '🍣', true, false, 3),
('Miso Soup', 'Traditional Japanese soup', 3.99, 'Soups', '🍜', true, true, 3),
('Edamame', 'Steamed soybeans with sea salt', 4.99, 'Appetizers', '🫘', true, true, 3);

-- Insert Menu Items for Taco Town (Restaurant ID: 4)
INSERT INTO menu_items (name, description, price, category, image_url, available, vegetarian, restaurant_id) VALUES
('Beef Tacos', 'Three tacos with seasoned beef', 9.99, 'Tacos', '🌮', true, false, 4),
('Chicken Tacos', 'Three tacos with grilled chicken', 9.99, 'Tacos', '🌮', true, false, 4),
('Fish Tacos', 'Three tacos with crispy fish', 11.99, 'Tacos', '🌮', true, false, 4),
('Veggie Burrito', 'Large burrito with beans and veggies', 10.99, 'Burritos', '🌯', true, true, 4),
('Chicken Burrito', 'Large burrito with chicken and rice', 12.99, 'Burritos', '🌯', true, false, 4),
('Nachos Supreme', 'Loaded nachos with cheese and toppings', 8.99, 'Appetizers', '🧀', true, true, 4),
('Guacamole & Chips', 'Fresh guacamole with tortilla chips', 6.99, 'Sides', '🥑', true, true, 4);

-- Insert Menu Items for Curry Corner (Restaurant ID: 5)
INSERT INTO menu_items (name, description, price, category, image_url, available, vegetarian, restaurant_id) VALUES
('Chicken Tikka Masala', 'Creamy tomato curry with chicken', 14.99, 'Curry', '🍛', true, false, 5),
('Butter Chicken', 'Rich and creamy butter chicken', 15.99, 'Curry', '🍛', true, false, 5),
('Vegetable Curry', 'Mixed vegetables in curry sauce', 12.99, 'Curry', '🍛', true, true, 5),
('Lamb Vindaloo', 'Spicy lamb curry', 16.99, 'Curry', '🍛', true, false, 5),
('Garlic Naan', 'Soft flatbread with garlic', 3.99, 'Breads', '🫓', true, true, 5),
('Samosas', 'Crispy pastries with potato filling (3 pieces)', 5.99, 'Appetizers', '🥟', true, true, 5),
('Mango Lassi', 'Sweet yogurt drink with mango', 4.99, 'Drinks', '🥤', true, true, 5);

-- Insert Menu Items for Salad Station (Restaurant ID: 6)
INSERT INTO menu_items (name, description, price, category, image_url, available, vegetarian, restaurant_id) VALUES
('Greek Salad', 'Fresh salad with feta and olives', 10.99, 'Salads', '🥗', true, true, 6),
('Caesar Salad', 'Romaine with caesar dressing and croutons', 9.99, 'Salads', '🥗', true, true, 6),
('Chicken Caesar', 'Caesar salad with grilled chicken', 12.99, 'Salads', '🥗', true, false, 6),
('Quinoa Bowl', 'Healthy quinoa with vegetables', 11.99, 'Bowls', '🥗', true, true, 6),
('Protein Bowl', 'Chicken, rice, and vegetables', 13.99, 'Bowls', '🥗', true, false, 6),
('Fresh Juice', 'Freshly squeezed orange juice', 4.99, 'Drinks', '🧃', true, true, 6),
('Smoothie Bowl', 'Acai bowl with fresh fruits', 9.99, 'Bowls', '🥗', true, true, 6);
