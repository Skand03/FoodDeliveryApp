package com.fooddelivery.config;

import com.fooddelivery.model.MenuItem;
import com.fooddelivery.model.Restaurant;
import com.fooddelivery.repository.MenuItemRepository;
import com.fooddelivery.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Override
    public void run(String... args) throws Exception {
        if (restaurantRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Create Restaurants
        Restaurant pizzaPalace = createRestaurant("Pizza Palace", "Italian", 
            "Authentic Italian pizzas with fresh ingredients", "123 Main St, Downtown", 
            "555-0101", 4.5, "25-35 min", "🍕", true);
        
        Restaurant burgerBarn = createRestaurant("Burger Barn", "American", 
            "Juicy burgers and crispy fries", "456 Oak Ave, Midtown", 
            "555-0102", 4.3, "20-30 min", "🍔", false);
        
        Restaurant sushiSpot = createRestaurant("Sushi Spot", "Japanese", 
            "Fresh sushi and authentic Japanese cuisine", "789 Pine Rd, Uptown", 
            "555-0103", 4.7, "30-40 min", "🍣", true);
        
        Restaurant tacoTown = createRestaurant("Taco Town", "Mexican", 
            "Delicious tacos and burritos", "321 Elm St, Downtown", 
            "555-0104", 4.2, "15-25 min", "🌮", false);
        
        Restaurant curryCorner = createRestaurant("Curry Corner", "Indian", 
            "Spicy and flavorful Indian dishes", "654 Maple Dr, Westside", 
            "555-0105", 4.6, "25-35 min", "🍛", true);
        
        Restaurant saladStation = createRestaurant("Salad Station", "Healthy", 
            "Fresh salads and healthy bowls", "987 Cedar Ln, Eastside", 
            "555-0106", 4.4, "15-20 min", "🥗", false);

        // Add menu items for Pizza Palace
        addMenuItem(pizzaPalace, "Margherita Pizza", "Classic pizza with tomato, mozzarella, and basil", 
            12.99, "Pizza", "🍕", true, true);
        addMenuItem(pizzaPalace, "Pepperoni Pizza", "Loaded with pepperoni and cheese", 
            14.99, "Pizza", "🍕", true, false);
        addMenuItem(pizzaPalace, "Veggie Supreme", "Loaded with fresh vegetables", 
            13.99, "Pizza", "🍕", true, true);
        addMenuItem(pizzaPalace, "BBQ Chicken Pizza", "BBQ sauce, chicken, and red onions", 
            15.99, "Pizza", "🍕", true, false);
        addMenuItem(pizzaPalace, "Garlic Bread", "Toasted bread with garlic butter", 
            5.99, "Sides", "🥖", true, true);
        addMenuItem(pizzaPalace, "Caesar Salad", "Fresh romaine with caesar dressing", 
            7.99, "Salads", "🥗", true, true);

        // Add menu items for Burger Barn
        addMenuItem(burgerBarn, "Classic Burger", "Beef patty with lettuce, tomato, and cheese", 
            10.99, "Burgers", "🍔", true, false);
        addMenuItem(burgerBarn, "Bacon Cheeseburger", "Double patty with bacon and cheese", 
            13.99, "Burgers", "🍔", true, false);
        addMenuItem(burgerBarn, "Veggie Burger", "Plant-based patty with fresh veggies", 
            11.99, "Burgers", "🍔", true, true);
        addMenuItem(burgerBarn, "Chicken Burger", "Crispy chicken with special sauce", 
            12.49, "Burgers", "🍔", true, false);
        addMenuItem(burgerBarn, "French Fries", "Crispy golden fries", 
            4.99, "Sides", "🍟", true, true);
        addMenuItem(burgerBarn, "Onion Rings", "Crispy battered onion rings", 
            5.99, "Sides", "🧅", true, true);
        addMenuItem(burgerBarn, "Chocolate Shake", "Thick and creamy chocolate milkshake", 
            5.49, "Drinks", "🥤", true, true);

        // Add menu items for Sushi Spot
        addMenuItem(sushiSpot, "California Roll", "Crab, avocado, and cucumber", 
            9.99, "Rolls", "🍣", true, false);
        addMenuItem(sushiSpot, "Spicy Tuna Roll", "Fresh tuna with spicy mayo", 
            11.99, "Rolls", "🍣", true, false);
        addMenuItem(sushiSpot, "Vegetable Roll", "Assorted fresh vegetables", 
            8.99, "Rolls", "🍣", true, true);
        addMenuItem(sushiSpot, "Salmon Nigiri", "Fresh salmon over rice (2 pieces)", 
            7.99, "Nigiri", "🍣", true, false);
        addMenuItem(sushiSpot, "Miso Soup", "Traditional Japanese soup", 
            3.99, "Soups", "🍜", true, true);
        addMenuItem(sushiSpot, "Edamame", "Steamed soybeans with sea salt", 
            4.99, "Appetizers", "🫘", true, true);

        // Add menu items for Taco Town
        addMenuItem(tacoTown, "Beef Tacos", "Three tacos with seasoned beef", 
            9.99, "Tacos", "🌮", true, false);
        addMenuItem(tacoTown, "Chicken Tacos", "Three tacos with grilled chicken", 
            9.99, "Tacos", "🌮", true, false);
        addMenuItem(tacoTown, "Fish Tacos", "Three tacos with crispy fish", 
            11.99, "Tacos", "🌮", true, false);
        addMenuItem(tacoTown, "Veggie Burrito", "Large burrito with beans and veggies", 
            10.99, "Burritos", "🌯", true, true);
        addMenuItem(tacoTown, "Chicken Burrito", "Large burrito with chicken and rice", 
            12.99, "Burritos", "🌯", true, false);
        addMenuItem(tacoTown, "Nachos Supreme", "Loaded nachos with cheese and toppings", 
            8.99, "Appetizers", "🧀", true, true);
        addMenuItem(tacoTown, "Guacamole & Chips", "Fresh guacamole with tortilla chips", 
            6.99, "Sides", "🥑", true, true);

        // Add menu items for Curry Corner
        addMenuItem(curryCorner, "Chicken Tikka Masala", "Creamy tomato curry with chicken", 
            14.99, "Curry", "🍛", true, false);
        addMenuItem(curryCorner, "Butter Chicken", "Rich and creamy butter chicken", 
            15.99, "Curry", "🍛", true, false);
        addMenuItem(curryCorner, "Vegetable Curry", "Mixed vegetables in curry sauce", 
            12.99, "Curry", "🍛", true, true);
        addMenuItem(curryCorner, "Lamb Vindaloo", "Spicy lamb curry", 
            16.99, "Curry", "🍛", true, false);
        addMenuItem(curryCorner, "Garlic Naan", "Soft flatbread with garlic", 
            3.99, "Breads", "🫓", true, true);
        addMenuItem(curryCorner, "Samosas", "Crispy pastries with potato filling (3 pieces)", 
            5.99, "Appetizers", "🥟", true, true);
        addMenuItem(curryCorner, "Mango Lassi", "Sweet yogurt drink with mango", 
            4.99, "Drinks", "🥤", true, true);

        // Add menu items for Salad Station
        addMenuItem(saladStation, "Greek Salad", "Fresh salad with feta and olives", 
            10.99, "Salads", "🥗", true, true);
        addMenuItem(saladStation, "Caesar Salad", "Romaine with caesar dressing and croutons", 
            9.99, "Salads", "🥗", true, true);
        addMenuItem(saladStation, "Chicken Caesar", "Caesar salad with grilled chicken", 
            12.99, "Salads", "🥗", true, false);
        addMenuItem(saladStation, "Quinoa Bowl", "Healthy quinoa with vegetables", 
            11.99, "Bowls", "🥗", true, true);
        addMenuItem(saladStation, "Protein Bowl", "Chicken, rice, and vegetables", 
            13.99, "Bowls", "🥗", true, false);
        addMenuItem(saladStation, "Fresh Juice", "Freshly squeezed orange juice", 
            4.99, "Drinks", "🧃", true, true);
        addMenuItem(saladStation, "Smoothie Bowl", "Acai bowl with fresh fruits", 
            9.99, "Bowls", "🥗", true, true);

        System.out.println("Database initialized with sample data!");
    }

    private Restaurant createRestaurant(String name, String cuisine, String description, 
                                       String address, String phone, Double rating, 
                                       String deliveryTime, String imageUrl, Boolean featured) {
        Restaurant restaurant = new Restaurant();
        restaurant.setName(name);
        restaurant.setCuisine(cuisine);
        restaurant.setDescription(description);
        restaurant.setAddress(address);
        restaurant.setPhone(phone);
        restaurant.setRating(rating);
        restaurant.setDeliveryTime(deliveryTime);
        restaurant.setImageUrl(imageUrl);
        restaurant.setFeatured(featured);
        return restaurantRepository.save(restaurant);
    }

    private void addMenuItem(Restaurant restaurant, String name, String description, 
                            Double price, String category, String imageUrl, 
                            Boolean available, Boolean vegetarian) {
        MenuItem menuItem = new MenuItem();
        menuItem.setName(name);
        menuItem.setDescription(description);
        menuItem.setPrice(price);
        menuItem.setCategory(category);
        menuItem.setImageUrl(imageUrl);
        menuItem.setAvailable(available);
        menuItem.setVegetarian(vegetarian);
        menuItem.setRestaurant(restaurant);
        menuItemRepository.save(menuItem);
    }
}
