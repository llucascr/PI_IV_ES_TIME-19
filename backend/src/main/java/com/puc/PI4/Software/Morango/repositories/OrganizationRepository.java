package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Organization;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface OrganizationRepository extends MongoRepository<Organization, String> {

    @Query("{'cnpj': ?0}")
    Optional<Organization> findByCnpj(String cnpj);
}
