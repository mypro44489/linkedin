package com.linkedin.backend.configuration;

import com.linkedin.backend.features.authentication.model.AuthenticationUser;
import com.linkedin.backend.features.authentication.repository.AuthenticationUserRepository;
import com.linkedin.backend.features.authentication.utils.Encoder;
import com.linkedin.backend.features.feed.model.Post;
import com.linkedin.backend.features.feed.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashSet;

@Configuration
public class LoadDatabaseConfiguration {
    private final Encoder encoder;

    LoadDatabaseConfiguration(Encoder encoder) {
        this.encoder = encoder;
    }

    @Bean
    public CommandLineRunner initDatabase(AuthenticationUserRepository authenticationUserRepository, PostRepository postRepository) {
        return args -> {
            for (int i = 1; i <= 5; i++) {
                AuthenticationUser user = new AuthenticationUser("user" + i + "@example.com", encoder.encode("user" + i));
                user.setEmailVerified(true);
                if (i == 1) {
                    user.setFirstName("John");
                    user.setLastName("Doe");
                    user.setPosition("Software Engineer");
                    user.setCompany("Docker Inc.");
                    user.setLocation("San Francisco, CA");
                }
                authenticationUserRepository.save(user);

                for (int j = 1; j <= 10; j++) {
                    Post post = new Post();
                    post.setContent("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
                    post.setAuthor(user);
                    post.setLikes(new HashSet<>());
                    postRepository.save(post);
                }
            }
        };
    }
}
