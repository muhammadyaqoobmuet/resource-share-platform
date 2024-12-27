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
    private Category category;

    @Column(length = 200)
    private String description;

    private String imageUrl;

    private Boolean available;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Status status;

    private LocalDateTime dateCreated;

    public Resource() {
    }

    public Resource(String resourceName,
                    Category category,
                    String description,
                    String imageUrl,
                    Status status) {

        this.resourceName = resourceName;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
        this.status = status;
    }



}
