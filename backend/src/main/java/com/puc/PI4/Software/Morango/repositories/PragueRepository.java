package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Post;
import com.puc.PI4.Software.Morango.models.Prague;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PragueRepository extends MongoRepository<Prague, String> {

    @Query("{ $or: [ {'comumName': {$regex:  ?0, $options:  'i'}}, {'cientificName': {$regex:  ?0, $options:  'i'}} ] }")
    Page<Prague> searchByComumOrCientificNameRegex(String query, Pageable pageable);

    @Query("{'cientificName':  ?0}")
    Optional<Prague> findByCientificName(String cientificName);

    @Override
    @Query("{'id':  ?0}")
    Optional<Prague> findById(String id);

    @Query("{$or: [{'id':  ?0}, {'cientificName':  ?1}]}")
    List<Prague> findByIdOrCientificName(String pragueId, String cientificName);
}
