package com.peeraid.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peeraid.backend.models.enums.ResourceCategory;
import com.peeraid.backend.models.enums.ResourceStatus;
import com.peeraid.backend.models.enums.ResourceType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


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

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceStatus resourceStatus = ResourceStatus.AVAILABLE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ResourceType resourceType;

    private String imageUrl;

    private String imagePublicId;

    @Column(nullable = false, updatable = false)
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateCreated = LocalDate.now();

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

   public boolean isAvailable(){
        return resourceStatus.equals(ResourceStatus.AVAILABLE);
    }


}
