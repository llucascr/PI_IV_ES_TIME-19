package com.puc.PI4.Software.Morango.repositories;

import com.mongodb.lang.NonNull;
import com.puc.PI4.Software.Morango.models.Record;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RecordRepository extends MongoRepository<Record, String> {
    @NonNull
    @Override
    @Query("{id: ?0}")
    Optional<Record> findById(@NonNull String s);

    @Query(value = "{ 'id': ?0, 'organizationId': ?1 }", delete = true)
    Long deleteOneByIdAndOrganization(String recordId, String organizationId);
}
