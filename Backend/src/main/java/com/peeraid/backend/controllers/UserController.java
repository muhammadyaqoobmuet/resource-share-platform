package com.peeraid.backend.controllers;


import com.peeraid.backend.dto.UserDto;
import com.peeraid.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/user")
@RestController
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> authenticatedUser() {
        try {
        return new ResponseEntity<>(userService.getCurrentUser(),HttpStatus.OK);

        }catch (RuntimeException e){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto>getUserById(@PathVariable("id") long id) {
        try {
        UserDto user = userService.getUserById(id);
        return new  ResponseEntity<>(user, HttpStatus.OK);

        }catch (RuntimeException e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }


}
