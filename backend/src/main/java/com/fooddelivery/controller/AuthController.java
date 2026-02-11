package com.fooddelivery.controller;

import com.fooddelivery.dto.ApiResponse;
import com.fooddelivery.dto.LoginRequest;
import com.fooddelivery.dto.RegisterRequest;
import com.fooddelivery.dto.UserResponse;
import com.fooddelivery.model.User;
import com.fooddelivery.model.Customer;
import com.fooddelivery.model.Vendor;
import com.fooddelivery.model.Role;
import com.fooddelivery.service.UserService;
import com.fooddelivery.repository.CustomerRepository;
import com.fooddelivery.repository.VendorRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}, maxAge = 3600)
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VendorRepository vendorRepository;


    @PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Register customer through service
            User user = userService.registerCustomer(registerRequest);
            
            // Get customer profile and create response
            Customer customer = customerRepository.findByUserId(user.getId()).orElse(null);
            UserResponse userResponse = new UserResponse(user, customer);
            
            return ResponseEntity.ok(
                ApiResponse.success("Customer registered successfully!", userResponse)
            );
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                ApiResponse.error(e.getMessage())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.error("Registration failed: " + e.getMessage())
            );
        }
    }

    @PostMapping("/register-vendor")
    public ResponseEntity<ApiResponse> registerVendor(@Valid @RequestBody RegisterRequest registerRequest) {
        System.out.println("=== VENDOR REGISTRATION ENDPOINT HIT ===");
        System.out.println("Request data: " + registerRequest.toString());
        
        try {
            // Register vendor through service (automatically sets VENDOR role)
            User user = userService.registerVendor(registerRequest);
            
            System.out.println("Vendor registered successfully with role: " + user.getRole());
            
            // Get vendor profile and create response
            Vendor vendor = vendorRepository.findByUserId(user.getId()).orElse(null);
            UserResponse userResponse = new UserResponse(user, vendor);
            
            System.out.println("Sending response: " + userResponse.toString());
            
            return ResponseEntity.ok(
                ApiResponse.success("Vendor registered successfully!", userResponse)
            );
            
        } catch (RuntimeException e) {
            System.err.println("Runtime error during vendor registration: " + e.getMessage());
            return ResponseEntity.badRequest().body(
                ApiResponse.error(e.getMessage())
            );
        } catch (Exception e) {
            System.err.println("General error during vendor registration: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.error("Vendor registration failed: " + e.getMessage())
            );
        }
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user through service
            User user = userService.loginUser(loginRequest);
            
            // Create response with appropriate profile data
            UserResponse userResponse;
            if (user.getRole() == Role.CUSTOMER) {
                Customer customer = customerRepository.findByUserId(user.getId()).orElse(null);
                userResponse = new UserResponse(user, customer);
            } else if (user.getRole() == Role.VENDOR) {
                Vendor vendor = vendorRepository.findByUserId(user.getId()).orElse(null);
                userResponse = new UserResponse(user, vendor);
            } else {
                userResponse = new UserResponse(user);
            }
            
            return ResponseEntity.ok(
                ApiResponse.success("Login successful!", userResponse)
            );
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                ApiResponse.error(e.getMessage())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.error("Login failed: " + e.getMessage())
            );
        }
    }


    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            List<UserResponse> userResponses = users.stream()
                    .map(UserResponse::new)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(
                ApiResponse.success("Users retrieved successfully!", userResponses)
            );
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.error("Failed to retrieve users: " + e.getMessage())
            );
        }
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        try {
            User user = userService.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
            
            UserResponse userResponse = new UserResponse(user);
            
            return ResponseEntity.ok(
                ApiResponse.success("User found!", userResponse)
            );
            
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(
                ApiResponse.error(e.getMessage())
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.error("Failed to retrieve user: " + e.getMessage())
            );
        }
    }

  
    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse> checkEmail(@RequestParam String email) {
        try {
            boolean exists = userService.emailExists(email);
            
            return ResponseEntity.ok(
                ApiResponse.success("Email check completed!", exists)
            );
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ApiResponse.error("Failed to check email: " + e.getMessage())
            );
        }
    }
}