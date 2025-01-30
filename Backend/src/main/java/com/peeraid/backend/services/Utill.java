package com.peeraid.backend.services;

import com.peeraid.backend.models.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class Utill {

    public static User getCurrentUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof User) {
                return ((User) principal);
            }
        }
        throw new IllegalStateException("User not authenticated");
    }
}
