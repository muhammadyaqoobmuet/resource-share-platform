package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ChatRepository;
import com.peeraid.backend.Repository.MessageRepository;
import com.peeraid.backend.models.entity.Chat;
import com.peeraid.backend.models.entity.Message;
import com.peeraid.backend.models.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class MessageService {
    MessageRepository messageRepository;
    ChatService chatService;
    ChatRepository chatRepository;


    public Message createMessage(long chatId, String message) {
        Chat chat = chatService.findChatById(chatId);
        User sender = Utill.getCurrentUser();
        Message newMessage = new Message();
        newMessage.setChat(chat);
        newMessage.setContent(message);
        newMessage.setSender(sender);
        newMessage.setTimeStamp(LocalDateTime.now());
        Message savedMessage = messageRepository.save(newMessage);
        chat.getMessages().add(savedMessage);
        chatRepository.save(chat);
        return savedMessage;
    }

    public List<Message> findChatMessages(long chatId) {
      return   messageRepository.findByChatId(chatId);
    }
}
