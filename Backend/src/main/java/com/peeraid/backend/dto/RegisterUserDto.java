package com.peeraid.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {

    private String name;
    private String email;
    private String password;
}
