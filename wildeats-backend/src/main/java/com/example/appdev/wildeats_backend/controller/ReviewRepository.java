package com.example.appdev.wildeats_backend.repository;

import com.example.appdev.wildeats_backend.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByItemId(Long itemId);
    List<Review> findByShopId(Long shopId);
}