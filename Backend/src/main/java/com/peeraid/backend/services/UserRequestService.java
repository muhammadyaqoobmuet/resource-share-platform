package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ResourceRepo;
import com.peeraid.backend.Repository.UserRequestRepo;
import com.peeraid.backend.dto.UserRequestDto;
import com.peeraid.backend.mapper.UserRequestMapper;
import com.peeraid.backend.models.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRequestService {

   ResourceRepo resourceRepo;
    UserRequestRepo userRequestRepo;

    public UserRequestService(ResourceRepo resourceRepo, UserRequestRepo userRequestRepo) {
        this.resourceRepo = resourceRepo;
        this.userRequestRepo = userRequestRepo;
    }

    public String sendRequest(long resourceId){
        Resource requestResource = resourceRepo.findByResourceId(resourceId)
                .orElseThrow(()->new IllegalArgumentException("Resource not found"));
        if (!requestResource.getAvailable()){
            throw new IllegalStateException("Resource not available");
        }
        if (requestResource.getUser().getUserId() == Utill.getCurrentUser().getUserId()){
            throw new IllegalStateException("Invalid request");
        }

            UserRequest userRequest = new UserRequest(
                    Utill.getCurrentUser(),
                    requestResource.getUser(),
                    requestResource
            );

            userRequestRepo.save(userRequest);
            return "Request sent!";

    }

    public void acceptRequest(long requestId){
        UserRequest userRequest = getUserRequest(requestId);
        if (userRequest.getLender().getUserId() == Utill.getCurrentUser().getUserId() ){
        Resource requestResource = userRequest.getResource();
            if (requestResource.getAvailable()){
             requestResource.setAvailable(false);
             userRequest.setRequestStatus(RequestStatus.ACCEPTED);
             resourceRepo.save(requestResource);
             userRequestRepo.save(userRequest);
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
                throw new IllegalStateException("Request Already Approved");
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
        List<UserRequest> userRequests = userRequestRepo.findAllByLender(user);

      return  userRequests.stream().map(UserRequestMapper::mapToUserRequestDto).collect(Collectors.toList()) ;
    }

    public List<UserRequestDto> getRequestsSent(){
        User user =  Utill.getCurrentUser();
        List<UserRequest> userRequests = userRequestRepo.findAllByBorrower(user);


        return  userRequests.stream().map(UserRequestMapper::mapToUserRequestDto).collect(Collectors.toList()) ;
    }

    private UserRequest getUserRequest(long requestId){
       return userRequestRepo.findByRequestId(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid request"));
    }




}
