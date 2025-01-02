package com.peeraid.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateResourceDto {

    private String name;
    private String description;
    private String category;
    private String resourceType;

    public CreateResourceDto(String name, String description, String category, String resourceType) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.resourceType = resourceType;

    }
}
