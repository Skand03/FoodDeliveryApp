package com.fooddelivery.repository;

import com.fooddelivery.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByFeaturedTrue();
    List<Restaurant> findByCuisineContainingIgnoreCase(String cuisine);
    List<Restaurant> findByNameContainingIgnoreCase(String name);
    Optional<Restaurant> findByVendorId(Long vendorId);
    List<Restaurant> findByActiveTrue();
}
