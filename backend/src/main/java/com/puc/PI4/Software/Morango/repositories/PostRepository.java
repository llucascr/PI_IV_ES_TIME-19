package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String> {

    @Query(value = "{ 'userId': ?0 }", sort = "{ 'createAt': -1 }")
    Page<Post> findByUserId(String userId,  Pageable pageable);

    @Query(value = "{ $or: [ { 'title': { $regex: ?0, $options: 'i' } }, { 'description': { $regex: ?0, $options: 'i' } } ] }", sort = "{'createAt':  -1}")
    Page<Post> searchByTitleOrDescriptionRegex(String query, Pageable pageable);

    @Query("{ '_id': ?1, 'userId': ?0 }")
    Optional<Post> findByUserAndPostId(String userId, String postId);
}
