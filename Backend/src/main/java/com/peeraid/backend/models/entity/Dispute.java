package com.peeraid.backend.models.entity;

import com.peeraid.backend.models.enums.DisputeStatus;
import com.peeraid.backend.models.enums.DisputeType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Dispute {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long disputeId;
@OneToOne
@JoinColumn(name = "transactionId", nullable = false)
    private TransactionRecord disputedRecord;
    @Enumerated(EnumType.STRING)
    private DisputeType disputeType;
    private String Details ;
    @Enumerated(EnumType.STRING)
    private DisputeStatus status = DisputeStatus.PENDING;
    private LocalDate createdAt = LocalDate.now();

    public Dispute() {
    }

    public Dispute(TransactionRecord disputedRecord, DisputeType disputeType, String details) {
        this.disputedRecord = disputedRecord;
        this.disputeType = disputeType;
        Details = details;
    }
}


