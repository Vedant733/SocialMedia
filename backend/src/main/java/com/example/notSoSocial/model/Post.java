package com.example.notSoSocial.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
@Document("posts")
public class Post {

    @Id
    private String id;
    private String username;
    private Binary image;
    private String caption;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime uploadedAt;
}
