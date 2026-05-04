package com.example.appdev.wildeats_backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private Long userId;
    private Long shopId;
    private Double total;
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private Long itemId;
        private String itemName;
        private Double price;
        private Integer quantity;
    }
}