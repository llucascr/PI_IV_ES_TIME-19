package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.Authentication.AuthenticationRequest;
import com.puc.PI4.Software.Morango.dto.request.Authentication.RegisterResquest;
import com.puc.PI4.Software.Morango.dto.request.user.EmailResponse;
import com.puc.PI4.Software.Morango.infra.security.TokenService;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationRequest data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getPassword());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new EmailResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterResquest data) {
        if (this.userRepository.findByEmail(data.getEmail()) != null) return ResponseEntity.badRequest().build();

        String ecryptedPassword = new BCryptPasswordEncoder().encode(data.getPassword());
        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .name(data.getName())
                .email(data.getEmail())
                .password(ecryptedPassword)
                .cpf(data.getCpf())
                .createAt(LocalDateTime.now())
                .active(true)
                .role(data.getRole())
                .build();

        userRepository.save(user);
        return ResponseEntity.ok().build();
    }
}
