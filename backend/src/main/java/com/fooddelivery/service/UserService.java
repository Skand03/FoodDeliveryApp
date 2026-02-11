package com.fooddelivery.service;

import com.fooddelivery.dto.LoginRequest;
import com.fooddelivery.dto.RegisterRequest;
import com.fooddelivery.model.User;
import com.fooddelivery.model.Customer;
import com.fooddelivery.model.Vendor;
import com.fooddelivery.model.Role;
import com.fooddelivery.repository.UserRepository;
import com.fooddelivery.repository.CustomerRepository;
import com.fooddelivery.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VendorRepository vendorRepository;

    /**
     * Register a new customer
     */
    @Transactional
    public User registerCustomer(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        // Create new user
        User user = new User(
            registerRequest.getFirstName(),
            registerRequest.getLastName(),
            registerRequest.getEmail(),
            registerRequest.getPassword(),
            Role.CUSTOMER
        );
        
        // Save user to database
        user = userRepository.save(user);
        
        // Create customer profile
        Customer customer = new Customer(user, registerRequest.getPhone(), registerRequest.getAddress());
        customerRepository.save(customer);
        
        return user;
    }

    /**
     * Register a new vendor
     */
    @Transactional
    public User registerVendor(RegisterRequest registerRequest) {
        // Check if user already exists
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already registered!");
        }

        // Check if business license already exists
        if (vendorRepository.existsByBusinessLicense(registerRequest.getBusinessLicense())) {
            throw new RuntimeException("Business license is already registered!");
        }

        // Create new user
        User user = new User(
            registerRequest.getFirstName(),
            registerRequest.getLastName(),
            registerRequest.getEmail(),
            registerRequest.getPassword(),
            Role.VENDOR
        );
        
        // Save user to database
        user = userRepository.save(user);
        
        // Create vendor profile
        Vendor vendor = new Vendor(user, registerRequest.getPhone(), registerRequest.getAddress(), 
                                  registerRequest.getBusinessName(), registerRequest.getBusinessLicense());
        vendorRepository.save(vendor);
        
        return user;
    }

    /**
     * Login user
     */
    public User loginUser(LoginRequest loginRequest) {
        // Find user by email
        User user = userRepository.findByEmail(loginRequest.getEmail());
        
        if (user == null) {
            throw new RuntimeException("User not found with email: " + loginRequest.getEmail());
        }
        
        // Check password (in real app, you'd compare hashed passwords)
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid password!");
        }
        
        return user;
    }

    /**
     * Find user by email
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Find user by ID
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Get all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Update user
     */
    public User updateUser(Long id, User updatedUser) {
        Optional<User> userOptional = userRepository.findById(id);
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found with id: " + id);
        }
        
        User user = userOptional.get();
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        
        return userRepository.save(user);
    }

    /**
     * Delete user
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    /**
     * Check if email exists
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}