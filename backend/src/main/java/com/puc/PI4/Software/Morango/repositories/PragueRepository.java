package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Post;
import com.puc.PI4.Software.Morango.models.Prague;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface PragueRepository extends MongoRepository<Prague, String> {

    @Query("{ $or: [ {'comumName': ?0}, {'cientificName': ?1} ] }")
    Optional<Prague> findByComumOrCientificName(String comumName, String cientificName);
}
