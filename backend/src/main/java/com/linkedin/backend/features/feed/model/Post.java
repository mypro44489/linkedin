// Post.java
package com.linkedin.backend.features.feed.model;

import com.linkedin.backend.features.authentication.model.AuthenticationUser;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.util.Set;

@Entity(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty
    private String content;
    private String picture;
    @ManyToOne
    @JoinColumn(name = "author", nullable = false)
    private AuthenticationUser author;
    @ManyToMany
    @JoinTable(
            name = "post_likes",
            joinColumns = @JoinColumn(name = "post_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<AuthenticationUser> likes;

    @ManyToOne
    @JoinColumn(name = "original_post")
    private Post originalPost;

    public Post(String content, AuthenticationUser author) {
        this.content = content;
        this.author = author;
    }

    public Post(AuthenticationUser author, Post originalPost) {
        this.content = "A repost, check the original post for more details";
        this.author = author;
        this.originalPost = originalPost;
    }

    public Post() {
    }

    // Getters and setters for all fields including originalPost
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public AuthenticationUser getAuthor() {
        return author;
    }

    public void setAuthor(AuthenticationUser author) {
        this.author = author;
    }

    public Set<AuthenticationUser> getLikes() {
        return likes;
    }

    public void setLikes(Set<AuthenticationUser> likes) {
        this.likes = likes;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Post getOriginalPost() {
        return originalPost;
    }

    public void setOriginalPost(Post originalPost) {
        this.originalPost = originalPost;
    }
}