package com.peeraid.backend.controllers;


import com.peeraid.backend.dto.LoginUserDto;
import com.peeraid.backend.dto.RegisterUserDto;
import com.peeraid.backend.dto.VerifyUserDto;
import com.peeraid.backend.models.User;
import com.peeraid.backend.responses.LoginResponse;
import com.peeraid.backend.services.AuthenticationService;
import com.peeraid.backend.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    JwtService jwtService;
    AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService, JwtService jwtService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;

    }

    @PostMapping("/signup")
    public ResponseEntity<User> registerUser(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signUp(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
        try {
            System.out.println(verifyUserDto.getVerificationCode());
            authenticationService.verifyUser(verifyUserDto);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/resendVerification/{email}")
    public ResponseEntity<String> resendVerificationCode(@PathVariable String email){
        authenticationService.resendVerificationCode(email);
        return ResponseEntity.ok("Verification code resent");
    }
}
