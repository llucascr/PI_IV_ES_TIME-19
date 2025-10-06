package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String> {

    @Query("{'userId': ?0}")
    Optional<Post> findByUserId(String userId);

    @Query("{ $or: [ { 'titulo': { $regex: ?0, $options: 'i' } }, { 'descricao': { $regex: ?0, $options: 'i' } } ] }")
    Optional<Post> findByTituloOrDescricaoRegex(String termo);

    @Query("{ '_id': ?1, 'userId': ?0 }")
    Optional<Post> findByUserAndPostId(String userId, String postId);
}
