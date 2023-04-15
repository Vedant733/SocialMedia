package com.example.notSoSocial.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("comments")
public class Comment {
    @Id
    private String id;
    private String comment;
    private String postId;
    private String username;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime commentedAt;
}
