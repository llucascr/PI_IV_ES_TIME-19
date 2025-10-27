package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Client;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface ClientRepository extends MongoRepository<Client, String> {

    @Query("{idOrganizacao: ?0, email: ?1}")
    Optional<Client> findClientByIdOrganizationAndEmail(String idOrganization, String email);

}
