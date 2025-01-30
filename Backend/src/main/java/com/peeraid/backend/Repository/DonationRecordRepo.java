package com.peeraid.backend.Repository;

import com.peeraid.backend.models.entity.DonationRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRecordRepo extends JpaRepository<DonationRecord, Long> {
}
