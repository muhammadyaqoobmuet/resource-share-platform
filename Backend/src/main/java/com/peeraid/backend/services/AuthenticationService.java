package com.peeraid.backend.services;

import com.peeraid.backend.Repository.UserRepository;
import com.peeraid.backend.Request.LoginRequest;
import com.peeraid.backend.Request.SignUpRequest;
import com.peeraid.backend.Request.VerifyUserRequest;
import com.peeraid.backend.models.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    public String signUp(SignUpRequest input) {

      Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());

        if (optionalUser.isPresent()) {
            throw  new RuntimeException("User Already Exist");
        }

            User user = new User(input.getName(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
            sendVerificationEmail(user);
            userRepository.save(user);

            return "User created";
    }

    public User authenticate(LoginRequest input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Credentials"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Account not Verified");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );
        return user;
    }

    public void verifyUser(VerifyUserRequest input) {

        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()){
                throw new RuntimeException("User already verified");
            }
            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification Code is Expired");
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setVerified(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid Verification Code");
            }
        } else {
            throw new RuntimeException("Invalid Email");
        }
    }

    public void resendVerificationCode(String email) {
       User user = userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("Invalid Email"));
            if (user.isEnabled()) {
                throw new RuntimeException("User is already Verified");
            }

            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(30));
            sendVerificationEmail(user);
            userRepository.save(user);

    }


    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }

@Async
protected void sendVerificationEmail(User user) {
        String subject = "Email Verification";
        String verificationCode = user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {

            e.printStackTrace();
        }
    }
}



