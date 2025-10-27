package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Client;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface ClientRepository extends MongoRepository<Client, String> {

    @NonNull
    @Override
    @Query("{id: ?0}")
    Optional<Client> findById(@NonNull String s);

    @Query("{idOrganizacao: ?0, email: ?1}")
    Optional<Client> findClientByIdOrganizationAndEmail(String idOrganization, String email);

    @Query("{idOrganizacao: ?0, active: ?1}")
    Page<Client> findClientByIdOrganization(String idOrganization, Boolean active ,Pageable pageable);

}
