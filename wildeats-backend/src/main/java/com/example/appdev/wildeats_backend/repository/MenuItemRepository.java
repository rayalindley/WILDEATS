package com.example.appdev.wildeats_backend.repository;

import com.example.appdev.wildeats_backend.model.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByShopId(Long shopId);
    void deleteByShopId(Long shopId);
}
