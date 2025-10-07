package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.Post.PostRequest;
import com.puc.PI4.Software.Morango.dto.response.Post.PostResponse;
import com.puc.PI4.Software.Morango.models.Post;
import com.puc.PI4.Software.Morango.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/post")
public class PostController {

    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest postRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPost(postRequest));
    }

    @PutMapping("/update")
    public ResponseEntity<PostResponse> updatePost(@RequestParam String postId, @RequestBody PostRequest postRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.updatePost(postId, postRequest));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<PostResponse> deletePost(@RequestParam String postId, @RequestParam String userId) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.deletePost(postId, userId));
    }

    @GetMapping("/listByUser")
    public ResponseEntity<List<PostResponse>> listAllPostsByUser(
            @RequestParam String userId,
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfPosts
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.listAllPostsByUser(page, numberOfPosts, userId).getContent());
    }

    @GetMapping("/list")
    public ResponseEntity<List<PostResponse>> listAllPosts(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfPosts
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.listAllPosts(page, numberOfPosts).getContent());
    }

    @GetMapping("/search")
    public ResponseEntity<List<PostResponse>> searchPosts(
            @RequestParam String query,
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfPosts){
        return ResponseEntity.status(HttpStatus.OK).body(postService.searchPosts(query, page, numberOfPosts).getContent());
    }
}
