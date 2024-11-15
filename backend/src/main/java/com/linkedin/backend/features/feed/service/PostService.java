package com.linkedin.backend.features.feed.service;

import com.linkedin.backend.features.authentication.model.AuthenticationUser;
import com.linkedin.backend.features.authentication.repository.AuthenticationUserRepository;
import com.linkedin.backend.features.feed.dto.PostDto;
import com.linkedin.backend.features.feed.model.Post;
import com.linkedin.backend.features.feed.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final AuthenticationUserRepository userRepository;

    public PostService(PostRepository postRepository, AuthenticationUserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Post createPost(PostDto postDto, Long authorId) {
        AuthenticationUser author = userRepository.findById(authorId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Post post = new Post(postDto.getContent(), author);
        post.setPicture(postDto.getPicture());
        post.setLikes(new HashSet<>());
        return postRepository.save(post);
    }

    public Post repost(Long postId, Long userId) {
        Post originalPost = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));
        AuthenticationUser user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post repost = new Post(user, originalPost);
        
        return postRepository.save(repost);
    }

    public Post likePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));
        AuthenticationUser user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (post.getLikes().contains(user)) {
            post.getLikes().remove(user);
        } else {
            post.getLikes().add(user);
        }
        return postRepository.save(post);

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