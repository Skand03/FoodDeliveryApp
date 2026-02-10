package com.fooddelivery.controller;

import com.fooddelivery.dto.ApiResponse;
import com.fooddelivery.model.MenuItem;
import com.fooddelivery.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class MenuController {

    @Autowired
    private MenuItemService menuItemService;

    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<ApiResponse> getMenuByRestaurant(@PathVariable Long restaurantId) {
        try {
            List<MenuItem> menuItems = menuItemService.getMenuItemsByRestaurant(restaurantId);
            return ResponseEntity.ok(ApiResponse.success("Menu items retrieved", menuItems));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getMenuItemById(@PathVariable Long id) {
        try {
            MenuItem menuItem = menuItemService.getMenuItemById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
            return ResponseEntity.ok(ApiResponse.success("Menu item found", menuItem));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
