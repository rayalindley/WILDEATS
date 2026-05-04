package com.example.appdev.wildeats_backend.controller;

import com.example.appdev.wildeats_backend.dto.OrderRequest;
import com.example.appdev.wildeats_backend.model.Order;
import com.example.appdev.wildeats_backend.model.OrderItem;
import com.example.appdev.wildeats_backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderRepository.findByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Order> create(@RequestBody OrderRequest req) {

        Order order = new Order();
        order.setUserId(req.getUserId());
        order.setShopId(req.getShopId());
        order.setTotal(req.getTotal());
        order.setStatus("PENDING");

        List<OrderItem> items = req.getItems().stream().map(i -> {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setItemId(i.getItemId());
            item.setItemName(i.getItemName());
            item.setPrice(i.getPrice());
            item.setQuantity(i.getQuantity());
            return item;
        }).collect(Collectors.toList());

        order.setItems(items);

        return ResponseEntity.ok(orderRepository.save(order));
    }
}