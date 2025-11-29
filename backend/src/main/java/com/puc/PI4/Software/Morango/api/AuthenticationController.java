package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.Authentication.AuthenticationRequest;
import com.puc.PI4.Software.Morango.dto.request.Authentication.RegisterResquest;
import com.puc.PI4.Software.Morango.dto.request.user.EmailResponse;
import com.puc.PI4.Software.Morango.dto.request.user.LoginResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserRegisterResponse;
import com.puc.PI4.Software.Morango.exceptions.user.UserAlreadyExist;
import com.puc.PI4.Software.Morango.infra.security.TokenService;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import com.puc.PI4.Software.Morango.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid AuthenticationRequest data) {
        return ResponseEntity.ok(authenticationService.login(data));
    }

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponse> register(@RequestBody @Valid RegisterResquest data) {
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.register(data));
    }
}
