// PostController.java
package com.linkedin.backend.features.feed.controller;

import com.linkedin.backend.features.authentication.model.AuthenticationUser;
import com.linkedin.backend.features.feed.dto.CommentDto;
import com.linkedin.backend.features.feed.dto.PostDto;
import com.linkedin.backend.features.feed.model.Comment;
import com.linkedin.backend.features.feed.model.Post;
import com.linkedin.backend.features.feed.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostDto postDto, @RequestAttribute("authenticatedUser") AuthenticationUser user) {
        Post post = postService.createPost(postDto, user.getId());
        return ResponseEntity.ok(post);
    }

    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody CommentDto commentDto, @RequestAttribute("authenticatedUser") AuthenticationUser user) {
        Comment comment = postService.addComment(postId, user.getId(), commentDto.getContent());
        return ResponseEntity.ok(comment);
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/feed")
    public ResponseEntity<List<Post>> getAllPosts(@RequestAttribute("authenticatedUser") AuthenticationUser user) {
        List<Post> posts = postService.getFeedPosts(user.getId());
        return ResponseEntity.ok(posts);
    }

    @PutMapping("/{postId}/like")
    public ResponseEntity<Post> likePost(@PathVariable Long postId, @RequestAttribute("authenticatedUser") AuthenticationUser user) {
        Post post = postService.likePost(postId, user.getId());
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable Long userId) {
        List<Post> posts = postService.getPostsByUserId(userId);
        return ResponseEntity.ok(posts);
    }
}