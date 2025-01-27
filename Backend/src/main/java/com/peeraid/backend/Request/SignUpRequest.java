package com.peeraid.backend.Request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {

    private String name;
    private String email;
    private String password;
}
