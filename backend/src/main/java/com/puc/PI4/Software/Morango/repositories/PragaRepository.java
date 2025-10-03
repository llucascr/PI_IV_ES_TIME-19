package com.puc.PI4.Software.Morango.repositories.mongodb;

import com.puc.PI4.Software.Morango.models.mongodb.Praga;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PragaRepository extends MongoRepository<Praga, Long> {
}
