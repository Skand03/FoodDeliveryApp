package com.fooddelivery.controller;

import com.fooddelivery.dto.ApiResponse;
import com.fooddelivery.dto.CartItemRequest;
import com.fooddelivery.dto.CartItemResponse;
import com.fooddelivery.model.CartItem;
import com.fooddelivery.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getCartItems(@PathVariable Long userId) {
        try {
            List<CartItem> cartItems = cartService.getCartItems(userId);
            List<CartItemResponse> response = cartItems.stream()
                .map(CartItemResponse::new)
                .collect(Collectors.toList());
            return ResponseEntity.ok(ApiResponse.success("Cart items retrieved", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addToCart(@RequestBody CartItemRequest request) {
        try {
            CartItem cartItem = cartService.addToCart(
                request.getUserId(),
                request.getMenuItemId(),
                request.getRestaurantId(),
                request.getQuantity()
            );
            CartItemResponse response = new CartItemResponse(cartItem);
            return ResponseEntity.ok(ApiResponse.success("Item added to cart", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse> updateCartItem(
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity) {
        try {
            CartItem cartItem = cartService.updateCartItem(cartItemId, quantity);
            if (cartItem == null) {
                return ResponseEntity.ok(ApiResponse.success("Cart item removed", null));
            }
            CartItemResponse response = new CartItemResponse(cartItem);
            return ResponseEntity.ok(ApiResponse.success("Cart updated", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse> removeFromCart(@PathVariable Long cartItemId) {
        try {
            cartService.removeFromCart(cartItemId);
            return ResponseEntity.ok(ApiResponse.success("Item removed from cart", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<ApiResponse> clearCart(@PathVariable Long userId) {
        try {
            cartService.clearCart(userId);
            return ResponseEntity.ok(ApiResponse.success("Cart cleared", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
