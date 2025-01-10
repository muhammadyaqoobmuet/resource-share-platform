package com.peeraid.backend.Repository;

import com.peeraid.backend.models.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BorrowRecordRepo extends JpaRepository<BorrowRecord, Long> {


}
