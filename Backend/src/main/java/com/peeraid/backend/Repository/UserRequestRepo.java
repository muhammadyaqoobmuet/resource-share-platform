package com.peeraid.backend.Repository;

import com.peeraid.backend.models.entity.Resource;
import com.peeraid.backend.models.entity.User;
import com.peeraid.backend.models.entity.UserRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRequestRepo extends JpaRepository<UserRequest,Long> {
    Optional<UserRequest> findByRequestId(long requestID);

    List<UserRequest> findAllByLenderOrderByRequestIdDesc(User lender);

    List<UserRequest> findAllByBorrowerOrderByRequestIdDesc(User borrower);

    Optional<UserRequest>findByBorrowerAndResource(User user, Resource resource);
}
