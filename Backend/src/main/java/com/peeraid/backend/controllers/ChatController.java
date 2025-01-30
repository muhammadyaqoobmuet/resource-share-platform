package com.peeraid.backend.controllers;

import com.peeraid.backend.models.entity.Chat;
import com.peeraid.backend.services.ChatService;
import com.peeraid.backend.services.Utill;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ChatController {
    ChatService chatService;
    public ChatController(ChatService chatService) {
        this.chatService = chatService;

    }

    @PostMapping("/chat/{receiverId}")
    public Chat createChat(@PathVariable long receiverId){
       return chatService.createChat(receiverId);
    }
    @GetMapping("/chat")
        public List<Chat> getAllChats(){

            return chatService.findUsersChat(Utill.getCurrentUser().getUserId());
        }
}
