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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;    

    public void saveInfo(UserModel userModel){
        userRepository.save(userModel);
    }

    public UserModel getUser(String username){
        System.out.println(username);
        Optional<UserModel> userModelOptional = userRepository.findByUsername(username);
        if (userModelOptional.isEmpty())    return null;
        return userModelOptional.get();
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

    public Page<?> getUserSearch(String startingWith, int page, int size){
        Pageable paging = PageRequest.of(page,size);
        return userRepository.findByUsernameStartingWith(startingWith,paging).map(UserModel->{
            ArrayList<Object> arrayList = new ArrayList<>();
            arrayList.add(UserModel.getUsername());
            arrayList.add(UserModel.getProfilePicture());
            return arrayList;
        });
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
