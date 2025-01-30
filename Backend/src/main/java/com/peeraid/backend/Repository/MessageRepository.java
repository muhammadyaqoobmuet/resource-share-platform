package com.peeraid.backend.Repository;

import com.peeraid.backend.models.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    public List<Message> findByChatId(long chatId);
}
