package com.peeraid.backend.controllers;


import com.peeraid.backend.Request.LoginRequest;
import com.peeraid.backend.Request.SignUpRequest;
import com.peeraid.backend.Request.VerifyUserRequest;
import com.peeraid.backend.models.entity.User;
import com.peeraid.backend.responses.LoginResponse;
import com.peeraid.backend.services.AuthenticationService;
import com.peeraid.backend.services.JwtService;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<String> registerUser(@RequestBody SignUpRequest signupRequest) {
        try {
        return ResponseEntity.ok(authenticationService.signUp(signupRequest));

        }catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest) {
        try {
        User authenticatedUser = authenticationService.authenticate(loginRequest);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.accepted().body(loginResponse);

        }catch (RuntimeException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestBody VerifyUserRequest verifyUserRequest) {
        try {
            authenticationService.verifyUser(verifyUserRequest);
            return ResponseEntity.ok("Account verified successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/resendVerification/{email}")
    public ResponseEntity<String> resendVerificationCode(@PathVariable String email){
        try {
        authenticationService.resendVerificationCode(email);
        return ResponseEntity.ok("Verification code resent");

        }catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
