package com.peeraid.backend.controllers;

import com.peeraid.backend.Request.CreateRequestBody;
import com.peeraid.backend.dto.UserRequestDto;
import com.peeraid.backend.services.UserRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;



@Controller
@RequestMapping("/request")
public class UserRequestsController {
    UserRequestService userRequestService;


    public UserRequestsController(UserRequestService userRequestService) {
        this.userRequestService = userRequestService;

    }

    @PostMapping("/create")
    public ResponseEntity<?> createUserRequest(@RequestBody CreateRequestBody createRequestBody){
        try {
        return ResponseEntity.ok(userRequestService.sendRequest(createRequestBody.getResourceId(),
                    createRequestBody.getReturnDate()));

        }catch (IllegalStateException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/approve")
    public ResponseEntity<?> approveRequest(@RequestBody UserRequestDto userRequestDto) {
        try {

            userRequestService.acceptRequest(userRequestDto.getId(),userRequestDto.getReturnDate());
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/decline/{id}")
    public ResponseEntity<?> declineRequest(@PathVariable long id) {
        try {
            userRequestService.declineRequest(id);
            return ResponseEntity.ok().build();
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<?> cancelRequest(@PathVariable long id) {
        try {
            userRequestService.cancelRequest(id);
            return ResponseEntity.ok().build();
        }catch (IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/receive")
    public ResponseEntity<?> getAllUserRequestsReceived() {
       try {
        return ResponseEntity.ok(userRequestService.getRequestsReceived());

       }catch (Exception e){
           return ResponseEntity.badRequest().body(e.getMessage());
       }
    }

    @GetMapping("/sent")
    public ResponseEntity<?> getAllUserRequestsSent() {
        try {
            return ResponseEntity.ok(userRequestService.getRequestsSent());

        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }







}
