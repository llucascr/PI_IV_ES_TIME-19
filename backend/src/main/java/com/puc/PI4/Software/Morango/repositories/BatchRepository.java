package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Batch;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface BatchRepository extends MongoRepository<Batch, String> {

    @NonNull
    @Override
    @Query("{id: ?0}")
    Optional<Batch> findById(@NonNull String s);

    @Query("{organizationId:  ?0, clientId:  ?1}")
    Page<Batch> listByOrgAndClient(String organizationId, String clientId, Pageable pageable);

    @Query("{organizationId:  ?0}")
    Page<Batch> findByOrganizationId(String organizationId, Pageable pageable);
}
