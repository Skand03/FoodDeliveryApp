package com.fooddelivery.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String cuisine;

    private String description;

    private String address;

    private String phone;

    private Double rating = 0.0;

    private String deliveryTime = "30-45 mins";

    private String imageUrl = "🏪";

    private Boolean featured = false;

    private Boolean active = true;

    // Link to the vendor (user who owns this restaurant) - optional for sample data
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = true)
    private Vendor vendor;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<MenuItem> menuItems = new ArrayList<>();

    public Restaurant() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getDeliveryTime() { return deliveryTime; }
    public void setDeliveryTime(String deliveryTime) { this.deliveryTime = deliveryTime; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Vendor getVendor() { return vendor; }
    public void setVendor(Vendor vendor) { this.vendor = vendor; }

    public List<MenuItem> getMenuItems() { return menuItems; }
    public void setMenuItems(List<MenuItem> menuItems) { this.menuItems = menuItems; }
}
