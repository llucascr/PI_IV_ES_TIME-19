package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.Post.PostRequest;
import com.puc.PI4.Software.Morango.dto.response.Post.PostResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.exceptions.post.PostNotFound;
import com.puc.PI4.Software.Morango.exceptions.user.UserNotFound;
import com.puc.PI4.Software.Morango.models.Post;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.PostRepository;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class PostService {

    private final ModelMapper modelMapper;
    private final PostRepository postRepository;

    private final UserRepository userRepository;

    public PostResponse createPost(PostRequest postRequest) {
        User user = userRepository.findById(postRequest.getUserId()).orElseThrow(
                () -> new UserNotFound("User not found"));

        Post post = Post.builder()
                .title(postRequest.getTitle())
                .description(postRequest.getDescription())
                .text(postRequest.getText())
                .createAt(LocalDateTime.now())
                .userId(postRequest.getUserId())
                .build();

        Post savedPost = postRepository.save(post);
        PostResponse response = modelMapper.map(savedPost, PostResponse.class);
        String ownerName = userRepository.findById(savedPost.getUserId())
                .map(User::getName)
                .orElse("Usuário Desconhecido");

        response.setPostOwner(ownerName);

        return response;
    }

    public PostResponse updatePost(String postId, PostRequest postRequest) {
        Post post = postRepository.findByUserAndPostId(postRequest.getUserId() ,postId).orElseThrow(
                ()-> new PostNotFound("Post not found"));

        Post postUpdated = Post.builder()
                .id(post.getId())
                .title(postRequest.getTitle() != null ? postRequest.getTitle() : post.getTitle())
                .description(postRequest.getDescription() != null ? postRequest.getDescription() : post.getDescription())
                .text(postRequest.getText() != null ? postRequest.getText() : post.getText())
                .createAt(post.getCreateAt())
                .updateAt(LocalDateTime.now())
                .userId(post.getUserId())
                .build();

        Post savedPost = postRepository.save(postUpdated);
        PostResponse response = modelMapper.map(savedPost, PostResponse.class);
        String ownerName = userRepository.findById(savedPost.getUserId())
                .map(User::getName)
                .orElse("Usuário Desconhecido");

        response.setPostOwner(ownerName);

        return response;

    }

    public Page<PostResponse> listAllPosts(int page, int numberOfPosts){
        Pageable pageable = PageRequest.of(page, numberOfPosts);
        Page<Post> posts = postRepository.findAll(pageable);

        List<PostResponse> postResponses = posts.getContent().stream()
                .map(post -> PostResponse.builder()
                        .postOwner(userRepository.findById(post.getUserId()).map(User::getName).orElse("Usuário Desconhecido"))
                        .id(post.getId())
                        .title(post.getTitle())
                        .description(post.getDescription())
                        .text(post.getText())
                        .createAt(post.getCreateAt())
                        .updateAt(post.getUpdateAt())
                        .build())
                .toList();
        return new PageImpl<>(postResponses, pageable, posts.getTotalElements());
    }

    public Page<PostResponse> listAllPostsByUser(int page, int numberOfPosts, String userId) {
        Pageable pageable = PageRequest.of(page, numberOfPosts);
        Page<Post> posts = postRepository.findByUserId(userId, pageable);

        List<PostResponse> postResponses = posts.getContent().stream()
                .map(post -> PostResponse.builder()
                        .postOwner(userRepository.findById(post.getUserId()).map(User::getName).orElse("Usuário Desconhecido"))
                        .id(post.getId())
                        .title(post.getTitle())
                        .description(post.getDescription())
                        .text(post.getText())
                        .createAt(post.getCreateAt())
                        .updateAt(post.getUpdateAt())
                        .build())
                .toList();
        return new PageImpl<>(postResponses, pageable, posts.getTotalElements());

    }

}
