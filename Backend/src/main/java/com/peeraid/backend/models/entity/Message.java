package com.peeraid.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Message {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String content;
    @ManyToOne
    private User sender;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;
    private LocalDateTime timeStamp ;

}
