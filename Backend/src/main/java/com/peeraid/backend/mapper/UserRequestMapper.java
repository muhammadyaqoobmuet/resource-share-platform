package com.peeraid.backend.mapper;

import com.peeraid.backend.dto.UserRequestDto;
import com.peeraid.backend.models.entity.UserRequest;

public class UserRequestMapper {
   public static UserRequestDto mapToUserRequestDto(UserRequest userRequest) {
       return new UserRequestDto(
               userRequest.getRequestId(),
               ResourceMapper.mapToResourceDto(userRequest.getResource()),
               UserMapper.mapToUserDto(userRequest.getLender()),
               UserMapper.mapToUserDto(userRequest.getBorrower()),
               userRequest.getRequestStatus().toString(),
               userRequest.getRequestType().toString(),
               userRequest.getRequestDate(),
               userRequest.getReturnDate()
       );
   }
}
