package com.peeraid.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peeraid.backend.models.enums.RequestStatus;
import com.peeraid.backend.models.enums.RequestType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@Entity
public class UserRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long requestId;

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

    @Enumerated(EnumType.STRING)
    private RequestType requestType;

    @Column(nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate requestDate = LocalDate.now();

    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
    private LocalDate returnDate;

    public UserRequest() {
    }

    public UserRequest(User borrower, User lender, Resource resource,RequestType type,LocalDate returnDate) {
        this.borrower = borrower;
        this.lender = lender;
        this.resource = resource;
        this.requestType = type;
        this.returnDate = returnDate;
    }

}
