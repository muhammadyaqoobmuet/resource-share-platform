package com.peeraid.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceDto {
    private long id;
    private String name;
    private String description;
    private String category;
    private String status;
    private String imageUrl;

    public ResourceDto(long id, String name, String description, String category, String status, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.status = status;
        this.imageUrl = imageUrl;
    }
}
