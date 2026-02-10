package com.fooddelivery.dto;

import com.fooddelivery.model.CartItem;
import com.fooddelivery.model.MenuItem;
import com.fooddelivery.model.Restaurant;

public class CartItemResponse {
    private Long id;
    private MenuItemInfo menuItem;
    private RestaurantInfo restaurant;
    private Integer quantity;

    public CartItemResponse(CartItem cartItem) {
        this.id = cartItem.getId();
        this.menuItem = new MenuItemInfo(cartItem.getMenuItem());
        this.restaurant = new RestaurantInfo(cartItem.getRestaurant());
        this.quantity = cartItem.getQuantity();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public MenuItemInfo getMenuItem() { return menuItem; }
    public void setMenuItem(MenuItemInfo menuItem) { this.menuItem = menuItem; }

    public RestaurantInfo getRestaurant() { return restaurant; }
    public void setRestaurant(RestaurantInfo restaurant) { this.restaurant = restaurant; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    // Inner classes for nested data
    public static class MenuItemInfo {
        private Long id;
        private String name;
        private String description;
        private Double price;
        private String category;
        private String imageUrl;
        private Boolean vegetarian;

        public MenuItemInfo(MenuItem menuItem) {
            this.id = menuItem.getId();
            this.name = menuItem.getName();
            this.description = menuItem.getDescription();
            this.price = menuItem.getPrice();
            this.category = menuItem.getCategory();
            this.imageUrl = menuItem.getImageUrl();
            this.vegetarian = menuItem.getVegetarian();
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public Double getPrice() { return price; }
        public void setPrice(Double price) { this.price = price; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

        public Boolean getVegetarian() { return vegetarian; }
        public void setVegetarian(Boolean vegetarian) { this.vegetarian = vegetarian; }
    }

    public static class RestaurantInfo {
        private Long id;
        private String name;
        private String cuisine;
        private String imageUrl;

        public RestaurantInfo(Restaurant restaurant) {
            this.id = restaurant.getId();
            this.name = restaurant.getName();
            this.cuisine = restaurant.getCuisine();
            this.imageUrl = restaurant.getImageUrl();
        }

        // Getters and Setters
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getCuisine() { return cuisine; }
        public void setCuisine(String cuisine) { this.cuisine = cuisine; }

        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }
}
