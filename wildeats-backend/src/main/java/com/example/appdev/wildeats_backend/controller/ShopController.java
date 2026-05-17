package com.example.appdev.wildeats_backend.controller;

import com.example.appdev.wildeats_backend.model.MenuItem;
import com.example.appdev.wildeats_backend.model.Shop;
import com.example.appdev.wildeats_backend.repository.MenuItemRepository;
import com.example.appdev.wildeats_backend.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ShopController {

    private final ShopRepository shopRepository;
    private final MenuItemRepository menuItemRepository;

    @GetMapping("/shops")
    public ResponseEntity<List<Shop>> getAllShops() {
        return ResponseEntity.ok(shopRepository.findAll());
    }

    @GetMapping("/shops/{id}")
    public ResponseEntity<Shop> getShopById(@PathVariable Long id) {
        return shopRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/menus/shop/{shopId}")
    public ResponseEntity<List<MenuItem>> getMenuByShop(@PathVariable Long shopId) {
        return ResponseEntity.ok(menuItemRepository.findByShopId(shopId));
    }
}