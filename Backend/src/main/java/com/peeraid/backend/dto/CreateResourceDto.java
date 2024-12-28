package com.peeraid.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateResourceDto {

    private String name;
    private String description;
    private String category;
    private String status;
    private String imageUrl;

    public CreateResourceDto(String name, String description, String category, String status, String imageUrl) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.status = status;
        this.imageUrl = imageUrl;
    }
}
