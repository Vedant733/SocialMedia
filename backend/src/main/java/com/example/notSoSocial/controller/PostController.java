package com.example.notSoSocial.controller;

import com.example.notSoSocial.model.Post;
import com.example.notSoSocial.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @GetMapping(value = "/{page}/{size}")
    public ResponseEntity<?> getPosts(@PathVariable("page") int page,@PathVariable("size") int size, HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(postService.getAll(username,page,size));
    }

    @PostMapping("/")
    public ResponseEntity<?> addPost(@RequestParam("caption")String caption, @RequestParam("image") MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        String username = (String) request.getAttribute("username");
        postService.addPhotoAndPost(username,multipartFile,caption);
        return ResponseEntity.ok("Done");
    }

    @GetMapping(value="/feed/{page}/{size}")
    public ResponseEntity<?> getFeed(@PathVariable("page") int page,@PathVariable("size") int size, HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(postService.getFeed(page,size,username));
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserPosts(HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(postService.getAllByUsername(username));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<?> getUserPostsByUsername(@PathVariable("username")String username){
        return ResponseEntity.ok(postService.getAllByUsername(username));
    }

}
