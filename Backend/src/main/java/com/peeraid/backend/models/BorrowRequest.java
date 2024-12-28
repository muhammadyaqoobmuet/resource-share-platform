package com.peeraid.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class BorrowRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long requestID;

    @ManyToOne
    @JoinColumn(name = "borrowerId", nullable = false)
    private User borrower;

    @ManyToOne
    @JoinColumn (name = "lenderId", nullable = false)
    private User lender;

    @ManyToOne
    @JoinColumn(name = "resourceId", nullable = false)
    private Resource resource;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RequestStatus requestStatus = RequestStatus.PENDING;

    @Column(nullable = false)
    private LocalDateTime requestTime = LocalDateTime.now();

    public BorrowRequest() {
    }

    public BorrowRequest(User borrower, User lender, Resource resource) {
        this.borrower = borrower;
        this.lender = lender;
        this.resource = resource;
    }

}
