package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.Authentication.AuthenticationRequest;
import com.puc.PI4.Software.Morango.dto.request.Authentication.RegisterResquest;
import com.puc.PI4.Software.Morango.dto.request.resetPass.ResetPassRequest;
import com.puc.PI4.Software.Morango.dto.request.resetPass.ResetPassTokenRequest;
import com.puc.PI4.Software.Morango.dto.request.user.LoginResponse;
import com.puc.PI4.Software.Morango.dto.response.resetPass.ResetPassResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserRegisterResponse;
import com.puc.PI4.Software.Morango.services.AuthenticationService;
import com.puc.PI4.Software.Morango.services.ResetPassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ResetPassService resetPassService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid AuthenticationRequest data) {
        return ResponseEntity.ok(authenticationService.login(data));
    }

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponse> register(@RequestBody @Valid RegisterResquest data) {
        return ResponseEntity.status(HttpStatus.OK).body(authenticationService.register(data));
    }

    @PostMapping("/reset-password")
    public ResetPassResponse requestReset(@RequestBody ResetPassRequest dto) {
        return resetPassService.requestReset(dto);
    }

    @PostMapping("/reset-password/confirm")
    public ResetPassResponse confirmReset(@RequestBody ResetPassTokenRequest dto) {
        return resetPassService.confirmReset(dto);
    }
}
