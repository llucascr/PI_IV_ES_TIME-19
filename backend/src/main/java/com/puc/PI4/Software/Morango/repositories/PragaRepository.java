package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Praga;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PragaRepository extends MongoRepository<Praga, Long> {
}
