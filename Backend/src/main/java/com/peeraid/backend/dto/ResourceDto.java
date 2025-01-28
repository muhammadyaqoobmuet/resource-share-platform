package com.peeraid.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ResourceDto {
    private long id;
    private String name;
    private String description;
    private String category;
    private String resourceType;
    private String imageUrl;
    private long userId;
    private String status;
    private LocalDate dateAdded;

}
