package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Batch;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface BatchRepository extends MongoRepository<Batch, String> {

    @NonNull
    @Override
    @Query("{id: ?0}")
    Optional<Batch> findById(@NonNull String s);
}
