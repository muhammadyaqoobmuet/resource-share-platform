package com.peeraid.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DonationRecordDto {
    private long id;
    private long ownerId;
    private String ownerName;
    private long recipientId;
    private String recipientName;
    private long resourceId;
    private String donatedResource;

}
