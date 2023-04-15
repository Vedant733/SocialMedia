package com.example.notSoSocial.controller;

import com.example.notSoSocial.model.UserModel;
import com.example.notSoSocial.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> getUser(HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(userService.getUser(username));
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable("username")String username){
        return ResponseEntity.ok(userService.getUser(username));
    }

    @PostMapping("/")
    public ResponseEntity<?> addUser(@RequestBody UserModel userModel, HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        userModel.setUsername(username);
        userService.saveInfo(userModel);
        return ResponseEntity.ok("Done");
    }

//    Add this in front of image 'data:image/png;base64,'
    @GetMapping("/profile-picture")
    public ResponseEntity<?> getProfilePicture(HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(userService.getUser(username).getProfilePicture());
    }

    @GetMapping("/profile-picture/{username}")
    public ResponseEntity<?> getProfilePicture(@PathVariable("username")String username){
        return ResponseEntity.ok(userService.getUser(username).getProfilePicture());
    }

    @PostMapping("/profile-picture")
    public ResponseEntity<?> addProfilePicture(@RequestParam("bio")String bio,@RequestParam("image")MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        String username = (String) request.getAttribute("username");
        userService.addPhoto(username,multipartFile,bio);
        return ResponseEntity.ok("Done");
    }

    @GetMapping(value = "/follow/{id}")
    public ResponseEntity<?> followById(@PathVariable("id")String id,HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        if (userService.followUser(username,id))    return ResponseEntity.ok("Done");
        return ResponseEntity.badRequest().body("Error");
    }

    @GetMapping(value = "/unfollow/{id}")
    public ResponseEntity<?> unfollowById(@PathVariable("id")String id,HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        if (userService.unfollowUser(username,id))    return ResponseEntity.ok("Done");
        return ResponseEntity.badRequest().body("Error");
    }

    @GetMapping(value="/users/{page}/{size}/{searchKeyword}")
    public ResponseEntity<?> getSearchedUsers(@PathVariable("page")int page,@PathVariable("size")int size,@PathVariable("searchKeyword")String searchKeyword,HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(userService.getUserSearch(username,searchKeyword,page,size));
    }

    @GetMapping(value="/users/{page}/{size}")
    public ResponseEntity<?> getUsers(@PathVariable("page")int page,@PathVariable("size")int size,HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(userService.getUsers(username,page,size));
    }

    @GetMapping("/followers")
    public ResponseEntity<?> getFollowers(HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(userService.getFollowers(username));
    }

    @GetMapping("/following")
    public ResponseEntity<?> getFollowing(HttpServletRequest request){
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(userService.getFollowing(username));
    }
}
