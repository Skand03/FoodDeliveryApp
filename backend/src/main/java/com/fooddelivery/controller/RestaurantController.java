package com.fooddelivery.controller;

import com.fooddelivery.dto.ApiResponse;
import com.fooddelivery.model.Restaurant;
import com.fooddelivery.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllRestaurants() {
        try {
            List<Restaurant> restaurants = restaurantService.getAllRestaurants();
            return ResponseEntity.ok(ApiResponse.success("Restaurants retrieved successfully", restaurants));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getRestaurantById(@PathVariable Long id) {
        try {
            Restaurant restaurant = restaurantService.getRestaurantById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
            return ResponseEntity.ok(ApiResponse.success("Restaurant found", restaurant));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse> getFeaturedRestaurants() {
        try {
            List<Restaurant> restaurants = restaurantService.getFeaturedRestaurants();
            return ResponseEntity.ok(ApiResponse.success("Featured restaurants retrieved", restaurants));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchRestaurants(@RequestParam String query) {
        try {
            List<Restaurant> restaurants = restaurantService.searchRestaurants(query);
            return ResponseEntity.ok(ApiResponse.success("Search results", restaurants));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
