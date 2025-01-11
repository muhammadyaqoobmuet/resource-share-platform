package com.peeraid.backend.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    

    private final JavaMailSender mailSender;
  @Value("${spring.mail.username}")  private String userName;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    @Async
    public void sendVerificationEmail(String to, String subject, String text) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        helper.setFrom(userName);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text, true);

        mailSender.send(message);

    }
}
