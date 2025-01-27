package com.peeraid.backend.controllers;

import com.peeraid.backend.Request.DisputeBody;
import com.peeraid.backend.services.TransactionRecordService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transactions")
public class TransactionRecordController {
    TransactionRecordService transactionRecordService;

    public TransactionRecordController(TransactionRecordService transactionRecordService) {
        this.transactionRecordService = transactionRecordService;
    }

    @GetMapping("/lent")
   public ResponseEntity<?> getAllLentRecords(){
        try {
        return ResponseEntity.ok(transactionRecordService.getLentRecords());

        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }
    @GetMapping("/borrowed")
   public ResponseEntity<?> getAlBorrowedRecords(){
        try {
        return ResponseEntity.ok(transactionRecordService.getBorrowedRecords());

        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @PatchMapping("/return/{id}")
    public ResponseEntity<String> markAsReturn(@PathVariable long id){
      try {
       return ResponseEntity.ok(transactionRecordService.markAsReturn(id));

      }catch (Exception e){
          return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
      }
    }

    @PatchMapping("/confirm/{id}")
    public ResponseEntity<String> confirmReturn(@PathVariable long id){
      try {
       return ResponseEntity.ok(transactionRecordService.confirmReturn(id));

      }catch (Exception e){
          return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
      }
    }
    @PatchMapping("/decline/{id}")
    public ResponseEntity<String> declineReturn(@PathVariable long id,@RequestBody DisputeBody disputeBody){
        try {
           return ResponseEntity.ok(transactionRecordService.declineReturn(id,disputeBody));
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
