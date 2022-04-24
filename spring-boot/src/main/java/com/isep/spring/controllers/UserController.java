package com.isep.spring.controllers;

import com.isep.spring.models.ERole;
import com.isep.spring.models.Role;
import com.isep.spring.models.User;
import com.isep.spring.repository.JobRepository;
import com.isep.spring.repository.RoleRepository;
import com.isep.spring.repository.UserRepository;
import com.isep.spring.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")

public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    JobRepository jobRepository;


    @GetMapping("user")
    public ResponseEntity<List<User>> getAllUser(){
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("user/{id}")
    public ResponseEntity getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity deleteUserById(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> updateUserById(@Valid @RequestBody User user, @PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        Set<Role> roles;
        User _user;
        if(optionalUser.isPresent()){
            _user = optionalUser.get();
            _user.setUsername(user.getUsername());
            _user.setRole(user.getRole());
            _user.setPassword(encoder.encode(user.getPassword()));
            _user.setEmail(user.getEmail());

            roles = new HashSet<>();

            if (user.getRole() == 3 ) {
                Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(adminRole);
            } else if (user.getRole() == 2) {
                Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(modRole);
            } else {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            }
            _user.setRoles(roles);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(userRepository.save(_user));
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}

