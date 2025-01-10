package com.peeraid.backend.Repository;

import com.peeraid.backend.models.Resource;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepo extends JpaRepository<Resource, Long> {
    Optional<Resource> findByResourceId(long id);

    @Query("SELECT r FROM Resource r ORDER BY r.dateCreated DESC")
    List<Resource> findAllOrderByCreatedDateDesc();

    @Query("select r from Resource r where r.user.userId = :id")
    List<Resource> findAllByUserId(@Param("id") long id);

}
