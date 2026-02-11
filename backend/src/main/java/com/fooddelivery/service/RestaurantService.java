package com.fooddelivery.service;

import com.fooddelivery.model.Restaurant;
import com.fooddelivery.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RestaurantService {
    
    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        // Only return active restaurants to customers
        return restaurantRepository.findByActiveTrue();
    }

    public Optional<Restaurant> getRestaurantById(Long id) {
        Optional<Restaurant> restaurant = restaurantRepository.findById(id);
        // Only return if restaurant is active
        if (restaurant.isPresent() && restaurant.get().getActive()) {
            return restaurant;
        }
        return Optional.empty();
    }

    public List<Restaurant> getFeaturedRestaurants() {
        // Only return active featured restaurants
        return restaurantRepository.findByFeaturedTrue().stream()
                .filter(Restaurant::getActive)
                .collect(Collectors.toList());
    }

    public List<Restaurant> searchRestaurants(String query) {
        // Search in both name and cuisine, but only return active restaurants
        List<Restaurant> byName = restaurantRepository.findByNameContainingIgnoreCase(query);
        List<Restaurant> byCuisine = restaurantRepository.findByCuisineContainingIgnoreCase(query);
        
        // Combine results and filter for active restaurants
        byName.addAll(byCuisine);
        return byName.stream()
                .filter(Restaurant::getActive)
                .distinct()
                .collect(Collectors.toList());
    }

    public Restaurant saveRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }
}
