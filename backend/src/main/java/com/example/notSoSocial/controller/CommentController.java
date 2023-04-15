package com.example.notSoSocial.controller;

import com.example.notSoSocial.model.Comment;
import com.example.notSoSocial.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/{postId}/{page}/{size}")
    public ResponseEntity<?> getComments(@PathVariable("postId")String postId,@PathVariable("page")int page,@PathVariable("size")int size){
        return ResponseEntity.ok(commentService.getComments(postId,page,size));
    }

    @PostMapping("/{postId}")
    public ResponseEntity<?> addComment(@PathVariable("postId")String postId, @RequestBody Comment comment, HttpServletRequest request){
        String username= (String) request.getAttribute("username");
        if (commentService.addComment(postId,username,comment)) return ResponseEntity.ok("Done");
        return ResponseEntity.badRequest().body("Error");
    }
}
