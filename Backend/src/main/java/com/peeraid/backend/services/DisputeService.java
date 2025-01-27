package com.peeraid.backend.services;

import com.peeraid.backend.Repository.DisputeRepository;
import com.peeraid.backend.Request.DisputeBody;
import com.peeraid.backend.models.Dispute;
import com.peeraid.backend.models.DisputeType;
import com.peeraid.backend.models.TransactionRecord;
import org.springframework.stereotype.Service;

@Service
public class DisputeService {
    DisputeRepository disputeRepository;

    public DisputeService(DisputeRepository disputeRepository) {
        this.disputeRepository = disputeRepository;
    }

    public void createDispute(DisputeBody disputeBody, TransactionRecord transactionRecord) {
        Dispute dispute = new Dispute(transactionRecord,
                DisputeType.valueOf(disputeBody.getDisputeType()),
                disputeBody.getDisputeDetails()
        );
        disputeRepository.save(dispute);
    }
}
