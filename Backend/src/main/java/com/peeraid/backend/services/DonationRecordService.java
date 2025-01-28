package com.peeraid.backend.services;

import com.peeraid.backend.Repository.DonationRecordRepo;
import com.peeraid.backend.models.enums.DonationRecord;
import com.peeraid.backend.models.enums.UserRequest;
import org.springframework.stereotype.Service;

@Service
public class DonationRecordService {

    DonationRecordRepo donationRecordRepo;

    public DonationRecordService(DonationRecordRepo donationRecordRepo) {
        this.donationRecordRepo = donationRecordRepo;
    }

    public void createDonationRecord(UserRequest userRequest) {

        DonationRecord donationRecord = new DonationRecord(
                userRequest.getResource(),
                userRequest.getLender(),
                userRequest.getBorrower()
        );

        donationRecordRepo.save(donationRecord);

    }
}
