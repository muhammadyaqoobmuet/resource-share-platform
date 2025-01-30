package com.peeraid.backend.controllers;

import com.peeraid.backend.models.entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class RealTimeChat {


 private final SimpMessagingTemplate messagingTemplate;

    public RealTimeChat(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/chat/{groupId}")
    public Message sendToUser(
            @Payload Message message,
            @DestinationVariable String groupId
    ){
        messagingTemplate.convertAndSendToUser(groupId,"/private",message);
    return message;
    }
}
