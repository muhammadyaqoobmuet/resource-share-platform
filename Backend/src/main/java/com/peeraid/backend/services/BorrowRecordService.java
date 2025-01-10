package com.peeraid.backend.services;

import com.peeraid.backend.Repository.BorrowRecordRepo;
import com.peeraid.backend.Repository.UserRequestRepo;
import com.peeraid.backend.models.BorrowRecord;
import com.peeraid.backend.models.RequestStatus;
import com.peeraid.backend.models.UserRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BorrowRecordService {

    private final BorrowRecordRepo borrowRecordRepository;
    private final UserRequestRepo requestRepository;

    public BorrowRecordService(BorrowRecordRepo borrowRecordRepository, UserRequestRepo requestRepository) {
        this.borrowRecordRepository = borrowRecordRepository;
        this.requestRepository = requestRepository;
    }

    public void createBorrowRecord(Long requestId, LocalDate returnDate) {
       UserRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        if (request.getRequestStatus().equals(RequestStatus.ACCEPTED)) {
            throw new IllegalStateException("Request must be approved to create a borrow record");
        }

        BorrowRecord borrowRecord = new BorrowRecord(
                request.getResource(),
                request.getLender(),
                request.getBorrower(),
                returnDate
        );
        borrowRecordRepository.save(borrowRecord);

    }
}
