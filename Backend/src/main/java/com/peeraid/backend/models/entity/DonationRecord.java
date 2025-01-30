package com.peeraid.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class DonationRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long donationId;

    @OneToOne
    @JoinColumn(name = "resourceId", nullable = false)
    private Resource donatedResource;

    @ManyToOne
    @JoinColumn(name = "donorId" , nullable = false)
    private User donor;

    @ManyToOne
    @JoinColumn(name = "recipientId" , nullable = false)
    private User recipient;

    @Column(nullable = false,updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private LocalDate donationDate = LocalDate.now();

    public DonationRecord(Resource donatedResource, User donor, User recipient) {
        this.donatedResource = donatedResource;
        this.donor = donor;
        this.recipient = recipient;
    }

    public DonationRecord() {

    }
}
