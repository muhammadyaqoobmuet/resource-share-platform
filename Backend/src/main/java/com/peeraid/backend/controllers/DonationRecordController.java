package com.peeraid.backend.controllers;

import com.peeraid.backend.dto.DonationRecordDto;
import com.peeraid.backend.services.DonationRecordService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/donation")
public class DonationRecordController {
    DonationRecordService donationRecordService;
    public DonationRecordController(DonationRecordService donationRecordService) {
        this.donationRecordService = donationRecordService;
    }

    @GetMapping("/")
    public ResponseEntity<List<DonationRecordDto>> getDonationRecord() {
        try {
        return ResponseEntity.ok(donationRecordService.getDonationRecord());

        }catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }

    }


}
