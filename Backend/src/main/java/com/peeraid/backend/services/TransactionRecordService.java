package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ResourceRepo;
import com.peeraid.backend.Repository.TransactionRecordRepo;
import com.peeraid.backend.Repository.UserRequestRepo;
import com.peeraid.backend.Request.DisputeBody;
import com.peeraid.backend.mapper.TransactionRecordMapper;
import com.peeraid.backend.models.*;
import com.peeraid.backend.dto.TransactionRecordDto;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TransactionRecordService {

    private final TransactionRecordRepo transactionRecordRepository;
    private final UserRequestRepo requestRepository;
    private final ResourceRepo resourceRepo;
    private  final DisputeService disputeService;
    public TransactionRecordService(TransactionRecordRepo transactionRecordRepository,
                                    UserRequestRepo requestRepository,
                                    ResourceRepo resourceRepo,
                                    DisputeService disputeService) {
        this.transactionRecordRepository = transactionRecordRepository;
        this.requestRepository = requestRepository;
        this.resourceRepo = resourceRepo;
        this.disputeService = disputeService;
    }

    public void createTransactionRecord(Long requestId, LocalDate returnDate) {
       UserRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        if (!request.getRequestStatus().equals(RequestStatus.ACCEPTED)) {
            throw new IllegalStateException("Request must be approved to create a borrow record");
        }

        TransactionRecord transactionRecord = new TransactionRecord(
                request.getResource(),
                request.getLender(),
                request.getBorrower(),
                returnDate
        );
        transactionRecordRepository.save(transactionRecord);

    }

    public String markAsReturn(Long transactionRecordId) {
        TransactionRecord record = transactionRecordRepository.findById(transactionRecordId)
                .orElseThrow(() -> new IllegalArgumentException("TransactionRecord not found"));

        if (record.getBorrower().getUserId() == Utill.getCurrentUser().getUserId()) {
            if (!record.getStatus().equals(TransactionStatus.Active)) {
                throw new IllegalArgumentException("TransactionRecord is not active");
            }
            record.setStatus(TransactionStatus.PendingConfirmation);
            transactionRecordRepository.save(record);
            return "Return request has been sent";
        }else{
            throw new AccessDeniedException("You are not authorized to perform this action");
        }

    }
    public String confirmReturn(Long transactionRecordId) {
        TransactionRecord record = transactionRecordRepository.findById(transactionRecordId)
                .orElseThrow(()-> new IllegalArgumentException("TransactionRecord not found"));

        if (record.getLender().getUserId() == Utill.getCurrentUser().getUserId()) {
            if (!record.getStatus().equals(TransactionStatus.PendingConfirmation)) {
                throw new IllegalArgumentException("Invalid Request");
            }
            record.setStatus(TransactionStatus.Completed);
            Resource resource = resourceRepo.findByResourceId(record.getBorrowedResource().getResourceId())
                    .orElseThrow(() -> new IllegalArgumentException("Resource not found"));
            resource.setAvailable(true);
            resourceRepo.save(resource);
            transactionRecordRepository.save(record);
            return "Return Confirmed";
        }else {
            throw new AccessDeniedException("You are not authorized to perform this action");
        }
    }

    public String declineReturn(Long transactionRecordId, DisputeBody disputeBody) {
      Optional<TransactionRecord> record =  transactionRecordRepository.findById(transactionRecordId);
      if (record.isEmpty()){
          throw new IllegalArgumentException("TransactionRecord not found");
      }
      TransactionRecord transactionRecord = record.get();
      if (transactionRecord.getStatus().equals(TransactionStatus.Completed)){
          throw new IllegalStateException("TransactionRecord is completed");
      }

        transactionRecord.setStatus(TransactionStatus.Disputed);
        disputeService.createDispute(disputeBody,transactionRecord);
      return "Report has been submitted";
    }

    public List<TransactionRecordDto> getBorrowedRecords() {

        User user = Utill.getCurrentUser();
        List<TransactionRecord> borrowedTransactions = transactionRecordRepository.findAllByBorrower(user);
        return borrowedTransactions.stream().map(TransactionRecordMapper::mapToTransactionRecordDto).collect(Collectors.toList());

    }

    public List<TransactionRecordDto> getLentRecords() {

        User user = Utill.getCurrentUser();
        List<TransactionRecord> borrowedTransactions = transactionRecordRepository.findAllByLender(user);
        return borrowedTransactions.stream().map(TransactionRecordMapper::mapToTransactionRecordDto).collect(Collectors.toList());

    }


}
