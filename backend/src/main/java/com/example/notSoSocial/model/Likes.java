package com.example.notSoSocial.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@RequiredArgsConstructor
@Document("likes")
public class Likes {
    @Id
    private String id;
    private String postId;
    private String username;

    public Likes(String postId, String username) {
        super();
        this.postId = postId;
        this.username = username;
    }
}
