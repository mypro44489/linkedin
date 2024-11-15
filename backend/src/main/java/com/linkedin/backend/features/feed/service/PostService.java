package com.linkedin.backend.features.feed.service;

import com.linkedin.backend.features.authentication.model.AuthenticationUser;
import com.linkedin.backend.features.authentication.repository.AuthenticationUserRepository;
import com.linkedin.backend.features.feed.model.Post;
import com.linkedin.backend.features.feed.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final AuthenticationUserRepository userRepository;

    public PostService(PostRepository postRepository, AuthenticationUserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Post createPost(String content, Long authorId) {
        AuthenticationUser author = userRepository.findById(authorId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Post post = new Post(content, author);
        post.setLikes(new HashSet<>());
        return postRepository.save(post);
    }

    public Post likePost(Long postId, Long userId) {
        Optional<Post> post = postRepository.findById(postId);
        Optional<AuthenticationUser> user = userRepository.findById(userId);
        if (post.isPresent() && user.isPresent()) {
            Post existingPost = post.get();
            existingPost.getLikes().add(user.get());
            return postRepository.save(existingPost);
        } else {
            throw new IllegalArgumentException("Post or User not found");
        }
    }

    public List<Post> getPostsByUserId(Long userId) {
        return postRepository.findByAuthorId(userId);
    }

    public List<Post> getFeedPosts(Long authenticatedUserId) {
        return postRepository.findByAuthorIdNot(authenticatedUserId);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }
}