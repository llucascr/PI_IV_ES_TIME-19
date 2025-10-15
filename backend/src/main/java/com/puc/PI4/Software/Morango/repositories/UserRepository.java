package com.puc.PI4.Software.Morango.repositories;

import com.mongodb.lang.NonNull;
import com.puc.PI4.Software.Morango.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    @NonNull
    @Override
    @Query("{id: ?0}")
    Optional<User> findById(@NonNull String id);

    @Query("{'email': ?0}")
    Optional<User> OpFindByEmail(String email);

    @Query("{'email': ?0}")
    UserDetails findByEmail(String email);

}
