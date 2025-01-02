package com.peeraid.backend.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceDto {
    private long id;
    private String name;
    private String description;
    private String category;
    private String resourceType;
    private String imageUrl;

    public ResourceDto(long id, String name, String description, String category, String resourceType, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.resourceType = resourceType;
        this.imageUrl = imageUrl;
    }
}
