package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.user.UserRequest;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/user")
public class UserController {

    private final UserService userService;

    @PostMapping("/create")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userRequest));
    }

    @GetMapping("/listById")
    public ResponseEntity<UserResponse> listUserById(@RequestParam String userId) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.listUserById(userId));
    }

}
