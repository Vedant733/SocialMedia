package com.example.notSoSocial.repo;

import com.example.notSoSocial.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment,String> {
    Page<Comment> findAllByPostIdOrderByCommentedAtDesc(String postId, Pageable pageable);
}
