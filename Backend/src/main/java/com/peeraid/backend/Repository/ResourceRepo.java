package com.peeraid.backend.Repository;

import com.peeraid.backend.models.Category;
import com.peeraid.backend.models.Resource;
import com.peeraid.backend.models.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepo extends JpaRepository<Resource, Long> {
    Optional<Resource> findByResourceId(long id);

    @Query("SELECT r FROM Resource r ORDER BY r.dateCreated DESC")
    List<Resource> findAllOrderByCreatedDateDesc();


}
