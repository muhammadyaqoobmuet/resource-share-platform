package com.peeraid.backend.Repository;

import com.peeraid.backend.models.entity.Chat;
import com.peeraid.backend.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT  c from Chat c where :user member of c.users ")
    public List<Chat> findAllByUser(@Param("user") User user);
    @Query("select c from Chat c where :sender member of c.users and  :reciever member  of c.users")
    public Chat findChatByUserId(@Param("sender") User sender,@Param("receiver") User receiver);
}
