package com.fooddelivery.service;

import com.fooddelivery.dto.MenuItemRequest;
import com.fooddelivery.dto.RestaurantRequest;
import com.fooddelivery.model.MenuItem;
import com.fooddelivery.model.Restaurant;
import com.fooddelivery.model.User;
import com.fooddelivery.model.Vendor;
import com.fooddelivery.model.Role;
import com.fooddelivery.repository.MenuItemRepository;
import com.fooddelivery.repository.RestaurantRepository;
import com.fooddelivery.repository.UserRepository;
import com.fooddelivery.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VendorRepository vendorRepository;

    // Restaurant Management
    public Restaurant createRestaurant(RestaurantRequest request, Long userId) {
        // Verify user exists and is a vendor
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!user.getRole().equals(Role.VENDOR)) {
            throw new RuntimeException("User is not authorized to create restaurants");
        }

        // Get vendor profile
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));

        // Check if vendor already has a restaurant
        Optional<Restaurant> existingRestaurant = restaurantRepository.findByVendorId(vendor.getId());
        if (existingRestaurant.isPresent()) {
            throw new RuntimeException("Vendor already has a restaurant. Please update the existing one.");
        }

        Restaurant restaurant = new Restaurant();
        restaurant.setName(request.getName());
        restaurant.setCuisine(request.getCuisine());
        restaurant.setDescription(request.getDescription());
        restaurant.setAddress(request.getAddress());
        restaurant.setPhone(request.getPhone());
        restaurant.setDeliveryTime(request.getDeliveryTime() != null ? request.getDeliveryTime() : "30-45 mins");
        restaurant.setImageUrl(request.getImageUrl() != null ? request.getImageUrl() : "🏪");
        restaurant.setVendor(vendor);

        return restaurantRepository.save(restaurant);
    }

    public Restaurant getVendorRestaurant(Long userId) {
        // Verify user exists and is a vendor
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals(Role.VENDOR)) {
            throw new RuntimeException("User is not authorized to access vendor resources");
        }

        // Get vendor profile
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));

        return restaurantRepository.findByVendorId(vendor.getId())
                .orElse(null); // Return null if no restaurant exists yet
    }

    public Restaurant updateRestaurant(Long restaurantId, RestaurantRequest request, Long userId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Verify user exists and is a vendor
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals(Role.VENDOR)) {
            throw new RuntimeException("User is not authorized to update restaurants");
        }

        // Get vendor profile
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));

        // Verify ownership
        if (!restaurant.getVendor().getId().equals(vendor.getId())) {
            throw new RuntimeException("Not authorized to update this restaurant");
        }

        restaurant.setName(request.getName());
        restaurant.setCuisine(request.getCuisine());
        restaurant.setDescription(request.getDescription());
        restaurant.setAddress(request.getAddress());
        restaurant.setPhone(request.getPhone());
        restaurant.setDeliveryTime(request.getDeliveryTime());
        restaurant.setImageUrl(request.getImageUrl());

        return restaurantRepository.save(restaurant);
    }

    // Menu Item Management
    public MenuItem addMenuItem(Long restaurantId, MenuItemRequest request, Long userId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Verify user exists and is a vendor
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals(Role.VENDOR)) {
            throw new RuntimeException("User is not authorized to add menu items");
        }

        // Get vendor profile
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));

        // Verify ownership
        if (!restaurant.getVendor().getId().equals(vendor.getId())) {
            throw new RuntimeException("Not authorized to add menu items to this restaurant");
        }

        MenuItem menuItem = new MenuItem();
        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(request.getCategory());
        menuItem.setImageUrl(request.getImageUrl());
        menuItem.setAvailable(request.getAvailable());
        menuItem.setVegetarian(request.getVegetarian());
        menuItem.setRestaurant(restaurant);

        return menuItemRepository.save(menuItem);
    }

    public List<MenuItem> getMenuItems(Long restaurantId, Long userId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Verify user exists and is a vendor
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals(Role.VENDOR)) {
            throw new RuntimeException("User is not authorized to view menu items");
        }

        // Get vendor profile
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));

        // Verify ownership
        if (!restaurant.getVendor().getId().equals(vendor.getId())) {
            throw new RuntimeException("Not authorized to view menu items for this restaurant");
        }

        return menuItemRepository.findByRestaurantId(restaurantId);
    }

    public MenuItem updateMenuItem(Long menuItemId, MenuItemRequest request, Long userId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        // Verify user exists and is a vendor
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals(Role.VENDOR)) {
            throw new RuntimeException("User is not authorized to update menu items");
        }

        // Get vendor profile
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));

        // Verify ownership through restaurant
        if (!menuItem.getRestaurant().getVendor().getId().equals(vendor.getId())) {
            throw new RuntimeException("Not authorized to update this menu item");
        }

        menuItem.setName(request.getName());
        menuItem.setDescription(request.getDescription());
        menuItem.setPrice(request.getPrice());
        menuItem.setCategory(request.getCategory());
        menuItem.setImageUrl(request.getImageUrl());
        menuItem.setAvailable(request.getAvailable());
        menuItem.setVegetarian(request.getVegetarian());

        return menuItemRepository.save(menuItem);
    }

    public void deleteMenuItem(Long menuItemId, Long userId) {
        MenuItem menuItem = menuItemRepository.findById(menuItemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        // Verify user exists and is a vendor
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals(Role.VENDOR)) {
            throw new RuntimeException("User is not authorized to delete menu items");
        }

        // Get vendor profile
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));

        // Verify ownership through restaurant
        if (!menuItem.getRestaurant().getVendor().getId().equals(vendor.getId())) {
            throw new RuntimeException("Not authorized to delete this menu item");
        }

        menuItemRepository.delete(menuItem);
    }

    public Restaurant toggleRestaurantStatus(Long restaurantId, Long userId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));

        // Verify user exists and is a vendor
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getRole().equals(Role.VENDOR)) {
            throw new RuntimeException("User is not authorized to update restaurant status");
        }

        // Get vendor profile
        Vendor vendor = vendorRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Vendor profile not found"));

        // Verify ownership
        if (!restaurant.getVendor().getId().equals(vendor.getId())) {
            throw new RuntimeException("Not authorized to update this restaurant");
        }

        restaurant.setActive(!restaurant.getActive());
        return restaurantRepository.save(restaurant);
    }
}