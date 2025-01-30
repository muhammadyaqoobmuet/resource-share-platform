package com.peeraid.backend.controllers;

import com.peeraid.backend.models.entity.Message;
import com.peeraid.backend.services.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
@AllArgsConstructor
public class CreateMessage {
    MessageService messageService;

    @PostMapping("/chat/{id}")
    public Message createMessage(@PathVariable("id") long chatId, @RequestBody Message message) {
      return   messageService.createMessage(chatId,message.getContent());
    }

    @GetMapping("/chat/{id}")
    public List<Message> findChatMessages(@PathVariable("id") long chatId) {
      return   messageService.findChatMessages(chatId);
    }
}
