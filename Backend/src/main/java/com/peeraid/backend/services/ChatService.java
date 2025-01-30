package com.peeraid.backend.services;

import com.peeraid.backend.Repository.ChatRepository;
import com.peeraid.backend.Repository.UserRepository;
import com.peeraid.backend.models.entity.Chat;
import com.peeraid.backend.models.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;

    public ChatService(ChatRepository chatRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public Chat createChat(long receiverId) {
        User sender = Utill.getCurrentUser();
        User receiver = userRepository.findByUserId(receiverId)
                .orElseThrow(()->new IllegalArgumentException("User not found"));

        Chat isExist =   chatRepository.findChatByUserId(sender,receiver);
        if (isExist != null){
            return  isExist;
        }
        Chat chat = new Chat();
        chat.getUsers().add(sender);
        chat.getUsers().add(receiver);
        chat.setTimestamp(LocalDateTime.now());
        return chatRepository.save(chat);
    }
   public Chat findChatById(long chatId){
       Optional<Chat> chat = chatRepository.findById(chatId);
       if (chat.isEmpty()){
           throw  new IllegalArgumentException("Chat not found");
       }
       return chat.get();
    }

    public List<Chat> findUsersChat(long userId){
       Optional<User> opt  = userRepository.findById(userId);
       if (opt.isEmpty()){
           throw  new IllegalArgumentException("User not found");
       }
       return chatRepository.findAllByUser(opt.get());
    }

}
