package com.example.notSoSocial.repo;

import com.example.notSoSocial.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post,String> {
    List<Post> findAllByUsernameOrderByUploadedAtDesc(String username);
    Page<Post> findAllByUsernameNotOrderByUploadedAtDesc(String username,Pageable pageable);
    Page<Post> findAllByUsernameInAndIdNotInOrderByUploadedAtDesc(HashSet<String> users,List<String> ids ,Pageable pageable);
}
