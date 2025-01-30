package com.peeraid.backend.services;

import com.peeraid.backend.Repository.UserRepository;
import com.peeraid.backend.dto.UserDto;
import com.peeraid.backend.mapper.UserMapper;
import com.peeraid.backend.models.entity.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
    }

    public UserDto getCurrentUser(){
       User user =  Utill.getCurrentUser();
       return  UserMapper.mapToUserDto(user);
    }

  public UserDto getUserById(long id){
       User user =  userRepository.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
      return UserMapper.mapToUserDto(user);

  }

}