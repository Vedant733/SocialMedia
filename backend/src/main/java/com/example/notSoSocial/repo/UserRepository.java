package com.example.notSoSocial.repo;

import com.example.notSoSocial.model.UserMini;
import com.example.notSoSocial.model.UserModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<UserModel,String> {
    Optional<UserModel> findByUsername(String username);
    Page<UserModel> findByUsernameNotAndUsernameStartingWith(String username, String startingWith, Pageable pageable);
    Page<UserModel> findByUsernameNotIn(HashSet<String> following, Pageable pageable);
    List<UserModel> findByUsernameIn(HashSet<String> set);
}
