package com.example.notSoSocial.service;

import com.example.notSoSocial.model.Likes;
import com.example.notSoSocial.model.Post;
import com.example.notSoSocial.repo.LikeRepository;
import com.example.notSoSocial.repo.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;

    public boolean like(String postId,String username){
        Optional<Post> post  = postRepository.findById(postId);
        Optional<Likes> isAlreadyLiked = likeRepository.findByPostIdAndUsername(postId,username);
        if (post.isEmpty() || isAlreadyLiked.isPresent())  return false;
        Likes likes = new Likes(postId,username);
        likeRepository.save(likes);
        return true;
    }

    public boolean unlike(String postId,String username){
        Optional<Likes> likes = likeRepository.findByPostIdAndUsername(postId,username);
        if (likes.isEmpty())    return false;
        likeRepository.delete(likes.get());
        return true;
    }

    public boolean isLiked(String postId,String username){
        return likeRepository.findByPostIdAndUsername(postId,username).isPresent();
    }

    public int numberOfLikes(String postId){
        return likeRepository.countAllByPostId(postId);
    }

    public List<String> findLikedPostIdsByUsername(String username) {
        List<Likes> likedPosts = likeRepository.findLikedPostsByUsername(username);
        return likedPosts.stream()
                .map(Likes::getPostId)
                .collect(Collectors.toList());
    }
}
