package com.peeraid.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @OneToOne
    @JoinColumn(name ="borrowerId")
    private User borrower = null ;

    @Column(nullable = false, length = 100)
    private String resourceName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ResourceCategory resourceCategory;

    @Column(length = 200)
    private String description;

    @Column(nullable = false)
    private Boolean available = true;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ResourceType resourceType;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String imagePublicId;

    @Column(nullable = false, updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDateTime dateCreated = LocalDateTime.now();

    public Resource() {
    }

    public Resource(String resourceName,
                    ResourceCategory resourceCategory,
                    String description,
                    ResourceType resourceType) {

        this.resourceName = resourceName;
        this.resourceCategory = resourceCategory;
        this.description = description;
        this.resourceType = resourceType;
    }



}
