package com.peeraid.backend.controllers;


import com.peeraid.backend.dto.UserDto;
import com.peeraid.backend.mapper.UserMapper;
import com.peeraid.backend.models.User;
import com.peeraid.backend.services.UserService;
import com.peeraid.backend.services.Utill;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> authenticatedUser() {
        User currentUser = Utill.getCurrentUser();
        return ResponseEntity.ok(UserMapper.mapToUserDto(currentUser));
    }

}
