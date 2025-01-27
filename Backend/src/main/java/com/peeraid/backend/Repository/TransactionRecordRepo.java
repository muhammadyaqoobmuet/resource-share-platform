package com.peeraid.backend.Repository;

import com.peeraid.backend.models.TransactionRecord;
import com.peeraid.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRecordRepo extends JpaRepository<TransactionRecord, Long> {
    Optional<TransactionRecord> findById(long id);
    List<TransactionRecord> findAllByBorrower(User borrower);
    List<TransactionRecord> findAllByLender(User lender);
}
