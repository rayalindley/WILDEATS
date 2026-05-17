package com.example.appdev.wildeats_backend.controller;

import com.example.appdev.wildeats_backend.model.MenuItem;
import com.example.appdev.wildeats_backend.model.Shop;
import com.example.appdev.wildeats_backend.repository.MenuItemRepository;
import com.example.appdev.wildeats_backend.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ShopRepository shopRepository;
    private final MenuItemRepository menuItemRepository;

    // ==================== SHOPS ====================

    @GetMapping("/shops")
    public ResponseEntity<List<Shop>> getAllShops() {
        return ResponseEntity.ok(shopRepository.findAll());
    }

    @GetMapping("/shops/{id}")
    public ResponseEntity<Shop> getShop(@PathVariable Long id) {
        return shopRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/shops")
    public ResponseEntity<Shop> createShop(@RequestBody Shop shop) {
        return ResponseEntity.ok(shopRepository.save(shop));
    }

    @PutMapping("/shops/{id}")
    public ResponseEntity<Shop> updateShop(@PathVariable Long id, @RequestBody Shop shopData) {
        return shopRepository.findById(id).map(shop -> {
            shop.setName(shopData.getName());
            shop.setCuisine(shopData.getCuisine());
            shop.setDescription(shopData.getDescription());
            shop.setEmoji(shopData.getEmoji());
            shop.setRating(shopData.getRating());
            shop.setReviewCount(shopData.getReviewCount());
            shop.setDeliveryTime(shopData.getDeliveryTime());
            shop.setIsOpen(shopData.getIsOpen());
            shop.setTag(shopData.getTag());
            shop.setPriceRange(shopData.getPriceRange());
            shop.setCategory(shopData.getCategory());
            shop.setLocation(shopData.getLocation());
            return ResponseEntity.ok(shopRepository.save(shop));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/shops/{id}")
    @Transactional
    public ResponseEntity<Void> deleteShop(@PathVariable Long id) {
        if (!shopRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        // Delete associated menu items first
        menuItemRepository.deleteByShopId(id);
        shopRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // ==================== MENU ITEMS ====================

    @GetMapping("/menus")
    public ResponseEntity<List<MenuItem>> getAllMenuItems() {
        return ResponseEntity.ok(menuItemRepository.findAll());
    }

    @GetMapping("/menus/shop/{shopId}")
    public ResponseEntity<List<MenuItem>> getMenuByShop(@PathVariable Long shopId) {
        return ResponseEntity.ok(menuItemRepository.findByShopId(shopId));
    }

    @PostMapping("/menus")
    public ResponseEntity<MenuItem> createMenuItem(@RequestBody MenuItem menuItem) {
        return ResponseEntity.ok(menuItemRepository.save(menuItem));
    }

    @PutMapping("/menus/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Long id, @RequestBody MenuItem itemData) {
        return menuItemRepository.findById(id).map(item -> {
            item.setName(itemData.getName());
            item.setPrice(itemData.getPrice());
            item.setImage(itemData.getImage());
            item.setDescription(itemData.getDescription());
            item.setEmoji(itemData.getEmoji());
            item.setShopId(itemData.getShopId());
            return ResponseEntity.ok(menuItemRepository.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/menus/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        if (!menuItemRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        menuItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
