package com.example.notSoSocial.service;

import com.example.notSoSocial.model.Comment;
import com.example.notSoSocial.model.Post;
import com.example.notSoSocial.repo.CommentRepository;
import com.example.notSoSocial.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public boolean addComment(String postId, String username, Comment comment){
        if (postRepository.findById(postId).isEmpty())  return false;
        comment.setUsername(username);
        comment.setPostId(postId);
        comment.setCommentedAt(LocalDateTime.now());
        commentRepository.save(comment);
        return true;
    }

    public Page<Comment> getComments(String postId,int page,int size){
        if (postRepository.findById(postId).isEmpty())  return null;
        Pageable paging = PageRequest.of(page,size);
        return  commentRepository.findAllByPostIdOrderByCommentedAtDesc(postId,paging);

    }
}
