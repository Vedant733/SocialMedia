package com.example.notSoSocial.controller;

import com.example.notSoSocial.model.UserModel;
import com.example.notSoSocial.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserModel userModel){
        return authenticationService.register(userModel);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody UserModel userModel){
        return authenticationService.authenticate(userModel);
    }
}
