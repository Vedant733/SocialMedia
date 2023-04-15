package com.example.notSoSocial.controller;

import com.example.notSoSocial.service.LikeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {
    private final LikeService likeService;

    @GetMapping(value = "/like/{postId}")
    public ResponseEntity<?> likePost(@PathVariable("postId") String postId, HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        if (likeService.like(postId,username))  return ResponseEntity.ok("Done");
        return ResponseEntity.badRequest().body("Error");
    }

    @GetMapping(value = "/unlike/{postId}")
    public ResponseEntity<?> unlikePost(@PathVariable("postId") String postId, HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        if (likeService.unlike(postId,username))  return ResponseEntity.ok("Done");
        return ResponseEntity.badRequest().body("Error");
    }

    @GetMapping(value = "/isLiked/{postId}")
    public ResponseEntity<?> isLiked(@PathVariable("postId") String postId, HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(likeService.isLiked(postId,username));
    }

    @GetMapping("/postLikes/{postId}")
    public ResponseEntity<?> getNumberOfLikes(@PathVariable("postId") String postId){
        return ResponseEntity.ok(likeService.numberOfLikes(postId));
    }
}
