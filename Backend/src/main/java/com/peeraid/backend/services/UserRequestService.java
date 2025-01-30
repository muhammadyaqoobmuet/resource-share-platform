package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ResourceRepo;
import com.peeraid.backend.Repository.UserRequestRepo;
import com.peeraid.backend.dto.UserRequestDto;
import com.peeraid.backend.mapper.UserRequestMapper;
import com.peeraid.backend.models.entity.Resource;
import com.peeraid.backend.models.entity.User;
import com.peeraid.backend.models.entity.UserRequest;
import com.peeraid.backend.models.enums.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRequestService {

    TransactionRecordService transactionRecordService;
    DonationRecordService donationRecordService;
    ResourceRepo resourceRepo;
    UserRequestRepo userRequestRepo;

    public UserRequestService(TransactionRecordService transactionRecordService, DonationRecordService donationRecordService, ResourceRepo resourceRepo, UserRequestRepo userRequestRepo) {
        this.transactionRecordService = transactionRecordService;
        this.donationRecordService = donationRecordService;
        this.resourceRepo = resourceRepo;
        this.userRequestRepo = userRequestRepo;
    }

    public String sendRequest(long resourceId, LocalDate returnDate){
        Resource requestResource = resourceRepo.findByResourceId(resourceId)
                .orElseThrow(()->new IllegalArgumentException("Resource not found"));
        if (!requestResource.isAvailable()){
            throw new IllegalStateException("Resource not available");
        }
        if (requestResource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
            throw new IllegalStateException("Invalid request");
        }
        if(userRequestRepo.findByBorrowerAndResource(Utill.getCurrentUser(),requestResource).isPresent()){
            throw new IllegalStateException("Request already Sent");
        }
        RequestType requestType ;
         if (requestResource.getResourceType().equals(ResourceType.LEND)){
             requestType = RequestType.BORROW;
         }else {
             requestType = RequestType.DONATION;
         }


            UserRequest userRequest = new UserRequest(
                    Utill.getCurrentUser(),
                    requestResource.getUser(),
                    requestResource,
                    requestType,
                    returnDate
            );

            userRequestRepo.save(userRequest);
            return "Request sent!";

    }

    public void acceptRequest(long requestId,LocalDate returnDate) {
        UserRequest userRequest = getUserRequest(requestId);

        if (userRequest.getLender().getUserId() == Utill.getCurrentUser().getUserId()) {
            Resource requestResource = userRequest.getResource();
            if (requestResource.isAvailable()) {
                userRequest.setRequestStatus(RequestStatus.ACCEPTED);
                userRequestRepo.save(userRequest);
            }
            if (userRequest.getRequestType().equals(RequestType.BORROW)) {
                transactionRecordService.createTransactionRecord(userRequest, returnDate);
                requestResource.setResourceStatus(ResourceStatus.BORROWED);
                resourceRepo.save(requestResource);
            } else {
                donationRecordService.createDonationRecord(userRequest);
                requestResource.setResourceStatus(ResourceStatus.DONATED);
                resourceRepo.save(requestResource);
            }

        }

    }
    public void declineRequest(long requestId){
        UserRequest userRequest = getUserRequest(requestId);
        if (userRequest.getLender().getUserId() == Utill.getCurrentUser().getUserId()){
            if (userRequest.getRequestStatus().equals(RequestStatus.PENDING)){
                userRequest.setRequestStatus(RequestStatus.DECLINED);
                userRequestRepo.save(userRequest);
            }else {
                throw new IllegalStateException("Invalid Request");
            }
        }else {
            throw new IllegalStateException("You are not Authorized for this request");
        }
    }

    public void cancelRequest(long requestId){
        UserRequest userRequest = getUserRequest(requestId);
        if (userRequest.getBorrower().getUserId() == Utill.getCurrentUser().getUserId()){
            userRequestRepo.delete(userRequest);
        }else {
            throw new IllegalStateException("You are not Authorized for this request");
        }
    }

    public List<UserRequestDto> getRequestsReceived(){
       User user =  Utill.getCurrentUser();
        List<UserRequest> userRequests = userRequestRepo.findAllByLenderOrderByRequestIdDesc(user);

      return  userRequests.stream().map(UserRequestMapper::mapToUserRequestDto).collect(Collectors.toList()) ;
    }





    public List<UserRequestDto> getRequestsSent(){
        User user =  Utill.getCurrentUser();
        List<UserRequest> userRequests = userRequestRepo.findAllByBorrowerOrderByRequestIdDesc(user);


        return  userRequests.stream().map(UserRequestMapper::mapToUserRequestDto).collect(Collectors.toList()) ;
    }

    private UserRequest getUserRequest(long requestId){
       return userRequestRepo.findByRequestId(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid request"));
    }




}
