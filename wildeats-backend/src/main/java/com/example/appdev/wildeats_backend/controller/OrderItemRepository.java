package com.example.appdev.wildeats_backend.repository;

import com.example.appdev.wildeats_backend.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {}