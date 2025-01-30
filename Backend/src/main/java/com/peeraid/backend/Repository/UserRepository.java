package com.peeraid.backend.Repository;


import com.peeraid.backend.models.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserId(long id);
    Optional<User> findByEmail(String email);
}
