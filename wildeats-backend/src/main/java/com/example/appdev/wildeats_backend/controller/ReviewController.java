package com.example.appdev.wildeats_backend.controller;

import com.example.appdev.wildeats_backend.dto.ReviewRequest;
import com.example.appdev.wildeats_backend.model.Review;
import com.example.appdev.wildeats_backend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @GetMapping("/item/{itemId}")
    public ResponseEntity<List<Review>> getByItem(@PathVariable Long itemId) {
        return ResponseEntity.ok(reviewRepository.findByItemId(itemId));
    }

    @GetMapping("/shop/{shopId}")
    public ResponseEntity<List<Review>> getByShop(@PathVariable Long shopId) {
        return ResponseEntity.ok(reviewRepository.findByShopId(shopId));
    }

    @PostMapping
    public ResponseEntity<Review> create(@RequestBody ReviewRequest req) {
        Review review = Review.builder()
                .itemId(req.getItemId())
                .shopId(req.getShopId())
                .rating(req.getRating())
                .comment(req.getComment())
                .userName(req.getUserName())
                .build();
        return ResponseEntity.ok(reviewRepository.save(review));
    }
}