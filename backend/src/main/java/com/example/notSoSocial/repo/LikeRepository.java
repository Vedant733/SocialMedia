package com.example.notSoSocial.repo;

import com.example.notSoSocial.model.Likes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends MongoRepository<Likes,String> {
    Optional<Likes> findByPostIdAndUsername(String postId,String username);
    int countAllByPostId(String postId);
}
