package com.peeraid.backend.Repository;

import com.peeraid.backend.models.entity.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResourceRepo extends JpaRepository<Resource, Long> {
    Optional<Resource> findByResourceId(long id);


    @Query("select r from Resource r where r.user.userId = :id order by r.resourceId desc ")
    Page<Resource> findAllByUserId(@Param("id") long id,Pageable pageable );

    @Query("SELECT r FROM Resource r WHERE LOWER(r.resourceName) LIKE LOWER(CONCAT('%', :key , '%' ) )" +
            " OR lower(r.description) like LOWER(CONCAT('%', :key , '%' ))" +
             " OR lower(r.resourceCategory) like lower((CONCAT('%' , :key , '%') )) ")
    Page<Resource> searchResource(@Param("key") String key,Pageable pageable );


    @Query("SELECT r FROM Resource r WHERE lower(r.resourceCategory) = lower(:category)")
    Page<Resource> getFilteredByCategory(Pageable pageable, @Param("category") String category);


    // Filter by only Type
    @Query("SELECT r FROM Resource r WHERE lower(r.resourceType) = lower(:type)")
    Page<Resource> getFilteredByType(Pageable pageable, @Param("type") String type);

    // Filter by only Status
    @Query("SELECT r FROM Resource r WHERE lower(r.resourceStatus) = lower(:status)")
    Page<Resource> getFilteredByStatus(Pageable pageable, @Param("status") String status);

    // Filter by Type and Status together
    @Query("SELECT r FROM Resource r WHERE lower(r.resourceType) = lower(:type) " +
            "AND lower(r.resourceStatus) = lower(:status)")
    Page<Resource> getFilteredByTypeAndStatus(Pageable pageable, @Param("type") String type, @Param("status") String status);

    @Query("SELECT r FROM Resource r WHERE lower(r.resourceCategory) = lower(:category) " +
            "AND lower(r.resourceStatus) = lower(:status)")
    Page<Resource> getFilteredByCategoryAndStatus(Pageable pageable, @Param("category") String category, @Param("status") String status);

    // Filter by Type and Category
    @Query("SELECT r FROM Resource r WHERE lower(r.resourceType) = lower(:type) " +
            "AND lower(r.resourceCategory) = lower(:category)")
    Page<Resource> getFilteredByTypeAndCategory(Pageable pageable,
                                                @Param("type") String type,
                                                @Param("category") String category);

    @Query("select  r from Resource r where lower(r.resourceType) = lower(:type) AND " +
            "lower(r.resourceCategory) = lower(:category) and" +
            " lower( r.resourceStatus) = lower(:status)")
    Page<Resource> getFilteredResource(String type, String category,String status,Pageable pageable );

}
