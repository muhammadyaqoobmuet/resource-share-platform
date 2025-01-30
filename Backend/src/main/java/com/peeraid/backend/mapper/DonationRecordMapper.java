package com.peeraid.backend.mapper;

import com.peeraid.backend.dto.DonationRecordDto;
import com.peeraid.backend.models.entity.DonationRecord;

public class DonationRecordMapper
{
    public static DonationRecordDto toDonationRecordDto(DonationRecord donationRecord){
        return new DonationRecordDto(
                donationRecord.getDonationId(),
                donationRecord.getDonor().getUserId(),
                donationRecord.getDonor().getName(),
                donationRecord.getRecipient().getUserId(),
                donationRecord.getRecipient().getName(),
                donationRecord.getDonatedResource().getResourceId(),
                donationRecord.getDonatedResource().getResourceName()
        );
    }
}
