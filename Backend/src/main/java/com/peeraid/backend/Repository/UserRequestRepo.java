package com.peeraid.backend.Repository;

import com.peeraid.backend.models.UserRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRequestRepo extends JpaRepository<UserRequest,Long> {
    Optional<UserRequest> findByRequestId(long requestID);

   @Query("select ur from UserRequest ur where ur.lender.userId == :lenderId")
    List<UserRequest> findAllByLender(@Param("lenderId") long lenderId);

    @Query("select ur from UserRequest ur where ur.borrower.userId == :borrowerId")
    List<UserRequest> findAllByBorrower(@Param("borrowerId") long borrowerId);
}
