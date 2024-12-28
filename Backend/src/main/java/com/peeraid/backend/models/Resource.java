package com.peeraid.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long resourceId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String resourceName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ResourceCategory resourceCategory;

    @Column(length = 200)
    private String description;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean available = true;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ResourceType resourceType;

    @Column(nullable = false, updatable = false)
    private LocalDateTime dateCreated = LocalDateTime.now();

    public Resource() {
    }

    public Resource(String resourceName,
                    ResourceCategory resourceCategory,
                    String description,
                    String imageUrl,
                    ResourceType resourceType) {

        this.resourceName = resourceName;
        this.resourceCategory = resourceCategory;
        this.description = description;
        this.imageUrl = imageUrl;
        this.resourceType = resourceType;
    }



}
