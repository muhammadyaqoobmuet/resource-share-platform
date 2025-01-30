package com.peeraid.backend.Repository;

import com.peeraid.backend.models.entity.Dispute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisputeRepository extends JpaRepository<Dispute,Long> {

}
