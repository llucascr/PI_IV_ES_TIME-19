package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.models.Organization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OrganizationRepository extends MongoRepository<Organization, String> {

    @Query("{}")
    Page<Organization> findByName(@Param("userName") String userName, Pageable pageable);

    @Query("{'cnpj': ?0}")
    Optional<Organization> findByCnpj(String cnpj);
}
