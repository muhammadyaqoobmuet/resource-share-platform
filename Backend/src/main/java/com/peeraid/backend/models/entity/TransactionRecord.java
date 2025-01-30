package com.peeraid.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.peeraid.backend.models.enums.TransactionStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;


@Entity
@Getter
@Setter
public class TransactionRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "resourceId", nullable = false)
    Resource borrowedResource;

    @ManyToOne
    @JoinColumn(name = "lenderId" , nullable = false)
    private User lender;

    @ManyToOne
    @JoinColumn(name = "borrowerId" , nullable = false)
    private User borrower;

    @Column(nullable = false,updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate borrowDate = LocalDate.now();


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate returnDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TransactionStatus status = TransactionStatus.Active;

    public TransactionRecord() {
    }

    public TransactionRecord(Resource borrowedResource, User lender, User borrower, LocalDate returnDate) {
        this.borrowedResource = borrowedResource;
        this.lender = lender;
        this.borrower = borrower;
        this.returnDate = returnDate;
    }
}
