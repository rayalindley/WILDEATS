package com.example.appdev.wildeats_backend.repository;

import com.example.appdev.wildeats_backend.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShopRepository extends JpaRepository<Shop, Long> {
    List<Shop> findByIsOpenTrue();
    List<Shop> findByCategory(String category);
}
