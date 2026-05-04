package com.example.appdev.wildeats_backend.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private Long itemId;
    private Long shopId;
    private int rating;
    private String comment;
    private String userName;
}