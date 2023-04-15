package com.example.notSoSocial.service;

import com.example.notSoSocial.model.Post;
import com.example.notSoSocial.model.UserModel;
import com.example.notSoSocial.repo.PostRepository;
import com.example.notSoSocial.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public List<Post> getAll(String username,int page,int size){
        Pageable paging = PageRequest.of(page,size);
        Page<Post> pageResult = postRepository.findAllByUsernameNotOrderByUploadedAtDesc(username,paging);
        return pageResult.toList();
    }

    public List<Post> getFeed(int page,int size,String username){
        Optional<UserModel> userModel= userRepository.findByUsername(username);
        if (userModel.isEmpty())  return null;
        Pageable paging = PageRequest.of(page,size);
        Page<Post> pageResult = postRepository.findAllByUsernameInOrderByUploadedAtDesc(userModel.get().getFollowing(), paging);
        return pageResult.toList();
    }

    public void addPhotoAndPost(String username, MultipartFile multipartFile,String caption) throws IOException {
        if(userRepository.findByUsername(username).isEmpty()) return;
        Post post = new Post();
        post.setCaption(caption);
        post.setImage(new Binary(BsonBinarySubType.BINARY,multipartFile.getBytes()));
        post.setUsername(username);
        post.setUploadedAt(LocalDateTime.now());
        postRepository.save(post);
    }

    public List<Post> getAllByUsername(String username){
        return postRepository.findAllByUsernameOrderByUploadedAtDesc(username);
    }
}

