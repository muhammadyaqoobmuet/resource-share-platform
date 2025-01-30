package com.peeraid.backend.services;

import com.peeraid.backend.Repository.DonationRecordRepo;
import com.peeraid.backend.dto.DonationRecordDto;
import com.peeraid.backend.mapper.DonationRecordMapper;
import com.peeraid.backend.mapper.ResourceMapper;
import com.peeraid.backend.models.entity.DonationRecord;
import com.peeraid.backend.models.entity.User;
import com.peeraid.backend.models.entity.UserRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<DonationRecordDto> getDonationRecord() {
        User authUser = Utill.getCurrentUser();
        List<DonationRecord> records = donationRecordRepo.getAllByDonorOrderByDonationIdDesc(authUser);
        return records.stream().map(DonationRecordMapper::toDonationRecordDto).collect(Collectors.toList());

    }
}
