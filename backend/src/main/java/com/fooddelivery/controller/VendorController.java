package com.fooddelivery.controller;

import com.fooddelivery.dto.ApiResponse;
import com.fooddelivery.dto.MenuItemRequest;
import com.fooddelivery.dto.RestaurantRequest;
import com.fooddelivery.model.MenuItem;
import com.fooddelivery.model.Restaurant;
import com.fooddelivery.service.VendorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendor")
@CrossOrigin(origins = "http://localhost:3000")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    // Restaurant Management
    @PostMapping("/restaurant")
    public ResponseEntity<ApiResponse> createRestaurant(@Valid @RequestBody RestaurantRequest request, @RequestParam Long userId) {
        try {
            Restaurant restaurant = vendorService.createRestaurant(request, userId);
            return ResponseEntity.ok(ApiResponse.success("Restaurant created successfully!", restaurant));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/restaurant/{userId}")
    public ResponseEntity<ApiResponse> getVendorRestaurant(@PathVariable Long userId) {
        try {
            Restaurant restaurant = vendorService.getVendorRestaurant(userId);
            return ResponseEntity.ok(ApiResponse.success("Restaurant retrieved successfully!", restaurant));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/restaurant/{restaurantId}")
    public ResponseEntity<ApiResponse> updateRestaurant(@PathVariable Long restaurantId, @Valid @RequestBody RestaurantRequest request, @RequestParam Long userId) {
        try {
            Restaurant restaurant = vendorService.updateRestaurant(restaurantId, request, userId);
            return ResponseEntity.ok(ApiResponse.success("Restaurant updated successfully!", restaurant));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    // Menu Item Management
    @PostMapping("/restaurant/{restaurantId}/menu")
    public ResponseEntity<ApiResponse> addMenuItem(@PathVariable Long restaurantId, @Valid @RequestBody MenuItemRequest request, @RequestParam Long userId) {
        try {
            MenuItem menuItem = vendorService.addMenuItem(restaurantId, request, userId);
            return ResponseEntity.ok(ApiResponse.success("Menu item added successfully!", menuItem));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/restaurant/{restaurantId}/menu")
    public ResponseEntity<ApiResponse> getMenuItems(@PathVariable Long restaurantId, @RequestParam Long userId) {
        try {
            List<MenuItem> menuItems = vendorService.getMenuItems(restaurantId, userId);
            return ResponseEntity.ok(ApiResponse.success("Menu items retrieved successfully!", menuItems));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/menu/{menuItemId}")
    public ResponseEntity<ApiResponse> updateMenuItem(@PathVariable Long menuItemId, @Valid @RequestBody MenuItemRequest request, @RequestParam Long userId) {
        try {
            MenuItem menuItem = vendorService.updateMenuItem(menuItemId, request, userId);
            return ResponseEntity.ok(ApiResponse.success("Menu item updated successfully!", menuItem));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/menu/{menuItemId}")
    public ResponseEntity<ApiResponse> deleteMenuItem(@PathVariable Long menuItemId, @RequestParam Long userId) {
        try {
            vendorService.deleteMenuItem(menuItemId, userId);
            return ResponseEntity.ok(ApiResponse.success("Menu item deleted successfully!", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/restaurant/{restaurantId}/toggle")
    public ResponseEntity<ApiResponse> toggleRestaurantStatus(@PathVariable Long restaurantId, @RequestParam Long userId) {
        try {
            Restaurant restaurant = vendorService.toggleRestaurantStatus(restaurantId, userId);
            return ResponseEntity.ok(ApiResponse.success("Restaurant status updated successfully!", restaurant));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}