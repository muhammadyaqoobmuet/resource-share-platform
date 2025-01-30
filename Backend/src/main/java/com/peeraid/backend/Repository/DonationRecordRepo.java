package com.peeraid.backend.Repository;

import com.peeraid.backend.models.entity.DonationRecord;
import com.peeraid.backend.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRecordRepo extends JpaRepository<DonationRecord, Long> {
    public List<DonationRecord> getAllByDonorOrderByDonationIdDesc(User donor);
}
