package com.example.notSoSocial.service;

import com.example.notSoSocial.jwt.JwtService;
import com.example.notSoSocial.model.UserModel;
import com.example.notSoSocial.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> register(UserModel userModel){
        if (userRepository.findByUsername(userModel.getUsername()).isPresent()) return ResponseEntity.badRequest().body("Username Already Exists");
        userModel.setPassword(passwordEncoder.encode(userModel.getPassword()));
        userModel.setFollowers(new HashSet<>());
        userModel.setFollowing(new HashSet<>());
        userRepository.save(userModel);
        var jwtToken = jwtService.generateToken(userModel);
        return ResponseEntity.ok(jwtToken);
    }

    public ResponseEntity<?> authenticate(UserModel userModel){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userModel.getUsername(),
                        userModel.getPassword()
                )
        );
        var user = userRepository.findByUsername(userModel.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return ResponseEntity.ok(jwtToken);
    }
}
