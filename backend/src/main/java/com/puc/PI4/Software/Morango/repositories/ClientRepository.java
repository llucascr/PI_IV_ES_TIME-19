package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Client;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ClientRepository extends MongoRepository<Client, String> {
}
