package com.example.notSoSocial.service;

import com.example.notSoSocial.model.Post;
import com.example.notSoSocial.model.UserMini;
import com.example.notSoSocial.model.UserModel;
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
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void saveInfo(UserModel userModel){
        userRepository.save(userModel);
    }

    public UserModel getUser(String username){
        return userRepository.findByUsername(username).orElseThrow();
    }

    public void addPhoto(String username,MultipartFile multipartFile,String bio) throws IOException {
        UserModel userModel = userRepository.findByUsername(username).orElseThrow();
        userModel.setProfilePicture(new Binary(BsonBinarySubType.BINARY,multipartFile.getBytes()));
        userModel.setBio(bio);
        userRepository.save(userModel);
    }

    public boolean followUser(String username,String toFollowId){
        try {
            UserModel toFollowUser = getUser(toFollowId);
            UserModel currentUser = getUser(username);

            HashSet<String> currentUserFollowingList = currentUser.getFollowing();
            currentUserFollowingList.add(toFollowId);

            HashSet<String> toFollowUserFollowerList = toFollowUser.getFollowers();
            toFollowUserFollowerList.add(username);

            userRepository.save(toFollowUser);
            userRepository.save(currentUser);
        }catch (Exception e)    {return false;}
        return true;
    }

    public boolean unfollowUser(String username,String toBeUnfollowedId){
        try {
            UserModel toUnfollowUser = getUser(toBeUnfollowedId);
            UserModel currentUser = getUser(username);

            HashSet<String> toUnfollowUserFollowerList = toUnfollowUser.getFollowers();
            HashSet<String> currentUserFollowingList = currentUser.getFollowing();

            toUnfollowUserFollowerList.remove(username);
            currentUserFollowingList.remove(toBeUnfollowedId);

            userRepository.save(toUnfollowUser);
            userRepository.save(currentUser);
        }catch (Exception e){return false;}
        return true;
    }

    public Page<UserModel> getUserSearch(String username, String startingWith, int page, int size){
        Pageable paging = PageRequest.of(page,size);
        return userRepository.findByUsernameNotAndUsernameStartingWith(username,startingWith,paging);
    }

    public Page<UserModel> getUsers(String username,int page,int size){
        Pageable paging = PageRequest.of(page,size);
        UserModel userModel = userRepository.findByUsername(username).orElseThrow();
        HashSet<String> notThis = userModel.getFollowing();
        notThis.add(username);
        return userRepository.findByUsernameNotIn(userModel.getFollowing(),paging);
    }

    public List<UserModel> getFollowing(String username){
        UserModel userModel = getUser(username);
        return userRepository.findByUsernameIn(userModel.getFollowing());
    }

    public List<UserModel> getFollowers(String username){
        UserModel userModel = getUser(username);
        return userRepository.findByUsernameIn(userModel.getFollowers());
    }
}
