package com.peeraid.backend.controllers;

import com.peeraid.backend.services.DonationRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/donation")
public class DonationRecordController {
    DonationRecordService donationRecordService;
    public DonationRecordController(DonationRecordService donationRecordService) {
        this.donationRecordService = donationRecordService;
    }


}
